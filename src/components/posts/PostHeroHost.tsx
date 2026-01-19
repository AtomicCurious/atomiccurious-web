import CharacterSprite, { Host } from "./CharacterSprite"

type Props = {
  host: Host
  title: string
  subheadline?: string
  readingTime?: string
  show?: boolean
}

export default function PostHeroHost({
  host,
  title,
  subheadline,
  readingTime,
  show = false,
}: Props) {
  if (!show) return null

  return (
    <header className="mx-auto mt-10 max-w-[74ch] rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5">
      <div className="flex items-start gap-4">
        <CharacterSprite host={host} variant="presenter" size={56} priority />
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.18em] uppercase text-muted/70">
            Presentado por {host.toUpperCase()}
            {readingTime ? ` · ${readingTime}` : ""}
          </p>
          <h2 className="mt-2 text-balance text-xl font-semibold leading-tight text-text">
            {title}
          </h2>
          {subheadline ? (
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
              {subheadline}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  )
}
