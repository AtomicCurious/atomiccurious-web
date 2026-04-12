// app/api/newsletter/send/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { resend, RESEND_FROM, APP_URL } from "@/lib/resend"
import { getScheduledNewsletters } from "@/lib/newsletter/registry"
import { renderNewsletterHtml } from "@/lib/newsletter/renderNewsletterHtml"
import { renderNewsletterText } from "@/lib/newsletter/renderNewsletterText"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: "unauthorized" },
    { status: 401 }
  )
}

function getUnsubscribeUrl(token: string | null, locale: string) {
  if (!token) return null

  return `${APP_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(
    token
  )}&locale=${encodeURIComponent(locale)}`
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")
  const expectedSecret = process.env.NEWSLETTER_CRON_SECRET

  if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
    return unauthorized()
  }

  const now = new Date()
  const readyEditions = getScheduledNewsletters(now)

  if (readyEditions.length === 0) {
    return NextResponse.json(
      {
        ok: true,
        message: "no_scheduled_newsletters_ready",
        results: [],
      },
      { status: 200 }
    )
  }

  const results: Array<{
    slug: string
    locale: string
    sentCount?: number
    failedCount?: number
    skipped?: boolean
    reason?: string
  }> = []

  for (const edition of readyEditions) {
    const existingCampaign = await prisma.newsletterCampaign.findUnique({
      where: { slug: edition.slug },
    })

    if (existingCampaign?.status === "sent") {
      results.push({
        slug: edition.slug,
        locale: edition.locale,
        skipped: true,
        reason: "already_sent",
      })
      continue
    }

    const campaign =
      existingCampaign ??
      (await prisma.newsletterCampaign.create({
        data: {
          slug: edition.slug,
          locale: edition.locale,
          subject: edition.subject,
          preheader: edition.preheader ?? null,
          status: "scheduled",
          scheduledFor: new Date(edition.scheduledFor),
        },
      }))

    await prisma.newsletterCampaign.update({
      where: { id: campaign.id },
      data: {
        status: "sending",
      },
    })

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: {
        status: "subscribed",
        locale: edition.locale,
      },
      select: {
        id: true,
        email: true,
        unsubscribeToken: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    if (subscribers.length === 0) {
      await prisma.newsletterCampaign.update({
        where: { id: campaign.id },
        data: {
          status: "sent",
          sentAt: new Date(),
        },
      })

      results.push({
        slug: edition.slug,
        locale: edition.locale,
        sentCount: 0,
        failedCount: 0,
      })
      continue
    }

    let sentCount = 0
    let failedCount = 0

    for (const subscriber of subscribers) {
      const alreadySent = await prisma.newsletterSend.findUnique({
        where: {
          campaignId_subscriberId: {
            campaignId: campaign.id,
            subscriberId: subscriber.id,
          },
        },
      })

      if (alreadySent) {
        continue
      }

      const unsubscribeUrl = getUnsubscribeUrl(
        subscriber.unsubscribeToken,
        edition.locale
      )

      const html = renderNewsletterHtml(edition, {
        unsubscribeUrl: unsubscribeUrl ?? undefined,
      })
      const text = renderNewsletterText(edition)

      try {
        const { data, error } = await resend.emails.send({
          from: RESEND_FROM,
          to: subscriber.email,
          subject: edition.subject,
          html,
          text,
          replyTo: "hello.atomiccurious@gmail.com",
          headers: unsubscribeUrl
            ? {
                "List-Unsubscribe": `<${unsubscribeUrl}>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
              }
            : undefined,
        })

        if (error) {
          failedCount += 1

          await prisma.newsletterSend.create({
            data: {
              campaignId: campaign.id,
              subscriberId: subscriber.id,
              email: subscriber.email,
              status: "failed",
              error: error.message ?? String(error),
            },
          })

          continue
        }

        sentCount += 1

        await prisma.newsletterSend.create({
          data: {
            campaignId: campaign.id,
            subscriberId: subscriber.id,
            email: subscriber.email,
            resendId: data?.id ?? null,
            status: "sent",
            sentAt: new Date(),
          },
        })
      } catch (error) {
        failedCount += 1

        await prisma.newsletterSend.create({
          data: {
            campaignId: campaign.id,
            subscriberId: subscriber.id,
            email: subscriber.email,
            status: "failed",
            error: error instanceof Error ? error.message : "unknown_error",
          },
        })
      }
    }

    await prisma.newsletterCampaign.update({
      where: { id: campaign.id },
      data: {
        status: "sent",
        sentAt: new Date(),
      },
    })

    results.push({
      slug: edition.slug,
      locale: edition.locale,
      sentCount,
      failedCount,
    })
  }

  return NextResponse.json(
    {
      ok: true,
      results,
    },
    { status: 200 }
  )
}