// app/(en)/posts/[slug]/page.tsx
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import fs from "node:fs/promises"
import path from "node:path"

import { postsEn, PostFormat } from "@/content/posts.en"

import MakeItRealCard from "@/components/posts/MakeItRealCard"
import CharacterCallout from "@/components/posts/CharacterCallout"
import PostHeroHost from "@/components/posts/PostHeroHost"

// ---------------------------
// Helpers
// ---------------------------
function normalizeSlug(raw?: string) {
  return (raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
}

const formatLabels: Record<PostFormat, string> = {
  curiosity: "Curiosity · Atom",
  ranked: "Ranked · Iris",
  quiz: "Quiz · Core",
}

// CRÍTICO: format -> host
const formatToHost = (format: PostFormat) => {
  if (format === "curiosity") return "atom" as const
  if (format === "ranked") return "iris" as const
  return "core" as const
}

// ✅ IMPORTANTE: tus MDX están en src/content/posts/en
async function readMdxEn(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "posts",
    "en",
    `${slug}.mdx`
  )
  return fs.readFile(filePath, "utf8")
}

// Header opcional si el artículo es largo
function estimateWords(source: string) {
  const text = source
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_#>\-\[\]\(\)]/g, " ")
  const words = text.trim().split(/\s+/).filter(Boolean)
  return words.length
}

function readingTimeLabel(words: number) {
  if (!words) return undefined
  const minutes = Math.max(3, Math.round(words / 220))
  return `${minutes} min`
}

// ---------------------------
// Next.js: metadata
// ---------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params)
  const slug = normalizeSlug(resolvedParams?.slug)

  const metaPost = postsEn.find((p) => p.slug === slug)

  if (!slug || !metaPost) {
    return {
      title: "Post not found | AtomicCurious",
      description: "This page doesn’t exist yet.",
    }
  }

  return {
    title: `${metaPost.title} | AtomicCurious`,
    description: metaPost.description,
  }
}

// Opcional: SSG
export async function generateStaticParams() {
  return postsEn.map((p) => ({ slug: p.slug }))
}

