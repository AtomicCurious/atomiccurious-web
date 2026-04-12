// src/lib/newsletter/registry.ts

import type { NewsletterEdition } from "@/lib/newsletter/types"

import { newsletter as es20260415 } from "@/content/newsletters/es/2026-04-15"
import { newsletter as en20260415 } from "@/content/newsletters/en/2026-04-15"

export const NEWSLETTER_REGISTRY: NewsletterEdition[] = [
  es20260415,
  en20260415,
]

export function getNewsletterBySlug(slug: string) {
  return NEWSLETTER_REGISTRY.find((item) => item.slug === slug) ?? null
}

export function getScheduledNewsletters(now = new Date()) {
  return NEWSLETTER_REGISTRY.filter((item) => {
    const scheduledDate = new Date(item.scheduledFor)
    return scheduledDate <= now
  })
}