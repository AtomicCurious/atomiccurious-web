// app/api/stripe/receipt/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib"

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

function formatAmountFromSession(session: Stripe.Checkout.Session) {
  const amountTotal = session.amount_total
  const currency = session.currency?.toUpperCase()

  if (amountTotal == null || !currency) {
    return "Aporte registrado"
  }

  const locale = session.metadata?.locale === "es" ? "es-MX" : "en-US"

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "code",
  }).format(amountTotal / 100)
}

function formatDateFromSession(session: Stripe.Checkout.Session) {
  if (!session.created) return "Fecha no disponible"

  const locale = session.metadata?.locale === "es" ? "es-MX" : "en-US"

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(session.created * 1000))
}

function formatStatusFromSession(session: Stripe.Checkout.Session) {
  const isSpanish = session.metadata?.locale === "es"

  switch (session.payment_status) {
    case "paid":
      return isSpanish ? "Confirmado" : "Confirmed"
    case "unpaid":
      return isSpanish ? "Pendiente" : "Pending"
    case "no_payment_required":
      return isSpanish ? "Completado" : "Completed"
    default:
      return isSpanish ? "Registrado" : "Recorded"
  }
}

function drawWrappedText(
  page: import("pdf-lib").PDFPage,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  font: import("pdf-lib").PDFFont,
  fontSize: number,
  color: ReturnType<typeof rgb>
) {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let currentLine = ""

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const width = font.widthOfTextAtSize(testLine, fontSize)

    if (width <= maxWidth) {
      currentLine = testLine
    } else {
      if (currentLine) lines.push(currentLine)
      currentLine = word
    }
  }

  if (currentLine) lines.push(currentLine)

  let currentY = y

  for (const line of lines) {
    page.drawText(line, {
      x,
      y: currentY,
      size: fontSize,
      font,
      color,
    })
    currentY -= lineHeight
  }

  return currentY
}

