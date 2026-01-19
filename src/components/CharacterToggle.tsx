// src/components/CharacterToggle.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import type { CharacterMode } from "@/content/voices"

const STORAGE_KEY = "ac_character"
const LEGACY_KEY = "ac_accent"

function normalize(v: string | null): CharacterMode | null {
  if (v === "atom" || v === "iris" || v === "core") return v
  return null
}

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSet(key: string, value: string) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

function applyCharacter(mode: CharacterMode) {
  if (typeof document === "undefined") return

  document.body.setAttribute("data-character", mode)
  document.documentElement.setAttribute("data-character", mode)

  // back-compat
  document.body.setAttribute("data-accent", mode)
  document.documentElement.setAttribute("data-accent", mode)

  window.dispatchEvent(new Event("ac:character"))
}

function nextCharacter(mode: CharacterMode): CharacterMode {
  return mode === "atom" ? "iris" : mode === "iris" ? "core" : "atom"
}

function label(mode: CharacterMode) {
  return mode.toUpperCase()
}

export default function CharacterToggle({
  hidden = false,
  forceCharacter,
}: {
  hidden?: boolean
  forceCharacter?: CharacterMode
}) {
  const locked = Boolean(forceCharacter)
  const [mode, setMode] = useState<CharacterMode>("atom")

  const next = useMemo(() => nextCharacter(mode), [mode])

  // init + migrate legacy
  useEffect(() => {
    if (typeof window === "undefined") return

    let initial =
      normalize(safeGet(STORAGE_KEY)) ??
      normalize(safeGet(LEGACY_KEY)) ??
      "atom"

    if (forceCharacter) initial = forceCharacter

    setMode(initial)
    applyCharacter(initial)
  }, [forceCharacter])

  // persist on change (only if not forced)
  useEffect(() => {
    if (forceCharacter) return
    safeSet(STORAGE_KEY, mode)
    applyCharacter(mode)
  }, [mode, forceCharacter])

  // sync across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY) return
      const v = normalize(e.newValue)
      if (!v) return
      setMode(v)
      applyCharacter(v)
    }

    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  if (hidden) return null

  return (
    <button
      type="button"
      onClick={() => {
        if (locked) return
        setMode(next)
      }}
      aria-label={`Cambiar personaje a ${label(next)}`}
      className={[
        "inline-flex items-center gap-2 rounded-full",
        "border border-border/80 bg-surface-1",
        "px-3 py-1.5 text-xs font-semibold text-text",
        "shadow-soft transition",
        "hover:border-accent/35 hover:bg-surface-2",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55",
        locked ? "opacity-60 cursor-not-allowed" : "",
      ].join(" ")}
      disabled={locked}
      title={
        locked
          ? `Character locked: ${forceCharacter}`
          : `Character: ${mode} → ${next}`
      }
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="opacity-90"
      >
        <path
          d="M12 2l1.1 5.2L18 9l-4.9 1.8L12 16l-1.1-5.2L6 9l4.9-1.8L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span>{label(mode)}</span>
    </button>
  )
}
