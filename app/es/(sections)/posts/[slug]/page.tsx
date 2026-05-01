// app/es/(sections)/posts/[slug]/page.tsx
import Link from "next/link"
import type { CSSProperties } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import fs from "node:fs/promises"
import path from "node:path"
import PostNote from "@/components/posts/blocks/PostNote"
import { AffiliateBlock } from "@/components/posts/blocks/AffiliateBlock"

import { postsEs } from "@/content/posts.es"

import {
  estimateWords,
  formatLabels,
  formatPostDate,
  formatToHost,
  normalizeSlug,
  readingTimeLabel,
} from "@/lib/posts-utils"

import MakeItRealCard from "@/components/posts/blocks/MakeItRealCard"
import CharacterCallout from "@/components/posts/blocks/CharacterCallout"
import { PostEndCTA } from "@/components/posts/layout/PostEndCTA"
import { PostFaq } from "@/components/posts/layout/PostFaq"
import { PostHeaderAnimated } from "@/components/posts/layout/PostHeaderAnimated"
import { PostShell } from "@/components/posts/layout/PostShell"
import { PostProse } from "@/components/posts/layout/PostProse"

type PageProps = {
  params: Promise<{ slug: string }>
}

type Frontmatter = {
  youtubeId?: string
  thesis?: string
}

type PostAccent = "atom" | "iris" | "core"

const accentRgbByPost: Record<PostAccent, string> = {
  atom: "29 196 151",
  iris: "125 211 252",
  core: "245 158 11",
}

async function readMdxEs(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "posts",
    "es",
    `${slug}.mdx`
  )

  return fs.readFile(filePath, "utf8")
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = normalizeSlug(rawSlug)
  const metaPost = postsEs.find((p) => p.slug === slug)

  if (!slug || !metaPost) {
    return {
      title: "Post no encontrado | AtomicCurious",
      description: "Esta página todavía no existe.",
    }
  }

  return {
    title: `${metaPost.title} | AtomicCurious`,
    description: metaPost.description,
  }
}

export async function generateStaticParams() {
  return postsEs.map((p) => ({ slug: p.slug }))
}

