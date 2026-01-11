"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"

export type ThemeMode = "dark" | "light" | "cosmic" | "ocean" | "mocha"

const STORAGE_KEY = "ac_theme"

function getStored(): ThemeMode | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (
    raw === "dark" ||
    raw === "light" ||
    raw === "cosmic" ||
    raw === "ocean" ||
    raw === "mocha"
  ) {
    return raw
  }
  return null
}

function isDarkLike(mode: ThemeMode) {
  return mode === "dark" || mode === "cosmic" || mode === "ocean" || mode === "mocha"
}

/**
 * ✅ Rule:
 * - Home must NEVER change (no theme attribute applied there)
 * - Themes apply ONLY to sections (scoped on <body data-theme="...">)
 * - "dark" means: remove data-theme (fallback to :root tokens)
 */
function applyThemeScoped(mode: ThemeMode, isHome: boolean) {
  const root = document.documentElement
  const body = document.body

  if (isHome) {
    body.removeAttribute("data-theme")
    root.classList.add("dark")
    return
  }

  if (mode === "dark") body.removeAttribute("data-theme")
  else body.setAttribute("data-theme", mode)

  if (isDarkLike(mode)) root.classList.add("dark")
  else root.classList.remove("dark")
}

function cycle(mode: ThemeMode): ThemeMode {
  // dark → cosmic → ocean → mocha → light → dark
  if (mode === "dark") return "cosmic"
  if (mode === "cosmic") return "ocean"
  if (mode === "ocean") return "mocha"
  if (mode === "mocha") return "light"
  return "dark"
}

function label(mode: ThemeMode) {
  return mode.toUpperCase()
}

function ariaLabel(mode: ThemeMode, next: ThemeMode) {
  return `Theme: ${label(mode)}. Switch to ${label(next)}.`
}

export default function ThemeToggle({
  hidden = false,
  forceTheme,
}: {
  hidden?: boolean
  forceTheme?: ThemeMode
}) {
  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "/es" || pathname === "/es/"

  const locked = Boolean(forceTheme)
  const [mode, setMode] = useState<ThemeMode>("dark")
  const next = useMemo(() => cycle(mode), [mode])

  // ✅ Apply theme on mount + route changes (home stays locked)
  useEffect(() => {
    if (typeof window === "undefined") return
    const current = forceTheme ?? getStored() ?? mode
    applyThemeScoped(current, isHome)
  }, [pathname, isHome, forceTheme])

  // Init local state once (or when force changes)
  useEffect(() => {
    if (typeof window === "undefined") return
    const initial = forceTheme ?? getStored() ?? "dark"
    setMode(initial)
  }, [forceTheme])

  // Persist mode changes (only when not forced)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (forceTheme) return
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode, forceTheme])

  if (hidden) return null

  const title = locked
    ? `Theme locked: ${forceTheme}`
    : isHome
      ? `Theme stored: ${mode} (Home stays fixed)`
      : `Theme: ${mode} (next: ${next})`

  return (
    <button
      type="button"
      onClick={() => {
        if (locked) return
        const n = next
        setMode(n)

        if (typeof window !== "undefined") {
          if (!forceTheme) window.localStorage.setItem(STORAGE_KEY, n)
          applyThemeScoped(n, isHome)
        }
      }}
      aria-label={ariaLabel(mode, next)}
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
        {mode === "light" ? (
          <>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 2v3M12 19v3M2 12h3M19 12h3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.9"
            />
          </>
        ) : mode === "cosmic" ? (
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
              opacity="0.7"
            />
          </>
        ) : mode === "ocean" ? (
          <>
            <path
              d="M3 14c2.2 0 2.2-2 4.4-2s2.2 2 4.4 2 2.2-2 4.4-2 2.2 2 4.4 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6 18c1.6 0 1.6-1.5 3.2-1.5S10.8 18 12.4 18s1.6-1.5 3.2-1.5S17.2 18 18.8 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.65"
            />
          </>
        ) : mode === "mocha" ? (
          <>
            <path
              d="M7 10h9v4a4 4 0 0 1-4 4H7v-8Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M16 11h1.2a2 2 0 1 1 0 4H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M9 6c0 1 1 1 1 2s-1 1-1 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </>
        ) : (
          <>
            <path
              d="M21 12.2A8.5 8.5 0 1 1 11.8 3a6.3 6.3 0 0 0 9.2 9.2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>

      <span>{label(mode)}</span>
    </button>
  )
}
