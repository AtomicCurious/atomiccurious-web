import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"
import { resend, RESEND_FROM } from "@/lib/resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Locale = "en" | "es"

const redis = Redis.fromEnv()

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 min
const RATE_LIMIT_MAX = 3
const COOLDOWN_MS = 60 * 1000 // 60 s
const DUPLICATE_TTL_MS = 6 * 60 * 60 * 1000 // 6 h
const MAX_URLS_PER_MESSAGE = 2

const SHORTENER_HOSTS = new Set([
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "goo.gl",
  "buff.ly",
  "ow.ly",
  "is.gd",
  "cutt.ly",
  "rebrand.ly",
  "shorturl.at",
  "tiny.cc",
  "lnkd.in",
])

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function normalizeLocale(v: unknown): Locale {
  return v === "es" ? "es" : "en"
}

function getErrorMessage(err: unknown) {
  if (!err) return "unknown error"
  if (typeof err === "string") return err
  if (err instanceof Error) return err.message
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function formatSubject(subject: string, locale: Locale) {
  const cleaned = subject.trim() || "General"
  return locale === "es"
    ? `[Contacto AtomicCurious] ${cleaned}`
    : `[AtomicCurious Contact] ${cleaned}`
}

function getClientIp(req: Request) {
  const headersToCheck = [
    "cf-connecting-ip",
    "x-real-ip",
    "x-forwarded-for",
  ]

  for (const header of headersToCheck) {
    const raw = req.headers.get(header)
    if (!raw) continue
    const first = raw.split(",")[0]?.trim()
    if (first) return first
  }

  return "unknown"
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex")
}

function buildFingerprint(
  ip: string,
  name: string,
  subject: string,
  message: string
) {
  return sha256(
    `${ip}::${name.trim().toLowerCase()}::${subject.trim().toLowerCase()}::${message.trim()}`
  )
}

async function enforceRateLimit(ip: string, locale: Locale) {
  const tsNow = Date.now()
  const cooldownKey = `ac:contact:cooldown:${ip}`
  const windowKey = `ac:contact:window:${ip}`

  const lastSent = await redis.get<number>(cooldownKey)
  if (lastSent && tsNow - lastSent < COOLDOWN_MS) {
    const retryAfterSec = Math.ceil((COOLDOWN_MS - (tsNow - lastSent)) / 1000)
    return {
      ok: false as const,
      status: 429,
      retryAfterSec,
      error: "cooldown_active",
      message:
        locale === "es"
          ? "Espera un momento antes de enviar otro mensaje."
          : "Please wait a moment before sending another message.",
    }
  }

  const count = await redis.incr(windowKey)
  if (count === 1) {
    await redis.expire(windowKey, RATE_LIMIT_WINDOW_MS / 1000)
  }

  if (count > RATE_LIMIT_MAX) {
    const ttl = await redis.ttl(windowKey)
    return {
      ok: false as const,
      status: 429,
      retryAfterSec: ttl > 0 ? ttl : Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
      error: "rate_limited",
      message:
        locale === "es"
          ? "Has enviado demasiados mensajes en poco tiempo. Intenta más tarde."
          : "You have sent too many messages in a short time. Please try again later.",
    }
  }

  return { ok: true as const }
}

async function registerSuccessfulAttempt(ip: string) {
  const cooldownKey = `ac:contact:cooldown:${ip}`
  await redis.set(cooldownKey, Date.now(), { ex: Math.ceil(COOLDOWN_MS / 1000) })
}

async function hasDuplicateRecentFingerprint(fingerprint: string) {
  const key = `ac:contact:fp:${fingerprint}`
  const exists = await redis.get(key)
  return Boolean(exists)
}

async function registerRecentFingerprint(fingerprint: string) {
  const key = `ac:contact:fp:${fingerprint}`
  await redis.set(key, 1, { ex: Math.ceil(DUPLICATE_TTL_MS / 1000) })
}

function extractUrls(text: string) {
  const matches = text.match(/\b((https?:\/\/|www\.)[^\s<>"'`]+)/gi) ?? []
  return matches.map((value) => value.trim())
}

function normalizeUrlForParsing(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

function getHostname(url: string) {
  try {
    const parsed = new URL(normalizeUrlForParsing(url))
    return parsed.hostname.toLowerCase()
  } catch {
    return null
  }
}

function hasSuspiciousContent(text: string) {
  const blockedPatterns = [
    /<script\b/i,
    /<\/script>/i,
    /javascript:/i,
    /data:text\/html/i,
    /vbscript:/i,
    /file:\/\//i,
    /onerror\s*=/i,
    /onload\s*=/i,
    /document\.cookie/i,
    /window\.location/i,
  ]

  return blockedPatterns.some((pattern) => pattern.test(text))
}

function validateMessageSafety(message: string, locale: Locale) {
  const urls = extractUrls(message)

  if (hasSuspiciousContent(message)) {
    return {
      ok: false as const,
      error: "unsafe_content",
      message:
        locale === "es"
          ? "Tu mensaje contiene contenido bloqueado por seguridad."
          : "Your message contains content blocked for safety.",
    }
  }

  if (urls.length > MAX_URLS_PER_MESSAGE) {
    return {
      ok: false as const,
      error: "too_many_links",
      message:
        locale === "es"
          ? "Tu mensaje tiene demasiados enlaces. Reduce la cantidad e intenta de nuevo."
          : "Your message contains too many links. Reduce them and try again.",
    }
  }

  for (const url of urls) {
    const host = getHostname(url)
    if (!host) {
      return {
        ok: false as const,
        error: "invalid_link",
        message:
          locale === "es"
            ? "Tu mensaje contiene un enlace inválido o sospechoso."
            : "Your message contains an invalid or suspicious link.",
      }
    }

    const bareHost = host.replace(/^www\./, "")
    if (SHORTENER_HOSTS.has(bareHost)) {
      return {
        ok: false as const,
        error: "shortened_link_blocked",
        message:
          locale === "es"
            ? "No aceptamos enlaces acortados en el formulario de contacto."
            : "Shortened links are not allowed in the contact form.",
      }
    }
  }

  if (urls.length > 0 && message.trim().length < 30) {
    return {
      ok: false as const,
      error: "link_only_message",
      message:
        locale === "es"
          ? "Tu mensaje necesita más contexto además del enlace."
          : "Your message needs more context in addition to the link.",
    }
  }

  return { ok: true as const }
}

function formatTextEmail(args: {
  name: string
  email: string
  subject: string
  message: string
  locale: Locale
  ip: string
}) {
  const { name, email, subject, message, locale, ip } = args

  if (locale === "es") {
    return (
      `Nuevo mensaje de contacto desde AtomicCurious\n\n` +
      `Nombre: ${name}\n` +
      `Correo: ${email}\n` +
      `Idioma: ${locale}\n` +
      `IP: ${ip}\n` +
      `Asunto: ${subject}\n\n` +
      `Mensaje:\n${message}\n`
    )
  }

  return (
    `New contact message from AtomicCurious\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Locale: ${locale}\n` +
    `IP: ${ip}\n` +
    `Subject: ${subject}\n\n` +
    `Message:\n${message}\n`
  )
}

function formatHtmlEmail(args: {
  name: string
  email: string
  subject: string
  message: string
  locale: Locale
  ip: string
}) {
  const safeName = escapeHtml(args.name)
  const safeEmail = escapeHtml(args.email)
  const safeSubject = escapeHtml(args.subject)
  const safeLocale = escapeHtml(args.locale)
  const safeIp = escapeHtml(args.ip)
  const safeMessage = escapeHtml(args.message).replaceAll("\n", "<br />")

  if (args.locale === "es") {
    return `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contacto AtomicCurious</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0f;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="background-color:#0a0a0f;padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="padding:36px 32px 20px 32px;text-align:left;">
            <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#9ca3af;margin-bottom:12px;">
              AtomicCurious
            </div>
            <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:700;">
              Nuevo mensaje de contacto
            </h1>
            <p style="margin:14px 0 0 0;font-size:15px;line-height:1.7;color:#d1d5db;">
              Alguien te envió un mensaje desde el formulario de contacto de AtomicCurious.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 32px 8px 32px;">
            <div style="height:1px;background:#1f2937;"></div>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0 32px;">
            <p style="margin:0 0 10px 0;font-size:13px;line-height:1.7;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">
              Datos del remitente
            </p>
            <p style="margin:0 0 8px 0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">Nombre:</strong> ${safeName}
            </p>
            <p style="margin:0 0 8px 0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">Correo:</strong> ${safeEmail}
            </p>
            <p style="margin:0 0 8px 0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">Idioma:</strong> ${safeLocale}
            </p>
            <p style="margin:0 0 8px 0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">IP:</strong> ${safeIp}
            </p>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">Asunto:</strong> ${safeSubject}
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0 32px;">
            <p style="margin:0 0 10px 0;font-size:13px;line-height:1.7;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">
              Mensaje
            </p>
            <div style="font-size:15px;line-height:1.9;color:#e5e7eb;background:#0b1220;border:1px solid #1f2937;border-radius:16px;padding:18px 16px;">
              ${safeMessage}
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:32px;">
            <div style="border-top:1px solid #1f2937;padding-top:18px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.7;color:#6b7280;">
                Responde directamente a este correo para contestarle a la persona.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
    `.trim()
  }

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AtomicCurious Contact</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0f;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="background-color:#0a0a0f;padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="padding:36px 32px 20px 32px;text-align:left;">
            <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#9ca3af;margin-bottom:12px;">
              AtomicCurious
            </div>
            <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:700;">
              New contact message
            </h1>
            <p style="margin:14px 0 0 0;font-size:15px;line-height:1.7;color:#d1d5db;">
              Someone sent you a message from the AtomicCurious contact form.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 32px 8px 32px;">
            <div style="height:1px;background:#1f2937;"></div>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0 32px;">
            <p style="margin:0 0 10px 0;font-size:13px;line-height:1.7;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">
              Sender details
            </p>
            <p style="margin:0 0 8px 0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">Name:</strong> ${safeName}
            </p>
            <p style="margin:0 0 8px 0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">Email:</strong> ${safeEmail}
            </p>
            <p style="margin:0 0 8px 0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">Locale:</strong> ${safeLocale}
            </p>
            <p style="margin:0 0 8px 0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">IP:</strong> ${safeIp}
            </p>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#e5e7eb;">
              <strong style="color:#ffffff;">Subject:</strong> ${safeSubject}
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0 32px;">
            <p style="margin:0 0 10px 0;font-size:13px;line-height:1.7;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">
              Message
            </p>
            <div style="font-size:15px;line-height:1.9;color:#e5e7eb;background:#0b1220;border:1px solid #1f2937;border-radius:16px;padding:18px 16px;">
              ${safeMessage}
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:32px;">
            <div style="border-top:1px solid #1f2937;padding-top:18px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.7;color:#6b7280;">
                Reply directly to this email to answer the sender.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `.trim()
}

export async function POST(req: Request) {
  const ct = req.headers.get("content-type") || ""
  if (!ct.includes("application/json")) {
    return NextResponse.json(
      { ok: false, error: "invalid_content_type" },
      { status: 415 }
    )
  }

  const body = await req.json().catch(() => null)

  const name = (body?.name ?? "").toString().trim()
  const email = (body?.email ?? "").toString().trim().toLowerCase()
  const subject = (body?.subject ?? "").toString().trim()
  const message = (body?.message ?? "").toString().trim()
  const honey = (body?.company ?? "").toString().trim()
  const locale = normalizeLocale(body?.locale)
  const ip = getClientIp(req)

  if (honey) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const rateCheck = await enforceRateLimit(ip, locale)
  if (!rateCheck.ok) {
    return NextResponse.json(
      { ok: false, error: rateCheck.error, detail: rateCheck.message },
      {
        status: rateCheck.status,
        headers: { "Retry-After": String(rateCheck.retryAfterSec) },
      }
    )
  }

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "invalid_name" },
      { status: 400 }
    )
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid_email" },
      { status: 400 }
    )
  }

  if (!subject || subject.length < 2) {
    return NextResponse.json(
      { ok: false, error: "invalid_subject" },
      { status: 400 }
    )
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "invalid_message" },
      { status: 400 }
    )
  }

  if (
    name.length > 120 ||
    email.length > 160 ||
    subject.length > 160 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { ok: false, error: "payload_too_large" },
      { status: 400 }
    )
  }

  const safety = validateMessageSafety(message, locale)
  if (!safety.ok) {
    return NextResponse.json(
      { ok: false, error: safety.error, detail: safety.message },
      { status: 400 }
    )
  }

  const fingerprint = buildFingerprint(ip, name, subject, message)
  const isDuplicate = await hasDuplicateRecentFingerprint(fingerprint)
  if (isDuplicate) {
    return NextResponse.json(
      {
        ok: false,
        error: "duplicate_message",
        detail:
          locale === "es"
            ? "Ese mensaje ya fue enviado recientemente."
            : "That message was already sent recently.",
      },
      { status: 409 }
    )
  }

  const finalSubject = formatSubject(subject, locale)
  const text = formatTextEmail({ name, email, subject, message, locale, ip })
  const html = formatHtmlEmail({ name, email, subject, message, locale, ip })

  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to:
        locale === "es"
          ? "hello.atomiccurious+es@gmail.com"
          : "hello.atomiccurious+en@gmail.com",
      replyTo: email,
      subject: finalSubject,
      text,
      html,
    })

    if (error) {
      console.error("[contact] resend error:", error)
      return NextResponse.json(
        {
          ok: false,
          error: "resend_failed",
          detail: error.message ?? String(error),
        },
        { status: 500 }
      )
    }

    await Promise.all([
      registerSuccessfulAttempt(ip),
      registerRecentFingerprint(fingerprint),
    ])

    return NextResponse.json(
      { ok: true, resendId: data?.id },
      { status: 200 }
    )
  } catch (err) {
    const detail = getErrorMessage(err)
    console.error("[contact] resend exception:", err)
    return NextResponse.json(
      { ok: false, error: "resend_exception", detail },
      { status: 500 }
    )
  }
}