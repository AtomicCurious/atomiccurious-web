// src/lib/donations/renderDonationReceiptText.ts

type ReceiptInput = {
  amount: string
  supportId: string
  date: string
  locale?: "es" | "en"
}

export function renderDonationReceiptText({
  amount,
  supportId,
  date,
  locale = "en",
}: ReceiptInput) {
  const isES = locale === "es"

  return isES
    ? `
UNIVERSO ATOMICCURIOUS

Aporte registrado

Tu aporte quedó registrado correctamente.
Gracias por ayudar a sostener este universo de ideas, exploraciones y recursos diseñados con intención.

━━━━━━━━━━━━━━━━━━━━

Registro:
${supportId}

Aporte:
${amount}

Fecha:
${date}

━━━━━━━━━━━━━━━━━━━━

Gracias por sostener este universo.
Cada aporte ayuda a convertir curiosidad en nuevas piezas,
mejores recursos y exploraciones hechas con más intención y más curiosidad.

AtomicCurious
https://atomiccurious.com

━━━━━━━━━━━━━━━━━━━━

Este correo confirma el registro de tu aporte en AtomicCurious.
`.trim()
    : `
ATOMICCURIOUS UNIVERSE

Contribution recorded

Your contribution has been successfully recorded.
Thank you for helping sustain this universe of ideas, explorations, and thoughtfully designed resources.

━━━━━━━━━━━━━━━━━━━━

Record:
${supportId}

Contribution:
${amount}

Date:
${date}

━━━━━━━━━━━━━━━━━━━━

Thank you for supporting this universe.
Every contribution helps turn curiosity into new pieces,
better resources, and more intentional explorations.

AtomicCurious
https://atomiccurious.com

━━━━━━━━━━━━━━━━━━━━

This email confirms your contribution to AtomicCurious.
`.trim()
}