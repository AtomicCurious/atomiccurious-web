"use client"

import React from "react"
import Link from "next/link"

type Status = "idle" | "loading" | "success" | "already" | "error"

export default function NewsletterSignupEs() {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<Status>("idle")
  const [message, setMessage] = React.useState("")
  const [company, setCompany] = React.useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === "loading") return

    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, company, locale: "es" }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        setStatus("error")
        setMessage(
          data?.detail
            ? `No pudimos enviar el correo de confirmación. (${data.detail})`
            : "No pudimos enviar el correo de confirmación."
        )
        return
      }

      if (data?.alreadySubscribed) {
        setStatus("already")
        setMessage("Ya estás suscrito.")
        return
      }

      setStatus("success")
      setMessage("Revisa tu bandeja para confirmar tu suscripción.")
      setEmail("")
      setCompany("")
    } catch {
      setStatus("error")
      setMessage("No pudimos enviar el correo de confirmación.")
    }
  }

  const disabled = status === "loading"

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border/70 bg-bg/25 p-4 shadow-soft backdrop-blur"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <label className="sr-only" htmlFor="newsletter-email-es">
            Email
          </label>
          <input
            id="newsletter-email-es"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full rounded-xl border border-border bg-bg/40 px-4 py-3
              text-sm text-text outline-none
              placeholder:text-muted
              focus:border-accent/50 focus:ring-2 focus:ring-accent/40
            "
            required
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="
            inline-flex items-center justify-center rounded-xl
            bg-accent px-5 py-3 text-sm font-semibold text-bg
            shadow-accent transition hover:brightness-110
            disabled:cursor-not-allowed disabled:opacity-70
          "
        >
          {status === "loading" ? "Enviando..." : "Unirme"}
        </button>
      </div>

      {/* Honeypot (oculto) */}
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company-es">Empresa</label>
        <input
          id="company-es"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-muted">Nada de spam. Solo la señal. (Cada 15 días)</p>

        <Link href="/es/privacy" className="text-xs font-semibold text-text hover:text-accent">
          Privacidad
        </Link>
      </div>

      {message ? (
        <p className={["mt-3 text-sm", status === "error" ? "text-red-400" : "text-muted"].join(" ")}>
          {message}
        </p>
      ) : null}
    </form>
  )
}