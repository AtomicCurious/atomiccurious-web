// src/content/voiceify.ts
import type { Voice } from "@/content/voices"

function pick(list: string[], fallback: string) {
  return list && list.length ? list[0] : fallback // simple y estable
}

export function voiceifyHeroCopy(
  base: {
    eyebrow: string
    headline: string
    subheadline: string
    primaryCta: { label: string; href: string }
    secondaryCta: { label: string; href: string }
  },
  voice: Voice
) {
  // Mantén tu contenido: solo cambia el “presentador”
  const hook = pick(voice.catchphrases.hook, "")
  const bridge = pick(voice.catchphrases.bridge, "")

  // Eyebrow: usa tu base si ya es buena; si está vacía, mete “kicker” por voz
  const eyebrow =
    base.eyebrow?.trim().length
      ? base.eyebrow
      : hook
      ? hook
      : voice.verb.open

  // Subheadline: conserva el significado y agrega un “lead-in” corto
  const subheadline =
    bridge
      ? `${bridge} ${base.subheadline}`
      : base.subheadline

  return {
    ...base,
    eyebrow,
    subheadline,
    primaryCta: { ...base.primaryCta, label: voice.ui.cta.primary },
    secondaryCta: { ...base.secondaryCta, label: voice.ui.cta.secondary },
  }
}

export function voiceifyHeroTiles<T extends { ctaLabel: string }>(
  tile: T,
  voice: Voice
) {
  return {
    ...tile,
    ctaLabel: voice.ui.cta.next, // o primary/secondary según tu intención
  }
}
