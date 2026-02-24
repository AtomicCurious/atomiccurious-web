// app/es/recursos/page.tsx
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Recursos | AtomicCurious",
  description:
    "Ebooks, plantillas, revista y futuros productos para mentes curiosas. Lanzamiento: 18 de julio de 2026.",
}

const LAUNCH_DATE = "18 de julio de 2026"

/**
 * Cambia esto cuando lances Recursos.
 * - false = vista mínima Próximamente (Core esperando)
 * - true  = experiencia completa (tu página original)
 */
const IS_RECURSOS_LIVE = false

/**
 * Grain sutil (consistente con tus “Coming Soon”)
 */
const COMING_SOON_CSS = `
.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(var(--accent),0.10), transparent 55%),
    radial-gradient(circle at 70% 40%, rgba(var(--accent-alt),0.08), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 55%);
  mix-blend-mode: normal;
}
`

/**
 * Tu CSS original (con filtro por guía) — se conserva intacto.
 */
const RECURSOS_CSS = `
/* ===== Resaltado opcional según personaje seleccionado ===== */
.ac-res-section { position: relative; }

body[data-character="core"] .ac-res-section[data-guide="core"],
body[data-character="iris"] .ac-res-section[data-guide="iris"],
body[data-character="atom"] .ac-res-section[data-guide="atom"]{
  outline: 1px solid rgba(var(--accent), 0.28);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 26px 70px rgba(0,0,0,0.35);
}

/* ===== Thumb fallback ===== */
.ac-thumb {
  background: radial-gradient(120% 120% at 30% 20%, rgba(var(--accent),0.18), transparent 55%),
              radial-gradient(120% 120% at 70% 80%, rgba(var(--accent-alt),0.14), transparent 60%),
              linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
}

/* ===== Filtro (radio) ===== */
.ac-filter { position: relative; }

.ac-filter input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
}

.ac-filter .ac-pill {
  user-select: none;
  cursor: pointer;
}

/* Estilo del pill seleccionado */
#ac-f-all:checked  ~ .ac-filterbar label[for="ac-f-all"],
#ac-f-core:checked ~ .ac-filterbar label[for="ac-f-core"],
#ac-f-iris:checked ~ .ac-filterbar label[for="ac-f-iris"],
#ac-f-atom:checked ~ .ac-filterbar label[for="ac-f-atom"]{
  border-color: rgba(var(--accent), 0.30);
  background: rgba(var(--accent), 0.12);
  color: rgb(var(--text));
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 14px 40px rgba(0,0,0,0.25);
}

/* Switching por guía */
.ac-guide-core, .ac-guide-iris, .ac-guide-atom { display: block; }

#ac-f-core:checked ~ .ac-panel .ac-guide-iris,
#ac-f-core:checked ~ .ac-panel .ac-guide-atom { display: none; }

#ac-f-iris:checked ~ .ac-panel .ac-guide-core,
#ac-f-iris:checked ~ .ac-panel .ac-guide-atom { display: none; }

#ac-f-atom:checked ~ .ac-panel .ac-guide-core,
#ac-f-atom:checked ~ .ac-panel .ac-guide-iris { display: none; }

/* All = mostrar todo (default) */
#ac-f-all:checked ~ .ac-panel .ac-guide-core,
#ac-f-all:checked ~ .ac-panel .ac-guide-iris,
#ac-f-all:checked ~ .ac-panel .ac-guide-atom { display: block; }
`

type GuideKey = "core" | "iris" | "atom"

type ResourceCard = {
  title: string
  note: string
  href: string
  thumbnail?: string
  guide: GuideKey
}

type GuideSection = {
  guide: GuideKey
  emoji: string
  heading: string
  avatarSrc: string
  byline: string
  items: ResourceCard[]
}

