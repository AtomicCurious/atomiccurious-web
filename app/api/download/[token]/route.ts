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

// ✅ IMPORTANTE: en tu proyecto el context.params ES Promise (así compila en Netlify)
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

// Heurística simple para NO contar bots/prefetch agresivo.
// (No es perfecto, pero evita inflar métricas)
function looksLikePrefetchOrBot(req: NextRequest) {
  const ua = (req.headers.get("user-agent") || "").toLowerCase()
  if (!ua) return true
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

// ✅ Un solo handler para GET/HEAD: HEAD no cuenta download
async function handle(req: NextRequest, context: RouteContext, countDownload: boolean) {
  const { token } = await context.params
  const rawToken = (token || "").trim()

  if (!rawToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 })
  }

  const tokenHash = hashToken(rawToken)

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

  // Redirect siempre (la descarga NO debe depender del tracking)
  const redirectUrl = new URL(assetPath, req.url)
  const res = NextResponse.redirect(redirectUrl, 302)
  res.headers.set("Cache-Control", "no-store, max-age=0")

  // ===== Tracking (best-effort) =====
  try {
    const ip = getClientIp(req)
    const userAgent = req.headers.get("user-agent")

    // clickedAt + metadata SOLO en el primer uso
    if (!link.clickedAt) {
      await prisma.downloadLink.update({
        where: { id: link.id },
        data: { clickedAt: new Date(), ip, userAgent },
      })
    }

    // Download = cada GET real (NO HEAD y NO bots/prefetch)
    if (countDownload && !looksLikePrefetchOrBot(req) && link.leadId) {
      await prisma.download.create({
        data: {
          leadId: link.leadId,
          assetSlug: link.assetSlug,
          linkId: link.id,
        },
      })
    }
  } catch {
    // NO rompas la descarga
  }

  return res
}

export async function GET(req: NextRequest, context: RouteContext) {
  return handle(req, context, true)
}

// HEAD no cuenta downloads (evita scanners/prefetch)
export async function HEAD(req: NextRequest, context: RouteContext) {
  return handle(req, context, false)
}