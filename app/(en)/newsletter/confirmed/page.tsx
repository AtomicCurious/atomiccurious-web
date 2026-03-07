"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
`

type ConfirmState =
  | "ready"
  | "loading"
  | "success"
  | "invalid"
  | "expired"
  | "error"
  | "missing"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = useMemo(() => (searchParams.get("token") || "").trim(), [searchParams])

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
        router.replace("/newsletter/confirmed")
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
      ? "Subscription confirmed"
      : state === "invalid"
      ? "Invalid confirmation link"
      : state === "expired"
      ? "Confirmation link expired"
      : state === "missing"
      ? "Missing confirmation token"
      : "Confirm your subscription"

  const description =
    state === "success"
      ? "Your subscription has been confirmed."
      : state === "invalid"
      ? "This confirmation link is invalid or has already been used."
      : state === "expired"
      ? "This confirmation link has expired. Please subscribe again."
      : state === "missing"
      ? "This confirmation link is incomplete."
      : state === "error"
      ? "Something went wrong while confirming your subscription."
      : "Click the button below to complete your AtomicCurious newsletter subscription."

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
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-8">
              <div className="pointer-events-none absolute inset-0 ac-grain" />

              <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
                <div className="relative aspect-video w-full">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(var(--accent),0.16),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(var(--accent-alt),0.12),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_60%)]" />

                  <Image
                    src="/images/sections/Community/Core_Secciones_Inactivas.webp"
                    alt="Core ready to confirm your subscription"
                    fill
                    sizes="(min-width: 1024px) 960px, 92vw"
                    className="object-cover"
                    priority
                  />

                  <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] bg-black/35" />

                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-soft backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                    EMAIL CONFIRMATION
                  </div>
                </div>
              </div>

              <div className="relative mt-6 text-center">
                <p className="text-xs font-semibold tracking-wide text-muted">
                  ATOMICCURIOUS · NEWSLETTER
                </p>

                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                  {title}
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
                  {description}
                </p>

                {state === "ready" || state === "loading" ? (
                  <div className="mt-7">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={state === "loading"}
                      className="inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-6 py-3 text-sm font-semibold text-text transition hover:border-accent/35 hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      {state === "loading" ? "Confirming..." : "Confirm subscription"}
                    </button>
                  </div>
                ) : null}

                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/newsletter"
                    className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    Back to newsletter
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    Back home
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