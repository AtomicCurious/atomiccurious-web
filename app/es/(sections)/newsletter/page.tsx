// app/es/newsletter/page.tsx
import NewsletterSignupEs from "./_components/NewsletterSignupEs"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Newsletter | AtomicCurious",
  description:
    "Accede a la señal con ideas, herramientas y descubrimientos para mentes curiosas.",
  alternates: {
    canonical: "/es/newsletter",
    languages: {
      en: "/newsletter",
      es: "/es/newsletter",
    },
  },
}

const LAUNCH_DATE_ES = "04 de abril de 2026"

const COMING_SOON_CSS = `

/* ─── Base (sin color) ─────────────────────────────────────────────────── */

.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(var(--accent),0.10), transparent 55%),
    radial-gradient(circle at 70% 40%, rgba(var(--accent-alt),0.08), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 55%);
  mix-blend-mode: normal;
}

.ac-atom-shell{
  position: relative;
}

.ac-atom-shell::before{
  content: "";
  position: absolute;
  inset: -12% 10% auto 10%;
  height: 220px;
  pointer-events: none;
  filter: blur(22px);
  opacity: 0.9;
}

.ac-atom-kicker{
  color: rgba(236, 253, 245, 0.92);
}

.ac-atom-rule{
  width: 84px;
  height: 1px;
  margin: 0 auto;
  border-radius: 9999px;
}

.ac-atom-link{
  transition:
    color 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.ac-atom-link:hover{
  color: rgb(236 253 245);
}

.ac-atom-link:active{
  transform: translateY(0.5px);
}

.ac-atom-legal{
  position: relative;
}

.ac-atom-legal::before{
  content: "";
  position: absolute;
  left: 50%;
  top: -14px;
  width: 44px;
  height: 1px;
  transform: translateX(-50%);
  border-radius: 9999px;
}

/* ─── Character switcher ───────────────────────────────────────────────── */

/* atom (default) */
html:not([data-character]) .ac-atom-shell::before,
body:not([data-character]) .ac-atom-shell::before,
html[data-character="atom"] .ac-atom-shell::before,
body[data-character="atom"] .ac-atom-shell::before {
  background: radial-gradient(ellipse at center, rgba(52,211,153,0.10) 0%, rgba(52,211,153,0.05) 34%, transparent 72%);
}
html[data-character="iris"] .ac-atom-shell::before,
body[data-character="iris"] .ac-atom-shell::before {
  background: radial-gradient(ellipse at center, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0.05) 34%, transparent 72%);
}
html[data-character="core"] .ac-atom-shell::before,
body[data-character="core"] .ac-atom-shell::before {
  background: radial-gradient(ellipse at center, rgba(251,146,60,0.10) 0%, rgba(251,146,60,0.05) 34%, transparent 72%);
}

/* .ac-atom-word */
html:not([data-character]) .ac-atom-word,
body:not([data-character]) .ac-atom-word,
html[data-character="atom"] .ac-atom-word,
body[data-character="atom"] .ac-atom-word {
  color: rgb(52 211 153);
  text-shadow: 0 0 24px rgba(52,211,153,0.10), 0 0 44px rgba(52,211,153,0.04);
}
html[data-character="iris"] .ac-atom-word,
body[data-character="iris"] .ac-atom-word {
  color: rgb(34 211 238);
  text-shadow: 0 0 24px rgba(34,211,238,0.10), 0 0 44px rgba(34,211,238,0.04);
}
html[data-character="core"] .ac-atom-word,
body[data-character="core"] .ac-atom-word {
  color: rgb(251 146 60);
  text-shadow: 0 0 24px rgba(251,146,60,0.10), 0 0 44px rgba(251,146,60,0.04);
}

/* .ac-atom-subtle */
html:not([data-character]) .ac-atom-subtle,
body:not([data-character]) .ac-atom-subtle,
html[data-character="atom"] .ac-atom-subtle,
body[data-character="atom"] .ac-atom-subtle {
  color: rgba(52, 211, 153, 0.78);
}
html[data-character="iris"] .ac-atom-subtle,
body[data-character="iris"] .ac-atom-subtle {
  color: rgba(34, 211, 238, 0.78);
}
html[data-character="core"] .ac-atom-subtle,
body[data-character="core"] .ac-atom-subtle {
  color: rgba(251, 146, 60, 0.78);
}

/* .ac-atom-dot */
html:not([data-character]) .ac-atom-dot,
body:not([data-character]) .ac-atom-dot,
html[data-character="atom"] .ac-atom-dot,
body[data-character="atom"] .ac-atom-dot {
  background-color: rgba(52, 211, 153, 0.92);
  box-shadow: 0 0 0 6px rgba(52, 211, 153, 0.08), 0 0 18px rgba(52, 211, 153, 0.18);
}
html[data-character="iris"] .ac-atom-dot,
body[data-character="iris"] .ac-atom-dot {
  background-color: rgba(34, 211, 238, 0.92);
  box-shadow: 0 0 0 6px rgba(34, 211, 238, 0.08), 0 0 18px rgba(34, 211, 238, 0.18);
}
html[data-character="core"] .ac-atom-dot,
body[data-character="core"] .ac-atom-dot {
  background-color: rgba(251, 146, 60, 0.92);
  box-shadow: 0 0 0 6px rgba(251, 146, 60, 0.08), 0 0 18px rgba(251, 146, 60, 0.18);
}

/* .ac-atom-pill */
html:not([data-character]) .ac-atom-pill,
body:not([data-character]) .ac-atom-pill,
html[data-character="atom"] .ac-atom-pill,
body[data-character="atom"] .ac-atom-pill {
  border-color: rgba(52, 211, 153, 0.18);
  background: linear-gradient(to right, rgba(52, 211, 153, 0.08), rgba(52, 211, 153, 0.03));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 16px 40px -28px rgba(52, 211, 153, 0.22);
}
html[data-character="iris"] .ac-atom-pill,
body[data-character="iris"] .ac-atom-pill {
  border-color: rgba(34, 211, 238, 0.18);
  background: linear-gradient(to right, rgba(34, 211, 238, 0.08), rgba(34, 211, 238, 0.03));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 16px 40px -28px rgba(34, 211, 238, 0.22);
}
html[data-character="core"] .ac-atom-pill,
body[data-character="core"] .ac-atom-pill {
  border-color: rgba(251, 146, 60, 0.18);
  background: linear-gradient(to right, rgba(251, 146, 60, 0.08), rgba(251, 146, 60, 0.03));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 16px 40px -28px rgba(251, 146, 60, 0.22);
}

/* .ac-atom-rule */
html:not([data-character]) .ac-atom-rule,
body:not([data-character]) .ac-atom-rule,
html[data-character="atom"] .ac-atom-rule,
body[data-character="atom"] .ac-atom-rule {
  background: linear-gradient(to right, transparent, rgba(52,211,153,0.72), rgba(52,211,153,0.18), transparent);
}
html[data-character="iris"] .ac-atom-rule,
body[data-character="iris"] .ac-atom-rule {
  background: linear-gradient(to right, transparent, rgba(34,211,238,0.72), rgba(34,211,238,0.18), transparent);
}
html[data-character="core"] .ac-atom-rule,
body[data-character="core"] .ac-atom-rule {
  background: linear-gradient(to right, transparent, rgba(251,146,60,0.72), rgba(251,146,60,0.18), transparent);
}

/* .ac-atom-link:hover */
html:not([data-character]) .ac-atom-link:hover,
body:not([data-character]) .ac-atom-link:hover,
html[data-character="atom"] .ac-atom-link:hover,
body[data-character="atom"] .ac-atom-link:hover {
  border-color: rgba(52, 211, 153, 0.28);
  background: rgba(52, 211, 153, 0.05);
  box-shadow: 0 18px 44px -28px rgba(52, 211, 153, 0.18);
}
html[data-character="iris"] .ac-atom-link:hover,
body[data-character="iris"] .ac-atom-link:hover {
  border-color: rgba(34, 211, 238, 0.28);
  background: rgba(34, 211, 238, 0.05);
  box-shadow: 0 18px 44px -28px rgba(34, 211, 238, 0.18);
}
html[data-character="core"] .ac-atom-link:hover,
body[data-character="core"] .ac-atom-link:hover {
  border-color: rgba(251, 146, 60, 0.28);
  background: rgba(251, 146, 60, 0.05);
  box-shadow: 0 18px 44px -28px rgba(251, 146, 60, 0.18);
}

/* .ac-atom-link:focus-visible */
html:not([data-character]) .ac-atom-link:focus-visible,
body:not([data-character]) .ac-atom-link:focus-visible,
html[data-character="atom"] .ac-atom-link:focus-visible,
body[data-character="atom"] .ac-atom-link:focus-visible {
  border-color: rgba(52, 211, 153, 0.28);
  box-shadow: 0 0 0 2px rgba(52,211,153,0.16), 0 18px 44px -28px rgba(52,211,153,0.18);
}
html[data-character="iris"] .ac-atom-link:focus-visible,
body[data-character="iris"] .ac-atom-link:focus-visible {
  border-color: rgba(34, 211, 238, 0.28);
  box-shadow: 0 0 0 2px rgba(34,211,238,0.16), 0 18px 44px -28px rgba(34,211,238,0.18);
}
html[data-character="core"] .ac-atom-link:focus-visible,
body[data-character="core"] .ac-atom-link:focus-visible {
  border-color: rgba(251, 146, 60, 0.28);
  box-shadow: 0 0 0 2px rgba(251,146,60,0.16), 0 18px 44px -28px rgba(251,146,60,0.18);
}

/* .ac-atom-legal::before */
html:not([data-character]) .ac-atom-legal::before,
body:not([data-character]) .ac-atom-legal::before,
html[data-character="atom"] .ac-atom-legal::before,
body[data-character="atom"] .ac-atom-legal::before {
  background: linear-gradient(to right, transparent, rgba(52,211,153,0.36), transparent);
}
html[data-character="iris"] .ac-atom-legal::before,
body[data-character="iris"] .ac-atom-legal::before {
  background: linear-gradient(to right, transparent, rgba(34,211,238,0.36), transparent);
}
html[data-character="core"] .ac-atom-legal::before,
body[data-character="core"] .ac-atom-legal::before {
  background: linear-gradient(to right, transparent, rgba(251,146,60,0.36), transparent);
}
`