// ---------------------------
// Page
// ---------------------------
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const resolvedParams = await Promise.resolve(params)
  const slug = normalizeSlug(resolvedParams?.slug)

  const metaPost = postsEn.find((p) => p.slug === slug)
  if (!slug || !metaPost) return notFound()

  // More from this format
  const moreFromFormat = postsEn
    .filter((p) => p.format === metaPost.format && p.slug !== slug)
    .slice(0, 4)

  // Read + compile MDX
  let mdxSource = ""
  try {
    mdxSource = await readMdxEn(slug)
  } catch {
    return notFound()
  }

  const words = estimateWords(mdxSource)
  const isLong = words >= 2000
  const host = formatToHost(metaPost.format)
  const readingTime = readingTimeLabel(words)

  // ✅ YouTube: se puede tomar del frontmatter del MDX
  const { content, frontmatter } = await compileMDX<{
    youtubeId?: string
  }>({
    source: mdxSource,
    components: {
      MakeItRealCard: (props: any) => <MakeItRealCard host={host} {...props} />,
      CharacterCallout: (props: any) => (
        <CharacterCallout host={host} {...props} />
      ),
    },
    options: { parseFrontmatter: true },
  })

  // ✅ fallback de prueba (si no pones youtubeId en el MDX)
  const youtubeId = frontmatter?.youtubeId ?? "dQw4w9WgXcQ"

  return (
    <main className="w-full">
      <article className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10 sm:py-12">
        {/* Header */}
        <header className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            {/* LEFT */}
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-muted">
                ATOMICCURIOUS · POST
              </p>

              <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                {metaPost.title}
              </h1>

              <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {metaPost.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-border bg-surface-1 px-3 py-1 text-xs text-muted">
                  {formatLabels[metaPost.format]}
                </span>

                {metaPost.tag ? (
                  <span className="rounded-full border border-border bg-bg/30 px-3 py-1 text-xs text-muted">
                    {metaPost.tag}
                  </span>
                ) : null}
              </div>

              <div className="mt-7">
                <PostHeroHost
                  host={host}
                  title={metaPost.title}
                  subheadline={metaPost.description}
                  readingTime={readingTime}
                  show={isLong}
                />
              </div>
            </div>

            {/* RIGHT */}
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-surface-1 p-5 shadow-soft">
                <p className="text-xs font-medium tracking-wide text-muted">
                  DETAILS
                </p>

                <div className="mt-3 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted">Date</span>
                    <span className="text-text/90">{metaPost.date}</span>
                  </div>

                  {readingTime ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted">Reading</span>
                      <span className="text-text/90">{readingTime}</span>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted">Format</span>
                    <span className="text-text/90">
                      {formatLabels[metaPost.format]}
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-border/60 pt-4">
                  <Link
                    href={`/posts?format=${metaPost.format}`}
                    className="
                      inline-flex w-full items-center justify-center rounded-xl
                      border border-border bg-bg/30 px-4 py-2.5
                      text-sm font-semibold text-text shadow-soft transition
                      hover:bg-surface-2 hover:border-accent/30 hover:text-accent
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                    "
                  >
                    More like this
                    <span className="ml-2 text-muted">›</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </header>

        {/* Video */}
        <section className="mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-bg/30 shadow-soft">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={metaPost.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Lead: más ancho + mejor ritmo */}
        <section className="mx-auto mt-10 w-full max-w-5xl lg:px-6">
          <p className="mx-auto max-w-5xl text-pretty text-base leading-relaxed text-text/85 sm:text-lg">
            {isLong
              ? "Before you continue: you don’t need to remember a dream for it to have happened."
              : "A calm, science-first look at what dreams might be doing while you sleep."}
          </p>
        </section>

        {/* ✅ Intro block: primer tramo del contenido a ancho max-w-5xl (se siente menos “estrecho”) */}
        <section className="mx-auto mt-6 w-full max-w-5xl lg:px-6">
          <div className="space-y-6 text-sm leading-relaxed text-muted sm:text-base sm:leading-relaxed">
            {content}
          </div>
        </section>

        {/* More from this format */}
        <section className="mx-auto mt-12 w-full max-w-5xl border-t border-border/60 pt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted">
                KEEP EXPLORING
              </p>
              <h3 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-text">
                More from {formatLabels[metaPost.format]}
              </h3>
              <p className="mt-2 text-sm text-muted">
                Browse more posts in the same format—then jump across routes
                whenever you want.
              </p>
            </div>

            <Link
              href={`/posts?format=${metaPost.format}`}
              className="
                inline-flex w-fit items-center justify-center rounded-xl
                border border-border bg-surface-1 px-5 py-2.5
                text-sm font-semibold text-text shadow-soft transition
                hover:bg-surface-2 hover:border-accent/30 hover:text-accent
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              View all
              <span className="ml-2 text-muted">›</span>
            </Link>
          </div>

          {moreFromFormat.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
              <p className="text-sm text-muted">
                More posts are coming soon for this format.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {moreFromFormat.map((p) => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className="
                    group rounded-2xl border border-border bg-surface-1
                    p-6 shadow-soft transition
                    hover:bg-surface-2 hover:border-accent/30
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-muted">
                      {formatLabels[p.format]}
                    </span>
                    <span className="text-xs text-muted">{p.date}</span>
                  </div>

                  <h4 className="mt-4 text-lg font-semibold text-text group-hover:text-accent">
                    {p.title}
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>

                  <div className="mt-5 text-sm font-semibold text-text">
                    Read post →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="mx-auto mt-12 w-full max-w-5xl rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text">
                Join the AtomicCurious Newsletter
              </h3>
              <p className="mt-1 text-sm text-muted">
                Weekly sparks of science, technology, and future-thinking—no
                noise.
              </p>
            </div>
            <Link
              href="/newsletter"
              className="
                inline-flex items-center justify-center rounded-xl
                bg-accent px-6 py-3 text-sm font-semibold text-bg
                shadow-accent transition hover:brightness-110
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              Subscribe
            </Link>
          </div>
        </section>

        <div className="mx-auto mt-12 w-full max-w-5xl">
          <Link
            href="/posts"
            className="
              inline-flex rounded-xl
              border border-border bg-surface-1 px-5 py-2.5
              text-sm font-semibold text-text shadow-soft transition
              hover:bg-surface-2 hover:border-accent/30 hover:text-accent
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            ← Back to posts
          </Link>
        </div>
      </article>
    </main>
  )
}
