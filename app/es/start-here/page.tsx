import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { latestPostEs as LATEST_POST } from "@/content/posts.es"
import { characters } from "@/content/characters"

export const metadata: Metadata = {
  title: "Empieza aquí | AtomicCurious",
  description:
    "¿Nuevo en AtomicCurious? Empieza aquí para explorar ciencia, tecnología y futuro a través de preguntas, rankings y experiencias interactivas.",
  alternates: {
    canonical: "/es/start-here",
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

  // OJO: forzamos minúsculas para que coincida con tus archivos reales en /public/characters/
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
            ATOMICCURIOUS · EMPIEZA AQUÍ
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Empieza aquí.
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Si llegas por primera vez, este es tu punto de entrada. Explora
            AtomicCurious a tu ritmo: preguntas fascinantes, rankings claros y
            experiencias para aprender jugando.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/es/posts"
              className="
                inline-flex items-center justify-center rounded-xl
                bg-accent px-6 py-3 text-sm font-semibold text-bg
                shadow-accent transition hover:brightness-110
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70
              "
            >
              Explorar posts
            </Link>

            <Link
              href="/es/newsletter"
              className="
                inline-flex items-center justify-center rounded-xl
                border border-border bg-surface-1 px-6 py-3
                text-sm font-semibold text-text transition
                hover:bg-surface-2 hover:border-accent/30 hover:text-accent
              "
            >
              Únete al newsletter
            </Link>
          </div>
        </header>

        {/* Latest post */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-text">
              Último post
            </h2>
            <p className="text-muted">
              Empieza por lo más reciente y luego explora libremente.
            </p>
          </div>

          <Link
            href={`/es/posts/${LATEST_POST.slug}`}
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
              Leer el post <span aria-hidden>→</span>
            </div>
          </Link>

          <div className="mt-6">
            <Link
              href="/es/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              Ver todos los posts <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Paths */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-text">
              Elige tu camino
            </h2>
            <p className="text-muted">
              Tres formatos distintos. Una sola curiosidad.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <CharacterCard
              id="atom"
              label="CURIOSITY · ATOM"
              title="Grandes preguntas y momentos “¿cómo es posible?”"
              body="Datos increíbles, fenómenos extraños e historias que te hacen decir: “espera… ¿qué?”"
              href="/es/posts?format=curiosity"
              cta="Explorar Curiosity"
            />

            <CharacterCard
              id="iris"
              label="RANKED · IRIS"
              title="Rankings, comparaciones y claridad"
              body="Listas, rankings y marcos claros para entender temas complejos sin perderte."
              href="/es/posts?format=ranked"
              cta="Explorar Ranked"
            />

            <CharacterCard
              id="core"
              label="QUIZ · CORE"
              title="Retos rápidos y aprendizaje interactivo"
              body="Quizzes y dinámicas que revelan lo que sabes—y lo que vas a disfrutar aprender después."
              href="/es/posts?format=quiz"
              cta="Explorar Quiz"
            />
          </div>
        </section>

        {/* How it works */}
        <section className="mt-14 border-t border-border pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            Cómo funciona AtomicCurious
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-bg/40 p-6">
              <p className="text-sm font-semibold text-text">1) Mira</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Cada tema empieza con un video corto que enciende la curiosidad.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-bg/40 p-6">
              <p className="text-sm font-semibold text-text">2) Lee</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Profundiza con posts claros, estructurados y reutilizables.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-bg/40 p-6">
              <p className="text-sm font-semibold text-text">3) Suscríbete</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                El newsletter es la señal: lo mejor, sin ruido.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}



