// app/api/newsletter/subscribe/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"
import { resend, RESEND_FROM, APP_URL } from "@/lib/resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Locale = "en" | "es"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function normalizeLocale(v: unknown): Locale {
  return v === "es" ? "es" : "en"
}

function generateToken() {
  return crypto.randomBytes(32).toString("hex")
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

const CONFIRM_TTL_HOURS = 72

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
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

function emailCopy(
  locale: Locale,
  confirmUrl: string,
  unsubscribeUrl: string
) {
  const safeConfirmUrl = escapeHtml(confirmUrl)
  const safeUnsubscribeUrl = escapeHtml(unsubscribeUrl)

  if (locale === "es") {
    const subject = "Confirma tu suscripción — AtomicCurious"

    const text =
      `Gracias por suscribirte al Boletín de AtomicCurious.\n\n` +
      `Para confirmar tu suscripción, haz clic aquí:\n${confirmUrl}\n\n` +
      `Este link expira en ${CONFIRM_TTL_HOURS} horas.\n\n` +
      `Si no fuiste tú, puedes ignorar este correo o darte de baja aquí:\n${unsubscribeUrl}\n\n` +
      `— Equipo AtomicCurious`

    const html = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirma tu suscripción — AtomicCurious</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0f;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="background-color:#0a0a0f;padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="padding:40px 32px 20px 32px;text-align:center;">
            <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#9ca3af;margin-bottom:12px;">
              AtomicCurious
            </div>
            <h1 style="margin:0;font-size:30px;line-height:1.2;color:#ffffff;font-weight:700;">
              Confirma tu suscripción
            </h1>
            <p style="margin:16px 0 0 0;font-size:16px;line-height:1.7;color:#d1d5db;">
              Gracias por unirte al newsletter de AtomicCurious.<br />
              Confirma tu email para empezar a recibir contenido sobre ciencia, tecnología y futuro.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:12px 32px 8px 32px;text-align:center;">
            <a
              href="${safeConfirmUrl}"
              style="display:inline-block;background:#ffffff;color:#0a0a0f;text-decoration:none;font-size:16px;font-weight:700;padding:14px 24px;border-radius:999px;"
            >
              Confirmar suscripción
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px 8px 32px;text-align:center;">
            <p style="margin:0;font-size:13px;line-height:1.7;color:#9ca3af;">
              Este enlace expira en ${CONFIRM_TTL_HOURS} horas.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:8px 32px 0 32px;">
            <div style="height:1px;background:#1f2937;"></div>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0 32px;">
            <p style="margin:0 0 10px 0;font-size:14px;line-height:1.7;color:#ffffff;font-weight:700;">
              ¿El botón no funciona?
            </p>
            <p style="margin:0;font-size:14px;line-height:1.8;color:#9ca3af;word-break:break-word;">
              Copia y pega este enlace en tu navegador:<br />
              <a href="${safeConfirmUrl}" style="color:#93c5fd;text-decoration:underline;">${safeConfirmUrl}</a>
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0 32px;">
            <p style="margin:0;font-size:14px;line-height:1.8;color:#9ca3af;">
              Si no solicitaste esta suscripción, puedes ignorar este correo o darte de baja aquí:
              <a href="${safeUnsubscribeUrl}" style="color:#93c5fd;text-decoration:underline;">Cancelar suscripción</a>
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px;">
            <div style="border-top:1px solid #1f2937;padding-top:20px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.7;color:#6b7280;">
                © AtomicCurious
              </p>
              <p style="margin:8px 0 0 0;font-size:12px;line-height:1.7;color:#6b7280;">
                Ciencia, tecnología y futuro.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
    `.trim()

    return { subject, text, html }
  }

  const subject = "Confirm your subscription — AtomicCurious"

  const text =
    `Thanks for subscribing to the AtomicCurious Newsletter.\n\n` +
    `To confirm your subscription, click here:\n${confirmUrl}\n\n` +
    `This link expires in ${CONFIRM_TTL_HOURS} hours.\n\n` +
    `If this wasn't you, you can ignore this email or unsubscribe here:\n${unsubscribeUrl}\n\n` +
    `— AtomicCurious Team`

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirm your subscription — AtomicCurious</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0f;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="background-color:#0a0a0f;padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="padding:40px 32px 20px 32px;text-align:center;">
            <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#9ca3af;margin-bottom:12px;">
              AtomicCurious
            </div>
            <h1 style="margin:0;font-size:30px;line-height:1.2;color:#ffffff;font-weight:700;">
              Confirm your subscription
            </h1>
            <p style="margin:16px 0 0 0;font-size:16px;line-height:1.7;color:#d1d5db;">
              Thanks for joining the AtomicCurious newsletter.<br />
              Confirm your email to start receiving content about science, technology, and the future.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:12px 32px 8px 32px;text-align:center;">
            <a
              href="${safeConfirmUrl}"
              style="display:inline-block;background:#ffffff;color:#0a0a0f;text-decoration:none;font-size:16px;font-weight:700;padding:14px 24px;border-radius:999px;"
            >
              Confirm Subscription
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 32px 8px 32px;text-align:center;">
            <p style="margin:0;font-size:13px;line-height:1.7;color:#9ca3af;">
              This link expires in ${CONFIRM_TTL_HOURS} hours.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:8px 32px 0 32px;">
            <div style="height:1px;background:#1f2937;"></div>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0 32px;">
            <p style="margin:0 0 10px 0;font-size:14px;line-height:1.7;color:#ffffff;font-weight:700;">
              Button not working?
            </p>
            <p style="margin:0;font-size:14px;line-height:1.8;color:#9ca3af;word-break:break-word;">
              Copy and paste this link into your browser:<br />
              <a href="${safeConfirmUrl}" style="color:#93c5fd;text-decoration:underline;">${safeConfirmUrl}</a>
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0 32px;">
            <p style="margin:0;font-size:14px;line-height:1.8;color:#9ca3af;">
              If this wasn't you, you can ignore this email or unsubscribe here:
              <a href="${safeUnsubscribeUrl}" style="color:#93c5fd;text-decoration:underline;">Unsubscribe</a>
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px;">
            <div style="border-top:1px solid #1f2937;padding-top:20px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.7;color:#6b7280;">
                © AtomicCurious
              </p>
              <p style="margin:8px 0 0 0;font-size:12px;line-height:1.7;color:#6b7280;">
                Science, technology, and the future.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `.trim()

  return { subject, text, html }
}

export async function POST(req: Request) {
  const ct = req.headers.get("content-type") || ""
  if (!ct.includes("application/json")) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const body = await req.json().catch(() => null)

  const email = (body?.email ?? "").toString().trim().toLowerCase()
  const honey = (body?.company ?? "").toString().trim()
  const locale = normalizeLocale(body?.locale)

  if (honey || !email || !isValidEmail(email)) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email },
    select: { status: true },
  })

  if (existing?.status === "subscribed") {
    return NextResponse.json(
      { ok: true, alreadySubscribed: true },
      { status: 200 }
    )
  }

  const rawConfirmToken = generateToken()
  const rawUnsubToken = generateToken()

  const confirmTokenHash = hashToken(rawConfirmToken)
  const unsubscribeTokenHash = hashToken(rawUnsubToken)

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {
        status: "pending",
        confirmTokenHash,
        confirmExpiresAt: addHours(new Date(), CONFIRM_TTL_HOURS),
        unsubscribeTokenHash,
        source: "newsletter",
        utmSource: body?.utmSource ?? null,
        utmMedium: body?.utmMedium ?? null,
        utmCampaign: body?.utmCampaign ?? null,
      },
      create: {
        email,
        status: "pending",
        confirmTokenHash,
        confirmExpiresAt: addHours(new Date(), CONFIRM_TTL_HOURS),
        unsubscribeTokenHash,
        source: "newsletter",
        utmSource: body?.utmSource ?? null,
        utmMedium: body?.utmMedium ?? null,
        utmCampaign: body?.utmCampaign ?? null,
      },
    })
  } catch (dbErr) {
    console.error("[newsletter/subscribe] db error:", dbErr)
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const confirmUrl =
  locale === "es"
    ? `${APP_URL}/es/newsletter/confirm?token=${rawConfirmToken}`
    : `${APP_URL}/newsletter/confirm?token=${rawConfirmToken}`
  const unsubscribeUrl = `${APP_URL}/api/newsletter/unsubscribe?token=${rawUnsubToken}&locale=${locale}`

  const { subject, text, html } = emailCopy(
    locale,
    confirmUrl,
    unsubscribeUrl
  )

  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      replyTo: "hello.atomiccurious@gmail.com",
      subject,
      text,
      html,
    })

    if (error) {
      console.error("[newsletter/subscribe] resend error:", error)
      return NextResponse.json(
        {
          ok: false,
          error: "resend_failed",
          detail: error.message ?? String(error),
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, resendId: data?.id }, { status: 200 })
  } catch (err) {
    const detail = getErrorMessage(err)
    console.error("[newsletter/subscribe] resend exception:", err)
    return NextResponse.json(
      { ok: false, error: "resend_exception", detail },
      { status: 500 }
    )
  }
}