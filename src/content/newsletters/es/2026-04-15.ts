// src/content/newsletters/es/2026-04-15.ts

import type { NewsletterEdition } from "@/lib/newsletter/types"

export const newsletter: NewsletterEdition = {
  slug: "2026-04-15-es-test-4",
  locale: "es",
  subject: "AtomicCurious — Menos ruido, mejores preguntas",
  preheader: "Ideas, herramientas y descubrimientos para mentes curiosas.",
  scheduledFor: "2026-04-12T00:00:00.000Z",
  title: "Accede a la señal",
  intro:
    "Esta quincena reunimos ideas, herramientas y descubrimientos que valen tu atención.",
  sections: [
    {
      title: "Idea central",
      body: "Aquí va tu reflexión principal.",
    },
    {
      title: "Lo que estamos explorando",
      body: "Aquí va un bloque editorial breve con descubrimientos, herramientas o ideas.",
    },
    {
      title: "Una pregunta para ti",
      body: "Aquí va un cierre con una pregunta que invite a pensar o responder.",
    },
  ],
  cta: {
    label: "Leer más en AtomicCurious",
    href: "https://atomiccurious.com/es",
  },
}