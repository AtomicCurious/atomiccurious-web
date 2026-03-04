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
  // =========================
  // LAYOUT DIALS (edit numbers)
  // =========================
  const L = {
    // Wider layout inside the component (so it can use more screen width)
    // Options: "max-w-6xl", "max-w-7xl", or custom "max-w-[1400px]"
    container: "max-w-7xl" as const,

    // Right panel width (px). Use 420–620.
    rightPxLg: 520,
    rightPxXl: 560,

    // Gap between columns on desktop (tailwind scale): 6..12
    gapLg: 8,

    // Push right card down on desktop (align with left previews card)
    rightOffsetLg: 12, // lg:mt-12

    // Cards padding: 4..6 (p-4 / p-5 / p-6)
    cardPad: 5,

    // Preview grid columns
    previewColsMobile: 2,
    previewColsSm: 3,
  }

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
    variant === "standard"
      ? "Ligero y cómodo para móvil/tablet."
      : "Alta calidad, márgenes cuidados."

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

  // Tailwind class mapping from numbers
  const gapClassLg: Record<number, string> = {
    6: "lg:gap-6",
    7: "lg:gap-7",
    8: "lg:gap-8",
    9: "lg:gap-9",
    10: "lg:gap-10",
    11: "lg:gap-11",
    12: "lg:gap-12",
  }

  const padClass: Record<number, string> = {
    4: "p-4",
    5: "p-5",
    6: "p-6",
  }

  const mtClassLg: Record<number, string> = {
    0: "lg:mt-0",
    6: "lg:mt-6",
    8: "lg:mt-8",
    10: "lg:mt-10",
    12: "lg:mt-12",
    14: "lg:mt-14",
    16: "lg:mt-16",
  }

  const gridTemplate =
    `lg:grid-cols-[minmax(0,1fr)_${L.rightPxLg}px] xl:grid-cols-[minmax(0,1fr)_${L.rightPxXl}px]`

  return (
    <section className={cx("w-full", "mx-auto", L.container)}>
      <div className={cx("grid grid-cols-1 items-start gap-6", gridTemplate, gapClassLg[L.gapLg])}>
        {/* LEFT */}
        <div className="min-w-0 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text">{title}</p>
            <p className="mt-0.5 text-sm text-text/70">{subtitle}</p>
          </div>

          {/* Previews card (NO slider) */}
          <div className={cx("rounded-3xl bg-bg/10 shadow-soft ring-1 ring-white/10", padClass[L.cardPad])}>
            <div
              className={cx(
                "grid gap-3",
                L.previewColsMobile === 2 ? "grid-cols-2" : "grid-cols-1",
                L.previewColsSm === 3 ? "sm:grid-cols-3 sm:gap-4" : "sm:grid-cols-2 sm:gap-4"
              )}
            >
              {previews.map((p) => (
                <figure key={p.src} className="min-w-0">
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

                  <figcaption className="mt-2">
                    <p className="text-xs font-semibold text-text/85">{p.label}</p>
                    <p className="text-xs text-text/60">{p.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-3 text-xs text-text/60">
              Vista previa (3 páginas). {variant === "print" ? "Versión impresión." : "Versión pantalla."}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <form
          onSubmit={onSubmit}
          noValidate
          className={cx(
            "rounded-3xl bg-bg/10 shadow-soft ring-1 ring-white/10 lg:sticky lg:top-24",
            padClass[L.cardPad],
            mtClassLg[L.rightOffsetLg]
          )}
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

          <div className="my-4 h-px w-full bg-white/10" />

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
              className="h-10 w-full rounded-xl bg-bg/20 px-3 text-sm text-text outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-accent/30"
            />

            <button
              type="submit"
              disabled={!canSubmit}
              className="h-10 rounded-xl bg-accent px-5 text-sm font-semibold text-bg transition hover:opacity-95 disabled:opacity-50"
            >
              {status === "loading" ? "Enviando…" : status === "success" ? "Enviado" : "Recibir enlace"}
            </button>
          </div>

          <p className="mt-2 text-xs text-text/60">Sin spam. Solo el enlace de descarga.</p>

          <div className="mt-2 min-h-[18px] text-sm" aria-live="polite">
            {status === "success" && (
              <p className="text-text/85">Listo. Revisa tu correo (Inbox / Promociones / Spam).</p>
            )}
            {status === "invalid" && <p className="text-red-500">Ese correo no se ve válido.</p>}
            {status === "error" && <p className="text-red-500">No pudimos enviar el correo.</p>}
          </div>
        </form>

        {/* SPECS full-width line */}
        <div className={cx("rounded-3xl bg-bg/10 shadow-soft ring-1 ring-white/10 lg:col-span-2", padClass[L.cardPad])}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-3">
            <p className="shrink-0 text-xs font-semibold text-text/70">ESPECIFICACIONES</p>
            <p className="text-sm text-text/85 leading-relaxed sm:whitespace-nowrap">
              Formato vertical optimizado para móvil y tablet • 12 meses más portada con espacio para notas •
              Disponible en versión pantalla y versión impresión • Entrega mediante enlace directo enviado por email
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}