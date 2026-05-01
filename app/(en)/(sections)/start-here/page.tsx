// app/(en)/start-here/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { latestPostEn as LATEST_POST } from "@/content/posts.en"
import SignatureBackdrop from "@/components/SignatureBackdrop"
import { formatPostDate } from "@/lib/posts-utils"

export const metadata: Metadata = {
  title: "Start Here | AtomicCurious",
  description:
    "New to AtomicCurious? Start here to explore fascinating curiosities, unique rankings, and interactive quizzes about science, culture, and what it means to be human.",
  alternates: {
    canonical: "/start-here",
    languages: {
      en: "/start-here",
      es: "/es/start-here",
    },
  },
}

function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
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
        style={{ background: "rgb(var(--ac-accent) / 0.65)" }}
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
      ].join(" ")}
      style={{
        borderColor: "rgb(var(--ac-accent) / 0.22)",
        background: "rgb(var(--ac-accent) / 0.07)",
        color: "rgb(var(--ac-accent) / 0.95)",
      }}
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
          background:
            "radial-gradient(circle at 30% 20%, rgb(var(--ac-accent) / 0.16), transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border"
              style={{
                borderColor: "rgb(var(--border) / 0.70)",
                background: "rgb(var(--bg) / 0.35)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "rgb(var(--ac-accent) / 0.95)" }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-[12px] transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgb(var(--ac-accent) / 0.12)" }}
              />
            </span>

            <AccentMark label={label} />
          </div>

          <span className="text-[rgb(var(--text)/0.45)] transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
        </div>

        <p className="text-lg font-bold text-text">{name}</p>
        <p className="mt-2 min-h-[72px] text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">
          {description}
        </p>

        <div className="mt-4 rounded-xl border border-[rgb(var(--border)/0.45)] bg-[rgb(var(--bg)/0.18)] px-4 py-3">
          <p className="text-[11px] font-semibold tracking-wide text-[rgb(var(--text)/0.48)]">
            EXPLORATION EXAMPLES
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--text)/0.66)]">{examples}</p>
        </div>

        <div
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold"
          style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
        >
          Explore <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  )
}

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
        <Image
          src="/images/sections/start-here/atom_start_here.webp"
          alt="Your guide"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="ac-ch ac-ch-atom object-contain p-8 transition-transform duration-700 group-hover:scale-105"
          priority
        />

        <Image
          src="/images/sections/start-here/iris_start_here.webp"
          alt="Your guide"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="ac-ch ac-ch-iris object-contain p-8 transition-transform duration-700 group-hover:scale-105"
          priority
        />

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
            background:
              "radial-gradient(circle at 50% 50%, rgb(var(--ac-accent) / 0.12), transparent 62%)",
          }}
        />
      </div>

      <div
        className={[
          "absolute -bottom-4 -right-4 rounded-2xl border px-6 py-3 backdrop-blur-md",
          "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.70)]",
          "ac-shadow-card transition-all duration-500",
          "group-hover:-translate-y-1 group-hover:border-[rgb(var(--border)/0.92)]",
        ].join(" ")}
      >
        <p className="text-[10px] font-semibold tracking-wide text-[rgb(var(--text)/0.55)]">
          YOUR GUIDE
        </p>

        <p
          className="ac-guide ac-guide-atom text-lg font-bold"
          style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
        >
          ATOM
        </p>
        <p
          className="ac-guide ac-guide-iris text-lg font-bold"
          style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
        >
          IRIS
        </p>
        <p
          className="ac-guide ac-guide-core text-lg font-bold"
          style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
        >
          CORE
        </p>
      </div>
    </div>
  )
}

