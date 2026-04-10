"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import CurrencySelector from "@/components/CurrencySelector"
import SupportButtonStripe from "@/components/SupportButtonStripe"
import SupportCharacter from "@/components/SupportCharacter"
import SupportCustomAmount from "@/components/SupportCustomAmount"

const CURRENCY_CONFIG = {
  usd: {
    symbol: "$" as const,
    minAmount: 1,
    amounts: [3, 6, 12],
  },
  mxn: {
    symbol: "$" as const,
    minAmount: 10,
    amounts: [50, 100, 200],
  },
  eur: {
    symbol: "€" as const,
    minAmount: 1,
    amounts: [3, 6, 12],
  },
  gbp: {
    symbol: "£" as const,
    minAmount: 1,
    amounts: [3, 6, 12],
  },
} as const

type SupportedCurrency = keyof typeof CURRENCY_CONFIG

const SUPPORT_OPTIONS_BASE = [
  {
    key: "small",
    title: "Pequeño impulso",
    description: "Un gesto simple para decir: este proyecto vale la pena.",
    recommended: false,
  },
  {
    key: "mid",
    title: "El más elegido",
    description: "Un punto de apoyo sólido para mantener vivo este universo.",
    recommended: true,
  },
  {
    key: "large",
    title: "Apoyo generoso",
    description: "Un impulso más fuerte para acelerar lo que sigue.",
    recommended: false,
  },
] as const

/* =========================================================
   DECORATIVE IMAGE POSITION CONTROLS
   Negative = left / up
   Positive = right / down
========================================================= */
const LOGO_X = -10
const LOGO_Y = -55

const ATOM_CHARACTER_X = 75
const ATOM_CHARACTER_Y = -40

const IRIS_CHARACTER_X = 70
const IRIS_CHARACTER_Y = -40

const CORE_CHARACTER_X = 70
const CORE_CHARACTER_Y = 0

const SUPPORT_CHARACTER_CSS = `
/* ── base: hidden ───────────────────────────────────────── */
.ac-support-char,
.ac-support-logo {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition:
    opacity 380ms cubic-bezier(0.4,0,0.2,1),
    transform 380ms cubic-bezier(0.4,0,0.2,1);
  will-change: opacity, transform;
}

/* ── character position wrappers ────────────────────────── */
.ac-support-char-layer {
  position: absolute;
  inset: 0;
}

/* ── character layers ───────────────────────────────────── */
.ac-support-char {
  -webkit-mask-image: radial-gradient(
    ellipse 82% 90% at 68% 48%,
    black 32%,
    rgba(0,0,0,0.72) 56%,
    rgba(0,0,0,0.28) 74%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 82% 90% at 68% 48%,
    black 32%,
    rgba(0,0,0,0.72) 56%,
    rgba(0,0,0,0.28) 74%,
    transparent 100%
  );
}

/* default = atom */
.ac-support-char-atom {
  opacity: 0.52;
  transform: scale(0.70);
}
.ac-support-logo-atom {
  opacity: 0.55;
}

/* iris */
body[data-character="iris"] .ac-support-char-atom,
html[data-character="iris"] .ac-support-char-atom {
  opacity: 0;
  transform: translateY(6px) scale(1);
}

body[data-character="iris"] .ac-support-char-iris,
html[data-character="iris"] .ac-support-char-iris {
  opacity: 0.55;
  transform: translateY(0) scale(0.70);
}

body[data-character="iris"] .ac-support-logo-atom,
html[data-character="iris"] .ac-support-logo-atom {
  opacity: 0;
}

body[data-character="iris"] .ac-support-logo-iris,
html[data-character="iris"] .ac-support-logo-iris {
  opacity: 0.50;
}

/* core */
body[data-character="core"] .ac-support-char-atom,
html[data-character="core"] .ac-support-char-atom {
  opacity: 0;
  transform: translateY(6px) scale(1);
}

body[data-character="core"] .ac-support-char-core,
html[data-character="core"] .ac-support-char-core {
  opacity: 0.55;
  transform: translateY(0) scale(0.70);
}

body[data-character="core"] .ac-support-logo-atom,
html[data-character="core"] .ac-support-logo-atom {
  opacity: 0;
}

body[data-character="core"] .ac-support-logo-core,
html[data-character="core"] .ac-support-logo-core {
  opacity: 0.50;
}
`

function MessageIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 18.5c-2.9 0-5-1.95-5-4.8V8.9C2 6.05 4.1 4 7 4h10c2.9 0 5 2.05 5 4.9v4.8c0 2.85-2.1 4.8-5 4.8h-5.15L7.7 21.3c-.45.3-.7.08-.7-.42v-2.38Z" />
    </svg>
  )
}

