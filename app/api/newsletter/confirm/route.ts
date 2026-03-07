// app/api/newsletter/confirm/route.ts
import { NextResponse } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405 }
  )
}

export async function POST(req: Request) {
  const ct = req.headers.get("content-type") || ""

  if (!ct.includes("application/json")) {
    return NextResponse.json(
      { ok: false, error: "invalid_content_type" },
      { status: 400 }
    )
  }

  const body = await req.json().catch(() => null)
  const token = (body?.token ?? "").toString().trim()

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "missing_token" },
      { status: 400 }
    )
  }

  const tokenHash = hashToken(token)

  const subscriber = await prisma.newsletterSubscriber.findFirst({
    where: {
      confirmTokenHash: tokenHash,
    },
    select: {
      id: true,
      status: true,
      confirmExpiresAt: true,
    },
  })

  if (!subscriber) {
    return NextResponse.json(
      { ok: false, error: "invalid_token" },
      { status: 404 }
    )
  }

  if (subscriber.confirmExpiresAt && new Date() > subscriber.confirmExpiresAt) {
    return NextResponse.json(
      { ok: false, error: "token_expired" },
      { status: 410 }
    )
  }

  if (subscriber.status !== "subscribed") {
    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: "subscribed",
        subscribedAt: new Date(),
        confirmTokenHash: null,
        confirmExpiresAt: null,
      },
    })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}