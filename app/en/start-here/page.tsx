// app/en/start-here/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { latestPostEn as LATEST_POST } from "@/content/posts.en"
import { characters } from "@/content/characters"

export const metadata: Metadata = {
  title: "Start Here | AtomicCurious",
  description:
    "New to AtomicCurious? Start here to explore science, technology, and the future through questions, rankings, and interactive experiences.",
  alternates: {
    canonical: "/en/start-here",
    languages: {
      en: "/en/start-here",
      es: "/es/start-here",
    },
  },
}

function CharacterCard({
  id,
  label,
  title,
  body,
  href,
  cta,
}: {
  id: "atom" | "iris" | "core"
  label: string
  title: string
  body: string
  href: string
  cta: string
}) {
  const c = characters[id]

  // Force lowercase to match your real filenames in /public/characters/
  const safeImage =
    id === "iris"
      ? "/characters/iris.png"
      : id === "atom"
      ? "/characters/atom.png"
      : "/characters/core.png"

  return (
    <div className="group rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/30">
      <div className="flex items-center gap-4">
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
          <p className="text-xs font-medium tracking-wide text-muted">{label}</p>
          <p className="mt-1 text-sm font-semibold text-text">
            {c.name} <span className="text-muted font-medium">· {c.age}</span>
          </p>
        </div>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-text">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>

      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text transition group-hover:text-accent"
      >
        {cta} <span aria-hidden>→</span>
      </Link>
    </div>
  )
}

export default function Page() {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-muted">
            ATOMICCURIOUS · START HERE
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Start here.
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            If you’re new, this is your entry point. Explore at your own pace:
            mind-bending questions, clean rankings, and playful challenges—built
            to turn curiosity into clarity.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/en/posts"
              className="
                inline-flex items-center justify-center rounded-xl
                bg-accent px-6 py-3 text-sm font-semibold text-bg
                shadow-accent transition hover:brightness-110
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70
              "
            >
              Browse posts
            </Link>

            <Link
              href="/en/newsletter"
              className="
                inline-flex items-center justify-center rounded-xl
                border border-border bg-surface-1 px-6 py-3
                text-sm font-semibold text-text transition
                hover:bg-surface-2 hover:border-accent/30 hover:text-accent
              "
            >
              Join the newsletter
            </Link>
          </div>
        </header>

        {/* Latest post */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-text">
              Latest post
            </h2>
            <p className="text-muted">
              Start with the newest drop, then roam freely.
            </p>
          </div>

          <Link
            href={`/en/posts/${LATEST_POST.slug}`}
            className="
              mt-8 block rounded-2xl
              border border-border bg-surface-1 p-6 shadow-soft transition
              hover:bg-surface-2 hover:border-accent/30
            "
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              {LATEST_POST.tag ? (
                <span className="rounded-full border border-border bg-bg/30 px-3 py-1 text-xs text-muted">
                  {LATEST_POST.tag}
                </span>
              ) : (
                <span />
              )}
              <span className="text-xs text-muted">{LATEST_POST.date}</span>
            </div>

            <h3 className="mt-4 text-balance text-2xl font-semibold text-text">
              {LATEST_POST.title}
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              {LATEST_POST.description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text">
              Read the post <span aria-hidden>→</span>
            </div>
          </Link>

          <div className="mt-6">
            <Link
              href="/en/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              See all posts <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Paths */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-text">
              Choose your path
            </h2>
            <p className="text-muted">Three formats. One universe.</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <CharacterCard
              id="atom"
              label="CURIOSITY · ATOM"
              title='Big questions & “wait… how is that possible?” moments'
              body="Strange phenomena, wild facts, and cinematic explainers that hook fast."
              href="/en/posts?format=curiosity"
              cta="Explore Curiosity"
            />

            <CharacterCard
              id="iris"
              label="RANKED · IRIS"
              title="Rankings, comparisons & clarity"
              body="Lists and frameworks that give structure—and the cleanest path through complexity."
              href="/en/posts?format=ranked"
              cta="Explore Ranked"
            />

            <CharacterCard
              id="core"
              label="QUIZ · CORE"
              title="Quick challenges & interactive learning"
              body="Playful quizzes that reveal what you know—and what you’ll love learning next."
              href="/en/posts?format=quiz"
              cta="Explore Quiz"
            />
          </div>
        </section>

        {/* How it works */}
        <section className="mt-14 border-t border-border pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            How AtomicCurious works
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-bg/40 p-6">
              <p className="text-sm font-semibold text-text">1) Watch</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Each topic starts with a short video designed to spark curiosity.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-bg/40 p-6">
              <p className="text-sm font-semibold text-text">2) Read</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Then go deeper with clear posts you can revisit anytime.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-bg/40 p-6">
              <p className="text-sm font-semibold text-text">3) Subscribe</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The newsletter is the signal: the best drops, no noise.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}



