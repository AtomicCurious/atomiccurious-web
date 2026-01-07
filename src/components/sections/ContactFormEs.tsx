"use client"

import { useMemo, useState } from "react"

const EMAIL_TO = "hello@atomiccurious.com"

export default function ContactFormEs() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("Colaboración")
  const [message, setMessage] = useState("")

  const disabled = !name.trim() || !email.trim() || !message.trim()

  const mailtoHref = useMemo(() => {
    const fullSubject = `[AtomicCurious] ${subject}`
    const body =
      `Nombre: ${name}\n` +
      `Correo: ${email}\n` +
      `Asunto: ${subject}\n\n` +
      `${message}`

    const params = new URLSearchParams({
      subject: fullSubject,
      body,
    })

    return `mailto:${EMAIL_TO}?${params.toString()}`
  }, [name, email, subject, message])

  return (
    <div className="rounded-2xl border border-border/70 bg-surface-1 p-6 shadow-soft sm:p-8">
      <header className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-text">
          Enviar mensaje
        </h2>
        <p className="mt-1 text-sm text-muted">
          Esto abre tu aplicación de correo con el mensaje prellenado.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-text">Nombre</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl border border-border/80 bg-bg px-4 text-sm text-text outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
            placeholder="Tu nombre"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-text">Correo</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl border border-border/80 bg-bg px-4 text-sm text-text outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
            placeholder="tu@correo.com"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-text">Asunto</span>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-11 rounded-xl border border-border/80 bg-bg px-4 text-sm text-text outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
          >
            <option>Colaboración</option>
            <option>Feedback</option>
            <option>Prensa</option>
            <option>Soporte</option>
            <option>Otro</option>
          </select>
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-text">Mensaje</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[140px] rounded-xl border border-border/80 bg-bg px-4 py-3 text-sm text-text outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
            placeholder="Escribe tu mensaje…"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={mailtoHref}
          aria-disabled={disabled}
          onClick={(e) => {
            if (disabled) e.preventDefault()
          }}
          className={[
            "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold shadow-soft transition",
            "border border-border/80",
            disabled
              ? "cursor-not-allowed bg-bg text-muted opacity-70"
              : "bg-surface-2 text-text hover:border-accent/35 hover:bg-surface-1",
          ].join(" ")}
        >
          Abrir correo
        </a>

        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(EMAIL_TO)}
          className="inline-flex items-center justify-center rounded-full border border-border/80 bg-bg px-5 py-2 text-sm font-semibold text-text shadow-soft transition hover:border-accent/35 hover:bg-surface-2"
        >
          Copiar email
        </button>

        <span className="text-xs text-muted">
          Responderemos en cuanto podamos.
        </span>
      </div>
    </div>
  )
}
