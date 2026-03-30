// app/(en)/page.tsx
import type { Metadata } from "next"
import HomeLanding from "@/components/pages/HomeLanding"
import { homeEn } from "@/content/home.en"

export const metadata: Metadata = {
  title: "AtomicCurious — Curiosity, by design.",
  description:
    "Short, cinematic explorations to discover the extraordinary in the world around us. Posts, videos, and resources designed to spark curiosity.",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      es: "/es",
    },
  },
  openGraph: {
    title: "AtomicCurious — Curiosity, by design.",
    description:
      "Short, cinematic explorations to discover the extraordinary in the world around us. Posts, videos, and resources designed to spark curiosity.",
    url: "/en",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomicCurious — Curiosity, by design.",
    description:
      "Short, cinematic explorations to discover the extraordinary in the world around us. Posts, videos, and resources designed to spark curiosity.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <HomeLanding copy={homeEn.copy} tiles={homeEn.tiles} />
}