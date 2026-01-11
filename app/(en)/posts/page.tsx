import type { Metadata } from "next"
import Link from "next/link"
import { postsEn, PostFormat } from "@/content/posts.en"

export const metadata: Metadata = {
  title: "Posts | AtomicCurious",
  description:
    "Explore science, technology, and the future through questions, rankings, and interactive experiences.",
  alternates: {
    canonical: "/en/posts",
    languages: {
      en: "/en/posts",
      es: "/es/posts",
    },
  },
  openGraph: {
    title: "Posts | AtomicCurious",
    description:
      "Explore science, technology, and the future through questions, rankings, and interactive experiences.",
    url: "/en/posts",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posts | AtomicCurious",
    description:
      "Explore science, technology, and the future through questions, rankings, and interactive experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

type PostFilter = "all" | PostFormat

const formatLabels: Record<PostFilter, string> = {
  all: "All",
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
      ? postsEn
      : postsEn.filter((p) => p.format === activeFormat)

  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-muted">
            ATOMICCURIOUS · POSTS
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Explore ideas
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Questions that spark curiosity, rankings that bring perspective, and
            experiences designed to learn by exploring.
          </p>
        </header>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {(["all", "curiosity", "ranked", "quiz"] as const).map((key) => (
            <Link
              key={key}
              href={key === "all" ? "/en/posts" : `/en/posts?format=${key}`}
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
              No posts yet in this category.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/en/posts/${post.slug}`}
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
                  Read post →
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
                Keep exploring
              </h3>
              <p className="mt-1 text-sm text-muted">
                Weekly sparks of science, technology, and future-thinking—no
                noise.
              </p>
            </div>

            <Link
              href="/en/newsletter"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg hover:brightness-110"
            >
              Subscribe
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}



