// app/es/start-here/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { latestPostEs as LATEST_POST } from "@/content/posts.es"
import SignatureBackdrop from "@/components/SignatureBackdrop"

export const metadata: Metadata = {
  title: "Empieza aquí | AtomicCurious",
  description:
    "¿Nuevo en AtomicCurious? Empieza aquí para explorar curiosidades fascinantes, rankings únicos y quizzes interactivos sobre ciencia, cultura y lo humano.",
  alternates: {
    canonical: "/es/start-here",
    languages: {
      en: "/start-here",
      es: "/es/start-here",
    },
  },
}

function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1",
        "text-[11px] font-semibold tracking-wide",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] text-[rgb(var(--text)/0.78)]",
        className,
      ].join(" ")}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: "rgb(var(--accent) / 0.65)" }}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}

function StepCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] backdrop-blur-sm p-6",
        "ac-shadow-card transition-all duration-300",
        "hover:bg-[rgb(var(--surface-1)/0.70)] hover:border-[rgb(var(--border)/0.90)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-60"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.10), transparent)",
        }}
      />

      <div className="relative flex items-start gap-3">
        <span
          className={[
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border",
            "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--bg)/0.35)]",
            "text-sm font-bold text-[rgb(var(--text)/0.86)]",
          ].join(" ")}
        >
          {n}
        </span>
        <div>
          <p className="text-base font-semibold text-text">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">{body}</p>
        </div>
      </div>
    </div>
  )
}

function AccentMark({ label }: { label: string }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1",
        "text-[11px] font-semibold tracking-wide",
        "border-[rgb(var(--accent)/0.22)] bg-[rgb(var(--accent)/0.07)] text-[rgb(var(--accent)/0.95)]",
      ].join(" ")}
    >
      {label}
    </span>
  )
}

function FormatCard({
  label,
  name,
  description,
  href,
}: {
  label: string
  name: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className={[
        "group relative overflow-hidden rounded-2xl border",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] backdrop-blur-sm p-6",
        "ac-shadow-card transition-all duration-500",
        "hover:bg-[rgb(var(--surface-1)/0.70)] hover:border-[rgb(var(--border)/0.92)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at 30% 20%, rgb(var(--accent) / 0.16), transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border"
              style={{
                borderColor: "rgb(var(--border) / 0.70)",
                background: "rgb(var(--bg) / 0.35)",
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: "rgb(var(--accent) / 0.95)" }} />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-[12px] transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgb(var(--accent) / 0.12)" }}
              />
            </span>

            <AccentMark label={label} />
          </div>

          <span className="text-[rgb(var(--text)/0.45)] transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
        </div>

        <p className="text-lg font-bold text-text">{name}</p>
        <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">{description}</p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent)/0.95)]">
          Explorar <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  )
}

/** -------------------------------------------------------
 *  Character-aware blocks (SERVER SAFE)
 *  Render all 3 and show via body/html[data-character="..."].
 *  Default to Atom if data-character not set yet.
 *  ----------------------------------------------------- */
function CharacterVisualEs() {
  return (
    <div className="group relative">
      <div
        className={[
          "relative aspect-square overflow-hidden rounded-3xl border",
          "border-[rgb(var(--border)/0.70)]",
          "bg-[linear-gradient(135deg,rgb(var(--surface-1)/0.65),rgb(var(--bg)/0.25))]",
          "backdrop-blur-sm transition-all duration-500",
          "ac-shadow-card",
        ].join(" ")}
      >
        {/* ATOM */}
<Image
  src="/images/sections/start-here/atom.webp"
  alt="Tu guía"
  fill
  sizes="(max-width: 1024px) 100vw, 45vw"
  className="ac-ch ac-ch-atom object-contain p-8 transition-transform duration-700 group-hover:scale-105"
  priority
/>

{/* IRIS */}
<Image
  src="/images/sections/start-here/iris.webp"
  alt="Tu guía"
  fill
  sizes="(max-width: 1024px) 100vw, 45vw"
  className="ac-ch ac-ch-iris object-contain p-8 transition-transform duration-700 group-hover:scale-105"
  priority
/>

{/* CORE */}
<Image
  src="/images/sections/start-here/core.webp"
  alt="Tu guía"
  fill
  sizes="(max-width: 1024px) 100vw, 45vw"
  className="ac-ch ac-ch-core object-contain p-8 transition-transform duration-700 group-hover:scale-105"
  priority
/>


        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgb(var(--accent) / 0.12), transparent 62%)",
          }}
        />
      </div>

      <div
        className={[
          "absolute -bottom-4 -right-4 rounded-2xl border px-6 py-3 backdrop-blur-md",
          "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.70)]",
          "ac-shadow-card transition-all duration-500",
          "group-hover:-translate-y-1 group-hover:border-[rgb(var(--border)/0.92)]",
        ].join(" ")}
      >
        <p className="text-[10px] font-semibold tracking-wide text-[rgb(var(--text)/0.55)]">TU GUÍA</p>

        <p className="ac-guide ac-guide-atom text-lg font-bold text-[rgb(var(--accent)/0.95)]">ATOM</p>
        <p className="ac-guide ac-guide-iris text-lg font-bold text-[rgb(var(--accent)/0.95)]">IRIS</p>
        <p className="ac-guide ac-guide-core text-lg font-bold text-[rgb(var(--accent)/0.95)]">CORE</p>
      </div>
    </div>
  )
}

