// app/es/posts/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { postsEs, PostFormat } from "@/content/posts.es"

export const metadata: Metadata = {
  title: "Posts | AtomicCurious",
  description:
    "Explora ciencia, tecnología y futuro a través de preguntas, rankings y experiencias interactivas.",
  alternates: {
    canonical: "/es/posts",
    languages: {
      en: "/posts",
      es: "/es/posts",
    },
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

type PostFilter = "all" | PostFormat

const formatLabels: Record<PostFilter, string> = {
  all: "Todos",
  curiosity: "Curiosity · Atom",
  ranked: "Ranked · Iris",
  quiz: "Quiz · Core",
}

function HostTagEs() {
  return (
    <>
      <span className="ac-host ac-host-atom inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
        Atom · Curiosidad
      </span>
      <span className="ac-host ac-host-iris inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
        Iris · Rankings
      </span>
      <span className="ac-host ac-host-core inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
        Core · Quiz
      </span>
    </>
  )
}

function HostCopyEs() {
  return (
    <>
      <h1 className="ac-title ac-title-atom mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
        Explora ideas que rompen intuiciones
      </h1>
      <h1 className="ac-title ac-title-iris mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
        Explora ideas con claridad y criterio
      </h1>
      <h1 className="ac-title ac-title-core mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
        Explora ideas jugando y conectando puntos
      </h1>

      <p className="ac-sub ac-sub-atom mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
        Preguntas que despiertan curiosidad, fenómenos extraños y momentos de “¿cómo es posible?” — para ver el mundo
        con otros ojos.
      </p>
      <p className="ac-sub ac-sub-iris mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
        Rankings y comparaciones que dan perspectiva: criterios claros, trade-offs y marcos mentales reutilizables.
      </p>
      <p className="ac-sub ac-sub-core mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
        Aprendizaje interactivo: quizzes, retos y prompts que conectan cosas “imposibles” y afilan tu modelo mental.
      </p>
    </>
  )
}

function HostVisualEs() {
  return (
    <div
      className="
        relative mt-10 overflow-hidden rounded-3xl border border-border
        bg-surface-1 shadow-soft
      "
    >
      <div className="relative aspect-[16/7] w-full">
        {/* ATOM */}
        <Image
          src="/images/sections/posts/atom.webp"
          alt="Atom — Curiosidad"
          fill
          sizes="(max-width: 768px) 100vw, 1100px"
          className="ac-hero ac-hero-atom object-cover"
          priority
        />

        {/* IRIS */}
        <Image
          src="/images/sections/posts/iris.webp"
          alt="Iris — Rankings"
          fill
          sizes="(max-width: 768px) 100vw, 1100px"
          className="ac-hero ac-hero-iris object-cover"
          priority
        />

        {/* CORE */}
        <Image
          src="/images/sections/posts/core.webp"
          alt="Core — Quiz"
          fill
          sizes="(max-width: 768px) 100vw, 1100px"
          className="ac-hero ac-hero-core object-cover"
          priority
        />

        {/* Overlay sutil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.22), rgba(0,0,0,0.35))",
          }}
        />
      </div>
    </div>
  )
}

export default function Page({
  searchParams,
}: {
  searchParams: { format?: string }
}) {
  const activeFormat: PostFilter =
    searchParams.format === "curiosity" ||
    searchParams.format === "ranked" ||
    searchParams.format === "quiz"
      ? searchParams.format
      : "all"

  const filteredPosts =
    activeFormat === "all"
      ? postsEs
      : postsEs.filter((p) => p.format === activeFormat)

  return (
    <main className="w-full" data-chmode="host">
      {/* Character display rules (SSR safe) */}
      <style>{`
        /* Default hidden */
        .ac-host,
        .ac-title,
        .ac-sub,
        .ac-hero {
          display: none;
        }

        /* ✅ Default Atom when no data-character yet */
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
        html:not([data-character]) .ac-sub-atom {
          display: block;
        }
        body:not([data-character]) .ac-hero-atom,
        html:not([data-character]) .ac-hero-atom {
          display: block;
        }

        /* Visible per mode (body OR html) */
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
        html[data-character="atom"] .ac-sub-atom {
          display: block;
        }
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
        html[data-character="iris"] .ac-sub-iris {
          display: block;
        }
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
        html[data-character="core"] .ac-sub-core {
          display: block;
        }
        body[data-character="core"] .ac-hero-core,
        html[data-character="core"] .ac-hero-core {
          display: block;
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-muted">
            ATOMICCURIOUS · POSTS
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <HostTagEs />
            {activeFormat !== "all" ? (
              <span className="inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
                Filtro: {formatLabels[activeFormat]}
              </span>
            ) : null}
          </div>

          <HostCopyEs />
        </header>

        {/* ✅ Visual que cambia por personaje */}
        <HostVisualEs />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {(["all", "curiosity", "ranked", "quiz"] as const).map((key) => (
            <Link
              key={key}
              href={key === "all" ? "/es/posts" : `/es/posts?format=${key}`}
              className={`
                rounded-full border px-4 py-1.5 text-sm transition
                ${
                  activeFormat === key
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-text hover:border-accent/40"
                }
              `}
            >
              {formatLabels[key]}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {filteredPosts.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-border bg-surface-1 p-6">
            <p className="text-sm text-muted">
              Aún no hay posts en esta categoría.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/es/posts/${post.slug}`}
                className="
                  group rounded-2xl border border-border bg-surface-1
                  p-6 shadow-soft transition
                  hover:bg-surface-2 hover:border-accent/30
                "
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-muted">
                    {formatLabels[post.format]}
                  </span>
                  <span className="text-xs text-muted">{post.date}</span>
                </div>

                <h2 className="mt-4 text-xl font-semibold text-text group-hover:text-accent">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {post.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-text">
                  Leer post →
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <section className="mt-16 rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-lg font-semibold text-text">Sigue explorando</h3>
              <p className="mt-1 text-sm text-muted">
                Chispas semanales de ciencia, tecnología y futuro—sin ruido.
              </p>
            </div>

            <Link
              href="/es/newsletter"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg hover:brightness-110"
            >
              Suscribirme
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
