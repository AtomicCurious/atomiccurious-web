// app/api/stripe/donate/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const rawAmount = body?.amount
    const rawLocale = body?.locale

    const locale = rawLocale === "es" ? "es" : "en"
    const amount = Number(rawAmount)

    if (!Number.isFinite(amount)) {
      return NextResponse.json(
        { error: "Monto inválido" },
        { status: 400 }
      )
    }

    if (amount < 1) {
      return NextResponse.json(
        { error: "El monto mínimo es 1" },
        { status: 400 }
      )
    }

    if (amount > 10000) {
      return NextResponse.json(
        { error: "El monto excede el máximo permitido" },
        { status: 400 }
      )
    }

    const unitAmount = Math.round(amount * 100)

    const currency = "usd"

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    if (!baseUrl) {
      return NextResponse.json(
        { error: "Falta configurar NEXT_PUBLIC_BASE_URL" },
        { status: 500 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: locale === "es" ? "Apoyo a AtomicCurious" : "Support AtomicCurious",
              description:
                locale === "es"
                  ? "Gracias por apoyar este proyecto ✨"
                  : "Thank you for supporting this project ✨",
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/${locale === "es" ? "es/gracias" : "thank-you"}`,
      cancel_url: `${baseUrl}/${locale === "es" ? "es/apoyar" : "support"}`,
      metadata: {
        type: "donation",
        locale,
        amount: amount.toString(),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe session creation error:", error)

    return NextResponse.json(
      { error: "No se pudo crear la sesión de pago" },
      { status: 500 }
    )
  }
}