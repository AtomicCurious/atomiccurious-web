import { Host } from "./CharacterSprite"

type Locale = "es" | "en"

type Step = { text: string }

type Props = {
  host: Host
  locale?: Locale
  title?: string
  eyebrow?: string
  steps: Step[]
  note?: string
}

const makeItRealCopyByLocale: Record<
  Locale,
  Record<
    Host,
    {
      title: string
      eyebrow: string
      noteLabel: string
    }
  >
> = {
  es: {
    atom: {
      title: "Hazlo real",
      eyebrow: "Prueba esto para cuestionar lo que asumes",
      noteLabel: "Idea",
    },
    iris: {
      title: "Aplica los criterios",
      eyebrow: "Evalúa el hábito antes de intentar cambiarlo",
      noteLabel: "Criterio",
    },
    core: {
      title: "Hazlo real",
      eyebrow: "Haz esto ahora mismo",
      noteLabel: "Tip",
    },
  },
  en: {
    atom: {
      title: "Make It Real",
      eyebrow: "Try this to question what you assume",
      noteLabel: "Idea",
    },
    iris: {
      title: "Apply the Criteria",
      eyebrow: "Evaluate the habit before trying to change it",
      noteLabel: "Criterion",
    },
    core: {
      title: "Make It Real",
      eyebrow: "Do this right now",
      noteLabel: "Tip",
    },
  },
}

const hostVisualMeta: Record<
  Host,
  {
    avatarSrc: string
    avatarAlt: string
    panelLabel: Record<Locale, string>
  }
> = {
  atom: {
    avatarSrc: "/images/sections/posts/atom_posts_reales_v1.webp",
    avatarAlt: "Atom",
    panelLabel: {
      es: "Curiosidad",
      en: "Curiosity",
    },
  },
  iris: {
    avatarSrc: "/images/sections/posts/iris_posts_reales_v1.webp",
    avatarAlt: "Iris",
    panelLabel: {
      es: "Ranking",
      en: "Ranked",
    },
  },
  core: {
    avatarSrc: "/images/sections/posts/core_posts_reales_v1.webp",
    avatarAlt: "Core",
    panelLabel: {
      es: "Quiz",
      en: "Quiz",
    },
  },
}

const backgroundByHost: Record<Host, string> = {
  atom:
    "bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_12%,#06160f_88%)_0%,color-mix(in_srgb,rgb(var(--accent))_6%,#050b08_94%)_58%,rgba(255,255,255,0.025)_100%)]",

  iris:
    "bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_12%,#061018_88%)_0%,color-mix(in_srgb,rgb(var(--accent))_6%,#070b12_94%)_58%,rgba(255,255,255,0.025)_100%)]",

  core:
    "bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_12%,#171005_88%)_0%,color-mix(in_srgb,rgb(var(--accent))_6%,#0c0803_94%)_58%,rgba(255,255,255,0.025)_100%)]",
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export default function MakeItRealCard({
  host,
  locale = "es",
  title,
  eyebrow,
  steps,
  note,
}: Props) {
  const copy = makeItRealCopyByLocale[locale][host]
  const visual = hostVisualMeta[host]
  const visibleSteps = steps.slice(0, 6)

  return (
    <section
      className={cn("my-12", host === "iris" && "my-14")}
      data-post-block="make-it-real"
      data-host={host}
      data-locale={locale}
      aria-labelledby="make-it-real-title"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.36)]",
          backgroundByHost[host]
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(var(--accent),0.20),transparent_32%),radial-gradient(circle_at_92%_88%,rgba(var(--accent),0.08),transparent_30%)]"
        />

        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[7px] bg-[rgb(var(--accent))] shadow-[0_0_22px_rgba(var(--accent),0.55)]"
        />

        <div className="relative flex items-stretch">
          <aside className="relative hidden w-[156px] shrink-0 border-r border-white/10 sm:block">
            <div className="absolute left-7 top-7">
              <div
                className={cn(
                  "relative h-[84px] w-[84px] overflow-hidden rounded-full border bg-black/20",
                  host === "iris"
                    ? "border-[rgba(var(--accent),0.24)] shadow-[0_0_18px_rgba(var(--accent),0.18)]"
                    : "border-[rgba(var(--accent),0.35)] shadow-[0_0_22px_rgba(var(--accent),0.28)]"
                )}
              >
                <img
                  src={visual.avatarSrc}
                  alt={visual.avatarAlt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <p
              className={cn(
                "absolute bottom-6 left-7 text-[10px] font-semibold uppercase text-[rgb(var(--accent))]/80",
                host === "iris" ? "tracking-[0.22em]" : "tracking-[0.18em]"
              )}
            >
              {visual.panelLabel[locale]}
            </p>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),transparent_48%,rgba(0,0,0,0.10))]"
            />
          </aside>

          <div className="min-w-0 flex-1 px-5 py-6 sm:px-7">
            <p
              className={cn(
                "text-[11px] font-semibold uppercase text-[rgb(var(--accent))]",
                host === "iris" ? "tracking-[0.22em]" : "tracking-[0.18em]"
              )}
            >
              {title ?? copy.title}
            </p>

            <h3
              id="make-it-real-title"
              className={cn(
                "mt-1 max-w-2xl text-balance text-lg tracking-tight text-text",
                host === "iris" ? "font-medium leading-[1.55]" : "font-medium"
              )}
            >
              {eyebrow ?? copy.eyebrow}
            </h3>

            <ol
              className={cn(
                "mt-5 grid gap-3 text-sm text-muted",
                host === "iris" ? "leading-[1.9]" : "leading-relaxed"
              )}
            >
              {visibleSteps.map((step, index) => (
                <li
                  key={`${index}-${step.text}`}
                  className="group flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3 transition hover:border-[rgba(var(--accent),0.24)] hover:bg-[rgba(var(--accent),0.055)]"
                >
                  <span
                    className={cn(
                      "mt-[1px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-[rgb(var(--accent))] ring-1 transition",
                      host === "iris"
                        ? "bg-[rgba(var(--accent),0.08)] ring-[rgba(var(--accent),0.18)] group-hover:bg-[rgba(var(--accent),0.12)]"
                        : "bg-[rgba(var(--accent),0.12)] ring-[rgba(var(--accent),0.28)] group-hover:bg-[rgba(var(--accent),0.18)]"
                    )}
                  >
                    {index + 1}
                  </span>

                  <span
                    className={cn(
                      "text-pretty",
                      host === "iris" ? "text-text/74" : "text-text/78"
                    )}
                  >
                    {step.text}
                  </span>
                </li>
              ))}
            </ol>

            {note ? (
              <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3">
                <p
                  className={cn(
                    "text-xs leading-relaxed text-muted/85",
                    host === "iris" && "leading-[1.8]"
                  )}
                >
                  <span className="font-semibold text-[rgb(var(--accent))]">
                    {copy.noteLabel}:
                  </span>{" "}
                  {note}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="h-px w-full bg-[linear-gradient(90deg,rgba(var(--accent),0.26),transparent)]" />
      </div>
    </section>
  )
}