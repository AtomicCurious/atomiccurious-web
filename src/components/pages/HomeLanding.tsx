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

/** -------------------------------------------------------
 *  Overlay visual: personaje (HOME = imagen fija via body attr)
 *  ----------------------------------------------------- */
function CharacterOverlay({ mode }: { mode: CharacterMode }) {
  const img =
    mode === "iris"
      ? characters.iris.image
      : mode === "core"
        ? characters.core.image
        : characters.atom.image

  const alt = mode === "iris" ? "Iris" : mode === "core" ? "Core" : "Atom"

  return (
    <div className="pointer-events-none mx-auto w-full max-w-[420px] lg:max-w-[480px]">
      {/* ✅ Final alignment happens HERE (not in Hero.tsx) */}
      <div className="relative lg:translate-y-[10px]">
        {/* soft glow (moved slightly DOWN to avoid “gap illusion”) */}
        <div className="absolute inset-0 -z-10 blur-[40px] opacity-70">
          <div className="absolute left-1/2 top-14 h-56 w-56 -translate-x-1/2 rounded-full bg-accent/20" />
          <div className="absolute left-1/2 top-28 h-56 w-56 -translate-x-1/2 rounded-full bg-accent-alt/15" />
        </div>

        {/* character image */}
        <div className="relative mx-auto aspect-[1/1] w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px]">
          <Image
            src={img}
            alt={alt}
            fill
            priority
            className={[
              "object-contain",
              // ✅ Reduce bottom shadow so you can sit lower without “fake space”
              "drop-shadow-[0_28px_60px_rgba(0,0,0,0.45)]",
            ].join(" ")}
          />
        </div>
      </div>
    </div>
  )
}

export default function HomeLanding({ copy, tiles }: { copy: HomeCopy; tiles: HomeTiles }) {
  // ✅ HOME NEUTRAL: no personalidades, no microcopy dinámico, no CTAs de personajes
  useVoice({ disable: true })

  const [lockedHero, setLockedHero] = useState<CharacterMode | null>(null)

  useEffect(() => {
    const read = () => {
      const v = document?.body?.getAttribute("data-home-hero")
      setLockedHero(v === "iris" || v === "atom" || v === "core" ? (v as CharacterMode) : null)
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