function CharacterWelcome() {
  return (
    <div
      className={[
        "mt-14",
        "h-[200px] overflow-hidden",
        "rounded-2xl border px-7 pt-6 pb-4 backdrop-blur-sm",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)]",
        "ac-shadow-card",
      ].join(" ")}
    >
      <p
        className="ac-welcome ac-welcome-atom translate-y-[5px] text-base font-semibold"
        style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
      >
        Hey — I’m Atom
      </p>

      <p
        className="ac-welcome ac-welcome-iris translate-y-[-17px] text-base font-semibold"
        style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
      >
        Hi — I’m Iris
      </p>

      <p
        className="ac-welcome ac-welcome-core translate-y-[-37px] text-sm font-semibold"
        style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
      >
        Boom — I’m Core
      </p>

      <p className="mt-3 translate-y-[-20px] text-justify hyphens-auto text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">
        <span className="ac-welcome ac-welcome-atom block">
          I’ll guide you through questions that seem simple, but can transform how you understand the human, the everyday, and the extraordinary.
        </span>

        <span className="ac-welcome ac-welcome-iris block -translate-y-[40px] text-justify hyphens-auto">
          I’ll guide you through rankings and comparisons with clarity — not to hand you an answer, but to help you find your own.
        </span>

        <span className="ac-welcome ac-welcome-core block -translate-y-[87px] text-justify hyphens-auto">
          I’ll guide you through interactive challenges and unexpected connections — fast, playful, and precise. Let’s see how far you can go.
        </span>
      </p>
    </div>
  )
}

function CharacterTip() {
  return (
    <div
      className={[
        "mt-23",
        "h-[165px] overflow-hidden",
        "rounded-xl border px-5 pt-4 pb-4 backdrop-blur-sm sm:px-6 sm:pt-5 sm:pb-5",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)]",
        "ac-shadow-card",
      ].join(" ")}
    >
      <div className="ac-tip ac-tip-atom">
        <p
          className="translate-y-[10px] text-sm font-semibold"
          style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
        >
          Atom’s tip:
        </p>
        <p className="mt-2 translate-y-[20px] text-sm leading-relaxed text-[rgb(var(--text)/0.75)]">
          Start with whatever sparks a real question — that’s where it truly begins.
        </p>
      </div>

      <div className="ac-tip ac-tip-iris">
        <p
          className="translate-y-[-60px] text-sm font-semibold"
          style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
        >
          Iris’s tip:
        </p>
        <p className="mt-2 translate-y-[-50px] text-sm leading-relaxed text-[rgb(var(--text)/0.75)]">
          Don’t stop at the first thing you see — that’s where it starts getting interesting.
        </p>
      </div>

      <div className="ac-tip ac-tip-core">
        <p
          className="translate-y-[-110px] text-sm font-semibold"
          style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
        >
          Core’s tip:
        </p>
        <p className="mt-2 translate-y-[-100px] text-sm leading-relaxed text-[rgb(var(--text)/0.75)]">
          Not everyone who answers is curious. The curious ones are the ones who ask why.
        </p>
      </div>
    </div>
  )
}

