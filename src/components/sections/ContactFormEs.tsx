"use client"

import { useEffect, useMemo, useState } from "react"

type FormStatus = "idle" | "loading" | "success" | "error"

type SubjectKey = "Colaboración" | "Comentarios" | "Soporte" | "Otro"
type CardId = "atom" | "iris" | "core"

type PresenceCard = {
  id: CardId
  name: string
  accent: string
  soft: string
  ring: string
}

const PRESENCE_CARDS: PresenceCard[] = [
  {
    id: "atom",
    name: "Atom",
    accent: "rgb(52 211 153 / 0.95)",
    soft: "rgb(52 211 153 / 0.08)",
    ring: "rgb(52 211 153 / 0.22)",
  },
  {
    id: "iris",
    name: "Iris",
    accent: "rgb(34 211 238 / 0.95)",
    soft: "rgb(34 211 238 / 0.08)",
    ring: "rgb(34 211 238 / 0.22)",
  },
  {
    id: "core",
    name: "Core",
    accent: "rgb(251 146 60 / 0.95)",
    soft: "rgb(251 146 60 / 0.08)",
    ring: "rgb(251 146 60 / 0.22)",
  },
]

const SEQUENCE_BY_SUBJECT: Record<SubjectKey, [string, string, string]> = {
  Colaboración: [
    "Leyendo colaboraciones...",
    "Analizando mejores propuestas...",
    "Respondiendo mensajes...",
  ],
  Comentarios: [
    "Leyendo comentarios...",
    "Afinando detalles editoriales...",
    "Ordenando respuestas...",
  ],
  Soporte: [
    "Revisando soporte...",
    "Buscando la mejor solución...",
    "Preparando respuesta clara...",
  ],
  Otro: [
    "Leyendo tu mensaje...",
    "Buscando el mejor enfoque...",
    "Preparando seguimiento...",
  ],
}

