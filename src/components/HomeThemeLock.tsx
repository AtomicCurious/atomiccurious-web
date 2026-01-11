// src/components/HomeThemeLock.tsx
"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function HomeThemeLock() {
  const pathname = usePathname()

  // ✅ Home routes only (EN home is "/", ES home is "/es")
  const isHome = pathname === "/" || pathname === "/es" || pathname === "/es/"

  useEffect(() => {
    if (typeof window === "undefined") return

    if (isHome) {
      // 🧼 Home must never inherit section themes
      document.body.removeAttribute("data-theme")

      // Keep Tailwind `dark:` always active on Home
      document.documentElement.classList.add("dark")
    }
  }, [isHome])

  return null
}
