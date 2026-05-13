type Host = "atom" | "iris" | "core"

type Item = {
  name: string
  href: string
  tag?: string
  cta?: string
  description?: string
}

type Locale = "es" | "en"

type Props = {
  items: Item[]
  locale?: Locale
  host?: Host
}

const copy = {
  es: {
    label: "Recursos",
    title: "Recursos recomendados",
    cta: "Ver en Amazon →",
    disclaimer:
      "Algunos enlaces son afiliados. Podemos recibir una comisión sin costo adicional para ti.",
  },

  en: {
    label: "Resources",
    title: "Recommended resources",
    cta: "View on Amazon →",
    disclaimer:
      "Some links are affiliate links. We may earn a commission at no extra cost to you.",
  },
}

const affiliateVisualByHost: Record<
  Host,
  {
    shell: string
    panel: string
    card: string
    label: string
    title: string
    tag: string
    itemTitle: string
    itemDescription: string
    itemCta: string
    disclaimer: string
  }
> = {
  atom: {
    shell:
      "rounded-[28px] border-[rgba(var(--accent),0.14)] bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_10%,#071510_90%)_0%,color-mix(in_srgb,rgb(var(--accent))_5%,#040806_95%)_68%,rgba(255,255,255,0.015)_100%)]",
    panel:
      "bg-[radial-gradient(circle_at_12%_18%,rgba(var(--accent),0.16),transparent_34%)]",
    card:
      "rounded-xl border-[rgba(var(--accent),0.12)] bg-[rgba(var(--accent),0.03)] p-4 hover:border-[rgba(var(--accent),0.30)] hover:bg-[rgba(var(--accent),0.055)]",
    label: "tracking-[0.18em]",
    title: "text-xl font-semibold",
    tag: "text-white/45",
    itemTitle: "font-semibold group-hover:text-[rgb(var(--accent))]",
    itemDescription: "text-white/48 leading-6",
    itemCta: "text-[rgb(var(--accent))]/72",
    disclaimer: "text-white/40",
  },

  iris: {
    shell:
      "rounded-[30px] border-[rgba(var(--accent),0.12)] bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_10%,#08131d_90%)_0%,color-mix(in_srgb,rgb(var(--accent))_5%,#050811_95%)_68%,rgba(255,255,255,0.015)_100%)]",
    panel:
      "bg-[radial-gradient(circle_at_12%_18%,rgba(var(--accent),0.16),transparent_34%)]",
    card:
      "rounded-[22px] border-[rgba(var(--accent),0.10)] bg-[rgba(var(--accent),0.025)] px-5 py-5 hover:border-[rgba(var(--accent),0.20)] hover:bg-[rgba(var(--accent),0.05)]",
    label: "tracking-[0.24em] text-[rgb(var(--accent))]/82",
    title: "text-[1.45rem] font-medium tracking-[-0.03em]",
    tag: "tracking-[0.18em] text-white/38",
    itemTitle:
      "text-[1.02rem] font-medium leading-[1.6] group-hover:text-[rgb(var(--accent))]",
    itemDescription: "text-[0.86rem] leading-6 text-white/48",
    itemCta: "tracking-[0.08em] text-[rgb(var(--accent))]/78",
    disclaimer: "leading-6 text-white/34",
  },

  core: {
    shell:
      "rounded-[30px] border-[rgba(var(--accent),0.15)] bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_10%,#1a1206_90%)_0%,color-mix(in_srgb,rgb(var(--accent))_5%,#0d0904_95%)_68%,rgba(255,255,255,0.015)_100%)]",
    panel:
      "bg-[radial-gradient(circle_at_12%_18%,rgba(var(--accent),0.17),transparent_34%)]",
    card:
      "rounded-[18px] border-[rgba(var(--accent),0.13)] bg-[rgba(var(--accent),0.035)] p-4 hover:border-[rgba(var(--accent),0.30)] hover:bg-[rgba(var(--accent),0.06)]",
    label: "tracking-[0.2em]",
    title: "text-xl font-semibold",
    tag: "text-white/45",
    itemTitle: "font-semibold group-hover:text-[rgb(var(--accent))]",
    itemDescription: "text-white/48 leading-6",
    itemCta: "text-[rgb(var(--accent))]/76",
    disclaimer: "text-white/40",
  },
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export function AffiliateBlock({
  items,
  locale = "es",
  host = "atom",
}: Props) {
  if (!items || items.length === 0) return null

  const t = copy[locale]
  const visual = affiliateVisualByHost[host]

  return (
    <section
      className="mx-auto mt-16 w-full max-w-5xl"
      data-post-block="affiliate"
      data-host={host}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <p
          className={cn(
            "text-xs font-semibold uppercase text-[rgb(var(--accent))]",
            visual.label
          )}
        >
          {t.label}
        </p>

        <span className="hidden h-px flex-1 bg-[rgba(var(--accent),0.16)] sm:block" />
      </div>

      <div
        className={cn(
          "overflow-hidden border shadow-[0_18px_60px_rgba(0,0,0,0.3)]",
          visual.shell
        )}
      >
        <div className="relative p-6 sm:p-7">
          <div
            aria-hidden="true"
            className={cn("pointer-events-none absolute inset-0", visual.panel)}
          />

          <div className="relative">
            <h3 className={cn("text-text", visual.title)}>{t.title}</h3>

            <div
              className={cn(
                "mt-6 grid gap-4",
                items.length === 3
                  ? "sm:grid-cols-3"
                  : items.length === 1
                    ? "sm:grid-cols-1"
                    : "sm:grid-cols-2"
              )}
            >
              {items.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex flex-col border transition",
                    visual.card
                  )}
                >
                  {item.tag && (
                    <p className={cn("text-xs uppercase", visual.tag)}>
                      {item.tag}
                    </p>
                  )}

                  <p className={cn("mt-2 text-text transition", visual.itemTitle)}>
                    {item.name}
                  </p>

                  {item.description && (
                    <p className={cn("mt-3", visual.itemDescription)}>
                      {item.description}
                    </p>
                  )}

                  <p className={cn(item.description ? "mt-auto pt-5 text-xs" : "mt-4 text-xs", visual.itemCta)}>
                    {item.cta ?? t.cta}
                  </p>
                </a>
              ))}
            </div>

            <p className={cn("mt-6 text-xs", visual.disclaimer)}>
              {t.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}