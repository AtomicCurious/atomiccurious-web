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
    items: {
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

export default function HomeLanding({ copy }: { copy: HomeCopy }) {
  return (
    <div className="w-full bg-bg text-text">
      <Hero copy={copy.hero}>
        {/* ✅ Iris como overlay (NO empuja altura) */}
        <Hero.Overlay>
          <MeetTheMinds copy={copy.meet} variant="hero-iris" />
        </Hero.Overlay>

        {/* ✅ (REMOVIDO) NewsletterBar del Home */}
      </Hero>
    </div>
  )
}
