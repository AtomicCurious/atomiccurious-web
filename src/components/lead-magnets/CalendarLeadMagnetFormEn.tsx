// src/components/lead-magnets/CalendarLeadMagnetFormEn.tsx
"use client"

import { useMemo, useState } from "react"

type Variant = "standard" | "print"
type Status = "idle" | "loading" | "success" | "error" | "invalid"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export default function CalendarLeadMagnetFormEn() {
  const [variant, setVariant] = useState<Variant>("standard")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("") // honeypot
  const [status, setStatus] = useState<Status>("idle")

  const canSubmit = useMemo(() => status !== "loading" && status !== "success", [status])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    const clean = email.trim().toLowerCase()
    if (!isValidEmail(clean)) {
      setStatus("invalid")
      return
    }

    setStatus("loading")

    try {
      const res = await fetch("/api/lead-magnet/calendar-en", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: clean, variant, company }),
      })

      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const title =
    variant === "standard" ? "Standard — Best for screens" : "Print — Ready to print"
  const subtitle =
    variant === "standard"
      ? "Lightweight for phone/tablet."
      : "High quality, print-friendly margins."

  // Mirrors ES: 3-page preview strip
  const previews = [
    {
      src: "/images/lead-magnets/calendar-2026-en-cover.webp",
      label: "Cover",
      caption: "Science Calendar 2026",
    },
    {
      src: "/images/lead-magnets/calendar-2026-en-intro.webp",
      label: "Intro",
      caption: "How to use this calendar",
    },
    {
      src: "/images/lead-magnets/calendar-2026-en-january.webp",
      label: "Sample",
      caption: "January 2026",
    },
  ]

  return (
    <section className="w-full max-w-none">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* ONE glass panel (single card) */}
        <div className="rounded-3xl bg-bg/10 p-5 shadow-soft backdrop-blur-xl ring-1 ring-white/10 sm:p-6">
          {/* Header */}
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-bg/20 px-3 py-1 text-[11px] font-semibold text-text/80 ring-1 ring-white/10">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              FREE DOWNLOAD
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
              Download the calendar
            </h2>
          </div>

          {/* Body */}
          <div className="mt-5 grid items-start grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            {/* LEFT */}
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-text">{title}</p>
                  <p className="mt-0.5 text-sm text-text/70">{subtitle}</p>
                </div>

                <div className="rounded-full bg-bg/20 px-3 py-1 text-xs font-semibold text-text/80 ring-1 ring-white/10">
                  2026
                </div>
              </div>

              {/* 3-up portrait previews (no heavy inner cards) */}
              <div className="mt-4">
                <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {previews.map((p) => (
                    <figure key={p.src} className="shrink-0">
                      <div className="w-[145px] sm:w-[160px]">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-bg/15 ring-1 ring-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.src}
                            alt={`${p.label} · ${p.caption}`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              ;(e.currentTarget as HTMLImageElement).style.display = "none"
                            }}
                          />
                        </div>

                        <figcaption className="mt-1.5">
                          <p className="text-xs font-semibold text-text/85">{p.label}</p>
                          <p className="text-xs text-text/60">{p.caption}</p>
                        </figcaption>
                      </div>
                    </figure>
                  ))}
                </div>

                <p className="mt-1.5 text-xs text-text/60">
                  Preview (3 pages). {variant === "print" ? "Print version." : "Screen version."}
                </p>
              </div>

              <div className="my-4 h-px w-full bg-white/10" />

              {/* Specs (single line, Apple-ish) */}
              <div className="rounded-2xl bg-bg/10 p-3.5 ring-1 ring-white/10">
                <p className="text-xs font-semibold text-text/70">SPECS</p>
                <p className="mt-2 text-sm text-text/85 leading-relaxed">
                  Vertical format optimized for phone & tablet • 12 months plus cover with space for
                  notes • Available in Screen and Print versions • Delivered via a direct link sent
                  by email
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-bg/10 p-5 ring-1 ring-white/10">
              {/* honeypot */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-text">Version</p>
                <p className="text-xs text-text/60">2 options</p>
              </div>

              {/* Segmented control (mirrors ES) */}
              <div className="mt-2 inline-flex w-full rounded-2xl bg-bg/15 p-1 ring-1 ring-white/10">
                <button
                  type="button"
                  onClick={() => setVariant("standard")}
                  className={cx(
                    "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                    variant === "standard"
                      ? "bg-bg/30 text-text ring-1 ring-white/10"
                      : "text-text/70 hover:text-text"
                  )}
                >
                  Screen
                </button>

                <button
                  type="button"
                  onClick={() => setVariant("print")}
                  className={cx(
                    "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                    variant === "print"
                      ? "bg-bg/30 text-text ring-1 ring-white/10"
                      : "text-text/70 hover:text-text"
                  )}
                >
                  Print
                </button>
              </div>

              <p className="mt-2 text-xs text-text/65">
                {variant === "standard"
                  ? "Recommended for phone/tablet. Lightweight file."
                  : "High quality with print-friendly margins."}
              </p>

              <div className="my-4 h-px w-full bg-white/10" />

              <label className="block text-sm font-semibold text-text" htmlFor="email">
                Your email
              </label>

              <div className="mt-2 flex flex-col gap-2.5">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status !== "idle") setStatus("idle")
                  }}
                  disabled={status === "loading" || status === "success"}
                  className="h-10 w-full rounded-xl bg-bg/20 px-3 text-sm text-text outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-accent/30"
                />

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="h-10 rounded-xl bg-accent px-5 text-sm font-semibold text-bg transition hover:opacity-95 disabled:opacity-50"
                >
                  {status === "loading" ? "Sending…" : status === "success" ? "Sent" : "Email me the link"}
                </button>
              </div>

              <div className="mt-2 min-h-[18px] text-sm" aria-live="polite">
                {status === "success" && (
                  <p className="text-text/85">Done. Check your inbox (and spam).</p>
                )}
                {status === "invalid" && (
                  <p className="text-red-500">That email doesn’t look valid.</p>
                )}
                {status === "error" && (
                  <p className="text-red-500">We couldn’t send the email.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
