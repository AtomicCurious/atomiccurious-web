// src/lib/newsletter/renderNewsletterText.ts

import type { NewsletterEdition } from "@/lib/newsletter/types"

export function renderNewsletterText(input: NewsletterEdition) {
  const lines: string[] = []

  // Title
  lines.push(input.title)
  lines.push("")

  // Intro
  lines.push(input.intro)
  lines.push("")

  // Sections
  for (const section of input.sections) {
    lines.push(section.title.toUpperCase())
    lines.push(section.body)
    lines.push("")
  }

  // CTA
  if (input.cta) {
    lines.push(input.cta.label)
    lines.push(input.cta.href)
    lines.push("")
  }

  // Footer
  if (input.locale === "es") {
    lines.push("— AtomicCurious")
    lines.push("Ideas, herramientas y descubrimientos.")
  } else {
    lines.push("— AtomicCurious")
    lines.push("Ideas, tools, and discoveries.")
  }

  return lines.join("\n")
}