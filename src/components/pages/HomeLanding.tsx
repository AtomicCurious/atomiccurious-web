// src/components/pages/HomeLanding.tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

import Hero, { HeroOverlay } from "../sections/Hero"

import { useVoice } from "@/components/useVoice"
import { characters } from "@/content/characters"
import type { CharacterMode } from "@/content/voices"

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
    items: readonly {
      name: string
      role: string
      description?: string
    }[]
    cta: { label: string; href: string }
  }
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
    tags: readonly string[]
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

function CharacterOverlay({ mode }: { mode: CharacterMode }) {
  const img =
    mode === "iris"
      ? characters.iris.image
      : mode === "core"
        ? characters.core.image
        : characters.atom.image

  const alt = mode === "iris" ? "Iris" : mode === "core" ? "Core" : "Atom"

  return (
    <div className="pointer-events-none mx-auto w-full max-w-[580px] lg:max-w-[700px]">
      <div className="relative -translate-y-[10px] sm:-translate-y-[16px] lg:-translate-y-[34px]">
        <div className="absolute inset-0 -z-10 blur-[56px] opacity-85">
          <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/25" />
          <div className="absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-alt/20" />
        </div>

        <div
          className="relative mx-auto overflow-hidden
            h-[370px] w-[300px]
            sm:h-[460px] sm:w-[360px]
            md:h-[840px] md:w-[540px]
            lg:h-[980px] lg:w-[620px]"
        >
          <div
            className="absolute top-[10px] left-1/2 -translate-x-1/2
              w-[560px] h-[760px]
              sm:top-[8px] sm:w-[660px] sm:h-[900px]
              md:top-0 md:w-full md:h-full
              lg:top-0 lg:w-full lg:h-full"
          >
            <Image
              src={img}
              alt={alt}
              fill
              priority
              sizes="(max-width: 640px) 560px, (max-width: 768px) 660px, (max-width: 1024px) 540px, 620px"
              className="select-none object-cover object-top drop-shadow-[0_48px_110px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomeLanding({
  copy,
  tiles,
}: {
  copy: HomeCopy
  tiles: HomeTiles
}) {
  useVoice({ disable: true })

  const [lockedHero, setLockedHero] = useState<CharacterMode | null>(null)

  useEffect(() => {
    const read = () => {
      const v = document?.body?.getAttribute("data-home-hero")
      setLockedHero(
        v === "iris" || v === "atom" || v === "core"
          ? (v as CharacterMode)
          : null
      )
    }

    read()
    window.addEventListener("ac:home-hero", read)
    return () => window.removeEventListener("ac:home-hero", read)
  }, [])

  return (
    <div className="w-full bg-bg text-text">
      <Hero copy={copy.hero} tiles={tiles}>
        <HeroOverlay>
          <CharacterOverlay mode={lockedHero ?? "iris"} />
        </HeroOverlay>
      </Hero>
    </div>
  )
}