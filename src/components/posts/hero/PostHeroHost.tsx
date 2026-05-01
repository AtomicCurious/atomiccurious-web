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

  return (
    <header
      data-post-block="hero"
      data-host={host}
      className="mx-auto mt-10 max-w-[74ch] rounded-2xl border border-[rgba(var(--accent),0.2)] bg-white/[0.04] px-5 py-5 shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-start gap-4">
        <CharacterSprite host={host} variant="presenter" size={56} priority />

        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span>{eyebrow}</span>
            <span className="h-1 w-1 rounded-full bg-[rgb(var(--accent))]" />
            <span>Presentado por {hostName[host]}</span>

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

          <h1 className="mt-2 text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">
            {title}
          </h1>

          {subheadline ? (
            <p className="mt-3 text-pretty text-base leading-relaxed text-white/70">
              {subheadline}
            </p>
          ) : null}

          {(formatLabel || tag) && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {formatLabel ? (
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                  {formatLabel}
                </span>
              ) : null}

              {tag ? (
                <span className="rounded-full border border-[rgba(var(--accent),0.28)] bg-[rgba(var(--accent),0.08)] px-3 py-1 text-xs text-white/70">
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