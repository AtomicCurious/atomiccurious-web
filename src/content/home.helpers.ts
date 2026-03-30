import { type PostListItem as PostEnItem } from "./posts.en"
import { type PostListItem as PostEsItem } from "./posts.es"

/**
 * Home tiles helpers
 * - La tarjeta izquierda del hero ahora promueve el newsletter
 * - Conservamos la misma estructura visual esperada por Hero.tsx
 */

export function getLatestPostTileEn() {
  return {
    href: "/en/newsletter",
    badge: "NEWSLETTER",
    badgeDot: "teal" as const,
    title: "Enter AtomicCurious",
    description:
      "Exclusive content, early access to new releases, and curated explorations for minds that never stop asking.",
    image: {
      src: "/images/sections/newsletter/home.webp",
      alt: "AtomicCurious newsletter preview",
    },
    tags: [],
    bullets: [
      { text: "New posts and selected releases", dot: "teal" as const },
      { text: "Occasional updates, no spam", dot: "pink" as const },
    ],
    ctaLabel: "Designed for curious minds",
  }
}

export function getLatestPostTileEs() {
  return {
    href: "/es/newsletter",
    badge: "NEWSLETTER",
    badgeDot: "teal" as const,
    title: "Entra a AtomicCurious",
    description:
      "Contenido exclusivo, acceso anticipado a nuevos lanzamientos y exploraciones seleccionadas para mentes que nunca dejan de preguntar.",
    image: {
      src: "/images/sections/newsletter/home.webp",
      alt: "Vista previa del newsletter de AtomicCurious",
    },
    tags: [],
    bullets: [
      { text: "Nuevos posts y lanzamientos seleccionados", dot: "teal" as const },
      { text: "Actualizaciones ocasionales, sin spam", dot: "pink" as const },
    ],
    ctaLabel: "Diseñado para mentes curiosas",
  }
}

/* ---------------------------------- */
/* Compatibility helpers               */
/* ---------------------------------- */

function formatSeriesEn(_format: PostEnItem["format"]) {
  return undefined
}

function formatSeriesEs(_format: PostEsItem["format"]) {
  return undefined
}