function CharacterWelcomeEs() {
  return (
    <div
      className={[
        "mt-8 rounded-2xl border p-5 backdrop-blur-sm",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)]",
        "ac-shadow-card",
      ].join(" ")}
    >
      <p className="ac-welcome ac-welcome-atom text-sm font-semibold text-[rgb(var(--accent)/0.95)]">
        Hey — soy Atom
      </p>
      <p className="ac-welcome ac-welcome-iris text-sm font-semibold text-[rgb(var(--accent)/0.95)]">
        Hey — soy Iris
      </p>
      <p className="ac-welcome ac-welcome-core text-sm font-semibold text-[rgb(var(--accent)/0.95)]">
        Hey — soy Core
      </p>

      <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">
        <span className="ac-welcome ac-welcome-atom">
          Te guío por preguntas que rompen intuiciones, rankings que revelan patrones, y quizzes que conectan lo
          imposible — sin ruido.
        </span>
        <span className="ac-welcome ac-welcome-iris">
          Te guío por rankings limpios, comparaciones afiladas y el “por qué” detrás de lo que crees que ya
          sabes — con estilo y claridad.
        </span>
        <span className="ac-welcome ac-welcome-core">
          Te guío por retos interactivos, conexiones raras y la estructura oculta bajo la realidad — rápido,
          juguetón y preciso.
        </span>
      </p>
    </div>
  )
}

function CharacterTipEs() {
  return (
    <div className="mt-6 rounded-xl border border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] px-4 py-3">
      <p className="text-xs text-[rgb(var(--text)/0.72)]">
        <span className="ac-tip ac-tip-atom font-semibold text-[rgb(var(--accent)/0.95)]">Consejo de Atom:</span>
        <span className="ac-tip ac-tip-iris font-semibold text-[rgb(var(--accent)/0.95)]">Consejo de Iris:</span>
        <span className="ac-tip ac-tip-core font-semibold text-[rgb(var(--accent)/0.95)]">Consejo de Core:</span>{" "}
        empieza por lo más reciente; suele ser lo más pulido.
      </p>
    </div>
  )
}

