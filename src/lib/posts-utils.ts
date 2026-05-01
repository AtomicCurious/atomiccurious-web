import type { PostFormat } from "@/content/posts.es"

export function normalizeSlug(raw?: string) {
  return (raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
}

export function estimateWords(source: string) {
  const text = source
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_#>\-\[\]\(\)]/g, " ")

  return text.trim().split(/\s+/).filter(Boolean).length
}

export function readingTimeLabel(words: number, wordsPerMinute = 220) {
  if (!words) return undefined

  const minutes = Math.max(3, Math.round(words / wordsPerMinute))

  return `${minutes} min`
}

export function formatPostDate(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export const formatLabels: Record<PostFormat, string> = {
  curiosity: "Curiosity · Atom",
  ranked: "Ranked · Iris",
  quiz: "Quiz · Core",
}

export function formatToHost(format: PostFormat) {
  if (format === "curiosity") return "atom" as const
  if (format === "ranked") return "iris" as const
  return "core" as const
}