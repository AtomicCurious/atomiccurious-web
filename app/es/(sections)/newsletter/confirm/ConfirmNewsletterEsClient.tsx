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

.ac-editorial-shell::after{
  content: "";
  position: absolute;
  inset: 16% 10% 10% 10%;
  pointer-events: none;
  filter: blur(30px);
  opacity: 0.9;
  background:
    radial-gradient(circle at 50% 24%, rgba(var(--accent), 0.08), transparent 26%),
    radial-gradient(circle at 50% 72%, rgba(var(--accent), 0.05), transparent 22%);
}

html:not([data-character]) .ac-editorial-shell::before,
body:not([data-character]) .ac-editorial-shell::before,
html[data-character="atom"] .ac-editorial-shell::before,
body[data-character="atom"] .ac-editorial-shell::before {
  background: radial-gradient(ellipse at center, rgba(52,211,153,0.10) 0%, rgba(52,211,153,0.04) 34%, transparent 72%);
}
html[data-character="iris"] .ac-editorial-shell::before,
body[data-character="iris"] .ac-editorial-shell::before {
  background: radial-gradient(ellipse at center, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0.04) 34%, transparent 72%);
}
html[data-character="core"] .ac-editorial-shell::before,
body[data-character="core"] .ac-editorial-shell::before {
  background: radial-gradient(ellipse at center, rgba(251,146,60,0.10) 0%, rgba(251,146,60,0.04) 34%, transparent 72%);
}

.ac-confirm-rule{
  width: 84px;
  height: 1px;
  margin: 0 auto;
  border-radius: 9999px;
  opacity: 0.92;
}

html:not([data-character]) .ac-confirm-rule,
body:not([data-character]) .ac-confirm-rule,
html[data-character="atom"] .ac-confirm-rule,
body[data-character="atom"] .ac-confirm-rule {
  background: linear-gradient(to right, transparent, rgba(52,211,153,0.72), rgba(52,211,153,0.18), transparent);
}
html[data-character="iris"] .ac-confirm-rule,
body[data-character="iris"] .ac-confirm-rule {
  background: linear-gradient(to right, transparent, rgba(34,211,238,0.72), rgba(34,211,238,0.18), transparent);
}
html[data-character="core"] .ac-confirm-rule,
body[data-character="core"] .ac-confirm-rule {
  background: linear-gradient(to right, transparent, rgba(251,146,60,0.72), rgba(251,146,60,0.18), transparent);
}

.ac-reveal{
  opacity: 0;
  transform: translateY(18px);
  animation: acReveal 0.82s cubic-bezier(.22,1,.36,1) forwards;
  will-change: opacity, transform;
}

.ac-delay-1{ animation-delay: 0.04s; }
.ac-delay-2{ animation-delay: 0.12s; }
.ac-delay-3{ animation-delay: 0.20s; }
.ac-delay-4{ animation-delay: 0.28s; }
.ac-delay-5{ animation-delay: 0.36s; }
.ac-delay-6{ animation-delay: 0.44s; }
.ac-delay-7{ animation-delay: 0.52s; }

@keyframes acReveal{
  to{
    opacity: 1;
    transform: translateY(0);
  }
}

.ac-confirm-media{
  position: relative;
  isolation: isolate;
}

.ac-confirm-media::after{
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(to top, rgba(0,0,0,0.18), transparent 34%),
    linear-gradient(to bottom, rgba(255,255,255,0.03), transparent 24%);
  z-index: 2;
}

.ac-confirm-image{
  transform: scale(1.02);
  animation: acFloatImage 10s ease-in-out infinite;
  will-change: transform;
}

@keyframes acFloatImage{
  0%,100%{ transform: scale(1.02) translateY(0px); }
  50%{ transform: scale(1.04) translateY(-6px); }
}

.ac-badge-dot{
  box-shadow: 0 0 0 0 rgba(var(--accent), 0.40);
  animation: acBadgePulse 2.4s ease-in-out infinite;
}

@keyframes acBadgePulse{
  0%,100%{
    box-shadow: 0 0 0 0 rgba(var(--accent), 0.00);
    transform: scale(1);
  }
  50%{
    box-shadow: 0 0 0 5px rgba(var(--accent), 0.10);
    transform: scale(1.08);
  }
}

.ac-confirm-cta{
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(var(--accent), 0.26);
  background:
    linear-gradient(180deg, rgba(var(--accent),0.96), rgba(var(--accent),0.82));
  color: rgb(6, 10, 9);
  box-shadow:
    0 10px 30px rgba(var(--accent), 0.16),
    inset 0 1px 0 rgba(255,255,255,0.24);
  animation: acCtaPulse 3.6s ease-in-out infinite;
}

