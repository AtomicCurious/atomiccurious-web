"use client"

import { useEffect, useMemo, useState } from "react"

type Star = {
  id: number
  startX: number // vw
  startY: number // vh
  dx: number // vw
  dy: number // vh
  duration: number
  delay: number
  size: number
  popAt: number // 0..1
  hue: "teal" | "pink"
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export default function ShootingStars({
  count = 12,
  variant = "mixed",
}: {
  count?: number
  variant?: "mixed" | "corner" | "mid"
}) {
  const [stars, setStars] = useState<Star[]>([])
  const seed = useMemo(() => Math.random(), [])

  useEffect(() => {
    const next: Star[] = Array.from({ length: count }).map((_, i) => {
      const mode =
        variant === "mixed"
          ? Math.random() < 0.55
            ? "corner"
            : "mid"
          : variant

      // Spawn: esquina inferior izquierda o banda inferior media
      const startX = mode === "corner" ? rand(-6, 18) : rand(35, 65) // vw
      const startY = rand(102, 114) // vh (debajo viewport)

      // Travel diagonal (mayoría hacia arriba-derecha, a veces arriba-izquierda)
      const goRight = Math.random() < 0.78
      const dx = goRight ? rand(14, 34) : -rand(10, 22) // vw
      const dy = rand(60, 95) // vh (sube)

      const hue: Star["hue"] = Math.random() < 0.7 ? "teal" : "pink"

      return {
        id: i,
        startX,
        startY,
        dx,
        dy,
        duration: rand(5.5, 11.5),
        delay: rand(0, 6),
        // ✅ Más visibles (antes: 1.6–2.8)
        size: rand(10, 4.2),
        popAt: rand(0.76, 0.9), // pop cerca del final, aleatorio
        hue,
      }
    })

    setStars(next)
  }, [count, variant, seed])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[6] mix-blend-screen">
      {stars.map((s) => (
        <span
          key={s.id}
          className={`ac-shooting-star ${
            s.hue === "teal" ? "ac-shooting-star--teal" : "ac-shooting-star--pink"
          }`}
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            ["--sx" as any]: `${s.startX}vw`,
            ["--sy" as any]: `${s.startY}vh`,
            ["--dx" as any]: `${s.dx}vw`,
            ["--dy" as any]: `${s.dy}vh`,
            ["--popAt" as any]: `${s.popAt}`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
