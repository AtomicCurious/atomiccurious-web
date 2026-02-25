// app/api/download/[token]/route.ts
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

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

/**
 * Heurística conservadora para NO contar prefetch/prerender/bots.
 * - NO trata UA vacío como bot
 * - Prefetch/prerender: usa headers purpose/sec-purpose + flags comunes
 * - Bots/crawlers: solo si el UA existe y matchea patrones conocidos
 */
function looksLikePrefetchOrBot(req: NextRequest) {
  const purpose = (req.headers.get("purpose") || "").toLowerCase()
  const secPurpose = (req.headers.get("sec-purpose") || "").toLowerCase()
  const xMiddlewarePrefetch = req.headers.get("x-middleware-prefetch")
  const nextRouterPrefetch = req.headers.get("next-router-prefetch")

  // Prefetch/prerender signals (más confiables que UA)
  if (purpose.includes("prefetch") || purpose.includes("prerender")) return true
  if (secPurpose.includes("prefetch") || secPurpose.includes("prerender"))
    return true
  if (xMiddlewarePrefetch === "1") return true
  if (nextRouterPrefetch === "1") return true

  const ua = (req.headers.get("user-agent") || "").toLowerCase()
  if (!ua) return false

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

async function handle(
  req: NextRequest,
  context: RouteContext,
  countDownload: boolean
) {
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

  // ✅ Null-safe: si expiresAt existe y ya pasó, expira
  if (link.expiresAt && new Date() > link.expiresAt) {
    return NextResponse.json({ error: "Token expired" }, { status: 410 })
  }

  const assetPath = assetMap[link.assetSlug]
  if (!assetPath) {
    return NextResponse.json(
      { error: `Unknown asset: ${link.assetSlug}` },
      { status: 404 }
    )
  }

  // 2) Redirect SIEMPRE (tracking es best-effort)
  const redirectUrl = new URL(assetPath, req.url)
  const res = NextResponse.redirect(redirectUrl, 302)

  // Anti-cache (útil para evitar reuso raro en algunos previews)
  res.headers.set("Cache-Control", "no-store, max-age=0")

  // Debug headers base
  res.headers.set("x-ac-clicked", link.clickedAt ? "1" : "0")
  res.headers.set("x-ac-download", "pending")

  // Debug extra (para ver por qué se salta)
  res.headers.set(
    "x-ac-ua",
    (req.headers.get("user-agent") || "").slice(0, 80)
  )
  res.headers.set("x-ac-purpose", req.headers.get("purpose") || "")
  res.headers.set("x-ac-sec-purpose", req.headers.get("sec-purpose") || "")

  // 3) Tracking (best-effort)
  try {
    // HEAD nunca cuenta download
    if (!countDownload) {
      res.headers.set("x-ac-download", "skipped_head")
      return res
    }

    // Prefetch/bot nunca cuenta download
    if (looksLikePrefetchOrBot(req)) {
      res.headers.set("x-ac-download", "skipped_bot")
      return res
    }

    if (!link.leadId) {
      res.headers.set("x-ac-download", "skipped_no_lead")
      return res
    }

    const ip = getClientIp(req)
    const userAgent = req.headers.get("user-agent")

    // clickedAt SOLO primer GET real (no HEAD/prefetch)
    if (!link.clickedAt) {
      await prisma.downloadLink.update({
        where: { id: link.id },
        data: { clickedAt: new Date(), ip, userAgent },
      })
      res.headers.set("x-ac-clicked", "1")
    }

    // Crear Download (GET real)
    await prisma.download.create({
      data: {
        leadId: link.leadId,
        assetSlug: link.assetSlug,
        linkId: link.id,
      },
    })

    res.headers.set("x-ac-download", "created")
  } catch (e) {
    console.error("[download] tracking failed:", {
      error: e,
      tokenHash,
      linkId: link?.id,
      leadId: link?.leadId,
      assetSlug: link?.assetSlug,
    })
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