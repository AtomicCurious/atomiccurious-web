type Props = {
  locale?: "es" | "en"
}

const copyByLocale = {
  es: {
    eyebrow: "AtomicCurious",
    title: "Ahora ya sabes de dónde vienen tus 8 horas",
    description:
      "La pregunta es: ¿vas a seguir usándolas igual? Si este tema te movió, el video lo desarrolla completo. Y lo que no cabe aquí, vive en la newsletter.",
    youtube: "Ver en YouTube",
    newsletter: "Ir a la newsletter",
  },
  en: {
    eyebrow: "AtomicCurious",
    title: "Now you know where your 8 hours came from",
    description:
      "The question is: will you keep using them the same way? If this topic stayed with you, the full video goes deeper. And what doesn’t fit here lives in the newsletter.",
    youtube: "Watch on YouTube",
    newsletter: "Go to newsletter",
  },
}

export function PostEndCTA({ locale = "es" }: Props) {
  const copy = copyByLocale[locale]

  return (
    <section
      className="
        ac-reveal mt-20 overflow-hidden rounded-[28px]
        border border-white/10
        bg-[linear-gradient(135deg,rgba(var(--accent),0.10),rgba(255,255,255,0.035)_42%,rgba(255,255,255,0.02))]
        px-6 py-10 text-center
        shadow-[0_18px_70px_rgba(0,0,0,0.28)]
      "
      data-post-block="end-cta"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgb(var(--accent))]/75">
          {copy.eyebrow}
        </p>

        <h3 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
          {copy.title}
        </h3>

        <p className="mt-4 text-pretty text-[1rem] leading-7 text-white/72">
          {copy.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/youtube"
            className="
              rounded-full border border-[rgba(var(--accent),0.55)]
              bg-[rgb(var(--accent))] px-5 py-2.5
              text-sm font-semibold text-black
              transition hover:opacity-90
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-[rgba(var(--accent),0.65)]
              focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            {copy.youtube}
          </a>

          <a
            href="/newsletter"
            className="
              rounded-full border border-white/12 bg-white/[0.04]
              px-5 py-2.5 text-sm font-medium text-white/88
              transition hover:bg-white/[0.07]
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-white/25
              focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            {copy.newsletter}
          </a>
        </div>
      </div>
    </section>
  )
}