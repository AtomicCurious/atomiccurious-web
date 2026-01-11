import Link from "next/link"

export const metadata = {
  title: "Community | AtomicCurious",
  description:
    "The AtomicCurious community: discussions, events, and future private spaces.",
}

export default function CommunityPage() {
  return (
    <main className="w-full">
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-muted">
          ATOMICCURIOUS · COMMUNITY
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          A universe built together
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          AtomicCurious is more than content. This space will host discussions,
          private drops, events, and ways to connect with people who are driven
          by curiosity and learning.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/en/newsletter"
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-bg transition hover:opacity-90"
          >
            Stay in the loop
          </Link>

          <Link
            href="/en"
            className="rounded-xl border border-border px-6 py-3 font-semibold text-text transition hover:bg-surface-2"
          >
            Back home
          </Link>
        </div>

        <p className="mt-12 text-sm text-muted">
          Community features will open gradually.
        </p>
      </section>
    </main>
  )
}
