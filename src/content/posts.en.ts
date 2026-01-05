export type PostFormat = "curiosity" | "ranked" | "quiz"

export type PostListItem = {
  slug: string
  title: string
  description: string
  date: string
  format: PostFormat
  tag?: string
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
  },
]

// newest first
export const latestPostEn = postsEn[0]
