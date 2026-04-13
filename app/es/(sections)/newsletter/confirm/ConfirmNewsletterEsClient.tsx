"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const CONFIRM_CSS = `
.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(var(--accent),0.10), transparent 55%),
    radial-gradient(circle at 70% 40%, rgba(var(--accent-alt),0.08), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 55%);
  mix-blend-mode: normal;
}

.ac-editorial-shell{
  position: relative;
}

.ac-editorial-shell::before{
  content: "";
  position: absolute;
  inset: -8% 12% auto 12%;
  height: 180px;
  pointer-events: none;
  filter: blur(22px);
  opacity: 0.9;
}

.ac-confirm-rule{
  width: 84px;
  height: 1px;
  margin: 0 auto;
  border-radius: 9999px;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent);
}
`

type ConfirmState =
  | "ready"
  | "loading"
  | "success"
  | "invalid"
  | "expired"
  | "error"
  | "missing"

export default function ConfirmNewsletterEsClient({
  token,
}: {
  token: string
}) {
  const router = useRouter()
  const [state, setState] = useState<ConfirmState>("ready")

  useEffect(() => {
    if (!token) {
      setState("missing")
    }
  }, [token])

  async function handleConfirm() {
    if (!token) {
      setState("missing")
      return
    }

    try {
      setState("loading")

      const res = await fetch("/api/newsletter/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.ok) {
        setState("success")
        router.replace("/es/newsletter/confirmed")
        return
      }

      if (data?.error === "invalid_token") {
        setState("invalid")
        return
      }

      if (data?.error === "token_expired") {
        setState("expired")
        return
      }

      setState("error")
    } catch {
      setState("error")
    }
  }

  const title =
    state === "success"
      ? "Suscripción confirmada"
      : state === "invalid"
      ? "Enlace inválido"
      : state === "expired"
      ? "Enlace expirado"
      : state === "missing"
      ? "Falta el token"
      : "Confirma tu suscripción"

  const description =
    state === "success"
      ? "Tu suscripción ha sido confirmada."
      : state === "invalid"
      ? "Este enlace es inválido o ya fue utilizado."
      : state === "expired"
      ? "Este enlace ha expirado. Vuelve a suscribirte."
      : state === "missing"
      ? "Este enlace está incompleto."
      : state === "error"
      ? "Ocurrió un error al confirmar tu suscripción."
      : "Un último paso. Confirma tu email para activar tu newsletter de AtomicCurious."

  const badge =
    state === "invalid"
      ? "ENLACE INVÁLIDO"
      : state === "expired"
      ? "ENLACE EXPIRADO"
      : state === "missing"
      ? "TOKEN FALTANTE"
      : state === "error"
      ? "ERROR DE CONFIRMACIÓN"
      : "CONFIRMACIÓN DE EMAIL"

  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: CONFIRM_CSS }} />

      <section className="relative w-full overflow-hidden bg-bg">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
          <div className="mx-auto w-full max-w-5xl">
            <div className="ac-editorial-shell relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-8 md:p-10">
              <div className="pointer-events-none absolute inset-0 ac-grain" />

              <div className="relative mx-auto max-w-3xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  {badge}
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
                  <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                    <Image
                      src="/images/sections/newsletter/newsletter_confirm.webp"
                      alt="Confirmación de suscripción"
                      fill
                      sizes="(min-width: 1024px) 760px, 92vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-muted">
                  ATOMICCURIOUS · NEWSLETTER
                </p>

                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl">
                  {title}
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-balance text-base text-muted sm:text-lg">
                  {description}
                </p>

                <div className="mt-6">
                  <div className="ac-confirm-rule" />
                </div>

                {(state === "ready" || state === "loading") && (
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={state === "loading"}
                      className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-6 py-3 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {state === "loading"
                        ? "Confirmando..."
                        : "Confirmar suscripción"}
                    </button>
                  </div>
                )}

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/es/newsletter"
                    className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface-2"
                  >
                    Volver al newsletter
                  </Link>

                  <Link
                    href="/es"
                    className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface-2"
                  >
                    Volver al inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}