function ComingSoonRecursos() {
  return (
    <section className="relative w-full overflow-hidden bg-bg">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,rgb(var(--accent-alt)/0.07),transparent_62%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute inset-0 ac-grain" />

            {/* Imagen */}
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
              <div className="relative aspect-video w-full">
                {/* gradient fallback sutil */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(var(--accent),0.16),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(var(--accent-alt),0.12),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_60%)]" />

                <Image
                  src="/images/sections/Community/Core_Secciones_Inactivas.webp"
                  alt="Core esperando el lanzamiento de Recursos"
                  fill
                  sizes="(min-width: 1024px) 960px, 92vw"
                  className="object-cover"
                  priority
                />

                {/* Viñeta premium */}
                <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] bg-black/35" />

                {/* Label */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  PRÓXIMAMENTE
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="relative mt-6 text-center">
              <p className="text-xs font-semibold tracking-wide text-muted">
                ATOMICCURIOUS · RECURSOS
              </p>

              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                Recursos
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
                Ebooks, plantillas y productos cuidadosamente diseñados — para
                pensar mejor, aprender más profundo y construir con intención.
              </p>

              <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/25 px-4 py-2 text-xs font-semibold text-text shadow-soft backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                Lanzamiento{" "}
                <span className="text-text">{LAUNCH_DATE}</span>
              </div>

              <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
                Los primeros releases se abrirán poco a poco.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/es/newsletter"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-border bg-bg/35 px-5 py-2.5
                    text-sm font-semibold text-text
                    transition hover:border-accent/35 hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                    focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  Recibir avisos →
                </Link>

                <Link
                  href="/es"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-border px-5 py-2.5
                    text-sm font-semibold text-text
                    transition hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                    focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GuideHeader({
  emoji,
  heading,
  avatarSrc,
  byline,
}: {
  emoji: string
  heading: string
  avatarSrc: string
  byline: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-text">
          <span className="mr-2" aria-hidden="true">
            {emoji}
          </span>
          {heading}
        </p>
        <p className="mt-1 text-xs text-muted">{byline}</p>
      </div>

      <div className="shrink-0">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/35 px-3 py-1.5">
          <span className="relative h-5 w-5 overflow-hidden rounded-full border border-border/70 bg-surface-1">
            <Image
              src={avatarSrc}
              alt=""
              aria-hidden="true"
              fill
              sizes="20px"
              className="object-cover"
            />
          </span>
          <span className="text-[11px] font-semibold tracking-wide text-muted">
            Guía
          </span>
        </span>
      </div>
    </div>
  )
}

function ResourceItemCard({ item }: { item: ResourceCard }) {
  const guideName =
    item.guide === "atom" ? "Atom" : item.guide === "iris" ? "Iris" : "Core"
  const avatarSrc =
    item.guide === "atom"
      ? "/images/hosts/atom.webp"
      : item.guide === "iris"
      ? "/images/hosts/iris.webp"
      : "/images/hosts/core.webp"

  return (
    <Link
      href={item.href}
      className={[
        "group block rounded-2xl border border-border/70 bg-surface-1/45",
        "shadow-soft backdrop-blur transition",
        "hover:border-accent/25 hover:bg-surface-2/50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      ].join(" ")}
    >
      <div className="relative overflow-hidden rounded-2xl border-b border-border/60">
        <div className="relative aspect-[4/3] w-full ac-thumb">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 640px) 220px, 90vw"
              className="object-cover opacity-[0.92] transition group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0" aria-hidden="true" />
          )}

          <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/55 px-3 py-1 text-[11px] font-semibold text-text shadow-soft">
            Próximamente
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text">{item.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{item.note}</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative h-6 w-6 overflow-hidden rounded-full border border-border/70 bg-surface-1">
              <Image
                src={avatarSrc}
                alt=""
                aria-hidden="true"
                fill
                sizes="24px"
                className="object-cover"
              />
            </span>
            <p className="text-xs font-medium text-muted">
              Recomendado por{" "}
              <span className="font-semibold text-text">{guideName}</span>
            </p>
          </div>

          <span className="text-xs font-semibold text-text/80 transition group-hover:text-text">
            Ver →
          </span>
        </div>
      </div>
    </Link>
  )
}

