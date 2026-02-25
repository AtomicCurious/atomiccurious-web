// app/api/lead-magnet/calendar-en/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"
import { resend, RESEND_FROM, APP_URL } from "@/lib/resend"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Variant = "standard" | "print"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function normalizeVariant(v: unknown): Variant {
  return v === "print" ? "print" : "standard"
}

// ---- anti-abuse (in-memory) ----
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 6
const hits = new Map<string, { count: number; start: number }>()

function rateLimitKey(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  )
}

function isRateLimited(key: string) {
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(key, { count: 1, start: now })
    return false
  }
  entry.count += 1
  hits.set(key, entry)
  return entry.count > MAX_PER_WINDOW
}

// ---- token helpers ----
function generateToken() {
  return crypto.randomBytes(32).toString("hex")
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

const LINK_TTL_HOURS = 72
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

export async function POST(req: Request) {
  // Only JSON
  const ct = req.headers.get("content-type") || ""
  if (!ct.includes("application/json")) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // ❌ TEMPORALMENTE DESACTIVADO (serverless mantiene memoria y puede bloquear IP)
  /*
  if (isRateLimited(rateLimitKey(req))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
  }
  */

  const body = await req.json().catch(() => null)

  const email = (body?.email ?? "").toString().trim().toLowerCase()
  const variant = normalizeVariant(body?.variant)
  const honey = (body?.company ?? "").toString().trim()

  // Honeypot / invalid
  if (honey || !email || !isValidEmail(email)) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const assetSlug =
    variant === "print"
      ? "calendar-science-2026-en-print"
      : "calendar-science-2026-en"

  // ---- persist lead + create unique download link token ----
  let tokenForEmail: string | null = null

  try {
    const lead = await prisma.lead.upsert({
      where: { email },
      update: {
        source: "lead-magnet",
        utmSource: body?.utmSource ?? null,
        utmMedium: body?.utmMedium ?? null,
        utmCampaign: body?.utmCampaign ?? null,
      },
      create: {
        email,
        source: "lead-magnet",
        utmSource: body?.utmSource ?? null,
        utmMedium: body?.utmMedium ?? null,
        utmCampaign: body?.utmCampaign ?? null,
      },
    })

    // ✅ Genera token y GUARDA el raw token para el email (solo el hash va a DB)
    const token = generateToken()
    tokenForEmail = token

    const tokenHash = hashToken(token)

    await prisma.downloadLink.create({
      data: {
        leadId: lead.id,
        assetSlug,
        tokenHash,
        expiresAt: addHours(new Date(), LINK_TTL_HOURS),
      },
    })
  } catch (dbErr) {
    console.error("[calendar-en] db error:", dbErr)
    // Si falla DB, igual respondemos ok para no filtrar señales
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // ✅ Link trackeado (marca clickedAt + crea Download en /api/download/[token])
  // IMPORTANT: usar APP_URL (no SITE_URL) porque Netlify puede sobreescribir SITE_URL internamente
  const trackedDownloadUrl = `${APP_URL}/api/download/${tokenForEmail}`

  // ---- send email ----
  try {
    await resend.emails.send({
      from: RESEND_FROM, // debe ser @send.atomiccurious.com (dominio verificado)
      to: email,
      replyTo: "hello.atomiccurious@gmail.com", // ✅ respuestas llegan a Gmail
      subject: "Your Science Calendar 2026 📅",
      text:
        `Thanks for downloading the Science Calendar 2026.\n\n` +
        `Version: ${variant === "print" ? "Print" : "Standard"}\n\n` +
        `Download here:\n${trackedDownloadUrl}\n\n` +
        `This link expires in ${LINK_TTL_HOURS} hours.\n\n` +
        `— AtomicCurious Team`,
    })

    // ✅ respuesta limpia
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    const detail = getErrorMessage(err)
    console.error("[calendar-en] resend error:", err)
    return NextResponse.json(
      { ok: false, error: "resend_failed", detail },
      { status: 500 }
    )
  }
}