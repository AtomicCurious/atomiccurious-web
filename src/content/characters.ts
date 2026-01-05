export type CharacterId = "iris" | "atom" | "core"

export type Character = {
  id: CharacterId
  name: string
  role: string
  age: number
  description: string
  image: string
  rev: string // ⬅️ usado para forzar refresh en next/image
}

export const characters: Record<CharacterId, Character> = {
  iris: {
    id: "iris",
    name: "Iris",
    role: "Ranked",
    age: 23,
    description:
      "Comparaciones, rankings y claridad. Iris te guía a través de la complejidad con estructura.",
    image: "/characters/iris.png",
    rev: "2026-01-04-1",
  },

  atom: {
    id: "atom",
    name: "Atom",
    role: "Curiosity",
    age: 25,
    description:
      "Grandes preguntas, historias inesperadas y curiosidad sin filtros.",
    image: "/characters/atom.png",
    rev: "2026-01-04-1",
  },

  core: {
    id: "core",
    name: "Core",
    role: "Quiz",
    age: 9,
    description:
      "Retos rápidos, datos que explotan la cabeza y diversión inteligente.",
    image: "/characters/core.png",
    rev: "2026-01-04-1",
  },
}
