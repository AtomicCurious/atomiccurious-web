import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Subscription confirmed | AtomicCurious",
  description: "Your AtomicCurious newsletter subscription is confirmed.",
  alternates: {
    canonical: "/newsletter/confirmed",
    languages: {
      en: "/newsletter/confirmed",
      es: "/es/newsletter/confirmed",
    },
  },
}

const CONFIRMED_CSS = `
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
  height: 220px;
  pointer-events: none;
  filter: blur(28px);
  opacity: 0.9;
  background: radial-gradient(ellipse at center, rgba(52,211,153,0.14), transparent 70%);
}

.ac-confirm-rule{
  width: 90px;
  height: 1px;
  margin: 0 auto;
  border-radius: 9999px;
  background: linear-gradient(to right, transparent, rgba(52,211,153,0.7), transparent);
}
`

export default function Page() {
  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: CONFIRMED_CSS }} />

      <section className="relative w-full overflow-hidden bg-bg">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
          <div className="mx-auto w-full max-w-4xl">
            <div className="ac-editorial-shell relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-10">

              <div className="pointer-events-none absolute inset-0 ac-grain" />

              <div className="relative text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  SUBSCRIPTION CONFIRMED
                </div>

                {/* Image */}
                <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                    <Image
                      src="/images/sections/newsletter/newsletter_confirmed.webp"
                      alt="Welcome to AtomicCurious"
                      fill
                      sizes="(min-width: 1024px) 720px, 92vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Label */}
                <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-muted">
                  ATOMICCURIOUS · NEWSLETTER
                </p>

                {/* Title */}
                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl">
                  You’re in
                </h1>

                {/* Description */}
                <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted sm:text-lg">
                  Your access is now active.
                </p>

                {/* Visual rule */}
                <div className="mt-6">
                  <div className="ac-confirm-rule" />
                </div>

                {/* Note */}
                <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/25 px-4 py-2 text-xs font-semibold text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  You’ll receive thoughtful updates on science, technology, and the future.
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/posts"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2"
                  >
                    Browse posts →
                  </Link>

                  <Link
                    href="/start-here"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2"
                  >
                    Start here →
                  </Link>

                  <Link
                    href="/newsletter"
                    className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface-2"
                  >
                    Back to newsletter
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