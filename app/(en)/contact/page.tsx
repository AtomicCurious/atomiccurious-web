import Link from "next/link"
import ContactFormEn from "@/components/sections/ContactFormEn"

export const metadata = {
  title: "Contact | AtomicCurious",
  description:
    "Collaborations, feedback, press, or thoughtful conversations. We read every message.",
}

export default function Page() {
  return (
    <main className="w-full">
      <section className="relative w-full overflow-hidden bg-bg">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgb(var(--accent)/0.14),transparent_65%)] dark:hidden" />
          <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_62%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
          <header className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-wide text-muted">
              ATOMICCURIOUS · CONTACT
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Get in touch
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
              For collaborations, feedback, press, or thoughtful conversations.
              We read every message.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/en/newsletter"
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-surface-1 px-5 py-2 text-sm font-semibold text-text shadow-soft transition hover:border-accent/35 hover:bg-surface-2"
              >
                Join the newsletter
              </Link>

              <Link
                href="/en"
                className="inline-flex items-center justify-center rounded-full border border-border/80 bg-bg px-5 py-2 text-sm font-semibold text-text shadow-soft transition hover:border-accent/35 hover:bg-surface-2"
              >
                Back home
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted">
              Prefer email?{" "}
              <a
                className="font-semibold text-text underline decoration-border/70 underline-offset-4 hover:decoration-accent/50"
                href="mailto:hello@atomiccurious.com"
              >
                hello@atomiccurious.com
              </a>
            </p>
          </header>

          <div className="mx-auto mt-10 max-w-3xl">
            <ContactFormEn />
          </div>
        </div>
      </section>
    </main>
  )
}
