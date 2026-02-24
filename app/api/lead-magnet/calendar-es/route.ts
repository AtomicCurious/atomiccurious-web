// app/api/lead-magnet/calendar-es/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"
import { resend, RESEND_FROM, SITE_URL } from "@/lib/resend"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

type Variant = "standard" | "print"

function isValidEmail(email: string) {
  // mínima, suficiente para lead magnet
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function normalizeVariant(v: unknown): Variant {
  return v === "print" ? "print" : "standard"
}

// ---- anti-abuso barato (in-memory) ----
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 6
const hits = new Map<string, { count: number; start: number }>()

function rateLimitKey(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  return ip
}

function isRateLimited(key: string) {
  const now = Date.now()
  const entry = hits.get(key)
  if (!entry) {
    hits.set(key, { count: 1, start: now })
    return false
  }
  if (now - entry.start > WINDOW_MS) {
    hits.set(key, { count: 1, start: now })
    return false
  }
  entry.count += 1
  hits.set(key, entry)
  return entry.count > MAX_PER_WINDOW
}

// ---- token helpers ----
function generateToken() {
  return crypto.randomBytes(32).toString("hex") // 64 chars
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

const LINK_TTL_HOURS = 72
function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}

export async function POST(req: Request) {
  // 1) Content-Type básico
  const ct = req.headers.get("content-type") || ""
  if (!ct.includes("application/json")) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // 2) Rate limit
  const key = rateLimitKey(req)
  if (isRateLimited(key)) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const body = await req.json().catch(() => null)

  const email = (body?.email ?? "").toString().trim().toLowerCase()
  const variant = normalizeVariant(body?.variant)

  // Honeypot
  const honey = (body?.company ?? "").toString().trim()
  if (honey) return NextResponse.json({ ok: true }, { status: 200 })

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const assetSlug =
    variant === "print"
      ? "calendario-ciencia-2026-es-imprimir"
      : "calendario-ciencia-2026-es"

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

    const token = generateToken()
    const tokenHash = hashToken(token)

    await prisma.downloadLink.create({
      data: {
        leadId: lead.id,
        assetSlug,
        tokenHash,
        expiresAt: addHours(new Date(), LINK_TTL_HOURS),
      },
    })

    tokenForEmail = token
  } catch (dbErr) {
    console.error("[calendar-es] db error:", dbErr)
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const trackedDownloadUrl = `${SITE_URL}/api/download/${tokenForEmail}`

  // ---- send email ----
  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "Tu Calendario de Ciencia 2026 📅",
      text:
        `Gracias por descargar el Calendario de Ciencia 2026.\n\n` +
        `Versión: ${variant === "print" ? "Imprimir" : "Estándar"}\n\n` +
        `Descárgalo aquí:\n${trackedDownloadUrl}\n\n` +
        `Este link expira en ${LINK_TTL_HOURS} horas.\n\n` +
        `— Equipo AtomicCurious`,
    })
  } catch (err) {
    console.error("[calendar-es] resend error:", err)
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}