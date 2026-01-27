// src/components/NavBarEs.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import CoreFactBubble from "@/components/visual/CoreFactBubble"
import AtomNoteBubble from "@/components/visual/AtomNoteBubble"
import ThemeToggle from "@/components/ThemeToggle"
import CharacterToggle from "@/components/CharacterToggle"
import CharacterSigilMark from "@/components/CharacterSigilMark"
import QuillFeatherIcon from "@/components/QuillFeatherIcon" // ✅ quill icon (same as EN)

/* =========================================================
   HOME HEADER POSITION CONTROLS (UNCHANGED BEHAVIOR)
   Negative = move left, Positive = move right
========================================================= */
const BRAND_NUDGE_X = -121 // Cohete/Sigil + AtomicCurious
const NAV_NUDGE_X = 0 // Secciones + divisor + toggles

// ✅ Controles separados (como EN)
const LANG_SWITCH_NUDGE_X = -18 // EN button
const EDITOR_NOTE_NUDGE_X = 130 // Nota del editor + libreta (juntos)

/* Optional: whole header nudge */
const HEADER_NUDGE_X = 0 // px

/* =========================================================
   ✅ SECTIONS HEADER POSITION CONTROLS (same layout as EN)
   These apply ONLY when NOT home.
   Negative = move left, Positive = move right
========================================================= */
const SECTION_BRAND_NUDGE_X = -180 // Sigil + AtomicCurious juntos
const SECTION_NAV_NUDGE_X = -100 // Todos los links de secciones juntos
const SECTION_LANG_NUDGE_X = 20 // EN only
const SECTION_EDITOR_NOTE_NUDGE_X = 120 // Slogan + pluma juntos

function isActive(pathname: string, href: string) {
  if (href === "/es") return pathname === "/es" || pathname === "/es/"
  return pathname === href || pathname.startsWith(href + "/")
}

function toEn(pathname: string) {
  const map: Record<string, string> = {
    "/es/recursos": "/resources",
    "/es/comunidad": "/community",
    "/es/contacto": "/contact",
    "/es/newsletter": "/newsletter",
    "/es/start-here": "/start-here",
    "/es/about": "/about",
    "/es/posts": "/posts",
    "/es": "/",
    "/es/": "/",
  }

  const postSlugMap: Record<string, string> = {
    "por-que-sonamos": "why-we-dream",
  }

  if (map[pathname]) return map[pathname]

  if (pathname.startsWith("/es/posts/")) {
    const slug = pathname.replace("/es/posts/", "")
    const enSlug = postSlugMap[slug] ?? slug
    return `/posts/${enSlug}`
  }

  if (pathname.startsWith("/es/")) return pathname.replace(/^\/es\//, "/")
  return "/"
}

/* -----------------------------
   Core beacon persistence
----------------------------- */
const CORE_SEEN_KEY = "ac_core_seen_v1"
const CORE_SEEN_TTL_MS = 1000 * 60 * 60 * 12 // 12h

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

/* -----------------------------
   StarshipMark (HOME ONLY)
----------------------------- */
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
        filter: "drop-shadow(0 0 12px rgba(160,200,255,0.25)) drop-shadow(0 0 26px rgba(110,140,200,0.16))",
      }}
    >
      <svg viewBox="0 0 210 100" className="h-full w-full block">
        <defs>
          <linearGradient id="shipSkinMini" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(6)">
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
          <path d="M40 62 C 10 70, -40 72, -120 66" fill="none" stroke="rgba(104,240,255,.36)" strokeWidth="5" strokeLinecap="round" />
          <path d="M42 50 C 0 55, -50 58, -130 52" fill="none" stroke="url(#trailA)" strokeWidth="4" strokeLinecap="round" />
          <path d="M44 56 C 6 62, -46 64, -126 58" fill="none" stroke="url(#trailB)" strokeWidth="2" strokeLinecap="round" />
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
          <path d="M108 42 Q126 38 140 40 Q136 50 120 52 Q108 50 108 42 Z" fill="rgba(120,200,255,.18)" stroke="rgba(170,150,255,.32)" strokeWidth="1" />
          <path d="M140 30 Q170 34 190 50" fill="none" stroke="url(#edgeGlowMini)" strokeWidth="2.4" strokeLinecap="round" opacity=".95" />
          <path d="M140 70 Q170 66 190 50" fill="none" stroke="url(#edgeGlowMini)" strokeWidth="2.4" strokeLinecap="round" opacity=".95" />
        </g>

        <g opacity=".98">
          <path d="M70 34 L52 26 Q46 30 46 36 L64 42 Z" fill="var(--ship-panel, #202634)" stroke="var(--ship-edge, #d6ecff)" strokeWidth="1" />
          <path d="M70 66 L52 74 Q46 70 46 64 L64 58 Z" fill="var(--ship-panel, #202634)" stroke="var(--ship-edge, #d6ecff)" strokeWidth="1" />
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

