import { Host } from "./CharacterSprite"

type Step = { text: string }

type Props = {
  host: Host
  title?: string
  eyebrow?: string
  steps: Step[]
  note?: string
}

const makeItRealCopyByHost: Record<
  Host,
  {
    title: string
    eyebrow: string
    noteLabel: string
  }
> = {
  atom: {
    title: "Make It Real",
    eyebrow: "Prueba esto para cuestionar lo que asumes",
    noteLabel: "Idea",
  },
  iris: {
    title: "Make It Real",
    eyebrow: "Prueba esto para tomar una mejor decisión",
    noteLabel: "Criterio",
  },
  core: {
    title: "Make It Real",
    eyebrow: "Haz esto ahora mismo",
    noteLabel: "Tip",
  },
}

const hostVisualMeta: Record<
  Host,
  {
    avatarSrc: string
    avatarAlt: string
    panelLabel: string
  }
> = {
  atom: {
    avatarSrc: "/images/sections/posts/atom_posts_reales_v1.webp",
    avatarAlt: "Atom",
    panelLabel: "Curiosity",
  },
  iris: {
    avatarSrc: "/images/sections/posts/iris_posts_reales_v1.webp",
    avatarAlt: "Iris",
    panelLabel: "Ranked",
  },
  core: {
    avatarSrc: "/images/sections/posts/core_posts_reales_v1.webp",
    avatarAlt: "Core",
    panelLabel: "Quiz",
  },
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export default function MakeItRealCard({
  host,
  title,
  eyebrow,
  steps,
  note,
}: Props) {
  const copy = makeItRealCopyByHost[host]
  const visual = hostVisualMeta[host]
  const visibleSteps = steps.slice(0, 6)

  return (
    <section
      className="my-12"
      data-post-block="make-it-real"
      data-host={host}
      aria-labelledby="make-it-real-title"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.36)]",
          "bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_10%,#0b1f14_90%)_0%,#0b1f14_58%,rgba(255,255,255,0.025)_100%)]"
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
              <div className="relative h-[84px] w-[84px] overflow-hidden rounded-full border border-[rgba(var(--accent),0.35)] bg-black/20 shadow-[0_0_22px_rgba(var(--accent),0.28)]">
                <img
                  src={visual.avatarSrc}
                  alt={visual.avatarAlt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <p className="absolute bottom-6 left-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent))]/80">
              {visual.panelLabel}
            </p>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),transparent_48%,rgba(0,0,0,0.10))]"
            />
          </aside>

          <div className="min-w-0 flex-1 px-5 py-6 sm:px-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent))]">
              {title ?? copy.title}
            </p>

            <h3
              id="make-it-real-title"
              className="mt-1 max-w-2xl text-balance text-lg font-semibold tracking-tight text-text"
            >
              {eyebrow ?? copy.eyebrow}
            </h3>

            <ol className="mt-5 grid gap-3 text-sm leading-relaxed text-muted">
              {visibleSteps.map((step, index) => (
                <li
                  key={`${index}-${step.text}`}
                  className="group flex gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3 transition hover:border-[rgba(var(--accent),0.24)] hover:bg-[rgba(var(--accent),0.055)]"
                >
                  <span className="mt-[1px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(var(--accent),0.12)] text-[11px] font-semibold text-[rgb(var(--accent))] ring-1 ring-[rgba(var(--accent),0.28)] transition group-hover:bg-[rgba(var(--accent),0.18)]">
                    {index + 1}
                  </span>

                  <span className="text-pretty text-text/78">
                    {step.text}
                  </span>
                </li>
              ))}
            </ol>

            {note ? (
              <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/10 px-4 py-3">
                <p className="text-xs leading-relaxed text-muted/85">
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