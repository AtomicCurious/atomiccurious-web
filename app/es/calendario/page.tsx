import type { Metadata } from "next"
import CalendarLeadMagnetFormEs from "@/components/lead-magnets/CalendarLeadMagnetFormEs"

export const metadata: Metadata = {
  title: "Calendario de Ciencia 2026 — AtomicCurious",
  description: "Descarga gratis el Calendario de Ciencia 2026. Enlace directo por correo.",
  alternates: {
    canonical: "/es/calendario",
    languages: {
      es: "/es/calendario",
      en: "/en/calendar",
    },
  },
  openGraph: {
    title: "Calendario de Ciencia 2026 — AtomicCurious",
    description: "Descarga gratis el Calendario de Ciencia 2026. Enlace directo por correo.",
    url: "/es/calendario",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendario de Ciencia 2026 — AtomicCurious",
    description: "Descarga gratis el Calendario de Ciencia 2026. Enlace directo por correo.",
  },
}

export default function Page() {
  return (
    // ✅ Scroll natural, pero sin scrollbar visible en esta página
    <main className="relative w-full bg-bg overflow-x-hidden no-scrollbar">
      <div className="mx-auto w-full max-w-[1280px] px-3 pt-7 sm:px-6 sm:pt-9 lg:px-8">
        <header className="mx-auto w-full max-w-3xl text-center">
          <p className="text-[11px] font-semibold tracking-wide text-text/70">
            ATOMICCURIOUS · DESCARGA GRATUITA
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Calendario de Ciencia 2026
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-text/80">
            Te enviamos un enlace directo por correo.
          </p>
        </header>

        {/* un poco menos de padding bottom para que se sienta más “sheet” */}
        <section className="mt-4 pb-8">
          <CalendarLeadMagnetFormEs />
        </section>
      </div>
    </main>
  )
}
