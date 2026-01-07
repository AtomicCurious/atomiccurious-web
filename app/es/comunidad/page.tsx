import Link from "next/link"

export const metadata = {
  title: "Comunidad | AtomicCurious",
  description:
    "La comunidad AtomicCurious: conversaciones, eventos y espacios privados.",
}

export default function ComunidadPage() {
  return (
    <main className="w-full">
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-muted">
          ATOMICCURIOUS · COMUNIDAD
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Un universo que se construye juntos
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          AtomicCurious no es solo contenido. Este espacio reunirá personas con
          curiosidad genuina, aprendizaje constante y ganas de compartir ideas.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/es/newsletter"
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-bg transition hover:opacity-90"
          >
            Mantente informado
          </Link>

          <Link
            href="/es"
            className="rounded-xl border border-border px-6 py-3 font-semibold text-text transition hover:bg-surface-2"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-12 text-sm text-muted">
          Las funciones de comunidad se activarán poco a poco.
        </p>
      </section>
    </main>
  )
}
