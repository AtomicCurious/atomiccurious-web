import Link from "next/link"

export const metadata = {
  title: "Recursos | AtomicCurious",
  description:
    "Ebooks, plantillas, revista y futuros productos para mentes curiosas.",
}

export default function RecursosPage() {
  return (
    <main className="w-full">
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-muted">
          ATOMICCURIOUS · RECURSOS
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Recursos para mentes curiosas
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Ebooks, plantillas, una futura revista y productos diseñados con
          intención. Todo pensado para aprender mejor y pensar más profundo.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/es/newsletter"
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-bg transition hover:opacity-90"
          >
            Únete al boletín
          </Link>

          <Link
            href="/es"
            className="rounded-xl border border-border px-6 py-3 font-semibold text-text transition hover:bg-surface-2"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-12 text-sm text-muted">
          Los primeros lanzamientos llegarán pronto.
        </p>
      </section>
    </main>
  )
}
