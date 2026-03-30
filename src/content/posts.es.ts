export type PostFormat = "curiosity" | "ranked" | "quiz"

export type PostListItem = {
  slug: string
  number: number        // ← número de serie del post (#001, #002…)
  title: string
  description: string
  date: string
  format: PostFormat
  tag?: string
  readingTime?: number  // ← minutos de lectura (opcional, se estima si no está)

  // Used by Home tiles + future reuse
  bullets?: string[]
  featured?: boolean
}

export const postsEs: PostListItem[] = [
  {
    slug: "por-que-sonamos",
    number: 1,
    title: "Por qué soñamos: el propósito oculto de las historias del sueño",
    description:
      "Una exploración cinematográfica de lo que dice la ciencia sobre los sueños—y por qué tu cerebro los genera.",
    date: "2025-12-29",
    format: "curiosity",
    tag: "Sueño / Mente",
    readingTime: 6,

    bullets: [
      "Los sueños no son aleatorios",
      "Memoria, emoción y construcción de patrones",
    ],

    featured: true,
  },
]

// newest first (fallback)
export const latestPostEs = postsEs[0]