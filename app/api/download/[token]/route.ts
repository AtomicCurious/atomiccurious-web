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

type RouteContext = {
  params: { token: string }
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

async function handleGET(req: NextRequest, context: RouteContext) {
  const rawToken = (context.params.token || "").trim()
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

  // URL absoluta al PDF
  const redirectUrl = new URL(assetPath, req.url)

  // Respuesta de redirect (la descarga NO debe depender del tracking)
  const res = NextResponse.redirect(redirectUrl, 302)
  res.headers.set("Cache-Control", "no-store, max-age=0")

  // ===== Tracking (best-effort) =====
  // 1) clickedAt solo si es el primer uso
  // 2) Download se registra en cada GET "real" (no HEAD y no bots)
  try {
    // marca primer click sin bloquear si ya existía
    if (!link.clickedAt) {
      await prisma.downloadLink.update({
        where: { id: link.id },
        data: { clickedAt: new Date() },
      })
    }

    // registra download en cada GET real
    if (!looksLikePrefetchOrBot(req) && link.leadId) {
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
  return handleGET(req, context)
}

// HEAD NO cuenta downloads (evita scanners/prefetch)
export async function HEAD(req: NextRequest, context: RouteContext) {
  // responde igual que GET (redirect), pero sin tracking.
  // Para simplificar, mandamos el mismo redirect sin tocar DB.
  const rawToken = (context.params.token || "").trim()
  if (!rawToken) return new NextResponse(null, { status: 400 })

  const tokenHash = hashToken(rawToken)
  const link = await prisma.downloadLink.findUnique({
    where: { tokenHash },
    select: { assetSlug: true, expiresAt: true },
  })
  if (!link) return new NextResponse(null, { status: 404 })
  if (new Date() > link.expiresAt) return new NextResponse(null, { status: 410 })

  const assetPath = assetMap[link.assetSlug]
  if (!assetPath) return new NextResponse(null, { status: 404 })

  const redirectUrl = new URL(assetPath, req.url)
  const res = NextResponse.redirect(redirectUrl, 302)
  res.headers.set("Cache-Control", "no-store, max-age=0")
  return res
}