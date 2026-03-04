// app/(en)/calendar/page.tsx
import type { Metadata } from "next"
import CalendarLeadMagnetFormEn from "@/components/lead-magnets/CalendarLeadMagnetFormEn"

export const metadata: Metadata = {
  title: "Science Calendar 2026 — AtomicCurious",
  description: "Download the Science Calendar 2026 for free. Direct link by email.",
  alternates: {
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
    <main className="relative w-full bg-bg overflow-x-hidden no-scrollbar">
      {/* Outer container (responsive + no wasted space on wide screens) */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-5 pb-10 sm:px-6 sm:pt-6 sm:pb-12 lg:px-8">
        <header className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Science Calendar 2026
          </h1>
        </header>

        <section className="mt-6 sm:mt-8">
          <CalendarLeadMagnetFormEn />
        </section>
      </div>
    </main>
  )
}