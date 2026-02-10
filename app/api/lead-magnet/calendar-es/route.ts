//app\api\lead-magnet\calendar-es\route.ts
import { NextResponse } from "next/server"
import { resend, RESEND_FROM, SITE_URL } from "@/lib/resend"

export const runtime = "nodejs"

type Variant = "standard" | "print"

function isValidEmail(email: string) {
  // mínima, suficiente para lead magnet
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function normalizeVariant(v: unknown): Variant {
  return v === "print" ? "print" : "standard"
}

// ---- anti-abuso barato (in-memory) ----
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 6
const hits = new Map<string, { count: number; start: number }>()

function rateLimitKey(req: Request) {
  // En Vercel suele venir x-forwarded-for
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

export async function POST(req: Request) {
  // 1) Content-Type básico
  const ct = req.headers.get("content-type") || ""
  if (!ct.includes("application/json")) {
    // respuesta neutra
    return NextResponse.json({ ok: true })
  }

  // 2) Rate limit
  const key = rateLimitKey(req)
  if (isRateLimited(key)) {
    // neutra para no dar señales, pero podrías usar 429 si quieres
    return NextResponse.json({ ok: true })
  }

  const body = await req.json().catch(() => null)

  const email = (body?.email ?? "").toString().trim().toLowerCase()
  const variant = normalizeVariant(body?.variant)

  // Honeypot: si viene lleno => bot => drop silencioso
  const honey = (body?.company ?? "").toString().trim()
  if (honey) {
    return NextResponse.json({ ok: true })
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ ok: true })
  }

  const downloadUrl =
    variant === "print"
      ? `${SITE_URL}/downloads/calendario-ciencia-2026-es-imprimir.pdf`
      : `${SITE_URL}/downloads/calendario-ciencia-2026-es.pdf`

  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "Tu Calendario de Ciencia 2026 📅",
      text:
        `Gracias por descargar el Calendario de Ciencia 2026.\n\n` +
        `Versión: ${variant === "print" ? "Imprimir" : "Estándar"}\n\n` +
        `Aquí tienes tu link directo:\n${downloadUrl}\n\n` +
        `— Equipo AtomicCurious`,
    })
  } catch (err) {
    // Mantén neutralidad al usuario, pero NO te quedes ciego.
    console.error("[calendar-es] resend error:", err)
  }

  return NextResponse.json({ ok: true })
}
