import type { CSSProperties, ReactNode } from "react"

type Host = "atom" | "iris" | "core"

type Tone = "question" | "insight" | "warning" | "note" | "quote"

type Strength = "soft" | "medium" | "strong" | "neutral"

const hostLabel: Record<Host, string> = {
  atom: "ATOM",
  iris: "IRIS",
  core: "CORE",
}

const toneMeta: Record<
  Tone,
  {
    title: string
    variant: "accent" | "neutral"
    strength: Strength
  }
> = {
  question: {
    title: "PREGUNTA",
    variant: "accent",
    strength: "soft",
  },
  insight: {
    title: "IDEA CLAVE",
    variant: "accent",
    strength: "strong",
  },
  warning: {
    title: "ALERTA",
    variant: "accent",
    strength: "strong",
  },
  note: {
    title: "NOTA",
    variant: "neutral",
    strength: "neutral",
  },
  quote: {
    title: "DICE",
    variant: "accent",
    strength: "medium",
  },
}

const toneStyle: Record<
  Strength,
  {
    background: string
    barClassName: string
    contentClassName: string
  }
> = {
  soft: {
    background:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 9%, #0b1f14 91%) 0%, color-mix(in srgb, rgb(var(--accent)) 5%, #0b1f14 95%) 38%, transparent 100%)",
    barClassName:
      "w-[5px] bg-[rgb(var(--accent))] shadow-[0_0_14px_rgba(var(--accent),0.45)]",
    contentClassName: "text-base font-medium leading-relaxed text-text/85",
  },
  medium: {
    background:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 11%, #0b1f14 89%) 0%, color-mix(in srgb, rgb(var(--accent)) 6%, #0b1f14 94%) 40%, transparent 100%)",
    barClassName:
      "w-[6px] bg-[rgb(var(--accent))] shadow-[0_0_16px_rgba(var(--accent),0.5)]",
    contentClassName: "text-base font-medium leading-relaxed text-text/90",
  },
  strong: {
    background:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 14%, #0b1f14 86%) 0%, color-mix(in srgb, rgb(var(--accent)) 8%, #0b1f14 92%) 40%, transparent 100%)",
    barClassName:
      "w-[7px] bg-[rgb(var(--accent))] shadow-[0_0_20px_rgba(var(--accent),0.65)]",
    contentClassName: "text-base font-semibold leading-relaxed text-text/90",
  },
  neutral: {
    background: "",
    barClassName: "w-[4px] bg-white/20",
    contentClassName: "text-base font-medium leading-relaxed text-text/85",
  },
}

type Props = {
  host: Host
  tone?: Tone
  label?: string
  children: ReactNode
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export default function CharacterCallout({
  host,
  tone = "note",
  label,
  children,
}: Props) {
  const meta = toneMeta[tone] ?? toneMeta.note
  const style = toneStyle[meta.strength]
  const title = label?.toUpperCase() ?? meta.title
  const displayLabel = `${hostLabel[host]} — ${title}:`

  const isAccent = meta.variant === "accent"

  const calloutStyle = isAccent
    ? ({
        background: style.background,
        backgroundSize: "100% 200%",
        animation: "acCalloutFloat 8s ease-in-out infinite",
      } as CSSProperties)
    : undefined

  return (
    <aside
      role="note"
      aria-label={displayLabel}
      data-post-block="character-callout"
      data-host={host}
      data-tone={tone}
      style={calloutStyle}
      className={cn(
        "relative my-8 overflow-hidden rounded-2xl border shadow-soft",
        isAccent ? "border-white/10" : "border-white/10 bg-white/[0.04]"
      )}
    >
      <div className="flex">
        <div
          aria-hidden="true"
          className={cn("shrink-0", style.barClassName)}
        />

        <div className="flex-1 px-5 py-5 sm:px-6">
          <div
            className={cn(
              "mb-3 text-xs font-semibold uppercase tracking-[0.18em]",
              isAccent ? "text-[rgb(var(--accent))]" : "text-muted"
            )}
          >
            {displayLabel}
          </div>

          <div className={style.contentClassName}>{children}</div>
        </div>
      </div>
    </aside>
  )
}