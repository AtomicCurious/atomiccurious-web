import { getLatestPostTileEs } from "./home.helpers"

export const homeEs = {
  copy: {
    hero: {
      eyebrow: "",
      headline: "Curiosidad, diseñada.",
      subheadline:
        "Exploraciones cortas y cinematográficas\npara descubrir lo extraordinario del mundo que nos rodea.",
      primaryCta: { label: "Empieza aquí", href: "/es/start-here" },
      secondaryCta: { label: "Explorar posts", href: "/es/posts" },
    },
    meet: {
      title: "Tres anfitriones. Un universo.",
      subtitle:
        "Iris, Atom y Core no son personas reales: son interfaces narrativas diseñadas para explorar el mundo con claridad, curiosidad y una estética tecnológica.",
      items: [
        { name: "Iris", role: "Ranked" },
        { name: "Atom", role: "Curiosity" },
        { name: "Core", role: "Quiz" },
      ],
      cta: { label: "Empieza el recorrido", href: "/es/start-here" },
    },
  },
  tiles: {
    latest: getLatestPostTileEs(),

    download: {
      href: "/es/calendario",
      badge: "DESCARGA GRATIS",
      badgeDot: "pink" as const,
      title: "Calendario de Ciencia AtomicCurious 2026",
      description:
        "Oficial. Visual. Provocador. Un calendario premium para alimentar tu curiosidad todo el año.",
      ctaLabel: "Descargar gratis",
      footnote: "Diseñado para mentes curiosas.",
      mockTitle: "Calendario de Ciencia · 2026",
    },
  },
} as const