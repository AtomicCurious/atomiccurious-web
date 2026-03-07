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
  const token = useMemo(
    () => (searchParams.get("token") || "").trim(),
    [searchParams]
  )

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
        <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
          <div className="mx-auto w-full max-w-5xl text-center">

            <h1 className="text-4xl font-semibold tracking-tight text-text">
              {title}
            </h1>

            <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
              {description}
            </p>

            {(state === "ready" || state === "loading") && (
              <div className="mt-8">
                <button
                  onClick={handleConfirm}
                  disabled={state === "loading"}
                  className="px-6 py-3 rounded-xl border border-border bg-bg/40 text-text font-semibold hover:bg-surface-2 transition"
                >
                  {state === "loading"
                    ? "Confirming..."
                    : "Confirm subscription"}
                </button>
              </div>
            )}

            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/newsletter"
                className="px-4 py-2 border border-border rounded-lg"
              >
                Back to newsletter
              </Link>

              <Link
                href="/"
                className="px-4 py-2 border border-border rounded-lg"
              >
                Home
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}