export default function Page() {
  const latestSlug = LATEST_POST?.slug
  const latestHref = latestSlug ? `/es/posts/${latestSlug}` : "/es/posts"

  return (
    <main className="relative w-full overflow-hidden bg-bg text-text" data-chmode="host">
      <SignatureBackdrop />

      <style>{`
        /* Default hidden */
        .ac-ch,
        .ac-guide,
        .ac-welcome,
        .ac-tip {
          opacity: 0;
          transform: translateY(2px) scale(0.985);
          transition: opacity 220ms ease, transform 220ms ease;
          pointer-events: none;
        }

        /* ✅ Default Atom when no data-character yet (SSR/first paint safe) */
        body:not([data-character]) .ac-ch-atom,
        body:not([data-character]) .ac-guide-atom,
        body:not([data-character]) .ac-welcome-atom,
        body:not([data-character]) .ac-tip-atom,
        html:not([data-character]) .ac-ch-atom,
        html:not([data-character]) .ac-guide-atom,
        html:not([data-character]) .ac-welcome-atom,
        html:not([data-character]) .ac-tip-atom {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        /* Visible per mode (body OR html) */
        body[data-character="atom"] .ac-ch-atom,
        body[data-character="atom"] .ac-guide-atom,
        body[data-character="atom"] .ac-welcome-atom,
        body[data-character="atom"] .ac-tip-atom,
        html[data-character="atom"] .ac-ch-atom,
        html[data-character="atom"] .ac-guide-atom,
        html[data-character="atom"] .ac-welcome-atom,
        html[data-character="atom"] .ac-tip-atom {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        body[data-character="iris"] .ac-ch-iris,
        body[data-character="iris"] .ac-guide-iris,
        body[data-character="iris"] .ac-welcome-iris,
        body[data-character="iris"] .ac-tip-iris,
        html[data-character="iris"] .ac-ch-iris,
        html[data-character="iris"] .ac-guide-iris,
        html[data-character="iris"] .ac-welcome-iris,
        html[data-character="iris"] .ac-tip-iris {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        body[data-character="core"] .ac-ch-core,
        body[data-character="core"] .ac-guide-core,
        body[data-character="core"] .ac-welcome-core,
        body[data-character="core"] .ac-tip-core,
        html[data-character="core"] .ac-ch-core,
        html[data-character="core"] .ac-guide-core,
        html[data-character="core"] .ac-welcome-core,
        html[data-character="core"] .ac-tip-core {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-ch,
          .ac-guide,
          .ac-welcome,
          .ac-tip {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* HERO */}
        <header className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="relative order-2 lg:order-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-16 opacity-70"
                style={{
                  background: "radial-gradient(circle at center, rgb(var(--accent) / 0.14), transparent 66%)",
                }}
              />
              <CharacterVisualEs />
              <CharacterWelcomeEs />
            </div>

            <div className="order-1 max-w-2xl lg:order-2">
              <p className="text-xs font-medium tracking-wide text-[rgb(var(--text)/0.55)]">
                ATOMICCURIOUS · EMPIEZA AQUÍ
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Pill>Lectura: 3–5 min</Pill>
                <Pill>Mejor punto de entrada</Pill>
              </div>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl">
                Del asombro a la claridad. Empieza aquí.
              </h1>

              <p className="mt-6 text-pretty text-base leading-relaxed text-[rgb(var(--text)/0.74)] sm:text-lg">
                Si llegas por primera vez, AtomicCurious te guía por tres caminos:{" "}
                <span className="font-semibold text-text">curiosidades cinematográficas</span>,{" "}
                <span className="font-semibold text-text">rankings fascinantes</span> y{" "}
                <span className="font-semibold text-text">quizzes interactivos</span> que conectan puntos
                imposibles — en videos cortos y posts claros, sin ruido.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={latestHref}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold text-black transition-all"
                  style={{
                    background: "rgb(var(--accent) / 0.92)",
                    boxShadow: "0 10px 34px rgb(var(--accent) / 0.18)",
                  }}
                >
                  Empieza con lo más reciente <span aria-hidden className="ml-2">→</span>
                </Link>

                <Link
                  href="/es/posts"
                  className={[
                    "inline-flex items-center justify-center rounded-xl border px-6 py-3.5",
                    "text-sm font-semibold transition-all",
                    "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] text-[rgb(var(--text)/0.86)]",
                    "hover:bg-[rgb(var(--surface-1)/0.75)] hover:border-[rgb(var(--border)/0.92)]",
                  ].join(" ")}
                >
                  Ver todos los posts <span aria-hidden className="ml-2">→</span>
                </Link>

                <Link
                  href="/es/newsletter"
                  className={[
                    "inline-flex items-center justify-center rounded-xl border px-6 py-3.5",
                    "text-sm font-semibold transition-all",
                    "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--bg)/0.20)] text-[rgb(var(--text)/0.72)]",
                    "hover:bg-[rgb(var(--surface-1)/0.65)] hover:text-[rgb(var(--text)/0.86)] hover:border-[rgb(var(--border)/0.92)]",
                  ].join(" ")}
                >
                  Únete al boletín <span aria-hidden className="ml-2">→</span>
                </Link>
              </div>

              <CharacterTipEs />
            </div>
          </div>
        </header>

        {/* TRES FORMATOS */}
        <section className="mt-24 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium tracking-wide text-[rgb(var(--text)/0.55)]">TRES FORMAS DE EXPLORAR</p>
            <h2 className="text-3xl font-semibold tracking-tight text-text">Elige tu camino</h2>
            <p className="max-w-2xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              Cada formato tiene un ritmo distinto. Pruébalos todos — uno hará click al instante.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FormatCard
              label="CURIOSITY · ATOM"
              name="Atom · Curiosity"
              description="Preguntas que rompen intuiciones y cambian cómo ves el mundo."
              href="/es/posts?format=curiosity"
            />
            <FormatCard
              label="RANKED · IRIS"
              name="Iris · Ranked"
              description="Rankings y comparaciones que revelan patrones que no sabías que te faltaban."
              href="/es/posts?format=ranked"
            />
            <FormatCard
              label="QUIZ · CORE"
              name="Core · Quiz"
              description="Retos interactivos que conectan puntos imposibles y afilan tu modelo mental."
              href="/es/posts?format=quiz"
            />
          </div>
        </section>

        {/* ÚLTIMO POST */}
        <section className="mt-20 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-text">Última exploración</h2>
            <p className="text-base text-[rgb(var(--text)/0.72)]">
              La vía más rápida: empieza por lo más reciente, luego sigue tu siguiente pregunta.
            </p>
          </div>

          <Link
            href={latestHref}
            className={[
              "mt-8 block rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300",
              "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)] ac-shadow-card",
              "hover:bg-[rgb(var(--surface-1)/0.75)] hover:border-[rgb(var(--border)/0.92)]",
            ].join(" ")}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              {LATEST_POST?.tag ? (
                <span className="rounded-full border border-[rgb(var(--border)/0.65)] bg-[rgb(var(--bg)/0.25)] px-3 py-1 text-xs font-medium text-[rgb(var(--text)/0.78)]">
                  {LATEST_POST.tag}
                </span>
              ) : (
                <span />
              )}
              <span className="text-xs text-[rgb(var(--text)/0.50)]">{LATEST_POST?.date ?? ""}</span>
            </div>

            <h3 className="mt-4 text-balance text-2xl font-semibold text-text sm:text-3xl">
              {LATEST_POST?.title ?? "Explora lo más reciente"}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              {LATEST_POST?.description ??
                "Entra por lo nuevo: suele ser lo más pulido, más claro y más cinematográfico."}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent)/0.95)] transition-transform hover:translate-x-0.5">
              Leer ahora <span aria-hidden>→</span>
            </div>
          </Link>

          <div className="mt-6">
            <Link
              href="/es/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--accent)/0.95)]"
            >
              Ver todas las exploraciones <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="mt-20 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-text">Cómo funciona AtomicCurious</h2>
            <p className="max-w-2xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              Del asombro a la claridad — un flujo simple para aprender sin ruido.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <StepCard
              n="1"
              title="Mira"
              body="Cada tema empieza con un video corto que enciende la curiosidad con tono cinematográfico."
            />
            <StepCard
              n="2"
              title="Lee"
              body="Profundiza con posts claros y estructurados: buscables y fáciles de revisar."
            />
            <StepCard
              n="3"
              title="Recibe lo mejor"
              body="El boletín es la señal: una vez por semana, sin spam — solo lo que vale la pena."
            />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/es/newsletter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--accent)/0.95)]"
            >
              Ver el boletín <span aria-hidden>→</span>
            </Link>
            <Link
              href="/es/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--accent)/0.95)]"
            >
              Conocer el universo <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
