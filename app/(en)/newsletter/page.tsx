// app/(en)/newsletter/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Newsletter | AtomicCurious",
  description:
    "Early access to new ideas, tools and discoveries. Launching March 21, 2026.",
  alternates: {
    canonical: "/newsletter",
    languages: {
      en: "/newsletter",
      es: "/es/newsletter",
    },
  },
}

const LAUNCH_DATE = "March 21, 2026"

/**
 * ✅ Pre-launch behavior (recommended):
 * - Show ONE simple coming-soon screen (Core waiting + short copy + date)
 * - Keep the full dynamic newsletter page commented below so nothing is lost.
 *
 * Image path (in /public):
 * /images/sections/Community/Core_Secciones_Inactivas.webp
 */

const COMING_SOON_CSS = `
.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(var(--accent),0.10), transparent 55%),
    radial-gradient(circle at 70% 40%, rgba(var(--accent-alt),0.08), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 55%);
  mix-blend-mode: normal;
}
`

function ComingSoonNewsletter() {
  return (
    <section className="relative w-full overflow-hidden bg-bg">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,rgb(var(--accent-alt)/0.07),transparent_62%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute inset-0 ac-grain" />

            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
              <div className="relative aspect-video w-full">
                {/* Subtle fallback gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(var(--accent),0.16),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(var(--accent-alt),0.12),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_60%)]" />

                <Image
                  src="/images/sections/Community/Core_Secciones_Inactivas.webp"
                  alt="Core waiting for the Newsletter to launch"
                  fill
                  sizes="(min-width: 1024px) 960px, 92vw"
                  className="object-cover"
                  priority
                />

                {/* Premium vignette */}
                <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] bg-black/35" />

                {/* Label */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  COMING SOON
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="relative mt-6 text-center">
              <p className="text-xs font-semibold tracking-wide text-muted">
                ATOMICCURIOUS · NEWSLETTER
              </p>

              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                Newsletter
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
                Early access to new ideas, tools and discoveries.
              </p>

              <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/25 px-4 py-2 text-xs font-semibold text-text shadow-soft backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                Launching <span className="text-text">{LAUNCH_DATE}</span>
              </div>

              <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
                One calm weekly email. Clear. Useful. No noise.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/posts"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-border bg-bg/35 px-5 py-2.5
                    text-sm font-semibold text-text
                    transition hover:border-accent/35 hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                    focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  Browse posts →
                </Link>

                <Link
                  href="/start-here"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-border bg-bg/35 px-5 py-2.5
                    text-sm font-semibold text-text
                    transition hover:border-accent/35 hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                    focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  Start here →
                </Link>

                <Link
                  href="/"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-border px-5 py-2.5
                    text-sm font-semibold text-text
                    transition hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                    focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  Back home
                </Link>
              </div>
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

      {/* ✅ Minimal pre-launch page */}
      <ComingSoonNewsletter />

      {/* ============================================================
         FUTURE NEWSLETTER PAGE (kept for March 21, 2026 activation)
         - Nothing removed. Everything is preserved below.
         - To activate: delete this comment wrapper and remove ComingSoonNewsletter above.
      ============================================================ */}

      {/*
      // ORIGINAL / FULL NEWSLETTER (preserved)

      const LAUNCH_HREF = "#launch"

      function HostBadge() {
        return (
          <>
            <span className="ac-host ac-host-atom inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
              Atom · Curiosity
            </span>
            <span className="ac-host ac-host-iris inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
              Iris · Ranked
            </span>
            <span className="ac-host ac-host-core inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
              Core · Quiz
            </span>
          </>
        )
      }

      function HostCopy() {
        return (
          <>
            <h1 className="ac-title ac-title-atom mt-5 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Early access to new ideas, tools and discoveries
            </h1>
            <h1 className="ac-title ac-title-iris mt-5 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Early access with clarity and structure
            </h1>
            <h1 className="ac-title ac-title-core mt-5 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Early access to think by playing
            </h1>

            <p className="ac-sub ac-sub-atom mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Short ideas that spark wonder, strange questions worth holding onto, and links that expand how you see the
              world.
            </p>
            <p className="ac-sub ac-sub-iris mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Clean summaries, ranked insights, and mental models you can reuse — no hype, no filler.
            </p>
            <p className="ac-sub ac-sub-core mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Prompts, challenges, and playful experiments that sharpen how you think, not just what you know.
            </p>
          </>
        )
      }

      function HostVisual() {
        return (
          <div
            className={[
              "relative overflow-hidden rounded-3xl border",
              "border-border bg-surface-1 shadow-soft",
            ].join(" ")}
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/sections/newsletter/atom.webp"
                alt="Atom — Newsletter"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="ac-hero ac-hero-atom object-cover"
                priority
              />
              <Image
                src="/images/sections/newsletter/iris.webp"
                alt="Iris — Newsletter"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="ac-hero ac-hero-iris object-cover"
                priority
              />
              <Image
                src="/images/sections/newsletter/core.webp"
                alt="Core — Newsletter"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="ac-hero ac-hero-core object-cover"
                priority
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.42))",
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 50% at 50% 10%, rgb(var(--accent)/0.14), transparent 70%)",
                }}
              />

              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-soft backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                LAUNCHING {LAUNCH_DATE.toUpperCase()}
              </div>
            </div>
          </div>
        )
      }

      function ValueCard({
        title,
        items,
      }: {
        title: string
        items: string[]
      }) {
        return (
          <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
            <p className="text-sm font-semibold text-text">{title}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {items.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
        )
      }

      function ComingSoonNotice() {
        return (
          <div
            id="launch"
            className="mt-6 rounded-2xl border border-border/70 bg-bg/30 p-5 shadow-soft backdrop-blur"
          >
            <p className="text-xs font-semibold tracking-wide text-muted">
              COMING SOON
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Newsletter launches{" "}
              <span className="text-text font-semibold">{LAUNCH_DATE}</span>. Until then, you can browse
              posts and explore the universe.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/posts"
                className="
                  inline-flex items-center justify-center rounded-xl
                  border border-border bg-bg/35 px-5 py-2.5
                  text-sm font-semibold text-text
                  transition hover:border-accent/35 hover:bg-surface-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                  focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                "
              >
                Browse posts →
              </Link>
              <Link
                href="/start-here"
                className="
                  inline-flex items-center justify-center rounded-xl
                  border border-border bg-bg/35 px-5 py-2.5
                  text-sm font-semibold text-text
                  transition hover:border-accent/35 hover:bg-surface-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                  focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                "
              >
                Start here →
              </Link>
            </div>
          </div>
        )
      }

      export default function FutureNewsletterPage() {
        return (
          <main className="w-full" data-chmode="host">
            <style>{`
              .ac-host,
              .ac-title,
              .ac-sub,
              .ac-hero {
                display: none;
              }

              body:not([data-character]) .ac-host-atom,
              body:not([data-character]) .ac-title-atom,
              body:not([data-character]) .ac-sub-atom,
              body:not([data-character]) .ac-hero-atom,
              html:not([data-character]) .ac-host-atom,
              html:not([data-character]) .ac-title-atom,
              html:not([data-character]) .ac-sub-atom,
              html:not([data-character]) .ac-hero-atom {
                display: inline-flex;
              }
              body:not([data-character]) .ac-title-atom,
              html:not([data-character]) .ac-title-atom,
              body:not([data-character]) .ac-sub-atom,
              html:not([data-character]) .ac-sub-atom,
              body:not([data-character]) .ac-hero-atom,
              html:not([data-character]) .ac-hero-atom {
                display: block;
              }

              body[data-character="atom"] .ac-host-atom,
              body[data-character="atom"] .ac-title-atom,
              body[data-character="atom"] .ac-sub-atom,
              body[data-character="atom"] .ac-hero-atom,
              html[data-character="atom"] .ac-host-atom,
              html[data-character="atom"] .ac-title-atom,
              html[data-character="atom"] .ac-sub-atom,
              html[data-character="atom"] .ac-hero-atom {
                display: inline-flex;
              }
              body[data-character="atom"] .ac-title-atom,
              html[data-character="atom"] .ac-title-atom,
              body[data-character="atom"] .ac-sub-atom,
              html[data-character="atom"] .ac-sub-atom,
              body[data-character="atom"] .ac-hero-atom,
              html[data-character="atom"] .ac-hero-atom {
                display: block;
              }

              body[data-character="iris"] .ac-host-iris,
              body[data-character="iris"] .ac-title-iris,
              body[data-character="iris"] .ac-sub-iris,
              body[data-character="iris"] .ac-hero-iris,
              html[data-character="iris"] .ac-host-iris,
              html[data-character="iris"] .ac-title-iris,
              html[data-character="iris"] .ac-sub-iris,
              html[data-character="iris"] .ac-hero-iris {
                display: inline-flex;
              }
              body[data-character="iris"] .ac-title-iris,
              html[data-character="iris"] .ac-title-iris,
              body[data-character="iris"] .ac-sub-iris,
              html[data-character="iris"] .ac-sub-iris,
              body[data-character="iris"] .ac-hero-iris,
              html[data-character="iris"] .ac-hero-iris {
                display: block;
              }

              body[data-character="core"] .ac-host-core,
              body[data-character="core"] .ac-title-core,
              body[data-character="core"] .ac-sub-core,
              body[data-character="core"] .ac-hero-core,
              html[data-character="core"] .ac-host-core,
              html[data-character="core"] .ac-title-core,
              html[data-character="core"] .ac-sub-core,
              html[data-character="core"] .ac-hero-core {
                display: inline-flex;
              }
              body[data-character="core"] .ac-title-core,
              html[data-character="core"] .ac-title-core,
              body[data-character="core"] .ac-sub-core,
              html[data-character="core"] .ac-sub-core,
              body[data-character="core"] .ac-hero-core,
              html[data-character="core"] .ac-hero-core {
                display: block;
              }
            `}</style>

            <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
              <section className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="order-2 lg:order-1">
                  <p className="text-xs font-medium tracking-wide text-muted">
                    ATOMICCURIOUS · NEWSLETTER
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <HostBadge />
                    <span className="inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
                      1 email / week · no spam
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
                      Launching {LAUNCH_DATE}
                    </span>
                  </div>

                  <HostCopy />
                  <ComingSoonNotice />

                  <div className="mt-8 flex flex-wrap gap-4 text-sm">
                    <Link href="/posts" className="font-semibold text-text hover:text-accent">
                      Browse posts →
                    </Link>
                    <Link href="/start-here" className="font-semibold text-text hover:text-accent">
                      Start here →
                    </Link>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <HostVisual />
                </div>
              </section>

              <section className="mt-14 grid gap-5 md:grid-cols-3">
                <ValueCard
                  title="What you’ll get"
                  items={[
                    "One core idea worth thinking about",
                    "Links to the latest posts and experiments",
                    "Early access to future resources and drops",
                  ]}
                />

                <ValueCard
                  title="What you won’t get"
                  items={[
                    "Daily spam or noisy promos",
                    "Hype, doomscrolling, or filler",
                    "Random topics with no structure",
                  ]}
                />

                <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
                  <p className="text-sm font-semibold text-text">Who it’s for</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    People who want{" "}
                    <span className="text-text font-semibold">calm depth</span>: curiosity with structure,
                    and ideas you can actually reuse.
                  </p>

                  <div className="mt-6 rounded-xl border border-border bg-bg/35 p-4">
                    <p className="text-xs font-semibold tracking-wide text-muted">PROMISE</p>
                    <p className="mt-2 text-sm text-muted">
                      One weekly email. Clear. Useful. No noise.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-14 rounded-3xl border border-border bg-surface-1 p-8 text-center shadow-soft sm:p-10">
                <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                  Join the weekly signal
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-base text-muted">
                  If AtomicCurious clicks with you, the newsletter is the cleanest way to keep up.
                </p>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <a
                    href={LAUNCH_HREF}
                    className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-bg shadow-accent transition hover:brightness-110"
                  >
                    Launch details
                  </a>
                  <Link
                    href="/posts"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-8 py-4 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2"
                  >
                    Browse posts
                  </Link>
                </div>

                <p className="mt-4 text-xs text-muted">
                  Launching {LAUNCH_DATE}. One email per week after that.
                </p>
              </section>
            </div>
          </main>
        )
      }
      */}
    </main>
  )
}
