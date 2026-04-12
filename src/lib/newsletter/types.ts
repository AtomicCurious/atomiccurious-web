// src/lib/newsletter/types.ts

export type NewsletterLocale = "es" | "en"

export type NewsletterSection = {
  title: string
  body: string
}

export type NewsletterCta = {
  label: string
  href: string
}

export type NewsletterEdition = {
  slug: string
  locale: NewsletterLocale
  subject: string
  preheader?: string
  scheduledFor: string
  title: string
  intro: string
  sections: NewsletterSection[]
  cta?: NewsletterCta
}