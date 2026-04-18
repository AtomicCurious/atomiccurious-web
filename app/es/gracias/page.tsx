// app/es/gracias/page.tsx
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import Stripe from "stripe"
import ShootingStars from "@/components/visual/ShootingStars"

export const metadata: Metadata = {
  title: "Gracias | AtomicCurious",
  description:
    "Gracias por apoyar AtomicCurious. Tu aporte ayuda a que este universo siga creciendo.",
  alternates: {
    canonical: "/es/gracias",
    languages: {
      es: "/es/gracias",
      en: "/thank-you",
    },
  },
}

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY")
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

const THANK_YOU_VISUAL_CSS = `
.ac-thanks-logo-wrap {
  position: relative;
  isolation: isolate;
}

.ac-thanks-logo-img {
  position: relative;
  z-index: 2;
  filter:
    drop-shadow(0 0 14px rgba(255,255,255,0.18))
    drop-shadow(0 0 32px rgba(255,255,255,0.12))
    drop-shadow(0 0 58px rgba(34,211,238,0.14))
    drop-shadow(0 0 68px rgba(52,211,153,0.08));
}

.ac-thanks-particle {
  position: absolute;
  border-radius: 9999px;
  opacity: 0.95;
  filter: blur(0.2px);
}

.ac-thanks-particle-green {
  background: rgba(52,211,153,0.98);
  box-shadow:
    0 0 12px rgba(52,211,153,0.55),
    0 0 24px rgba(52,211,153,0.22);
}

.ac-thanks-particle-cyan {
  background: rgba(34,211,238,0.98);
  box-shadow:
    0 0 12px rgba(34,211,238,0.55),
    0 0 24px rgba(34,211,238,0.22);
}

.ac-thanks-particle-orange {
  background: rgba(251,146,60,0.98);
  box-shadow:
    0 0 12px rgba(251,146,60,0.55),
    0 0 24px rgba(251,146,60,0.22);
}

/* hash modal */
.ac-receipt-modal {
  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms ease;
}

.ac-receipt-modal:target {
  opacity: 1;
  pointer-events: auto;
}
`

type SupportReceiptCardProps = {
  amount: string
  supportId: string
  dateLabel: string
  statusLabel: string
}

type ReceiptModalProps = {
  amount: string
  supportId: string
  dateLabel: string
  statusLabel: string
}

type GraciasSearchParams = {
  session_id?: string
}

type PageProps = {
  searchParams?: Promise<GraciasSearchParams>
}

type ReceiptData = {
  amount: string
  supportId: string
  dateLabel: string
  statusLabel: string
}

function formatAmountFromSession(session: Stripe.Checkout.Session) {
  const amountTotal = session.amount_total
  const currency = session.currency?.toUpperCase()

  if (amountTotal == null || !currency) {
    return "Aporte registrado"
  }

  const locale =
    session.metadata?.locale === "es"
      ? "es-MX"
      : "en-US"

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amountTotal / 100)
}

function formatDateFromSession(session: Stripe.Checkout.Session) {
  if (!session.created) return "Fecha no disponible"

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(session.created * 1000))
}

function formatStatusFromSession(session: Stripe.Checkout.Session) {
  switch (session.payment_status) {
    case "paid":
      return "Confirmado"
    case "unpaid":
      return "Pendiente"
    case "no_payment_required":
      return "Completado"
    default:
      return "Registrado"
  }
}

function buildSupportId(session: Stripe.Checkout.Session) {
  const created = session.created
  const date = new Date(created * 1000)

  const yyyy = String(date.getUTCFullYear())
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(date.getUTCDate()).padStart(2, "0")

  const sourceId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.id

  const suffix = sourceId.slice(-6).toUpperCase()

  return `AC-${yyyy}${mm}${dd}-${suffix}`
}

async function getReceiptData(sessionId?: string): Promise<ReceiptData> {
  const fallback: ReceiptData = {
    amount: "Aporte registrado",
    supportId: "AC-PENDIENTE",
    dateLabel: new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date()),
    statusLabel: "Registrado",
  }

  if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
    return fallback
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return {
      amount: formatAmountFromSession(session),
      supportId: buildSupportId(session),
      dateLabel: formatDateFromSession(session),
      statusLabel: formatStatusFromSession(session),
    }
  } catch (error) {
    console.error("Stripe thank-you session retrieval error:", error)
    return fallback
  }
}

