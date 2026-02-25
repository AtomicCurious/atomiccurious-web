// app/api/download/[token]/route.ts
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

// Map: assetSlug -> archivo real en /public/downloads
const assetMap: Record<string, string> = {
  "calendar-science-2026-en": "/downloads/calendar-science-2026-en.pdf",
  "calendar-science-2026-en-print": "/downloads/calendar-science-2026-en-print.pdf",
  "calendario-ciencia-2026-es": "/downloads/calendario-ciencia-2026-es.pdf",
}

// ✅ Netlify/Next build: params suele venir como Promise
type RouteContext = {
  params: Promise<{ token: string }>
}

function getClientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null
  )
}

// Heurística simple para NO contar bots/prefetch.
// ✅ CAMBIO: si NO hay UA, NO lo trates como bot (si no, nunca contarás algunos clicks reales)
function looksLikePrefetchOrBot(req: NextRequest) {
  const uaRaw = req.headers.get("user-agent") || ""
  const ua = uaRaw.toLowerCase()

  if (!ua) return false // ✅ antes: true (bloqueaba descargas con UA vacío)

  return (
    ua.includes("bot") ||
    ua.includes("crawler") ||
    ua.includes("spider") ||
    ua.includes("preview") ||
    ua.includes("facebookexternalhit") ||
    ua.includes("slackbot") ||
    ua.includes("discordbot") ||
    ua.includes("whatsapp") ||
    ua.includes("telegram") ||
    ua.includes("googleimageproxy")
  )
}

async function handle(req: NextRequest, context: RouteContext, countDownload: boolean) {
  const { token } = await context.params
  const rawToken = (token || "").trim()

  if (!rawToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 })
  }

  const tokenHash = hashToken(rawToken)

  // 1) Leer link
  const link = await prisma.downloadLink.findUnique({
    where: { tokenHash },
    select: {
      id: true,
      leadId: true,
      assetSlug: true,
      expiresAt: true,
      clickedAt: true,
    },
  })

  if (!link) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 })
  }

  if (new Date() > link.expiresAt) {
    return NextResponse.json({ error: "Token expired" }, { status: 410 })
  }

  const assetPath = assetMap[link.assetSlug]
  if (!assetPath) {
    return NextResponse.json(
      { error: `Unknown asset: ${link.assetSlug}` },
      { status: 404 }
    )
  }

  // 2) Redirect SIEMPRE
  const redirectUrl = new URL(assetPath, req.url)
  const res = NextResponse.redirect(redirectUrl, 302)
  res.headers.set("Cache-Control", "no-store, max-age=0")

  // Defaults debug headers
  res.headers.set("x-ac-clicked", link.clickedAt ? "1" : "0")
  res.headers.set("x-ac-download", "pending")

  // 3) Tracking (best-effort)
  try {
    const ip = getClientIp(req)
    const userAgent = req.headers.get("user-agent")

    // clickedAt SOLO primer click (con metadata)
    if (!link.clickedAt) {
      await prisma.downloadLink.update({
        where: { id: link.id },
        data: { clickedAt: new Date(), ip, userAgent },
      })
      res.headers.set("x-ac-clicked", "1")
    }

    // Download SOLO en GET real (no HEAD) y no bot/prefetch
    if (!countDownload) {
      res.headers.set("x-ac-download", "skipped_head")
      return res
    }

    if (looksLikePrefetchOrBot(req)) {
      res.headers.set("x-ac-download", "skipped_bot")
      return res
    }

    if (!link.leadId) {
      res.headers.set("x-ac-download", "skipped_no_lead")
      return res
    }

    await prisma.download.create({
      data: {
        leadId: link.leadId,
        assetSlug: link.assetSlug,
        linkId: link.id,
      },
    })

    res.headers.set("x-ac-download", "created")
  } catch (e) {
    console.error("[download] tracking failed:", e)
    res.headers.set("x-ac-download", "error")
  }

  return res
}

export async function GET(req: NextRequest, context: RouteContext) {
  return handle(req, context, true)
}

export async function HEAD(req: NextRequest, context: RouteContext) {
  return handle(req, context, false)
}