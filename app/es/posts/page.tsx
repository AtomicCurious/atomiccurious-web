import type { Metadata } from "next"
import Link from "next/link"
import { postsEs, PostFormat } from "@/content/posts.es"

export const metadata: Metadata = {
  title: "Posts | AtomicCurious",
  description:
    "Explora ciencia, tecnología y futuro a través de preguntas, rankings y experiencias interactivas.",
}

type PostFilter = "all" | PostFormat

const formatLabels: Record<PostFilter, string> = {
  all: "Todos",
  curiosity: "Curiosity · Atom",
  ranked: "Ranked · Iris",
  quiz: "Quiz · Core",
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
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-muted">
            ATOMICCURIOUS · POSTS
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Explora ideas
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Preguntas que despiertan curiosidad, rankings que dan perspectiva y
            experiencias diseñadas para aprender explorando.
          </p>
        </header>

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
              <h3 className="text-lg font-semibold text-text">
                Sigue explorando
              </h3>
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