export default function ContactFormEs() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState<SubjectKey>("Colaboración")
  const [message, setMessage] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [elapsed, setElapsed] = useState(0)

  const disabled =
    status === "loading" ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim()

  useEffect(() => {
    const interval = window.setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  const activeIndex = Math.floor((elapsed % 15) / 5) as 0 | 1 | 2
  const activeCardId: CardId = ["atom", "iris", "core"][activeIndex] as CardId
  const sequenceTexts = SEQUENCE_BY_SUBJECT[subject]

  const currentTextByCard = useMemo(
    () => ({
      atom: sequenceTexts[0],
      iris: sequenceTexts[1],
      core: sequenceTexts[2],
    }),
    [sequenceTexts]
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (disabled) return

    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          company,
          locale: "es",
        }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.ok) {
        let msg = "No se pudo enviar tu mensaje. Intenta de nuevo."

        if (data?.error === "invalid_name") {
          msg = "Escribe un nombre válido."
        } else if (data?.error === "invalid_email") {
          msg = "Escribe un correo válido."
        } else if (data?.error === "invalid_subject") {
          msg = "Selecciona o escribe un asunto válido."
        } else if (data?.error === "invalid_message") {
          msg = "Tu mensaje debe tener un poco más de detalle."
        } else if (data?.error === "payload_too_large") {
          msg = "Tu mensaje es demasiado largo."
        } else if (typeof data?.detail === "string" && data.detail.trim()) {
          msg = data.detail
        }

        setStatus("error")
        setErrorMessage(msg)
        return
      }

      setStatus("success")
      setName("")
      setEmail("")
      setSubject("Colaboración")
      setMessage("")
      setCompany("")
    } catch {
      setStatus("error")
      setErrorMessage("Ocurrió un error inesperado. Intenta de nuevo.")
    }
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgb(var(--border)/0.78)] bg-surface-1 p-6 shadow-[0_28px_80px_-42px_rgb(var(--ac-contact-accent)/0.28)] sm:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(180deg,rgb(var(--surface-1)/0.98),rgb(var(--surface-1)/0.94))]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgb(var(--ac-contact-accent)/0.08),transparent)]" />
        <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-[rgb(var(--ac-contact-accent)/0.10)] blur-3xl" />
        <div className="absolute right-0 top-10 h-28 w-28 rounded-full bg-[rgb(var(--ac-contact-accent)/0.05)] blur-3xl" />
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />
      </div>

      <style jsx>{`
        @keyframes ac-status-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.95;
            box-shadow: 0 0 0 0 rgb(var(--ac-contact-accent) / 0.3);
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
            box-shadow: 0 0 0 8px rgb(var(--ac-contact-accent) / 0);
          }
        }

        @keyframes ac-presence-fade-up {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ac-contact-presence-dot {
          animation: ac-status-pulse 2.2s ease-in-out infinite;
        }

        .ac-contact-select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image:
            linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.9) 50%),
            linear-gradient(135deg, rgba(255,255,255,0.9) 50%, transparent 50%);
          background-position:
            calc(100% - 30px) calc(50% - 3px),
            calc(100% - 22px) calc(50% - 3px);
          background-size: 8px 8px, 8px 8px;
          background-repeat: no-repeat;
          padding-right: 3.25rem;
        }

        .ac-contact-select option {
          color: #eef4ff;
          background: rgb(var(--surface-2));
        }

        .ac-contact-select option:hover,
        .ac-contact-select option:focus {
          background: rgb(var(--ac-contact-accent) / 0.18);
          color: #ffffff;
        }

        .ac-contact-select option:checked,
        .ac-contact-select option:active {
          background: rgb(var(--ac-contact-accent) / 0.28);
          color: #ffffff;
        }

        .ac-presence-card {
          position: relative;
          overflow: hidden;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease,
            box-shadow 220ms ease,
            opacity 220ms ease;
        }

        .ac-presence-card::before {
          content: "";
          position: absolute;
          inset: 0 auto auto 0;
          width: 100%;
          height: 1px;
          opacity: 0;
          transition: opacity 220ms ease;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
        }

        .ac-presence-card[data-active="true"]::before {
          opacity: 0.35;
        }

        .ac-presence-text {
          animation: ac-presence-fade-up 240ms ease;
        }

        @media (hover: hover) {
          .ac-presence-card:hover {
            transform: translateY(-1px);
          }
        }
      `}</style>

      <form onSubmit={handleSubmit} className="relative z-[1] grid gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-text">
              Nombre
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl border border-border/80 bg-[rgb(var(--bg)/0.88)] px-4 text-sm text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] outline-none transition [caret-color:rgb(var(--ac-contact-accent)/0.95)] placeholder:text-muted/70 focus:border-[rgb(var(--ac-contact-accent)/0.52)] focus:bg-[rgb(var(--bg)/0.96)] focus:ring-2 focus:ring-[rgb(var(--ac-contact-accent)/0.20)]"
              placeholder="Tu nombre"
              autoComplete="name"
              maxLength={120}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-text">
              Correo
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl border border-border/80 bg-[rgb(var(--bg)/0.88)] px-4 text-sm text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] outline-none transition [caret-color:rgb(var(--ac-contact-accent)/0.95)] placeholder:text-muted/70 focus:border-[rgb(var(--ac-contact-accent)/0.52)] focus:bg-[rgb(var(--bg)/0.96)] focus:ring-2 focus:ring-[rgb(var(--ac-contact-accent)/0.20)]"
              placeholder="tu@gmail.com"
              autoComplete="email"
              maxLength={160}
            />
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-text">
              Asunto
            </span>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as SubjectKey)}
              className="ac-contact-select h-11 rounded-xl border border-[rgb(var(--ac-contact-accent)/0.30)] bg-[rgb(var(--bg)/0.88)] px-4 text-sm text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_0_0_1px_rgb(var(--ac-contact-accent)/0.06)] outline-none transition focus:border-[rgb(var(--ac-contact-accent)/0.60)] focus:bg-[rgb(var(--bg)/0.96)] focus:ring-2 focus:ring-[rgb(var(--ac-contact-accent)/0.24)]"
            >
              <option value="Colaboración">Colaboración</option>
              <option value="Comentarios">Comentarios</option>
              <option value="Soporte">Soporte</option>
              <option value="Otro">Otro</option>
            </select>
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="text-[15px] font-semibold tracking-[-0.01em] text-text">
              Mensaje
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[180px] rounded-xl border border-border/80 bg-[rgb(var(--bg)/0.88)] px-4 py-3 text-sm text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.03),inset_0_-18px_40px_-34px_rgb(var(--ac-contact-accent)/0.18)] outline-none transition [caret-color:rgb(var(--ac-contact-accent)/0.95)] placeholder:text-muted/70 focus:border-[rgb(var(--ac-contact-accent)/0.52)] focus:bg-[rgb(var(--bg)/0.96)] focus:ring-2 focus:ring-[rgb(var(--ac-contact-accent)/0.22)]"
              placeholder="Escribe tu mensaje..."
              maxLength={5000}
            />
          </label>

          <label className="hidden" aria-hidden="true">
            Empresa
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>
        </div>

        <div className="mt-3 flex justify-center">
          <button
            type="submit"
            disabled={disabled}
            className={[
              "inline-flex min-w-[200px] items-center justify-center rounded-full px-6 py-3 text-[15px] font-semibold transition focus:outline-none",
              "border",
              disabled
                ? "cursor-not-allowed border-border/70 bg-bg text-muted opacity-70"
                : "border-[rgb(var(--ac-contact-accent)/0.34)] bg-[linear-gradient(180deg,rgb(var(--surface-2)/1),rgb(var(--surface-1)/0.98))] text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_38px_-22px_rgb(var(--ac-contact-accent)/0.42)] hover:-translate-y-[1px] hover:border-[rgb(var(--ac-contact-accent)/0.58)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_46px_-22px_rgb(var(--ac-contact-accent)/0.56)] focus-visible:border-[rgb(var(--ac-contact-accent)/0.58)] focus-visible:ring-2 focus-visible:ring-[rgb(var(--ac-contact-accent)/0.24)]",
            ].join(" ")}
          >
            {status === "loading" ? (
              <>
                Enviando
                <span className="ml-1.5 text-[rgb(var(--ac-contact-accent)/0.98)]">
                  mensaje...
                </span>
              </>
            ) : (
              <>
                Enviar
                <span className="ml-1.5 text-[rgb(var(--ac-contact-accent)/0.98)]">
                  mensaje
                </span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="ac-contact-presence-dot h-2.5 w-2.5 rounded-full bg-[rgb(var(--ac-contact-accent)/0.98)] shadow-[0_0_0_5px_rgb(var(--ac-contact-accent)/0.12)]"
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text/78">
              Equipo en movimiento
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {PRESENCE_CARDS.map((card) => {
              const isActive = activeCardId === card.id

              return (
                <div
                  key={card.id}
                  data-active={isActive}
                  className="ac-presence-card rounded-xl border px-3.5 py-3"
                  style={{
                    color: card.accent,
                    borderColor: isActive ? card.ring : "rgb(var(--border) / 0.56)",
                    background: isActive
                      ? `linear-gradient(180deg, ${card.soft}, rgb(var(--surface-1) / 0.88))`
                      : `linear-gradient(180deg, rgb(var(--surface-2) / 0.48), rgb(var(--surface-1) / 0.62))`,
                    boxShadow: isActive
                      ? `inset 0 1px 0 rgba(255,255,255,0.05), 0 14px 28px -24px ${card.accent.replace("/ 0.95", "/ 0.34")}`
                      : "inset 0 1px 0 rgba(255,255,255,0.035)",
                    opacity: isActive ? 1 : 0.74,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: card.accent,
                        boxShadow: isActive ? `0 0 0 5px ${card.soft}` : "none",
                        opacity: isActive ? 1 : 0.72,
                      }}
                    />
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.13em]"
                      style={{
                        color: isActive ? card.accent : "rgb(var(--text) / 0.68)",
                      }}
                    >
                      {card.name}
                    </span>
                  </div>

                  <p
                    className="ac-presence-text mt-4 text-[13px] font-semibold leading-relaxed"
                    style={{
                      color: isActive ? card.accent.replace("/ 0.95", "/ 0.92") : "rgb(var(--text) / 0.70)",
                    }}
                  >
                    {currentTextByCard[card.id]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {status === "success" ? (
          <div className="rounded-2xl border border-[rgb(var(--ac-contact-accent)/0.24)] bg-[rgb(var(--ac-contact-accent)/0.08)] px-4 py-3 text-sm text-text">
            Mensaje enviado correctamente.{" "}
            <span className="text-[rgb(var(--ac-contact-accent)/0.92)]">
              Gracias por escribirnos.
            </span>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errorMessage || "No se pudo enviar tu mensaje. Intenta de nuevo."}
          </div>
        ) : null}
      </form>
    </div>
  )
}