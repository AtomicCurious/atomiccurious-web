import type { Metadata } from "next"
import HomeLanding from "@/components/pages/HomeLanding"
import { homeEs } from "@/content/home.es"

export const metadata: Metadata = {
  title: "AtomicCurious — Curiosidad, diseñada.",
  description:
    "Exploraciones cortas y cinematográficas para descubrir lo extraordinario del mundo que nos rodea. Posts, videos y recursos diseñados para despertar la curiosidad.",
  alternates: {
    canonical: "/es",
    languages: {
      en: "/en",
      es: "/es",
    },
  },
  openGraph: {
    title: "AtomicCurious — Curiosidad, diseñada.",
    description:
      "Exploraciones cortas y cinematográficas para descubrir lo extraordinario del mundo que nos rodea. Posts, videos y recursos diseñados para despertar la curiosidad.",
    url: "/es",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomicCurious — Curiosidad, diseñada.",
    description:
      "Exploraciones cortas y cinematográficas para descubrir lo extraordinario del mundo que nos rodea. Posts, videos y recursos diseñados para despertar la curiosidad.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <HomeLanding copy={homeEs.copy} tiles={homeEs.tiles} />
}