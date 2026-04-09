"use client"

import { useState } from "react"

type Props = {
  amount?: number
  locale?: "es" | "en"
  className?: string
  label?: string
}

export default function SupportButtonStripe({
  amount = 6,
  locale = "en",
  className = "",
  label,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const safeAmount = Number.isFinite(Number(amount)) && Number(amount) > 0
    ? Math.round(Number(amount) * 100) / 100
    : null

  const ui = {
    buttonText: label ?? (locale === "es" ? "Apoyar" : "Support"),
    loadingText: locale === "es" ? "Procesando..." : "Processing...",
    genericError:
      locale === "es"
        ? "Algo salió mal. Intenta de nuevo."
        : "Something went wrong. Try again.",
    invalidAmount:
      locale === "es"
        ? "El monto no es válido."
        : "The amount is not valid.",
  }

  async function handleDonate() {
    if (safeAmount === null) {
      setError(ui.invalidAmount)
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
          amount: safeAmount,
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
      console.error("SupportButtonStripe error:", err)
      setError(ui.genericError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={["flex w-full flex-col items-center gap-2", className].join(" ")}>
      <button
        type="button"
        onClick={handleDonate}
        disabled={loading}
        className={`
          inline-flex w-full max-w-[220px] items-center justify-center rounded-full
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
          ui.loadingText
        ) : (
          <>
            <span className="mr-2 text-[#ff7a9a]">♥</span>
            {ui.buttonText}
          </>
        )}
      </button>

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