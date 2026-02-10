// src/content/home.es.ts
import { getLatestPostTileEs } from "./home.helpers"

export const homeEs = {
  copy: {
    hero: {
      eyebrow: "",
      headline: "Curiosidad, diseñada.",
      subheadline:
        "Exploraciones cortas y cinematográficas de ciencia, tecnología y futuro—pensadas para encender mejores preguntas, no más ruido.",
      // ✅ 2 botones, mismo criterio que EN
      primaryCta: { label: "Empieza aquí", href: "/es/start-here" },
      secondaryCta: { label: "Explorar posts", href: "/es/posts" },
    },
    meet: {
      title: "Tres anfitriones. Un universo.",
      subtitle:
        "Iris, Atom y Core no son personas reales: son interfaces narrativas diseñadas para explorar ciencia, tecnología y futuro con claridad.",
      items: [
        { name: "Iris", role: "Ranked" },
        { name: "Atom", role: "Curiosity" },
        { name: "Core", role: "Quiz" },
      ],
      cta: { label: "Empieza el recorrido", href: "/es/start-here" },
    },
  },
  tiles: {
    // ✅ ahora viene automáticamente desde posts.es.ts
    latest: getLatestPostTileEs(),

    download: {
      href: "/es/calendario",
      badge: "DESCARGA GRATIS",
      badgeDot: "pink" as const,
      title: "Calendario de Ciencia AtomicCurious 2026",
      description:
        "Oficial. Visual. Provocador. Un calendario premium para alimentar tu curiosidad todo el año.",
      ctaLabel: "Descargar gratis",
      footnote: "Sin spam. Solo curiosidad.",
      mockTitle: "Calendario de Ciencia · 2026",
    },
  },
} as const
