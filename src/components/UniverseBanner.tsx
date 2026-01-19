// src/components/UniverseBanner.tsx
import type { ReactNode } from "react"

type Who = "atom" | "iris" | "core"

function HostIcon({ who }: { who: Who }) {
  if (who === "atom") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3c3.5 0 7 3.6 7 9s-3.5 9-7 9-7-3.6-7-9 3.5-9 7-9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.9"
        />
        <path
          d="M5.5 8.2c2.4-1.6 6.8-1.6 9.2 0M5.5 15.8c2.4 1.6 6.8 1.6 9.2 0"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.7"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (who === "iris") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2l1.2 4.3 4.1-1.8-1.8 4.1L20 10.8l-4.3 1.2 1.8 4.1-4.1-1.8L12 22l-1.2-4.3-4.1 1.8 1.8-4.1L4 10.8l4.3-1.2-1.8-4.1 4.1 1.8L12 2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>
    )
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 19c4.4 0 8-3 8-6.7 0-3.7-3.6-6.6-8-6.6s-8 3-8 6.6C4 16 7.6 19 12 19Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
      <path
        d="M9 20.5c.7 1.1 1.8 1.5 3 1.5 1.2 0 2.3-.4 3-1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HostBadge({
  who,
  title,
  subtitle,
  className,
}: {
  who: Who
  title: string
  subtitle: string
  className?: string
}) {
  return (
    <div
      className={[
        "ac-ch",
        className ?? "",
        "relative overflow-hidden rounded-[22px] border border-border/70",
        "bg-surface-1/55 backdrop-blur-xl shadow-soft",
        "px-5 py-4",
        "transition hover:border-accent/25",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "inline-flex h-9 w-9 items-center justify-center rounded-xl",
            "border border-border/70 bg-bg/35 text-text/90",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
          ].join(" ")}
        >
          <HostIcon who={who} />
        </span>

        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight text-text">{title}</div>
          <div className="mt-0.5 text-[13px] leading-relaxed text-muted">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

/**
 * UniverseBanner
 * - NO decide mode. Solo renderiza las 3 tarjetas.
 * - Tu global.css decide qué se ve según:
 *   body[data-chmode="host|trio|none"] + body[data-character="..."]
 *
 * Úsalo en páginas “infra” (Resources/Community/About si aplica).
 */
export default function UniverseBanner({
  label = "ATOMICCURIOUS TEAM",
  className = "",
  before,
  after,
}: {
  label?: string
  className?: string
  before?: ReactNode
  after?: ReactNode
}) {
  return (
    <section className={["mx-auto w-full max-w-5xl px-6", className].join(" ")}>
      <div className="flex flex-col items-center gap-3 text-center">
        {before}

        <div className="text-[11px] font-semibold tracking-[0.18em] text-muted/75">{label}</div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          <HostBadge
            who="atom"
            title="Atom"
            subtitle="Curiosity + first principles."
            className="ac-ch-atom"
          />
          <HostBadge
            who="iris"
            title="Iris"
            subtitle="Clarity, patterns, and ranking logic."
            className="ac-ch-iris"
          />
          <HostBadge
            who="core"
            title="Core"
            subtitle="Playful learning, quizzes, and sparks."
            className="ac-ch-core"
          />
        </div>

        {after}
      </div>
    </section>
  )
}
