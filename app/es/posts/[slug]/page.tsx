// app/es/posts/[slug]/page.tsx
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import fs from "node:fs/promises"
import path from "node:path"

import { postsEs, PostFormat } from "@/content/posts.es"

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

// Mapea format -> host (tu regla CRÍTICA)
const formatToHost = (format: PostFormat) => {
  if (format === "curiosity") return "atom" as const
  if (format === "ranked") return "iris" as const
  return "core" as const
}

// ✅ IMPORTANTE: tus MDX están en src/content/posts/es
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

// Heurística simple para decidir si mostrar PostHeroHost
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

// Recomendado: static params para build
export async function generateStaticParams() {
  return postsEs.map((p) => ({ slug: p.slug }))
}

// ---------------------------
// Page
// ---------------------------
type Frontmatter = {
  youtubeId?: string
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const resolvedParams = await Promise.resolve(params)
  const slug = normalizeSlug(resolvedParams?.slug)

  const metaPost = postsEs.find((p) => p.slug === slug)
  if (!slug || !metaPost) return notFound()

  // "Más de este formato"
  const moreFromFormat = postsEs
    .filter((p) => p.format === metaPost.format && p.slug !== slug)
    .slice(0, 4)

  // Lee + compila MDX
  let mdxSource = ""
  try {
    mdxSource = await readMdxEs(slug)
  } catch {
    return notFound()
  }

  const words = estimateWords(mdxSource)
  const isLong = words >= 2000
  const host = formatToHost(metaPost.format)
  const readingTime = readingTimeLabel(words)

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: mdxSource,
    components: {
      // ✅ disponibles dentro del MDX
      MakeItRealCard: (props: any) => <MakeItRealCard host={host} {...props} />,
      CharacterCallout: (props: any) => (
        <CharacterCallout host={host} {...props} />
      ),
    },
    options: { parseFrontmatter: true },
  })

  const youtubeId = frontmatter?.youtubeId

  return (
    <main className="w-full">
      {/* ✅ Layout “divulgación moderna” (como EN):
          - Contenedor exterior más ancho
          - Header en 2 columnas (desktop)
          - Módulos (video, cards) a max-w-5xl
          - Body más ancho para lectura visual-first */}
      <article className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10 sm:py-12">
        {/* ✅ Breadcrumb eliminado */}

        {/* ✅ Header en grid para lg+ */}
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

              {/* PostHeroHost (OPCIONAL, solo si es largo) */}
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
                  DETALLES
                </p>

                <div className="mt-3 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted">Fecha</span>
                    <span className="text-text/90">{metaPost.date}</span>
                  </div>

                  {readingTime ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted">Lectura</span>
                      <span className="text-text/90">{readingTime}</span>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted">Formato</span>
                    <span className="text-text/90">
                      {formatLabels[metaPost.format]}
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-border/60 pt-4">
                  <Link
                    href={`/es/posts?format=${metaPost.format}`}
                    className="
                      inline-flex w-full items-center justify-center rounded-xl
                      border border-border bg-bg/30 px-4 py-2.5
                      text-sm font-semibold text-text shadow-soft transition
                      hover:bg-surface-2 hover:border-accent/30 hover:text-accent
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                    "
                  >
                    Más como este
                    <span className="ml-2 text-muted">›</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </header>

        {/* YouTube via frontmatter (opcional) */}
        {youtubeId ? (
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
        ) : null}

        {/* ✅ Lead: más ancho, sin justificar, y sin meter texto inventado */}
        <section className="mx-auto mt-10 w-full max-w-5xl lg:px-6">
          <p className="mx-auto max-w-5xl text-pretty text-base leading-relaxed text-text/85 sm:text-lg">
            {metaPost.description}
          </p>
        </section>

        {/* ✅ CUERPO MDX: más ancho (max-w-5xl) para “divulgación moderna” */}
        <section className="mx-auto mt-8 w-full max-w-5xl lg:px-6">
          <div className="space-y-6 text-sm leading-relaxed text-muted sm:text-base sm:leading-relaxed">
            {content}
          </div>
        </section>

        {/* Más de este formato */}
        <section className="mx-auto mt-12 w-full max-w-5xl border-t border-border/60 pt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted">
                SIGUE EXPLORANDO
              </p>
              <h3 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-text">
                Más de {formatLabels[metaPost.format]}
              </h3>
              <p className="mt-2 text-sm text-muted">
                Más posts del mismo formato—y luego cruza rutas cuando quieras.
              </p>
            </div>

            <Link
              href={`/es/posts?format=${metaPost.format}`}
              className="
                inline-flex w-fit items-center justify-center rounded-xl
                border border-border bg-surface-1 px-5 py-2.5
                text-sm font-semibold text-text shadow-soft transition
                hover:bg-surface-2 hover:border-accent/30 hover:text-accent
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              Ver todo
              <span className="ml-2 text-muted">›</span>
            </Link>
          </div>

          {moreFromFormat.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
              <p className="text-sm text-muted">
                Pronto habrá más posts en este formato.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {moreFromFormat.map((p) => (
                <Link
                  key={p.slug}
                  href={`/es/posts/${p.slug}`}
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
                    Leer post →
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
                Únete al Newsletter de AtomicCurious
              </h3>
              <p className="mt-1 text-sm text-muted">
                Chispas semanales de ciencia, tecnología y futuro—sin ruido.
              </p>
            </div>
            <Link
              href="/es/newsletter"
              className="
                inline-flex items-center justify-center rounded-xl
                bg-accent px-6 py-3 text-sm font-semibold text-bg
                shadow-accent transition hover:brightness-110
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              Suscribirme
            </Link>
          </div>
        </section>

        <div className="mx-auto mt-12 w-full max-w-5xl">
          <Link
            href="/es/posts"
            className="
              inline-flex rounded-xl
              border border-border bg-surface-1 px-5 py-2.5
              text-sm font-semibold text-text shadow-soft transition
              hover:bg-surface-2 hover:border-accent/30 hover:text-accent
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            ← Volver a posts
          </Link>
        </div>
      </article>
    </main>
  )
}
