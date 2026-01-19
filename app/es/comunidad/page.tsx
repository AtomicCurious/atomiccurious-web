// app/es/comunidad/page.tsx
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Comunidad | AtomicCurious",
  description:
    "La comunidad AtomicCurious: conversaciones, eventos y espacios privados.",
}

type Guide = "atom" | "iris" | "core"

const COMMUNITY_CSS = `
/* Premium grain (subtle) */
.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(var(--accent),0.10), transparent 55%),
    radial-gradient(circle at 70% 40%, rgba(var(--accent-alt),0.08), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 55%);
  mix-blend-mode: normal;
}
`

function GuideBadge({
  k,
  size = "sm",
  label,
}: {
  k: Guide
  size?: "xs" | "sm"
  label?: string
}) {
  const letter = k === "atom" ? "A" : k === "iris" ? "I" : "C"
  const box =
    size === "xs"
      ? "h-8 w-8 rounded-lg text-[11px]"
      : "h-9 w-9 rounded-lg text-xs"

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={[
          "inline-flex items-center justify-center",
          box,
          "border border-border/80 bg-bg/35 text-text font-semibold shadow-soft",
        ].join(" ")}
        aria-hidden="true"
      >
        {letter}
      </span>

      {label ? (
        <span className="text-xs font-semibold tracking-wide text-muted">
          {label}
        </span>
      ) : null}
    </span>
  )
}

/**
 * ✅ ONE SINGLE 16:9 "team" visual (no sigils)
 * Swap /images/sections/community/team.webp when you have the final artwork.
 */
function TeamShot() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface-1/35 shadow-soft">
      <div className="pointer-events-none absolute inset-0 ac-grain" />

      <div className="relative aspect-video w-full">
        {/* fallback premium gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(var(--accent),0.18),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(var(--accent-alt),0.14),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_60%)]" />

        {/* optional real image */}
        <Image
          src="/images/sections/community/team.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 520px, 92vw"
          className="object-cover opacity-0"
          priority={false}
        />

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] bg-black/40" />

        {/* label */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-soft backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
          TUS GUÍAS
        </div>
      </div>

      <div className="relative px-5 py-4">
        <p className="text-sm font-semibold text-text">
          Atom, Iris y Core — un universo, tres formas de aprender.
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Fundamentos, debates con criterio y retos prácticos — con calma y buen
          gusto.
        </p>
      </div>
    </div>
  )
}

function Testimonial({
  quote,
  name,
  guide,
}: {
  quote: string
  name: string
  guide: Guide
}) {
  const guideLabel = guide === "atom" ? "Atom" : guide === "iris" ? "Iris" : "Core"

  return (
    <figure className="rounded-3xl border border-border/70 bg-surface-1/45 p-6 shadow-soft backdrop-blur">
      <blockquote className="text-sm leading-relaxed text-text">
        “{quote}”
      </blockquote>

      <figcaption className="mt-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-muted">
            {name}
          </p>
          <p className="mt-1 text-xs text-muted">
            Guiado por{" "}
            <span className="text-text font-semibold">{guideLabel}</span>
          </p>
        </div>

        <GuideBadge k={guide} size="sm" />
      </figcaption>
    </figure>
  )
}

export default function ComunidadPage() {
  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: COMMUNITY_CSS }} />

      <section className="relative w-full overflow-hidden bg-bg">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,rgb(var(--accent-alt)/0.07),transparent_62%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-wide text-muted">
              ATOMICCURIOUS · COMUNIDAD
            </p>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Bienvenido al Universo
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted sm:text-lg">
              Un lugar para conversaciones, drops privados, eventos y construir
              con personas que aprenden de verdad.
            </p>
          </header>

          {/* ✅ Reference layout: split (TEAM 16:9 + CTA) */}
          <div className="mx-auto mt-10 w-full max-w-5xl">
            <div
              className="
                grid gap-5 rounded-3xl border border-border/70
                bg-surface-1/40 p-6 shadow-soft backdrop-blur
                md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
                md:items-stretch md:p-8
              "
            >
              {/* Left: single 16:9 team visual */}
              <div className="text-left">
                <TeamShot />
              </div>

              {/* Right: pitch + CTA */}
              <div className="flex flex-col justify-center text-left">
                <p className="text-sm font-semibold text-text">
                  “Únete a miles de mentes curiosas…”
                </p>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Vamos a abrir la comunidad poco a poco. Te avisamos cuando se
                  lancen los primeros espacios.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/es/newsletter"
                    className="
                      inline-flex items-center justify-center rounded-xl
                      border border-border/80 bg-surface-1 px-5 py-2.5
                      text-sm font-semibold text-text shadow-soft
                      transition hover:border-accent/35 hover:bg-surface-2
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                      focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                    "
                  >
                    Recibir avisos
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

                <p className="mt-4 text-xs text-muted">
                  Lanzaremos la comunidad con calma: curada, útil y sin ruido.
                </p>
              </div>
            </div>
          </div>

          {/* ✅ Testimonials section */}
          <div className="mx-auto mt-10 w-full max-w-5xl">
            <p className="text-xs font-semibold tracking-wide text-muted">
              TESTIMONIOS (pronto)
            </p>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Testimonial
                quote="Esto cambió cómo aprendo. Por fin tengo un sistema."
                name="User123"
                guide="atom"
              />
              <Testimonial
                quote="Los debates con criterio me dieron claridad real."
                name="User482"
                guide="iris"
              />
            </div>

            <p className="mt-8 text-center text-sm text-muted">
              Las funciones de comunidad se activarán poco a poco.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
