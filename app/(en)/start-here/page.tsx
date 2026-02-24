// app/(en)/start-here/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { latestPostEn as LATEST_POST } from "@/content/posts.en"
import SignatureBackdrop from "@/components/SignatureBackdrop"

export const metadata: Metadata = {
  title: "Start Here | AtomicCurious",
  description:
    "New to AtomicCurious? Start here to explore mind-bending curiosities, sharp rankings, and interactive quizzes about science, culture, and what it means to be human.",
  alternates: {
    canonical: "/start-here",
    languages: { en: "/start-here", es: "/es/start-here" },
  },
}

function Pill({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1",
        "text-[11px] font-semibold tracking-wide",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] text-[rgb(var(--text)/0.78)]",
        className,
      ].join(" ")}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "rgb(var(--accent) / 0.65)" }}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}

function StepCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] backdrop-blur-sm p-6",
        "ac-shadow-card transition-all duration-300",
        "hover:bg-[rgb(var(--surface-1)/0.70)] hover:border-[rgb(var(--border)/0.90)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-60"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.10), transparent)",
        }}
      />

      <div className="relative flex items-start gap-3">
        <span
          className={[
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
            "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--bg)/0.35)]",
            "text-sm font-bold text-[rgb(var(--text)/0.86)]",
          ].join(" ")}
        >
          {n}
        </span>
        <div>
          <p className="text-base font-semibold text-text">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">{body}</p>
        </div>
      </div>
    </div>
  )
}

function AccentMark({ label }: { label: string }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1",
        "text-[11px] font-semibold tracking-wide",
        "border-[rgb(var(--accent)/0.22)] bg-[rgb(var(--accent)/0.07)] text-[rgb(var(--accent)/0.95)]",
      ].join(" ")}
    >
      {label}
    </span>
  )
}

function FormatCard({
  label,
  name,
  description,
  examples,
  href,
}: {
  label: string
  name: string
  description: string
  examples: string
  href: string
}) {
  return (
    <Link
      href={href}
      className={[
        "group relative overflow-hidden rounded-2xl border",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] backdrop-blur-sm p-6",
        "ac-shadow-card transition-all duration-500",
        "hover:bg-[rgb(var(--surface-1)/0.70)] hover:border-[rgb(var(--border)/0.92)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at 30% 20%, rgba(var(--accent)/0.16), transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border"
              style={{
                borderColor: "rgb(var(--border) / 0.70)",
                background: "rgb(var(--bg) / 0.35)",
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: "rgb(var(--accent) / 0.95)" }} />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-[12px] transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgba(var(--accent)/0.12)" }}
              />
            </span>

            <AccentMark label={label} />
          </div>

          <span className="text-[rgb(var(--text)/0.45)] transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
        </div>

        <p className="text-lg font-bold text-text">{name}</p>
        <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">{description}</p>

        <div className="mt-4 rounded-xl border border-[rgb(var(--border)/0.65)] bg-[rgb(var(--bg)/0.25)] px-4 py-3">
          <p className="text-[11px] font-semibold tracking-wide text-[rgb(var(--text)/0.50)]">EXAMPLES</p>
          <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--text)/0.68)]">{examples}</p>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent)/0.95)]">
          Explore this format <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  )
}

/** -------------------------------------------------------
 *  Character-aware blocks (SERVER SAFE)
 *  We render all 3 and show via body/html[data-character="..."].
 *  With a safe default to Atom if no data-character yet.
 *  ----------------------------------------------------- */
