"use client"

import { KeyboardEvent, useMemo, useState } from "react"

type Props = {
  locale?: "es" | "en"
  className?: string
  minAmount?: number
}

const MAX_AMOUNT = 1000

function CustomAmountIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[15px] w-[15px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v18" />
      <path d="M8.5 7.5c0-1.7 1.57-3 3.5-3s3.5 1.3 3.5 3-1.57 3-3.5 3-3.5 1.3-3.5 3 1.57 3 3.5 3 3.5-1.3 3.5-3" />
    </svg>
  )
}

export default function SupportCustomAmount({
  locale = "en",
  className = "",
  minAmount = 1,
}: Props) {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ui = useMemo(() => {
    return locale === "es"
      ? {
          badge: "FLEXIBLE",
          eyebrow: "Monto libre",
          description: "Elige la cantidad que te haga sentido.",
          placeholder: "Ej. 9",
          button: "Apoyar",
          loading: "Procesando...",
          invalid: `Ingresa un monto válido de al menos $${minAmount} USD.`,
          tooHigh: `El monto máximo permitido es $${MAX_AMOUNT} USD.`,
          genericError: "Algo salió mal. Intenta de nuevo.",
        }
      : {
          badge: "FLEXIBLE",
          eyebrow: "Custom amount",
          description: "Choose the amount that feels right to you.",
          placeholder: "e.g. 9",
          button: "Support",
          loading: "Processing...",
          invalid: `Enter a valid amount of at least $${minAmount} USD.`,
          tooHigh: `The maximum allowed amount is $${MAX_AMOUNT} USD.`,
          genericError: "Something went wrong. Try again.",
        }
  }, [locale, minAmount])

  const parsedAmount = useMemo(() => {
    const normalized = Number(amount)

    if (!Number.isFinite(normalized)) return null
    if (normalized < minAmount) return null
    if (normalized > MAX_AMOUNT) return null

    return Math.round(normalized * 100) / 100
  }, [amount, minAmount])

  async function handleDonate() {
    const numericAmount = Number(amount)

    if (!Number.isFinite(numericAmount) || numericAmount < minAmount) {
      setError(ui.invalid)
      return
    }

    if (numericAmount > MAX_AMOUNT) {
      setError(ui.tooHigh)
      return
    }

    if (parsedAmount === null) {
      setError(ui.invalid)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const res = await fetch("/api/stripe/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parsedAmount,
          locale,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.error || ui.genericError)
        return
      }

      if (!data?.url) {
        setError(ui.genericError)
        return
      }

      window.location.href = data.url
    } catch (err) {
      console.error("SupportCustomAmount error:", err)
      setError(ui.genericError)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      void handleDonate()
    }
  }

  return (
    <div
      className={[
        `
        relative flex h-full flex-col items-center gap-4 rounded-[24px]
        border border-white/10 bg-[rgba(255,255,255,0.02)]
        px-5 py-6 text-center transition-all
        `,
        className,
      ].join(" ")}
    >
      <span
        className="
          absolute -top-3 inline-flex items-center rounded-full border
          border-[rgba(255,120,150,0.24)] bg-[rgba(255,120,150,0.12)]
          px-3 py-1 text-[10px] font-semibold tracking-[0.18em]
          text-[rgba(255,220,230,0.92)]
        "
      >
        {ui.badge}
      </span>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {ui.eyebrow}
        </p>

        <p className="text-xs leading-6 text-muted">
          {ui.description}
        </p>
      </div>

      <div className="w-full max-w-[220px]">
        <label className="sr-only" htmlFor={`support-custom-${locale}`}>
          {ui.eyebrow}
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">
            $
          </span>

          <input
            id={`support-custom-${locale}`}
            type="number"
            min={minAmount}
            max={MAX_AMOUNT}
            step="0.01"
            inputMode="decimal"
            disabled={loading}
            value={amount}
            onChange={(e) => {
              const value = e.target.value

              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(value)
                if (error) setError(null)
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={ui.placeholder}
            className="
              h-11 w-full rounded-full border border-white/10
              bg-[rgba(255,255,255,0.03)] pl-8 pr-4 text-center
              text-sm font-medium text-text outline-none transition
              placeholder:text-muted/70
              [appearance:textfield]
              focus:border-[rgba(255,120,150,0.35)]
              focus:bg-[rgba(255,255,255,0.05)]
              disabled:cursor-not-allowed disabled:opacity-60
              [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none
            "
          />
        </div>
      </div>

      <div className="mt-auto w-full max-w-[220px] pt-1">
        <button
          type="button"
          onClick={handleDonate}
          disabled={loading}
          className={`
            inline-flex w-full items-center justify-center rounded-full
            border px-5 py-2.5 text-[14px] font-semibold
            transition-all duration-200
            ${loading ? "cursor-not-allowed opacity-60" : "hover:scale-[1.02]"}
          `}
          style={{
            borderColor: "rgba(255, 120, 150, 0.45)",
            background: "rgba(255, 120, 150, 0.14)",
            color: "#ffd7e1",
            boxShadow:
              "0 0 0 1px rgba(255,120,150,0.05), 0 10px 28px rgba(255,120,150,0.10)",
          }}
        >
          {loading ? (
            ui.loading
          ) : (
            <>
              <span className="mr-2 inline-flex items-center justify-center text-[#ff7a9a]">
                <CustomAmountIcon />
              </span>
              {ui.button}
            </>
          )}
        </button>
      </div>

      <div className="min-h-[20px]">
        {error ? (
          <p className="text-center text-[12px] leading-5 text-red-400">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  )
}