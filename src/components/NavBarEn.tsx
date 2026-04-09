// src/components/NavBarEn.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import CoreFactBubble from "@/components/visual/CoreFactBubble"
import AtomNoteBubble from "@/components/visual/AtomNoteBubble"
import ThemeToggle from "@/components/ThemeToggle"
import CharacterToggle from "@/components/CharacterToggle"
import CharacterSigilMark from "@/components/CharacterSigilMark"

/* =========================================================
   HOME HEADER POSITION CONTROLS (desktop/tablet)
========================================================= */
const BRAND_NUDGE_X = -121
const NAV_NUDGE_X = 0
const LANG_SWITCH_NUDGE_X = -18
const EDITOR_NOTE_NUDGE_X = 155
const HEADER_NUDGE_X = -20

/* =========================================================
   SECTIONS HEADER POSITION CONTROLS (desktop/tablet)
========================================================= */
const SECTION_BRAND_NUDGE_X = -170
const SECTION_NAV_NUDGE_X = -150
const SECTION_TOGGLES_NUDGE_X = 100
const SECTION_LANG_NUDGE_X = 110
const SECTION_EDITOR_NOTE_NUDGE_X = 145

/* =========================================================
   SECTION DIVIDER POSITION CONTROLS
========================================================= */
const SECTION_LEFT_DIVIDER_NUDGE_X = 35
const SECTION_RIGHT_DIVIDER_NUDGE_X = 0

const DONATE_HREF_EN = "/support"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href + "/")
}

function toEs(pathname: string) {
  const map: Record<string, string> = {
    "/calendar": "/es/calendario",
    "/resources": "/es/recursos",
    "/community": "/es/comunidad",
    "/contact": "/es/contacto",
    "/newsletter": "/es/newsletter",
    "/start-here": "/es/start-here",
    "/about": "/es/about",
    "/posts": "/es/posts",
    "/": "/es",
  }

  const postSlugMap: Record<string, string> = {
    "why-we-dream": "por-que-sonamos",
  }

  if (map[pathname]) return map[pathname]

  if (pathname.startsWith("/posts/")) {
    const slug = pathname.replace("/posts/", "")
    const esSlug = postSlugMap[slug] ?? slug
    return `/es/posts/${esSlug}`
  }

  return pathname === "/" ? "/es" : `/es${pathname}`
}

/* -----------------------------
   Core beacon persistence
----------------------------- */
const CORE_SEEN_KEY = "ac_core_seen_v1"
const CORE_SEEN_TTL_MS = 1000 * 60 * 60 * 12

function safeNow() {
  return Date.now()
}