export default async function Page({ params }: PageProps) {
  const { slug: rawSlug } = await params
  const slug = normalizeSlug(rawSlug)

  const metaPost = postsEs.find((p) => p.slug === slug)

  if (!slug || !metaPost) return notFound()

  const moreFromFormat = postsEs
    .filter((p) => p.format === metaPost.format && p.slug !== slug)
    .slice(0, 4)

  let mdxSource = ""

  try {
    mdxSource = await readMdxEs(slug)
  } catch {
    return notFound()
  }

  const words = estimateWords(mdxSource)
  const host = formatToHost(metaPost.format) as PostAccent

  const readingTime = metaPost.readingTime
    ? `${metaPost.readingTime} min`
    : readingTimeLabel(words)

  const postDate = formatPostDate(metaPost.date, "es-MX")

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: mdxSource,
    components: {
      MakeItRealCard: (props: any) => (
        <MakeItRealCard host={host} {...props} />
      ),
      CharacterCallout: (props: any) => (
        <CharacterCallout host={host} {...props} />
      ),
      PostFaq,
      PostShell,
      PostProse,
      PostEndCTA,
    },
    options: { parseFrontmatter: true },
  })

  const youtubeId = frontmatter?.youtubeId
  const thesis = frontmatter?.thesis

  return (
    <main
      style={
        {
          "--accent": accentRgbByPost[host],
        } as CSSProperties
      }
      className="relative w-full overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <span className="ac-post-particle-panel ac-post-particle-panel-left" />
        <span className="ac-post-particle-panel ac-post-particle-panel-right" />
      </div>

      <article className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
        <PostHeaderAnimated
          title={metaPost.title}
          description={metaPost.description}
          format={metaPost.format}
          tag={metaPost.tag}
          postDate={postDate}
          readingTime={readingTime}
        />

        {thesis ? (
          <section
            aria-label="La idea central del post"
            className="
              mx-auto w-full max-w-4xl overflow-hidden rounded-2xl
              border border-white/10
              bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_8%,#0b1f14_92%)_0%,#0b1f14_65%,rgba(255,255,255,0.025)_100%)]
              shadow-[0_18px_60px_rgba(0,0,0,0.32)]
            "
          >
            <div className="relative px-6 py-5 sm:px-7 sm:py-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(var(--accent),0.16),transparent_34%)]"
              />

              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-[5px] bg-[rgb(var(--accent))] shadow-[0_0_18px_rgba(var(--accent),0.55)]"
              />

              <div className="relative">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent))]">
                  La idea central
                </p>

                <p className="max-w-3xl text-balance text-lg font-semibold leading-relaxed text-text sm:text-xl">
                  {thesis}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto mt-14 w-full max-w-5xl">
          {content}
        </section>

        {youtubeId ? (
          <section className="mx-auto mt-0 w-full max-w-4xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Ver en video
              </p>

              <span className="hidden h-px flex-1 bg-white/10 sm:block" />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={metaPost.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

              <PostNote variant="video">
               Actualmente no contamos con videos en español.  
               Puedes activar los subtítulos en YouTube — ya están adaptados para ti.
              </PostNote>
          </section>
        ) : null}

        <section className="mx-auto mt-16 w-full max-w-5xl border-t border-white/10 pt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                Sigue explorando
              </p>

              <h3 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-text">
                Más de {formatLabels[metaPost.format]}
              </h3>

              <p className="mt-2 text-sm text-white/55">
                Más posts del mismo formato — y luego cruza rutas cuando
                quieras.
              </p>
            </div>

            <Link
              href={`/es/posts?format=${metaPost.format}`}
              className="
                inline-flex w-fit items-center justify-center rounded-xl
                border border-white/10 bg-white/[0.025] px-5 py-2.5
                text-sm font-semibold text-white/80 transition
                hover:border-[rgba(var(--accent),0.35)] hover:bg-[rgba(var(--accent),0.08)] hover:text-[rgb(var(--accent))]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              Ver todo
              <span className="ml-2 text-white/45">›</span>
            </Link>
          </div>

          {moreFromFormat.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <p className="text-sm text-white/55">
                Pronto habrá más posts en este formato.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {moreFromFormat.map((p) => (
                <Link
                  key={p.id}
                  href={`/es/posts/${p.slug}`}
                  className="
                    group rounded-2xl border border-white/10 bg-white/[0.025]
                    p-6 transition
                    hover:border-[rgba(var(--accent),0.35)] hover:bg-[rgba(var(--accent),0.06)]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-white/45">
                      {formatLabels[p.format]}
                    </span>

                    <span className="text-xs text-white/45">
                      {formatPostDate(p.date, "es-MX")}
                    </span>
                  </div>

                  <h4 className="mt-4 text-lg font-semibold text-text group-hover:text-[rgb(var(--accent))]">
                    {p.title}
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {p.description}
                  </p>

                  <div className="mt-5 text-sm font-semibold text-white/80">
                    Leer post →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto mt-14 w-full max-w-5xl">
          <PostEndCTA locale="es" />
        </section>

        {metaPost.affiliateItems && (
          <AffiliateBlock items={metaPost.affiliateItems} locale="es" />
      )}

        <section className="mx-auto mt-12 w-full max-w-5xl">
          <Link
            href="/es/posts"
            className="
              inline-flex rounded-xl
              border border-white/10 bg-white/[0.025] px-5 py-2.5
              text-sm font-semibold text-white/80 transition
              hover:border-[rgba(var(--accent),0.35)] hover:bg-[rgba(var(--accent),0.08)] hover:text-[rgb(var(--accent))]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            ← Volver a posts
          </Link>
        </section>
      </article>
    </main>
  )
}