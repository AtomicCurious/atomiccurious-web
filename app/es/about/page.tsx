import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { characters } from "@/content/characters"

export const metadata: Metadata = {
  title: "Acerca | AtomicCurious",
  description:
    "AtomicCurious es un universo editorial de ciencia, tecnología y futuro: preguntas, rankings y experiencias interactivas — guiadas por Atom, Iris y Core.",
  alternates: {
    canonical: "/es/about",
    languages: {
      en: "/en/about",
      es: "/es/about",
    },
  },
}

type CharacterId = "atom" | "iris" | "core"

function CharacterCard({
  id,
  label,
  title,
  body,
  href,
  cta,
}: {
  id: CharacterId
  label: string
  title: string
  body: string
  href: string
  cta: string
}) {
  const c = characters[id]

  const safeImage =
    id === "iris"
      ? "/characters/iris.png"
      : id === "atom"
      ? "/characters/atom.png"
      : "/characters/core.png"

  // Sub-acento por personaje (controlado, nada gamer)
  const accentGlow =
    id === "atom"
      ? "bg-[radial-gradient(circle_at_25%_10%,rgb(var(--accent)/0.20),transparent_60%)]"
      : id === "iris"
      ? "bg-[radial-gradient(circle_at_25%_10%,rgb(var(--accent-alt)/0.18),transparent_60%)]"
      : "bg-[radial-gradient(circle_at_25%_10%,rgb(34_197_94/0.16),transparent_60%)]"

  const badgeBorder =
    id === "atom"
      ? "border-accent/35"
      : id === "iris"
      ? "border-[rgb(var(--accent-alt)/0.35)]"
      : "border-[rgb(34_197_94/0.30)]"

  const badgeText =
    id === "atom"
      ? "text-accent"
      : id === "iris"
      ? "text-[rgb(var(--accent-alt))]"
      : "text-[rgb(34_197_94)]"

  const hoverText =
    id === "atom"
      ? "group-hover:text-accent"
      : id === "iris"
      ? "group-hover:text-[rgb(var(--accent-alt))]"
      : "group-hover:text-[rgb(34_197_94)]"

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl",
        "border border-border bg-surface-1 p-6 shadow-soft",
        "transition hover:bg-surface-2 hover:border-accent/20",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 opacity-0 transition",
          "group-hover:opacity-100",
          accentGlow,
        ].join(" ")}
      />

      <div className="relative flex items-center gap-4">
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
          <span
            className={[
              "inline-flex items-center rounded-full border bg-bg/30 px-3 py-1",
              "text-[11px] font-semibold tracking-wide",
              badgeBorder,
              badgeText,
            ].join(" ")}
          >
            {label}
          </span>

          <p className="mt-2 text-sm font-semibold text-text">
            {c.name} <span className="text-muted font-medium">· {c.age}</span>
          </p>
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-semibold text-text">{title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">{body}</p>

      <Link
        href={href}
        className={[
          "relative mt-6 inline-flex items-center gap-2",
          "text-sm font-semibold text-text transition",
          hoverText,
        ].join(" ")}
      >
        {cta} <span aria-hidden>→</span>
      </Link>
    </div>
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
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
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
      {/* Background: editorial/cinemático, más presente */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute -top-28 left-0 h-[560px] w-[820px] bg-[radial-gradient(circle_at_25%_25%,rgb(var(--accent)/0.18),transparent_62%)]" />
        <div className="absolute -bottom-44 right-0 h-[560px] w-[820px] bg-[radial-gradient(circle_at_75%_55%,rgb(var(--accent-alt)/0.13),transparent_64%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_20%_30%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_80%_35%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_40%_80%,#fff_1px,transparent_1.5px)] [background-size:420px_420px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,transparent_55%,rgb(0_0_0/0.60)_100%)] opacity-80" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-muted">
            ATOMICCURIOUS · ACERCA
          </p>

          {/* Credibilidad */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
              Publicamos desde 2023
            </span>
          </div>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Un universo editorial para la curiosidad.
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            AtomicCurious explora ciencia, tecnología y futuro con una filosofía
            simple:{" "}
            <span className="text-text font-medium">
              menos ruido, mejores preguntas
            </span>
            . Aquí encuentras historias que asombran, rankings que aclaran y
            formatos interactivos que enseñan jugando.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/es/start-here"
              className={[
                "inline-flex items-center justify-center rounded-xl",
                "bg-accent px-6 py-3 text-sm font-semibold text-bg",
                "shadow-accent transition hover:brightness-110",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
              ].join(" ")}
            >
              Empieza aquí <span aria-hidden className="ml-2">→</span>
            </Link>

            <Link
              href="/es/newsletter"
              className={[
                "inline-flex items-center justify-center rounded-xl",
                "border border-border bg-surface-1 px-6 py-3",
                "text-sm font-semibold text-text transition",
                "hover:bg-surface-2 hover:border-accent/30 hover:text-accent",
              ].join(" ")}
            >
              Únete al newsletter <span aria-hidden className="ml-2">→</span>
            </Link>
          </div>
        </header>

        {/* Misión */}
        <section className="mt-14 border-t border-border pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            Misión
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Hacer lo complejo más claro
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Traducimos temas intimidantes a modelos mentales claros—sin
                “aguarlos”.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Cinematográfico, sin ruido
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Visuales fuertes, escritura precisa y diseño calmado—para que la
                señal se mantenga nítida.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Un universo al que puedas volver
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Los videos encienden la curiosidad. La web deja el conocimiento
                buscable, estructurado y útil.
              </p>
            </div>
          </div>
        </section>

        {/* El sistema */}
        <section className="mt-14 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-text">
              El sistema
            </h2>
            <p className="text-muted">
              Del asombro a la claridad: cada pieza se convierte en algo
              reutilizable.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StepCard
              n="1"
              title="Video → curiosidad"
              body="Un video corto abre la pregunta y enciende el interés con tono cinematográfico."
            />
            <StepCard
              n="2"
              title="Post → comprensión"
              body="La web transforma el tema en estructura: claro, buscable y fácil de revisar."
            />
            <StepCard
              n="3"
              title="Recursos → profundidad"
              body="Cuando realmente aporta valor, añadimos recursos para seguir explorando sin perderte."
            />
          </div>

          <div className="mt-6">
            <Link
              href="/es/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              Ver posts <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Elige tu camino */}
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
              body="Listas, comparaciones y marcos claros para entender temas complejos sin perderte."
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/es/community"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              Unirte a la comunidad <span aria-hidden>→</span>
            </Link>
            <Link
              href="/es/newsletter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-accent"
            >
              Recibir el boletín <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Qué esperar */}
        <section className="mt-14 border-t border-border pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            Qué esperar
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Videos → Posts → Recursos
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Cada video se convierte en un post buscable, y se agregan
                recursos cuando realmente aportan valor.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Newsletter como señal
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Un email semanal calmado: novedades, experimentos y descargas—
                sin spam, sin ruido.
              </p>
            </div>
          </div>

          {/* CTA final */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface-1 p-8 shadow-soft sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-text">
                  Únete al Newsletter de AtomicCurious
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Chispas semanales de ciencia, tecnología y futuro—sin ruido.
                </p>
              </div>

              <Link
                href="/es/newsletter"
                className={[
                  "inline-flex items-center justify-center rounded-xl",
                  "bg-accent px-6 py-3 text-sm font-semibold text-bg",
                  "shadow-accent transition hover:brightness-110",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
                ].join(" ")}
              >
                Únete al newsletter <span aria-hidden className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

