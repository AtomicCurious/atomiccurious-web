"use client"

type Currency = {
  code: string
  label: string
  symbol: string
  flag: string
}

const CURRENCIES: Currency[] = [
  { code: "usd", label: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "mxn", label: "MXN", symbol: "$", flag: "🇲🇽" },
  { code: "eur", label: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "gbp", label: "GBP", symbol: "£", flag: "🇬🇧" },
]

type Props = {
  value: string
  onChange: (currency: string) => void
  locale?: "es" | "en"
}

export default function CurrencySelector({
  value,
  onChange,
  locale = "en",
}: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {locale === "es" ? "Moneda" : "Currency"}
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {CURRENCIES.map((c) => {
          const active = value === c.code

          return (
            <button
              key={c.code}
              type="button"
              onClick={() => onChange(c.code)}
              className={`
                inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5
                text-[12px] font-semibold transition-all duration-200
                ${
                  active
                    ? "border-[rgba(255,120,150,0.5)] bg-[rgba(255,120,150,0.18)] text-[#ffd7e1]"
                    : "border-white/10 bg-[rgba(255,255,255,0.03)] text-muted hover:border-white/20 hover:text-text"
                }
              `}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}