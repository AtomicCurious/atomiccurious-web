// app/es/terminos/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://atomiccurious.com"),
  title: "Términos y Condiciones · AtomicCurious",
  description: "Reglas de uso del sitio y condiciones sobre el contenido de AtomicCurious.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/es/terminos" },
}

export default function TerminosPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-text">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Términos y Condiciones</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>Al acceder o utilizar AtomicCurious, aceptas los siguientes términos.</p>

        <p>
          Todo el contenido publicado en este sitio tiene fines{" "}
          <strong>informativos y educativos</strong>. No constituye asesoría profesional,
          médica, legal ni financiera.
        </p>

        <p>
          Salvo que se indique lo contrario, todo el contenido —incluyendo textos, diseño,
          visuales y materiales descargables— es propiedad intelectual de AtomicCurious y no
          puede ser reproducido o distribuido sin autorización.
        </p>

        <p>
          Los recursos gratuitos se proporcionan “tal cual”, sin garantías sobre resultados o
          adecuación para un propósito específico.
        </p>

        <p>
          AtomicCurious puede enlazar a sitios externos. No somos responsables del contenido,
          políticas o prácticas de terceros.
        </p>

        <p>
          Estos términos pueden actualizarse ocasionalmente. El uso continuo del sitio implica
          la aceptación de la versión más reciente.
        </p>
      </div>
    </section>
  )
}
