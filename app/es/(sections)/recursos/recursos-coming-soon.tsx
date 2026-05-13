import Image from "next/image"

const HERO_CORE_IMAGE = "/images/sections/community/core_secciones_inactivas.webp" 

export default function RecursosComingSoon() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg px-6 py-10 text-text sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent),0.10),transparent_65%)] blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl rounded-[2rem] border border-white/35 p-6 sm:p-10">
        <div className="rounded-[1.5rem] border border-white/25 p-6 text-center sm:p-10">
          <div className="mb-8 inline-flex rounded-full border border-white/45 px-6 py-2 text-xs font-bold uppercase tracking-wide text-text">
            Próximamente
          </div>

          <div className="relative mx-auto h-[360px] max-w-4xl sm:h-[520px]">
            <Image
              src={HERO_CORE_IMAGE}
              alt="Core preparando recursos de AtomicCurious"
              fill
              priority
              sizes="(min-width: 1024px) 900px, 90vw"
              className="object-contain drop-shadow-[0_0_65px_rgba(var(--accent),0.34)]"
            />
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-muted">
            AtomicCurious · Recursos
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-text sm:text-7xl">
            Recursos
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-balance text-lg leading-relaxed text-muted sm:text-2xl">
            Una biblioteca curada de libros, apps, sitios web, cursos y
            herramientas para aprender mejor, pensar con más claridad y mantener
            viva la curiosidad.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-text">
            Lanzamiento · 18 de julio de 2026
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-muted">
            Estamos preparando esta sección con calma: recursos útiles, bien
            seleccionados y sin ruido.
          </p>
        </div>
      </section>
    </main>
  )
}