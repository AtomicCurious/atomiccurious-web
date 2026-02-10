// src/content/home.en.ts
import { getLatestPostTileEn } from "./home.helpers"

export const homeEn = {
  copy: {
    hero: {
      eyebrow: "",
      headline: "Curiosity, by design.",
      subheadline:
        "Short, cinematic explorations of science, technology, and what’s coming next—built to spark better questions, not overwhelm you.",
      // ✅ Invertido como pediste
      primaryCta: { label: "Start here", href: "/en/start-here" },
      secondaryCta: { label: "Explore posts", href: "/en/posts" },
    },
    meet: {
      title: "Three hosts. One universe.",
      subtitle:
        "Iris, Atom, and Core are not real people—they’re narrative interfaces designed to explore science, technology, and the future with clarity.",
      items: [
        { name: "Iris", role: "Ranked" },
        { name: "Atom", role: "Curiosity" },
        { name: "Core", role: "Quiz" },
      ],
      cta: { label: "Start the journey", href: "/en/start-here" },
    },
  },
  tiles: {
    // ✅ now comes automatically from posts.en.ts
    latest: getLatestPostTileEn(),

    download: {
      href: "/calendar",
      badge: "FREE DOWNLOAD",
      badgeDot: "pink" as const,
      title: "AtomicCurious Science Calendar 2026",
      description:
        "Official. Visual. Thought-provoking. A premium calendar to fuel your curiosity all year.",
      ctaLabel: "Download free",
      footnote: "No spam. Just curiosity.",
      mockTitle: "Science Calendar · 2026",
    },
  },
} as const

