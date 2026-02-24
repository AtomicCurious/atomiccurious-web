// app/api/lead-magnet/calendar-en/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"
import { resend, RESEND_FROM, SITE_URL } from "@/lib/resend"
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
  return crypto.randomBytes(32).toString("hex") // 64 chars
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

const LINK_TTL_HOURS = 72
function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000)
}

// Map: assetSlug -> archivo real en /public/downloads
const assetMap: Record<string, string> = {
  "calendar-science-2026-en": "/downloads/calendar-science-2026-en.pdf",
  "calendar-science-2026-en-print": "/downloads/calendar-science-2026-en-print.pdf",
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

  // Rate limit
  if (isRateLimited(rateLimitKey(req))) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

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
  } catch (dbErr) {
    console.error("[calendar-en] db error:", dbErr)
    // Si falla DB, igual respondemos ok para no filtrar señales
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  // ✅ Link directo al PDF (evita el error del primer click en /api/download)
  const directPdfUrl = `${SITE_URL}${assetMap[assetSlug]}`

  // ---- send email (si falla, NO lo ocultes) ----
  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "Your Science Calendar 2026 📅",
      text:
        `Thanks for downloading the Science Calendar 2026.\n\n` +
        `Version: ${variant === "print" ? "Print" : "Standard"}\n\n` +
        `Download here:\n${directPdfUrl}\n\n` +
        `— AtomicCurious Team`,
    })
  } catch (err) {
    const detail = getErrorMessage(err)
    console.error("[calendar-en] resend error:", err)
    return NextResponse.json(
      { ok: false, error: "resend_failed", detail },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}