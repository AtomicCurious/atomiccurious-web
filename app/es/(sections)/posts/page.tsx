// app/es/posts/page.tsx
import type { CSSProperties } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { postsEs, PostFormat } from "@/content/posts.es"
import { formatPostDate } from "@/lib/posts-utils"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Posts | AtomicCurious",
  description:
    "Explora ciencia, tecnología y futuro a través de preguntas, rankings y experiencias interactivas.",
  alternates: {
    canonical: "/es/posts",
    languages: { en: "/posts", es: "/es/posts" },
  },
  openGraph: {
    title: "Posts | AtomicCurious",
    description:
      "Explora ciencia, tecnología y futuro a través de preguntas, rankings y experiencias interactivas.",
    url: "/es/posts",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posts | AtomicCurious",
    description:
      "Explora ciencia, tecnología y futuro a través de preguntas, rankings y experiencias interactivas.",
  },
  robots: { index: true, follow: true },
}

// ─── Types ────────────────────────────────────────────────────────────────────

type PageProps = {
  searchParams: Promise<{ format?: string }>
}

type PostFilter = "all" | PostFormat
type HostKey = "atom" | "iris" | "core"

type UpcomingPost = {
  number: number
  title: string
  format: PostFormat
  releaseDate: Date
}

// ─── Static data ──────────────────────────────────────────────────────────────

const filterKeys = ["all", "curiosity", "ranked", "quiz"] as const

const formatLabels: Record<PostFilter, string> = {
  all: "Todos",
  curiosity: "Curiosity · Atom",
  ranked: "Ranked · Iris",
  quiz: "Quiz · Core",
}

const formatPillLabels: Record<PostFormat, string> = {
  curiosity: "Atom · Curiosidad",
  ranked: "Iris · Rankings",
  quiz: "Core · Quiz",
}

const formatStyles: Record<
  PostFormat,
  {
    line: string
    tagText: string
    tagBorder: string
    tagBg: string
    dot: string
    upcomingText: string
    ring: string
    bg: string
    text: string
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
    ring: "rgba(52, 211, 153, 0.30)",
    bg: "rgba(52, 211, 153, 0.045)",
    text: "rgb(52 211 153)",
    glow: "rgba(52, 211, 153, 0.16)",
  },
  ranked: {
    line: "from-cyan-300/40 via-cyan-300/10 to-transparent",
    tagText: "text-cyan-400",
    tagBorder: "border-cyan-400/25",
    tagBg: "bg-cyan-400/5",
    dot: "bg-cyan-400/70",
    upcomingText: "text-cyan-400/60",
    ring: "rgba(34, 211, 238, 0.30)",
    bg: "rgba(34, 211, 238, 0.045)",
    text: "rgb(34 211 238)",
    glow: "rgba(34, 211, 238, 0.16)",
  },
  quiz: {
    line: "from-orange-300/40 via-orange-300/10 to-transparent",
    tagText: "text-orange-400",
    tagBorder: "border-orange-400/25",
    tagBg: "bg-orange-400/5",
    dot: "bg-orange-400/70",
    upcomingText: "text-orange-400/60",
    ring: "rgba(251, 146, 60, 0.30)",
    bg: "rgba(251, 146, 60, 0.045)",
    text: "rgb(251 146 60)",
    glow: "rgba(251, 146, 60, 0.16)",
  },
}

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
    tag: "Atom · Curiosidad",
    eyebrow: "Preguntas que abren puertas",
    title: "Explora ideas que rompen intuiciones",
    description:
      'Fenómenos extraños, ideas que sorprenden y momentos de "¿cómo es posible?" — para mirar el mundo de otra forma.',
    image: "/images/sections/posts/atom_posts_v2.webp",
    alt: "Atom — Curiosidad",
  },
  iris: {
    tag: "Iris · Rankings",
    eyebrow: "Ordenar lo complejo",
    title: "Explora ideas desde nuevas perspectivas",
    description:
      "Rankings y comparaciones para ordenar lo complejo — y pensar con sentido crítico y más claridad.",
    image: "/images/sections/posts/iris_posts_v1.webp",
    alt: "Iris — Rankings",
  },
  core: {
    tag: "Core · Quiz",
    eyebrow: "Aprender también puede jugarse",
    title: "Explora ideas jugando\ny conectando patrones",
    description:
      "Quizzes, retos y experiencias interactivas — para conectar ideas, intuir y descubrir mientras aprendes.",
    image: "/images/sections/posts/core_posts_v1.webp",
    alt: "Core — Quiz",
  },
}