function SupportReceiptCard({
  amount,
  supportId,
  dateLabel,
  statusLabel,
}: SupportReceiptCardProps) {
  return (
    <div
      className="
        relative mx-auto w-full max-w-3xl overflow-hidden rounded-[28px]
        border border-white/10
        bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))]
        p-6 shadow-[0_20px_60px_rgba(0,0,0,0.32)]
        sm:p-7
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-10 top-[-24px] h-[120px] w-[120px] rounded-full
          bg-[radial-gradient(circle,rgba(52,211,153,0.22)_0%,rgba(52,211,153,0.08)_42%,transparent_75%)]
          blur-2xl
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-[-18px] top-[8px] h-[140px] w-[140px] rounded-full
          bg-[radial-gradient(circle,rgba(34,211,238,0.20)_0%,rgba(34,211,238,0.07)_44%,transparent_76%)]
          blur-2xl
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-[-30px] left-1/2 h-[120px] w-[120px] -translate-x-1/2 rounded-full
          bg-[radial-gradient(circle,rgba(251,146,60,0.18)_0%,rgba(251,146,60,0.06)_42%,transparent_76%)]
          blur-2xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-6 top-0 h-px
          bg-[linear-gradient(90deg,transparent,rgba(52,211,153,0.50),rgba(34,211,238,0.50),rgba(251,146,60,0.50),transparent)]
        "
      />
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-10 bottom-0 h-px
          bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]
        "
      />

      <div className="relative z-[1] flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <span
              className="
                inline-flex items-center rounded-full border
                border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.05)]
                px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]
                text-[rgba(255,255,255,0.72)]
              "
            >
              UNIVERSO ATOMICCURIOUS
            </span>

            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                Aporte registrado
              </h2>
              <p className="text-sm leading-6 text-muted">
                Tu aporte quedó registrado correctamente. Gracias por ayudar a
                sostener este universo de ideas, exploraciones y recursos
                diseñados con intención.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:min-w-[220px]">
            <div
              className="
                rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.04)]
                px-4 py-3
              "
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Registro
              </p>
              <p className="mt-1 font-mono text-sm text-[rgba(255,255,255,0.92)]">
                {supportId}
              </p>
            </div>

            <div
              className="
                rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.04)]
                px-4 py-3
              "
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Aporte
              </p>
              <p className="mt-1 text-sm font-medium text-text">{amount}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              Tipo
            </p>
            <p className="mt-2 text-sm font-medium text-text">Apoyo único</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              Fecha
            </p>
            <p className="mt-2 text-sm font-medium text-text">{dateLabel}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              Estado
            </p>
            <p className="mt-2 text-sm font-medium text-text">{statusLabel}</p>
          </div>
        </div>

        <div
          className="
            rounded-[22px] border border-[rgba(255,255,255,0.10)]
            bg-[rgba(255,255,255,0.025)] px-4 py-4
          "
        >
          <p className="text-sm leading-7 text-muted">
            Gracias por sostener este universo. Cada aporte ayuda a convertir
            curiosidad en nuevas piezas, mejores recursos y exploraciones hechas
            con más intención y menos ruido.
          </p>
        </div>
      </div>
    </div>
  )
}

function ReceiptModal({
  amount,
  supportId,
  dateLabel,
  statusLabel,
}: ReceiptModalProps) {
  return (
    <div
      id="comprobante-modal"
      className="ac-receipt-modal fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
    >
      <a
        href="#gracias-acciones"
        aria-label="Cerrar comprobante"
        className="absolute inset-0 bg-[rgba(3,6,10,0.76)] backdrop-blur-[3px]"
      />

      <div className="relative z-[1] flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-end">
          <a
            href="#gracias-acciones"
            className="
              inline-flex items-center justify-center rounded-full
              border border-white/10 bg-[rgba(255,255,255,0.05)]
              px-4 py-2 text-[12px] font-medium text-muted transition
              hover:border-white/15 hover:bg-[rgba(255,255,255,0.08)] hover:text-text
            "
          >
            Cerrar
          </a>
        </div>

        <SupportReceiptCard
          amount={amount}
          supportId={supportId}
          dateLabel={dateLabel}
          statusLabel={statusLabel}
        />
      </div>
    </div>
  )
}

function ThankYouUniverseVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[760px] flex-col items-center text-center">
      <div className="relative flex w-full justify-center -translate-y-0">
        <div
          className="
            relative h-[360px] w-[360px]
            sm:h-[430px] sm:w-[430px]
            lg:h-[470px] lg:w-[470px]
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2
              rounded-full blur-3xl
              bg-[radial-gradient(circle,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.12)_24%,rgba(255,255,255,0.03)_50%,transparent_76%)]
              sm:h-[255px] sm:w-[255px]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute left-[34%] top-[52%] h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2
              rounded-full blur-3xl
              bg-[radial-gradient(circle,rgba(52,211,153,0.38)_0%,rgba(52,211,153,0.15)_34%,rgba(52,211,153,0.04)_60%,transparent_82%)]
              sm:h-[255px] sm:w-[255px]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute left-1/2 top-[38%] h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2
              rounded-full blur-3xl
              bg-[radial-gradient(circle,rgba(34,211,238,0.38)_0%,rgba(34,211,238,0.15)_34%,rgba(34,211,238,0.04)_60%,transparent_82%)]
              sm:h-[255px] sm:w-[255px]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute left-[66%] top-[52%] h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2
              rounded-full blur-3xl
              bg-[radial-gradient(circle,rgba(251,146,60,0.34)_0%,rgba(251,146,60,0.14)_34%,rgba(251,146,60,0.04)_60%,transparent_82%)]
              sm:h-[255px] sm:w-[255px]
            "
          />

          <span
            aria-hidden="true"
            className="ac-thanks-particle ac-thanks-particle-green absolute left-[24%] top-[31%] h-[4px] w-[4px]"
          />
          <span
            aria-hidden="true"
            className="ac-thanks-particle ac-thanks-particle-green absolute left-[20%] top-[50%] h-[3px] w-[3px]"
          />
          <span
            aria-hidden="true"
            className="ac-thanks-particle ac-thanks-particle-green absolute left-[29%] top-[71%] h-[4px] w-[4px]"
          />

          <span
            aria-hidden="true"
            className="ac-thanks-particle ac-thanks-particle-cyan absolute left-[63%] top-[24%] h-[3px] w-[3px]"
          />
          <span
            aria-hidden="true"
            className="ac-thanks-particle ac-thanks-particle-cyan absolute left-[70%] top-[33%] h-[4px] w-[4px]"
          />
          <span
            aria-hidden="true"
            className="ac-thanks-particle ac-thanks-particle-cyan absolute left-[56%] top-[20%] h-[3px] w-[3px]"
          />

          <span
            aria-hidden="true"
            className="ac-thanks-particle ac-thanks-particle-orange absolute left-[74%] top-[54%] h-[4px] w-[4px]"
          />
          <span
            aria-hidden="true"
            className="ac-thanks-particle ac-thanks-particle-orange absolute left-[69%] top-[72%] h-[3px] w-[3px]"
          />
          <span
            aria-hidden="true"
            className="ac-thanks-particle ac-thanks-particle-orange absolute left-[79%] top-[64%] h-[3px] w-[3px]"
          />

          <div
            className="
              ac-thanks-logo-wrap
              absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2
              sm:h-[400px] sm:w-[400px]
              lg:h-[440px] lg:w-[440px]
            "
          >
            <Image
              src="/images/stripe/gracias_logo_v1.webp"
              alt="AtomicCurious"
              width={440}
              height={440}
              className="ac-thanks-logo-img h-full w-full object-contain scale-[1.45]"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-0 max-w-2xl text-sm leading-7 text-muted sm:text-[15px]">
        Tu apoyo ya forma parte de este universo. Gracias por ayudar a sostener
        ideas, exploraciones y recursos diseñados con más intención y menos
        ruido.
      </div>

      <div
        id="gracias-acciones"
        className="relative mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        <Link
          href="/es/posts"
          className="
            inline-flex items-center justify-center rounded-full
            border px-5 py-2.5 text-[13px] font-medium transition
            hover:scale-[1.04]
          "
          style={{
            borderColor: "rgba(34,211,238,0.40)",
            background: "rgba(34,211,238,0.13)",
            color: "rgb(184,246,255)",
            boxShadow:
              "0 0 0 1px rgba(34,211,238,0.06), 0 10px 26px rgba(34,211,238,0.14)",
          }}
        >
          Seguir explorando
        </Link>

        <Link
          href="/es"
          className="
            inline-flex items-center justify-center rounded-full
            border px-6 py-3 text-[14px] font-semibold transition
            hover:scale-[1.05]
          "
          style={{
            borderColor: "rgba(52,211,153,0.48)",
            background: "rgba(52,211,153,0.18)",
            color: "rgb(195,255,228)",
            boxShadow:
              "0 0 0 1px rgba(52,211,153,0.08), 0 10px 30px rgba(52,211,153,0.18)",
          }}
        >
          Volver al inicio
        </Link>

        <a
          href="#comprobante-modal"
          className="
            inline-flex items-center justify-center rounded-full
            border px-5 py-2.5 text-[13px] font-medium transition
            hover:scale-[1.04]
          "
          style={{
            borderColor: "rgba(251,146,60,0.40)",
            background: "rgba(251,146,60,0.13)",
            color: "rgb(255,214,176)",
            boxShadow:
              "0 0 0 1px rgba(251,146,60,0.06), 0 10px 26px rgba(251,146,60,0.14)",
          }}
        >
          Ver comprobante
        </a>
      </div>
    </div>
  )
}