/* =========================================================
   ✅ NotebookMark — same as EN (premium pinned note)
========================================================= */
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
        filter: "drop-shadow(0 0 16px rgba(104,240,255,0.28)) drop-shadow(0 0 34px rgba(182,146,255,0.22))",
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

        <path d="M32 26 H100 Q112 26 112 38" fill="none" stroke="url(#noteEdgeGlow)" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />

        <path d="M112 52 L94 52 Q88 52 88 46 V26" fill="none" stroke="url(#noteEdgeGlow)" strokeWidth="2.2" strokeLinecap="round" opacity="0.92" />
        <path d="M112 52 L88 52 L112 26 Z" fill="url(#noteFold)" opacity="0.52" />

        <path d="M42 62 H92 M42 76 H92 M42 90 H84" stroke="rgba(255,255,255,0.16)" strokeWidth="2" strokeLinecap="round" />

        <path d="M70 34 L74 58" stroke="rgba(0,0,0,0.35)" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
        <path d="M69 34 L73 58" stroke="rgba(214,236,255,0.40)" strokeWidth="2" strokeLinecap="round" opacity="0.65" />

        <g style={{ transformOrigin: "70px 32px" }}>
          <circle cx="70" cy="32" r="10.5" fill="url(#pinHead)" />
          <circle cx="70" cy="32" r="10.5" fill="none" stroke="url(#pinRim)" strokeWidth="1.6" opacity="0.85" />
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

