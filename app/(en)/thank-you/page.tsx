// app/(en)/thank-you/page.tsx
import Image from "next/image"
import Link from "next/link"
import ShootingStars from "@/components/visual/ShootingStars"

export const metadata = {
  title: "Thank You | AtomicCurious",
  description:
    "Thank you for supporting AtomicCurious. Your contribution helps this universe keep growing.",
  alternates: {
    canonical: "/thank-you",
    languages: {
      en: "/thank-you",
      es: "/es/gracias",
    },
  },
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
  amount?: string
  supportId?: string
  dateLabel?: string
}

type ReceiptModalProps = {
  amount?: string
  supportId?: string
  dateLabel?: string
}

type PageProps = {
  searchParams?: {
    amount?: string
    sid?: string
    date?: string
  }
}

function SupportReceiptCard({
  amount = "Your contribution",
  supportId = "#AC-00421",
  dateLabel = "Today",
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
              ATOMICCURIOUS UNIVERSE
            </span>

            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
                Contribution recorded
              </h2>
              <p className="text-sm leading-6 text-muted">
                Your action is now part of this system of ideas,
                explorations, and resources designed with intention.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:min-w-[190px]">
            <div
              className="
                rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.04)]
                px-4 py-3
              "
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Record
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
                Contribution
              </p>
              <p className="mt-1 text-sm font-medium text-text">{amount}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              Type
            </p>
            <p className="mt-2 text-sm font-medium text-text">One-time support</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              Date
            </p>
            <p className="mt-2 text-sm font-medium text-text">{dateLabel}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              Status
            </p>
            <p className="mt-2 text-sm font-medium text-text">Active</p>
          </div>
        </div>

        <div
          className="
            rounded-[22px] border border-[rgba(255,255,255,0.10)]
            bg-[rgba(255,255,255,0.025)] px-4 py-4
          "
        >
          <p className="text-sm leading-7 text-muted">
            Thank you for lighting up another part of this universe. Your support
            helps sustain new pieces, better resources, and explorations made
            with more intention and less noise.
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
}: ReceiptModalProps) {
  return (
    <div
      id="receipt-modal"
      className="ac-receipt-modal fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
    >
      <a
        href="#thank-you-actions"
        aria-label="Close receipt"
        className="absolute inset-0 bg-[rgba(3,6,10,0.76)] backdrop-blur-[3px]"
      />

      <div className="relative z-[1] flex w-full max-w-3xl flex-col gap-4">
        <div className="flex justify-end">
          <a
            href="#thank-you-actions"
            className="
              inline-flex items-center justify-center rounded-full
              border border-white/10 bg-[rgba(255,255,255,0.05)]
              px-4 py-2 text-[12px] font-medium text-muted transition
              hover:border-white/15 hover:bg-[rgba(255,255,255,0.08)] hover:text-text
            "
          >
            Close
          </a>
        </div>

        <SupportReceiptCard
          amount={amount}
          supportId={supportId}
          dateLabel={dateLabel}
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
        Your support lit up another part of this universe. Thank you for helping
        sustain ideas, explorations, and resources designed with more intention
        and less noise.
      </div>

      <div
        id="thank-you-actions"
        className="relative mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        <Link
          href="/posts"
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
          Keep exploring
        </Link>

        <Link
          href="/"
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
          Back to home
        </Link>

        <a
          href="#receipt-modal"
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
          View receipt
        </a>
      </div>
    </div>
  )
}

export default function ThankYouPage({ searchParams }: PageProps) {
  const amount = searchParams?.amount
    ? `$${searchParams.amount} USD`
    : "Your contribution"

  const supportId = searchParams?.sid
    ? `#${searchParams.sid}`
    : "#AC-00421"

  const dateLabel = searchParams?.date
    ? searchParams.date
    : "Today"

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
            SUPPORT RECEIVED
          </span>

          <div className="space-y-3">
            <h1 className="text-[2.2rem] font-semibold tracking-tight text-text sm:text-[3.1rem]">
              Thank you for supporting AtomicCurious
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted sm:text-[15px]">
              Your support directly helps create new ideas, better pieces,
              deeper resources, and experiences designed with more intention.
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
        amount={amount}
        supportId={supportId}
        dateLabel={dateLabel}
      />
    </main>
  )
}