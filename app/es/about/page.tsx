import Link from "next/link"

export default function Page() {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-white/60">
            ATOMICCURIOUS · ACERCA
          </p>

          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Sobre AtomicCurious.
          </h1>

          <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            AtomicCurious es un universo de aprendizaje cinematográfico sobre
            ciencia, tecnología y futuro—diseñado para convertir curiosidad en
            claridad.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/es/start-here"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Empieza aquí
            </Link>
            <Link
              href="/es/newsletter"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              Únete al newsletter
            </Link>
          </div>
        </header>

        {/* Mission */}
        <section className="mt-14 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Misión
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Hacer lo complejo más claro
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Traducimos temas intimidantes a modelos mentales claros—sin
                “aguarlos”.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Cinematográfico, sin ruido
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Visuales fuertes, escritura precisa y diseño calmado—para que la
                señal se mantenga nítida.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Un universo al que puedas volver
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Los videos encienden la curiosidad. La web deja el conocimiento
                buscable, estructurado y útil.
              </p>
            </div>
          </div>
        </section>

        {/* Characters */}
        <section className="mt-14 border-t border-white/10 pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Las mentes detrás de AtomicCurious
            </h2>
            <p className="text-white/60">
              Tres perspectivas. Una misión.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-xs font-medium tracking-wide text-white/60">
                ATOM · CURIOSIDAD
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                La chispa
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Grandes preguntas, datos extraños y momentos de “espera… ¿cómo es
                posible?” que te atrapan.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-xs font-medium tracking-wide text-white/60">
                IRIS · RANKED
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                La analista
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Comparaciones, rankings y frameworks—el camino más claro a través
                de la complejidad.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
              <p className="text-xs font-medium tracking-wide text-white/60">
                CORE · QUIZ
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                El retador
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Pruebas divertidas que revelan lo que sabes, lo que no, y lo que
                vas a disfrutar aprender después.
              </p>
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="mt-14 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Qué esperar
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Videos → Posts → Recursos
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Cada video se convierte en un post buscable, y se agregan recursos
                cuando realmente aportan valor.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold text-white">
                Newsletter como señal
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Un email semanal calmado: novedades, experimentos y descargas—sin
                spam, sin ruido.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-white">
                  Únete al Newsletter de AtomicCurious
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Chispas semanales de ciencia, tecnología y futuro—sin ruido.
                </p>
              </div>
              <Link
                href="/es/newsletter"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Únete al newsletter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

