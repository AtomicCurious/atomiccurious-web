// app/es/newsletter/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Boletín | AtomicCurious",
  description:
    "Acceso anticipado a nuevas ideas, herramientas y descubrimientos. Disponible el 21 de marzo de 2026.",
  alternates: {
    canonical: "/es/newsletter",
    languages: {
      en: "/newsletter",
      es: "/es/newsletter",
    },
  },
}

const LAUNCH_DATE_ES = "21 de marzo de 2026"

/**
 * ✅ Pre-lanzamiento (recomendado):
 * - Mostrar una vista mínima (Core esperando + frase corta + fecha)
 * - Mantener el boletín completo comentado abajo para no perder nada
 *
 * Imagen (en /public):
 * /images/sections/Community/Core_Secciones_Inactivas.webp
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

function ComingSoonNewsletterEs() {
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
                {/* Gradiente sutil */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(var(--accent),0.16),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(var(--accent-alt),0.12),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_60%)]" />

                <Image
                  src="/images/sections/Community/Core_Secciones_Inactivas.webp"
                  alt="Core esperando el lanzamiento del boletín"
                  fill
                  sizes="(min-width: 1024px) 960px, 92vw"
                  className="object-cover"
                  priority
                />

                {/* Viñeta premium */}
                <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] bg-black/35" />

                {/* Badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  PRÓXIMAMENTE
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="relative mt-6 text-center">
              <p className="text-xs font-semibold tracking-wide text-muted">
                ATOMICCURIOUS · BOLETÍN
              </p>

              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                Boletín
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
                Acceso anticipado a nuevas ideas, herramientas y descubrimientos.
              </p>

              <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/25 px-4 py-2 text-xs font-semibold text-text shadow-soft backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                Disponible el <span className="text-text">{LAUNCH_DATE_ES}</span>
              </div>

              <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
                Un email semanal. Claro. Útil. Sin ruido.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/es/posts"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-border bg-bg/35 px-5 py-2.5
                    text-sm font-semibold text-text
                    transition hover:border-accent/35 hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                    focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  Ver posts →
                </Link>

                <Link
                  href="/es/start-here"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-border bg-bg/35 px-5 py-2.5
                    text-sm font-semibold text-text
                    transition hover:border-accent/35 hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                    focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  Empieza aquí →
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

export default function Page() {
  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: COMING_SOON_CSS }} />

      {/* ✅ Vista mínima de pre-lanzamiento */}
      <ComingSoonNewsletterEs />

      {/* ============================================================
         BOLETÍN COMPLETO (preservado para activarlo el 21 de marzo 2026)
         - No se borra nada: queda guardado abajo.
         - Para activar: elimina este wrapper de comentario y quita ComingSoonNewsletterEs.
      ============================================================ */}

      {/*
      // ORIGINAL / BOLETÍN COMPLETO (preservado)

      function HostBadge() {
        return (
          <>
            <span className="ac-host ac-host-atom inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
              Atom · Curiosity
            </span>
            <span className="ac-host ac-host-iris inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
              Iris · Ranked
            </span>
            <span className="ac-host ac-host-core inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
              Core · Quiz
            </span>
          </>
        )
      }

      function HostCopy() {
        return (
          <>
            <h1 className="ac-title ac-title-atom mt-5 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Una señal semanal para mentes curiosas
            </h1>
            <h1 className="ac-title ac-title-iris mt-5 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Una señal semanal con claridad y estructura
            </h1>
            <h1 className="ac-title ac-title-core mt-5 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Una señal semanal para pensar jugando
            </h1>

            <p className="ac-sub ac-sub-atom mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Ideas cortas que encienden asombro, preguntas raras que vale la pena guardar y links que expanden tu forma de ver
              el mundo.
            </p>
            <p className="ac-sub ac-sub-iris mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Resúmenes limpios, insights “ranked” y modelos mentales reutilizables — sin hype, sin relleno.
            </p>
            <p className="ac-sub ac-sub-core mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Prompts, retos y mini-experimentos que afilan cómo piensas, no solo lo que sabes.
            </p>
          </>
        )
      }

      function HostVisual() {
        return (
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-1 shadow-soft">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/sections/newsletter/atom.webp"
                alt="Atom — Boletín"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="ac-hero ac-hero-atom object-cover"
                priority
              />
              <Image
                src="/images/sections/newsletter/iris.webp"
                alt="Iris — Boletín"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="ac-hero ac-hero-iris object-cover"
                priority
              />
              <Image
                src="/images/sections/newsletter/core.webp"
                alt="Core — Boletín"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="ac-hero ac-hero-core object-cover"
                priority
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.42))",
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background: "radial-gradient(ellipse 70% 50% at 50% 10%, rgb(var(--accent)/0.14), transparent 70%)",
                }}
              />
            </div>
          </div>
        )
      }

      function ValueCard({ title, items }: { title: string; items: string[] }) {
        return (
          <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
            <p className="text-sm font-semibold text-text">{title}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {items.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
        )
      }

      export default function FutureNewsletterEs() {
        return (
          <main className="w-full" data-chmode="host">
            <style>{`
              .ac-host,
              .ac-title,
              .ac-sub,
              .ac-hero {
                display: none;
              }

              body:not([data-character]) .ac-host-atom,
              body:not([data-character]) .ac-title-atom,
              body:not([data-character]) .ac-sub-atom,
              body:not([data-character]) .ac-hero-atom,
              html:not([data-character]) .ac-host-atom,
              html:not([data-character]) .ac-title-atom,
              html:not([data-character]) .ac-sub-atom,
              html:not([data-character]) .ac-hero-atom {
                display: inline-flex;
              }
              body:not([data-character]) .ac-title-atom,
              html:not([data-character]) .ac-title-atom,
              body:not([data-character]) .ac-sub-atom,
              html:not([data-character]) .ac-sub-atom,
              body:not([data-character]) .ac-hero-atom,
              html:not([data-character]) .ac-hero-atom {
                display: block;
              }

              body[data-character="atom"] .ac-host-atom,
              body[data-character="atom"] .ac-title-atom,
              body[data-character="atom"] .ac-sub-atom,
              body[data-character="atom"] .ac-hero-atom,
              html[data-character="atom"] .ac-host-atom,
              html[data-character="atom"] .ac-title-atom,
              html[data-character="atom"] .ac-sub-atom,
              html[data-character="atom"] .ac-hero-atom {
                display: inline-flex;
              }
              body[data-character="atom"] .ac-title-atom,
              html[data-character="atom"] .ac-title-atom,
              body[data-character="atom"] .ac-sub-atom,
              html[data-character="atom"] .ac-sub-atom,
              body[data-character="atom"] .ac-hero-atom,
              html[data-character="atom"] .ac-hero-atom {
                display: block;
              }

              body[data-character="iris"] .ac-host-iris,
              body[data-character="iris"] .ac-title-iris,
              body[data-character="iris"] .ac-sub-iris,
              body[data-character="iris"] .ac-hero-iris,
              html[data-character="iris"] .ac-host-iris,
              html[data-character="iris"] .ac-title-iris,
              html[data-character="iris"] .ac-sub-iris,
              html[data-character="iris"] .ac-hero-iris {
                display: inline-flex;
              }
              body[data-character="iris"] .ac-title-iris,
              html[data-character="iris"] .ac-title-iris,
              body[data-character="iris"] .ac-sub-iris,
              html[data-character="iris"] .ac-sub-iris,
              body[data-character="iris"] .ac-hero-iris,
              html[data-character="iris"] .ac-hero-iris {
                display: block;
              }

              body[data-character="core"] .ac-host-core,
              body[data-character="core"] .ac-title-core,
              body[data-character="core"] .ac-sub-core,
              body[data-character="core"] .ac-hero-core,
              html[data-character="core"] .ac-host-core,
              html[data-character="core"] .ac-title-core,
              html[data-character="core"] .ac-sub-core,
              html[data-character="core"] .ac-hero-core {
                display: inline-flex;
              }
              body[data-character="core"] .ac-title-core,
              html[data-character="core"] .ac-title-core,
              body[data-character="core"] .ac-sub-core,
              html[data-character="core"] .ac-sub-core,
              body[data-character="core"] .ac-hero-core,
              html[data-character="core"] .ac-hero-core {
                display: block;
              }
            `}</style>

            <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
              <section className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="order-2 lg:order-1">
                  <p className="text-xs font-medium tracking-wide text-muted">
                    ATOMICCURIOUS · BOLETÍN
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <HostBadge />
                    <span className="inline-flex items-center rounded-full border border-border bg-bg/35 px-3 py-1 text-xs font-semibold text-text">
                      1 email / semana · sin ruido
                    </span>
                  </div>

                  <HostCopy />

                  <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <a
                      href="#"
                      className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-bg shadow-accent transition hover:brightness-110"
                    >
                      Suscribirme — es gratis
                    </a>

                    <p className="text-xs text-muted">
                      Un email por semana. Baja cuando quieras.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4 text-sm">
                    <Link href="/es/posts" className="font-semibold text-text hover:text-accent">
                      Ver posts →
                    </Link>
                    <Link href="/es/start-here" className="font-semibold text-text hover:text-accent">
                      Empieza aquí →
                    </Link>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <HostVisual />
                </div>
              </section>

              <section className="mt-14 grid gap-5 md:grid-cols-3">
                <ValueCard
                  title="Qué vas a recibir"
                  items={[
                    "Una idea central que vale pensar",
                    "Links a posts, drops y experimentos recientes",
                    "Acceso temprano a recursos y lanzamientos",
                  ]}
                />

                <ValueCard
                  title="Qué NO vas a recibir"
                  items={[
                    "Spam diario o promos ruidosas",
                    "Hype, doomscrolling o relleno",
                    "Temas random sin estructura",
                  ]}
                />

                <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft">
                  <p className="text-sm font-semibold text-text">Para quién es</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    Para gente que busca{" "}
                    <span className="font-semibold text-text">profundidad sin ruido</span>: curiosidad con
                    estructura, e ideas que sí puedes reutilizar.
                  </p>

                  <div className="mt-6 rounded-xl border border-border bg-bg/35 p-4">
                    <p className="text-xs font-semibold tracking-wide text-muted">PROMESA</p>
                    <p className="mt-2 text-sm text-muted">
                      Un email semanal. Claro. Útil. Sin ruido.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-14 rounded-3xl border border-border bg-surface-1 p-8 text-center shadow-soft sm:p-10">
                <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
                  Únete a la señal semanal
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-base text-muted">
                  Si AtomicCurious te hace click, el boletín es la forma más limpia de seguir el ritmo.
                </p>

                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-bg shadow-accent transition hover:brightness-110"
                  >
                    Suscribirme — es gratis
                  </a>
                  <Link
                    href="/es/posts"
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-8 py-4 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2"
                  >
                    Ver posts
                  </Link>
                </div>

                <p className="mt-4 text-xs text-muted">
                  Un email por semana. Puedes darte de baja cuando quieras.
                </p>
              </section>
            </div>
          </main>
        )
      }
      */}
    </main>
  )
}
