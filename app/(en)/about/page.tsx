import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { characters } from "@/content/characters"

export const metadata: Metadata = {
  title: "About | AtomicCurious",
  description:
    "AtomicCurious is an editorial universe for science, technology, and the future—questions, rankings, and interactive experiences guided by Atom, Iris, and Core.",
  alternates: {
    canonical: "/en/about",
    languages: {
      en: "/en/about",
      es: "/es/about",
    },
  },
}

type CharacterId = "atom" | "iris" | "core"

function CharacterCard({
  id,
  label,
  title,
  body,
  href,
  cta,
}: {
  id: CharacterId
  label: string
  title: string
  body: string
  href: string
  cta: string
}) {
  const c = characters[id]

  const safeImage =
    id === "iris"
      ? "/characters/iris.png"
      : id === "atom"
      ? "/characters/atom.png"
      : "/characters/core.png"

  // Character sub-accent (controlled, not gamer)
  const accentGlow =
    id === "atom"
      ? "bg-[radial-gradient(circle_at_25%_10%,rgb(var(--accent)/0.20),transparent_60%)]"
      : id === "iris"
      ? "bg-[radial-gradient(circle_at_25%_10%,rgb(var(--accent-alt)/0.18),transparent_60%)]"
      : "bg-[radial-gradient(circle_at_25%_10%,rgb(34_197_94/0.16),transparent_60%)]"

  const badgeBorder =
    id === "atom"
      ? "border-accent/35"
      : id === "iris"
      ? "border-[rgb(var(--accent-alt)/0.35)]"
      : "border-[rgb(34_197_94/0.30)]"

  const badgeText =
    id === "atom"
      ? "text-accent"
      : id === "iris"
      ? "text-[rgb(var(--accent-alt))]"
      : "text-[rgb(34_197_94)]"

  const hoverText =
    id === "atom"
      ? "group-hover:text-accent"
      : id === "iris"
      ? "group-hover:text-[rgb(var(--accent-alt))]"
      : "group-hover:text-[rgb(34_197_94)]"

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl",
        "border border-border bg-surface-1 p-6 shadow-soft",
        "transition hover:bg-surface-2 hover:border-accent/20",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 opacity-0 transition",
          "group-hover:opacity-100",
          accentGlow,
        ].join(" ")}
      />

      <div className="relative flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-border bg-bg/40">
          <Image
            src={safeImage}
            alt={`${c.name} — ${c.role}`}
            fill
            sizes="64px"
            className="object-contain"
            priority={false}
          />
        </div>

        <div className="min-w-0">
          <span
            className={[
              "inline-flex items-center rounded-full border bg-bg/30 px-3 py-1",
              "text-[11px] font-semibold tracking-wide",
              badgeBorder,
              badgeText,
            ].join(" ")}
          >
            {label}
          </span>

          <p className="mt-2 text-sm font-semibold text-text">
            {c.name} <span className="text-muted font-medium">· {c.age}</span>
          </p>
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-semibold text-text">{title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">{body}</p>

      <Link
        href={href}
        className={[
          "relative mt-6 inline-flex items-center gap-2",
          "text-sm font-semibold text-text transition",
          hoverText,
        ].join(" ")}
      >
        {cta} <span aria-hidden>→</span>
      </Link>
    </div>
  )
}