.ac-confirm-cta::before{
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 18%,
    rgba(255,255,255,0.22) 50%,
    transparent 82%
  );
  transform: translateX(-130%);
  transition: transform .9s ease;
}

.ac-confirm-cta:hover::before{
  transform: translateX(130%);
}

.ac-confirm-cta:hover{
  transform: translateY(-1px);
  box-shadow:
    0 14px 38px rgba(var(--accent), 0.22),
    inset 0 1px 0 rgba(255,255,255,0.28);
}

.ac-confirm-cta:active{
  transform: translateY(0);
}

@keyframes acCtaPulse{
  0%,100%{
    box-shadow:
      0 10px 30px rgba(var(--accent), 0.14),
      inset 0 1px 0 rgba(255,255,255,0.22);
  }
  50%{
    box-shadow:
      0 14px 40px rgba(var(--accent), 0.22),
      inset 0 1px 0 rgba(255,255,255,0.22);
  }
}

.ac-spinner{
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  border: 2px solid rgba(0,0,0,0.22);
  border-top-color: rgba(0,0,0,0.82);
  animation: acSpin .82s linear infinite;
}

@keyframes acSpin{
  to{ transform: rotate(360deg); }
}

.ac-secondary-link{
  background: rgba(255,255,255,0.02);
  transition:
    border-color .22s ease,
    background-color .22s ease,
    transform .22s ease,
    opacity .22s ease;
}

.ac-secondary-link:hover{
  transform: translateY(-1px);
}

.ac-secondary-link--soft{
  opacity: 0.88;
}

.ac-secondary-link--soft:hover{
  opacity: 1;
}

@media (prefers-reduced-motion: reduce){
  .ac-reveal,
  .ac-confirm-image,
  .ac-badge-dot,
  .ac-confirm-cta,
  .ac-spinner{
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }

  .ac-confirm-cta::before{
    transition: none !important;
    transform: translateX(-130%);
  }
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_62%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,rgb(var(--accent-alt)/0.07),transparent_62%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
          <div className="mx-auto w-full max-w-5xl">
            <div className="ac-editorial-shell relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-8 md:p-10">
              <div className="pointer-events-none absolute inset-0 ac-grain" />

              <div className="relative mx-auto max-w-3xl text-center">
                <div className="ac-reveal ac-delay-1 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-text shadow-soft backdrop-blur">
                  <span className="ac-badge-dot h-1.5 w-1.5 rounded-full bg-accent/80" />
                  {badge}
                </div>

                <div className="ac-reveal ac-delay-2 mt-8 overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
                  <div className="ac-confirm-media relative aspect-[16/10] w-full sm:aspect-[16/9]">
                    <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(var(--accent),0.16),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(var(--accent-alt),0.12),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_60%)]" />

                    <Image
                      src="/images/sections/newsletter/newsletter_confirm.webp"
                      alt="Confirmación de suscripción"
                      fill
                      sizes="(min-width: 1024px) 760px, 92vw"
                      className="ac-confirm-image object-cover"
                      priority
                    />

                    <div className="pointer-events-none absolute inset-0 z-[3] [mask-image:radial-gradient(ellipse_78%_68%_at_50%_46%,black,transparent_88%)] bg-black/22" />
                  </div>
                </div>

                <p className="ac-reveal ac-delay-3 mt-8 text-xs font-semibold tracking-[0.18em] text-muted">
                  ATOMICCURIOUS · NEWSLETTER
                </p>

                <h1 className="ac-reveal ac-delay-4 mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl">
                  {title}
                </h1>

                <p className="ac-reveal ac-delay-5 mx-auto mt-5 max-w-2xl text-balance text-base text-muted sm:text-lg">
                  {description}
                </p>

                <div className="ac-reveal ac-delay-5 mt-6">
                  <div className="ac-confirm-rule" aria-hidden="true" />
                </div>

                {(state === "ready" || state === "loading") && (
                  <div className="ac-reveal ac-delay-6 mt-8">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={state === "loading"}
                      className="ac-confirm-cta inline-flex min-w-[240px] items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      <span className="relative z-[1] inline-flex items-center gap-2">
                        {state === "loading" && (
                          <span className="ac-spinner" aria-hidden="true" />
                        )}
                        {state === "loading"
                          ? "Confirmando..."
                          : "Confirmar suscripción"}
                      </span>
                    </button>
                  </div>
                )}

                <div className="ac-reveal ac-delay-7 mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/es/newsletter"
                    className="ac-secondary-link inline-flex items-center justify-center rounded-xl border border-border/90 px-5 py-2.5 text-sm font-semibold text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    Volver al newsletter
                  </Link>

                  <Link
                    href="/es"
                    className="ac-secondary-link ac-secondary-link--soft inline-flex items-center justify-center rounded-xl border border-border/80 px-5 py-2.5 text-sm font-semibold text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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