export default async function GraciasPage({ searchParams }: PageProps) {
  const params = await searchParams
  const sessionId = params?.session_id

  const receipt = await getReceiptData(sessionId)

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden overflow-y-auto bg-bg text-text lg:h-[100svh] lg:overflow-hidden">
      <style>{THANK_YOU_VISUAL_CSS}</style>

      <section
        className="
          relative mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center
          gap-5 overflow-hidden px-6 py-6
          sm:px-8 sm:py-8
          lg:h-full lg:min-h-0
        "
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
        >
          <ShootingStars count={5} intensity="low" palette="mixed" />

          <div
            className="
              absolute -left-14 top-10 h-[220px] w-[220px] rounded-full
              bg-[radial-gradient(circle,rgba(52,211,153,0.18)_0%,rgba(52,211,153,0.08)_38%,rgba(52,211,153,0.025)_60%,transparent_78%)]
              blur-3xl
              sm:h-[280px] sm:w-[280px]
            "
          />
          <div
            className="
              absolute right-[-30px] top-2 h-[250px] w-[250px] rounded-full
              bg-[radial-gradient(circle,rgba(34,211,238,0.18)_0%,rgba(34,211,238,0.08)_38%,rgba(34,211,238,0.025)_60%,transparent_78%)]
              blur-3xl
              sm:h-[320px] sm:w-[320px]
            "
          />
          <div
            className="
              absolute bottom-[-40px] left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full
              bg-[radial-gradient(circle,rgba(251,146,60,0.15)_0%,rgba(251,146,60,0.06)_42%,rgba(251,146,60,0.02)_62%,transparent_80%)]
              blur-3xl
              sm:h-[300px] sm:w-[300px]
            "
          />
        </div>

        <div className="relative z-[1] flex flex-col items-center gap-3 text-center">
          <span
            className="
              inline-flex items-center gap-2 rounded-full border
              border-[rgba(52,211,153,0.38)] bg-[rgba(52,211,153,0.14)]
              px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em]
              text-[rgba(190,255,228,0.98)]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-1.5 w-1.5 rounded-full bg-[rgb(52,211,153)]
                shadow-[0_0_10px_rgba(52,211,153,0.55)]
              "
            />
            APOYO RECIBIDO
          </span>

          <div className="space-y-3">
            <h1 className="text-[2.2rem] font-semibold tracking-tight text-text sm:text-[3.1rem]">
              Gracias por apoyar AtomicCurious
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted sm:text-[15px]">
              Tu aporte ayuda directamente a crear nuevas ideas, mejores piezas,
              recursos más profundos y experiencias diseñadas con más intención.
            </p>
          </div>
        </div>

        <div
          className="
            relative z-[1] rounded-[30px] border border-white/10
            bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.014))]
            px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.03)]
            sm:px-8 sm:py-6
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-x-10 top-0 h-px
              bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]
            "
          />
          <ThankYouUniverseVisual />
        </div>
      </section>

      <ReceiptModal
        amount={receipt.amount}
        supportId={receipt.supportId}
        dateLabel={receipt.dateLabel}
        statusLabel={receipt.statusLabel}
      />
    </main>
  )
}