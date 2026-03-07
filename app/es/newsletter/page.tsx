// app/es/newsletter/page.tsx
import NewsletterSignupEs from "./_components/NewsletterSignupEs"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Boletín | AtomicCurious",
  description:
    "Acceso anticipado a nuevas ideas, herramientas y descubrimientos. Un email cada 15 días.",
  alternates: {
    canonical: "/es/newsletter",
    languages: {
      en: "/newsletter",
      es: "/es/newsletter",
    },
  },
}

const LAUNCH_DATE_ES = "21 de marzo de 2026"

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
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,rgb(var(--accent-alt)/0.07),transparent_62%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute inset-0 ac-grain" />

            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
              <div className="relative aspect-video w-full">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(var(--accent),0.16),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(var(--accent-alt),0.12),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_60%)]" />

                <Image
                  src="/images/sections/Community/Core_Secciones_Inactivas.webp"
                  alt="Core esperando el lanzamiento del boletín"
                  fill
                  sizes="(min-width: 1024px) 960px, 92vw"
                  className="object-cover"
                  priority
                />

                <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] bg-black/35" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  PRÓXIMAMENTE
                </div>
              </div>
            </div>

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
                Un email tranquilo cada 15 días. Claro. Útil. Sin ruido.
              </p>

              <div className="mx-auto mt-7 max-w-xl">
                <NewsletterSignupEs />
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  href="/es/posts"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Ver posts →
                </Link>

                <Link
                  href="/es/start-here"
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Empieza aquí →
                </Link>

                <Link
                  href="/es"
                  className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Volver al inicio
                </Link>
              </div>

              <p className="mx-auto mt-4 max-w-xl text-xs text-muted">
                Al suscribirte aceptas recibir correos de AtomicCurious. Puedes darte de baja en cualquier momento.
              </p>
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
      <ComingSoonNewsletterEs />
    </main>
  )
}