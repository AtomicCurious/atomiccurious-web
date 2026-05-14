type Host = "atom" | "iris" | "core"

type Props = {
  locale?: "es" | "en"
  host?: Host
  youtubeId?: string
}

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@atomiccurious"

const copyByLocaleAndHost = {
  es: {
    atom: {
      eyebrow: "AtomicCurious",
      title: "Ahora ya sabes de dónde vienen tus 8 horas",
      description:
        "La pregunta es: ¿vas a seguir usándolas igual? Si este tema te movió, el video lo desarrolla completo. Y lo que no cabe aquí, vive en la newsletter.",
      youtube: "Ver en YouTube",
      newsletter: "Ir a la newsletter",
    },
    iris: {
      eyebrow: "AtomicCurious · Iris",
      title: "Ahora tienes los criterios",
      description:
        "El siguiente paso no es elegir el hábito perfecto. Es elegir el que puedes sostener en tu vida real. El análisis completo está en YouTube, y lo que no cabe aquí vive en la newsletter.",
      youtube: "Ver ranking completo",
      newsletter: "Ir a la newsletter",
    },
    core: {
      eyebrow: "AtomicCurious · Core",
      title: "Ahora conviértelo en acción",
      description:
        "La idea no termina aquí. Puedes seguir explorando el tema en YouTube o llevarlo más lejos en la newsletter.",
      youtube: "Ver en YouTube",
      newsletter: "Ir a la newsletter",
    },
  },
  en: {
    atom: {
      eyebrow: "AtomicCurious",
      title: "Now you know where your 8 hours came from",
      description:
        "The question is: will you keep using them the same way? If this topic stayed with you, the full video goes deeper. And what doesn’t fit here lives in the newsletter.",
      youtube: "Watch on YouTube",
      newsletter: "Go to newsletter",
    },
    iris: {
      eyebrow: "AtomicCurious · Iris",
      title: "Now you have the criteria",
      description:
        "The next step isn’t choosing the perfect habit. It’s choosing the one you can actually sustain in real life. The full ranking is on YouTube, and what doesn’t fit here lives in the newsletter.",
      youtube: "Watch the full ranking",
      newsletter: "Go to newsletter",
    },
    core: {
      eyebrow: "AtomicCurious · Core",
      title: "Now turn it into action",
      description:
        "The idea doesn’t end here. You can keep exploring it on YouTube or take it further in the newsletter.",
      youtube: "Watch on YouTube",
      newsletter: "Go to newsletter",
    },
  },
}

const ctaVisualByHost: Record<
  Host,
  {
    shell: string
    eyebrow: string
    title: string
    description: string
  }
> = {
  atom: {
    shell:
      "rounded-[30px] bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_13%,#06160f_87%)_0%,color-mix(in_srgb,rgb(var(--accent))_6%,#050b08_94%)_52%,rgba(255,255,255,0.02)_100%)]",
    eyebrow: "tracking-[0.22em]",
    title: "text-2xl font-semibold sm:text-3xl",
    description: "leading-7",
  },
  iris: {
    shell:
      "rounded-[32px] bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_12%,#061018_88%)_0%,color-mix(in_srgb,rgb(var(--accent))_6%,#070b12_94%)_52%,rgba(255,255,255,0.02)_100%)]",
    eyebrow: "tracking-[0.24em]",
    title: "text-2xl font-medium leading-tight sm:text-3xl",
    description: "leading-8",
  },
  core: {
    shell:
      "rounded-[32px] bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_13%,#171005_87%)_0%,color-mix(in_srgb,rgb(var(--accent))_6%,#0c0803_94%)_52%,rgba(255,255,255,0.02)_100%)]",
    eyebrow: "tracking-[0.22em]",
    title: "text-2xl font-semibold sm:text-3xl",
    description: "leading-7",
  },
}

function getYouTubeHref(youtubeId?: string) {
  if (!youtubeId) return YOUTUBE_CHANNEL_URL

  return `https://www.youtube.com/watch?v=${youtubeId}`
}

export function PostEndCTA({
  locale = "es",
  host = "atom",
  youtubeId,
}: Props) {
  const copy = copyByLocaleAndHost[locale][host]
  const visual = ctaVisualByHost[host]
  const youtubeHref = getYouTubeHref(youtubeId)

  return (
    <section
      className={`
        ac-reveal mt-20 overflow-hidden
        border border-[rgba(var(--accent),0.16)]
        px-6 py-10 text-center
        shadow-[0_18px_70px_rgba(0,0,0,0.28)]
        ${visual.shell}
      `}
      data-post-block="end-cta"
      data-host={host}
    >
      <div className="mx-auto max-w-3xl">
        <p
          className={`
            text-xs font-semibold uppercase text-[rgb(var(--accent))]/78
            ${visual.eyebrow}
          `}
        >
          {copy.eyebrow}
        </p>

        <h3
          className={`
            mt-3 text-balance tracking-[-0.035em] text-white
            ${visual.title}
          `}
        >
          {copy.title}
        </h3>

        <p
          className={`
            mt-4 text-pretty text-[1rem] text-white/72
            ${visual.description}
          `}
        >
          {copy.description}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={youtubeHref}
            target="_blank"
            rel="noopener noreferrer"
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
              rounded-full border border-[rgba(var(--accent),0.16)]
              bg-[rgba(var(--accent),0.05)]
              px-5 py-2.5 text-sm font-medium text-white/88
              transition hover:border-[rgba(var(--accent),0.26)]
              hover:bg-[rgba(var(--accent),0.08)]
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-[rgba(var(--accent),0.35)]
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