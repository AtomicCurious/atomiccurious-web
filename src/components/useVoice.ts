// src/components/useVoice.ts
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import type { CharacterMode, Locale, Voice } from "@/content/voices"
import { getLocaleFromPath, getVoice } from "@/content/voices"

const STORAGE_KEY = "ac_character"
const LEGACY_KEY = "ac_accent"

type ChMode = "host" | "trio" | "none"

function normalizeStored(v: string | null): CharacterMode | null {
  if (!v) return null
  if (v === "atom" || v === "iris" || v === "core") return v
  return null
}

function normalizeChMode(v: string | null): ChMode | null {
  if (v === "host" || v === "trio" || v === "none") return v
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

function safeSet(key: string, value: string) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

/**
 * DOM reading:
 * - Prefer data-character
 * - Fallback to data-accent (back-compat)
 */
function readCharacterFromDOM(): CharacterMode | null {
  if (typeof document === "undefined") return null

  const body = document.body
  const html = document.documentElement

  const bChar = normalizeStored(body?.getAttribute("data-character"))
  const hChar = normalizeStored(html?.getAttribute("data-character"))
  if (bChar || hChar) return bChar ?? hChar

  const bAcc = normalizeStored(body?.getAttribute("data-accent"))
  const hAcc = normalizeStored(html?.getAttribute("data-accent"))
  return bAcc ?? hAcc
}

function readCharacterStored(): CharacterMode | null {
  return normalizeStored(safeGet(STORAGE_KEY)) ?? normalizeStored(safeGet(LEGACY_KEY))
}

function readChModeFromDOM(): ChMode | null {
  if (typeof document === "undefined") return null
  const body = document.body
  const html = document.documentElement
  const b = normalizeChMode(body?.getAttribute("data-chmode"))
  const h = normalizeChMode(html?.getAttribute("data-chmode"))
  return b ?? h
}

type UseVoiceOpts = {
  forceCharacter?: CharacterMode
  /** ✅ Neutral mode: no personas, no syncing, no reads/writes */
  disable?: boolean
  /** ✅ Fallback used only when not disabled and nothing found */
  defaultCharacter?: CharacterMode
}

export function useVoice(opts?: UseVoiceOpts) {
  const pathname = usePathname()
  const forceCharacter = opts?.forceCharacter
  const disable = Boolean(opts?.disable)
  const defaultCharacter = opts?.defaultCharacter ?? "atom"

  const locale: Locale = useMemo(
    () => getLocaleFromPath(pathname || "/en"),
    [pathname]
  )

  // ✅ chmode from DOM (CharacterModeBoot)
  const [chmode, setChmode] = useState<ChMode>(() => {
    if (typeof document === "undefined") return "host"
    return readChModeFromDOM() ?? "host"
  })

  // ✅ character (selected host)
  const [character, setCharacter] = useState<CharacterMode | null>(() => {
    if (disable) return null
    return forceCharacter ?? defaultCharacter
  })

  // Track previous forced state to detect transitions (forced -> normal)
  const prevForcedRef = useRef<CharacterMode | undefined>(forceCharacter)

  // ✅ watch data-chmode changes
  useEffect(() => {
    if (typeof document === "undefined") return

    const body = document.body
    const html = document.documentElement
    if (!body || !html) return

    const onMut = () => {
      const next = readChModeFromDOM() ?? "host"
      setChmode((prev) => (prev === next ? prev : next))
    }

    // initial sync
    onMut()

    const obs = new MutationObserver(onMut)
    obs.observe(body, { attributes: true, attributeFilter: ["data-chmode"] })
    obs.observe(html, { attributes: true, attributeFilter: ["data-chmode"] })

    return () => obs.disconnect()
  }, [])

  // ✅ init + migrate legacy -> new key once
  useEffect(() => {
    if (typeof window === "undefined") return

    // --- Neutral mode: do nothing at all.
    if (disable) {
      setCharacter(null)
      prevForcedRef.current = undefined
      return
    }

    // --- Forced mode: lock render ONLY (no global reads/writes/listeners)
    if (forceCharacter) {
      setCharacter(forceCharacter)
      prevForcedRef.current = forceCharacter
      return
    }

    // --- We are in normal mode
    // If we are coming FROM forced mode, hard resync immediately.
    const wasForced = Boolean(prevForcedRef.current)
    prevForcedRef.current = undefined

    const stored = normalizeStored(safeGet(STORAGE_KEY))
    if (!stored) {
      const legacy = normalizeStored(safeGet(LEGACY_KEY))
      if (legacy) safeSet(STORAGE_KEY, legacy)
    }

    const next =
      (readCharacterFromDOM() ?? readCharacterStored() ?? defaultCharacter) as CharacterMode

    setCharacter((prev) => {
      const prevResolved = (prev ?? defaultCharacter) as CharacterMode
      if (wasForced) return next
      return prevResolved === next ? prevResolved : next
    })
  }, [forceCharacter, disable, defaultCharacter])

  // ✅ keep in sync with body/html attribute changes (data-character OR data-accent)
  useEffect(() => {
    if (typeof document === "undefined") return
    if (disable) return
    if (forceCharacter) return

    const body = document.body
    const html = document.documentElement
    if (!body || !html) return

    const onMut = () => {
      const next =
        (readCharacterFromDOM() ?? readCharacterStored() ?? defaultCharacter) as CharacterMode
      setCharacter((prev) => {
        const prevResolved = (prev ?? defaultCharacter) as CharacterMode
        return prevResolved === next ? prevResolved : next
      })
    }

    const obs = new MutationObserver(onMut)
    obs.observe(body, { attributes: true, attributeFilter: ["data-character", "data-accent"] })
    obs.observe(html, { attributes: true, attributeFilter: ["data-character", "data-accent"] })

    return () => obs.disconnect()
  }, [forceCharacter, disable, defaultCharacter])

  // ✅ keep in sync with localStorage changes (multi-tab)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (disable) return
    if (forceCharacter) return

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY && e.key !== LEGACY_KEY) return
      const next =
        (readCharacterFromDOM() ?? readCharacterStored() ?? defaultCharacter) as CharacterMode
      setCharacter((prev) => {
        const prevResolved = (prev ?? defaultCharacter) as CharacterMode
        return prevResolved === next ? prevResolved : next
      })
    }

    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [forceCharacter, disable, defaultCharacter])

  // ✅ respond instantly to CharacterToggle dispatchEvent("ac:character")
  useEffect(() => {
    if (typeof window === "undefined") return
    if (disable) return
    if (forceCharacter) return

    const onCharacter = () => {
      const next =
        (readCharacterFromDOM() ?? readCharacterStored() ?? defaultCharacter) as CharacterMode
      setCharacter((prev) => {
        const prevResolved = (prev ?? defaultCharacter) as CharacterMode
        return prevResolved === next ? prevResolved : next
      })
    }

    window.addEventListener("ac:character", onCharacter as any)
    return () => window.removeEventListener("ac:character", onCharacter as any)
  }, [forceCharacter, disable, defaultCharacter])

  // ✅ voice rules:
  // - disable => null
  // - none => null
  // - trio => null (no host dominante)
  // - host => voice activa
  const voice: Voice | null = useMemo(() => {
    if (disable || !character) return null
    if (chmode === "none") return null
    if (chmode === "trio") return null
    return getVoice(locale, character)
  }, [locale, character, disable, chmode])

  return { locale, chmode, character, voice }
}
