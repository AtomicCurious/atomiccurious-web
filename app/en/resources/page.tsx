import Link from "next/link"

export const metadata = {
  title: "Resources | AtomicCurious",
  description:
    "Ebooks, templates, magazine and future products designed for curious minds.",
}

export default function ResourcesPage() {
  return (
    <main className="w-full">
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-xs font-semibold tracking-wide text-muted">
          ATOMICCURIOUS · RESOURCES
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Resources for curious minds
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Ebooks, templates, a future magazine and carefully crafted products.
          Everything here is designed to help you think better, learn deeper,
          and build smarter.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/en/newsletter"
            className="rounded-xl bg-accent px-6 py-3 font-semibold text-bg transition hover:opacity-90"
          >
            Join the newsletter
          </Link>

          <Link
            href="/en"
            className="rounded-xl border border-border px-6 py-3 font-semibold text-text transition hover:bg-surface-2"
          >
            Back home
          </Link>
        </div>

        <p className="mt-12 text-sm text-muted">
          First releases coming soon.
        </p>
      </section>
    </main>
  )
}
