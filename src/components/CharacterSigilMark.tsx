//src\components\CharacterSigilMark.tsx
"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"

import AtomDnaSigil from "@/components/AtomDnaSigil"
import IrisRubikSigil from "@/components/IrisRubikSigil"
import CoreGalaxySigil from "@/components/CoreGalaxySigil"
import { useVoice } from "@/components/useVoice"

type SigilMode = "selected" | "trio" | "auto"

function isTrioRoute(pathname: string) {
  // Solo "trio" en páginas específicas (por ejemplo, recursos o comunidad)
  // Eliminaré "/about" de la lista para que solo haya un sigil en About
  if (pathname === "/about" || pathname.startsWith("/about/")) return false  // **Aquí cambio para que About no sea "trio"**

  // El resto de páginas sí pueden usar el "trio" si se quiere
  return false
}

export default function CharacterSigilMark({
  className = "",
  mode = "auto",
}: {
  className?: string
  mode?: SigilMode
}) {
  const pathname = usePathname()
  const { character } = useVoice()

  const resolvedMode = useMemo(() => {
    if (mode === "auto") return isTrioRoute(pathname) ? "trio" : "selected"
    return mode
  }, [mode, pathname])

  if (resolvedMode === "trio") {
    return (
      <span
        aria-label="AtomicCurious hosts"
        className={[ "inline-flex items-center", "-space-x-2.5" ].join(" ")}
      >
        <span
          className={[ "inline-flex items-center justify-center", "rounded-full border border-border/70 bg-surface-1", "shadow-soft", "ring-1 ring-white/5" ].join(" ")}
        >
          <AtomDnaSigil className={className} />
        </span>

        <span
          className={[ "inline-flex items-center justify-center", "rounded-full border border-border/70 bg-surface-1", "shadow-soft", "ring-1 ring-white/5" ].join(" ")}
        >
          <IrisRubikSigil className={className} />
        </span>

        <span
          className={[ "inline-flex items-center justify-center", "rounded-full border border-border/70 bg-surface-1", "shadow-soft", "ring-1 ring-white/5" ].join(" ")}
        >
          <CoreGalaxySigil className={className} />
        </span>
      </span>
    )
  }

  // Mostrar solo el sigil correspondiente al personaje seleccionado
  if (character === "iris") return <IrisRubikSigil className={className} />
  if (character === "core") return <CoreGalaxySigil className={className} />
  return <AtomDnaSigil className={className} />
}
