// app/es/calendario/page.tsx
import type { Metadata } from "next"
import CalendarLeadMagnetFormEs from "@/components/lead-magnets/CalendarLeadMagnetFormEs"

export const metadata: Metadata = {
  title: "Calendario Científico 2026 — AtomicCurious",
  description: "Descarga gratis el Calendario Científico 2026. Recibe el enlace directo por correo.",
  alternates: {
    canonical: "/es/calendario",
    languages: {
      en: "/calendar",
      es: "/es/calendario",
    },
  },
  openGraph: {
    title: "Calendario Científico 2026 — AtomicCurious",
    description: "Descarga gratis el Calendario Científico 2026. Recibe el enlace directo por correo.",
    url: "/es/calendario",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendario Científico 2026 — AtomicCurious",
    description: "Descarga gratis el Calendario Científico 2026. Recibe el enlace directo por correo.",
  },
}

export default function Page() {
  return (
    <main className="relative w-full bg-bg overflow-x-hidden no-scrollbar">
      {/* Contenedor externo (responsive + sin espacio desperdiciado en pantallas grandes) */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-5 pb-10 sm:px-6 sm:pt-6 sm:pb-12 lg:px-8">
        <header className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Calendario Científico 2026
          </h1>
        </header>

        <section className="mt-6 sm:mt-8">
          <CalendarLeadMagnetFormEs />
        </section>
      </div>
    </main>
  )
}