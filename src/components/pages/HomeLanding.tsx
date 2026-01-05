import Hero from "../sections/Hero"
import FeatureTiles from "../sections/FeatureTiles"
import NewsletterBar from "../sections/NewsletterBar"
import MeetTheMinds from "../sections/MeetTheMinds"

type HomeCopy = {
  hero: {
    eyebrow: string
    headline: string
    subheadline: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  }
  tiles: {
    tag?: string
    title: string
    description: string
    href: string
  }[]
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
  newsletter: {
    title: string
    description: string
    ctaLabel: string
    href: string
  }
}

export default function HomeLanding({ copy }: { copy: HomeCopy }) {
  return (
    <div className="w-full bg-bg text-text">
      {/* HERO full-bleed + TRIO integrated */}
      <Hero copy={copy.hero}>
        <MeetTheMinds copy={copy.meet} variant="stage" />
      </Hero>

      {/* Editorial container */}
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <FeatureTiles tiles={copy.tiles} />

        <div className="mt-12">
          <NewsletterBar copy={copy.newsletter} />
        </div>
      </div>
    </div>
  )
}

