export type PostFormat = "curiosity" | "ranked" | "quiz"

export type AffiliateItem = {
  name: string
  href: string
  tag?: string
  cta?: string
  description?: string
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
    slug: "la-cadena-del-wtf-flamencos",
    id: "ac-003",
    title:
      "La Cadena del WTF: cómo un flamenco rosado está conectado con tu próxima respiración",
    description:
      "Los flamencos no nacen rosados. Los camarones tampoco. Y esa cadena termina en el oxígeno que respiras.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-05-27T17:00:00-04:00"),

    format: "quiz",
    tag: "Ciencia / Sistemas",
    readingTime: 9,
    bullets: [
      "Los flamencos no nacen rosados",
      "La cadena invisible que llega hasta tu respiración",
    ],
    featured: true,

    affiliateItems: [
      {
        name: "Entangled Life — Merlin Sheldrake",
        href: "https://amzn.to/48ZOMVz",
        tag: "Libro",
        description:
          "Explora cómo redes invisibles de hongos conectan ecosistemas completos bajo la superficie.",
      },
      {
        name: "Carson MicroBrite Plus",
        href: "https://amzn.to/4dFZXW4",
        tag: "Herramienta",
        description:
          "Un microscopio de bolsillo para explorar texturas, organismos y detalles invisibles del mundo cotidiano.",
      },
      {
        name: "iNaturalist",
        href: "https://www.inaturalist.org",
        tag: "App",
        cta: "Explorar herramienta →",
        description:
          "Herramienta para identificar especies y convertir tu curiosidad en observaciones que contribuyen a la ciencia.",
      },
    ],
  },

  {
    slug: "habitos-con-respaldo-cientifico",
    id: "ac-002",
    title: "Top 7 hábitos más respaldados por la ciencia",
    description:
      "La mayoría de rankings de hábitos mezclan impacto científico con facilidad de implementación como si fueran lo mismo. No lo son.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-05-20T17:00:00-04:00"),

    format: "ranked",
    tag: "Salud / Hábitos",
    readingTime: 10,
    bullets: [
      "Dos criterios. Dos ganadores.",
      "Por qué el hábito #1 depende de cómo lo midas",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Why We Sleep — Matthew Walker",
        href: "https://amzn.to/4tCpg05",
        tag: "Libro",
        description:
          "Una exploración profunda sobre cómo el sueño afecta memoria, energía, salud y rendimiento cognitivo.",
      },
      {
        name: "The Circadian Code — Satchin Panda",
        href: "https://amzn.to/3PlbmBs",
        tag: "Libro",
        description:
          "Una guía clara sobre cómo los ritmos circadianos influyen en sueño, energía, metabolismo y salud diaria.",
      },
      {
        name: "Rise Science",
        href: "https://www.risescience.com",
        tag: "App",
        cta: "Explorar herramienta →",
        description:
          "Herramienta para explorar métricas de sueño, deuda de descanso, energía diaria y ritmos circadianos.",
      },
    ],
  },

  {
    slug: "por-que-8-hrs",
    id: "ac-001",
    title: "Por qué trabajamos 8 horas al día",
    description:
      "El origen real de la jornada laboral de 8 horas y por qué no fue diseñada para el tipo de trabajo que haces hoy.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-05-13T17:00:00-04:00"),

    format: "curiosity",
    tag: "Trabajo / Productividad",
    readingTime: 7,
    bullets: [
      "El origen real de las 8 horas",
      "Por qué tu cerebro no funciona así",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Deep Work — Cal Newport",
        href: "https://amzn.to/3OGP110",
        tag: "Libro",
        description:
          "Explora cómo la concentración profunda se volvió una ventaja escasa en la economía moderna.",
      },
      {
        name: "Rize",
        href: "https://rize.io",
        tag: "Herramienta",
        cta: "Explorar herramienta →",
        description:
          "Herramienta para visualizar tiempo de enfoque, distracciones y patrones reales de trabajo en tiempo real.",
      },
      {
        name: "Four Thousand Weeks — Oliver Burkeman",
        href: "https://amzn.to/48vWyq8",
        tag: "Libro",
        description:
          "Una reflexión sobre tiempo, productividad y los límites reales de la vida humana.",
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