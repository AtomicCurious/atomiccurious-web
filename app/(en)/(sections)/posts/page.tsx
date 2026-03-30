// app/(en)/posts/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { postsEn, PostFormat } from "@/content/posts.en"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Posts | AtomicCurious",
  description:
    "Explore science, technology, and the future through questions, rankings, and interactive experiences.",
  alternates: {
    canonical: "/posts",
    languages: {
      en: "/posts",
      es: "/es/posts",
    },
  },
  openGraph: {
    title: "Posts | AtomicCurious",
    description:
      "Explore science, technology, and the future through questions, rankings, and interactive experiences.",
    url: "/posts",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posts | AtomicCurious",
    description:
      "Explore science, technology, and the future through questions, rankings, and interactive experiences.",
  },
  robots: { index: true, follow: true },
}

// ─── Types ────────────────────────────────────────────────────────────────────

type PageProps = {
  searchParams: Promise<{ format?: string }>
}

type PostFilter = "all" | PostFormat
type HostKey = "atom" | "iris" | "core"

// ─── Static data ──────────────────────────────────────────────────────────────

const filterKeys = ["all", "curiosity", "ranked", "quiz"] as const

const formatLabels: Record<PostFilter, string> = {
  all: "All",
  curiosity: "Curiosity · Atom",
  ranked: "Ranked · Iris",
  quiz: "Quiz · Core",
}

const formatPillLabels: Record<PostFormat, string> = {
  curiosity: "Atom · Curiosity",
  ranked: "Iris · Rankings",
  quiz: "Core · Quiz",
}

/**
 * Per-format colour tokens + glow value.
 * These stay tied to the actual content type.
 */
const formatStyles: Record<
  PostFormat,
  {
    line: string
    tagText: string
    tagBorder: string
    tagBg: string
    dot: string
    upcomingText: string
    glow: string
  }
> = {
  curiosity: {
    line: "from-emerald-300/40 via-emerald-300/10 to-transparent",
    tagText: "text-emerald-400",
    tagBorder: "border-emerald-400/25",
    tagBg: "bg-emerald-400/5",
    dot: "bg-emerald-400/70",
    upcomingText: "text-emerald-400/60",
    glow: "rgba(52,211,153,0.10)",
  },
  ranked: {
    line: "from-cyan-300/40 via-cyan-300/10 to-transparent",
    tagText: "text-cyan-400",
    tagBorder: "border-cyan-400/25",
    tagBg: "bg-cyan-400/5",
    dot: "bg-cyan-400/70",
    upcomingText: "text-cyan-400/60",
    glow: "rgba(34,211,238,0.10)",
  },
  quiz: {
    line: "from-orange-300/40 via-orange-300/10 to-transparent",
    tagText: "text-orange-400",
    tagBorder: "border-orange-400/25",
    tagBg: "bg-orange-400/5",
    dot: "bg-orange-400/70",
    upcomingText: "text-orange-400/60",
    glow: "rgba(255,140,0,0.12)",
  },
}

/**
 * Hero content per character/host.
 */
const hostContent: Record<
  HostKey,
  {
    tag: string
    eyebrow: string
    title: string
    description: string
    image: string
    alt: string
  }
> = {
  atom: {
    tag: "Atom · Curiosity",
    eyebrow: "Questions that open doors",
    title: "Explore ideas that break intuition",
    description:
      'Strange phenomena, surprising ideas, and “how is that possible?” moments — to look at the world from a different angle.',
    image: "/images/sections/posts/atom_posts_v2.webp",
    alt: "Atom — Curiosity",
  },
  iris: {
    tag: "Iris · Rankings",
    eyebrow: "Ordering the complex",
    title: "Explore ideas from new perspectives",
    description:
      "Rankings and comparisons that organise the complex — and help you think with more clarity and sharper judgement.",
    image: "/images/sections/posts/iris_posts_v1.webp",
    alt: "Iris — Rankings",
  },
  core: {
    tag: "Core · Quiz",
    eyebrow: "Learning can be playful too",
    title: "Explore ideas through play\nand pattern-building",
    description:
      "Quizzes, challenges, and interactive experiences — to connect ideas, trust your intuition, and discover as you learn.",
    image: "/images/sections/posts/core_posts_v1.webp",
    alt: "Core — Quiz",
  },
}

