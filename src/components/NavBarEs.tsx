// src/components/NavBarEs.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import CoreFactBubble from "@/components/visual/CoreFactBubble"
import ThemeToggle from "@/components/ThemeToggle"
import CharacterToggle from "@/components/CharacterToggle"
import CharacterSigilMark from "@/components/CharacterSigilMark"

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
   Starship (HOME ONLY)
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

export default function NavBarEs() {
  const pathname = usePathname()
  const enHref = useMemo(() => toEn(pathname), [pathname])

  const isHome = pathname === "/es" || pathname === "/es/"
  const showToggles = !isHome

  const rocketRef = useRef<HTMLButtonElement | null>(null)
  const [coreOpen, setCoreOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [coreHasNew, setCoreHasNew] = useState(false)
  const [rocketPing, setRocketPing] = useState(false)

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

  // Initialize beacon based on last seen time
  useEffect(() => {
    if (!isHome) return
    const seen = readSeen()
    setCoreHasNew(!isSeenFresh(seen))
  }, [isHome])

  // Occasional micro ping (only when not opened recently)
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

  const coreFacts = useMemo(
    () => [
      "Los pulpos tienen neuronas en sus brazos, así que pueden “pensar” con sus tentáculos.",
      "La luz del Sol tarda ~8 minutos en llegar a la Tierra: todo lo que ves del Sol es pasado.",
      "Tu cerebro predice la realidad constantemente; percibir es, en parte, una conjetura controlada.",
      "Si eliminaras el espacio vacío dentro de los átomos, toda la humanidad cabría en algo del tamaño de un terrón de azúcar.",
      "Parte del polvo que respiras puede ser más viejo que la Tierra: literalmente polvo de estrellas.",
      "Un día en Venus dura más que su año: rota muy lento pero orbita el Sol relativamente rápido.",
      "Los plátanos son ligeramente radiactivos por el potasio-40 (en cantidades normales es totalmente inofensivo).",
      "Hay más partidas posibles de ajedrez que átomos en el universo observable (una cantidad absurda).",
      "Un rayo puede calentar el aire hasta ~30,000°C, más que la superficie del Sol.",
      "La miel no se echa a perder; se ha encontrado miel sellada comestible tras miles de años.",
      "Los tiburones existían antes que los árboles: son más antiguos que muchas plantas terrestres.",
      "El “rumor” de una concha marina suele ser tu cerebro amplificando ruido ambiente, no el océano.",
      "El espacio no está vacío: aún hay algunos átomos por centímetro cúbico entre las estrellas.",
      "Una cucharadita de materia de estrella de neutrones pesaría miles de millones de toneladas en la Tierra (en teoría).",
      "Algunos metales “recuerdan” su forma (aleaciones con memoria) y vuelven a ella al calentarse.",
      "Tu cuerpo contiene suficiente carbono como para hacer miles de trazos de lápiz.",
      "En Júpiter hay una tormenta gigante (la Gran Mancha Roja) que lleva siglos activa.",
      "El corazón de una ballena azul es tan grande que una persona podría (aprox.) pasar por algunas de sus arterias.",
      "El agua puede hervir y congelarse a la vez bajo la presión correcta (punto triple).",
      "El universo se expande: galaxias lejanas pueden parecer alejarse más rápido que la luz porque el espacio se estira.",
    ],
    []
  )

    const links = [
    { label: "Empieza aquí", href: "/es/start-here" },
    { label: "Posts", href: "/es/posts" },
    { label: "Boletín", href: "/es/newsletter" },
    { label: "Recursos", href: "/es/recursos" },
    { label: "Comunidad", href: "/es/comunidad" },
    { label: "Acerca", href: "/es/about" },
    { label: "Contacto", href: "/es/contacto" },
  ]

  return (
    <header className="relative border-b border-border/70 bg-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* LEFT */}
        <div className="inline-flex min-w-0 items-center gap-3">
          {/* HOME: cohete (único) */}
          {isHome ? (
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

              {/* ✅ Ping animation (paridad con EN) */}
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
          ) : (
            /* SECCIONES: sigil (y SOLO sigil) */
            <Link href="/es" className="group inline-flex items-center justify-center" aria-label="Ir al inicio">
              <CharacterSigilMark className="h-9 w-9 sm:h-10 sm:w-10" />
            </Link>
          )}

          {/* LOGO TEXT */}
          <Link
            href="/es"
            className="group inline-flex min-w-0 items-center text-lg font-semibold tracking-tight text-text"
            aria-label="Inicio AtomicCurious"
          >
            <span className="relative truncate">
              <span className="ac-logo-wipe">AtomicCurious</span>
              <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-accent/80 transition-all duration-300 group-hover:w-full" />
            </span>

            <style jsx>{`
              @keyframes acLogoWipeLR {
                0% {
                  background-position: 0% 50%;
                }
                100% {
                  background-position: 100% 50%;
                }
              }

              .ac-logo-wipe {
                color: rgb(var(--text));
                -webkit-text-fill-color: rgb(var(--text));
                position: relative;
                display: inline-block;
              }

              .ac-logo-wipe::after {
                content: "AtomicCurious";
                position: absolute;
                inset: 0;

                color: transparent;
                -webkit-text-fill-color: transparent;

                background-image: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0) 0%,
                  rgba(255, 255, 255, 0) 24%,
                  rgba(255, 236, 196, 0.92) 36%,
                  rgba(255, 214, 102, 0.98) 45%,
                  rgba(255, 179, 71, 0.94) 52%,
                  rgba(255, 255, 255, 0) 62%,
                  rgba(255, 255, 255, 0) 100%
                );

                background-size: 320% 100%;
                background-repeat: no-repeat;

                background-clip: text;
                -webkit-background-clip: text;

                animation: acLogoWipeLR 6.5s ease-in-out infinite;

                filter: drop-shadow(0 0 10px rgba(255, 210, 120, 0.08));
                pointer-events: none;
              }

              @media (prefers-reduced-motion: reduce) {
                .ac-logo-wipe::after {
                  animation: none !important;
                  background-position: 50% 50% !important;
                }
              }
            `}</style>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-2 text-sm sm:flex" aria-label="Primary">
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
        </nav>

        {/* MOBILE */}
        <div className="flex items-center gap-2 sm:hidden">
          {showToggles ? (
            <>
              <ThemeToggle />
              <CharacterToggle />
            </>
          ) : null}

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
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          />

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
              {/* Theme-aware blobs */}
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

                  <span className="inline-flex items-center rounded-full border border-accent/25 bg-surface-1 px-3 py-1.5 text-xs font-semibold text-text">
                    ES
                  </span>

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

      {/* CORE BUBBLE */}
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
    </header>
  )
}
