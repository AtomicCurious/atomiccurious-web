import Link from "next/link"
import ContactFormEs from "@/components/sections/ContactFormEs"

export const metadata = {
  title: "Contacto | AtomicCurious",
  description:
    "Colaboraciones, ideas, feedback o conversaciones interesantes. Leemos cada mensaje.",
}

export default function Page() {
  return (
    <main className="w-full">
      {/* NOTE:
          - Esta sección ya NO fuerza un fondo opaco encima.
          - En temas normales (dark/light/auto) verás el editorial limpio.
          - En COSMIC se muestra el “lienzo” cósmico y sí se verá en toda la página.
      */}
      <section className="relative w-full overflow-hidden bg-transparent">
        {/* Background layer: NON-COSMIC (default editorial) */}
        <div className="ac-noncosmic-only pointer-events-none absolute inset-0">
          {/* base */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
          {/* glow suave con accent (sirve para dark/light porque usa tokens) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgb(var(--accent)/0.12),transparent_65%)]" />
          {/* segundo glow sutil */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_30%_20%,rgb(var(--accent-alt)/0.08),transparent_62%)]" />
        </div>

        {/* Background layer: COSMIC (solo cuando data-theme="cosmic") */}
        <div className="ac-cosmic-only pointer-events-none absolute inset-0">
          {/* deep space base */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(120,200,255,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_70%_10%,rgba(182,146,255,0.14),transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_20%_30%,rgba(34,211,238,0.10),transparent_64%)]" />
          {/* vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_120%_at_50%_50%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
          {/* very subtle “film” */}
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%,rgba(255,255,255,0.01))]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-wide text-muted">
              ATOMICCURIOUS · CONTACTO
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Contacto
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
              Para colaboraciones, ideas, feedback o conversaciones interesantes.
              Leemos cada mensaje.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/es/newsletter"
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-surface-1 px-5 py-2 text-sm font-semibold text-text shadow-soft transition hover:border-accent/35 hover:bg-surface-2"
              >
                Únete al boletín
              </Link>

              <Link
                href="/es"
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-bg/40 px-5 py-2 text-sm font-semibold text-text shadow-soft transition hover:border-accent/35 hover:bg-surface-2"
              >
                Volver al inicio
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted">
              ¿Prefieres email?{" "}
              <a
                className="font-semibold text-text underline decoration-border/70 underline-offset-4 hover:decoration-accent/50"
                href="mailto:hello@atomiccurious.com"
              >
                hello@atomiccurious.com
              </a>
            </p>
          </header>

          <div className="mx-auto mt-10 max-w-3xl">
            <ContactFormEs />
          </div>
        </div>
      </section>
    </main>
  )
}

