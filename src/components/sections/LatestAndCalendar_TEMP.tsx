export default function LatestAndCalendar() {
  return (
    <section className="relative w-full border-t border-border/70 bg-bg">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ===================== Left: Latest Post ===================== */}
          <article
            className="
              relative overflow-hidden rounded-2xl
              border border-border/70 bg-surface-1/60
              p-6 shadow-soft backdrop-blur-xl
              dark:border-[#22D3EE]/18 dark:bg-[#0A0E12]/55
            "
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_0%,rgba(34,211,238,0.18),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_90%_20%,rgba(255,77,157,0.14),transparent_60%)]" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/40 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted dark:border-[#22D3EE]/20 dark:bg-black/20 dark:text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70 dark:bg-[#22D3EE]" />
                LATEST POST
              </div>

              <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-text sm:text-3xl dark:text-white">
                Why we dream: the hidden purpose of sleep
              </h2>

              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base dark:text-gray-300">
                A cinematic overview of what science says about dreams—and why your brain keeps
                generating them.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted/90 dark:text-gray-400">
                <span className="rounded-full border border-border/70 bg-bg/30 px-2 py-1 dark:border-white/10 dark:bg-black/20">
                  Curiosity · Atom
                </span>
                <span className="rounded-full border border-border/70 bg-bg/30 px-2 py-1 dark:border-white/10 dark:bg-black/20">
                  Sleep / Mind
                </span>
                <span className="rounded-full border border-border/70 bg-bg/30 px-2 py-1 dark:border-white/10 dark:bg-black/20">
                  2025-12-29
                </span>
              </div>

              <div className="mt-6 space-y-3 text-sm text-muted dark:text-gray-300">
                <p className="font-medium text-text/90 dark:text-white/90">
                  Dreams are not random
                </p>
                <p className="-mt-2 leading-relaxed">
                  Modern theories suggest dreams may help regulate emotions, consolidate memories,
                  and simulate threats—like a nightly mental sandbox.
                </p>

                <p className="mt-4 font-medium text-text/90 dark:text-white/90">
                  Key takeaways
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Dreams may support memory consolidation and emotional processing.</li>
                  <li>They can be a simulation space for problem-solving and pattern-building.</li>
                  <li>
                    Science still debates the “main” function—multiple roles may coexist.
                  </li>
                </ul>
              </div>

              <a
                href="/en/posts/why-we-dream"
                className="
                  group mt-7 inline-flex items-center gap-2 rounded-xl
                  border border-border/80 bg-surface-2/40 px-4 py-2.5
                  text-sm font-semibold text-text shadow-soft backdrop-blur-xl transition-all
                  hover:border-accent/35 hover:bg-surface-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  dark:border-[#22D3EE]/25 dark:bg-black/20 dark:text-white
                  dark:hover:border-[#22D3EE]/45
                "
              >
                Read post
                <span className="transition-transform group-hover:translate-x-0.5">›</span>
              </a>
            </div>
          </article>

          {/* ===================== Right: Free Calendar ===================== */}
          <aside
            className="
              relative overflow-hidden rounded-2xl
              border border-border/70 bg-surface-1/60
              p-6 shadow-soft backdrop-blur-xl
              dark:border-[#FF4D9D]/18 dark:bg-[#0A0E12]/55
            "
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(255,77,157,0.16),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_10%_30%,rgba(34,211,238,0.14),transparent_60%)]" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/40 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted dark:border-[#FF4D9D]/20 dark:bg-black/20 dark:text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-alt/70 dark:bg-[#FF4D9D]" />
                FREE DOWNLOAD
              </div>

              <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-text sm:text-3xl dark:text-white">
                AtomicCurious 2026 Science Calendar
              </h2>

              <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base dark:text-gray-300">
                Download the official 2026 calendar—free. Built for curious minds.
              </p>

              {/* Mockup */}
              <div className="mt-6">
                <div
                  className="
                    relative mx-auto aspect-[16/10] w-full max-w-[520px]
                    overflow-hidden rounded-2xl
                    border border-border/70 bg-black/20
                    shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                    dark:border-white/10
                  "
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(34,211,238,0.18),transparent_60%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_80%,rgba(255,77,157,0.16),transparent_65%)]" />

                  <img
                    src="/images/calendar/science-calendar-mock.png"
                    alt="AtomicCurious 2026 Science Calendar mockup"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <p className="mt-3 text-center text-xs text-muted dark:text-gray-400">
                  12 covers • printable • phone + desktop friendly
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/en/resources/calendar-2026"
                  className="
                    group inline-flex items-center justify-center rounded-xl
                    bg-gradient-to-r from-accent via-accent to-accent-alt
                    px-5 py-3 text-sm font-bold text-[rgb(var(--bg))]
                    shadow-[0_12px_40px_rgb(var(--accent)/0.18)]
                    transition-all hover:shadow-[0_18px_60px_rgb(var(--accent)/0.22)] hover:scale-[1.02]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                    dark:from-[#22D3EE] dark:via-[#3BDBF0] dark:to-[#FF4D9D]
                    dark:text-[#050709]
                  "
                >
                  Download free
                  <span className="ml-2 transition-transform group-hover:translate-x-0.5">›</span>
                </a>

                <a
                  href="/en/newsletter"
                  className="
                    group inline-flex items-center justify-center rounded-xl
                    border border-border/80 bg-surface-2/40 px-5 py-3
                    text-sm font-semibold text-text shadow-soft backdrop-blur-xl transition-all
                    hover:border-accent/35 hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                    dark:border-[#FF4D9D]/25 dark:bg-black/20 dark:text-white
                    dark:hover:border-[#FF4D9D]/45
                  "
                >
                  Get it via newsletter
                  <span className="ml-2 text-muted transition-transform group-hover:translate-x-0.5 dark:text-gray-400">
                    ›
                  </span>
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted/90 dark:text-gray-400">
                <span className="rounded-full border border-border/70 bg-bg/30 px-2 py-1 dark:border-white/10 dark:bg-black/20">
                  No spam
                </span>
                <span className="rounded-full border border-border/70 bg-bg/30 px-2 py-1 dark:border-white/10 dark:bg-black/20">
                  Instant access
                </span>
                <span className="rounded-full border border-border/70 bg-bg/30 px-2 py-1 dark:border-white/10 dark:bg-black/20">
                  Cancel anytime
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
