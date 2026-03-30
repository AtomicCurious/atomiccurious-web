// app/es/aviso-legal/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://atomiccurious.com"),
  title: "Aviso Legal · AtomicCurious",
  description: "Información legal, derechos de autor y uso del contenido en AtomicCurious.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/es/aviso-legal" },
}

export default function AvisoLegalPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-text">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Aviso Legal</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>
          AtomicCurious es un proyecto editorial independiente enfocado en ciencia, tecnología y
          exploración guiada por la curiosidad.
        </p>

        <p>
          Todo el contenido publicado en este sitio —incluyendo textos, diseño, visuales y
          materiales originales— está protegido por las leyes aplicables de propiedad intelectual
          y derechos de autor.
        </p>

        <p>
          Queda prohibida la reproducción, distribución o uso comercial del contenido sin
          autorización previa.
        </p>

        <p>
          AtomicCurious opera de forma internacional y ofrece contenido para una audiencia global.
        </p>

        <p>
          Para consultas legales, solicitudes de derechos o cuestiones relacionadas con el
          contenido, puedes contactarnos a través de los canales oficiales indicados en el sitio.
        </p>
      </div>
    </section>
  )
}
