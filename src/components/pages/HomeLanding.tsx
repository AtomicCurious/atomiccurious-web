import Hero from "../sections/Hero"
import MeetTheMinds from "../sections/MeetTheMinds"

type HomeCopy = {
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  meet: {
    title: string
    subtitle: string
    // ✅ Accept readonly arrays from `as const` content files
    items: readonly {
      name: string
      role: string
      description?: string
    }[]
    cta: { label: string; href: string }
  }
  // ⛔️ newsletter removido del Home (ya no se usa aquí)
  newsletter?: {
    title: string
    description: string
    ctaLabel: string
    href: string
  }
}

type HomeTiles = {
  latest: {
    href: string
    badge: string
    badgeDot: "teal" | "pink"
    title: string
    description: string
    // ✅ Accept readonly arrays from `as const` content files
    tags: readonly string[]
    // ✅ Accept readonly arrays from `as const` content files
    bullets: readonly { text: string; dot: "teal" | "pink" }[]
    ctaLabel: string
  }
  download: {
    href: string
    badge: string
    badgeDot: "pink"
    title: string
    description: string
    ctaLabel: string
    footnote: string
    mockTitle: string
  }
}

export default function HomeLanding({
  copy,
  tiles,
}: {
  copy: HomeCopy
  tiles: HomeTiles
}) {
  return (
    <div className="w-full bg-bg text-text">
      <Hero copy={copy.hero} tiles={tiles}>
        {/* ✅ Iris como overlay (NO empuja altura) */}
        <Hero.Overlay>
          <MeetTheMinds copy={copy.meet} variant="hero-iris" />
        </Hero.Overlay>

        {/* ✅ (REMOVIDO) NewsletterBar del Home */}
      </Hero>
    </div>
  )
}
