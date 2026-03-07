import NewsletterSignup from "./_components/NewsletterSignup"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Newsletter | AtomicCurious",
  description:
    "Early access to new ideas, tools and discoveries. One calm email every 15 days.",
  alternates: {
    canonical: "/newsletter",
    languages: {
      en: "/newsletter",
      es: "/es/newsletter",
    },
  },
}

const LAUNCH_DATE = "March 21, 2026"

const COMING_SOON_CSS = `
.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(var(--accent),0.10), transparent 55%),
    radial-gradient(circle at 70% 40%, rgba(var(--accent-alt),0.08), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 55%);
  mix-blend-mode: normal;
}
`

function ComingSoonNewsletter() {
  return (
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
                  alt="Core waiting for the Newsletter to launch"
                  fill
                  sizes="(min-width: 1024px) 960px, 92vw"
                  className="object-cover"
                  priority
                />

                <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] bg-black/35" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  COMING SOON
                </div>
              </div>
            </div>

            <div className="relative mt-6 text-center">
              <p className="text-xs font-semibold tracking-wide text-muted">
                ATOMICCURIOUS · NEWSLETTER
              </p>

              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                Newsletter
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
                Early access to new ideas, tools and discoveries.
              </p>

              <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/25 px-4 py-2 text-xs font-semibold text-text shadow-soft backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                Launching <span className="text-text">{LAUNCH_DATE}</span>
              </div>

              <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
                One calm email every 15 days. Clear. Useful. No noise.
              </p>

              <div className="mx-auto mt-7 max-w-xl">
                <NewsletterSignup />
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/posts" className="btn">
                  Browse posts →
                </Link>

                <Link href="/start-here" className="btn">
                  Start here →
                </Link>

                <Link href="/" className="btn">
                  Back home
                </Link>
              </div>

              <p className="mx-auto mt-4 max-w-xl text-xs text-muted">
                By subscribing you agree to receive AtomicCurious emails. You
                can unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: COMING_SOON_CSS }} />
      <ComingSoonNewsletter />
    </main>
  )
}