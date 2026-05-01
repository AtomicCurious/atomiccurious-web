export type PostFormat = "curiosity" | "ranked" | "quiz"

export type AffiliateItem = {
  name: string
  href: string
  tag?: string
  cta?: string
}

export type PostListItem = {
  slug: string
  title: string
  description: string
  date: Date
  format: PostFormat
  tag?: string
  readingTime?: number

  bullets?: string[]
  featured?: boolean

  affiliateItems?: AffiliateItem[]

  id: string
}

export const postsEs: PostListItem[] = [
  {
    slug: "por-que-8-hrs",
    id: "ac-001",
    title: "Por qué trabajamos 8 horas al día",
    description:
      "El origen real de la jornada laboral de 8 horas y por qué no fue diseñada para el tipo de trabajo que haces hoy.",
    date: new Date("2026-04-26"),
    format: "curiosity",
    tag: "Trabajo / Productividad",
    readingTime: 7,
    bullets: [
      "El origen real de las 8 horas",
      "Por qué tu cerebro no funciona así",
    ],
    featured: true,

    affiliateItems: [
      {
        name: "Deep Work — Cal Newport",
        href: "https://amzn.to/3OGP110",
        tag: "Libro",
      },
      {
        name: "Pomofocus",
        href: "https://pomofocus.io",
        tag: "Herramienta gratuita",
        cta: "Abrir herramienta →",
      },
      {
        name: "Four Thousand Weeks — Oliver Burkeman",
        href: "https://amzn.to/48vWyq8",
        tag: "Libro",
      },
    ],
  },
]

// Filtra solo posts ya publicados (permite programación automática por fecha)
export const publishedPostsEs: PostListItem[] = postsEs.filter(
  (post) => post.date <= new Date()
)

// Ordena por fecha descendente usando solo los publicados
export const latestPostEs = [...publishedPostsEs].sort(
  (a, b) => b.date.getTime() - a.date.getTime()
)[0]