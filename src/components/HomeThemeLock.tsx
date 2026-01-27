// src/components/HomeThemeLock.tsx
"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

type CharacterMode = "atom" | "iris" | "core"

const STORAGE_KEY = "ac_character"
const LEGACY_KEY = "ac_accent"

// 👇 atributo SOLO para “lock visual” del Home
const HOME_IMAGE_LOCK_ATTR = "data-home-hero"

function normalize(v: string | null): CharacterMode | null {
  if (v === "atom" || v === "iris" || v === "core") return v
  return null
}

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function readStoredCharacter(): CharacterMode | null {
  return normalize(safeGet(STORAGE_KEY)) ?? normalize(safeGet(LEGACY_KEY))
}

function applyCharacter(mode: CharacterMode | null) {
  if (typeof document === "undefined") return
  const body = document.body
  const html = document.documentElement
  if (!body || !html) return

  if (!mode) {
    body.removeAttribute("data-character")
    html.removeAttribute("data-character")
    body.removeAttribute("data-accent")
    html.removeAttribute("data-accent")
  } else {
    body.setAttribute("data-character", mode)
    html.setAttribute("data-character", mode)
    // back-compat: some CSS still reads data-accent
    body.setAttribute("data-accent", mode)
    html.setAttribute("data-accent", mode)
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ac:character"))
  }
}

// ✅ lock solo visual (NO personalidad)
function setHomeHeroImageLock(mode: CharacterMode | null) {
  if (typeof document === "undefined") return
  const body = document.body
  if (!body) return

  if (!mode) body.removeAttribute(HOME_IMAGE_LOCK_ATTR)
  else body.setAttribute(HOME_IMAGE_LOCK_ATTR, mode)

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ac:home-hero"))
  }
}

export default function HomeThemeLock() {
  const pathname = usePathname()

  // ✅ Home routes only (EN home is "/", ES home is "/es")
  const isHome = pathname === "/" || pathname === "/es" || pathname === "/es/"

  // Remember what was active before entering Home
  const prevThemeRef = useRef<string | null>(null)
  const prevCharRef = useRef<CharacterMode | null>(null)
  const prevAccentRef = useRef<CharacterMode | null>(null)

  // ✅ NEW: remember inline overflow styles to restore safely
  const prevHtmlOverflowRef = useRef<string>("")
  const prevBodyOverflowRef = useRef<string>("")
  const prevBodyOverflowYRef = useRef<string>("")

  useEffect(() => {
    if (typeof document === "undefined") return

    const body = document.body
    const html = document.documentElement
    if (!body || !html) return

    if (isHome) {
      // Save current state once per entry
      prevThemeRef.current = body.getAttribute("data-theme")
      prevCharRef.current =
        normalize(body.getAttribute("data-character")) ??
        normalize(html.getAttribute("data-character"))
      prevAccentRef.current =
        normalize(body.getAttribute("data-accent")) ??
        normalize(html.getAttribute("data-accent"))

      // 🧼 Home must never inherit section themes
      body.removeAttribute("data-theme")

      // Keep Tailwind `dark:` always active on Home
      html.classList.add("dark")

      // ✅ SOLO LOCK VISUAL: Home hero image ALWAYS IRIS
      setHomeHeroImageLock("iris")

      // 🔒 KILL SCROLL ON HOME (this removes the “deslizador”)
      // Store previous inline styles so we can restore precisely
      prevHtmlOverflowRef.current = html.style.overflow || ""
      prevBodyOverflowRef.current = body.style.overflow || ""
      prevBodyOverflowYRef.current = body.style.overflowY || ""

      html.style.overflow = "hidden"
      body.style.overflow = "hidden"
      body.style.overflowY = "hidden"

      return
    }

    // Leaving Home: remove visual lock
    setHomeHeroImageLock(null)

    // ✅ Restore overflow to whatever it was before Home
    html.style.overflow = prevHtmlOverflowRef.current
    body.style.overflow = prevBodyOverflowRef.current
    body.style.overflowY = prevBodyOverflowYRef.current

    // Restore theme (if it existed)
    const prevTheme = prevThemeRef.current
    if (prevTheme === null) body.removeAttribute("data-theme")
    else body.setAttribute("data-theme", prevTheme)

    // Ensure user's real character is applied (stored > fallback)
    const stored = readStoredCharacter()
    const fallback = prevCharRef.current ?? prevAccentRef.current ?? null
    applyCharacter(stored ?? fallback)

    // Optional: if you *never* want to remove dark class, keep it.
    // html.classList.remove("dark")
  }, [isHome])

  return null
}
