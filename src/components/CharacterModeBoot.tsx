// src/components/CharacterModeBoot.tsx
"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

type Mode = "host" | "trio" | "none"

function getMode(pathname: string): Mode {
  const p = pathname === "/" ? "/" : pathname.replace(/\/$/, "")

  // ✅ Trio sections (3 characters together)
  if (p === "/resources" || p === "/community") return "trio"
  if (p === "/es/recursos" || p === "/es/comunidad") return "trio"

  // ✅ About (lore/universe) = trio
  if (p === "/about") return "trio"
  if (p === "/es/about" || p === "/es/acerca") return "trio"

  // ✅ Host sections (selected character)
  // Start here
  if (p === "/start-here" || p === "/es/start-here") return "host"

  // Posts (index + slugs)
  if (p === "/posts" || p.startsWith("/posts/")) return "host"
  if (p === "/es/posts" || p.startsWith("/es/posts/")) return "host"

  // Newsletter
  if (p === "/newsletter" || p === "/es/newsletter") return "host"

  // Contacto (host, NOT neutral)
  if (p === "/contact" || p === "/es/contacto") return "host"

  // Default
  return "host"
}

export default function CharacterModeBoot() {
  const pathname = usePathname()

  useEffect(() => {
    const mode = getMode(pathname)

    // ✅ ALWAYS target the layout root main (never a nested <main>)
    const main = document.querySelector('main[data-chroot="1"]') as HTMLElement | null

    if (main) {
      main.setAttribute("data-chmode", mode)
      main.setAttribute("data-chpath", pathname)
    }

    // Mirror on body + html for global CSS + hooks
    document.body.setAttribute("data-chmode", mode)
    document.documentElement.setAttribute("data-chmode", mode)
  }, [pathname])

  return null
}
