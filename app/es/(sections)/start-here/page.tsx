// app/es/start-here/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { latestPostEs as LATEST_POST } from "@/content/posts.es"
import SignatureBackdrop from "@/components/SignatureBackdrop"
import { formatPostDate } from "@/lib/posts-utils"

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
        style={{ background: "rgb(var(--ac-accent) / 0.65)" }}
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
      ].join(" ")}
      style={{
        borderColor: "rgb(var(--ac-accent) / 0.22)",
        background: "rgb(var(--ac-accent) / 0.07)",
        color: "rgb(var(--ac-accent) / 0.95)",
      }}
    >
      {label}
    </span>
  )
}

function FormatCard({
  label,
  name,
  description,
  examples,
  href,
}: {
  label: string
  name: string
  description: string
  examples: string
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
          background: "radial-gradient(circle at 30% 20%, rgb(var(--ac-accent) / 0.16), transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border"
              style={{
                borderColor: "rgb(var(--border) / 0.70)",
                background: "rgb(var(--bg) / 0.35)",
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "rgb(var(--ac-accent) / 0.95)" }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-[12px] transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgb(var(--ac-accent) / 0.12)" }}
              />
            </span>

            <AccentMark label={label} />
          </div>

          <span className="text-[rgb(var(--text)/0.45)] transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
        </div>

        <p className="text-lg font-bold text-text">{name}</p>
        <p className="mt-2 min-h-[72px] text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">
          {description}
        </p>

        <div className="mt-4 rounded-xl border border-[rgb(var(--border)/0.45)] bg-[rgb(var(--bg)/0.18)] px-4 py-3">
          <p className="text-[11px] font-semibold tracking-wide text-[rgb(var(--text)/0.48)]">
            EJEMPLOS DE EXPLORACIÓN
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--text)/0.66)]">{examples}</p>
        </div>

        <div
          className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
        >
          Explorar <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  )
}

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
        <Image
          src="/images/sections/start-here/atom_start_here.webp"
          alt="Tu guía"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="ac-ch ac-ch-atom object-contain p-8 transition-transform duration-700 group-hover:scale-105"
          priority
        />

        <Image
          src="/images/sections/start-here/iris_start_here.webp"
          alt="Tu guía"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="ac-ch ac-ch-iris object-contain p-8 transition-transform duration-700 group-hover:scale-105"
          priority
        />

        <Image
          src="/images/sections/start-here/core_start_here.webp"
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
            background: "radial-gradient(circle at 50% 50%, rgb(var(--ac-accent) / 0.12), transparent 62%)",
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

        <p className="ac-guide ac-guide-atom text-lg font-bold" style={{ color: "rgb(var(--ac-accent) / 0.95)" }}>ATOM</p>
        <p className="ac-guide ac-guide-iris text-lg font-bold" style={{ color: "rgb(var(--ac-accent) / 0.95)" }}>IRIS</p>
        <p className="ac-guide ac-guide-core text-lg font-bold" style={{ color: "rgb(var(--ac-accent) / 0.95)" }}>CORE</p>
      </div>
    </div>
  )
}

