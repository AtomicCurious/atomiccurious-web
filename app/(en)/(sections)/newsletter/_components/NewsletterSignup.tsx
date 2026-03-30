"use client"

import React from "react"

type Status = "idle" | "loading" | "success" | "already" | "error"

export default function NewsletterSignup() {
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
        body: JSON.stringify({ email, company, locale: "en" }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        setStatus("error")
        setMessage(
          data?.detail
            ? `We couldn't send the confirmation email. (${data.detail})`
            : "We couldn't send the confirmation email."
        )
        return
      }

      if (data?.alreadySubscribed) {
        setStatus("already")
        setMessage("You’re already subscribed.")
        return
      }

      setStatus("success")
      setMessage("Check your inbox to confirm your subscription.")
      setEmail("")
      setCompany("")
    } catch {
      setStatus("error")
      setMessage("We couldn't send the confirmation email.")
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
          <label className="sr-only" htmlFor="newsletter-email">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Your email, your access"
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
          {status === "loading" ? "Sending..." : "Join"}
        </button>
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {message ? (
        <p className={["mt-3 text-sm", status === "error" ? "text-red-400" : "text-muted"].join(" ")}>
          {message}
        </p>
      ) : null}
    </form>
  )
}