function CharacterVisual() {
  return (
    <div className="group relative">
      <div
        className={[
          "relative aspect-square overflow-hidden rounded-3xl border",
          "border-[rgb(var(--border)/0.70)]",
          "bg-[linear-gradient(135deg,rgb(var(--surface-1)/0.65),rgb(var(--bg)/0.25))]",
          "backdrop-blur-sm transition-all duration-500",
          "ac-shadow-card",
        ].join(" ")}
      >
        {/* ATOM */}
<Image
  src="/images/sections/start-here/atom_start_here.webp"
  alt="Your guide"
  fill
  sizes="(max-width: 1024px) 100vw, 45vw"
  className="ac-ch ac-ch-atom object-contain p-8 transition-transform duration-700 group-hover:scale-105"
  priority
/>

{/* IRIS */}
<Image
  src="/images/sections/start-here/iris_start_here.webp"
  alt="Your guide"
  fill
  sizes="(max-width: 1024px) 100vw, 45vw"
  className="ac-ch ac-ch-iris object-contain p-8 transition-transform duration-700 group-hover:scale-105"
  priority
/>

{/* CORE */}
<Image
  src="/images/sections/start-here/core_start_here.webp"
  alt="Your guide"
  fill
  sizes="(max-width: 1024px) 100vw, 45vw"
  className="ac-ch ac-ch-core object-contain p-8 transition-transform duration-700 group-hover:scale-105"
  priority
/>


        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(var(--accent)/0.12), transparent 62%)",
          }}
        />
      </div>

      {/* Floating badge */}
      <div
        className={[
          "absolute -bottom-4 -right-4 rounded-2xl border px-6 py-3 backdrop-blur-md",
          "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.70)]",
          "ac-shadow-card transition-all duration-500",
          "group-hover:-translate-y-1 group-hover:border-[rgb(var(--border)/0.92)]",
        ].join(" ")}
      >
        <p className="text-[10px] font-semibold tracking-wide text-[rgb(var(--text)/0.55)]">YOUR GUIDE</p>

        <p className="ac-guide ac-guide-atom text-lg font-bold text-[rgb(var(--accent)/0.95)]">ATOM</p>
        <p className="ac-guide ac-guide-iris text-lg font-bold text-[rgb(var(--accent)/0.95)]">IRIS</p>
        <p className="ac-guide ac-guide-core text-lg font-bold text-[rgb(var(--accent)/0.95)]">CORE</p>
      </div>
    </div>
  )
}

function CharacterWelcome() {
  return (
    <div
      className={[
        "mt-8 rounded-2xl border p-5 backdrop-blur-sm",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)]",
        "ac-shadow-card",
      ].join(" ")}
    >
      <p className="ac-welcome ac-welcome-atom text-sm font-semibold text-[rgb(var(--accent)/0.95)]">Hey — I’m Atom</p>
      <p className="ac-welcome ac-welcome-iris text-sm font-semibold text-[rgb(var(--accent)/0.95)]">Hey — I’m Iris</p>
      <p className="ac-welcome ac-welcome-core text-sm font-semibold text-[rgb(var(--accent)/0.95)]">Hey — I’m Core</p>

      <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">
        <span className="ac-welcome ac-welcome-atom">
          I’ll guide you through questions that challenge common sense, rankings that reveal patterns, and quizzes that
          connect impossible dots — without the noise.
        </span>
        <span className="ac-welcome ac-welcome-iris">
          I’ll guide you through clean rankings, sharp comparisons, and the “why” behind what you think you already
          know — with style and clarity.
        </span>
        <span className="ac-welcome ac-welcome-core">
          I’ll guide you through interactive challenges, weird connections, and the hidden structure beneath reality —
          fast, playful, and precise.
        </span>
      </p>
    </div>
  )
}

function CharacterTip() {
  return (
    <div className="mt-6 rounded-xl border border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] px-4 py-3">
      <p className="text-xs text-[rgb(var(--text)/0.72)]">
        <span className="ac-tip ac-tip-atom font-semibold text-[rgb(var(--accent)/0.95)]">Atom’s tip:</span>
        <span className="ac-tip ac-tip-iris font-semibold text-[rgb(var(--accent)/0.95)]">Iris’s tip:</span>
        <span className="ac-tip ac-tip-core font-semibold text-[rgb(var(--accent)/0.95)]">Core’s tip:</span>{" "}
        start with the newest drop — it’s usually the most refined.
      </p>
    </div>
  )
}

