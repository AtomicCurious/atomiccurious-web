// app/api/newsletter/unsubscribe/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Locale = "en" | "es"

function normalizeLocale(v: unknown): Locale {
  return v === "es" ? "es" : "en"
}

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

function getUnsubscribedRedirectPath(locale: Locale) {
  return locale === "es"
    ? "/es/newsletter/unsubscribed"
    : "/newsletter/unsubscribed"
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const token = (searchParams.get("token") || "").trim()
  const locale = normalizeLocale(searchParams.get("locale"))

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "missing_token" },
      { status: 400 }
    )
  }

  const tokenHash = hashToken(token)

  const subscriber = await prisma.newsletterSubscriber.findFirst({
    where: {
      OR: [
        { unsubscribeToken: token },
        { unsubscribeTokenHash: tokenHash },
      ],
    },
    select: {
      id: true,
      email: true,
      status: true,
    },
  })

  if (!subscriber) {
    return NextResponse.json(
      { ok: false, error: "invalid_token" },
      { status: 404 }
    )
  }

  if (subscriber.status !== "unsubscribed") {
    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: "unsubscribed",
        unsubscribedAt: new Date(),
        confirmTokenHash: null,
        confirmExpiresAt: null,
      },
    })
  }

  const redirectPath = getUnsubscribedRedirectPath(locale)

  return NextResponse.redirect(new URL(redirectPath, req.url), 302)
}