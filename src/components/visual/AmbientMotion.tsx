// src/components/visual/AmbientMotion.tsx
"use client"

import type { CSSProperties } from "react"

type AmbientMotionProps = {
  intensity?: "off" | "low" | "mid"
  className?: string
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

export default function AmbientMotion({ intensity = "low", className = "" }: AmbientMotionProps) {
  if (intensity === "off") return null

  /**
   * ✅ Premium decision:
   * - Keep ONLY the micro-breathe lines (what you actually see + what feels “alive”).
   * - Remove orbs entirely (they add "effect layer" noise and compete with your existing glows/grid).
   */

  // low = almost imperceptible, mid = still subtle but easier to verify
  const lineOpacity = intensity === "mid" ? 0.22 : 0.14

  const base: CSSProperties = {
    ["--lineA" as any]: clamp(lineOpacity, 0.10, 0.26),
  }

  return (
    <div
      className={[
        "pointer-events-none absolute inset-0 z-[4]", // above grid/particles, below content
        "overflow-hidden",
        className,
      ].join(" ")}
      style={base}
      aria-hidden="true"
    >
      {/* ✅ Micro-motion lines only (breathe) */}
      <span className="ac-ambient-line ac-ambient-line--left" />
      <span className="ac-ambient-line ac-ambient-line--right" />
    </div>
  )
}
