// src/components/lead-magnets/CalendarLeadMagnetFormEs.tsx
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

export default function CalendarLeadMagnetFormEs() {
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
      const res = await fetch("/api/lead-magnet/calendar-es", {
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
    variant === "standard" ? "Estándar — Para ver en pantalla" : "Imprimir — Listo para impresión"
  const subtitle =
    variant === "standard" ? "Ligero y cómodo para móvil/tablet." : "Alta calidad, márgenes cuidados."

  const previews = [
    {
      src: "/images/lead-magnets/calendario-2026-es-portada.webp",
      label: "Portada",
      caption: "Calendario de Ciencia 2026",
    },
    {
      src: "/images/lead-magnets/calendario-2026-es-introduccion.webp",
      label: "Introducción",
      caption: "Cómo usar este calendario",
    },
    {
      src: "/images/lead-magnets/calendario-2026-es-enero.webp",
      label: "Ejemplo",
      caption: "Enero 2026",
    },
  ]

  return (
    <section className="w-full max-w-none">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-bg/10 p-4 shadow-soft backdrop-blur-xl ring-1 ring-white/10 sm:p-5">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-bg/20 px-3 py-1 text-[11px] font-semibold text-text/80 ring-1 ring-white/10">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              DESCARGA GRATIS
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
              Descarga el calendario
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-7">
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

              {/* Previews
                  - Mobile: horizontal scroll
                  - Desktop: grid (sin slider)
              */}
              <div className="mt-3">
                <div
                  className="
                    flex gap-3 overflow-x-auto pb-1
                    [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                    sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0
                  "
                >
                  {previews.map((p) => (
                    <figure key={p.src} className="shrink-0 sm:shrink">
                      <div className="w-[140px] sm:w-auto">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-bg/15 ring-1 ring-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.src}
                            alt={`${p.label} · ${p.caption}`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>

                        <figcaption className="mt-1.5">
                          <p className="text-xs font-semibold text-text/85 leading-tight">
                            {p.label}
                          </p>
                          <p className="text-xs text-text/60 leading-tight">{p.caption}</p>
                        </figcaption>
                      </div>
                    </figure>
                  ))}
                </div>

                <p className="mt-1.5 text-xs text-text/60">
                  Vista previa (3 páginas).{" "}
                  {variant === "print" ? "Versión impresión." : "Versión pantalla."}
                </p>
              </div>

              <div className="my-3.5 h-px w-full bg-white/10" />

              {/* Specs corridas */}
              <div className="rounded-2xl bg-bg/10 p-3 ring-1 ring-white/10">
                <p className="text-xs font-semibold text-text/70">ESPECIFICACIONES</p>
                <p className="mt-1.5 text-sm text-text/85 leading-relaxed">
                  Formato vertical optimizado para móvil y tablet • 12 meses más portada con espacio
                  para notas • Disponible en versión pantalla y versión impresión • Entrega mediante
                  enlace directo enviado por email
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl bg-bg/10 p-4 ring-1 ring-white/10 sm:p-5"
            >
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
                <p className="text-sm font-semibold text-text">Versión</p>
                <p className="text-xs text-text/60">2 opciones</p>
              </div>

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
                  Pantalla
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
                  Imprimir
                </button>
              </div>

              <p className="mt-2 text-xs text-text/65">
                {variant === "standard"
                  ? "Recomendado para móvil/tablet. Archivo ligero."
                  : "Calidad alta con márgenes listos para imprimir."}
              </p>

              <div className="my-3.5 h-px w-full bg-white/10" />

              <label className="block text-sm font-semibold text-text" htmlFor="email">
                Tu correo
              </label>

              <div className="mt-2 flex flex-col gap-2.5">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="hello@atomiccurious.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status !== "idle") setStatus("idle")
                  }}
                  disabled={status === "loading" || status === "success"}
                  className="h-10 w-full rounded-xl bg-bg/20 px-3 text-sm text-text outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-accent/30 disabled:opacity-70"
                />

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="h-10 rounded-xl bg-accent px-5 text-sm font-semibold text-bg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? "Enviando…" : status === "success" ? "Enviado" : "Recibir enlace"}
                </button>
              </div>

              <div className="mt-2 min-h-[18px] text-sm" aria-live="polite">
                {status === "success" && (
                  <p className="text-text/85">Listo. Revisa tu correo (Inbox / Promociones / Spam).</p>
                )}
                {status === "invalid" && <p className="text-red-500">Ese correo no se ve válido.</p>}
                {status === "error" && <p className="text-red-500">No pudimos enviar el correo.</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