export default function Page() {
  const latestSlug = LATEST_POST?.slug
  const latestHref = latestSlug ? `/posts/${latestSlug}` : "/posts"

  return (
    <main className="relative w-full overflow-x-hidden bg-bg text-text" data-chmode="host">
      <SignatureBackdrop />

      <style>{`
        /* ── Character accent tokens ── */
        html:not([data-character]),
        body:not([data-character]),
        html[data-character="atom"],
        body[data-character="atom"] {
          --ac-accent: 52 211 153;
        }
        html[data-character="iris"],
        body[data-character="iris"] {
          --ac-accent: 34 211 238;
        }
        html[data-character="core"],
        body[data-character="core"] {
          --ac-accent: 251 146 60;
        }

        /* ── Character visibility ── */
        .ac-ch,
        .ac-guide,
        .ac-welcome,
        .ac-tip {
          opacity: 0;
          transform: translateY(2px) scale(0.985);
          transition: opacity 220ms ease, transform 220ms ease;
          pointer-events: none;
        }

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
        <header className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="relative order-2 lg:order-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-16 opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at center, rgb(var(--ac-accent) / 0.14), transparent 66%)",
                }}
              />
              <CharacterVisual />
              <CharacterWelcome />
            </div>

            <div className="order-1 max-w-2xl lg:order-2">
              <p className="text-xs font-medium tracking-wide text-[rgb(var(--text)/0.55)]">
                ATOMICCURIOUS · START HERE
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Pill>Read time: 3–5 min</Pill>
                <Pill>Best entry point</Pill>
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl">
                From wonder to clarity. Start here.
              </h1>

              <p className="mt-6 text-pretty text-base leading-relaxed text-[rgb(var(--text)/0.74)] sm:text-lg">
                If you’re new here, AtomicCurious guides you through three paths:{" "}
                <span className="font-semibold text-text">questions that spark curiosity</span>,{" "}
                <span className="font-semibold text-text">rankings that surprise</span>, and{" "}
                <span className="font-semibold text-text">quizzes that let you explore through play</span>.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={latestHref}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold text-black transition-all"
                  style={{
                    background: "rgb(var(--ac-accent) / 0.92)",
                    boxShadow: "0 10px 34px rgb(var(--ac-accent) / 0.18)",
                  }}
                >
                  Start with the latest <span aria-hidden className="ml-2">→</span>
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
                  View all posts <span aria-hidden className="ml-2">→</span>
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

              <CharacterTip />
            </div>
          </div>
        </header>

        <section className="mt-24 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium tracking-wide text-[rgb(var(--text)/0.55)]">
              THREE WAYS TO EXPLORE
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-text">Choose your path</h2>
            <p className="max-w-2xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              Each format has a different rhythm. Explore all three — one will connect with you instantly.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FormatCard
              label="CURIOSITY · ATOM"
              name="Atom · Curiosity"
              description="For people who don’t settle for the first answer — there’s always something more underneath."
              examples="Why does time feel different depending on what you’re living through? Why do we remember some things more than others?"
              href="/posts?format=curiosity"
            />

            <FormatCard
              label="RANKING · IRIS"
              name="Iris · Ranking"
              description="For people who want to understand what they’re seeing more clearly: compare, sort, and draw their own conclusions."
              examples="Games that changed an industry. Films that won without you noticing. Inventions that redefined modern life."
              href="/posts?format=ranked"
            />

            <FormatCard
              label="QUIZ · CORE"
              name="Core · Quiz"
              description="For people who enjoy testing what they know — and discovering they can always go further."
              examples="An unexpected chain from dinosaurs to smartphones in 6 steps. Guess the invention from its effects."
              href="/posts?format=quiz"
            />
          </div>
        </section>

        <section className="mt-20 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-text">Latest exploration</h2>
            <p className="text-base text-[rgb(var(--text)/0.72)]">
              The fastest way in: start with the latest, then let curiosity do the rest.
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
              <span className="text-xs text-[rgb(var(--text)/0.50)]">{LATEST_POST ? formatPostDate(LATEST_POST.date, "en-US") : ""}
              </span>
            </div>

            <h3 className="mt-4 text-balance text-2xl font-semibold text-text sm:text-3xl">
              {LATEST_POST?.title ?? "Explore the latest"}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              {LATEST_POST?.description ??
                "Start with what’s newest: it’s usually the most polished, the clearest, and the most cinematic."}
            </p>

            <div
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-transform hover:translate-x-0.5"
              style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
            >
              Read now <span aria-hidden>→</span>
            </div>
          </Link>

          <div className="mt-6">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors"
              style={{ ["--tw-text-opacity" as string]: "1" }}
              onMouseEnter={undefined}
            >
              <span className="ac-text-hover">View all explorations →</span>
            </Link>
          </div>
        </section>

        <section className="mt-20 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-text">
              How AtomicCurious works
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              From wonder to clarity — a simple flow for learning.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
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

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--ac-accent)/0.95)]"
            >
              View the newsletter <span aria-hidden>→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--ac-accent)/0.95)]"
            >
              Explore the universe <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}