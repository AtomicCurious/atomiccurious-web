//atomiccurious-web\app\api\download\[token]\route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

const assetMap: Record<string, string> = {
  "calendar-science-2026-en": "/downloads/calendar-science-2026-en.pdf",
  "calendar-science-2026-en-print": "/downloads/calendar-science-2026-en-print.pdf",
  "calendario-ciencia-2026-es": "/downloads/calendario-ciencia-2026-es.pdf",
};

type RouteContext = {
  params: Promise<{ token: string }>;
};

function getClientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null
  );
}

async function handle(req: NextRequest, context: RouteContext) {
  const { token } = await context.params;
  const rawToken = (token || "").trim();

  if (!rawToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const tokenHash = hashToken(rawToken);

  // 1) Leer link (si esto falla por DB, sí conviene devolver error)
  const link = await prisma.downloadLink.findUnique({
    where: { tokenHash },
    select: {
      id: true,
      leadId: true,
      assetSlug: true,
      expiresAt: true,
      clickedAt: true,
    },
  });

  if (!link) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  if (new Date() > link.expiresAt) {
    return NextResponse.json({ error: "Token expired" }, { status: 410 });
  }

  const assetPath = assetMap[link.assetSlug];
  if (!assetPath) {
    return NextResponse.json(
      { error: `Unknown asset: ${link.assetSlug}` },
      { status: 404 }
    );
  }

  // 2) Preparar redirect (esto debe suceder aunque el tracking falle)
  const redirectUrl = new URL(assetPath, req.url);
  const res = NextResponse.redirect(redirectUrl, 302);
  res.headers.set("Cache-Control", "no-store, max-age=0");

  // 3) Tracking best-effort (no bloquea descarga)
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent");

  try {
    const updated = await prisma.downloadLink.updateMany({
      where: { id: link.id, clickedAt: null },
      data: { clickedAt: new Date(), ip, userAgent },
    });

    if (updated.count === 1) {
      // Evita 500 si leadId es null o si tu schema requiere leadId
      if (link.leadId) {
        await prisma.download.create({
          data: {
            leadId: link.leadId,
            assetSlug: link.assetSlug,
            linkId: link.id,
          },
        });
      } else {
        // Si quieres, puedes registrar sin leadId (si tu schema lo permite)
        // o crear otro registro tipo "anonymousDownload".
      }
    }
  } catch (e) {
    // Importante: NO rompas la descarga
    // (Opcional) console.error("Download tracking failed", e);
  }

  return res;
}

export async function GET(req: NextRequest, context: RouteContext) {
  return handle(req, context);
}

// Soporta scanners/prefetch que mandan HEAD
export async function HEAD(req: NextRequest, context: RouteContext) {
  return handle(req, context);
}