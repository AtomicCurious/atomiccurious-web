// src/components/AccentToggle.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"

export type AccentMode = "atom" | "iris" | "core"

const STORAGE_KEY = "ac_accent"

// ✅ Back-compat: if user had "neon" stored, map to "atom"
function normalizeStored(v: string | null): AccentMode | null {
  if (!v) return null
  if (v === "neon") return "atom"
  if (v === "atom" || v === "iris" || v === "core") return v
  return null
}

function safeGetStoredRaw(): string | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function safeSetStored(mode: AccentMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // ignore
  }
}

function safeGetStored(): AccentMode | null {
  return normalizeStored(safeGetStoredRaw())
}

function applyAccent(mode: AccentMode) {
  // ✅ Your globals.css uses body[data-accent="..."]
  // We also mirror to <html> so observers / CSS can hook either safely.
  if (typeof document === "undefined") return

  document.body?.setAttribute("data-accent", mode)
  document.documentElement?.setAttribute("data-accent", mode)
}

function nextAccent(mode: AccentMode): AccentMode {
  return mode === "atom" ? "iris" : mode === "iris" ? "core" : "atom"
}

function label(mode: AccentMode) {
  if (mode === "atom") return "ATOM"
  if (mode === "iris") return "IRIS"
  return "CORE"
}

export default function AccentToggle({
  hidden = false,
  forceAccent,
}: {
  hidden?: boolean
  forceAccent?: AccentMode
}) {
  const pathname = usePathname()

  const locked = Boolean(forceAccent)
  const [mode, setMode] = useState<AccentMode>("atom")
  const next = useMemo(() => nextAccent(mode), [mode])

  // ✅ Init / sync (and migrate neon -> atom only if needed)
  useEffect(() => {
    if (typeof window === "undefined") return

    const raw = safeGetStoredRaw()
    const stored = forceAccent ?? normalizeStored(raw) ?? "atom"

    setMode(stored)
    applyAccent(stored)

    // Only rewrite storage if we truly need migration (neon -> atom)
    if (!forceAccent && raw === "neon") {
      safeSetStored("atom")
    }
  }, [forceAccent])

  // ✅ Keep accent applied on navigation (prevents body/html getting out of sync)
  useEffect(() => {
    const current = forceAccent ?? safeGetStored() ?? mode
    applyAccent(current)
  }, [pathname, forceAccent, mode])

  // ✅ Persist + apply when changed (only when not forced)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (forceAccent) return

    safeSetStored(mode)
    applyAccent(mode)
  }, [mode, forceAccent])

  if (hidden) return null

  return (
    <button
      type="button"
      onClick={() => {
        if (locked) return
        setMode(next)
      }}
      aria-label={`Switch accent to ${label(next)}`}
      className={[
        "inline-flex items-center gap-2 rounded-full",
        "border border-border/80 bg-surface-1",
        "px-3 py-1.5 text-xs font-semibold text-text",
        "shadow-soft transition",
        "hover:border-accent/35 hover:bg-surface-2",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        locked ? "opacity-60 cursor-not-allowed" : "",
      ].join(" ")}
      disabled={locked}
      title={locked ? `Accent locked: ${forceAccent}` : `Accent: ${mode} (next: ${next})`}
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
