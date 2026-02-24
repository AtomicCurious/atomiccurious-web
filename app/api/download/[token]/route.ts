import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Map: assetSlug (DB) -> archivo real en /public/downloads
const assetMap: Record<string, string> = {
  // EN
  "calendar-science-2026-en": "/downloads/calendar-science-2026-en.pdf",
  "calendar-science-2026-en-print": "/downloads/calendar-science-2026-en-print.pdf",

  // ES
  "calendario-ciencia-2026-es": "/downloads/calendario-ciencia-2026-es.pdf",

  // ⚠️ Solo descomenta si el archivo realmente existe
  // "calendario-ciencia-2026-es-imprimir": "/downloads/calendario-ciencia-2026-es-imprimir.pdf",
};

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const rawToken = (params.token || "").trim();
  if (!rawToken) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const tokenHash = hashToken(rawToken);

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

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;

  const userAgent = req.headers.get("user-agent");

  // Registrar solo 1 descarga real por token
  await prisma.$transaction(async (tx) => {
    if (!link.clickedAt) {
      await tx.downloadLink.update({
        where: { id: link.id },
        data: { clickedAt: new Date(), ip, userAgent },
      });

      await tx.download.create({
        data: {
          leadId: link.leadId,
          assetSlug: link.assetSlug,
          linkId: link.id,
        },
      });
    }
  });

  // Redirección al archivo público
  const redirectUrl = new URL(assetPath, req.url);
  const res = NextResponse.redirect(redirectUrl, 302);

  // Evita cache del endpoint de token
  res.headers.set("Cache-Control", "no-store, max-age=0");

  return res;
}