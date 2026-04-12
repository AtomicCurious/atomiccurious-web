// src/lib/newsletter/renderNewsletterText.ts

import type { NewsletterEdition } from "@/lib/newsletter/types"

type RenderNewsletterTextOptions = {
  unsubscribeUrl?: string
}

export function renderNewsletterText(
  input: NewsletterEdition,
  options: RenderNewsletterTextOptions = {}
) {
  const lines: string[] = []
  const unsubscribeUrl = options.unsubscribeUrl ?? null

  // Title
  lines.push(input.title)
  lines.push("")

  // Intro
  lines.push(input.intro)
  lines.push("")

  // Divider
  lines.push("— — —")
  lines.push("")

  // Sections
  for (const section of input.sections) {
    lines.push(section.title)
    lines.push("")
    lines.push(section.body)
    lines.push("")
  }

  // CTA
  if (input.cta) {
    lines.push("— — —")
    lines.push("")
    lines.push(input.cta.label)
    lines.push(input.cta.href)
    lines.push("")
  }

  // Footer
  lines.push("— — —")
  lines.push("")

  lines.push("AtomicCurious")

  if (input.locale === "es") {
    lines.push("Ideas, herramientas y descubrimientos.")
    lines.push("")
    lines.push(
      "Recibes este correo porque te suscribiste a AtomicCurious en nuestra web."
    )
    lines.push("https://atomiccurious.com")
  } else {
    lines.push("Ideas, tools, and discoveries.")
    lines.push("")
    lines.push(
      "You are receiving this email because you subscribed to AtomicCurious on our website."
    )
    lines.push("https://atomiccurious.com")
  }

  // Unsubscribe
  if (unsubscribeUrl) {
    lines.push("")
    lines.push(
      input.locale === "es"
        ? `Darte de baja: ${unsubscribeUrl}`
        : `Unsubscribe: ${unsubscribeUrl}`
    )
  }

  return lines.join("\n")
}