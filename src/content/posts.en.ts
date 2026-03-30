export type PostFormat = "curiosity" | "ranked" | "quiz"

export type PostListItem = {
  slug: string
  number: number        // ← post series number (#001, #002…)
  title: string
  description: string
  date: string
  format: PostFormat
  tag?: string
  readingTime?: number  // ← reading time in minutes (optional, estimated if missing)

  // Used by Home tiles + future reuse
  bullets?: string[]
  featured?: boolean
}

export const postsEn: PostListItem[] = [
  {
    slug: "why-we-dream",
    number: 1,
    title: "Why we dream: the hidden purpose of sleep stories",
    description:
      "dreams — and why your brain keeps creating them.",
    date: "2025-12-29",
    format: "curiosity",
    tag: "Sleep / Mind",
    readingTime: 6,

    bullets: ["Dreams are not random", "Memory, emotion & pattern-building"],

    featured: true,
  },
]

// newest first (fallback)
export const latestPostEn = postsEn[0]