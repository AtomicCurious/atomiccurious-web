import { Suspense, type ReactNode } from "react"
import NavBarEn from "@/components/NavBarEn"
import SocialLinks from "@/components/SocialLinks"
import Link from "next/link"
import CharacterModeBoot from "@/components/CharacterModeBoot"
import QuillFeatherIcon from "@/components/QuillFeatherIcon"

type FooterSocialItem = {
  label: "YouTube" | "TikTok" | "Instagram" | "Facebook"
  href: string
}

function LegalLinksEn() {
  const linkClass =
    "truncate transition hover:text-text hover:underline hover:underline-offset-4 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-bg"

  return (
    <nav aria-label="Legal links" className="w-full">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-medium text-muted/70">
        <li>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
        </li>
        <li>
          <Link href="/terms" className={linkClass}>
            Terms
          </Link>
        </li>
        <li>
          <Link href="/cookies" className={linkClass}>
            Cookies
          </Link>
        </li>
        <li>
          <Link href="/legal" className={linkClass}>
            Legal
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
      Curiosity, by design.
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

function FooterEditorialSignature({
  featherNudgePx = 0,
}: {
  featherNudgePx?: number
}) {
  return (
    <div className="ac-editor-signature flex items-center gap-2">
      <CuriosityByDesignLabel compact />

      <Link
        href="/"
        aria-label="Go to home"
        className="
          group inline-flex items-center justify-center rounded-full
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
          focus-visible:ring-offset-2 focus-visible:ring-offset-bg
        "
        style={{ transform: `translateX(${featherNudgePx}px)` }}
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

const footerSocialItems: FooterSocialItem[] = [
  { label: "YouTube", href: "https://www.youtube.com/@AtomicCurious" },
  { label: "TikTok", href: "https://tiktok.com/@atomiccurious" },
  { label: "Instagram", href: "https://instagram.com/atomiccurious" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61586519350627",
  },
]

/* positive = right | negative = left */
const SIGNATURE_NUDGE_PX = -90
const SOCIAL_NUDGE_PX = -60
const LEGAL_NUDGE_PX = -20
const COPYRIGHT_NUDGE_PX = 70

/* =========================================================
   FOOTER EDITORIAL SIGNATURE CONTROLS
   Move only the feather:
   negative = left
   positive = right
========================================================= */
const FEATHER_NUDGE_PX = 0

export default function EnSectionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100svh] flex-col overflow-x-hidden bg-bg text-text">
      <Suspense fallback={null}>
        <NavBarEn />
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
              <FooterEditorialSignature featherNudgePx={FEATHER_NUDGE_PX} />
            </div>

            <div
              className="flex items-center justify-center"
              style={{ transform: `translateX(${SOCIAL_NUDGE_PX}px)` }}
            >
              <SocialLinks
                variant="footer"
                title="Follow the universe:"
                items={footerSocialItems}
              />
            </div>

            <div
              className="flex items-center justify-center"
              style={{ transform: `translateX(${LEGAL_NUDGE_PX}px)` }}
            >
              <LegalLinksEn />
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
            <FooterEditorialSignature featherNudgePx={FEATHER_NUDGE_PX} />

            <SocialLinks
              variant="footer"
              title="Follow the universe:"
              items={footerSocialItems}
            />

            <LegalLinksEn />

            <p className="text-[11px] text-muted leading-none whitespace-nowrap">
              © {new Date().getFullYear()} AtomicCurious
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}