async function buildReceiptPdf(session: Stripe.Checkout.Session) {
  const isSpanish = session.metadata?.locale === "es"

  const amount = formatAmountFromSession(session)
  const supportId = buildSupportId(session)
  const dateLabel = formatDateFromSession(session)
  const statusLabel = formatStatusFromSession(session)

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595.28, 841.89]) // A4
  const { width, height } = page.getSize()

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier)

  const bg = rgb(0.04, 0.06, 0.09)
  const card = rgb(0.08, 0.10, 0.14)
  const border = rgb(0.18, 0.20, 0.24)
  const text = rgb(0.95, 0.96, 0.98)
  const muted = rgb(0.68, 0.71, 0.76)
  const green = rgb(0.20, 0.83, 0.60)
  const cyan = rgb(0.13, 0.83, 0.93)
  const orange = rgb(0.98, 0.57, 0.24)

  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: bg,
  })

  page.drawCircle({ x: 110, y: 745, size: 90, color: green, opacity: 0.12 })
  page.drawCircle({ x: 480, y: 760, size: 80, color: cyan, opacity: 0.12 })
  page.drawCircle({ x: 300, y: 110, size: 95, color: orange, opacity: 0.10 })

  const cardX = 54
  const cardY = 120
  const cardW = width - 108
  const cardH = 610

  page.drawRectangle({
    x: cardX,
    y: cardY,
    width: cardW,
    height: cardH,
    color: card,
    borderColor: border,
    borderWidth: 1,
  })

  page.drawRectangle({
    x: cardX + 24,
    y: cardY + cardH - 20,
    width: cardW - 48,
    height: 2,
    color: green,
    opacity: 0.65,
  })
  page.drawRectangle({
    x: cardX + 24 + (cardW - 48) / 3,
    y: cardY + cardH - 20,
    width: (cardW - 48) / 3,
    height: 2,
    color: cyan,
    opacity: 0.65,
  })
  page.drawRectangle({
    x: cardX + 24 + ((cardW - 48) / 3) * 2,
    y: cardY + cardH - 20,
    width: (cardW - 48) / 3,
    height: 2,
    color: orange,
    opacity: 0.65,
  })

  const labelUniverse = isSpanish
    ? "UNIVERSO ATOMICCURIOUS"
    : "ATOMICCURIOUS UNIVERSE"

  page.drawText(labelUniverse, {
    x: cardX + 28,
    y: cardY + cardH - 48,
    size: 10,
    font: fontBold,
    color: muted,
  })

  page.drawText(
    isSpanish ? "Comprobante de aporte" : "Contribution receipt",
    {
      x: cardX + 28,
      y: cardY + cardH - 90,
      size: 26,
      font: fontBold,
      color: text,
    }
  )

  const intro = isSpanish
    ? "Tu aporte quedó registrado correctamente. Gracias por ayudar a sostener este universo de ideas, exploraciones y recursos diseñados con intención."
    : "Your contribution has been recorded successfully. Thank you for helping sustain this universe of ideas, explorations, and resources designed with intention."

  drawWrappedText(
    page,
    intro,
    cardX + 28,
    cardY + cardH - 120,
    cardW - 56,
    18,
    fontRegular,
    12,
    muted
  )

  const topBoxY = cardY + cardH - 240
  const leftBoxX = cardX + 28
  const boxGap = 14
  const halfW = (cardW - 56 - boxGap) / 2

  page.drawRectangle({
    x: leftBoxX,
    y: topBoxY,
    width: halfW,
    height: 84,
    color: rgb(0.10, 0.12, 0.16),
    borderColor: border,
    borderWidth: 1,
  })

  page.drawRectangle({
    x: leftBoxX + halfW + boxGap,
    y: topBoxY,
    width: halfW,
    height: 84,
    color: rgb(0.10, 0.12, 0.16),
    borderColor: border,
    borderWidth: 1,
  })

  page.drawText(isSpanish ? "Registro" : "Record", {
    x: leftBoxX + 16,
    y: topBoxY + 58,
    size: 10,
    font: fontBold,
    color: muted,
  })

  page.drawText(supportId, {
    x: leftBoxX + 16,
    y: topBoxY + 28,
    size: 16,
    font: fontMono,
    color: text,
  })

  page.drawText(isSpanish ? "Aporte" : "Contribution", {
    x: leftBoxX + halfW + boxGap + 16,
    y: topBoxY + 58,
    size: 10,
    font: fontBold,
    color: muted,
  })

  page.drawText(amount, {
    x: leftBoxX + halfW + boxGap + 16,
    y: topBoxY + 28,
    size: 16,
    font: fontBold,
    color: text,
  })

  const gridY = topBoxY - 118
  const colW = (cardW - 56 - boxGap * 2) / 3

  const labels = isSpanish
    ? ["Tipo", "Fecha", "Estado"]
    : ["Type", "Date", "Status"]

  const values = [
    isSpanish ? "Apoyo único" : "One-time support",
    dateLabel,
    statusLabel,
  ]

  for (let i = 0; i < 3; i++) {
    const x = leftBoxX + i * (colW + boxGap)

    page.drawRectangle({
      x,
      y: gridY,
      width: colW,
      height: 92,
      color: rgb(0.10, 0.12, 0.16),
      borderColor: border,
      borderWidth: 1,
    })

    page.drawText(labels[i], {
      x: x + 16,
      y: gridY + 62,
      size: 10,
      font: fontBold,
      color: muted,
    })

    drawWrappedText(
      page,
      values[i],
      x + 16,
      gridY + 36,
      colW - 24,
      16,
      fontRegular,
      12,
      text
    )
  }

  const noteY = gridY - 142

  page.drawRectangle({
    x: leftBoxX,
    y: noteY,
    width: cardW - 56,
    height: 118,
    color: rgb(0.10, 0.12, 0.16),
    borderColor: border,
    borderWidth: 1,
  })

  page.drawText(isSpanish ? "Nota" : "Note", {
    x: leftBoxX + 16,
    y: noteY + 86,
    size: 10,
    font: fontBold,
    color: muted,
  })

  const noteText = isSpanish
    ? "Gracias por sostener este universo. Cada aporte ayuda a convertir curiosidad en nuevas piezas, mejores recursos y exploraciones hechas con más intención y más curiosidad."
    : "Thank you for supporting this universe. Every contribution helps turn curiosity into new pieces, better resources, and explorations made with more intention and sharper focus."

  drawWrappedText(
    page,
    noteText,
    leftBoxX + 16,
    noteY + 60,
    cardW - 88,
    18,
    fontRegular,
    12,
    text
  )

  page.drawText("AtomicCurious", {
    x: cardX + 28,
    y: cardY + 34,
    size: 11,
    font: fontBold,
    color: muted,
  })

  page.drawText("https://atomiccurious.com", {
    x: cardX + 28,
    y: cardY + 18,
    size: 10,
    font: fontRegular,
    color: muted,
  })

  return pdfDoc.save()
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id")

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return new NextResponse("Missing or invalid session_id", { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return new NextResponse("Server misconfigured", { status: 500 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const pdfBytes = await buildReceiptPdf(session)
    const supportId = buildSupportId(session)

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${supportId}.pdf"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Receipt PDF generation error:", error)
    return new NextResponse("Could not generate receipt PDF", { status: 500 })
  }
}