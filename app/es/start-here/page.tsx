// app/es/start-here/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { latestPostEs as LATEST_POST } from "@/content/posts.es"

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

function Pill({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1",
        "text-[11px] font-semibold tracking-wide",
        "border-border bg-bg/35 text-text",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  )
}

function StepCard({
  n,
  title,
  body,
}: {
  n: string
  title: string
  body: string
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl",
        "border border-border bg-surface-1 p-6 shadow-soft",
        "transition hover:bg-surface-2 hover:border-accent/20",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-bg/35 text-sm font-semibold text-text">
          {n}
        </span>
        <div>
          <p className="text-sm font-semibold text-text">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="relative w-full overflow-hidden bg-bg">
      {/* Background: premium calm + 1 accent (ATOM = teal) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />

        {/* Single glow (teal) — calm */}
        <div className="absolute -top-32 left-0 h-[560px] w-[820px] bg-[radial-gradient(circle_at_25%_25%,rgb(var(--accent)/0.18),transparent_62%)]" />

        {/* Star-dust softer (less noisy) */}
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_20%_30%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_80%_35%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_40%_80%,#fff_1px,transparent_1.5px)] [background-size:460px_460px]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,transparent_55%,rgb(0_0_0/0.66)_100%)] opacity-80" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Header (ATOM host) */}
        <header className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-medium tracking-wide text-muted">
                ATOMICCURIOUS · EMPIEZA AQUÍ
              </p>

              {/* Chips: keep premium (no neon rainbow) */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Pill className="border-border bg-bg/40 text-text">
                  Ruta rápida: 3–5 min
                </Pill>
                <Pill className="border-accent/35 text-accent">
                  ATOM · CURIOSITY
                </Pill>
                <Pill className="border-border bg-bg/40 text-text">
                  RANKED
                </Pill>
                <Pill className="border-border bg-bg/40 text-text">
                  QUIZ
                </Pill>
              </div>

              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                Empieza aquí.
              </h1>

              <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                Si llegas por primera vez, este es tu punto de entrada. Atom te
                guía por el universo:{" "}
                <span className="text-text font-medium">
                  preguntas fascinantes
                </span>
                , comparaciones claras y experiencias para aprender jugando—sin
                ruido.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/es/posts"
                  className={[
                    "inline-flex items-center justify-center rounded-xl",
                    "bg-accent px-6 py-3 text-sm font-semibold text-bg",
                    "shadow-accent transition hover:brightness-110",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                  ].join(" ")}
                >
                  Explorar posts <span aria-hidden className="ml-2">→</span>
                </Link>

                <Link
                  href="/es/newsletter"
                  className={[
                    "inline-flex items-center justify-center rounded-xl",
                    "border border-border bg-surface-1 px-6 py-3",
                    "text-sm font-semibold text-text transition",
                    "hover:bg-surface-2 hover:border-accent/30 hover:text-accent",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                  ].join(" ")}
                >
                  Únete al newsletter <span aria-hidden className="ml-2">→</span>
                </Link>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-xs text-muted">
                  Consejo de Atom: empieza por lo más reciente y luego filtra por formato.
                </span>
                <Link
                  href="/es/posts?format=curiosity"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-text hover:text-accent"
                >
                  Ver Curiosity <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

            {/* Atom visual (calm premium card) */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_45%_35%,rgb(var(--accent)/0.14),transparent_62%)]"
              />

              <div
                className={[
                  "group relative overflow-hidden rounded-3xl",
                  "border border-border bg-bg/30 p-6 shadow-soft",
                  "backdrop-blur-[2px]",
                  "transition hover:border-accent/25 hover:bg-bg/40",
                ].join(" ")}
              >
                {/* hover glow */}
                <div
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute inset-0 opacity-0 transition",
                    "group-hover:opacity-100",
                    "bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent)/0.12),transparent_60%)]",
                  ].join(" ")}
                />

                <div className="relative flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-wide text-muted">
                    TU GUÍA
                  </p>
                  <span className="rounded-full border border-accent/35 bg-bg/30 px-3 py-1 text-[11px] font-semibold text-accent">
                    ATOM
                  </span>
                </div>

                <div className="relative mt-5 grid grid-cols-[96px_1fr] items-center gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-border bg-bg/40">
                    <Image
                      src="/characters/atom.png"
                      alt="Atom — Curiosity"
                      fill
                      sizes="96px"
                      className="object-contain"
                      priority={false}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text">
                      “¿Qué quieres entender hoy?”
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Elige un tema, mira el video, y usa la web para convertirlo en
                      claridad.
                    </p>
                  </div>
                </div>

                <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/es/posts?format=curiosity"
                    className={[
                      "inline-flex items-center justify-center rounded-xl",
                      "border border-border bg-bg/35 px-4 py-3",
                      "text-sm font-semibold text-text transition",
                      "hover:bg-surface-2 hover:border-accent/30 hover:text-accent",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                    ].join(" ")}
                  >
                    Preguntas rápidas <span aria-hidden className="ml-2">→</span>
                  </Link>

                  <Link
                    href="/es/about"
                    className={[
                      "inline-flex items-center justify-center rounded-xl",
                      "border border-border bg-bg/35 px-4 py-3",
                      "text-sm font-semibold text-text transition",
                      "hover:bg-surface-2 hover:border-accent/30 hover:text-accent",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                    ].join(" ")}
                  >
                    Conocer el universo <span aria-hidden className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
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
            className={[
              "mt-8 block rounded-2xl",
              "border border-border bg-surface-1 p-6 shadow-soft transition",
              "hover:bg-surface-2 hover:border-accent/30",
            ].join(" ")}
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

        {/* How it works */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-text">
              Cómo funciona AtomicCurious
            </h2>
            <p className="text-muted">
              Del asombro a la claridad: un flujo simple para aprender sin ruido.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StepCard
              n="1"
              title="Mira"
              body="Cada tema empieza con un video corto que enciende la curiosidad con tono cinematográfico."
            />
            <StepCard
              n="2"
              title="Lee"
              body="Profundiza con posts claros, estructurados y reutilizables: buscables y fáciles de revisar."
            />
            <StepCard
              n="3"
              title="Suscríbete"
              body="El newsletter es la señal: lo mejor, sin spam y sin ruido. Solo lo que vale la pena."
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/es/newsletter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              Ver el boletín <span aria-hidden>→</span>
            </Link>
            <Link
              href="/es/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              Conocer el universo <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

