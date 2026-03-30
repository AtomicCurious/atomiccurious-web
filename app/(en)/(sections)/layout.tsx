import type { ReactNode } from "react"
import NavBarEn from "@/components/NavBarEn"
import SocialLinks from "@/components/SocialLinks"
import Link from "next/link"
import CharacterModeBoot from "@/components/CharacterModeBoot"

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

const footerSocialItems: FooterSocialItem[] = [
  { label: "YouTube", href: "https://www.youtube.com/@AtomicCurious" },
  { label: "TikTok", href: "https://tiktok.com/@atomic_curious" },
  { label: "Instagram", href: "https://instagram.com/atomiccurious" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61586519350627",
  },
]

// positivo = derecha | negativo = izquierda
const SOCIAL_NUDGE_PX = 430
const LEGAL_NUDGE_PX = -900
const COPYRIGHT_NUDGE_PX = 120

export default function EnSectionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100svh] flex-col overflow-x-hidden bg-bg text-text">
      <NavBarEn />

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