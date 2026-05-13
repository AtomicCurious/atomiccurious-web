import CharacterSprite, { Host } from "../blocks/CharacterSprite"

type Props = {
  host: Host
  title: string
  subheadline?: string
  readingTime?: string
  eyebrow?: string
  formatLabel?: string
  tag?: string
  dateLabel?: string
  show?: boolean
}

const hostName: Record<Host, string> = {
  atom: "ATOM",
  iris: "IRIS",
  core: "CORE",
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export default function PostHeroHost({
  host,
  title,
  subheadline,
  readingTime,
  eyebrow = "AtomicCurious · Post",
  formatLabel,
  tag,
  dateLabel,
  show = true,
}: Props) {
  if (!show) return null

  const isIris = host === "iris"

  return (
    <header
      data-post-block="hero"
      data-host={host}
      className={cn(
        "mx-auto mt-10 max-w-[74ch] border shadow-[0_8px_40px_rgba(0,0,0,0.25)]",
        isIris
          ? "rounded-[1.7rem] border-[rgba(var(--accent),0.14)] bg-[rgba(var(--accent),0.035)] px-6 py-6"
          : "rounded-2xl border-[rgba(var(--accent),0.2)] bg-white/[0.04] px-5 py-5"
      )}
    >
      <div className="flex items-start gap-4">
        <CharacterSprite
          host={host}
          variant="presenter"
          size={isIris ? 60 : 56}
          priority
        />

        <div className="min-w-0">
          <p
            className={cn(
              "flex flex-wrap items-center gap-2 text-[11px] uppercase",
              isIris
                ? "tracking-[0.24em] text-white/36"
                : "tracking-[0.2em] text-white/40"
            )}
          >
            <span>{eyebrow}</span>

            <span className="h-1 w-1 rounded-full bg-[rgb(var(--accent))]" />

            <span>
              {isIris
                ? `Analysis by ${hostName[host]}`
                : `Presentado por ${hostName[host]}`}
            </span>

            {readingTime ? (
              <>
                <span className="h-1 w-1 rounded-full bg-[rgb(var(--accent))]" />
                <span>{readingTime}</span>
              </>
            ) : null}

            {dateLabel ? (
              <>
                <span className="h-1 w-1 rounded-full bg-[rgb(var(--accent))]" />
                <span>{dateLabel}</span>
              </>
            ) : null}
          </p>

          <h1
            className={cn(
              "mt-2 text-balance tracking-[-0.035em] text-white",
              isIris
                ? "text-[2.4rem] font-medium leading-[1.02] sm:text-[3rem]"
                : "text-3xl font-semibold leading-tight sm:text-4xl"
            )}
          >
            {title}
          </h1>

          {subheadline ? (
            <p
              className={cn(
                "mt-3 text-pretty",
                isIris
                  ? "max-w-[62ch] text-[1.02rem] leading-[1.9] text-white/64"
                  : "text-base leading-relaxed text-white/70"
              )}
            >
              {subheadline}
            </p>
          ) : null}

          {(formatLabel || tag) && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {formatLabel ? (
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs",
                    isIris
                      ? "border border-white/8 bg-white/[0.025] text-white/52"
                      : "border border-white/10 bg-white/[0.04] text-white/60"
                  )}
                >
                  {formatLabel}
                </span>
              ) : null}

              {tag ? (
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs",
                    isIris
                      ? "border border-[rgba(var(--accent),0.18)] bg-[rgba(var(--accent),0.05)] text-white/64"
                      : "border border-[rgba(var(--accent),0.28)] bg-[rgba(var(--accent),0.08)] text-white/70"
                  )}
                >
                  {tag}
                </span>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}