function CharacterWelcomeEs() {
  return (
    <div
      className={[
        "mt-14",
        "h-[200px] overflow-hidden",
        "rounded-2xl border px-7 pt-6 pb-4 backdrop-blur-sm",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)]",
        "ac-shadow-card",
      ].join(" ")}
    >
      <p className="ac-welcome ac-welcome-atom translate-y-[5px] text-base font-semibold" style={{ color: "rgb(var(--ac-accent) / 0.95)" }}>
        Hey — Soy Atom
      </p>

      <p className="ac-welcome ac-welcome-iris translate-y-[-17px] text-base font-semibold" style={{ color: "rgb(var(--ac-accent) / 0.95)" }}>
        Hola — Soy Iris
      </p>

      <p className="ac-welcome ac-welcome-core translate-y-[-37px] text-sm font-semibold" style={{ color: "rgb(var(--ac-accent) / 0.95)" }}>
        Boom — Soy Core
      </p>

      <p className="translate-y-[-20px] mt-3 text-justify hyphens-auto text-sm leading-relaxed text-[rgb(var(--text)/0.72)]">
        <span className="ac-welcome ac-welcome-atom block">
          Te guío por preguntas que parecen simples, pero transforman la forma en que entiendes lo humano, lo cotidiano y lo extraordinario.
        </span>

        <span className="ac-welcome ac-welcome-iris block -translate-y-[40px] text-justify hyphens-auto">
          Te guío por rankings y comparaciones con claridad — no para darte una respuesta, sino para que encuentres la tuya.
        </span>

        <span className="ac-welcome ac-welcome-core block -translate-y-[87px] text-justify hyphens-auto">
          Te guío por retos interactivos y conexiones inesperadas — rápido, juguetón y preciso. A ver qué tan lejos llegas.
        </span>
      </p>
    </div>
  )
}

