import CharacterSprite, { Host } from "./CharacterSprite"

type Step = { text: string }

type Props = {
  host: Host
  title?: string
  eyebrow?: string
  steps: Step[]
  note?: string
}

export default function MakeItRealCard({
  host,
  title = "Make It Real",
  eyebrow = "Try It Yourself",
  steps,
  note,
}: Props) {
  return (
    <section className="my-10">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-stretch">
          <div className="relative hidden w-[150px] shrink-0 sm:block">
            <div className="absolute left-6 top-6">
              <CharacterSprite host={host} variant="experiment" size={84} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
          </div>

          <div className="min-w-0 flex-1 px-5 py-6 sm:px-7">
            <p className="text-[11px] tracking-[0.18em] uppercase text-muted/70">
              🎯 {title}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-text">🧪 {eyebrow}</h3>

            <ol className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
              {steps.slice(0, 6).map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10 text-[11px] text-text">
                    {i + 1}
                  </span>
                  <span className="text-pretty">{s.text}</span>
                </li>
              ))}
            </ol>

            {note ? (
              <p className="mt-4 text-xs text-muted/80">
                <span className="text-text/80">Tip:</span> {note}
              </p>
            ) : null}
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />
      </div>
    </section>
  )
}