/* =========================================================
   ✅ “Curiosidad, por diseño.” (quill underline, theme-driven)
   - No <defs> IDs (avoids collisions)
   - Hover on .ac-editor-signature draws the line
========================================================= */
function CuriosityByDesignLabel({ compact = false }: { compact?: boolean }) {
  return (
    <span className={["relative select-none text-muted", compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5"].join(" ")}>
      Curiosidad, por diseño.
      <span
        aria-hidden="true"
        className={["pointer-events-none absolute", compact ? "left-2 right-[-1px] -bottom-[1px] h-[9px]" : "left-3 right-[-2px] -bottom-[1px] h-[10px]"].join(" ")}
      >
        <svg viewBox="0 0 320 40" className="h-full w-full overflow-visible">
          <path
            d="M8 27 C 44 33, 78 18, 114 24 C 150 30, 186 28, 214 22 C 244 16, 270 14, 304 16"
            fill="none"
            stroke="rgba(var(--accent),0.55)"
            strokeWidth={compact ? 3.8 : 4.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            className="ac-ink"
          />
          <path
            d="M8 27 C 44 33, 78 18, 114 24 C 150 30, 186 28, 214 22 C 244 16, 270 14, 304 16"
            fill="none"
            stroke="rgba(var(--accent-alt),0.55)"
            strokeWidth={compact ? 3.8 : 4.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            className="ac-ink"
          />
          <path
            d="M10 25 C 50 30, 82 16, 114 22 C 152 28, 188 26, 214 20 C 246 14, 272 13, 306 15"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={compact ? 1.1 : 1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pathLength="1"
            className="ac-ink"
          />
        </svg>
      </span>

      <style jsx>{`
        .ac-ink {
          stroke-dasharray: 1;
          stroke-dashoffset: 0;
          opacity: 0.95;
        }

        @media (prefers-reduced-motion: no-preference) {
          :global(.ac-editor-signature:hover) .ac-ink {
            animation: acDraw 520ms ease-out both;
          }
        }

        @keyframes acDraw {
          from {
            stroke-dashoffset: 1;
            opacity: 0.35;
            filter: blur(0.25px);
          }
          to {
            stroke-dashoffset: 0;
            opacity: 0.95;
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-ink {
            animation: none !important;
          }
        }
      `}</style>
    </span>
  )
}

export default function NavBarEs() {
  const pathname = usePathname()
  const enHref = useMemo(() => toEn(pathname), [pathname])

  const isHome = pathname === "/es" || pathname === "/es/"
  const showToggles = !isHome

  // ✅ Breakpoint detection (matches Tailwind "sm" = 640px)
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

  // ✅ Refs separados (desktop vs mobile) para la nota
  const noteRefDesktop = useRef<HTMLButtonElement | null>(null)
  const noteRefMobile = useRef<HTMLButtonElement | null>(null)
  const [noteOpen, setNoteOpen] = useState(false)

  // Core beacon
  const [coreHasNew, setCoreHasNew] = useState(false)
  const [rocketPing, setRocketPing] = useState(false)

  // Notes beacon
  const [noteHasNew, setNoteHasNew] = useState(true)
  const [notePing, setNotePing] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false)
    }
    if (menuOpen) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  // Initialize Core beacon based on last seen time
  useEffect(() => {
    if (!isHome) return
    const seen = readSeen()
    setCoreHasNew(!isSeenFresh(seen))
  }, [isHome])

  // Core micro ping
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

  // When Core opens, mark as seen and turn off beacon
  useEffect(() => {
    if (!isHome) return
    if (!coreOpen) return
    writeSeen(safeNow())
    setCoreHasNew(false)
  }, [isHome, coreOpen])

  // Notes micro ping
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
      "Los pulpos tienen la mayoría de sus neuronas en los brazos, lo que les da movimientos semi-autónomos.",
      "Tu cerebro predice constantemente lo que pasará; ver es, en parte, adivinar.",
      "Los átomos son casi todo espacio vacío; si la materia se comprimiera a densidades de núcleo, la humanidad cabría en algo del tamaño de un terrón de azúcar.",
      "Una fracción diminuta del polvo contiene granos presolares más antiguos que el sistema solar.",
      "Venus tarda más en girar sobre sí mismo que en dar la vuelta al Sol.",
      "El cuerpo humano emite un brillo extremadamente débil por reacciones químicas en las células.",
      "Las plantas pueden avisarse del peligro liberando sustancias químicas al aire.",
      "La Antártida es el desierto más grande del planeta porque casi no recibe lluvia.",
      "Los tiburones existían antes que los árboles.",
      "Un rayo calienta el aire a temperaturas mayores que la superficie del Sol.",
      "Existen más partidas posibles de ajedrez que átomos en el universo observable.",
      "Por su peso, los huesos humanos tienen una resistencia comparable o superior a la del acero.",
      "La música activa en el cerebro los mismos sistemas de recompensa que la comida.",
      "En la antigua Roma se usaba orina para limpiar ropa por su contenido de amoníaco.",
      "Las mariposas conservan recuerdos de cuando eran orugas.",
      "Algunos metales pueden recuperar su forma original cuando se calientan.",
      "La Torre Eiffel crece varios centímetros en verano por la expansión del metal.",
      "El corazón de una ballena azul es tan grande que una persona cabría en algunas de sus arterias.",
      "Humanos y plátanos comparten genes básicos porque toda la vida usa las mismas herramientas celulares.",
      "La Luna se aleja lentamente de la Tierra unos centímetros cada año.",
      "Las pinturas rupestres son mucho más antiguas que la escritura.",
      "El vidrio es un sólido amorfo; muchas ventanas antiguas son más gruesas abajo por cómo se fabricaban, no porque el vidrio fluya.",
      "Las arañas no se pegan a su telaraña gracias a la estructura de la seda y a microvellos en sus patas.",
      "Una cucharada de miel es aproximadamente el trabajo de toda la vida de unas 12 abejas.",
      "Algunas nubes grandes pueden pesar cerca de un millón de toneladas.",
      "El sonido viaja más rápido en el agua que en el aire.",
      "Algunas aves pueden ver luz ultravioleta invisible para los humanos.",
      "La Gran Muralla China no es visible desde la órbita terrestre a simple vista.",
      "El universo se expande y las galaxias se alejan porque el espacio se estira.",
      "Las estatuas griegas antiguas solían estar pintadas con colores brillantes.",
      "Una estrella de neutrones es tan densa que un cubo de azúcar pesaría entre cientos de millones y mil millones de toneladas.",
      "Tus huellas dactilares se forman antes de nacer y no cambian en toda tu vida.",
      "Cometer errores ayuda al cerebro a aprender más rápido que acertar siempre.",
    ],
    []
  )

  const editorNotes = useMemo(() => ["Nuevos posts cada semana.", "Los lanzamientos más recientes están en Recursos."], [])

  const links = [
    { label: "Empieza aquí", href: "/es/start-here" },
    { label: "Posts", href: "/es/posts" },
    { label: "Boletín", href: "/es/newsletter" },
    { label: "Recursos", href: "/es/recursos" },
    { label: "Comunidad", href: "/es/comunidad" },
    { label: "Acerca", href: "/es/about" },
    { label: "Contacto", href: "/es/contacto" },
  ]

  const noteAnchor = isMobile ? noteRefMobile.current : noteRefDesktop.current

  /* =========================================================
     ✅ HOME HEADER (ES) — matches EN home behavior
  ========================================================= */
  if (isHome) {
    return (
      <header className="relative border-b border-border/70 bg-bg">
        <div
          className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center px-4 py-4 sm:px-6 will-change-transform"
          style={{ transform: `translateX(${HEADER_NUDGE_X}px)` }}
        >
          {/* LEFT */}
          <div className="inline-flex min-w-0 items-center gap-3 will-change-transform" style={{ transform: `translateX(${BRAND_NUDGE_X}px)` }}>
            <button
              ref={rocketRef}
              type="button"
              onClick={() => setCoreOpen((v) => !v)}
              className={["group inline-flex items-center relative", rocketPing ? "ac-rocket-ping" : ""].join(" ")}
              aria-label="Abrir una curiosidad de Core"
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

            <Link href="/es" className="group inline-flex min-w-0 items-center text-lg font-semibold tracking-tight text-text" aria-label="Inicio AtomicCurious">
              <span className="relative truncate">
                <span className="ac-logo-dual">
                  <span className="ac-atomic">Atomic</span>
                  <span className="ac-curious">Curious</span>
                </span>
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-accent/80 transition-all duration-300 group-hover:w-full" />
              </span>

              <style jsx>{`
                @keyframes acSheen {
                  0% {
                    background-position: 0% 50%;
                    opacity: 0;
                  }
                  10% {
                    opacity: 1;
                  }
                  90% {
                    opacity: 1;
                  }
                  100% {
                    background-position: 200% 50%;
                    opacity: 0;
                  }
                }
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
                }
                .ac-curious {
                  position: relative;
                  display: inline-block;
                  color: rgb(var(--accent-alt));
                  -webkit-text-fill-color: rgb(var(--accent-alt));
                }
                .ac-atomic::after {
                  content: "Atomic";
                  position: absolute;
                  inset: 0;
                  color: transparent;
                  -webkit-text-fill-color: transparent;
                  background-image: linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0) 34%,
                    rgba(var(--accent), 0.18) 46%,
                    rgba(255, 255, 255, 0.14) 50%,
                    rgba(var(--accent), 0.18) 54%,
                    rgba(255, 255, 255, 0) 66%,
                    rgba(255, 255, 255, 0) 100%
                  );
                  background-size: 300% 100%;
                  background-repeat: no-repeat;
                  background-clip: text;
                  -webkit-background-clip: text;
                  animation: acSheen 7.4s ease-in-out infinite;
                  filter: drop-shadow(0 0 10px rgba(var(--accent), 0.06));
                  pointer-events: none;
                }
                .ac-curious::after {
                  content: "Curious";
                  position: absolute;
                  inset: 0;
                  color: transparent;
                  -webkit-text-fill-color: transparent;
                  background-image: linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0) 34%,
                    rgba(var(--accent-alt), 0.18) 46%,
                    rgba(255, 255, 255, 0.14) 50%,
                    rgba(var(--accent-alt), 0.18) 54%,
                    rgba(255, 255, 255, 0) 66%,
                    rgba(255, 255, 255, 0) 100%
                  );
                  background-size: 300% 100%;
                  background-repeat: no-repeat;
                  background-clip: text;
                  -webkit-background-clip: text;
                  animation: acSheen 7.4s ease-in-out infinite;
                  animation-delay: 0.65s;
                  filter: drop-shadow(0 0 10px rgba(var(--accent-alt), 0.06));
                  pointer-events: none;
                }
                @media (prefers-reduced-motion: reduce) {
                  .ac-atomic::after,
                  .ac-curious::after {
                    animation: none !important;
                    opacity: 0 !important;
                  }
                }
              `}</style>
            </Link>
          </div>

          {/* CENTER */}
          <nav className="hidden sm:flex items-center justify-center text-sm" aria-label="Primary">
            <div className="flex items-center gap-2 will-change-transform" style={{ transform: `translateX(${NAV_NUDGE_X}px)` }}>
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
                    {active ? <span className="pointer-events-none absolute inset-x-3 -bottom-[6px] h-[2px] rounded-full bg-accent/70" /> : null}
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
            <div className="flex items-center will-change-transform" style={{ transform: `translateX(${LANG_SWITCH_NUDGE_X}px)` }}>
              <Link
                href={enHref}
                className="
                  inline-flex items-center rounded-full
                  border border-border/80 bg-surface-1
                  px-3 py-1.5 text-xs font-semibold text-text
                  shadow-soft transition
                  hover:border-accent/35 hover:bg-surface-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                "
              >
                EN
              </Link>
            </div>

            <div className="flex items-center gap-2 will-change-transform" style={{ transform: `translateX(${EDITOR_NOTE_NUDGE_X}px)` }}>
              {/* ✅ MATCH EN: same accent as AtomicCurious, but lower intensity */}
              <span className="select-none rounded-full px-3 py-1.5 text-[rgb(var(--accent))]/60">Nota del editor</span>

              <button
                ref={noteRefDesktop}
                type="button"
                onClick={() => {
                  setNoteOpen((v) => !v)
                  setNoteHasNew(false)
                }}
                className={["group relative inline-flex items-center", notePing ? "ac-note-ping" : ""].join(" ")}
                aria-label="Abrir nota del editor"
              >
                <NotebookMark />

                {noteHasNew ? (
                  <span
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute",
                      "-top-1.5 -left-1.5",
                      "h-2.5 w-2.5 rounded-full",
                      "bg-accent-alt",
                      "shadow-[0_0_0_2px_rgba(var(--bg),0.85),0_0_14px_rgba(var(--accent-alt),0.45)]",
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
                      filter: drop-shadow(0 0 14px rgba(var(--accent-alt), 0.18));
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
                    filter: drop-shadow(0 0 18px rgba(var(--accent), 0.18)) drop-shadow(0 0 22px rgba(var(--accent-alt), 0.14));
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
            {showToggles ? (
              <>
                <ThemeToggle />
                <CharacterToggle />
              </>
            ) : null}

            <div className="flex items-center will-change-transform" style={{ transform: `translateX(${LANG_SWITCH_NUDGE_X}px)` }}>
              <Link
                href={enHref}
                className="
                  inline-flex items-center rounded-full
                  border border-border/80 bg-surface-1
                  px-3 py-1.5 text-xs font-semibold text-text
                  shadow-soft transition
                  hover:border-accent/35 hover:bg-surface-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                "
              >
                EN
              </Link>
            </div>

            <div className="flex items-center gap-2 will-change-transform" style={{ transform: `translateX(${EDITOR_NOTE_NUDGE_X}px)` }}>
              {/* ✅ MATCH EN mobile: same accent, slightly softer */}
              <span className="select-none rounded-full px-2 py-1 text-[11px] text-[rgb(var(--accent))]/60">Nota del editor</span>

              <button
                ref={noteRefMobile}
                type="button"
                onClick={() => {
                  setNoteOpen((v) => !v)
                  setNoteHasNew(false)
                }}
                className={["group relative inline-flex items-center", notePing ? "ac-note-ping" : ""].join(" ")}
                aria-label="Abrir nota del editor"
              >
                <NotebookMark />
                {noteHasNew ? (
                  <span
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute",
                      "-top-1.5 -left-1.5",
                      "h-2.5 w-2.5 rounded-full",
                      "bg-accent-alt",
                      "shadow-[0_0_0_2px_rgba(var(--bg),0.85),0_0_14px_rgba(var(--accent-alt),0.45)]",
                    ].join(" ")}
                  />
                ) : null}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="
                inline-flex items-center justify-center rounded-full
                border border-border/80 bg-surface-1
                px-3 py-1.5 text-xs font-semibold text-text
                shadow-soft transition
                hover:border-accent/35 hover:bg-surface-2
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
              aria-label="Abrir menú"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              Menú <span className="ml-2 text-muted">≡</span>
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {menuOpen ? (
          <div className="fixed inset-0 z-[80] sm:hidden">
            <button type="button" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
              className="
                absolute right-0 top-0 h-full w-[88%] max-w-[360px]
                border-l border-border/70 bg-bg
                shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_rgba(0,0,0,0.75)]
              "
            >
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                <div className="text-sm font-semibold tracking-tight text-text">Navegación</div>
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
                  aria-label="Cerrar"
                >
                  Cerrar <span className="ml-2 text-muted">✕</span>
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
                          active ? "border-accent/35 text-text" : "border-border/70 text-muted hover:text-text hover:border-accent/25 hover:bg-surface-2",
                        ].join(" ")}
                      >
                        <span className="text-sm font-semibold">{l.label}</span>
                        <span className="text-muted transition-transform group-hover:translate-x-0.5">›</span>
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-5 h-px w-full bg-border/70" />

                <div className="mt-5">
                  <div className="text-[11px] font-semibold tracking-[0.18em] text-muted">AJUSTES</div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {showToggles ? (
                      <>
                        <ThemeToggle />
                        <CharacterToggle />
                      </>
                    ) : null}

                    <span className="inline-flex items-center rounded-full border border-accent/25 bg-surface-1 px-3 py-1.5 text-xs font-semibold text-text">ES</span>

                    <Link
                      href={enHref}
                      className="
                        inline-flex items-center rounded-full
                        border border-border/80 bg-surface-1
                        px-3 py-1.5 text-xs font-semibold text-text
                        shadow-soft transition
                        hover:border-accent/35 hover:bg-surface-2
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                      "
                    >
                      EN <span className="ml-2 text-muted">›</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-bg" />
            </div>
          </div>
        ) : null}

        {/* CORE BUBBLE (cohete) */}
        <CoreFactBubble
          open={isHome && coreOpen}
          onClose={() => setCoreOpen(false)}
          anchorEl={rocketRef.current}
          facts={coreFacts}
          title="Core"
          nextLabel="Otro dato"
          closeLabel="Cerrar"
          ariaLabel="Curiosidad de Core"
        />

        {/* Nota del editor (libreta) */}
        <AtomNoteBubble
          open={noteOpen}
          onClose={() => setNoteOpen(false)}
          anchorEl={noteAnchor}
          notes={editorNotes}
          title="Atom"
          nextLabel="Otra nota"
          closeLabel="Cerrar"
          ariaLabel="Nota del editor"
        />
      </header>
    )
  }

  /* =========================================================
     ✅ SECTIONS HEADER — matches EN sections behavior
  ========================================================= */
  return (
    <header className="relative border-b border-border/70 bg-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center px-4 py-4 sm:px-6">
        {/* LEFT */}
        <div className="inline-flex min-w-0 items-center gap-3 will-change-transform" style={{ transform: `translateX(${SECTION_BRAND_NUDGE_X}px)` }}>
          <Link href="/es" className="group inline-flex items-center justify-center" aria-label="Ir al inicio">
            <CharacterSigilMark className="h-9 w-9 sm:h-10 sm:w-10" />
          </Link>

          <Link href="/es" className="group inline-flex min-w-0 items-center text-lg font-semibold tracking-tight text-text" aria-label="Inicio AtomicCurious">
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
        </div>

        {/* CENTER */}
        <nav className="hidden sm:flex items-center justify-center text-sm min-w-0" aria-label="Primary">
          <div className="flex items-center gap-2 min-w-0 will-change-transform" style={{ transform: `translateX(${SECTION_NAV_NUDGE_X}px)` }}>
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
                  {active ? <span className="pointer-events-none absolute inset-x-3 -bottom-[6px] h-[2px] rounded-full bg-accent/70" /> : null}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* RIGHT (desktop) */}
        <div className="hidden sm:flex items-center justify-end gap-2 min-w-[260px]">
          <ThemeToggle />
          <CharacterToggle />

          <div className="flex items-center will-change-transform" style={{ transform: `translateX(${SECTION_LANG_NUDGE_X}px)` }}>
            <Link
              href={enHref}
              className="
                inline-flex items-center rounded-full
                border border-border/80 bg-surface-1
                px-3 py-1.5 text-xs font-semibold text-text
                shadow-soft transition
                hover:border-accent/35 hover:bg-surface-2
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              EN
            </Link>
          </div>

          {/* ✅ slogan + quill (hover animates underline) */}
          <div className="ac-editor-signature flex items-center gap-2 will-change-transform" style={{ transform: `translateX(${SECTION_EDITOR_NOTE_NUDGE_X}px)` }}>
            <CuriosityByDesignLabel />

            {/* ✅ quill -> ES Home */}
            <Link
              href="/es"
              aria-label="Ir al inicio"
              className="
                group inline-flex items-center justify-center rounded-full
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              <span
                aria-hidden="true"
                className={[
                  "relative inline-flex items-center justify-center",
                  "h-8 w-8 sm:h-9 sm:w-9",
                  "opacity-90 group-hover:opacity-100 transition-opacity duration-300",
                ].join(" ")}
                style={{
                  transformOrigin: "55% 60%",
                  transform: "rotate(-14deg)",
                  filter: "drop-shadow(0 0 14px rgba(var(--accent),0.22)) drop-shadow(0 0 22px rgba(var(--accent-alt),0.14))",
                }}
              >
                <QuillFeatherIcon className="h-full w-full" />
              </span>
            </Link>
          </div>
        </div>

        {/* RIGHT (mobile) */}
        <div className="flex items-center justify-end gap-2 sm:hidden">
          <ThemeToggle />
          <CharacterToggle />

          <div className="flex items-center will-change-transform" style={{ transform: `translateX(${SECTION_LANG_NUDGE_X}px)` }}>
            <Link
              href={enHref}
              className="
                inline-flex items-center rounded-full
                border border-border/80 bg-surface-1
                px-3 py-1.5 text-xs font-semibold text-text
                shadow-soft transition
                hover:border-accent/35 hover:bg-surface-2
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              EN
            </Link>
          </div>

          <div className="ac-editor-signature flex items-center gap-2 will-change-transform" style={{ transform: `translateX(${SECTION_EDITOR_NOTE_NUDGE_X}px)` }}>
            <CuriosityByDesignLabel compact />

            <Link
              href="/es"
              aria-label="Ir al inicio"
              className="
                group inline-flex items-center justify-center rounded-full
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              <span
                aria-hidden="true"
                className={["relative inline-flex items-center justify-center", "h-8 w-8", "opacity-90 group-hover:opacity-100 transition-opacity duration-300"].join(" ")}
                style={{
                  transformOrigin: "55% 60%",
                  transform: "rotate(-14deg)",
                  filter: "drop-shadow(0 0 14px rgba(var(--accent),0.22)) drop-shadow(0 0 22px rgba(var(--accent-alt),0.14))",
                }}
              >
                <QuillFeatherIcon className="h-full w-full" />
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="
              inline-flex items-center justify-center rounded-full
              border border-border/80 bg-surface-1
              px-3 py-1.5 text-xs font-semibold text-text
              shadow-soft transition
              hover:border-accent/35 hover:bg-surface-2
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
            aria-label="Abrir menú"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
          >
            Menú <span className="ml-2 text-muted">≡</span>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER (reused) */}
      {menuOpen ? (
        <div className="fixed inset-0 z-[80] sm:hidden">
          <button type="button" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="
              absolute right-0 top-0 h-full w-[88%] max-w-[360px]
              border-l border-border/70 bg-bg
              shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_rgba(0,0,0,0.75)]
            "
          >
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
              <div className="text-sm font-semibold tracking-tight text-text">Navegación</div>
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
                aria-label="Cerrar"
              >
                Cerrar <span className="ml-2 text-muted">✕</span>
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
                        active ? "border-accent/35 text-text" : "border-border/70 text-muted hover:text-text hover:border-accent/25 hover:bg-surface-2",
                      ].join(" ")}
                    >
                      <span className="text-sm font-semibold">{l.label}</span>
                      <span className="text-muted transition-transform group-hover:translate-x-0.5">›</span>
                    </Link>
                  )
                })}
              </div>

              <div className="mt-5 h-px w-full bg-border/70" />

              <div className="mt-5">
                <div className="text-[11px] font-semibold tracking-[0.18em] text-muted">AJUSTES</div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <ThemeToggle />
                  <CharacterToggle />

                  <span className="inline-flex items-center rounded-full border border-accent/25 bg-surface-1 px-3 py-1.5 text-xs font-semibold text-text">ES</span>

                  <Link
                    href={enHref}
                    className="
                      inline-flex items-center rounded-full
                      border border-border/80 bg-surface-1
                      px-3 py-1.5 text-xs font-semibold text-text
                      shadow-soft transition
                      hover:border-accent/35 hover:bg-surface-2
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                    "
                  >
                    EN <span className="ml-2 text-muted">›</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-bg" />
          </div>
        </div>
      ) : null}

      {/* CORE BUBBLE (never opens on sections) */}
      <CoreFactBubble
        open={false}
        onClose={() => setCoreOpen(false)}
        anchorEl={rocketRef.current}
        facts={coreFacts}
        title="Core"
        nextLabel="Otro dato"
        closeLabel="Cerrar"
        ariaLabel="Curiosidad de Core"
      />
    </header>
  )
}
