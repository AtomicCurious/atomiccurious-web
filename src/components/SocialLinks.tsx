import Link from "next/link"

type Social = {
  label: "YouTube" | "TikTok" | "Instagram"
  href: string
}

function SocialIcon({
  name,
  className,
}: {
  name: Social["label"]
  className: string
}) {
  switch (name) {
    case "YouTube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.9 2.5 12 2.5 12 2.5h0s-4.9 0-8.2.4c-.5.1-1.5.1-2.4 1C.7 4.6.5 6.2.5 6.2S0 8.1 0 10v1.9c0 1.9.5 3.8.5 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8 .4 8 .4s4.9 0 8.2-.4c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.5-1.9.5-3.8V10c0-1.9-.5-3.8-.5-3.8ZM9.5 14.3V7.7l6.2 3.3-6.2 3.3Z" />
        </svg>
      )
    case "TikTok":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 8.1c-1.5 0-3-.5-4.1-1.4v7.1c0 3.5-2.9 6.2-6.4 6.2S4 17.3 4 13.8 6.9 7.6 10.4 7.6c.3 0 .7 0 1 .1v3.3c-.3-.1-.6-.2-1-.2-1.7 0-3.1 1.4-3.1 3s1.4 3 3.1 3 3.1-1.4 3.1-3V2.5h3.2c.2 1.8 1.6 3.2 3.3 3.4v2.2Z" />
        </svg>
      )
    case "Instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
        </svg>
      )
  }
}

export default function SocialLinks({
  title,
  items,
  variant = "default",
}: {
  title?: string
  items: Social[]
  variant?: "default" | "footer"
}) {
  const hoverColorByLabel: Record<Social["label"], string> = {
    YouTube: "group-hover:text-red-500 group-hover:border-red-500/30",
    TikTok: "group-hover:text-cyan-400 group-hover:border-cyan-400/30",
    Instagram: "group-hover:text-pink-400 group-hover:border-pink-400/30",
  }

  // ✅ FOOTER MODE (1 sola fila, súper compacto)
  if (variant === "footer") {
    return (
      <div className="flex items-center gap-3 whitespace-nowrap">
        {title ? (
          <span className="text-[11px] font-semibold tracking-wide text-muted whitespace-nowrap">
            {title}
          </span>
        ) : null}

        <div className="flex items-center gap-2 flex-nowrap">
          {items.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={[
                "group inline-flex items-center gap-2 whitespace-nowrap",
                "rounded-full border border-border/70",
                "bg-surface-1/40 px-2.5 py-1",
                "text-[11px] font-medium text-text/90 leading-none",
                "transition hover:bg-surface-2/60",
                hoverColorByLabel[s.label],
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              ].join(" ")}
            >
              <SocialIcon name={s.label} className="h-3.5 w-3.5" />
              <span>{s.label}</span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // ✅ DEFAULT MODE
  return (
    <div className="flex flex-col gap-3">
      {title ? (
        <p className="text-xs font-semibold tracking-wide text-muted">{title}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        {items.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className={[
              "group inline-flex items-center gap-2",
              "rounded-full border border-border/80",
              "bg-surface-1/55 px-3 py-1.5",
              "text-xs font-medium text-text/90",
              "shadow-soft backdrop-blur transition",
              "hover:bg-surface-2/70",
              hoverColorByLabel[s.label],
              "focus:outline-none focus-visible:ring-2",
              "focus-visible:ring-accent/55",
              "focus-visible:ring-offset-2",
              "focus-visible:ring-offset-bg",
            ].join(" ")}
          >
            <SocialIcon name={s.label} className="h-4 w-4" />
            <span>{s.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
