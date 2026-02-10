// src/components/visual/ShootingStars.tsx
"use client"

import type { ReactElement } from "react"

type Variant = "mixed" | "corner" | "mid" | "left" | "bottom" | "top"
type AuraMode = "css" | "ts" | "off"
type PerfMode = "auto" | "on" | "off"
type SpawnMode = "cinematic" | "anywhere" | "anywhere-enter"

export default function ShootingStars(_: {
  count?: number
  variant?: Variant
  mountToId?: string
  aura?: AuraMode
  perf?: PerfMode
  spawnMode?: SpawnMode
}): ReactElement | null {
  // ✅ Intentionally disabled.
  // This is a safe stub to prevent runtime errors if old imports still exist.
  return null
}
