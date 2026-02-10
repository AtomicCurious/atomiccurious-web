// app/(en)/calendar/page.tsx
import type { Metadata } from "next"
import CalendarLeadMagnetFormEn from "@/components/lead-magnets/CalendarLeadMagnetFormEn"

export const metadata: Metadata = {
  title: "Science Calendar 2026 — AtomicCurious",
  description: "Download the Science Calendar 2026 for free. Direct link by email.",
  alternates: {
    // EN lives in root, so canonical must be /calendar (not /en/calendar)
    canonical: "/calendar",
    languages: {
      en: "/calendar",
      es: "/es/calendario",
    },
  },
  openGraph: {
    title: "Science Calendar 2026 — AtomicCurious",
    description: "Download the Science Calendar 2026 for free. Direct link by email.",
    url: "/calendar",
    siteName: "AtomicCurious",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Science Calendar 2026 — AtomicCurious",
    description: "Download the Science Calendar 2026 for free. Direct link by email.",
  },
}

export default function Page() {
  return (
    // ✅ Scroll natural, clean, optional scrollbar hidden (scoped)
    <main className="relative w-full bg-bg overflow-x-hidden no-scrollbar">
      <div className="mx-auto w-full max-w-[1280px] px-3 pt-7 sm:px-6 sm:pt-9 lg:px-8">
        <header className="mx-auto w-full max-w-3xl text-center">
          <p className="text-[11px] font-semibold tracking-wide text-text/70">
            ATOMICCURIOUS · FREE DOWNLOAD
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Science Calendar 2026
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-text/80">
            We’ll email you a direct download link.
          </p>
        </header>

        <section className="mt-4 pb-8">
          <CalendarLeadMagnetFormEn />
        </section>
      </div>
    </main>
  )
}
