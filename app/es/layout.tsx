// app/es/layout.tsx
import type { ReactNode } from "react"
import NavBarEs from "@/components/NavBarEs"
import SocialLinks from "@/components/SocialLinks"
import Link from "next/link"
import CharacterModeBoot from "@/components/CharacterModeBoot"

function LegalLinksEs() {
  const linkClass =
    "truncate transition hover:text-text hover:underline hover:underline-offset-4 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-bg"

  return (
    <nav aria-label="Enlaces legales">
      <ul className="flex items-center gap-6 text-[11px] font-medium text-muted/70">
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

// ✅ CAMBIA SOLO ESTOS 3 NÚMEROS (px)
// positivo = derecha | negativo = izquierda
const SOCIAL_NUDGE_PX = 400
const LEGAL_NUDGE_PX = -470
const COPYRIGHT_NUDGE_PX = -27

export default function EsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100svh] flex flex-col bg-bg text-text">
      <NavBarEs />

      {/* ✅ Sets per-page mode: host | trio | none (mirrors on body, applies to <main>) */}
      <CharacterModeBoot />

      {/* ✅ Root main: Boot should ALWAYS target this node */}
      {/* ✅ Default SSR mode prevents flash; Boot updates per-route */}
      <main
        className="w-full flex-1 bg-bg text-text"
        data-chroot="1"
        data-chmode="host"
      >
        {children}
      </main>

      <footer className="border-t border-border/70 bg-bg">
        <div className="mx-auto max-w-6xl px-6 py-4">
          {/* Desktop / Tablet — single row */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left — Social + Legal */}
            <div className="flex items-center">
              <div style={{ transform: `translateX(${SOCIAL_NUDGE_PX}px)` }}>
                <SocialLinks
                  variant="footer"
                  title="Sigue el universo"
                  items={[
                    { label: "YouTube", href: "https://www.youtube.com/@AtomicCurious" },
                    { label: "TikTok", href: "https://tiktok.com/@atomic_curious" },
                    { label: "Instagram", href: "https://instagram.com/atomiccurious" },
                    { label: "Facebook", href: "https://facebook.com/atomiccurious" },
                  ]}
                />
              </div>

              <div className="ml-8" style={{ transform: `translateX(${LEGAL_NUDGE_PX}px)` }}>
                <LegalLinksEs />
              </div>
            </div>

            {/* Right — Copyright */}
            <p
              className="text-[11px] text-muted leading-none whitespace-nowrap"
              style={{ transform: `translateX(${COPYRIGHT_NUDGE_PX}px)` }}
            >
              © {new Date().getFullYear()} AtomicCurious · Curiosidad, por diseño.
            </p>
          </div>

          {/* Mobile — stacked but still clean */}
          <div className="flex flex-col gap-3 md:hidden">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] text-muted leading-none whitespace-nowrap">
                © {new Date().getFullYear()} AtomicCurious · Curiosidad, por diseño.
              </p>

              <SocialLinks
                variant="footer"
                title="Sigue el universo"
                items={[
                  { label: "YouTube", href: "https://www.youtube.com/@AtomicCurious" },
                  { label: "TikTok", href: "https://tiktok.com/@atomic_curious" },
                  { label: "Instagram", href: "https://instagram.com/atomiccurious" },
                  { label: "Facebook", href: "https://facebook.com/atomiccurious" },
                ]}
              />
            </div>

            <div className="flex justify-center">
              <LegalLinksEs />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
