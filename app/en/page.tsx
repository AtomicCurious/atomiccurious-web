import type { Metadata } from "next"
import HomeLanding from "@/components/pages/HomeLanding"

export const metadata: Metadata = {
  title: "AtomicCurious — Science, Technology & the Future",
  description:
    "Cinematic explorations of science, technology, and the future. Clear ideas, thoughtful questions, and less noise.",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      es: "/es",
    },
  },
  openGraph: {
    title: "AtomicCurious — Science, Technology & the Future",
    description:
      "Cinematic explorations of science, technology, and the future. Clear ideas, thoughtful questions, and less noise.",
    url: "/en",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomicCurious — Science, Technology & the Future",
    description:
      "Cinematic explorations of science, technology, and the future. Clear ideas, thoughtful questions, and less noise.",
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
          eyebrow: "", // 👈 importante: vacío, no se mostrará
          headline: "Curiosity, by design.",
          subheadline:
            "Short, cinematic explorations of science, technology, and what’s coming next—built to spark better questions, not overwhelm you.",
          primaryCta: { label: "Start here", href: "/en/start-here" },
          secondaryCta: { label: "Join the newsletter", href: "/en/newsletter" },
        },

        tiles: [
          {
            tag: "Curiosity",
            title: "Big ideas, made understandable",
            description:
              "Science, AI, psychology, and the questions that actually matter.",
            href: "/en/start-here",
          },
          {
            tag: "Resources",
            title: "Guides & downloads",
            description:
              "Practical ebooks and tools to help you learn faster and think clearer.",
            href: "/en/about",
          },
          {
            tag: "Community",
            title: "Newsletter & updates",
            description:
              "A calm weekly signal with new content, ideas, and experiments.",
            href: "/en/newsletter",
          },
        ],

        meet: {
          title: "Three hosts. One universe.",
          subtitle:
            "Iris, Atom, and Core aren’t real people. They’re narrative guides—each representing a different way of exploring science and the future.",
          items: [
            { name: "Iris", role: "Ranked" },
            { name: "Atom", role: "Curiosity" },
            { name: "Core", role: "Quiz" },
          ],
          cta: { label: "Start exploring", href: "/en/start-here" },
        },

        newsletter: {
          title: "Join the AtomicCurious Newsletter",
          description:
            "One email a week with clear ideas about science, technology, and the future—no hype, no noise.",
          ctaLabel: "Subscribe",
          href: "/en/newsletter",
        },
      }}
    />
  )
}
