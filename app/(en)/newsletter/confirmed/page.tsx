import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Subscription confirmed | AtomicCurious",
  description: "Your AtomicCurious newsletter subscription is confirmed.",
}

export default function Page() {
  return (
    <main className="w-full min-h-[60vh] flex items-center justify-center">

      <div className="text-center max-w-xl px-6">

        <h1 className="text-4xl font-semibold tracking-tight text-text">
          Subscription confirmed
        </h1>

        <p className="mt-4 text-lg text-muted">
          Welcome to AtomicCurious. You're now part of the list.
        </p>

        <div className="mt-8 flex justify-center gap-4">

          <Link
            href="/posts"
            className="px-5 py-3 border border-border rounded-xl"
          >
            Browse posts
          </Link>

          <Link
            href="/start-here"
            className="px-5 py-3 border border-border rounded-xl"
          >
            Start here
          </Link>

          <Link
            href="/newsletter"
            className="px-5 py-3 border border-border rounded-xl"
          >
            Back to newsletter
          </Link>

        </div>

      </div>

    </main>
  )
}