export default function Page() {
  const latestSlug = LATEST_POST?.slug
  const latestHref = latestSlug ? `/posts/${latestSlug}` : "/posts"

  return (
    <main className="relative w-full overflow-hidden bg-bg text-text" data-chmode="host">
      <SignatureBackdrop />

      {/* Character display rules (reacts to body/html[data-character]) */}
      <style>{`
        /* -----------------------------
           DEFAULT (SSR-safe): show ATOM
           If data-character is not set yet, Atom is visible.
           ----------------------------- */
        .ac-ch,
        .ac-guide,
        .ac-welcome,
        .ac-tip {
          opacity: 0;
          transform: translateY(2px) scale(0.985);
          transition: opacity 220ms ease, transform 220ms ease;
          pointer-events: none;
        }

        /* Default Atom when no data-character present */
        body:not([data-character]) .ac-ch-atom,
        body:not([data-character]) .ac-guide-atom,
        body:not([data-character]) .ac-welcome-atom,
        body:not([data-character]) .ac-tip-atom,
        html:not([data-character]) .ac-ch-atom,
        html:not([data-character]) .ac-guide-atom,
        html:not([data-character]) .ac-welcome-atom,
        html:not([data-character]) .ac-tip-atom {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        /* Visible per mode (body OR html) */
        body[data-character="atom"] .ac-ch-atom,
        body[data-character="atom"] .ac-guide-atom,
        body[data-character="atom"] .ac-welcome-atom,
        body[data-character="atom"] .ac-tip-atom,
        html[data-character="atom"] .ac-ch-atom,
        html[data-character="atom"] .ac-guide-atom,
        html[data-character="atom"] .ac-welcome-atom,
        html[data-character="atom"] .ac-tip-atom {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        body[data-character="iris"] .ac-ch-iris,
        body[data-character="iris"] .ac-guide-iris,
        body[data-character="iris"] .ac-welcome-iris,
        body[data-character="iris"] .ac-tip-iris,
        html[data-character="iris"] .ac-ch-iris,
        html[data-character="iris"] .ac-guide-iris,
        html[data-character="iris"] .ac-welcome-iris,
        html[data-character="iris"] .ac-tip-iris {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        body[data-character="core"] .ac-ch-core,
        body[data-character="core"] .ac-guide-core,
        body[data-character="core"] .ac-welcome-core,
        body[data-character="core"] .ac-tip-core,
        html[data-character="core"] .ac-ch-core,
        html[data-character="core"] .ac-guide-core,
        html[data-character="core"] .ac-welcome-core,
        html[data-character="core"] .ac-tip-core {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-ch,
          .ac-guide,
          .ac-welcome,
          .ac-tip {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* HERO */}
        <header className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            {/* LEFT: Character visual (changes with toggle) */}
            <div className="relative order-2 lg:order-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-16 opacity-70"
                style={{
                  background: "radial-gradient(circle at center, rgba(var(--accent)/0.14), transparent 66%)",
                }}
              />
              <CharacterVisual />
              <CharacterWelcome />
            </div>

            {/* RIGHT: Content */}
            <div className="order-1 max-w-2xl lg:order-2">
              <p className="text-xs font-medium tracking-wide text-[rgb(var(--text)/0.55)]">ATOMICCURIOUS · START HERE</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Pill>3-minute read</Pill>
                <Pill>Best entry point</Pill>
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl">
                Where curiosity becomes clarity.
              </h1>

              <p className="mt-6 text-pretty text-base leading-relaxed text-[rgb(var(--text)/0.74)] sm:text-lg">
                AtomicCurious is built for people who want{" "}
                <span className="font-semibold text-text">cinematic learning with real depth</span>. Think big questions
                that break your assumptions, clean rankings that make complexity feel simple, and interactive challenges
                that train how you think.
              </p>

              {/* CTA stack */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={latestHref}
                  className={[
                    "inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold",
                    "text-black",
                    "transition-all",
                  ].join(" ")}
                  style={{
                    background: "rgb(var(--accent) / 0.92)",
                    boxShadow: "0 10px 34px rgba(var(--accent) / 0.18)",
                  }}
                >
                  Start with the latest drop <span aria-hidden className="ml-2">→</span>
                </Link>

                <Link
                  href="/posts"
                  className={[
                    "inline-flex items-center justify-center rounded-xl border px-6 py-3.5",
                    "text-sm font-semibold transition-all",
                    "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] text-[rgb(var(--text)/0.86)]",
                    "hover:bg-[rgb(var(--surface-1)/0.75)] hover:border-[rgb(var(--border)/0.92)]",
                  ].join(" ")}
                >
                  Browse all content <span aria-hidden className="ml-2">→</span>
                </Link>

                <Link
                  href="/newsletter"
                  className={[
                    "inline-flex items-center justify-center rounded-xl border px-6 py-3.5",
                    "text-sm font-semibold transition-all",
                    "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--bg)/0.20)] text-[rgb(var(--text)/0.72)]",
                    "hover:bg-[rgb(var(--surface-1)/0.65)] hover:text-[rgb(var(--text)/0.86)] hover:border-[rgb(var(--border)/0.92)]",
                  ].join(" ")}
                >
                  Join the newsletter <span aria-hidden className="ml-2">→</span>
                </Link>
              </div>

              {/* Character tip (changes with toggle) */}
              <CharacterTip />
            </div>
          </div>
        </header>

        {/* THREE FORMATS */}
        <section className="mt-24 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium tracking-wide text-[rgb(var(--text)/0.55)]">THREE WAYS TO EXPLORE</p>
            <h2 className="text-3xl font-semibold tracking-tight text-text">Choose your format</h2>
            <p className="max-w-2xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              Each format has a different rhythm. Try all three — one will click instantly.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FormatCard
              label="CURIOSITY · ATOM"
              name="Atom · Curiosity"
              description="Questions that challenge your assumptions about how the world works."
              examples="Why can’t we just print more money? Why does time feel fast or slow? Why do dreams come in stories?"
              href="/posts?format=curiosity"
            />
            <FormatCard
              label="RANKED · IRIS"
              name="Iris · Ranked"
              description="Rankings and comparisons that reveal patterns you didn’t know you were missing."
              examples="Games that changed everything. Films with hidden Oscars. Inventions that shaped modern life."
              href="/posts?format=ranked"
            />
            <FormatCard
              label="QUIZ · CORE"
              name="Core · Quiz"
              description="Interactive challenges that connect impossible dots and sharpen your mental model."
              examples="A ‘WTF chain’ from dinosaurs to smartphones in 6 steps. Guess the invention from its side effects."
              href="/posts?format=quiz"
            />
          </div>
        </section>

        {/* LATEST POST */}
        <section className="mt-20 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-text">Latest exploration</h2>
            <p className="text-base text-[rgb(var(--text)/0.72)]">
              The fastest way in: start with what’s newest, then follow your next question.
            </p>
          </div>

          <Link
            href={latestHref}
            className={[
              "mt-8 block rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300",
              "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] ac-shadow-card",
              "hover:bg-[rgb(var(--surface-1)/0.75)] hover:border-[rgb(var(--border)/0.92)]",
            ].join(" ")}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              {LATEST_POST?.tag ? (
                <span className="rounded-full border border-[rgb(var(--border)/0.65)] bg-[rgb(var(--bg)/0.25)] px-3 py-1 text-xs font-medium text-[rgb(var(--text)/0.78)]">
                  {LATEST_POST.tag}
                </span>
              ) : (
                <span />
              )}
              <span className="text-xs text-[rgb(var(--text)/0.50)]">{LATEST_POST?.date ?? ""}</span>
            </div>

            <h3 className="mt-4 text-balance text-2xl font-semibold text-text sm:text-3xl">
              {LATEST_POST?.title ?? "Explore the newest drop"}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              {LATEST_POST?.description ?? "Start with what’s fresh — then follow whatever sparks the next question."}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent)/0.95)] transition-transform hover:translate-x-0.5">
              Read now <span aria-hidden>→</span>
            </div>
          </Link>

          <div className="mt-6">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--accent)/0.95)]"
            >
              See all explorations <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-20 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-text">How it works</h2>
            <p className="max-w-2xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              From spark to understanding — a simple flow built for curious minds who want depth without the noise.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <StepCard n="1" title="Watch" body="Each topic starts with a cinematic video designed to hook your curiosity fast." />
            <StepCard n="2" title="Read & connect" body="Go deeper with structured posts you can search, save, and revisit anytime." />
            <StepCard n="3" title="Get the signal" body="The newsletter is the filter: one email a week, no spam — only what’s worth your time." />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--accent)/0.95)]"
            >
              Check out the newsletter <span aria-hidden>→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--accent)/0.95)]"
            >
              Learn about the universe <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-20 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div
            className={[
              "relative overflow-hidden rounded-3xl border p-10 backdrop-blur-sm ac-shadow-card",
              "border-[rgb(var(--border)/0.70)]",
              "bg-[linear-gradient(135deg,rgb(var(--surface-1)/0.70),rgb(var(--bg)/0.20))]",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[80px]"
              style={{
                background: "radial-gradient(circle at center, rgba(var(--accent)/0.20), transparent 70%)",
              }}
            />

            <div className="relative text-center">
              <h2 className="text-3xl font-semibold text-text sm:text-4xl">Ready to explore?</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
                Start with the newest drop — then follow whatever question pulls you in next.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href={latestHref}
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-black transition-all"
                  style={{
                    background: "rgb(var(--accent) / 0.92)",
                    boxShadow: "0 10px 34px rgba(var(--accent) / 0.18)",
                  }}
                >
                  Start exploring <span aria-hidden className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
