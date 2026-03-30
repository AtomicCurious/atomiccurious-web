import type { ReactNode } from "react"
import NavBarEs from "@/components/NavBarEs"
import SocialLinks from "@/components/SocialLinks"
import Link from "next/link"
import CharacterModeBoot from "@/components/CharacterModeBoot"

const SOCIAL_NUDGE_PX = 430
const LEGAL_NUDGE_PX = -855
const COPYRIGHT_NUDGE_PX = 120

const SOCIAL_ITEMS = [
  { label: "YouTube" as const, href: "https://www.youtube.com/@AtomicCurious" },
  { label: "TikTok" as const, href: "https://tiktok.com/@atomic_curious" },
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

export default function EsSectionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100svh] flex-col overflow-x-hidden bg-bg text-text">
      <NavBarEs />

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
          <div className="hidden md:grid items-center gap-4 [grid-template-columns:1fr_auto_auto]">
            <div
              className="flex items-center justify-start"
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