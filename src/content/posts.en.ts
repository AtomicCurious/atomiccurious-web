export type PostFormat = "curiosity" | "ranked" | "quiz"

export type PostListItem = {
  slug: string
  title: string
  description: string
  date: string
  format: PostFormat
  tag?: string

  // ✅ NEW (used by Home tiles + future reuse)
  bullets?: string[]
  featured?: boolean
}

export const postsEn: PostListItem[] = [
  {
    slug: "why-we-dream",
    title: "Why we dream: the hidden purpose of sleep stories",
    description:
      "A cinematic overview of what science says about dreams—and why your brain keeps generating them.",
    date: "2025-12-29",
    format: "curiosity",
    tag: "Sleep / Mind",

    // ✅ bullets now live on the post (single source of truth)
    bullets: ["Dreams are not random", "Memory, emotion & pattern-building"],

    // ✅ editorial control for Home (preferred over purely “latest”)
    featured: true,
  },
]

// newest first (fallback)
export const latestPostEn = postsEn[0]
