"use client"

import { useMemo, useState } from "react"

const EMAIL_TO = "hello@atomiccurious.com"

export default function ContactFormEn() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("Collaboration")
  const [message, setMessage] = useState("")

  const disabled = !name.trim() || !email.trim() || !message.trim()

  const mailtoHref = useMemo(() => {
    const fullSubject = `[AtomicCurious] ${subject}`
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Subject: ${subject}\n\n` +
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
          Send a message
        </h2>
        <p className="mt-1 text-sm text-muted">
          This opens your email app with the message pre-filled.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-text">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl border border-border/80 bg-bg px-4 text-sm text-text outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
            placeholder="Your name"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-text">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl border border-border/80 bg-bg px-4 text-sm text-text outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-text">Subject</span>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-11 rounded-xl border border-border/80 bg-bg px-4 text-sm text-text outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
          >
            <option>Collaboration</option>
            <option>Feedback</option>
            <option>Press</option>
            <option>Support</option>
            <option>Other</option>
          </select>
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-text">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[140px] rounded-xl border border-border/80 bg-bg px-4 py-3 text-sm text-text outline-none transition focus:border-accent/45 focus:ring-2 focus:ring-accent/25"
            placeholder="Write your message…"
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
          Open email
        </a>

        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(EMAIL_TO)}
          className="inline-flex items-center justify-center rounded-full border border-border/80 bg-bg px-5 py-2 text-sm font-semibold text-text shadow-soft transition hover:border-accent/35 hover:bg-surface-2"
        >
          Copy email
        </button>

        <span className="text-xs text-muted">
          We’ll reply as soon as we can.
        </span>
      </div>
    </div>
  )
}

