import type { Metadata } from "next"
import HomeLanding from "@/components/pages/HomeLanding"
import { homeEs } from "@/content/home.es"

export const metadata: Metadata = {
  title: "AtomicCurious — Ciencia, tecnología y futuro",
  description:
    "Exploraciones cinematográficas de ciencia, tecnología y futuro. Posts, videos y recursos diseñados para despertar la curiosidad y la claridad.",
  alternates: {
    canonical: "/es",
    languages: {
      en: "/en",
      es: "/es",
    },
  },
  openGraph: {
    title: "AtomicCurious — Ciencia, tecnología y futuro",
    description:
      "Exploraciones cinematográficas de ciencia, tecnología y futuro. Posts, videos y recursos diseñados para despertar la curiosidad y la claridad.",
    url: "/es",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomicCurious — Ciencia, tecnología y futuro",
    description:
      "Exploraciones cinematográficas de ciencia, tecnología y futuro. Posts, videos y recursos diseñados para despertar la curiosidad y la claridad.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <HomeLanding copy={homeEs.copy} tiles={homeEs.tiles} />
}
