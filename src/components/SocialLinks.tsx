//src\components\SocialLinks.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

type Social = {
  label: "YouTube" | "TikTok" | "Instagram" | "Facebook"
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
    case "Facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
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
  const pathname = usePathname()
  const isEs = pathname === "/es" || pathname.startsWith("/es/")
  const t = useMemo(() => {
    return isEs
      ? {
          socials: "Redes",
          open: "Abrir redes sociales",
          panelTitle: "Redes sociales",
          close: "Cerrar",
          hint: "Abre tu red favorita en una nueva pestaña.",
          defaultTitle: "Sigue el universo",
        }
      : {
          socials: "Socials",
          open: "Open social links",
          panelTitle: "Social links",
          close: "Close",
          hint: "Opens your favorite network in a new tab.",
          defaultTitle: "Follow the universe",
        }
  }, [isEs])

  const hoverColorByLabel: Record<Social["label"], string> = useMemo(
    () => ({
      YouTube: "group-hover:text-red-500 group-hover:border-red-500/30",
      TikTok: "group-hover:text-cyan-400 group-hover:border-cyan-400/30",
      Instagram: "group-hover:text-pink-400 group-hover:border-pink-400/30",
      Facebook: "group-hover:text-blue-500 group-hover:border-blue-500/30",
    }),
    []
  )

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  // ✅ FOOTER MODE: mobile = menú, desktop = chips
  if (variant === "footer") {
    const displayTitle = title?.trim() ? title.trim() : t.defaultTitle

    return (
      <div className="flex min-w-0 items-center gap-3 -ml-35">
        {/* Title (siempre 1 sola vez) */}
        <span className="shrink-0 text-[11px] font-semibold tracking-wide text-muted">
          {displayTitle}
        </span>

        {/* Desktop chips */}
        <div className="hidden items-center gap-2 md:flex">
          {items.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
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

        {/* Mobile trigger: NO repite title */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={[
            "md:hidden",
            "shrink-0 inline-flex items-center gap-2 rounded-full",
            "border border-border/80 bg-surface-1/40",
            "px-3 py-1.5 text-[11px] font-semibold text-text/90",
            "shadow-soft transition hover:bg-surface-2/60",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          ].join(" ")}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={t.open}
        >
          <span className="text-text">{t.socials}</span>
          <span className="ml-1 text-muted">▾</span>
        </button>

        {/* Drawer */}
        {open ? (
          <div className="fixed inset-0 z-[90] md:hidden">
            <button
              type="button"
              aria-label={t.close}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            />

            <div
              role="dialog"
              aria-modal="true"
              className="
                absolute right-0 top-0 h-full w-[88%] max-w-[360px]
                border-l border-border/70 bg-bg
                shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_rgba(0,0,0,0.75)]
              "
            >
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                <div className="text-sm font-semibold tracking-tight text-text">
                  {t.panelTitle}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    inline-flex items-center justify-center rounded-full
                    border border-border/80 bg-surface-1
                    px-3 py-1.5 text-xs font-semibold text-text
                    shadow-soft transition hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                  aria-label={t.close}
                >
                  {t.close} <span className="ml-2 text-muted">✕</span>
                </button>
              </div>

              <div className="relative px-5 py-5">
                <div className="pointer-events-none absolute -top-24 right-[-120px] h-64 w-64 rounded-full bg-[rgba(34,211,238,0.12)] blur-[90px]" />
                <div className="pointer-events-none absolute bottom-[-140px] right-[-120px] h-72 w-72 rounded-full bg-[rgba(255,77,157,0.10)] blur-[110px]" />

                <div className="space-y-2">
                  {items.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className={[
                        "group flex items-center justify-between rounded-2xl border px-4 py-3",
                        "bg-surface-1/55 backdrop-blur-xl shadow-soft transition",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                        "border-border/70 text-muted hover:text-text hover:border-accent/25 hover:bg-surface-2",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl border border-border/70 bg-bg/35">
                          <SocialIcon name={s.label} className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold">{s.label}</span>
                      </span>
                      <span className="text-muted transition-transform group-hover:translate-x-0.5">
                        ›
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 h-px w-full bg-border/70" />
                <div className="mt-5 text-[11px] text-muted">{t.hint}</div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-bg" />
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  // ✅ DEFAULT MODE (sin cambios visuales fuertes)
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
            rel="noopener noreferrer"
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