function FullRecursosPage() {
  const sections: GuideSection[] = [
    {
      guide: "core",
      emoji: "🧪",
      heading: "Experimentos de Core",
      avatarSrc: "/images/hosts/core.webp",
      byline: "Retos, práctica, aprender jugando serio.",
      items: [
        {
          title: "Mini Labs Pack",
          note: "Experimentos pequeños con cosas de casa.",
          href: "/es/recursos",
          guide: "core",
          thumbnail: "/images/sections/resources/core-1.webp",
        },
        {
          title: "Cartas de Retos",
          note: "Prompts cortos para aprender haciendo.",
          href: "/es/recursos",
          guide: "core",
          thumbnail: "/images/sections/resources/core-2.webp",
        },
        {
          title: "Plantillas Hands-on",
          note: "Checklists y frameworks listos para usar.",
          href: "/es/recursos",
          guide: "core",
          thumbnail: "/images/sections/resources/core-3.webp",
        },
      ],
    },
    {
      guide: "iris",
      emoji: "🔗",
      heading: "Biblioteca de Patrones de Iris",
      avatarSrc: "/images/hosts/iris.webp",
      byline: "Claridad, patrones, rankings con criterio.",
      items: [
        {
          title: "Notas de Patrones",
          note: "Cómo ver estructura en el caos (simple y claro).",
          href: "/es/recursos",
          guide: "iris",
          thumbnail: "/images/sections/resources/iris-1.webp",
        },
        {
          title: "Hojas de Ranking",
          note: "Matrices de decisión + criterios reutilizables.",
          href: "/es/recursos",
          guide: "iris",
          thumbnail: "/images/sections/resources/iris-2.webp",
        },
        {
          title: "Cartas de Frameworks",
          note: "Modelos mentales en formato rápido.",
          href: "/es/recursos",
          guide: "iris",
          thumbnail: "/images/sections/resources/iris-3.webp",
        },
      ],
    },
    {
      guide: "atom",
      emoji: "💡",
      heading: "Deep Dives de Atom",
      avatarSrc: "/images/hosts/atom.webp",
      byline: "Preguntas, dudas inteligentes, fundamentos.",
      items: [
        {
          title: "Ensayos Profundos",
          note: "Explicaciones base: calmadas y precisas.",
          href: "/es/recursos",
          guide: "atom",
          thumbnail: "/images/sections/resources/atom-1.webp",
        },
        {
          title: "Guías de Inicio",
          note: "Rutas simples hacia temas complejos.",
          href: "/es/recursos",
          guide: "atom",
          thumbnail: "/images/sections/resources/atom-2.webp",
        },
        {
          title: "Toolkits de Conceptos",
          note: "Definiciones + ejemplos + cómo pensarlo.",
          href: "/es/recursos",
          guide: "atom",
          thumbnail: "/images/sections/resources/atom-3.webp",
        },
      ],
    },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_65%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-wide text-muted">
            ATOMICCURIOUS · RECURSOS
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Recursos para mentes curiosas
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Ebooks, plantillas, una futura revista y productos diseñados con
            intención. Todo pensado para aprender mejor y pensar más profundo.
          </p>
        </header>

        {/* FILTRO + PANEL (CSS-only) */}
        <div className="mx-auto mt-10 w-full max-w-4xl ac-filter">
          {/* radios (default = ALL) */}
          <input type="radio" name="ac-guide" id="ac-f-all" defaultChecked />
          <input type="radio" name="ac-guide" id="ac-f-core" />
          <input type="radio" name="ac-guide" id="ac-f-iris" />
          <input type="radio" name="ac-guide" id="ac-f-atom" />

          {/* Barra filtro */}
          <div className="ac-filterbar rounded-2xl border border-border bg-surface-1/40 px-4 py-3 shadow-soft backdrop-blur">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-2 text-xs font-semibold tracking-wide text-muted">
                Filtrar por guía:
              </span>

              <label
                htmlFor="ac-f-core"
                className="ac-pill inline-flex items-center justify-center rounded-full border border-border bg-bg/30 px-3 py-1 text-xs font-semibold text-text transition"
              >
                Core
              </label>
              <label
                htmlFor="ac-f-iris"
                className="ac-pill inline-flex items-center justify-center rounded-full border border-border bg-bg/30 px-3 py-1 text-xs font-semibold text-text transition"
              >
                Iris
              </label>
              <label
                htmlFor="ac-f-atom"
                className="ac-pill inline-flex items-center justify-center rounded-full border border-border bg-bg/30 px-3 py-1 text-xs font-semibold text-text transition"
              >
                Atom
              </label>
              <label
                htmlFor="ac-f-all"
                className="ac-pill inline-flex items-center justify-center rounded-full border border-border bg-bg/20 px-3 py-1 text-xs font-semibold text-muted transition"
              >
                Todo
              </label>
            </div>
          </div>

          {/* Panel */}
          <div className="ac-panel mt-12 rounded-3xl border border-border bg-surface-1/35 p-6 shadow-soft backdrop-blur sm:p-7">
            <div className="space-y-10">
              {sections.map((sec) => (
                <section
                  key={sec.guide}
                  className={[
                    "ac-res-section rounded-2xl border border-border/60 bg-bg/20 p-5 sm:p-6",
                    sec.guide === "core"
                      ? "ac-guide-core"
                      : sec.guide === "iris"
                      ? "ac-guide-iris"
                      : "ac-guide-atom",
                  ].join(" ")}
                  data-guide={sec.guide}
                  aria-label={sec.heading}
                >
                  <GuideHeader
                    emoji={sec.emoji}
                    heading={sec.heading}
                    avatarSrc={sec.avatarSrc}
                    byline={sec.byline}
                  />

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {sec.items.map((it) => (
                      <ResourceItemCard key={it.title} item={it} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/es/newsletter"
            className="
              rounded-xl bg-accent px-6 py-3 font-semibold text-bg
              transition hover:opacity-90
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            Únete al boletín
          </Link>

          <Link
            href="/es"
            className="
              rounded-xl border border-border px-6 py-3 font-semibold text-text
              transition hover:bg-surface-2
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-12 text-center text-sm text-muted">
          Los primeros lanzamientos llegarán pronto.
        </p>
      </div>
    </section>
  )
}

export default function RecursosPage() {
  return (
    <main className="w-full" data-chmode="none">
      <style
        dangerouslySetInnerHTML={{
          __html: (IS_RECURSOS_LIVE ? RECURSOS_CSS : "") + COMING_SOON_CSS,
        }}
      />

      {IS_RECURSOS_LIVE ? <FullRecursosPage /> : <ComingSoonRecursos />}
    </main>
  )
}
