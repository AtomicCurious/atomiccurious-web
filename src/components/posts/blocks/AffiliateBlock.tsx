type Item = {
  name: string
  href: string
  tag?: string
  cta?: string
}

type Locale = "es" | "en"

type Props = {
  items: Item[]
  locale?: Locale
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

export function AffiliateBlock({ items, locale = "es" }: Props) {
  if (!items || items.length === 0) return null

  const t = copy[locale]

  return (
    <section className="mx-auto mt-16 w-full max-w-5xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          {t.label}
        </p>
        <span className="hidden h-px flex-1 bg-white/10 sm:block" />
      </div>

      <div
        className="
          rounded-2xl border border-white/10
          bg-[linear-gradient(135deg,color-mix(in_srgb,rgb(var(--accent))_6%,#0b1f14_94%)_0%,#0b1f14_70%)]
          p-6 shadow-[0_18px_60px_rgba(0,0,0,0.3)]
        "
      >
        <h3 className="text-xl font-semibold text-text">{t.title}</h3>

        <div
          className={`mt-6 grid gap-4 ${
            items.length === 3
              ? "sm:grid-cols-3"
              : items.length === 1
              ? "sm:grid-cols-1"
              : "sm:grid-cols-2"
          }`}
        >
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group rounded-xl border border-white/10 bg-white/[0.025]
                p-4 transition
                hover:border-[rgba(var(--accent),0.35)]
                hover:bg-[rgba(var(--accent),0.06)]
              "
            >
              {item.tag && (
                <p className="text-xs text-white/45">{item.tag}</p>
              )}

              <p className="mt-1 font-semibold text-text group-hover:text-[rgb(var(--accent))]">
                {item.name}
              </p>

              <p className="mt-2 text-xs text-white/45">
                {item.cta ?? t.cta}
              </p>
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/40">{t.disclaimer}</p>
      </div>
    </section>
  )
}