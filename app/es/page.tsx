import type { Metadata } from "next"
import HomeLanding from "@/components/pages/HomeLanding"

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
  return (
    <HomeLanding
      copy={{
        hero: {
          eyebrow: "", // ✅ oculto en ES (evita el recuadro)
          headline: "Curiosidad, diseñada.",
          subheadline:
            "Exploraciones cortas y cinematográficas de ciencia, tecnología y futuro—para encender mejores preguntas, no más ruido.",
          primaryCta: { label: "Empieza aquí", href: "/es/start-here" },
          secondaryCta: { label: "Únete al newsletter", href: "/es/newsletter" },
        },

        meet: {
          title: "Tres anfitriones. Un universo.",
          subtitle:
            "Iris, Atom y Core no son personas reales: son interfaces narrativas para explorar ciencia, tecnología y futuro con claridad.",
          items: [
            { name: "Iris", role: "Ranked" },
            { name: "Atom", role: "Curiosity" },
            { name: "Core", role: "Quiz" },
          ],
          cta: { label: "Empieza el recorrido", href: "/es/start-here" },
        },

        newsletter: {
          title: "Únete al Newsletter de AtomicCurious",
          description:
            "Chispas semanales de ciencia, tecnología y futuro—sin ruido.",
          ctaLabel: "Suscribirme",
          href: "/es/boletin",
        },
      }}
    />
  )
}
