import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Suscripción confirmada | AtomicCurious",
  description: "Tu suscripción al boletín de AtomicCurious ha sido confirmada.",
  alternates: {
    canonical: "/es/newsletter/confirmed",
    languages: {
      en: "/newsletter/confirmed",
      es: "/es/newsletter/confirmed",
    },
  },
}

const CONFIRMED_CSS = `
.ac-confirm-bg{
  background:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.06), transparent 32%),
    radial-gradient(circle at 82% 0%, rgba(52,211,153,0.10), transparent 30%),
    radial-gradient(circle at 70% 38%, rgba(16,185,129,0.08), transparent 34%),
    linear-gradient(to bottom, rgba(255,255,255,0.02), transparent 28%);
}

.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(52,211,153,0.08), transparent 55%),
    radial-gradient(circle at 70% 40%, rgba(16,185,129,0.06), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.03), transparent 55%);
  mix-blend-mode: normal;
  opacity: 0.9;
}

.ac-editorial-shell{
  position: relative;
  isolation: isolate;
}

.ac-editorial-shell::before{
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  top: -90px;
  height: 220px;
  pointer-events: none;
  filter: blur(30px);
  opacity: 0.9;
  background: radial-gradient(ellipse at center, rgba(52,211,153,0.14), transparent 72%);
}

.ac-editorial-shell::after{
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1.5rem;
  pointer-events: none;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.05),
    inset 0 -1px 0 rgba(255,255,255,0.02);
}

.ac-confirm-rule{
  width: 94px;
  height: 1px;
  margin: 0 auto;
  border-radius: 9999px;
  background: linear-gradient(to right, transparent, rgba(52,211,153,0.72), transparent);
}

.ac-kicker{
  letter-spacing: 0.22em;
}

.ac-image-wrap{
  position: relative;
}

.ac-image-wrap::after{
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(to top, rgba(7,10,12,0.26), transparent 24%),
    linear-gradient(to bottom, rgba(7,10,12,0.18), transparent 18%);
}

.ac-step-card{
  background:
    linear-gradient(to bottom, rgba(255,255,255,0.025), rgba(255,255,255,0.015));
}

.ac-primary-btn{
  box-shadow:
    0 10px 30px rgba(16,185,129,0.10),
    inset 0 1px 0 rgba(255,255,255,0.06);
}
`

export default function Page() {
  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: CONFIRMED_CSS }} />

      <section className="relative w-full overflow-hidden bg-bg">
        <div className="pointer-events-none absolute inset-0 ac-confirm-bg" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-4xl">
            <div className="ac-editorial-shell relative overflow-hidden rounded-[28px] border border-border/70 bg-surface-1/45 p-6 shadow-soft backdrop-blur-xl sm:p-10 md:p-12">
              <div className="pointer-events-none absolute inset-0 ac-grain" />

              <div className="relative text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/35 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  SUSCRIPCIÓN CONFIRMADA
                </div>

                {/* Eyebrow */}
                <p className="ac-kicker mt-7 text-[11px] font-semibold uppercase text-muted">
                  AtomicCurious · Boletín
                </p>

                {/* Title */}
                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-text sm:text-5xl md:text-6xl">
                  Ya estás dentro
                </h1>

                {/* Description */}
                <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-muted sm:text-lg">
                  Tu suscripción quedó confirmada. A partir de ahora recibirás ideas,
                  hallazgos y piezas seleccionadas sobre ciencia, tecnología y futuro.
                </p>

                {/* Visual rule */}
                <div className="mt-6">
                  <div className="ac-confirm-rule" />
                </div>

                {/* Hero image */}
                <div className="ac-image-wrap mt-8 overflow-hidden rounded-[24px] border border-border/70 bg-bg/20 shadow-soft">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                    <Image
                      src="/images/sections/newsletter/newsletter_confirmed.webp"
                      alt="Bienvenida a AtomicCurious"
                      fill
                      sizes="(min-width: 1024px) 720px, 92vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Small confirmation pill */}
                <div className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/25 px-4 py-2 text-xs font-semibold text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  Acceso activo al boletín
                </div>

                {/* What happens next */}
                <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
                  <div className="ac-step-card rounded-2xl border border-border/70 bg-bg/20 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      01
                    </p>
                    <p className="mt-2 text-sm font-medium text-text">
                      Recibirás nuevas ideas directamente en tu correo.
                    </p>
                  </div>

                  <div className="ac-step-card rounded-2xl border border-border/70 bg-bg/20 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      02
                    </p>
                    <p className="mt-2 text-sm font-medium text-text">
                      Podrás seguir explorando el universo de AtomicCurious desde la web.
                    </p>
                  </div>

                  <div className="ac-step-card rounded-2xl border border-border/70 bg-bg/20 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      03
                    </p>
                    <p className="mt-2 text-sm font-medium text-text">
                      Cuando llegue algo nuevo, ya tendrás tu lugar reservado.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/es/start-here"
                    className="ac-primary-btn inline-flex items-center justify-center rounded-xl border border-accent/30 bg-accent/12 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/50 hover:bg-accent/16"
                  >
                    Empieza aquí →
                  </Link>

                  <Link
                    href="/es/posts"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2"
                  >
                    Ver posts
                  </Link>

                  <Link
                    href="/es/newsletter"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface-2"
                  >
                    Volver al boletín
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