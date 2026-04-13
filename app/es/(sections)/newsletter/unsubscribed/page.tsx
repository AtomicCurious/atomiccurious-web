import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Baja completada | AtomicCurious",
  description: "Te has dado de baja del boletín de AtomicCurious.",
  alternates: {
    canonical: "/es/newsletter/unsubscribed",
    languages: {
      en: "/newsletter/unsubscribed",
      es: "/es/newsletter/unsubscribed",
    },
  },
}

const UNSUBSCRIBED_CSS = `
.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(var(--accent),0.10), transparent 55%),
    radial-gradient(circle at 70% 40%, rgba(var(--accent-alt),0.08), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 55%);
  mix-blend-mode: normal;
}

.ac-editorial-shell{
  position: relative;
}

.ac-editorial-shell::before{
  content: "";
  position: absolute;
  inset: -10% 10% auto 10%;
  height: 200px;
  pointer-events: none;
  filter: blur(24px);
  opacity: 0.65;
  background: radial-gradient(ellipse at center, rgba(255,255,255,0.08), transparent 72%);
}

.ac-exit-rule{
  width: 88px;
  height: 1px;
  margin: 0 auto;
  border-radius: 9999px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent);
}
`

export default function Page() {
  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: UNSUBSCRIBED_CSS }} />

      <section className="relative w-full overflow-hidden bg-bg">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
          <div className="mx-auto w-full max-w-4xl">
            <div className="ac-editorial-shell relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-10">
              <div className="pointer-events-none absolute inset-0 ac-grain" />

              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                  BAJA COMPLETADA
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                    <Image
                      src="/images/sections/newsletter/newsletter_unsubscribed.webp"
                      alt="Baja del boletín de AtomicCurious"
                      fill
                      sizes="(min-width: 1024px) 720px, 92vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-muted">
                  ATOMICCURIOUS · BOLETÍN
                </p>

                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl">
                  Ya estás fuera de la lista
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted sm:text-lg">
                  Ya no recibirás correos del boletín de AtomicCurious.
                </p>

                <div className="mt-6">
                  <div className="ac-exit-rule" />
                </div>

                <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/25 px-4 py-2 text-xs font-semibold text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
                  Puedes volver cuando quieras.
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/es/newsletter"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2"
                  >
                    Suscribirme de nuevo →
                  </Link>

                  <Link
                    href="/es/posts"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2"
                  >
                    Ver posts →
                  </Link>

                  <Link
                    href="/es"
                    className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface-2"
                  >
                    Volver al inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}