import Link from "next/link"

export default function Page() {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-white/60">
            ATOMICCURIOUS · ABOUT
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            About AtomicCurious.
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            AtomicCurious is a cinematic learning universe for science,
            technology, and the future—built to turn curiosity into clarity.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/en/start-here"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Start here
            </Link>
            <Link
              href="/en/newsletter"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              Join the newsletter
            </Link>
          </div>
        </header>

        {/* Mission */}
        <section className="mt-14 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Mission
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Make complex ideas feel simple
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                We translate intimidating topics into clear mental models—without
                watering them down.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Keep it cinematic, not noisy
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Strong visuals, tight writing, and calm design—so the signal
                stays sharp.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Build a universe you can return to
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Videos spark curiosity. The site keeps the knowledge searchable,
                structured, and useful.
              </p>
            </div>
          </div>
        </section>

        {/* Characters */}
        <section className="mt-14 border-t border-white/10 pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              The minds behind AtomicCurious
            </h2>
            <p className="text-white/60">
              Three perspectives. One mission.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-xs font-medium tracking-wide text-white/60">
                ATOM · CURIOSITY
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                The spark
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Big questions, strange facts, and the “wait… how is that
                possible?” moments that pull you in.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-xs font-medium tracking-wide text-white/60">
                IRIS · RANKED
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                The analyst
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Comparisons, rankings, and frameworks—the clearest path through
                complexity.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-xs font-medium tracking-wide text-white/60">
                CORE · QUIZ
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                The challenger
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Playful tests that reveal what you know, what you don’t, and
                what you’ll love learning next.
              </p>
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="mt-14 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            What to expect
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Videos → Posts → Resources
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Every video becomes a searchable post on the site, plus curated
                resources when they genuinely help.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Newsletter as the signal
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                One calm weekly email: new drops, experiments, and downloads—no
                spam, no noise.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-white">
                  Join the AtomicCurious Newsletter
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Weekly sparks of science, technology, and future-thinking—no
                  noise.
                </p>
              </div>
              <Link
                href="/en/newsletter"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Join the newsletter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