function CharacterTipEs() {
  return (
    <div
      className={[
        "mt-6",
        "h-[165px] overflow-hidden",
        "rounded-xl border px-5 pt-4 pb-4 backdrop-blur-sm sm:px-6 sm:pt-5 sm:pb-5",
        "border-[rgb(var(--border)/0.70)] bg-[rgb(var(--surface-1)/0.55)]",
        "ac-shadow-card",
      ].join(" ")}
    >
      <div className="ac-tip ac-tip-atom">
        <p className="translate-y-[10px] text-sm font-semibold" style={{ color: "rgb(var(--ac-accent) / 0.95)" }}>
          Consejo de Atom:
        </p>
        <p className="mt-2 translate-y-[20px] text-sm leading-relaxed text-[rgb(var(--text)/0.75)]">
          Empieza por lo que te genere una pregunta — ahí es donde realmente comienza todo.
        </p>
      </div>

      <div className="ac-tip ac-tip-iris">
        <p className="translate-y-[-60px] text-sm font-semibold" style={{ color: "rgb(var(--ac-accent) / 0.95)" }}>
          Consejo de Iris:
        </p>
        <p className="mt-2 translate-y-[-50px] text-sm leading-relaxed text-[rgb(var(--text)/0.75)]">
          No te quedes con lo primero que ves — ahí es donde empieza lo interesante.
        </p>
      </div>

      <div className="ac-tip ac-tip-core">
        <p className="translate-y-[-110px] text-sm font-semibold" style={{ color: "rgb(var(--ac-accent) / 0.95)" }}>
          Consejo de Core:
        </p>
        <p className="mt-2 translate-y-[-100px] text-sm leading-relaxed text-[rgb(var(--text)/0.75)]">
          No todos los que responden son curiosos. Solo los que se preguntan por qué.
        </p>
      </div>
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
        /* ── Character accent tokens ── */
        html:not([data-character]),
        body:not([data-character]),
        html[data-character="atom"],
        body[data-character="atom"] {
          --ac-accent: 52 211 153;
        }
        html[data-character="iris"],
        body[data-character="iris"] {
          --ac-accent: 34 211 238;
        }
        html[data-character="core"],
        body[data-character="core"] {
          --ac-accent: 251 146 60;
        }

        /* ── Character visibility ── */
        .ac-ch,
        .ac-guide,
        .ac-welcome,
        .ac-tip {
          opacity: 0;
          transform: translateY(2px) scale(0.985);
          transition: opacity 220ms ease, transform 220ms ease;
          pointer-events: none;
        }

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
        <header className="relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="relative order-2 lg:order-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-16 opacity-70"
                style={{
                  background: "radial-gradient(circle at center, rgb(var(--ac-accent) / 0.14), transparent 66%)",
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
                <span className="font-semibold text-text">preguntas que despiertan tu curiosidad</span>,{" "}
                <span className="font-semibold text-text">rankings que sorprenden</span> y{" "}
                <span className="font-semibold text-text">quizzes para explorar jugando</span>.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={latestHref}
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold text-black transition-all"
                  style={{
                    background: "rgb(var(--ac-accent) / 0.92)",
                    boxShadow: "0 10px 34px rgb(var(--ac-accent) / 0.18)",
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

        <section className="mt-24 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium tracking-wide text-[rgb(var(--text)/0.55)]">TRES FORMAS DE EXPLORAR</p>
            <h2 className="text-3xl font-semibold tracking-tight text-text">Elige tu camino</h2>
            <p className="max-w-2xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              Cada formato tiene un ritmo distinto. Explóralos todos — uno conectará contigo al instante.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FormatCard
              label="CURIOSIDAD · ATOM"
              name="Atom · Curiosidad"
              description="Para quienes no se quedan con la primera respuesta — siempre hay algo más detrás."
              examples="¿Por qué el tiempo se siente distinto según lo que vives? ¿Por qué recordamos más unas cosas que otras? ¿Por qué los sueños parecen tener sentido… hasta que despiertas?"
              href="/es/posts?format=curiosity"
            />

            <FormatCard
              label="RANKING · IRIS"
              name="Iris · Ranking"
              description="Para quienes quieren entender mejor lo que ven: comparar, ordenar y sacar sus propias conclusiones."
              examples="Juegos que cambiaron la industria. Películas que ganaron sin que lo notaras. Inventos que redefinieron la vida moderna."
              href="/es/posts?format=ranked"
            />

            <FormatCard
              label="QUIZ · CORE"
              name="Core · Quiz"
              description="Para quienes disfrutan poner a prueba lo que saben — y descubrir que siempre pueden ir más lejos."
              examples="Una cadena inesperada de dinosaurios a smartphones en 6 pasos. Adivina el invento a partir de sus efectos."
              href="/es/posts?format=quiz"
            />
          </div>
        </section>

        <section className="mt-20 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-text">Última exploración</h2>
            <p className="text-base text-[rgb(var(--text)/0.72)]">
              La forma más rápida de entrar: empieza por lo más reciente y deja que la curiosidad haga el resto.
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
              <span className="text-xs text-[rgb(var(--text)/0.50)]">
                 {LATEST_POST ? formatPostDate(LATEST_POST.date, "es-MX") : ""}
              </span>
              </div> 

            <h3 className="mt-4 text-balance text-2xl font-semibold text-text sm:text-3xl">
              {LATEST_POST?.title ?? "Explora lo más reciente"}
            </h3>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              {LATEST_POST?.description ??
                "Entra por lo nuevo: suele ser lo más pulido, más claro y más cinematográfico."}
            </p>

            <div
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-transform hover:translate-x-0.5"
              style={{ color: "rgb(var(--ac-accent) / 0.95)" }}
            >
              Leer ahora <span aria-hidden>→</span>
            </div>
          </Link>

          <div className="mt-6">
            <Link
              href="/es/posts"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors"
              style={{ ["--tw-text-opacity" as string]: "1" }}
              onMouseEnter={undefined}
            >
              <span className="ac-text-hover">Ver todas las exploraciones →</span>
            </Link>
          </div>
        </section>

        <section className="mt-20 border-t border-[rgb(var(--border)/0.55)] pt-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-text">Cómo funciona AtomicCurious</h2>
            <p className="max-w-2xl text-base leading-relaxed text-[rgb(var(--text)/0.72)]">
              Del asombro a la claridad — un flujo simple para aprender.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
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

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/es/newsletter"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--ac-accent)/0.95)]"
            >
              Ver el boletín <span aria-hidden>→</span>
            </Link>
            <Link
              href="/es/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--text)/0.55)] transition-colors hover:text-[rgb(var(--ac-accent)/0.95)]"
            >
              Conocer el universo <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}