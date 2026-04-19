// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { resend, RESEND_FROM } from "@/lib/resend"
import { renderDonationReceiptHtml } from "@/lib/donations/renderDonationReceiptHtml"
import { renderDonationReceiptText } from "@/lib/donations/renderDonationReceiptText"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

function buildSupportId(session: Stripe.Checkout.Session) {
  const created = new Date(session.created * 1000)
  const year = String(created.getUTCFullYear())

  const sourceId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.id

  const suffix = sourceId.slice(-6).toUpperCase()

  return `AC-${year}-${suffix}`
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return new NextResponse("Missing stripe-signature header", { status: 400 })
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing STRIPE_WEBHOOK_SECRET")
    return new NextResponse("Server misconfigured", { status: 500 })
  }

  const body = await req.text()

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return new NextResponse("Webhook signature verification failed", {
      status: 400,
    })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        const existingDonation = await prisma.donation.findUnique({
          where: {
            stripeSessionId: session.id,
          },
        })

        if (existingDonation) {
          return NextResponse.json({ received: true, duplicate: true })
        }

        const supportId = buildSupportId(session)

        const donation = await prisma.donation.create({
          data: {
            stripeSessionId: session.id,
            amount: session.amount_total ?? 0,
            currency: session.currency ?? "usd",
            email: session.customer_details?.email ?? null,
            supportId,
          },
        })

        if (donation.email) {
          try {
            const isSpanish = session.metadata?.locale === "es"
            const locale = isSpanish ? "es-MX" : "en-US"

            const amountFormatted = new Intl.NumberFormat(locale, {
              style: "currency",
              currency: donation.currency.toUpperCase(),
              currencyDisplay: "code",
            }).format(donation.amount / 100)

            const dateFormatted = new Intl.DateTimeFormat(locale, {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "America/Mexico_City",
            }).format(donation.createdAt)

            const subject = isSpanish
              ? "Tu comprobante – AtomicCurious"
              : "Your receipt – AtomicCurious"

            await resend.emails.send({
              from: RESEND_FROM,
              to: donation.email,
              subject,
              html: renderDonationReceiptHtml({
                amount: amountFormatted,
                supportId: donation.supportId!,
                date: dateFormatted,
              }),
              text: renderDonationReceiptText({
                amount: amountFormatted,
                supportId: donation.supportId!,
                date: dateFormatted,
                locale: isSpanish ? "es" : "en",
              }),
            })
          } catch (err) {
            console.error("Resend email error:", err)
          }
        }

        break
      }

      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Stripe webhook handler error:", error)
    return new NextResponse("Webhook handler failed", { status: 500 })
  }
}