// 5:00 PM New York (EDT)
const scheduledUpcomingPosts: UpcomingPost[] = [
  {
    number: 2,
    title: "Top 7 hábitos más respaldados por la ciencia",
    format: "ranked",
    releaseDate: new Date("2026-05-20T17:00:00-04:00"),
  },
  {
    number: 3,
    title:
      "La Cadena del WTF: cómo un flamenco rosado termina conectado con tu respiración",
    format: "quiz",
    releaseDate: new Date("2026-05-27T17:00:00-04:00"),
  },
  {
    number: 4,
    title: "Enamorarte literalmente altera tu cerebro",
    format: "curiosity",
    releaseDate: new Date("2026-06-03T17:00:00-04:00"),
  },
  {
    number: 5,
    title: "Leer vs escuchar: qué retiene realmente más información",
    format: "ranked",
    releaseDate: new Date("2026-06-10T17:00:00-04:00"),
  },
  {
    number: 6,
    title:
      "Tu cerebro vs la realidad: ¿puedes leer “PARIS EN LA LA PRIMAVERA” sin fallar?",
    format: "quiz",
    releaseDate: new Date("2026-06-17T17:00:00-04:00"),
  },
  {
    number: 7,
    title:
      "La IA no entiende nada… entonces ¿por qué ya toma decisiones por ti?",
    format: "curiosity",
    releaseDate: new Date("2026-06-24T17:00:00-04:00"),
  },
  {
    number: 8,
    title: "Las 7 formas de aprender — ordenadas por lo que realmente funciona",
    format: "ranked",
    releaseDate: new Date("2026-07-01T17:00:00-04:00"),
  },
  {
    number: 9,
    title:
      "¿Qué tienen en común estas imágenes? El test que revela cómo conecta patrones tu cerebro",
    format: "quiz",
    releaseDate: new Date("2026-07-08T17:00:00-04:00"),
  },
  {
    number: 10,
    title: "¿Por qué la música funciona incluso sin traducción?",
    format: "curiosity",
    releaseDate: new Date("2026-07-15T17:00:00-04:00"),
  },
  {
    number: 11,
    title: "Las 5 decisiones financieras que más cambian tu vida",
    format: "ranked",
    releaseDate: new Date("2026-07-22T17:00:00-04:00"),
  },
  {
    number: 12,
    title: "¿Humano o IA? El momento en que dejamos de distinguirlos",
    format: "quiz",
    releaseDate: new Date("2026-07-29T17:00:00-04:00"),
  },
  {
    number: 13,
    title: "El entretenimiento moderno fue diseñado para no soltarte",
    format: "curiosity",
    releaseDate: new Date("2026-08-05T17:00:00-04:00"),
  },
  {
    number: 14,
    title: "Las 7 cosas que aprendiste en la escuela… y casi nunca usas",
    format: "ranked",
    releaseDate: new Date("2026-08-12T17:00:00-04:00"),
  },
  {
    number: 15,
    title: "¿Cuántos corazones tiene un pulpo? El quiz que casi todos fallan",
    format: "quiz",
    releaseDate: new Date("2026-08-19T17:00:00-04:00"),
  },
  {
    number: 16,
    title:
      "¿Por qué todas las generaciones creen que la siguiente está arruinada?",
    format: "curiosity",
    releaseDate: new Date("2026-08-26T17:00:00-04:00"),
  },
  {
    number: 17,
    title: "Introvertidos vs extrovertidos: quién tiene ventaja en el mundo actual",
    format: "ranked",
    releaseDate: new Date("2026-09-02T17:00:00-04:00"),
  },
  {
    number: 18,
    title: "La secuencia imposible: el patrón que tu cerebro quiere completar",
    format: "quiz",
    releaseDate: new Date("2026-09-09T17:00:00-04:00"),
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isPublishedDate(date: Date): boolean {
  return date <= new Date()
}

function getPublishedPosts() {
  return postsEs
    .filter((post) => isPublishedDate(post.date))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

function getUpcomingPosts() {
  return scheduledUpcomingPosts
    .filter((post) => post.releaseDate > new Date())
    .sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime())
}

function getReadingTime(post: (typeof postsEs)[number]): string {
  if (typeof post.readingTime === "number" && Number.isFinite(post.readingTime)) {
    return `${post.readingTime} min`
  }

  const words = `${post.title} ${post.description}`.trim().split(/\s+/).length

  return `${Math.max(3, Math.ceil(words / 45))} min`
}

function getPostNumber(post: (typeof postsEs)[number]): string | null {
  const match = post.id.match(/(\d+)$/)

  if (!match) return null

  return `#${match[1].padStart(3, "0")}`
}

function getFilterCountLabel(count: number, activeFormat: PostFilter): string {
  if (activeFormat === "curiosity") {
    return count === 1 ? "curiosidad" : "curiosidades"
  }

  if (activeFormat === "ranked") {
    return count === 1 ? "ranking" : "rankings"
  }

  if (activeFormat === "quiz") {
    return "quiz"
  }

  return count === 1 ? "exploración" : "exploraciones"
}

function getCardAccentStyle(format: PostFormat): CSSProperties {
  const s = formatStyles[format]

  return {
    "--ac-card-ring": s.ring,
    "--ac-card-bg": s.bg,
    "--ac-card-text": s.text,
    "--ac-card-glow": s.glow,
    boxShadow: `0 1px 0 rgba(255,255,255,0.04), 0 24px 60px -32px ${s.glow}`,
  } as CSSProperties
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

      .ac-post-card:hover {
        border-color: var(--ac-card-ring);
        background: color-mix(in srgb, var(--ac-card-bg) 100%, transparent);
        box-shadow:
          0 1px 0 rgba(255,255,255,0.04),
          0 28px 70px -34px var(--ac-card-glow);
      }

      .ac-post-cta {
        transition: color 220ms ease, transform 220ms ease;
      }

      .ac-post-card:hover .ac-post-cta {
        color: var(--ac-card-text);
      }

      .ac-post-card:hover .ac-post-cta-arrow {
        transform: translateX(2px);
      }

      .ac-post-card:hover .ac-post-upcoming-number {
        color: var(--ac-card-text);
        opacity: 0.9;
      }

      .ac-post-card:hover .ac-post-upcoming-panel {
        border-color: var(--ac-card-ring);
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
      {(Object.entries(hostContent) as [
        HostKey,
        (typeof hostContent)[HostKey],
      ][]).map(([key, host]) => (
        <span
          key={key}
          data-ac-host={key}
          className="ac-host-chip inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors"
          style={{ ["--ac-display" as string]: "inline-flex" }}
        >
          {host.tag}
        </span>
      ))}
    </>
  )
}

function HostCopy() {
  return (
    <>
      {(Object.entries(hostContent) as [
        HostKey,
        (typeof hostContent)[HostKey],
      ][]).map(([key, host]) => (
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
      ))}
    </>
  )
}

function HostVisualWithSidebar({ totalPosts }: { totalPosts: number }) {
  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface-1 shadow-soft">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-white/15"
        />

        <div className="relative aspect-[4/3] w-full md:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/9]">
          {(Object.entries(hostContent) as [
            HostKey,
            (typeof hostContent)[HostKey],
          ][]).map(([key, host]) => (
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
          ))}

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

      <aside className="flex flex-col gap-3">
        <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-[24px] border border-border bg-surface-1 p-5 shadow-soft">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              La biblioteca
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted text-justify">
              Entra por curiosidad y quédate por criterio: preguntas que abren
              ideas, rankings que ordenan lo complejo y quizzes que hacen el
              aprendizaje más activo.
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

        <div className="overflow-hidden rounded-[24px] border border-border bg-surface-1 px-5 py-4 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Biblioteca
              </p>
              <p className="mt-1.5 text-sm font-semibold text-text">
                Exploraciones publicadas
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Contenido ya disponible para explorar.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-center justify-center self-center gap-1">
              <span className="text-3xl font-semibold tabular-nums leading-none text-text">
                {totalPosts}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
                exploraciones
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

function PostCard({ post }: { post: (typeof postsEs)[number] }) {
  const s = formatStyles[post.format]
  const readingTime = getReadingTime(post)
  const postNumber = getPostNumber(post)

  return (
    <Link
      href={`/es/posts/${post.slug}`}
      className="
        ac-post-card group relative overflow-hidden rounded-2xl border border-border
        bg-surface-1 p-6 shadow-soft transition duration-300
        hover:-translate-y-0.5
      "
      style={getCardAccentStyle(post.format)}
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
              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-border"
              />
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
          {formatPostDate(post.date, "es-MX")}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold leading-tight text-text transition-colors duration-300">
        {post.title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {post.description}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="ac-post-cta inline-flex items-center gap-2 text-sm font-semibold text-text">
          Leer post
          <span
            aria-hidden="true"
            className="ac-post-cta-arrow transition-transform duration-200"
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
            <circle
              cx="8"
              cy="8"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
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

function UpcomingCard({ item }: { item: UpcomingPost }) {
  const s = formatStyles[item.format]

  return (
    <div
      className="
        ac-post-card ac-post-upcoming-panel relative overflow-hidden rounded-2xl
        border border-dashed border-border bg-surface-1/40 p-5 opacity-70
        transition duration-300 hover:opacity-100 sm:p-6
      "
      style={getCardAccentStyle(item.format)}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${s.line}`}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
            <span className="size-1.5 animate-pulse rounded-full bg-muted/60" />
            Próximamente · {formatPostDate(item.releaseDate, "es-MX")}
          </span>

          <p className={`text-base font-semibold ${s.upcomingText}`}>
            {item.title}
          </p>

          <p className="text-xs text-muted">{formatPillLabels[item.format]}</p>
        </div>

        <span className="ac-post-upcoming-number shrink-0 text-3xl font-semibold tabular-nums text-border transition-colors duration-300">
          #{String(item.number).padStart(3, "0")}
        </span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const publishedPosts = getPublishedPosts()
  const upcomingPosts = getUpcomingPosts()

  const activeFormat: PostFilter =
    resolvedSearchParams.format === "curiosity" ||
    resolvedSearchParams.format === "ranked" ||
    resolvedSearchParams.format === "quiz"
      ? resolvedSearchParams.format
      : "all"

  const filteredPosts =
    activeFormat === "all"
      ? publishedPosts
      : publishedPosts.filter((post) => post.format === activeFormat)

  const visibleUpcoming =
    activeFormat === "all"
      ? upcomingPosts
      : upcomingPosts.filter((u) => u.format === activeFormat)

  const totalPublishedPosts = publishedPosts.length
  const hasContent = filteredPosts.length > 0 || visibleUpcoming.length > 0

  return (
    <main className="w-full" data-chmode="host">
      <CharacterSwitcherCss />

      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        <header className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.18em] text-muted">
            ATOMICCURIOUS · POSTS
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <HostTag />

            {activeFormat !== "all" ? (
              <span className="ac-host-filter inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors">
                Filtro: {formatLabels[activeFormat]}
              </span>
            ) : null}
          </div>

          <HostCopy />
        </header>

        <HostVisualWithSidebar totalPosts={totalPublishedPosts} />

        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {filterKeys.map((key) => {
                const isActive = activeFormat === key

                return (
                  <Link
                    key={key}
                    href={
                      key === "all" ? "/es/posts" : `/es/posts?format=${key}`
                    }
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
              {getFilterCountLabel(filteredPosts.length, activeFormat)}
            </span>
          </div>
        </section>

        <section className="mt-8">
          {!hasContent ? (
            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
              <p className="text-sm text-muted">
                Aún no hay posts en esta categoría.
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
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : null}

              {visibleUpcoming.length > 0 ? (
                <div className="mt-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                      En preparación
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-border" />
                  </div>

                  <div className="grid gap-4">
                    {visibleUpcoming.map((item) => (
                      <UpcomingCard key={item.number} item={item} />
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </section>

        <section className="ac-newsletter mt-14 overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-soft">
          <div className="relative p-6 sm:p-7">
            <div
              aria-hidden="true"
              className="ac-newsletter-radial pointer-events-none absolute inset-0 opacity-70"
            />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h3 className="text-lg font-semibold text-text">
                  Accede a AtomicCurious
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Contenido exclusivo, acceso anticipado a nuevas exploraciones y
                  herramientas seleccionadas — cada dos semanas para mentes que
                  cuestionan todo.
                </p>
              </div>

              <Link
                href="/es/newsletter"
                className="ac-newsletter-button inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold"
              >
                Suscribirme
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}