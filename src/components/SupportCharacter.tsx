"use client"

import { useEffect, useState } from "react"

type Character = "atom" | "iris" | "core"

export default function SupportCharacter() {
  const [character, setCharacter] = useState<Character>("atom")

  useEffect(() => {
    const attr =
      document.documentElement.getAttribute("data-character") ||
      document.body.getAttribute("data-character")

    if (attr === "iris" || attr === "core") {
      setCharacter(attr)
    } else {
      setCharacter("atom")
    }
  }, [])

  const color =
    character === "atom"
      ? "52 211 153"
      : character === "iris"
      ? "34 211 238"
      : "251 146 60"

  return (
    <div className="flex items-center justify-center py-1">
      <div className="relative flex items-center justify-center">
        {/* Aura exterior */}
        <div
          className="absolute h-12 w-12 rounded-full blur-xl opacity-40"
          style={{
            background: `rgb(${color} / 0.35)`,
          }}
        />

        {/* Núcleo */}
        <div
          className="relative h-3.5 w-3.5 rounded-full"
          style={{
            background: `rgb(${color} / 0.95)`,
            boxShadow: `
              0 0 12px rgb(${color} / 0.6),
              0 0 28px rgb(${color} / 0.35)
            `,
          }}
        />

        {/* Pulso suave */}
        <div
          className="absolute h-6 w-6 rounded-full animate-ping opacity-20"
          style={{
            background: `rgb(${color} / 0.4)`,
          }}
        />
      </div>
    </div>
  )
}