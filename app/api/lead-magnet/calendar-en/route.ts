// app/api/lead-magnet/calendar-en/route.ts
import { NextResponse } from "next/server"
import { resend, RESEND_FROM, SITE_URL } from "@/lib/resend"

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

  const downloadUrl =
    variant === "print"
      ? `${SITE_URL}/downloads/calendar-science-2026-en-print.pdf`
      : `${SITE_URL}/downloads/calendar-science-2026-en.pdf`

  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "Your Science Calendar 2026 📅",
      text:
        `Thanks for downloading the Science Calendar 2026.\n\n` +
        `Version: ${variant === "print" ? "Print" : "Standard"}\n\n` +
        `Direct download:\n${downloadUrl}\n\n` +
        `— AtomicCurious Team`,
    })
  } catch (err) {
    console.error("[calendar-en] resend error:", err)
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
