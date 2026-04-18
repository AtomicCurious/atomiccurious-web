// app/api/stripe/donate/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const SUPPORTED_CURRENCIES = {
  usd: { min: 1, symbol: "$", label: "USD", zeroDecimal: false },
  mxn: { min: 10, symbol: "$", label: "MXN", zeroDecimal: false },
  eur: { min: 1, symbol: "€", label: "EUR", zeroDecimal: false },
  gbp: { min: 1, symbol: "£", label: "GBP", zeroDecimal: false },
} as const

type SupportedCurrency = keyof typeof SUPPORTED_CURRENCIES
type CheckoutLocale = "es" | "en"

const MAX_AMOUNT = 10000

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const rawAmount = body?.amount
    const rawLocale = body?.locale
    const rawCurrency = body?.currency

    const locale: CheckoutLocale = rawLocale === "es" ? "es" : "en"

    const currency: SupportedCurrency =
      rawCurrency === "mxn" ||
      rawCurrency === "usd" ||
      rawCurrency === "eur" ||
      rawCurrency === "gbp"
        ? rawCurrency
        : locale === "es"
          ? "mxn"
          : "usd"

    const amount = Number(rawAmount)
    const { min, label, zeroDecimal } = SUPPORTED_CURRENCIES[currency]

    if (!Number.isFinite(amount)) {
      return NextResponse.json(
        { error: locale === "es" ? "Monto inválido" : "Invalid amount" },
        { status: 400 }
      )
    }

    if (amount < min) {
      return NextResponse.json(
        {
          error:
            locale === "es"
              ? `El monto mínimo es ${min} ${label}`
              : `The minimum amount is ${min} ${label}`,
        },
        { status: 400 }
      )
    }

    if (amount > MAX_AMOUNT) {
      return NextResponse.json(
        {
          error:
            locale === "es"
              ? "El monto excede el máximo permitido"
              : "The amount exceeds the maximum allowed",
        },
        { status: 400 }
      )
    }

    const unitAmount = zeroDecimal
      ? Math.round(amount)
      : Math.round(amount * 100)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim()

    if (!baseUrl) {
      return NextResponse.json(
        {
          error:
            locale === "es"
              ? "Falta configurar NEXT_PUBLIC_BASE_URL"
              : "NEXT_PUBLIC_BASE_URL is missing",
        },
        { status: 500 }
      )
    }

    const normalizedBaseUrl = baseUrl.replace(/\/+$/, "")
    const successPath = locale === "es" ? "es/gracias" : "thank-you"
    const cancelPath = locale === "es" ? "es/apoyar" : "support"

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name:
                locale === "es"
                  ? "Apoyo a AtomicCurious"
                  : "Support AtomicCurious",
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
      success_url: `${normalizedBaseUrl}/${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${normalizedBaseUrl}/${cancelPath}`,
      metadata: {
        type: "donation",
        locale,
        currency,
        amount: amount.toString(),
      },
    })

    if (!session.url) {
      return NextResponse.json(
        {
          error:
            locale === "es"
              ? "No se pudo generar la URL de pago"
              : "Could not generate the checkout URL",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      url: session.url,
    })
  } catch (error) {
    console.error("Stripe session creation error:", error)

    return NextResponse.json(
      {
        error:
          "No se pudo crear la sesión de pago",
      },
      { status: 500 }
    )
  }
}