// src/components/ThemeToggle.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"

export type ThemeMode = "dark" | "aurora"

const STORAGE_KEY = "ac_theme"

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "dark" || value === "aurora"
}

function getStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return isThemeMode(raw) ? raw : null
  } catch {
    return null
  }
}

function persistTheme(mode: ThemeMode) {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // ignore storage failures
  }
}

function clearScopedTheme() {
  if (typeof document === "undefined") return

  document.body.removeAttribute("data-theme")
  document.documentElement.classList.add("dark")
}

/**
 * Rules:
 * - Home NEVER changes visually
 * - Themes apply ONLY to section pages through <body data-theme="...">
 * - "dark" means: remove data-theme and fall back to :root tokens
 */
function applyThemeScoped(mode: ThemeMode, isHome: boolean) {
  if (typeof document === "undefined") return

  const root = document.documentElement
  const body = document.body

  if (isHome) {
    clearScopedTheme()
    return
  }

  if (mode === "dark") {
    body.removeAttribute("data-theme")
  } else {
    body.setAttribute("data-theme", mode)
  }

  root.classList.add("dark")
}

function cycleTheme(mode: ThemeMode): ThemeMode {
  return mode === "dark" ? "aurora" : "dark"
}

function getThemeLabel(mode: ThemeMode) {
  return mode === "dark" ? "DARK" : "AURORA"
}

function getAriaLabel(mode: ThemeMode, next: ThemeMode, locked: boolean, isHome: boolean) {
  if (locked) {
    return `Theme locked: ${getThemeLabel(mode)}.`
  }

  if (isHome) {
    return `Stored theme: ${getThemeLabel(mode)}. Home appearance remains fixed. Switch stored theme to ${getThemeLabel(next)}.`
  }

  return `Theme: ${getThemeLabel(mode)}. Switch to ${getThemeLabel(next)}.`
}

function resolveInitialTheme(forceTheme?: ThemeMode): ThemeMode {
  return forceTheme ?? getStoredTheme() ?? "dark"
}

export default function ThemeToggle({
  hidden = false,
  forceTheme,
}: {
  hidden?: boolean
  forceTheme?: ThemeMode
}) {
  const pathname = usePathname()

  const isHome =
    pathname === "/" ||
    pathname === "/en" ||
    pathname === "/en/" ||
    pathname === "/es" ||
    pathname === "/es/"

  const locked = Boolean(forceTheme)

  const [mode, setMode] = useState<ThemeMode>(() => resolveInitialTheme(forceTheme))

  const next = useMemo(() => cycleTheme(mode), [mode])

  useEffect(() => {
    const resolved = resolveInitialTheme(forceTheme)
    setMode(resolved)
    applyThemeScoped(resolved, isHome)
  }, [forceTheme, isHome, pathname])

  useEffect(() => {
    if (forceTheme) return
    persistTheme(mode)
  }, [mode, forceTheme])

  if (hidden) return null

  const title = locked
    ? `Theme locked: ${getThemeLabel(mode)}`
    : isHome
      ? `Stored theme: ${getThemeLabel(mode)} (Home stays visually fixed)`
      : `Theme: ${getThemeLabel(mode)} (next: ${getThemeLabel(next)})`

  function handleClick() {
    if (locked) return

    const updated = cycleTheme(mode)
    setMode(updated)
    persistTheme(updated)
    applyThemeScoped(updated, isHome)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={getAriaLabel(mode, next, locked, isHome)}
      className={[
        "inline-flex items-center gap-2 rounded-full",
        "border border-white/10 bg-white/[0.03] backdrop-blur-md",
        "px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-white/92",
        "shadow-soft transition-all duration-200",
        "hover:border-white/16 hover:bg-white/[0.05]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        locked ? "cursor-not-allowed opacity-60" : "",
      ].join(" ")}
      disabled={locked}
      title={title}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="opacity-90"
      >
        {mode === "aurora" ? (
          <>
            <path
              d="M12 2l1.1 5.2L18 9l-4.9 1.8L12 16l-1.1-5.2L6 9l4.9-1.8L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M21 12.2A8.5 8.5 0 1 1 11.8 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              opacity="0.58"
            />
          </>
        ) : (
          <path
            d="M21 12.2A8.5 8.5 0 1 1 11.8 3a6.3 6.3 0 0 0 9.2 9.2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}
      </svg>

      <span>{getThemeLabel(mode)}</span>
    </button>
  )
}