function ComingSoonNewsletterEs() {
  return (
    <section className="relative w-full overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,rgb(var(--accent-alt)/0.07),transparent_62%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="ac-atom-shell relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute inset-0 ac-grain" />

            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
              <div className="relative aspect-video w-full">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(var(--accent),0.16),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(var(--accent-alt),0.12),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_60%)]" />

                <Image
                  src="/images/sections/newsletter/newsletter_paginas.webp"
                  alt="Equipo AtomicCurious"
                  fill
                  sizes="(min-width: 1024px) 960px, 92vw"
                  className="object-cover"
                  priority
                />

                <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] bg-black/35" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-text shadow-soft backdrop-blur">
                  <span className="ac-atom-dot h-1.5 w-1.5 rounded-full" />
                  LANZAMIENTO
                </div>
              </div>
            </div>

            <div className="relative mt-6 text-center">
              <p className="ac-atom-kicker text-xs font-semibold tracking-[0.18em]">
                ACCESO PRIVADO
              </p>

              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl">
                Accede a la <span className="ac-atom-word">señal</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted sm:text-lg">
                Ideas, herramientas y descubrimientos para mentes curiosas.
              </p>

              <div className="mx-auto mt-6">
                <div className="ac-atom-pill inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold text-text backdrop-blur">
                  <span className="ac-atom-dot h-1.5 w-1.5 rounded-full" />
                  Lanzamiento · <span className="text-text">{LAUNCH_DATE_ES}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="ac-atom-rule" aria-hidden="true" />
              </div>

              <p className="mx-auto mt-6 max-w-xl text-sm text-muted sm:text-[15px]">
                Contenido seleccionado con <span className="ac-atom-subtle">intención</span>.
              </p>

              <div className="mx-auto mt-8 max-w-xl">
                <NewsletterSignupEs />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/es/posts"
                  className="ac-atom-link inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text focus:outline-none"
                >
                  Ver posts →
                </Link>

                <Link
                  href="/es/start-here"
                  className="ac-atom-link inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text focus:outline-none"
                >
                  Empieza aquí →
                </Link>

                <Link
                  href="/es"
                  className="ac-atom-link inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text focus:outline-none"
                >
                  Volver al inicio
                </Link>
              </div>

              <p className="ac-atom-legal mx-auto mt-6 max-w-xl text-xs text-muted">
                Al suscribirte aceptas recibir correos de AtomicCurious. Puedes darte de baja en cualquier momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: COMING_SOON_CSS }} />
      <ComingSoonNewsletterEs />
    </main>
  )
}