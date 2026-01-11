//src\components\AccentSigilMark.tsx
"use client"

import { useEffect, useState } from "react"
import AtomDnaSigil from "@/components/AtomDnaSigil"
import IrisRubikSigil from "@/components/IrisRubikSigil"
import CoreGalaxySigil from "@/components/CoreGalaxySigil"

type Accent = "atom" | "iris" | "core"

export default function AccentSigilMark({ className = "" }: { className?: string }) {
  const [accent, setAccent] = useState<Accent>("atom")

  useEffect(() => {
    const read = () => {
      const a =
        document.documentElement.getAttribute("data-accent") ||
        document.body.getAttribute("data-accent") ||
        "atom"

      if (a === "atom" || a === "iris" || a === "core") setAccent(a)
      else setAccent("atom")
    }

    read()

    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-accent"] })
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-accent"] })

    return () => mo.disconnect()
  }, [])

  if (accent === "iris") return <IrisRubikSigil className={className} />
  if (accent === "core") return <CoreGalaxySigil className={className} />
  return <AtomDnaSigil className={className} />
}
