// src/data/resources.es.ts

export type Category =
  | "Todo"
  | "Libros"
  | "Apps"
  | "Sitios web"
  | "Herramientas"
  | "Cursos"
  | "Productividad"
  | "Aprendizaje"

export type ResourceGroup = Exclude<Category, "Todo">

export type FeaturedResource = {
  title: string
  creator: string
  description: string
  category: string
  group: ResourceGroup
  href: string
  image?: string
  fallback: string
  tags: string[]
}

export type RecentResource = {
  title: string
  description: string
  category: string
  group: ResourceGroup
  href: string
  icon: string
  tags: string[]
}

export const categories: Category[] = [
  "Todo",
  "Libros",
  "Apps",
  "Sitios web",
  "Herramientas",
  "Cursos",
  "Productividad",
  "Aprendizaje",
]

export const featuredResources: FeaturedResource[] = [
  {
    title: "Thinking, Fast and Slow",
    creator: "Daniel Kahneman",
    description:
      "Una lectura esencial sobre los dos sistemas que dirigen cómo pensamos.",
    category: "LIBRO",
    group: "Libros",
    href: "https://www.amazon.com/s?k=Thinking+Fast+and+Slow",
    image: "/images/sections/resources/thinking-fast-and-slow.webp",
    fallback: "T",
    tags: ["psicología", "pensamiento", "decisiones", "sesgos", "libro"],
  },
  {
    title: "Readwise",
    creator: "Readwise",
    description:
      "Recuerda más de lo que lees y construye una biblioteca de ideas.",
    category: "APP",
    group: "Apps",
    href: "https://readwise.io",
    image: "/images/sections/resources/readwise.webp",
    fallback: "R",
    tags: ["lectura", "notas", "aprendizaje", "memoria", "app"],
  },
  {
    title: "Kurzgesagt",
    creator: "In a Nutshell",
    description:
      "Ciencia explicada con historias visuales claras, bellas y memorables.",
    category: "SITIO WEB",
    group: "Sitios web",
    href: "https://kurzgesagt.org",
    image: "/images/sections/resources/kurzgesagt.webp",
    fallback: "K",
    tags: ["ciencia", "educación", "videos", "aprendizaje", "sitio web"],
  },
  {
    title: "Obsidian",
    creator: "Obsidian",
    description:
      "Una base de conocimiento personal para conectar ideas y pensar con claridad.",
    category: "HERRAMIENTA",
    group: "Herramientas",
    href: "https://obsidian.md",
    image: "/images/sections/resources/obsidian.webp",
    fallback: "O",
    tags: ["notas", "productividad", "conocimiento", "pensamiento", "herramienta"],
  },
]

export const recentResources: RecentResource[] = [
  {
    title: "Notion",
    description:
      "Organiza notas, tareas y proyectos en un espacio flexible.",
    category: "PRODUCTIVIDAD",
    group: "Productividad",
    href: "https://www.notion.com",
    icon: "N",
    tags: ["notas", "organización", "proyectos", "productividad"],
  },
  {
    title: "Superhuman",
    description:
      "Una experiencia de correo diseñada para ahorrar tiempo cada semana.",
    category: "PRODUCTIVIDAD",
    group: "Productividad",
    href: "https://superhuman.com",
    icon: "S",
    tags: ["correo", "email", "productividad", "tiempo"],
  },
  {
    title: "Physics Girl",
    description:
      "Demos de física intuitivas y entretenidas para entender ideas complejas.",
    category: "APRENDIZAJE",
    group: "Aprendizaje",
    href: "https://www.youtube.com/@physicsgirl",
    icon: "P",
    tags: ["física", "ciencia", "youtube", "aprendizaje"],
  },
]