function StepCard({
  n,
  title,
  body,
}: {
  n: string
  title: string
  body: string
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-bg/35 text-sm font-semibold text-text">
          {n}
        </span>
        <div>
          <p className="text-sm font-semibold text-text">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="relative w-full overflow-hidden bg-bg">
      {/* Background: editorial/cinematic, slightly more present */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute -top-28 left-0 h-[560px] w-[820px] bg-[radial-gradient(circle_at_25%_25%,rgb(var(--accent)/0.18),transparent_62%)]" />
        <div className="absolute -bottom-44 right-0 h-[560px] w-[820px] bg-[radial-gradient(circle_at_75%_55%,rgb(var(--accent-alt)/0.13),transparent_64%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_20%_30%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_80%_35%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_40%_80%,#fff_1px,transparent_1.5px)] [background-size:420px_420px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,transparent_55%,rgb(0_0_0/0.60)_100%)] opacity-80" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-muted">
            ATOMICCURIOUS · ABOUT
          </p>

          {/* Credibility */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
              Publishing since 2023
            </span>
          </div>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            An editorial universe for curiosity.
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            AtomicCurious explores science, technology, and the future with a
            simple philosophy:{" "}
            <span className="text-text font-medium">
              less noise, better questions
            </span>
            . Here you’ll find stories that spark wonder, rankings that clarify,
            and interactive formats that teach through play.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/en/start-here"
              className={[
                "inline-flex items-center justify-center rounded-xl",
                "bg-accent px-6 py-3 text-sm font-semibold text-bg",
                "shadow-accent transition hover:brightness-110",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
              ].join(" ")}
            >
              Start here <span aria-hidden className="ml-2">→</span>
            </Link>

            <Link
              href="/en/newsletter"
              className={[
                "inline-flex items-center justify-center rounded-xl",
                "border border-border bg-surface-1 px-6 py-3",
                "text-sm font-semibold text-text transition",
                "hover:bg-surface-2 hover:border-accent/30 hover:text-accent",
              ].join(" ")}
            >
              Join the newsletter <span aria-hidden className="ml-2">→</span>
            </Link>
          </div>
        </header>

        {/* Mission */}
        <section className="mt-14 border-t border-border pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            Mission
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Make complex ideas feel simple
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We translate intimidating topics into clear mental models—
                without watering them down.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Keep it cinematic, not noisy
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Strong visuals, tight writing, and calm design—so the signal
                stays sharp.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Build a universe you can return to
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Videos spark curiosity. The site keeps knowledge searchable,
                structured, and useful.
              </p>
            </div>
          </div>
        </section>

        {/* The system */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-text">
              The system
            </h2>
            <p className="text-muted">
              From wonder to clarity: every piece becomes something reusable.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StepCard
              n="1"
              title="Video → curiosity"
              body="A short video opens the question and sets the cinematic tone."
            />
            <StepCard
              n="2"
              title="Post → understanding"
              body="The site turns the idea into structure: clear, searchable, and easy to revisit."
            />
            <StepCard
              n="3"
              title="Resources → depth"
              body="When it truly helps, we add resources so you can go deeper without getting lost."
            />
          </div>

          <div className="mt-6">
            <Link
              href="/en/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              Browse posts <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Choose your path */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-text">
              Choose your path
            </h2>
            <p className="text-muted">
              Three formats. One shared curiosity.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <CharacterCard
              id="atom"
              label="CURIOSITY · ATOM"
              title="Big questions and “how is that possible?” moments"
              body="Strange facts, surprising phenomena, and stories that make you pause."
              href="/en/posts?format=curiosity"
              cta="Explore Curiosity"
            />

            <CharacterCard
              id="iris"
              label="RANKED · IRIS"
              title="Rankings, comparisons, and clarity"
              body="Lists, comparisons, and sharp frameworks to navigate complexity."
              href="/en/posts?format=ranked"
              cta="Explore Ranked"
            />

            <CharacterCard
              id="core"
              label="QUIZ · CORE"
              title="Fast challenges and interactive learning"
              body="Quizzes and playful tests that reveal what you know—and what you’ll love learning next."
              href="/en/posts?format=quiz"
              cta="Explore Quiz"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/en/community"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              Join the community <span aria-hidden>→</span>
            </Link>
            <Link
              href="/en/newsletter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              Get the newsletter <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* What to expect */}
        <section className="mt-14 border-t border-border pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            What to expect
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Videos → Posts → Resources
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every video becomes a searchable post on the site, plus curated
                resources when they genuinely help.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Newsletter as the signal
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                One calm weekly email: new drops, experiments, and downloads—no
                spam, no noise.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface-1 p-8 shadow-soft sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-text">
                  Join the AtomicCurious Newsletter
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Weekly sparks of science, technology, and future-thinking—no
                  noise.
                </p>
              </div>

              <Link
                href="/en/newsletter"
                className={[
                  "inline-flex items-center justify-center rounded-xl",
                  "bg-accent px-6 py-3 text-sm font-semibold text-bg",
                  "shadow-accent transition hover:brightness-110",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                ].join(" ")}
              >
                Join the newsletter <span aria-hidden className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