function readSeen(): number | null {
  try {
    const raw = localStorage.getItem(CORE_SEEN_KEY)
    if (!raw) return null
    const n = Number(raw)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

function writeSeen(ts: number) {
  try {
    localStorage.setItem(CORE_SEEN_KEY, String(ts))
  } catch {
    // ignore
  }
}

function isSeenFresh(seenTs: number | null) {
  if (!seenTs) return false
  return safeNow() - seenTs < CORE_SEEN_TTL_MS
}

function StarshipMark() {
  return (
    <span
      aria-hidden="true"
      className={[
        "relative inline-flex items-center justify-center",
        "h-6 w-12 sm:h-7 sm:w-14 md:h-8 md:w-16",
        "opacity-90 group-hover:opacity-100 transition-opacity duration-300",
        "will-change-transform",
      ].join(" ")}
      style={{
        transformOrigin: "70% 60%",
        transform: "rotate(-18deg)",
        animation: "shipIdle 3.6s ease-in-out .15s infinite alternate",
        filter:
          "drop-shadow(0 0 12px rgba(160,200,255,0.25)) drop-shadow(0 0 26px rgba(110,140,200,0.16))",
      }}
    >
      <svg viewBox="0 0 210 100" className="h-full w-full block">
        <defs>
          <linearGradient
            id="shipSkinMini"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientTransform="rotate(6)"
          >
            <stop offset="0" stopColor="#141923" />
            <stop offset=".18" stopColor="#1b2130" />
            <stop offset=".46" stopColor="var(--ship-panel, #202634)" />
            <stop offset=".62" stopColor="var(--ship-core, #edf1fa)" />
            <stop offset=".78" stopColor="#242b3b" />
            <stop offset="1" stopColor="#0f141d" />
          </linearGradient>

          <linearGradient id="edgeGlowMini" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--ship-neon2, #68f0ff)" />
            <stop offset="1" stopColor="var(--ship-neon1, #b692ff)" />
          </linearGradient>

          <radialGradient id="jetCoreMini" cx="0.5" cy="0.5" r="0.65">
            <stop offset="0" stopColor="var(--ship-jet-hot, #fff3b8)" />
            <stop offset=".45" stopColor="var(--ship-jet, #bff8ff)" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>

          <linearGradient id="trailA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(104,240,255,.00)" />
            <stop offset=".35" stopColor="rgba(104,240,255,.26)" />
            <stop offset="1" stopColor="rgba(182,146,255,.26)" />
          </linearGradient>

          <linearGradient id="trailB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,.00)" />
            <stop offset=".45" stopColor="rgba(255,255,255,.18)" />
            <stop offset="1" stopColor="rgba(104,240,255,.18)" />
          </linearGradient>
        </defs>

        <g className="trail" opacity=".92">
          <path
            d="M40 62 C 10 70, -40 72, -120 66"
            fill="none"
            stroke="rgba(104,240,255,.36)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M42 50 C 0 55, -50 58, -130 52"
            fill="none"
            stroke="url(#trailA)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M44 56 C 6 62, -46 64, -126 58"
            fill="none"
            stroke="url(#trailB)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        <g className="jetGlow" style={{ mixBlendMode: "screen" as any }}>
          <ellipse className="jetCore" cx="52" cy="56" rx="16" ry="10" fill="url(#jetCoreMini)" />
          <ellipse className="jetCore" cx="52" cy="48" rx="12" ry="8" fill="url(#jetCoreMini)" />
        </g>

        <g>
          <path
            d="M46 38 L140 30 Q170 34 190 50 Q170 66 140 70 L46 62 Q34 59 34 50 Q34 41 46 38 Z"
            fill="url(#shipSkinMini)"
            stroke="var(--ship-edge, #d6ecff)"
            strokeWidth="1.2"
          />
          <path
            d="M108 42 Q126 38 140 40 Q136 50 120 52 Q108 50 108 42 Z"
            fill="rgba(120,200,255,.18)"
            stroke="rgba(170,150,255,.32)"
            strokeWidth="1"
          />
          <path
            d="M140 30 Q170 34 190 50"
            fill="none"
            stroke="url(#edgeGlowMini)"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity=".95"
          />
          <path
            d="M140 70 Q170 66 190 50"
            fill="none"
            stroke="url(#edgeGlowMini)"
            strokeWidth="2.4"
            strokeLinecap="round"
            opacity=".95"
          />
        </g>

        <g opacity=".98">
          <path
            d="M70 34 L52 26 Q46 30 46 36 L64 42 Z"
            fill="var(--ship-panel, #202634)"
            stroke="var(--ship-edge, #d6ecff)"
            strokeWidth="1"
          />
          <path
            d="M70 66 L52 74 Q46 70 46 64 L64 58 Z"
            fill="var(--ship-panel, #202634)"
            stroke="var(--ship-edge, #d6ecff)"
            strokeWidth="1"
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes shipIdle {
          0% {
            transform: rotate(-18deg) translateY(0) scale(1) rotate(0.2deg);
          }
          100% {
            transform: rotate(-18deg) translateY(4px) scale(1.01) rotate(0.9deg);
          }
        }

        .jetCore {
          transform-origin: 92% 52%;
          animation: jetPulse 0.18s ease-in-out infinite;
        }
        @keyframes jetPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.12);
          }
        }

        .jetGlow {
          filter: blur(3.5px);
          opacity: 0.9;
        }

        .trail {
          animation: trailFlow 1.9s linear infinite;
        }
        @keyframes trailFlow {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-18%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
            transform: rotate(-18deg) !important;
          }
          .jetCore,
          .trail {
            animation: none !important;
          }
        }
      `}</style>
    </span>
  )
}

function NotebookMark() {
  return (
    <span
      aria-hidden="true"
      className={[
        "relative inline-flex items-center justify-center",
        "h-8 w-10 sm:h-9 sm:w-11 md:h-10 md:w-12",
        "opacity-90 group-hover:opacity-100 transition-opacity duration-300",
        "will-change-transform",
      ].join(" ")}
      style={{
        transformOrigin: "55% 60%",
        transform: "rotate(-8deg)",
        animation: "noteIdle 4.2s ease-in-out .1s infinite alternate",
        filter:
          "drop-shadow(0 0 16px rgba(104,240,255,0.28)) drop-shadow(0 0 34px rgba(182,146,255,0.22))",
      }}
    >
      <svg viewBox="0 0 140 140" className="h-full w-full block">
        <defs>
          <linearGradient id="notePaper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="0.55" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.025)" />
          </linearGradient>

          <linearGradient id="noteEdgeGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(104,240,255,0.98)" />
            <stop offset="1" stopColor="rgba(182,146,255,0.98)" />
          </linearGradient>

          <linearGradient id="noteFold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>

          <radialGradient id="pinHead" cx="0.35" cy="0.35" r="0.9">
            <stop offset="0" stopColor="rgba(255,255,255,0.50)" />
            <stop offset="0.35" stopColor="rgba(182,146,255,0.42)" />
            <stop offset="1" stopColor="rgba(20,25,35,0.95)" />
          </radialGradient>
          <linearGradient id="pinRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(104,240,255,0.70)" />
            <stop offset="1" stopColor="rgba(182,146,255,0.62)" />
          </linearGradient>

          <radialGradient id="noteInnerGlow" cx="0.35" cy="0.25" r="0.9">
            <stop offset="0" stopColor="rgba(104,240,255,0.16)" />
            <stop offset="0.55" stopColor="rgba(182,146,255,0.08)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        <path
          d="M32 26 H100 Q112 26 112 38 V108 Q112 120 100 120 H32 Q20 120 20 108 V38 Q20 26 32 26 Z"
          fill="url(#notePaper)"
          stroke="rgba(214,236,255,0.42)"
          strokeWidth="1.15"
        />

        <path
          d="M34 28 H98 Q110 28 110 40 V106 Q110 118 98 118 H34 Q22 118 22 106 V40 Q22 28 34 28 Z"
          fill="url(#noteInnerGlow)"
          opacity="0.95"
        />

        <path
          d="M32 26 H100 Q112 26 112 38 V108 Q112 120 100 120 H32 Q20 120 20 108 V38 Q20 26 32 26 Z"
          fill="none"
          stroke="url(#noteEdgeGlow)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.08"
          style={{ mixBlendMode: "screen" as any }}
        />

        <path
          d="M32 26 H100 Q112 26 112 38 V108 Q112 120 100 120 H32 Q20 120 20 108 V38 Q20 26 32 26 Z"
          fill="none"
          stroke="url(#noteEdgeGlow)"
          strokeWidth="3.6"
          strokeLinecap="round"
          opacity="0.26"
        />

        <path
          d="M32 26 H100 Q112 26 112 38"
          fill="none"
          stroke="url(#noteEdgeGlow)"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
        />

        <path
          d="M112 52 L94 52 Q88 52 88 46 V26"
          fill="none"
          stroke="url(#noteEdgeGlow)"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.92"
        />
        <path d="M112 52 L88 52 L112 26 Z" fill="url(#noteFold)" opacity="0.52" />

        <path
          d="M42 62 H92 M42 76 H92 M42 90 H84"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M70 34 L74 58"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M69 34 L73 58"
          stroke="rgba(214,236,255,0.40)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.65"
        />

        <g style={{ transformOrigin: "70px 32px" }}>
          <circle cx="70" cy="32" r="10.5" fill="url(#pinHead)" />
          <circle
            cx="70"
            cy="32"
            r="10.5"
            fill="none"
            stroke="url(#pinRim)"
            strokeWidth="1.6"
            opacity="0.85"
          />
          <circle cx="66.5" cy="28.5" r="2.6" fill="rgba(255,255,255,0.42)" />
          <circle cx="70" cy="32" r="2.2" fill="rgba(182,146,255,0.55)" opacity="0.9" />
        </g>
      </svg>

      <style jsx>{`
        @keyframes noteIdle {
          0% {
            transform: rotate(-8deg) translateY(0) scale(1) rotate(0.2deg);
          }
          100% {
            transform: rotate(-8deg) translateY(3px) scale(1.01) rotate(0.8deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
            transform: rotate(-8deg) !important;
          }
        }
      `}</style>
    </span>
  )
}

function HeaderDivider({
  nudgeX = 0,
  className = "",
}: {
  nudgeX?: number
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={["mx-4 h-5 w-px shrink-0 bg-white/12 transition-colors duration-300", className].join(" ")}
      style={{ transform: `translateX(${nudgeX}px)` }}
    />
  )
}

function SupportButtonEn({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link
      href={DONATE_HREF_EN}
      aria-label="Support this universe"
      className={[
        "ac-support-btn group relative inline-flex items-center justify-center overflow-hidden rounded-[999px]",
        "border text-text transition-all duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "hover:-translate-y-[1px] hover:scale-[1.02] active:translate-y-0 active:scale-[0.985]",
        mobile
          ? "h-10 px-4 text-[13px] font-semibold"
          : "h-11 px-5 text-[13px] font-semibold",
      ].join(" ")}
      style={{
        borderColor: "rgba(255, 210, 122, 0.55)",
        background:
          "linear-gradient(135deg, rgba(244,196,96,0.20) 0%, rgba(255,166,122,0.22) 42%, rgba(255,118,168,0.24) 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.04), 0 12px 34px rgba(255,166,122,0.14), 0 0 28px rgba(255,118,168,0.12)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 222, 148, 0.68)"
        e.currentTarget.style.background =
          "linear-gradient(135deg, rgba(244,196,96,0.26) 0%, rgba(255,166,122,0.29) 42%, rgba(255,118,168,0.32) 100%)"
        e.currentTarget.style.boxShadow =
          "0 0 0 1px rgba(255,255,255,0.06), 0 0 20px rgba(255,210,122,0.12), 0 16px 38px rgba(255,166,122,0.18), 0 0 30px rgba(255,118,168,0.16)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 210, 122, 0.55)"
        e.currentTarget.style.background =
          "linear-gradient(135deg, rgba(244,196,96,0.20) 0%, rgba(255,166,122,0.22) 42%, rgba(255,118,168,0.24) 100%)"
        e.currentTarget.style.boxShadow =
          "0 0 0 1px rgba(255,255,255,0.04), 0 12px 34px rgba(255,166,122,0.14), 0 0 28px rgba(255,118,168,0.12)"
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(255,244,214,0.20) 48%, rgba(255,255,255,0.06) 58%, transparent 76%)",
          backgroundSize: "220% 100%",
          animation: "acSupportSweep 5.8s ease-in-out .55s infinite",
        }}
      />

      <span className="relative z-[1] inline-flex items-center gap-2 whitespace-nowrap">
        <span className="text-[0.96em] tracking-[-0.01em] text-[rgba(255,248,235,0.98)]">
          Support this universe
        </span>

        <span
          aria-hidden="true"
          className="translate-y-[-0.5px] text-[rgba(255,228,188,0.94)] transition-transform duration-300 group-hover:translate-x-[2px]"
        >
          →
        </span>

        <span
          aria-hidden="true"
          className="ac-support-heart inline-flex items-center justify-center text-[0.98em]"
        >
          ❤️
        </span>
      </span>

      <style jsx>{`
        .ac-support-btn {
          animation:
            acSupportIntro 760ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both,
            acSupportPulse 8.5s ease-in-out 1.05s infinite;
        }

        .ac-support-heart {
          transform-origin: center;
          filter:
            drop-shadow(0 0 8px rgba(255, 122, 154, 0.20))
            drop-shadow(0 0 14px rgba(255, 196, 122, 0.14));
          animation: acHeartBeat 1.8s ease-in-out 1.35s infinite;
        }

        @keyframes acSupportIntro {
          0% {
            opacity: 0;
            transform: translateY(3px) scale(0.985);
            filter: saturate(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: saturate(1);
          }
        }

        @keyframes acHeartBeat {
          0%,
          100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.1);
          }
          28% {
            transform: scale(0.985);
          }
          42% {
            transform: scale(1.06);
          }
          56% {
            transform: scale(1);
          }
        }

        @keyframes acSupportPulse {
          0%,
          82%,
          100% {
            transform: scale(1);
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.04),
              0 12px 34px rgba(255,166,122,0.14),
              0 0 28px rgba(255,118,168,0.12);
          }
          88% {
            transform: scale(1.012);
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.06),
              0 0 20px rgba(255,210,122,0.12),
              0 16px 38px rgba(255,166,122,0.18),
              0 0 30px rgba(255,118,168,0.16);
          }
          94% {
            transform: scale(1);
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.04),
              0 12px 34px rgba(255,166,122,0.14),
              0 0 28px rgba(255,118,168,0.12);
          }
        }

        @keyframes acSupportSweep {
          0% {
            background-position: 220% 50%;
          }
          100% {
            background-position: -40% 50%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-support-btn,
          .ac-support-heart {
            animation: none !important;
          }
        }
      `}</style>
    </Link>
  )
}

export default function NavBarEn() {
  const pathname = usePathname()
  const esHref = useMemo(() => toEs(pathname), [pathname])

  const isHome = pathname === "/" || pathname === "/en"
  const showToggles = !isHome

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(max-width: 639px)")
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener?.("change", apply)
    return () => mq.removeEventListener?.("change", apply)
  }, [])

  const rocketRef = useRef<HTMLButtonElement | null>(null)
  const [coreOpen, setCoreOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const noteRefDesktop = useRef<HTMLButtonElement | null>(null)
  const noteRefMobile = useRef<HTMLButtonElement | null>(null)
  const [noteOpen, setNoteOpen] = useState(false)

  const [coreHasNew, setCoreHasNew] = useState(false)
  const [rocketPing, setRocketPing] = useState(false)

  const [noteHasNew, setNoteHasNew] = useState(true)
  const [notePing, setNotePing] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    const prevBodyOverflow = body.style.overflow
    const prevHtmlOverflow = html.style.overflow
    const prevBodyTouchAction = body.style.touchAction
    const prevHtmlTouchAction = html.style.touchAction

    if (menuOpen) {
      body.style.overflow = "hidden"
      html.style.overflow = "hidden"
      body.style.touchAction = "none"
      html.style.touchAction = "none"
    } else {
      body.style.overflow = ""
      html.style.overflow = ""
      body.style.touchAction = ""
      html.style.touchAction = ""
    }

    return () => {
      body.style.overflow = prevBodyOverflow
      html.style.overflow = prevHtmlOverflow
      body.style.touchAction = prevBodyTouchAction
      html.style.touchAction = prevHtmlTouchAction
    }
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = ""
    document.documentElement.style.overflow = ""
    document.body.style.touchAction = ""
    document.documentElement.style.touchAction = ""
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false)
    }
    if (menuOpen) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  useEffect(() => {
    if (!isHome) return
    const seen = readSeen()
    setCoreHasNew(!isSeenFresh(seen))
  }, [isHome])

  useEffect(() => {
    if (!isHome) return
    if (!coreHasNew) return
    if (coreOpen) return

    const interval = window.setInterval(() => {
      setRocketPing(true)
      window.setTimeout(() => setRocketPing(false), 700)
    }, 14000)

    return () => window.clearInterval(interval)
  }, [isHome, coreHasNew, coreOpen])

  useEffect(() => {
    if (!isHome) return
    if (!coreOpen) return
    writeSeen(safeNow())
    setCoreHasNew(false)
  }, [isHome, coreOpen])

  useEffect(() => {
    if (!noteHasNew) return
    if (noteOpen) return

    const interval = window.setInterval(() => {
      setNotePing(true)
      window.setTimeout(() => setNotePing(false), 700)
    }, 16000)

    return () => window.clearInterval(interval)
  }, [noteHasNew, noteOpen])

  const coreFacts = useMemo(
    () => [
      "Octopuses have most of their neurons in their arms, giving them semi-autonomous control.",
      "Your brain constantly predicts what will happen next; seeing is partly guessing.",
      "Atoms are mostly empty space; if matter were compressed to nucleus-like densities, humanity could fit into something sugar-cube sized.",
      "A tiny fraction of dust contains presolar grains older than the solar system.",
      "Venus takes longer to rotate on its axis than to orbit the Sun.",
      "The human body emits an extremely faint glow due to chemical reactions inside cells.",
      "Plants can warn nearby plants of danger by releasing chemicals into the air.",
      "Antarctica is the largest desert on Earth because it receives so little rainfall.",
      "Sharks existed before trees.",
      "A lightning bolt heats the air to temperatures hotter than the Sun's surface.",
      "There are more possible chess games than atoms in the observable universe.",
      "By weight, human bones have comparable or even greater strength than steel.",
      "Music activates the same reward systems in the brain as food.",
      "In ancient Rome, urine was used to clean clothes because of its ammonia content.",
      "Butterflies retain memories from when they were caterpillars.",
      "Some metals can return to their original shape when heated.",
      "The Eiffel Tower grows several centimeters taller in summer due to heat expansion.",
      "A blue whale's heart is so large that a human could fit inside some of its arteries.",
      "Humans and bananas share basic genes because life uses the same cellular tools.",
      "The Moon slowly moves away from Earth by a few centimeters each year.",
      "Cave paintings are far older than written language.",
      "Glass is an amorphous solid; many old windows are thicker at the bottom due to how they were made, not because glass flows.",
      "Spiders don't stick to their webs thanks to silk structure and microscopic hairs on their legs.",
      "A spoonful of honey represents approximately the lifetime work of about 12 bees.",
      "Some large clouds can weigh around a million tons.",
      "Sound travels faster in water than in air.",
      "Some birds can see ultraviolet light invisible to humans.",
      "The Great Wall of China is not visible from low Earth orbit with the naked eye.",
      "The universe is expanding, and galaxies move apart as space stretches.",
      "Ancient Greek statues were often painted in bright colors.",
      "A neutron star is so dense that a sugar-cube-sized piece would weigh hundreds of millions to a billion tons.",
      "Your fingerprints form before birth and never change throughout your life.",
      "Making mistakes helps the brain learn faster than always getting things right.",
    ],
    []
  )

  const editorNotes = useMemo(
    () => [
      "Latest releases live in Resources.",
      "New posts every week for curious minds.",
      "If you enjoy exploring, the newsletter is for you.",
      "Have an idea or proposal? Reach out through Contact.",
      "Short, cinematic explorations to discover the extraordinary.",
      "AtomicCurious is a project for those who design their own curiosity.",
      "Every idea can open a universe.",
      "Come back soon: there's always something new to discover.",
    ],
    []
  )

  const links = [
    { label: "Start Here", href: "/start-here" },
    { label: "Posts", href: "/posts" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Resources", href: "/resources" },
    { label: "Community", href: "/community" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  const noteAnchor = isMobile ? noteRefMobile.current : noteRefDesktop.current

  if (isHome) {
    return (
      <header className="relative border-b border-border/70 bg-bg">
        <div
          className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center px-4 py-4 sm:px-6 will-change-transform"
          style={{ transform: `translateX(${HEADER_NUDGE_X}px)` }}
        >
          {/* LEFT */}
          <div
            className="inline-flex min-w-0 items-center gap-2 sm:gap-3"
            style={{ transform: isMobile ? "none" : `translateX(${BRAND_NUDGE_X}px)` }}
          >
            <button
              ref={rocketRef}
              type="button"
              onClick={() => setCoreOpen((v) => !v)}
              className={["group inline-flex items-center relative", rocketPing ? "ac-rocket-ping" : ""].join(" ")}
              aria-label="Open a Core curiosity"
            >
              <StarshipMark />

              {coreHasNew ? (
                <span
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute",
                    "-top-1 -left-1",
                    "h-2.5 w-2.5 rounded-full",
                    "bg-accent",
                    "shadow-[0_0_0_2px_rgba(var(--bg),0.85),0_0_14px_rgba(var(--accent),0.45)]",
                  ].join(" ")}
                />
              ) : null}

              <style jsx>{`
                .ac-rocket-ping {
                  animation: rocketPing 700ms ease-out both;
                }
                @keyframes rocketPing {
                  0% {
                    transform: translateY(0) scale(1);
                    filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
                  }
                  45% {
                    transform: translateY(-1px) scale(1.02);
                    filter: drop-shadow(0 0 14px rgba(var(--accent), 0.22));
                  }
                  100% {
                    transform: translateY(0) scale(1);
                    filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
                  }
                }
                @media (prefers-reduced-motion: reduce) {
                  .ac-rocket-ping {
                    animation: none !important;
                  }
                }
              `}</style>
            </button>

            <Link
              href="/"
              className="group inline-flex min-w-0 items-center text-base sm:text-lg font-semibold tracking-tight text-text"
              aria-label="AtomicCurious Home"
            >
              <span className="relative truncate">
                <span className="ac-logo-dual">
                  <span className="ac-atomic" data-text="Atomic">
                    Atomic
                  </span>
                  <span className="ac-curious" data-text="Curious">
                    Curious
                  </span>
                </span>
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-accent/80 transition-all duration-300 group-hover:w-full" />
              </span>

              <style jsx>{`
                @keyframes acLuxurySweep {
                  0% {
                    background-position: -220% 50%;
                    opacity: 0;
                  }
                  8% {
                    opacity: 0.95;
                  }
                  70% {
                    opacity: 0.95;
                  }
                  100% {
                    background-position: 220% 50%;
                    opacity: 0;
                  }
                }

                @keyframes acCornerGlow {
                  0%,
                  78%,
                  100% {
                    opacity: 0;
                    transform: scale(0.7);
                  }
                  86% {
                    opacity: 0.95;
                    transform: scale(1);
                  }
                  92% {
                    opacity: 0.55;
                    transform: scale(1.18);
                  }
                }

                .ac-logo-dual {
                  display: inline-flex;
                  font-weight: 600;
                  letter-spacing: -0.01em;
                  position: relative;
                }

                .ac-atomic,
                .ac-curious {
                  position: relative;
                  display: inline-block;
                  color: rgba(255, 255, 255, 0.92);
                  -webkit-text-fill-color: rgba(255, 255, 255, 0.92);
                  text-shadow:
                    0 0 10px rgba(255, 255, 255, 0.05),
                    0 0 18px rgba(255, 255, 255, 0.03);
                }

                .ac-atomic::after,
                .ac-curious::after {
                  content: attr(data-text);
                  position: absolute;
                  inset: 0;
                  color: transparent;
                  -webkit-text-fill-color: transparent;
                  background-image: linear-gradient(
                    115deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0) 34%,
                    rgba(214, 176, 92, 0) 42%,
                    rgba(244, 226, 170, 0.9) 49%,
                    rgba(255, 250, 235, 0.98) 50%,
                    rgba(212, 170, 86, 0.82) 52%,
                    rgba(255, 255, 255, 0) 60%,
                    rgba(255, 255, 255, 0) 100%
                  );
                  background-size: 240% 100%;
                  background-repeat: no-repeat;
                  background-clip: text;
                  -webkit-background-clip: text;
                  animation: acLuxurySweep 6.8s ease-in-out infinite;
                  pointer-events: none;
                  filter: drop-shadow(0 0 10px rgba(232, 198, 116, 0.16));
                }

                .ac-curious::after {
                  animation-delay: 0.5s;
                }

                .ac-curious::before {
                  content: "";
                  position: absolute;
                  top: 2px;
                  right: -4px;
                  width: 6px;
                  height: 6px;
                  border-radius: 999px;
                  background: radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.95) 0%,
                    rgba(244, 226, 170, 0.88) 45%,
                    rgba(255, 255, 255, 0) 75%
                  );
                  box-shadow:
                    0 0 10px rgba(255, 245, 220, 0.55),
                    0 0 18px rgba(212, 170, 86, 0.28);
                  animation: acCornerGlow 6.8s ease-in-out infinite;
                  pointer-events: none;
                }

                @media (prefers-reduced-motion: reduce) {
                  .ac-atomic::after,
                  .ac-curious::after,
                  .ac-curious::before {
                    animation: none !important;
                    opacity: 0 !important;
                  }
                }
              `}</style>
            </Link>
          </div>

          {/* CENTER */}
          <nav className="hidden sm:flex items-center justify-center text-sm" aria-label="Primary">
            <div
              className="flex items-center gap-2 will-change-transform"
              style={{ transform: `translateX(${NAV_NUDGE_X}px)` }}
            >
              {links.map((l) => {
                const active = isActive(pathname, l.href)
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={[
                      "relative rounded-full px-3 py-1.5 transition",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                      active ? "text-text" : "text-muted hover:text-text",
                    ].join(" ")}
                  >
                    {l.label}
                    {active ? (
                      <span className="pointer-events-none absolute inset-x-3 -bottom-[6px] h-[2px] rounded-full bg-accent/70" />
                    ) : null}
                  </Link>
                )
              })}

              <span className="mx-2 hidden h-5 w-px bg-border/70 sm:block" />

              {showToggles ? (
                <>
                  <ThemeToggle />
                  <CharacterToggle />
                </>
              ) : null}
            </div>
          </nav>

          {/* RIGHT (desktop) */}
          <div className="hidden sm:flex items-center justify-end gap-2">
            <div
              className="flex items-center will-change-transform"
              style={{ transform: `translateX(${LANG_SWITCH_NUDGE_X}px)` }}
            >
              <Link
                href={esHref}
                className="
                  inline-flex items-center rounded-full
                  border border-border/80 bg-surface-1
                  px-3 py-1.5 text-xs font-semibold text-text
                  shadow-soft transition
                  hover:border-accent/35 hover:bg-surface-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                "
              >
                ES
              </Link>
            </div>

            <div
              className="flex items-center gap-2 will-change-transform"
              style={{ transform: `translateX(${EDITOR_NOTE_NUDGE_X}px)` }}
            >
              <span className="select-none rounded-full px-3 py-1.5 text-[rgba(255,255,255,0.72)]">
                Editor&apos;s note
              </span>

              <button
                ref={noteRefDesktop}
                type="button"
                onClick={() => {
                  setNoteOpen((v) => !v)
                  setNoteHasNew(false)
                }}
                className={["group relative inline-flex items-center", notePing ? "ac-note-ping" : ""].join(" ")}
                aria-label="Open Editor's note"
              >
                <NotebookMark />

                {noteHasNew ? (
                  <span
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute",
                      "-top-1.5 -left-1.5",
                      "h-2.5 w-2.5 rounded-full",
                      "bg-[#E8C674]",
                      "shadow-[0_0_0_2px_rgba(var(--bg),0.85),0_0_14px_rgba(232,198,116,0.38)]",
                    ].join(" ")}
                  />
                ) : null}

                <style jsx>{`
                  .ac-note-ping {
                    animation: notePing 700ms ease-out both;
                  }
                  @keyframes notePing {
                    0% {
                      transform: translateY(0) scale(1);
                      filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
                    }
                    45% {
                      transform: translateY(-1px) scale(1.02);
                      filter: drop-shadow(0 0 14px rgba(232, 198, 116, 0.18));
                    }
                    100% {
                      transform: translateY(0) scale(1);
                      filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
                    }
                  }

                  button:focus-visible {
                    outline: none;
                  }
                  button:focus-visible :global(svg) {
                    filter: drop-shadow(0 0 18px rgba(255, 245, 220, 0.14))
                      drop-shadow(0 0 22px rgba(232, 198, 116, 0.12));
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .ac-note-ping {
                      animation: none !important;
                    }
                  }
                `}</style>
              </button>
            </div>
          </div>

          {/* RIGHT (mobile) */}
          <div className="flex items-center justify-end gap-2 sm:hidden">
            <Link
              href={esHref}
              className="
                inline-flex h-11 min-w-[52px] items-center justify-center rounded-full
                border border-border/80 bg-surface-1
                px-4 text-sm font-semibold text-text
                shadow-soft transition
                hover:border-accent/35 hover:bg-surface-2
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              ES
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="
                inline-flex h-11 items-center justify-center rounded-full
                border border-border/80 bg-surface-1
                px-4 text-sm font-semibold text-text
                shadow-soft transition
                hover:border-accent/35 hover:bg-surface-2
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              Menu <span className="ml-2 text-muted">≡</span>
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {menuOpen ? (
          <div className="fixed inset-0 z-[80] sm:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="
                absolute right-0 top-0 h-full w-[88%] max-w-[360px]
                border-l border-border/70 bg-bg
                shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_rgba(0,0,0,0.75)]
              "
            >
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                <div className="text-sm font-semibold tracking-tight text-text">Navigation</div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="
                    inline-flex items-center justify-center rounded-full
                    border border-border/80 bg-surface-1
                    px-3 py-1.5 text-xs font-semibold text-text
                    shadow-soft transition hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                  aria-label="Close"
                >
                  Close <span className="ml-2 text-muted">✕</span>
                </button>
              </div>

              <div className="relative px-5 py-5">
                <div className="pointer-events-none absolute -top-24 right-[-120px] h-64 w-64 rounded-full bg-[rgba(var(--accent),0.12)] blur-[90px]" />
                <div className="pointer-events-none absolute bottom-[-140px] right-[-120px] h-72 w-72 rounded-full bg-[rgba(var(--accent-alt),0.10)] blur-[110px]" />

                <div className="space-y-2">
                  {links.map((l) => {
                    const active = isActive(pathname, l.href)
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={[
                          "group flex items-center justify-between rounded-2xl border px-4 py-3",
                          "bg-surface-1/55 backdrop-blur-xl shadow-soft transition",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                          active
                            ? "border-accent/35 text-text"
                            : "border-border/70 text-muted hover:text-text hover:border-accent/25 hover:bg-surface-2",
                        ].join(" ")}
                      >
                        <span className="text-sm font-semibold">{l.label}</span>
                        <span className="text-muted transition-transform group-hover:translate-x-0.5">
                          ›
                        </span>
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-5 h-px w-full bg-border/70" />

                <div className="mt-5">
                  <div className="text-[11px] font-semibold tracking-[0.18em] text-muted">
                    SETTINGS
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {showToggles ? (
                      <>
                        <ThemeToggle />
                        <CharacterToggle />
                      </>
                    ) : null}

                    <SupportButtonEn mobile />

                    <button
                      ref={noteRefMobile}
                      type="button"
                      onClick={() => {
                        setNoteOpen(true)
                        setNoteHasNew(false)
                        setMenuOpen(false)
                      }}
                      className="
                        inline-flex items-center rounded-full
                        border border-border/80 bg-surface-1
                        px-3 py-1.5 text-xs font-semibold text-text
                        shadow-soft transition
                        hover:border-accent/35 hover:bg-surface-2
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                      "
                    >
                      Editor&apos;s note
                    </button>

                    <span className="inline-flex items-center rounded-full border border-accent/25 bg-surface-1 px-3 py-1.5 text-xs font-semibold text-text">
                      EN
                    </span>

                    <Link
                      href={esHref}
                      className="
                        inline-flex items-center rounded-full
                        border border-border/80 bg-surface-1
                        px-3 py-1.5 text-xs font-semibold text-text
                        shadow-soft transition
                        hover:border-accent/35 hover:bg-surface-2
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                      "
                    >
                      ES <span className="ml-2 text-muted">›</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-bg" />
            </div>
          </div>
        ) : null}

        <CoreFactBubble
          open={isHome && coreOpen}
          onClose={() => setCoreOpen(false)}
          anchorEl={rocketRef.current}
          facts={coreFacts}
          title="Core"
          nextLabel="Another fact"
          closeLabel="Close"
          ariaLabel="Core curiosity"
        />

        <AtomNoteBubble
          open={noteOpen}
          onClose={() => setNoteOpen(false)}
          anchorEl={noteAnchor}
          notes={editorNotes}
          title="Atom"
          nextLabel="Another note"
          closeLabel="Close"
          ariaLabel="Editor's note"
        />
      </header>
    )
  }

  return (
    <header className="relative border-b border-border/70 bg-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center px-4 py-4 sm:px-6">
        {/* LEFT */}
        <div
          className="inline-flex min-w-0 items-center gap-2 sm:gap-3"
          style={{ transform: isMobile ? "none" : `translateX(${SECTION_BRAND_NUDGE_X}px)` }}
        >
          <Link href="/" className="group inline-flex items-center justify-center" aria-label="Go to Home">
            <CharacterSigilMark className="h-9 w-9 sm:h-10 sm:w-10" />
          </Link>

          <Link
            href="/"
            className="group inline-flex min-w-0 items-center text-base sm:text-lg font-semibold tracking-tight text-text"
            aria-label="AtomicCurious Home"
          >
            <span className="relative truncate">
              <span className="ac-logo-dual">
                <span className="ac-atomic">Atomic</span>
                <span className="ac-curious">Curious</span>
              </span>
              <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-accent/60 transition-all duration-300 group-hover:w-full" />
            </span>

            <style jsx>{`
              .ac-logo-dual {
                display: inline-flex;
                font-weight: 600;
                letter-spacing: -0.01em;
                position: relative;
              }
              .ac-atomic {
                position: relative;
                display: inline-block;
                color: rgb(var(--accent));
                -webkit-text-fill-color: rgb(var(--accent));
                text-shadow: 0 0 18px rgba(255, 255, 255, 0.03);
              }
              .ac-curious {
                position: relative;
                display: inline-block;
                color: rgb(var(--accent-alt));
                -webkit-text-fill-color: rgb(var(--accent-alt));
                text-shadow: 0 0 18px rgba(255, 255, 255, 0.03);
              }
            `}</style>
          </Link>

          <div className="hidden sm:flex items-center">
            <HeaderDivider nudgeX={SECTION_LEFT_DIVIDER_NUDGE_X} />
          </div>
        </div>

        {/* CENTER */}
        <nav className="hidden sm:flex items-center justify-center text-sm min-w-0" aria-label="Primary">
          <div
            className="flex items-center gap-2 min-w-0 will-change-transform"
            style={{ transform: `translateX(${SECTION_NAV_NUDGE_X}px)` }}
          >
            {links.map((l) => {
              const active = isActive(pathname, l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={[
                    "relative rounded-full px-3 py-1.5 transition whitespace-nowrap",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                    active ? "text-text" : "text-muted hover:text-text",
                  ].join(" ")}
                >
                  {l.label}
                  {active ? (
                    <span className="pointer-events-none absolute inset-x-3 -bottom-[6px] h-[2px] rounded-full bg-accent/70" />
                  ) : null}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* RIGHT (desktop) */}
        <div className="hidden sm:flex items-center justify-end gap-2 min-w-[260px]">
          <div
            className="flex items-center gap-2 will-change-transform"
            style={{ transform: `translateX(${SECTION_TOGGLES_NUDGE_X}px)` }}
          >
            <ThemeToggle />
            <CharacterToggle />
          </div>

          <div
            className="flex items-center will-change-transform"
            style={{ transform: `translateX(${SECTION_LANG_NUDGE_X}px)` }}
          >
            <Link
              href={esHref}
              className="
                inline-flex items-center rounded-full
                border border-border/80 bg-surface-1
                px-3 py-1.5 text-xs font-semibold text-text
                shadow-soft transition
                hover:border-accent/35 hover:bg-surface-2
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              ES
            </Link>

            <HeaderDivider nudgeX={SECTION_RIGHT_DIVIDER_NUDGE_X} />
          </div>

          <div
            className="flex items-center will-change-transform"
            style={{ transform: `translateX(${SECTION_EDITOR_NOTE_NUDGE_X}px)` }}
          >
            <div className="flex items-center">
              <SupportButtonEn />
            </div>
          </div>
        </div>

        {/* RIGHT (mobile) */}
        <div className="flex items-center justify-end gap-2 sm:hidden">
          <Link
            href={esHref}
            className="
              inline-flex h-11 min-w-[52px] items-center justify-center rounded-full
              border border-border/80 bg-surface-1
              px-4 text-sm font-semibold text-text
              shadow-soft transition
              hover:border-accent/35 hover:bg-surface-2
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            ES
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="
              inline-flex h-11 items-center justify-center rounded-full
              border border-border/80 bg-surface-1
              px-4 text-sm font-semibold text-text
              shadow-soft transition
              hover:border-accent/35 hover:bg-surface-2
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
          >
            Menu <span className="ml-2 text-muted">≡</span>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {menuOpen ? (
        <div className="fixed inset-0 z-[80] sm:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="
              absolute right-0 top-0 h-full w-[88%] max-w-[360px]
              border-l border-border/70 bg-bg
              shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_rgba(0,0,0,0.75)]
            "
          >
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
              <div className="text-sm font-semibold tracking-tight text-text">Navigation</div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="
                  inline-flex items-center justify-center rounded-full
                  border border-border/80 bg-surface-1
                  px-3 py-1.5 text-xs font-semibold text-text
                  shadow-soft transition hover:bg-surface-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                "
                aria-label="Close"
              >
                Close <span className="ml-2 text-muted">✕</span>
              </button>
            </div>

            <div className="relative px-5 py-5">
              <div className="pointer-events-none absolute -top-24 right-[-120px] h-64 w-64 rounded-full bg-[rgba(var(--accent),0.12)] blur-[90px]" />
              <div className="pointer-events-none absolute bottom-[-140px] right-[-120px] h-72 w-72 rounded-full bg-[rgba(var(--accent-alt),0.10)] blur-[110px]" />

              <div className="space-y-2">
                {links.map((l) => {
                  const active = isActive(pathname, l.href)
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={[
                        "group flex items-center justify-between rounded-2xl border px-4 py-3",
                        "bg-surface-1/55 backdrop-blur-xl shadow-soft transition",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                        active
                          ? "border-accent/35 text-text"
                          : "border-border/70 text-muted hover:text-text hover:border-accent/25 hover:bg-surface-2",
                      ].join(" ")}
                    >
                      <span className="text-sm font-semibold">{l.label}</span>
                      <span className="text-muted transition-transform group-hover:translate-x-0.5">
                        ›
                      </span>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-5 h-px w-full bg-border/70" />

              <div className="mt-5">
                <div className="text-[11px] font-semibold tracking-[0.18em] text-muted">
                  SETTINGS
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <ThemeToggle />
                  <CharacterToggle />
                  <SupportButtonEn mobile />

                  <button
                    ref={noteRefMobile}
                    type="button"
                    onClick={() => {
                      setNoteOpen(true)
                      setNoteHasNew(false)
                      setMenuOpen(false)
                    }}
                    className="
                      inline-flex items-center rounded-full
                      border border-border/80 bg-surface-1
                      px-3 py-1.5 text-xs font-semibold text-text
                      shadow-soft transition
                      hover:border-accent/35 hover:bg-surface-2
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                    "
                  >
                    Editor&apos;s note
                  </button>

                  <span className="inline-flex items-center rounded-full border border-accent/25 bg-surface-1 px-3 py-1.5 text-xs font-semibold text-text">
                    EN
                  </span>

                  <Link
                    href={esHref}
                    className="
                      inline-flex items-center rounded-full
                      border border-border/80 bg-surface-1
                      px-3 py-1.5 text-xs font-semibold text-text
                      shadow-soft transition
                      hover:border-accent/35 hover:bg-surface-2
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                    "
                  >
                    ES <span className="ml-2 text-muted">›</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-bg" />
          </div>
        </div>
      ) : null}

      <CoreFactBubble
        open={false}
        onClose={() => setCoreOpen(false)}
        anchorEl={rocketRef.current}
        facts={coreFacts}
        title="Core"
        nextLabel="Another fact"
        closeLabel="Close"
        ariaLabel="Core curiosity"
      />

      <AtomNoteBubble
        open={noteOpen}
        onClose={() => setNoteOpen(false)}
        anchorEl={noteAnchor}
        notes={editorNotes}
        title="Atom"
        nextLabel="Another note"
        closeLabel="Close"
        ariaLabel="Editor's note"
      />
    </header>
  )
}