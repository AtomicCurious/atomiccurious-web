import type { Metadata } from "next"
import HomeLanding from "@/components/pages/HomeLanding"

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
  return (
    <HomeLanding
      copy={{
        hero: {
          eyebrow: "", // hidden in EN as well
          headline: "Curiosity, by design.",
          subheadline:
            "Short, cinematic explorations of science, technology, and what’s coming next—built to spark better questions, not overwhelm you.",
          primaryCta: { label: "Start here", href: "/en/start-here" },
          secondaryCta: {
            label: "Join the newsletter",
            href: "/en/newsletter",
          },
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

        newsletter: {
          title: "Join the AtomicCurious Newsletter",
          description:
            "Weekly sparks of science, technology, and the future—no hype, no noise.",
          ctaLabel: "Subscribe",
          href: "/en/newsletter",
        },
      }}
    />
  )
}
