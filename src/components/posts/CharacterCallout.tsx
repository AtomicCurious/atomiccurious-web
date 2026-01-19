type Tone = "quote" | "insight" | "warning" | "note"

const toneMeta: Record<
  Tone,
  { title: string; accent: string }
> = {
  quote: {
    title: "dice",
    accent: "text-accent",
  },
  insight: {
    title: "insight",
    accent: "text-teal-400",
  },
  warning: {
    title: "warning",
    accent: "text-amber-400",
  },
  note: {
    title: "note",
    accent: "text-muted",
  },
}

type Props = {
  host: "atom" | "iris" | "core"
  tone?: Tone
  children: React.ReactNode
}

export default function CharacterCallout({
  host,
  tone = "note",
  children,
}: Props) {
  const meta = toneMeta[tone] ?? toneMeta.note

  const fallback = `${host.toUpperCase()} ${meta.title}:`

  return (
    <aside className="my-7 rounded-2xl border border-border bg-surface-1 p-5 shadow-soft">
      <div className="mb-2 text-xs font-semibold tracking-wide text-muted">
        <span className={meta.accent}>{fallback}</span>
      </div>

      <div className="text-sm leading-relaxed text-text">
        {children}
      </div>
    </aside>
  )
}
