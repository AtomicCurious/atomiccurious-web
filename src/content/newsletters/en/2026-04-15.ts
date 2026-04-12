// src/content/newsletters/en/2026-04-15.ts

import type { NewsletterEdition } from "@/lib/newsletter/types"

export const newsletter: NewsletterEdition = {
  slug: "2026-04-15-en",
  locale: "en",
  subject: "AtomicCurious — Less noise, better questions",
  preheader: "Ideas, tools, and discoveries for curious minds.",
  scheduledFor: "2026-04-15T15:00:00.000Z",
  title: "Access the signal",
  intro:
    "This edition brings together ideas, tools, and discoveries worth your attention.",
  sections: [
    {
      title: "Core idea",
      body: "Your main insight goes here.",
    },
    {
      title: "What we’re exploring",
      body: "A short editorial block with tools, discoveries, or ideas.",
    },
    {
      title: "A question for you",
      body: "Close with a question that invites reflection or response.",
    },
  ],
  cta: {
    label: "Explore more on AtomicCurious",
    href: "https://atomiccurious.com",
  },
}