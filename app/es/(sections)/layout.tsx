import { Suspense, type ReactNode } from "react"
import NavBarEs from "@/components/NavBarEs"
import SocialLinks from "@/components/SocialLinks"
import Link from "next/link"
import CharacterModeBoot from "@/components/CharacterModeBoot"
import QuillFeatherIcon from "@/components/QuillFeatherIcon"

const SIGNATURE_NUDGE_PX = -90
const SOCIAL_NUDGE_PX = -50
const LEGAL_NUDGE_PX = 0
const COPYRIGHT_NUDGE_PX = 70

/* =========================================================
   FOOTER EDITORIAL SIGNATURE CONTROLS
   Ajusta la pluma sin mover la frase:
   negativo = izquierda
   positivo = derecha
========================================================= */
const FEATHER_NUDGE_PX = 0

const SOCIAL_ITEMS = [
  { label: "YouTube" as const, href: "https://www.youtube.com/@AtomicCurious" },
  { label: "TikTok" as const, href: "https://tiktok.com/@atomiccurious" },
  { label: "Instagram" as const, href: "https://instagram.com/atomiccurious" },
  {
    label: "Facebook" as const,
    href: "https://www.facebook.com/profile.php?id=61586519350627",
  },
]

function LegalLinksEs() {
  const linkClass =
    "whitespace-nowrap transition hover:text-text hover:underline hover:underline-offset-4 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-bg"

  return (
    <nav aria-label="Enlaces legales" className="w-full">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-[11px] font-medium text-muted/70">
        <li className="min-w-0">
          <Link href="/es/privacidad" className={linkClass}>
            Privacidad
          </Link>
        </li>
        <li className="min-w-0">
          <Link href="/es/terminos" className={linkClass}>
            Términos
          </Link>
        </li>
        <li className="min-w-0">
          <Link href="/es/cookies" className={linkClass}>
            Cookies
          </Link>
        </li>
        <li className="min-w-0">
          <Link href="/es/aviso-legal" className={linkClass}>
            Aviso legal
          </Link>
        </li>
      </ul>
    </nav>
  )
}

function CuriosityByDesignLabel({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={[
        "relative select-none text-muted",
        compact ? "px-2 py-1 text-[11px]" : "px-3 py-1.5 text-[11px]",
      ].join(" ")}
    >
      Curiosidad, diseñada.
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          compact
            ? "left-2 right-[-1px] -bottom-[1px] h-[9px]"
            : "left-3 right-[-2px] -bottom-[1px] h-[10px]",
        ].join(" ")}
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
    </span>
  )
}

function FooterEditorialSignature() {
  return (
    <div className="ac-editor-signature flex items-center gap-2">
      <CuriosityByDesignLabel compact />

      <Link
        href="/es"
        aria-label="Ir al inicio"
        className="
          group inline-flex items-center justify-center rounded-full
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
          focus-visible:ring-offset-2 focus-visible:ring-offset-bg
        "
        style={{ transform: `translateX(${FEATHER_NUDGE_PX}px)` }}
      >
        <span
          aria-hidden="true"
          className={[
            "relative inline-flex items-center justify-center",
            "h-7 w-7 sm:h-8 sm:w-8",
            "opacity-90 group-hover:opacity-100 transition-opacity duration-300",
          ].join(" ")}
          style={{
            transformOrigin: "55% 60%",
            transform: "rotate(-14deg)",
            filter:
              "drop-shadow(0 0 14px rgba(var(--accent),0.22)) drop-shadow(0 0 22px rgba(var(--accent-alt),0.14))",
          }}
        >
          <QuillFeatherIcon className="h-full w-full" />
        </span>
      </Link>
    </div>
  )
}

export default function EsSectionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100svh] flex-col overflow-x-hidden bg-bg text-text">
      <Suspense fallback={null}>
        <NavBarEs />
      </Suspense>

      <CharacterModeBoot />

      <main
        className="w-full flex-1 bg-bg text-text"
        data-chroot="1"
        data-chmode="host"
      >
        {children}
      </main>

      <footer className="border-t border-border/70 bg-bg">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="hidden md:grid items-center gap-4 [grid-template-columns:auto_1fr_auto_auto]">
            <div
              className="flex items-center justify-start"
              style={{ transform: `translateX(${SIGNATURE_NUDGE_PX}px)` }}
            >
              <FooterEditorialSignature />
            </div>

            <div
              className="flex items-center justify-center"
              style={{ transform: `translateX(${SOCIAL_NUDGE_PX}px)` }}
            >
              <SocialLinks
                variant="footer"
                title="Sigue el universo:"
                items={SOCIAL_ITEMS}
              />
            </div>

            <div
              className="flex items-center justify-center"
              style={{ transform: `translateX(${LEGAL_NUDGE_PX}px)` }}
            >
              <LegalLinksEs />
            </div>

            <div
              className="flex items-center justify-start"
              style={{ transform: `translateX(${COPYRIGHT_NUDGE_PX}px)` }}
            >
              <p className="text-[11px] text-muted leading-none whitespace-nowrap">
                © {new Date().getFullYear()} AtomicCurious
              </p>
            </div>
          </div>

          <div className="md:hidden flex flex-col items-center gap-3">
            <FooterEditorialSignature />

            <SocialLinks
              variant="footer"
              title="Sigue el universo:"
              items={SOCIAL_ITEMS}
            />

            <LegalLinksEs />

            <p className="text-[11px] text-muted leading-none whitespace-nowrap">
              © {new Date().getFullYear()} AtomicCurious
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}