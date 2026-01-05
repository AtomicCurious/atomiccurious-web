import Link from "next/link"
import type { Metadata } from "next"
import { postsEs, PostFormat } from "@/content/posts.es"

type Post = {
  title: string
  description: string
  date: string
  youtubeId?: string
  sections: { heading: string; body: string }[]
  takeaways: string[]
}

const POSTS: Record<string, Post> = {
  "por-que-sonamos": {
    title: "Por qué soñamos: el propósito oculto de las historias del sueño",
    description:
      "Una exploración cinematográfica de lo que dice la ciencia sobre los sueños—y por qué tu cerebro los genera.",
    date: "2025-12-29",
    youtubeId: "dQw4w9WgXcQ",
    sections: [
      {
        heading: "Los sueños no son aleatorios",
        body:
          "Las teorías modernas sugieren que soñar puede ayudar a regular emociones, consolidar memorias y simular amenazas—como un sandbox mental nocturno.",
      },
      {
        heading: "Memoria, emoción y construcción de patrones",
        body:
          "Durante el sueño, el cerebro repite y remezcla experiencias. Los sueños pueden ser la “interfaz” subjetiva de ese proceso.",
      },
      {
        heading: "Lo que todavía no sabemos",
        body:
          "Ninguna teoría lo explica todo. El misterio es parte de lo interesante—y de la frontera científica.",
      },
    ],
    takeaways: [
      "Soñar podría apoyar la consolidación de memoria y el procesamiento emocional.",
      "Puede ser un espacio de simulación para resolver problemas y construir patrones.",
      "La ciencia aún debate la función “principal”: múltiples roles pueden coexistir.",
    ],
  },
}

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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const resolvedParams = await Promise.resolve(params)
  const slug = normalizeSlug(resolvedParams?.slug)
  const post = POSTS[slug]

  const metaPost = postsEs.find((p) => p.slug === slug)
  const format = metaPost?.format

  // "Más de este formato"
  const moreFromFormat =
    format
      ? postsEs
          .filter((p) => p.format === format && p.slug !== slug)
          .slice(0, 4)
      : []

  if (!slug || !post || !metaPost) {
    return (
      <main className="w-full">
        <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
          <h1 className="text-2xl font-semibold text-text">
            Post no encontrado
          </h1>
          <p className="mt-3 text-muted">Esta página todavía no existe.</p>

          <div className="mt-4 rounded-2xl border border-border bg-surface-1 p-4 shadow-soft">
            <p className="text-xs text-muted">Slug solicitado</p>
            <p className="mt-1 font-mono text-sm text-text/90">
              {resolvedParams?.slug ?? "(undefined)"}
            </p>
            <p className="mt-2 text-xs text-muted">
              Prueba: <span className="font-mono">/es/posts/por-que-sonamos</span>
            </p>
          </div>

          <Link
            href="/es"
            className="
              mt-6 inline-flex rounded-xl
              border border-border bg-surface-1 px-5 py-2.5
              text-sm font-semibold text-text shadow-soft transition
              hover:bg-surface-2 hover:border-accent/30 hover:text-accent
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full">
      <article className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted">
          <Link className="hover:text-text" href="/es">
            Inicio
          </Link>
          <span className="mx-2 text-muted/70">›</span>
          <Link className="hover:text-text" href="/es/posts">
            Posts
          </Link>
          <span className="mx-2 text-muted/70">›</span>
          <span className="text-text/90">{formatLabels[metaPost.format]}</span>
        </nav>

        <header>
          <p className="text-xs font-medium tracking-wide text-muted">
            ATOMICCURIOUS · POST
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {post.description}
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

            <span className="ml-auto text-xs text-muted">{post.date}</span>
          </div>
        </header>

        {post.youtubeId && (
          <section className="mt-10 overflow-hidden rounded-2xl border border-border bg-bg/30 shadow-soft">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${post.youtubeId}`}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <section className="mt-12 space-y-10">
          {post.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-semibold text-text">{s.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {s.body}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
          <h3 className="text-lg font-semibold text-text">Ideas clave</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {post.takeaways.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Más de este formato */}
        <section className="mt-12 border-t border-border/60 pt-12">
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
        <section className="mt-12 rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
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

        <div className="mt-12">
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

