//app\es\(sections)\newsletter\_components\NewsletterSignupEs.tsx
"use client"

import React from "react"

type Status = "idle" | "loading" | "success" | "already" | "error"

const SIGNUP_CSS = `
html:not([data-character]) .ac-signup-input:focus,
body:not([data-character]) .ac-signup-input:focus,
html[data-character="atom"] .ac-signup-input:focus,
body[data-character="atom"] .ac-signup-input:focus {
  border-color: rgba(52, 211, 153, 0.50);
  box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.20);
}
html[data-character="iris"] .ac-signup-input:focus,
body[data-character="iris"] .ac-signup-input:focus {
  border-color: rgba(34, 211, 238, 0.50);
  box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.20);
}
html[data-character="core"] .ac-signup-input:focus,
body[data-character="core"] .ac-signup-input:focus {
  border-color: rgba(251, 146, 60, 0.50);
  box-shadow: 0 0 0 2px rgba(251, 146, 60, 0.20);
}

html:not([data-character]) .ac-signup-btn,
body:not([data-character]) .ac-signup-btn,
html[data-character="atom"] .ac-signup-btn,
body[data-character="atom"] .ac-signup-btn {
  background-color: rgb(52, 211, 153);
  color: rgb(2, 44, 26);
  box-shadow: 0 8px 24px -12px rgba(52, 211, 153, 0.45);
}
html[data-character="iris"] .ac-signup-btn,
body[data-character="iris"] .ac-signup-btn {
  background-color: rgb(34, 211, 238);
  color: rgb(2, 30, 44);
  box-shadow: 0 8px 24px -12px rgba(34, 211, 238, 0.45);
}
html[data-character="core"] .ac-signup-btn,
body[data-character="core"] .ac-signup-btn {
  background-color: rgb(251, 146, 60);
  color: rgb(44, 18, 2);
  box-shadow: 0 8px 24px -12px rgba(251, 146, 60, 0.45);
}

.ac-signup-btn {
  transition: filter 220ms ease, transform 220ms ease, box-shadow 220ms ease;
}
.ac-signup-btn:hover:not(:disabled) {
  filter: brightness(1.08);
  transform: translateY(-1px);
}
.ac-signup-btn:active:not(:disabled) {
  transform: translateY(0px);
  filter: brightness(0.97);
}
.ac-signup-btn:disabled {
  cursor: not-allowed;
  opacity: 0.70;
}
`

export default function NewsletterSignupEs() {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<Status>("idle")
  const [message, setMessage] = React.useState("")
  const [company, setCompany] = React.useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "loading") return

    const trimmedEmail = email.trim()
    const trimmedCompany = company.trim()

    if (!trimmedEmail) {
      setStatus("error")
      setMessage("Escribe un email válido para continuar.")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          company: trimmedCompany,
          locale: "es",
        }),
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
        setMessage(
          "Ya estás suscrito. Si no encuentras nuestros correos, revisa spam o promociones."
        )
        return
      }

      setStatus("success")
      setMessage(
        "Te enviamos un correo de confirmación. Revisa tu bandeja de entrada. Si no lo ves en unos minutos, revisa spam o promociones y mueve el correo a tu bandeja principal."
      )
      setEmail("")
      setCompany("")
    } catch {
      setStatus("error")
      setMessage("No pudimos enviar el correo de confirmación.")
    }
  }

  const disabled = status === "loading" || !email.trim()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SIGNUP_CSS }} />

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
              placeholder="Tu email, tu acceso"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ac-signup-input w-full rounded-xl border border-border bg-bg/40 px-4 py-3 text-sm text-text outline-none placeholder:text-muted"
              required
            />
          </div>

          <button
            type="submit"
            disabled={disabled}
            className="ac-signup-btn inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold"
          >
            {status === "loading" ? "Enviando..." : "Suscribirme"}
          </button>
        </div>

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

        {message ? (
          <p
            className={[
              "mt-3 text-sm leading-6",
              status === "error" ? "text-red-400" : "text-muted",
            ].join(" ")}
          >
            {message}
          </p>
        ) : null}
      </form>
    </>
  )
}