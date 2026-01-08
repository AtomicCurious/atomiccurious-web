"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import CoreFactBubble from "@/components/visual/CoreFactBubble"

function isActive(pathname: string, href: string) {
  if (href === "/en") return pathname === "/en"
  return pathname === href || pathname.startsWith(href + "/")
}

function toEs(pathname: string) {
  // ✅ Rutas traducidas (EN -> ES)
  const map: Record<string, string> = {
    "/en/resources": "/es/recursos",
    "/en/community": "/es/comunidad",
    "/en/contact": "/es/contacto",
    "/en/newsletter": "/es/newsletter",
    "/en/start-here": "/es/start-here",
    "/en/about": "/es/about",
    "/en/posts": "/es/posts",
  }

  // ✅ Slugs traducidos para posts (EN -> ES)
  const postSlugMap: Record<string, string> = {
    "why-we-dream": "por-que-sonamos",
  }

  if (pathname === "/en") return "/es"
  if (map[pathname]) return map[pathname]

  if (pathname.startsWith("/en/posts/")) {
    const slug = pathname.replace("/en/posts/", "")
    const esSlug = postSlugMap[slug] ?? slug
    return `/es/posts/${esSlug}`
  }

  if (pathname.startsWith("/en/")) return pathname.replace(/^\/en\//, "/es/")
  return "/es"
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
          <ellipse
            className="jetCore"
            cx="52"
            cy="56"
            rx="16"
            ry="10"
            fill="url(#jetCoreMini)"
          />
          <ellipse
            className="jetCore"
            cx="52"
            cy="48"
            rx="12"
            ry="8"
            fill="url(#jetCoreMini)"
          />
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

export default function NavBarEn() {
  const pathname = usePathname()
  const esHref = toEs(pathname)
  const isHome = pathname === "/en"

  const rocketRef = useRef<HTMLButtonElement | null>(null)
  const [coreOpen, setCoreOpen] = useState(false)

  // ✅ Mobile drawer
  const [menuOpen, setMenuOpen] = useState(false)

  // Close drawer on navigation
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when drawer open
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  // ESC closes drawer
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false)
    }
    if (menuOpen) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const coreFacts = useMemo(
    () => [
      "Octopuses have neurons in their arms, so they can “think” with their tentacles.",
      "Sunlight takes about 8 minutes to reach Earth—everything you see from the Sun is the past.",
      "Your brain is constantly predicting reality; perception is partly a controlled guess.",
      "If you removed empty space inside atoms, all of humanity could fit into something the size of a sugar cube.",
      "Some of the dust you breathe can be older than Earth—literal stardust.",
      "A day on Venus is longer than its year: Venus rotates very slowly but orbits the Sun faster.",
      "Bananas are slightly radioactive because they contain potassium-40 (totally harmless at normal amounts).",
      "There are more possible chess games than atoms in the observable universe (an astronomically huge number).",
      "A single lightning bolt can heat the air to around 30,000°C—hotter than the surface of the Sun.",
      "Honey never spoils; sealed honey has been found edible after thousands of years.",
      "Sharks existed before trees—sharks are older than many land plants.",
      "The ‘hum’ you hear in a seashell is mostly your brain amplifying ambient noise, not the ocean.",
      "Space isn’t empty: there are still a few atoms per cubic centimeter floating between stars.",
      "A teaspoon of neutron star matter would weigh billions of tons on Earth (in theory—don’t try to scoop it).",
      "Some metals ‘remember’ shape (shape-memory alloys) and can return to form when heated.",
      "Your body contains enough carbon to make thousands of pencil marks.",
      "There’s a giant storm on Jupiter (the Great Red Spot) that has lasted for centuries.",
      "A blue whale’s heart is so large a human could (roughly) crawl through some of its arteries.",
      "Water can boil and freeze at the same time under the right pressure (triple point).",
      "The universe is expanding, and distant galaxies can appear to move away faster than light due to space stretching.",
    ],
    []
  )

  const links = [
    { label: "Start Here", href: "/en/start-here" },
    { label: "Posts", href: "/en/posts" },
    { label: "About", href: "/en/about" },
    { label: "Newsletter", href: "/en/newsletter" },
    { label: "Resources", href: "/en/resources" },
    { label: "Community", href: "/en/community" },
    { label: "Contact", href: "/en/contact" },
  ]

  return (
    <header className="relative border-b border-border/70 bg-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Left brand */}
        <div className="inline-flex min-w-0 items-center gap-3">
          {isHome ? (
            <button
              ref={rocketRef}
              type="button"
              onClick={() => setCoreOpen((v) => !v)}
              className="group inline-flex items-center"
              aria-label="Open a Core curiosity"
            >
              <StarshipMark />
            </button>
          ) : (
            <Link href="/en" className="group inline-flex items-center" aria-label="Go to Home">
              <StarshipMark />
            </Link>
          )}

          <Link
            href="/en"
            className="group inline-flex min-w-0 items-center text-lg font-semibold tracking-tight text-text"
            aria-label="AtomicCurious Home"
          >
            <span className="relative truncate">
              AtomicCurious
              <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-accent/80 transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
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
        </nav>

        {/* Mobile: ES + Menu */}
        <div className="flex items-center gap-2 sm:hidden">
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
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
          >
            Menu
            <span className="ml-2 text-muted">≡</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen ? (
        <div className="fixed inset-0 z-[80] sm:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          />

          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            className="
              absolute right-0 top-0 h-full w-[88%] max-w-[360px]
              border-l border-border/70 bg-bg
              shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_rgba(0,0,0,0.75)]
            "
          >
            {/* Panel header */}
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

            {/* Links */}
            <div className="relative px-5 py-5">
              {/* subtle glow */}
              <div className="pointer-events-none absolute -top-24 right-[-120px] h-64 w-64 rounded-full bg-[rgba(34,211,238,0.12)] blur-[90px]" />
              <div className="pointer-events-none absolute bottom-[-140px] right-[-120px] h-72 w-72 rounded-full bg-[rgba(255,77,157,0.10)] blur-[110px]" />

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

              {/* Language */}
              <div className="mt-5">
                <div className="text-[11px] font-semibold tracking-[0.18em] text-muted">
                  LANGUAGE
                </div>
                <div className="mt-3 flex items-center gap-2">
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
                    ES
                    <span className="ml-2 text-muted">›</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-bg" />
          </div>
        </div>
      ) : null}

      {/* Core bubble (only on Home) */}
      <CoreFactBubble
        open={isHome && coreOpen}
        onClose={() => setCoreOpen(false)}
        anchorEl={rocketRef.current}
        facts={coreFacts}
        title="Core"
      />
    </header>
  )
}
