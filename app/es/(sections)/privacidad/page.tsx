// app/es/privacidad/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://atomiccurious.com"),
  title: "Política de Privacidad · AtomicCurious",
  description: "Cómo AtomicCurious recopila, usa y protege tu información.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/es/privacidad" },
}

export default function PrivacidadPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-text">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Política de Privacidad</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>AtomicCurious respeta tu privacidad.</p>

        <p>
          Solo recopilamos la información necesaria para operar este sitio y mejorar la
          experiencia, como:
        </p>

        <ul className="list-disc pl-5">
          <li>Correo electrónico (si te suscribes al newsletter)</li>
          <li>Datos básicos de analítica (páginas visitadas, dispositivo, ubicación general)</li>
          <li>Información que compartes voluntariamente a través de formularios</li>
        </ul>

        <p>
          <strong>No vendemos</strong>, alquilamos ni compartimos tus datos personales.
        </p>

        <p>
          Los correos se utilizan únicamente para enviar contenido, recursos o novedades
          relacionadas con AtomicCurious. Puedes darte de baja en cualquier momento desde el
          enlace incluido en cada email.
        </p>

        <p>
          Algunos servicios de terceros (como analítica o proveedores de email) pueden
          procesar datos limitados en nuestro nombre, solo con fines operativos.
        </p>

        <p>Si tienes preguntas sobre el uso de tus datos, puedes contactarnos en cualquier momento.</p>
      </div>
    </section>
  )
}
