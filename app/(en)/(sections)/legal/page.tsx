// app/(en)/legal/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://atomiccurious.com"),
  title: "Legal Notice · AtomicCurious",
  description: "Copyright, usage, and legal information for AtomicCurious.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal" },
}

export default function LegalPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-text">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Legal Notice</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>
          AtomicCurious is an independent editorial project focused on science, technology,
          and curiosity-driven exploration.
        </p>

        <p>
          All content published on this site—including text, visuals, design, and original
          materials—is protected by applicable copyright and intellectual property laws.
        </p>

        <p>
          Unauthorized reproduction, distribution, or commercial use of any content from
          AtomicCurious is prohibited without prior written permission.
        </p>

        <p>AtomicCurious operates internationally and provides content for a global audience.</p>

        <p>
          For legal inquiries, rights requests, or content-related concerns, please contact
          AtomicCurious through the official contact channels listed on this site.
        </p>
      </div>
    </section>
  )
}
