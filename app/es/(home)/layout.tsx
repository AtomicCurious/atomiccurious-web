import { Suspense, type ReactNode } from "react"
import NavBarEs from "@/components/NavBarEs"
import SocialLinks from "@/components/SocialLinks"
import Link from "next/link"
import CharacterModeBoot from "@/components/CharacterModeBoot"

const LEGAL_NUDGE_PX = -140
const SOCIAL_NUDGE_PX = -70
const SUPPORT_NUDGE_PX = 20
const COPYRIGHT_NUDGE_PX = 70

const SOCIAL_ITEMS = [
  { label: "YouTube" as const, href: "https://www.youtube.com/@AtomicCurious" },
  { label: "TikTok" as const, href: "https://tiktok.com/@atomic_curious" },
  { label: "Instagram" as const, href: "https://instagram.com/atomiccurious" },
  {
    label: "Facebook" as const,
    href: "https://www.facebook.com/profile.php?id=61586519350627",
  },
]

const SUPPORT_HREF_ES = "/es/apoyar"

function LegalLinksEs() {
  const linkClass =
    "whitespace-nowrap transition hover:text-text hover:underline hover:underline-offset-4 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-bg"

  return (
    <nav aria-label="Enlaces legales" className="w-auto shrink-0">
      <ul className="flex flex-nowrap items-center justify-center gap-x-6 whitespace-nowrap text-center text-[11px] font-medium text-muted/70">
        <li>
          <Link href="/es/privacidad" className={linkClass}>
            Privacidad
          </Link>
        </li>
        <li>
          <Link href="/es/terminos" className={linkClass}>
            Términos
          </Link>
        </li>
        <li>
          <Link href="/es/cookies" className={linkClass}>
            Cookies
          </Link>
        </li>
        <li>
          <Link href="/es/aviso-legal" className={linkClass}>
            Aviso legal
          </Link>
        </li>
      </ul>
    </nav>
  )
}

function FooterDivider() {
  return <span aria-hidden="true" className="mx-1 h-5 w-px bg-white/10 shrink-0" />
}

function SupportButtonEs() {
  return (
    <Link
      href={SUPPORT_HREF_ES}
      aria-label="Apoyar AtomicCurious"
      className="
        inline-flex h-9 items-center justify-center rounded-full
        border px-4 text-[13px] font-semibold text-[#ffd7e1]
        shadow-soft transition-all duration-200
        hover:scale-[1.02]
        hover:border-[rgba(255,120,150,0.58)]
        hover:bg-[rgba(255,120,150,0.18)]
        hover:shadow-[0_0_30px_rgba(255,120,150,0.25)]
        active:scale-[0.99]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
        whitespace-nowrap
      "
      style={{
        borderColor: "rgba(255, 120, 150, 0.40)",
        background: "rgba(255, 120, 150, 0.12)",
        boxShadow:
          "0 0 0 1px rgba(255,120,150,0.05), 0 10px 28px rgba(255,120,150,0.10)",
      }}
    >
      <span className="mr-2 text-[0.95em] leading-none text-[#ff7a9a]">♥</span>
      <span>Apoyar</span>
    </Link>
  )
}

function SupportInlineEs() {
  return (
    <div className="flex items-center gap-3 whitespace-nowrap leading-none shrink-0">
      <span className="text-[11px] font-medium text-[rgba(255,143,177,0.82)]">
        ¿Te gusta lo que hacemos?
      </span>
      <SupportButtonEs />
    </div>
  )
}

export default function EsHomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100svh] flex-col overflow-x-hidden overflow-y-auto bg-bg text-text md:h-[100svh] md:min-h-0 md:overflow-y-hidden">
      <Suspense fallback={null}>
        <NavBarEs />
      </Suspense>

      <CharacterModeBoot />

      <main
        className="w-full flex-1 bg-bg text-text md:overflow-hidden"
        data-chroot="1"
        data-chmode="host"
      >
        {children}
      </main>

      <footer className="border-t border-border/70 bg-bg">
        <div className="mx-auto max-w-6xl px-6 py-3">
          <div className="hidden md:flex items-center justify-between gap-4 whitespace-nowrap">
            <div
              className="flex shrink-0 items-center justify-start"
              style={{ transform: `translateX(${LEGAL_NUDGE_PX}px)` }}
            >
              <LegalLinksEs />
            </div>

            <FooterDivider />

            <div
              className="flex shrink-0 items-center justify-start opacity-85"
              style={{ transform: `translateX(${SOCIAL_NUDGE_PX}px)` }}
            >
              <SocialLinks
                variant="footer"
                title="Sigue el universo:"
                items={SOCIAL_ITEMS}
              />
            </div>

            <FooterDivider />

            <div
              className="flex shrink-0 items-center justify-start"
              style={{ transform: `translateX(${SUPPORT_NUDGE_PX}px)` }}
            >
              <SupportInlineEs />
            </div>

            <div
              className="flex shrink-0 items-center justify-start"
              style={{ transform: `translateX(${COPYRIGHT_NUDGE_PX}px)` }}
            >
              <p className="text-[10px] text-muted/55 leading-none whitespace-nowrap">
                © {new Date().getFullYear()} AtomicCurious
              </p>
            </div>
          </div>

          <div className="md:hidden flex flex-col items-center gap-4">
            <SupportInlineEs />

            <SocialLinks
              variant="footer"
              title="Sigue el universo:"
              items={SOCIAL_ITEMS}
            />

            <LegalLinksEs />

            <p className="text-[10px] text-muted/55 leading-none whitespace-nowrap">
              © {new Date().getFullYear()} AtomicCurious
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

