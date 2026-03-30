// app/es/cookies/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://atomiccurious.com"),
  title: "Política de Cookies · AtomicCurious",
  description: "Cómo AtomicCurious usa cookies y cómo puedes controlarlas.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/es/cookies" },
}

export default function CookiesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-text">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Política de Cookies</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>
          AtomicCurious utiliza cookies para garantizar el correcto funcionamiento del sitio y
          comprender cómo los visitantes interactúan con el contenido.
        </p>

        <p>Las cookies pueden utilizarse para:</p>

        <ul className="list-disc pl-5">
          <li>Habilitar funciones esenciales del sitio</li>
          <li>Medir patrones generales de uso mediante analítica</li>
          <li>Mejorar el rendimiento y la experiencia del usuario</li>
        </ul>

        <p>
          AtomicCurious <strong>no utiliza</strong> cookies con fines publicitarios ni de
          seguimiento intrusivo.
        </p>

        <p>
          Puedes gestionar o desactivar las cookies desde la configuración de tu navegador. Ten
          en cuenta que desactivar ciertas cookies puede afectar el funcionamiento del sitio.
        </p>

        <p>
          Al continuar navegando por AtomicCurious, aceptas el uso de cookies según lo descrito
          en esta política.
        </p>
      </div>
    </section>
  )
}
