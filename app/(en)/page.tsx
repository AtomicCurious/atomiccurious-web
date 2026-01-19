//app\(en)\page.tsx
import type { Metadata } from "next"
import HomeLanding from "@/components/pages/HomeLanding"
import { homeEn } from "@/content/home.en"

export const metadata: Metadata = {
  title: "AtomicCurious — Science, technology & the future",
  description:
    "Short, cinematic explorations of science, technology, and the future. Posts, videos, and resources designed to spark curiosity and clarity.",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      es: "/es",
    },
  },
  openGraph: {
    title: "AtomicCurious — Science, technology & the future",
    description:
      "Short, cinematic explorations of science, technology, and the future. Posts, videos, and resources designed to spark curiosity and clarity.",
    url: "/en",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomicCurious — Science, technology & the future",
    description:
      "Short, cinematic explorations of science, technology, and the future. Posts, videos, and resources designed to spark curiosity and clarity.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return <HomeLanding copy={homeEn.copy} tiles={homeEn.tiles} />
}
