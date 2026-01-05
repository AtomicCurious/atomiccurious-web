export type PostFormat = "curiosity" | "ranked" | "quiz"

export type PostListItem = {
  slug: string
  title: string
  description: string
  date: string
  format: PostFormat
  tag?: string
}

export const postsEs: PostListItem[] = [
  {
    slug: "por-que-sonamos",
    title: "Por qué soñamos: el propósito oculto de las historias del sueño",
    description:
      "Una exploración cinematográfica de lo que dice la ciencia sobre los sueños—y por qué tu cerebro los genera.",
    date: "2025-12-29",
    format: "curiosity",
    tag: "Sueño / Mente",
  },
]

// newest first
export const latestPostEs = postsEs[0]