export default function ApoyarPage() {
  const [currency, setCurrency] = useState<SupportedCurrency>("mxn")

  const currencyConfig = useMemo(() => {
    return CURRENCY_CONFIG[currency]
  }, [currency])

  const supportOptions = useMemo(() => {
    return SUPPORT_OPTIONS_BASE.map((option, index) => ({
      ...option,
      amount: currencyConfig.amounts[index],
    }))
  }, [currencyConfig])

  return (
    <main className="relative w-full overflow-x-hidden bg-bg text-text">
      <style>{SUPPORT_CHARACTER_CSS}</style>

      <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-7 overflow-hidden px-6 py-12 sm:px-8 sm:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
        >
          <div
            className="
              absolute -right-8 top-4 h-[220px] w-[220px] rounded-full
              bg-[radial-gradient(circle,rgba(255,120,150,0.13)_0%,rgba(255,120,150,0.055)_38%,rgba(255,120,150,0.015)_58%,transparent_78%)]
              blur-3xl
              sm:-right-10 sm:top-3 sm:h-[280px] sm:w-[280px]
              lg:-right-10 lg:top-1 lg:h-[340px] lg:w-[340px]
            "
          />

          <div
            className="
              absolute left-[-10px] top-[28px] h-[130px] w-[130px]
              sm:left-[-18px] sm:top-[24px] sm:h-[165px] sm:w-[165px]
              lg:left-[-24px] lg:top-[18px] lg:h-[210px] lg:w-[210px]
            "
            style={{ transform: `translate(${LOGO_X}px, ${LOGO_Y}px)` }}
          >
            <Image
              src="/images/stripe/atom_apoyo_logo.webp"
              alt=""
              aria-hidden="true"
              width={180}
              height={180}
              className="ac-support-logo ac-support-logo-atom h-full w-full object-contain blur-[0.15px]"
            />
            <Image
              src="/images/stripe/iris_apoyo_logo.webp"
              alt=""
              aria-hidden="true"
              width={180}
              height={180}
              className="ac-support-logo ac-support-logo-iris h-full w-full object-contain blur-[0.15px]"
            />
            <Image
              src="/images/stripe/core_apoyo_logo.webp"
              alt=""
              aria-hidden="true"
              width={180}
              height={180}
              className="ac-support-logo ac-support-logo-core h-full w-full object-contain blur-[0.15px]"
            />
          </div>

          <div
            className="
              absolute right-[-10px] top-[-8px]
              h-[240px] w-[240px]
              sm:right-[-16px] sm:top-[-12px] sm:h-[310px] sm:w-[310px]
              lg:right-[-20px] lg:top-[-10px] lg:h-[390px] lg:w-[390px]
            "
          >
            <div
              className="ac-support-char-layer"
              style={{
                transform: `translate(${ATOM_CHARACTER_X}px, ${ATOM_CHARACTER_Y}px)`,
              }}
            >
              <Image
                src="/images/stripe/atom_apoyo_v1.webp"
                alt=""
                aria-hidden="true"
                width={390}
                height={390}
                className="ac-support-char ac-support-char-atom h-full w-full object-contain"
              />
            </div>

            <div
              className="ac-support-char-layer"
              style={{
                transform: `translate(${IRIS_CHARACTER_X}px, ${IRIS_CHARACTER_Y}px)`,
              }}
            >
              <Image
                src="/images/stripe/iris_apoyo_v1.webp"
                alt=""
                aria-hidden="true"
                width={390}
                height={390}
                className="ac-support-char ac-support-char-iris h-full w-full object-contain"
              />
            </div>

            <div
              className="ac-support-char-layer"
              style={{
                transform: `translate(${CORE_CHARACTER_X}px, ${CORE_CHARACTER_Y}px)`,
              }}
            >
              <Image
                src="/images/stripe/core_apoyo_v1.webp"
                alt=""
                aria-hidden="true"
                width={390}
                height={390}
                className="ac-support-char ac-support-char-core h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="relative z-[1] flex flex-col gap-4 text-center">
          <span
            className="
              mx-auto inline-flex items-center rounded-full border
              border-[rgba(255,120,150,0.28)] bg-[rgba(255,120,150,0.10)]
              px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em]
              text-[rgba(255,210,220,0.92)]
            "
          >
            APOYA ESTE UNIVERSO
          </span>

          <div className="space-y-3">
            <h1 className="text-[2.5rem] font-semibold tracking-tight text-text sm:text-5xl">
              Ayuda a sostener la curiosidad diseñada
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted sm:text-[15px]">
              Tu apoyo ayuda a sostener nuevas piezas, mejores recursos y
              exploraciones hechas con más intención y mejor criterio.
            </p>

            <div className="pt-0">
              <SupportCharacter />
            </div>
          </div>
        </div>

        <div
          className="
            relative z-[1] rounded-[28px] border border-white/10
            bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]
            p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]
            sm:p-8
          "
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              Elige una forma de apoyar
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
              Una forma simple de sostener AtomicCurious y ayudar a que este
              proyecto independiente siga creciendo.
            </p>
          </div>

          <div className="mb-8">
            <CurrencySelector
              value={currency}
              onChange={(value) => setCurrency(value as SupportedCurrency)}
              locale="es"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {supportOptions.map((option) => {
              const isRecommended = option.recommended

              return (
                <div
                  key={option.key}
                  className={[
                    "relative flex h-full flex-col items-center gap-4 rounded-[24px] border px-5 py-6 text-center transition-all",
                    isRecommended
                      ? "border-[rgba(255,120,150,0.28)] bg-[rgba(255,120,150,0.05)] shadow-[0_0_0_1px_rgba(255,120,150,0.045),0_18px_40px_rgba(255,120,150,0.075)]"
                      : "border-white/10 bg-[rgba(255,255,255,0.02)]",
                  ].join(" ")}
                >
                  {isRecommended ? (
                    <span
                      className="
                        absolute -top-3 inline-flex items-center rounded-full border
                        border-[rgba(255,120,150,0.32)] bg-[rgba(255,120,150,0.14)]
                        px-3 py-1 text-[10px] font-semibold tracking-[0.18em]
                        text-[rgba(255,220,230,0.96)]
                      "
                    >
                      RECOMENDADO
                    </span>
                  ) : null}

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                      {option.title}
                    </p>

                    <p className="text-3xl font-semibold tracking-tight text-text">
                      {currencyConfig.symbol}
                      {option.amount} {currency.toUpperCase()}
                    </p>

                    <p className="text-xs leading-6 text-muted">
                      {option.description}
                    </p>
                  </div>

                  <div className="mt-auto w-full pt-1">
                    <SupportButtonStripe
                      amount={option.amount}
                      locale="es"
                      currency={currency}
                      label={`Apoyar con ${currencyConfig.symbol}${option.amount}`}
                    />
                  </div>
                </div>
              )
            })}

            <SupportCustomAmount
              locale="es"
              currency={currency}
              symbol={currencyConfig.symbol}
              minAmount={currencyConfig.minAmount}
              className="flex h-full flex-col justify-center text-center"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted">
              “Las ideas cuidadas toman tiempo. Apoyarlas las hace posibles.”
            </p>
          </div>
        </div>

        <details
          className="
            relative z-[1] group rounded-[28px] border border-white/10
            bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))]
            p-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)]
            sm:p-4
          "
        >
          <summary
            className="
              list-none cursor-pointer rounded-[24px] border border-white/10
              bg-[rgba(255,255,255,0.02)] px-4 py-4 outline-none transition
              hover:bg-[rgba(255,255,255,0.03)]
              focus-visible:ring-2 focus-visible:ring-[rgba(255,120,150,0.30)]
              sm:px-5 sm:py-5
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  relative inline-flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl border border-[rgba(255,120,150,0.24)]
                  bg-[rgba(255,120,150,0.08)] text-[rgba(255,210,220,0.94)]
                  shadow-[0_10px_30px_rgba(255,120,150,0.08)]
                "
              >
                <MessageIcon />
                <span
                  className="
                    absolute -right-1.5 -top-1.5 inline-flex min-h-[22px] min-w-[22px]
                    items-center justify-center rounded-full border
                    border-[rgba(255,120,150,0.38)] bg-[rgba(255,92,126,0.95)]
                    px-1.5 text-[10px] font-semibold leading-none text-white
                    shadow-[0_8px_18px_rgba(255,92,126,0.28)]
                  "
                >
                  4
                </span>
              </div>

              <div className="min-w-0 flex-1 text-left">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h2 className="text-lg font-semibold tracking-tight text-text sm:text-xl">
                    Preguntas frecuentes
                  </h2>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(255,210,220,0.82)]">
                    Ver respuestas
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-muted">
                  Respuestas claras, sin ruido, para apoyar con más confianza.
                </p>
              </div>

              <div
                className="
                  ml-auto shrink-0 text-muted transition-transform duration-300
                  group-open:rotate-180
                "
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 7.5 5 5 5-5" />
                </svg>
              </div>
            </div>
          </summary>

          <div className="mt-4 grid gap-3 px-1 pb-1 pt-1 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.02)] px-4 py-4">
              <p className="text-sm font-semibold text-text">
                ¿Es un pago único?
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Sí. Cada apoyo se procesa como un pago único. No es una
                suscripción ni un cobro recurrente.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.02)] px-4 py-4">
              <p className="text-sm font-semibold text-text">¿Es seguro?</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Sí. El pago se procesa de forma segura con Stripe. AtomicCurious
                no almacena los datos de tu tarjeta.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.02)] px-4 py-4">
              <p className="text-sm font-semibold text-text">
                ¿En qué se usa mi apoyo?
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                En sostener y mejorar el proyecto: nuevas piezas, mejores
                recursos, exploraciones más cuidadas y más tiempo para seguir
                construyendo este universo.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.02)] px-4 py-4">
              <p className="text-sm font-semibold text-text">
                ¿Recibo algo a cambio?
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Tu apoyo impulsa AtomicCurious directamente. Más adelante puede
                haber recursos y formatos especiales, pero este aporte es, ante
                todo, una forma de sostener el proyecto.
              </p>
            </div>
          </div>

          <div className="mt-5 mx-auto max-w-2xl px-2 pb-2 text-center">
            <p className="text-xs leading-6 text-muted">
              El pago se procesa de forma segura con Stripe. La moneda del cargo
              depende de la opción que elijas. Tu banco puede aplicar conversión
              o comisiones según su política.
            </p>
          </div>
        </details>
      </section>
    </main>
  )
}