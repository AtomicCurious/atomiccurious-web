import type { CSSProperties, ReactNode } from "react"

type Host = "atom" | "iris" | "core"

type Locale = "es" | "en"

type Tone = "question" | "insight" | "warning" | "note" | "quote"

type Strength = "soft" | "medium" | "strong" | "neutral"

const hostLabel: Record<Host, string> = {
  atom: "ATOM",
  iris: "IRIS",
  core: "CORE",
}

const hostMeta: Record<
  Host,
  {
    labelClassName: string
    shellClassName: string
    contentClassName: string
  }
> = {
  atom: {
    labelClassName: "tracking-[0.18em]",
    shellClassName: "",
    contentClassName: "",
  },
  iris: {
    labelClassName: "tracking-[0.22em]",
    shellClassName: "rounded-[1.35rem]",
    contentClassName: "leading-[1.85] font-normal",
  },
  core: {
    labelClassName: "tracking-[0.16em]",
    shellClassName: "rounded-[1.75rem]",
    contentClassName: "",
  },
}

const toneCopy: Record<Locale, Record<Tone, string>> = {
  es: {
    question: "PREGUNTA",
    insight: "IDEA CLAVE",
    warning: "ALERTA",
    note: "NOTA",
    quote: "DICE",
  },
  en: {
    question: "QUESTION",
    insight: "KEY IDEA",
    warning: "WARNING",
    note: "NOTE",
    quote: "SAYS",
  },
}

const toneMeta: Record<
  Tone,
  {
    variant: "accent" | "neutral"
    strength: Strength
  }
> = {
  question: {
    variant: "accent",
    strength: "soft",
  },
  insight: {
    variant: "accent",
    strength: "strong",
  },
  warning: {
    variant: "accent",
    strength: "strong",
  },
  note: {
    variant: "neutral",
    strength: "neutral",
  },
  quote: {
    variant: "accent",
    strength: "medium",
  },
}

const toneStyle: Record<
  Strength,
  {
    atomBackground: string
    irisBackground: string
    coreBackground: string
    barClassName: string
    contentClassName: string
  }
> = {
  soft: {
    atomBackground:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 9%, #0b1f14 91%) 0%, color-mix(in srgb, rgb(var(--accent)) 5%, #0b1f14 95%) 38%, transparent 100%)",
    irisBackground:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 10%, #061018 90%) 0%, color-mix(in srgb, rgb(var(--accent)) 6%, #070b12 94%) 46%, transparent 100%)",
    coreBackground:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 11%, #171005 89%) 0%, color-mix(in srgb, rgb(var(--accent)) 6%, #0c0803 94%) 46%, transparent 100%)",
    barClassName:
      "w-[5px] bg-[rgb(var(--accent))] shadow-[0_0_14px_rgba(var(--accent),0.45)]",
    contentClassName: "text-base font-medium leading-relaxed text-text/85",
  },
  medium: {
    atomBackground:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 11%, #0b1f14 89%) 0%, color-mix(in srgb, rgb(var(--accent)) 6%, #0b1f14 94%) 40%, transparent 100%)",
    irisBackground:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 12%, #061018 88%) 0%, color-mix(in srgb, rgb(var(--accent)) 7%, #070b12 93%) 46%, transparent 100%)",
    coreBackground:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 13%, #171005 87%) 0%, color-mix(in srgb, rgb(var(--accent)) 7%, #0c0803 93%) 46%, transparent 100%)",
    barClassName:
      "w-[6px] bg-[rgb(var(--accent))] shadow-[0_0_16px_rgba(var(--accent),0.5)]",
    contentClassName: "text-base font-medium leading-relaxed text-text/90",
  },
  strong: {
    atomBackground:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 14%, #0b1f14 86%) 0%, color-mix(in srgb, rgb(var(--accent)) 8%, #0b1f14 92%) 40%, transparent 100%)",
    irisBackground:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 15%, #061018 85%) 0%, color-mix(in srgb, rgb(var(--accent)) 8%, #070b12 92%) 46%, transparent 100%)",
    coreBackground:
      "linear-gradient(90deg, color-mix(in srgb, rgb(var(--accent)) 16%, #171005 84%) 0%, color-mix(in srgb, rgb(var(--accent)) 9%, #0c0803 91%) 46%, transparent 100%)",
    barClassName:
      "w-[7px] bg-[rgb(var(--accent))] shadow-[0_0_20px_rgba(var(--accent),0.65)]",
    contentClassName: "text-base font-semibold leading-relaxed text-text/90",
  },
  neutral: {
    atomBackground: "",
    irisBackground: "",
    coreBackground: "",
    barClassName: "w-[4px] bg-white/20",
    contentClassName: "text-base font-medium leading-relaxed text-text/85",
  },
}

type Props = {
  host: Host
  tone?: Tone
  label?: string
  locale?: Locale
  children: ReactNode
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function getHostBackground(host: Host, style: (typeof toneStyle)[Strength]) {
  if (host === "iris") return style.irisBackground
  if (host === "core") return style.coreBackground
  return style.atomBackground
}

export default function CharacterCallout({
  host,
  tone = "note",
  label,
  locale = "es",
  children,
}: Props) {
  const meta = toneMeta[tone] ?? toneMeta.note
  const style = toneStyle[meta.strength]
  const hostStyle = hostMeta[host]

  const localizedTitle = toneCopy[locale]?.[tone] ?? toneCopy.es[tone]
  const title = label?.toUpperCase() ?? localizedTitle
  const displayLabel = `${hostLabel[host]} — ${title}:`

  const isAccent = meta.variant === "accent"

  const calloutStyle = isAccent
    ? ({
        background: getHostBackground(host, style),
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
      data-locale={locale}
      style={calloutStyle}
      className={cn(
        "relative my-8 overflow-hidden border shadow-soft",
        hostStyle.shellClassName,
        isAccent ? "border-white/10" : "border-white/10 bg-white/[0.04]"
      )}
    >
      <div className="flex">
        <div
          aria-hidden="true"
          className={cn(
            "shrink-0",
            style.barClassName,
            host === "iris" &&
              "shadow-[0_0_18px_rgba(var(--accent),0.38)]",
            host === "core" &&
              "shadow-[0_0_18px_rgba(var(--accent),0.42)]"
          )}
        />

        <div className="flex-1 px-5 py-5 sm:px-6">
          <div
            className={cn(
              "mb-3 text-xs font-semibold uppercase",
              hostStyle.labelClassName,
              isAccent ? "text-[rgb(var(--accent))]" : "text-muted"
            )}
          >
            {displayLabel}
          </div>

          <div className={cn(style.contentClassName, hostStyle.contentClassName)}>
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}