// app/es/contacto/page.tsx
import Link from "next/link"
import Image from "next/image"
import ContactFormEs from "@/components/sections/ContactFormEs"

export const metadata = {
  title: "Contacto | AtomicCurious",
  description:
    "Colaboraciones, ideas, feedback o conversaciones interesantes. Leemos cada mensaje.",
}

const CONTACT_CSS = `
/* CONTACT image switching (SSR-safe, CSS-only)
   Default = Atom (no data-character yet)
*/
.ac-contact-img{
  opacity:0;
  transition:opacity 280ms ease;
  will-change:opacity;
}
.ac-contact-atom{ opacity:1; }

body[data-character="iris"] .ac-contact-atom{ opacity:0; }
body[data-character="iris"] .ac-contact-iris{ opacity:1; }

body[data-character="core"] .ac-contact-atom{ opacity:0; }
body[data-character="core"] .ac-contact-core{ opacity:1; }

/* If data-character="atom" explicitly */
body[data-character="atom"] .ac-contact-atom{ opacity:1; }
body[data-character="atom"] .ac-contact-iris,
body[data-character="atom"] .ac-contact-core{ opacity:0; }
`

export default function Page() {
  return (
    <main className="w-full" data-chmode="none">
      {/* SSR-safe rules inside page.tsx WITHOUT styled-jsx */}
      <style dangerouslySetInnerHTML={{ __html: CONTACT_CSS }} />

      {/* NOTE:
          - Página neutral (sin personajes como guía).
          - No narrativa: foco en conversión.
          - La imagen es de soporte (cambia sutilmente por host, pero no “dirige”).
      */}
      <section className="relative w-full overflow-hidden bg-transparent">
        {/* Background layer: NON-COSMIC */}
        <div className="ac-noncosmic-only pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgb(var(--accent)/0.12),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_30%_20%,rgb(var(--accent-alt)/0.08),transparent_62%)]" />
        </div>

        {/* Background layer: COSMIC */}
        <div className="ac-cosmic-only pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(120,200,255,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_70%_10%,rgba(182,146,255,0.14),transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_20%_30%,rgba(34,211,238,0.10),transparent_64%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_120%_at_50%_50%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
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
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-surface-1 px-5 py-2 text-sm font-semibold text-text shadow-soft transition hover:border-accent/35 hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Únete al boletín
              </Link>

              <Link
                href="/es"
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-bg/40 px-5 py-2 text-sm font-semibold text-text shadow-soft transition hover:border-accent/35 hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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

          {/* Contact content */}
          <div className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:gap-10">
              {/* Form */}
              <div className="order-2 md:order-1">
                <ContactFormEs />
              </div>

              {/* Visual support */}
              <aside className="order-1 md:order-2">
                <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1 shadow-soft">
                  {/* subtle editorial overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_10%,rgb(var(--accent)/0.10),transparent_60%)]" />
                  <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]" />

                  <div className="relative aspect-[4/5] w-full">
                    {/* Default / Atom */}
                    <Image
                      src="/images/sections/contact/atom_contact.webp"
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 768px) 420px, 90vw"
                      className="ac-contact-img ac-contact-atom object-cover"
                    />

                    {/* Iris */}
                    <Image
                      src="/images/sections/contact/iris_contact.webp"
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 768px) 420px, 90vw"
                      className="ac-contact-img ac-contact-iris object-cover"
                    />

                    {/* Core */}
                    <Image
                      src="/images/sections/contact/core_contact.webp"
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(min-width: 768px) 420px, 90vw"
                      className="ac-contact-img ac-contact-core object-cover"
                    />
                  </div>

                  <div className="relative px-5 py-4">
                    <p className="text-sm font-semibold text-text">
                      Me encantaría leerte.
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      Mensajes cortos funcionan perfecto. Si es colaboración,
                      comparte enlaces y un resumen rápido.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