/**
 * Upcoming posts — edit this array as you prepare new content.
 */
const upcomingPosts: Array<{
  number: number
  title: string
  format: PostFormat
}> = [
  {
    number: 2,
    title: "The Dunning–Kruger effect: what you do not know you do not know",
    format: "curiosity",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getReadingTime(post: (typeof postsEn)[number]): string {
  const value = (post as Record<string, unknown>).readingTime
  if (typeof value === "string" && value.trim()) return value
  if (typeof value === "number" && Number.isFinite(value)) return `${value} min`
  const words = `${post.title} ${post.description}`.trim().split(/\s+/).length
  return `${Math.max(3, Math.ceil(words / 45))} min`
}

function getPostNumber(post: (typeof postsEn)[number]): string | null {
  const value = (post as Record<string, unknown>).number
  if (typeof value === "number" && Number.isFinite(value))
    return `#${String(value).padStart(3, "0")}`
  return null
}

// ─── Character switcher CSS ───────────────────────────────────────────────────

function CharacterSwitcherCss() {
  return (
    <style>{`
      [data-ac-host] { display: none; }

      html:not([data-character]) [data-ac-host="atom"],
      body:not([data-character]) [data-ac-host="atom"] {
        display: var(--ac-display, block);
      }
      html[data-character="atom"] [data-ac-host="atom"],
      body[data-character="atom"] [data-ac-host="atom"] {
        display: var(--ac-display, block);
      }
      html[data-character="iris"] [data-ac-host="iris"],
      body[data-character="iris"] [data-ac-host="iris"] {
        display: var(--ac-display, block);
      }
      html[data-character="core"] [data-ac-host="core"],
      body[data-character="core"] [data-ac-host="core"] {
        display: var(--ac-display, block);
      }

      html:not([data-character]) .ac-host-chip,
      body:not([data-character]) .ac-host-chip,
      html[data-character="atom"] .ac-host-chip,
      body[data-character="atom"] .ac-host-chip {
        color: rgb(52 211 153);
        border-color: rgba(52, 211, 153, 0.25);
        background: rgba(52, 211, 153, 0.08);
        box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.05);
      }

      html[data-character="iris"] .ac-host-chip,
      body[data-character="iris"] .ac-host-chip {
        color: rgb(34 211 238);
        border-color: rgba(34, 211, 238, 0.25);
        background: rgba(34, 211, 238, 0.08);
        box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.05);
      }

      html[data-character="core"] .ac-host-chip,
      body[data-character="core"] .ac-host-chip {
        color: rgb(251 146 60);
        border-color: rgba(251, 146, 60, 0.25);
        background: rgba(251, 146, 60, 0.08);
        box-shadow: 0 0 0 1px rgba(251, 146, 60, 0.05);
      }

      html:not([data-character]) .ac-host-filter,
      body:not([data-character]) .ac-host-filter,
      html[data-character="atom"] .ac-host-filter,
      body[data-character="atom"] .ac-host-filter {
        color: rgb(52 211 153);
        border-color: rgba(52, 211, 153, 0.25);
        background: rgba(52, 211, 153, 0.08);
        box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.10);
      }

      html[data-character="iris"] .ac-host-filter,
      body[data-character="iris"] .ac-host-filter {
        color: rgb(34 211 238);
        border-color: rgba(34, 211, 238, 0.25);
        background: rgba(34, 211, 238, 0.08);
        box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.10);
      }

      html[data-character="core"] .ac-host-filter,
      body[data-character="core"] .ac-host-filter {
        color: rgb(251 146 60);
        border-color: rgba(251, 146, 60, 0.25);
        background: rgba(251, 146, 60, 0.08);
        box-shadow: 0 0 0 1px rgba(251, 146, 60, 0.10);
      }

      html:not([data-character]) .ac-host-accent-line,
      body:not([data-character]) .ac-host-accent-line,
      html[data-character="atom"] .ac-host-accent-line,
      body[data-character="atom"] .ac-host-accent-line {
        background: linear-gradient(
          to right,
          rgba(52,211,153,0.75),
          rgba(52,211,153,0.20),
          transparent
        );
      }

      html[data-character="iris"] .ac-host-accent-line,
      body[data-character="iris"] .ac-host-accent-line {
        background: linear-gradient(
          to right,
          rgba(34,211,238,0.75),
          rgba(34,211,238,0.20),
          transparent
        );
      }

      html[data-character="core"] .ac-host-accent-line,
      body[data-character="core"] .ac-host-accent-line {
        background: linear-gradient(
          to right,
          rgba(251,146,60,0.75),
          rgba(251,146,60,0.20),
          transparent
        );
      }

      html:not([data-character]) .ac-host-card,
      body:not([data-character]) .ac-host-card,
      html[data-character="atom"] .ac-host-card,
      body[data-character="atom"] .ac-host-card {
        --ac-host-ring: rgba(52, 211, 153, 0.18);
        --ac-host-bg: rgba(52, 211, 153, 0.04);
        --ac-host-text: rgb(52 211 153);
        --ac-host-glow: rgba(52, 211, 153, 0.14);
      }

      html[data-character="iris"] .ac-host-card,
      body[data-character="iris"] .ac-host-card {
        --ac-host-ring: rgba(34, 211, 238, 0.18);
        --ac-host-bg: rgba(34, 211, 238, 0.04);
        --ac-host-text: rgb(34 211 238);
        --ac-host-glow: rgba(34, 211, 238, 0.14);
      }

      html[data-character="core"] .ac-host-card,
      body[data-character="core"] .ac-host-card {
        --ac-host-ring: rgba(251, 146, 60, 0.18);
        --ac-host-bg: rgba(251, 146, 60, 0.04);
        --ac-host-text: rgb(251 146 60);
        --ac-host-glow: rgba(251, 146, 60, 0.14);
      }

      .ac-host-card:hover {
        border-color: var(--ac-host-ring, rgba(52, 211, 153, 0.18));
        background: color-mix(in srgb, var(--ac-host-bg, rgba(52, 211, 153, 0.04)) 100%, transparent);
      }

      .ac-host-cta {
        transition: color 220ms ease, transform 220ms ease;
      }

      .ac-host-card:hover .ac-host-cta {
        color: var(--ac-host-text, rgb(52 211 153));
      }

      .ac-host-card:hover .ac-host-cta-arrow {
        transform: translateX(2px);
      }

      .ac-host-card:hover .ac-host-upcoming-number {
        color: var(--ac-host-text, rgb(52 211 153));
        opacity: 0.9;
      }

      .ac-host-card:hover .ac-host-upcoming-panel {
        border-color: var(--ac-host-ring, rgba(52, 211, 153, 0.18));
      }

      .ac-host-card:hover .ac-host-upcoming-glow {
        box-shadow: 0 24px 60px -32px var(--ac-host-glow, rgba(52, 211, 153, 0.14));
      }

      html:not([data-character]) .ac-newsletter,
      body:not([data-character]) .ac-newsletter,
      html[data-character="atom"] .ac-newsletter,
      body[data-character="atom"] .ac-newsletter {
        --ac-newsletter-ring: rgba(52, 211, 153, 0.18);
        --ac-newsletter-glow: rgba(52, 211, 153, 0.18);
        --ac-newsletter-soft: rgba(52, 211, 153, 0.10);
        --ac-newsletter-btn: rgb(52 211 153);
        --ac-newsletter-btn-text: rgb(var(--bg));
      }

      html[data-character="iris"] .ac-newsletter,
      body[data-character="iris"] .ac-newsletter {
        --ac-newsletter-ring: rgba(34, 211, 238, 0.18);
        --ac-newsletter-glow: rgba(34, 211, 238, 0.18);
        --ac-newsletter-soft: rgba(34, 211, 238, 0.10);
        --ac-newsletter-btn: rgb(34 211 238);
        --ac-newsletter-btn-text: rgb(var(--bg));
      }

      html[data-character="core"] .ac-newsletter,
      body[data-character="core"] .ac-newsletter {
        --ac-newsletter-ring: rgba(251, 146, 60, 0.18);
        --ac-newsletter-glow: rgba(251, 146, 60, 0.18);
        --ac-newsletter-soft: rgba(251, 146, 60, 0.10);
        --ac-newsletter-btn: rgb(251 146 60);
        --ac-newsletter-btn-text: rgb(var(--bg));
      }

      .ac-newsletter {
        transition: border-color 220ms ease, box-shadow 220ms ease, background-color 220ms ease;
      }

      .ac-newsletter:hover {
        border-color: var(--ac-newsletter-ring, rgba(52, 211, 153, 0.18));
        box-shadow:
          0 1px 0 rgba(255,255,255,0.04),
          0 24px 60px -32px var(--ac-newsletter-glow, rgba(52, 211, 153, 0.18));
      }

      .ac-newsletter-radial {
        background:
          radial-gradient(circle at top right, var(--ac-newsletter-soft, rgba(52, 211, 153, 0.10)), transparent 35%);
      }

      .ac-newsletter-button {
        background: var(--ac-newsletter-btn, rgb(52 211 153));
        color: var(--ac-newsletter-btn-text, rgb(var(--bg)));
        transition: transform 220ms ease, filter 220ms ease, box-shadow 220ms ease;
        box-shadow: 0 12px 30px -18px var(--ac-newsletter-glow, rgba(52, 211, 153, 0.18));
      }

      .ac-newsletter-button:hover {
        transform: translateY(-1px);
        filter: brightness(1.05);
        box-shadow: 0 18px 40px -18px var(--ac-newsletter-glow, rgba(52, 211, 153, 0.22));
      }
    `}</style>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HostTag() {
  return (
    <>
      {(Object.entries(hostContent) as [HostKey, (typeof hostContent)[HostKey]][]).map(
        ([key, host]) => (
          <span
            key={key}
            data-ac-host={key}
            className="ac-host-chip inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors"
            style={{ ["--ac-display" as string]: "inline-flex" }}
          >
            {host.tag}
          </span>
        ),
      )}
    </>
  )
}

function HostCopy() {
  return (
    <>
      {(Object.entries(hostContent) as [HostKey, (typeof hostContent)[HostKey]][]).map(
        ([key, host]) => (
          <div key={key} data-ac-host={key}>
            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
              {host.eyebrow}
            </p>

            <div
              aria-hidden="true"
              className="ac-host-accent-line mt-4 h-px w-24 rounded-full opacity-70"
            />

            <h1 className="mt-5 max-w-5xl whitespace-pre-line text-pretty text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl xl:whitespace-nowrap">
              {host.title}
            </h1>

            <p className="mt-6 max-w-5xl text-base leading-relaxed text-muted sm:text-lg xl:whitespace-nowrap">
              {host.description}
            </p>
          </div>
        ),
      )}
    </>
  )
}

/**
 * Hero image + editorial sidebar.
 *
 * Mobile:   image stacked above sidebar
 * Desktop:  image ~65% | sidebar ~35%
 */
function HostVisualWithSidebar({ totalPosts }: { totalPosts: number }) {
  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">
      {/* Image */}
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface-1 shadow-soft">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-white/15"
        />

        <div className="relative aspect-[4/3] w-full md:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/9]">
          {(Object.entries(hostContent) as [HostKey, (typeof hostContent)[HostKey]][]).map(
            ([key, host]) => (
              <Image
                key={key}
                data-ac-host={key}
                src={host.image}
                alt={host.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 65vw, 740px"
                className="object-cover object-[50%_0%]"
              />
            ),
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.22)),
                linear-gradient(to right, rgba(2,8,23,0.06), rgba(2,8,23,0.02) 45%, rgba(2,8,23,0.12))
              `,
            }}
          />
        </div>
      </div>

      {/* Editorial sidebar */}
      <aside className="flex flex-col gap-3">
        {/* Collection description + format visual index */}
        <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-surface-1 p-5 shadow-soft">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              The collection
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted text-justify">
              Arrive through curiosity and stay for clarity: questions that open
              ideas, rankings that organise the complex, and quizzes that make
              learning more active.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            {(["curiosity", "ranked", "quiz"] as PostFormat[]).map((fmt) => {
              const s = formatStyles[fmt]
              return (
                <div
                  key={fmt}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-bg/20 px-3 py-2"
                >
                  <span className={`size-1.5 shrink-0 rounded-full ${s.dot}`} />
                  <span className={`text-xs font-medium ${s.tagText}`}>
                    {formatPillLabels[fmt]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Publishing rhythm + post count */}
        <div className="overflow-hidden rounded-[24px] border border-border bg-surface-1 px-5 py-4 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Publishing
              </p>
              <p className="mt-1.5 text-sm font-semibold text-text">
                Every week
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                New posts from AtomicCurious
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-0.5">
              <span className="text-2xl font-semibold tabular-nums leading-none text-text">
                {totalPosts}
              </span>
              <span className="text-[10px] text-muted">
                {totalPosts === 1 ? "post" : "posts"}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

/**
 * Published post card.
 * Tag colour stays tied to the real content format.
 * Hover + CTA follow the active character.
 */
function PostCard({ post }: { post: (typeof postsEn)[number] }) {
  const s = formatStyles[post.format]
  const readingTime = getReadingTime(post)
  const postNumber = getPostNumber(post)

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="
        ac-host-card group relative overflow-hidden rounded-2xl border border-border
        bg-surface-1 p-6 shadow-soft transition duration-300
        hover:-translate-y-0.5
      "
      style={{
        boxShadow: `0 1px 0 rgba(255,255,255,0.04), 0 24px 60px -32px ${s.glow}`,
      }}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${s.line}`}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {postNumber ? (
            <>
              <span className="text-[10px] font-medium tracking-[0.1em] text-muted tabular-nums">
                {postNumber}
              </span>
              <span aria-hidden="true" className="size-1 rounded-full bg-border" />
            </>
          ) : null}

          <span
            className={`
              inline-flex items-center rounded-full border px-2.5 py-1
              text-[11px] font-medium tracking-wide
              ${s.tagText} ${s.tagBorder} ${s.tagBg}
            `}
          >
            {formatPillLabels[post.format]}
          </span>
        </div>

        <span className="shrink-0 text-[11px] font-medium tracking-wide text-muted">
          {post.date}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold leading-tight text-text transition-colors duration-300">
        {post.title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {post.description}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="ac-host-cta inline-flex items-center gap-2 text-sm font-semibold text-text">
          Read post
          <span
            aria-hidden="true"
            className="ac-host-cta-arrow transition-transform duration-200"
          >
            →
          </span>
        </span>

        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <svg
            aria-hidden="true"
            width="11"
            height="11"
            viewBox="0 0 16 16"
            fill="none"
            className="opacity-50"
          >
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 5v3l1.5 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {readingTime}
        </span>
      </div>
    </Link>
  )
}

/**
 * Upcoming post teaser.
 * Format label stays tied to the real content.
 * Hover frame + big number follow the active character.
 */
function UpcomingCard({ item }: { item: (typeof upcomingPosts)[number] }) {
  const s = formatStyles[item.format]

  return (
    <div className="ac-host-card ac-host-upcoming-panel ac-host-upcoming-glow relative overflow-hidden rounded-2xl border border-dashed border-border bg-surface-1/40 p-5 opacity-70 transition duration-300 hover:opacity-100 sm:p-6">
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${s.line}`}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            <span className="size-1.5 animate-pulse rounded-full bg-muted/60" />
            Coming soon
          </span>

          <p className={`text-base font-semibold ${s.upcomingText}`}>
            {item.title}
          </p>

          <p className="text-xs text-muted">{formatPillLabels[item.format]}</p>
        </div>

        <span className="ac-host-upcoming-number shrink-0 text-3xl font-semibold tabular-nums text-border transition-colors duration-300">
          #{String(item.number).padStart(3, "0")}
        </span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams

  const activeFormat: PostFilter =
    resolvedSearchParams.format === "curiosity" ||
    resolvedSearchParams.format === "ranked" ||
    resolvedSearchParams.format === "quiz"
      ? resolvedSearchParams.format
      : "all"

  const filteredPosts =
    activeFormat === "all"
      ? postsEn
      : postsEn.filter((post) => post.format === activeFormat)

  const visibleUpcoming =
    activeFormat === "all"
      ? upcomingPosts
      : upcomingPosts.filter((u) => u.format === activeFormat)

  const hasContent = filteredPosts.length > 0 || visibleUpcoming.length > 0

  return (
    <main className="w-full" data-chmode="host">
      <CharacterSwitcherCss />

      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* ── Header ── */}
        <header className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.18em] text-muted">
            ATOMICCURIOUS · POSTS
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <HostTag />

            {activeFormat !== "all" ? (
              <span className="ac-host-filter inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors">
                Filter: {formatLabels[activeFormat]}
              </span>
            ) : null}
          </div>

          <HostCopy />
        </header>

        {/* ── Hero image + editorial sidebar ── */}
        <HostVisualWithSidebar totalPosts={postsEn.length} />

        {/* ── Filter bar ── */}
        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {filterKeys.map((key) => {
                const isActive = activeFormat === key
                return (
                  <Link
                    key={key}
                    href={key === "all" ? "/posts" : `/posts?format=${key}`}
                    className={
                      isActive
                        ? "ac-host-filter inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                        : "inline-flex items-center rounded-full border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted transition hover:border-accent/35 hover:text-text"
                    }
                  >
                    {formatLabels[key]}
                  </Link>
                )
              })}
            </div>

            <span className="text-xs tabular-nums text-muted">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "post" : "posts"}
            </span>
          </div>
        </section>

        {/* ── Posts grid ── */}
        <section className="mt-8">
          {!hasContent ? (
            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
              <p className="text-sm text-muted">
                No posts yet in this category.
              </p>
            </div>
          ) : (
            <>
              {filteredPosts.length > 0 ? (
                <div
                  className={`grid gap-4 ${
                    filteredPosts.length >= 2 ? "md:grid-cols-2" : ""
                  }`}
                >
                  {filteredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : null}

              {visibleUpcoming.length > 0 ? (
                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                      In progress
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-border" />
                  </div>

                  <div
                    className={`grid gap-4 ${
                      visibleUpcoming.length >= 2 ? "md:grid-cols-2" : ""
                    }`}
                  >
                    {visibleUpcoming.map((item) => (
                      <UpcomingCard key={item.number} item={item} />
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="ac-newsletter mt-14 overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-soft">
          <div className="relative p-6 sm:p-7">
            <div
              aria-hidden="true"
              className="ac-newsletter-radial pointer-events-none absolute inset-0 opacity-70"
            />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h3 className="text-lg font-semibold text-text">
                  Get access to AtomicCurious
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Exclusive content, early access to new explorations and selected tools — 
                  every two weeks for minds that question everything.
                </p>
              </div>

              <Link
                href="/newsletter"
                className="ac-newsletter-button inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}