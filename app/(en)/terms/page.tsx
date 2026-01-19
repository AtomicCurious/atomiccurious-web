// app/(en)/terms/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://atomiccurious.com"),
  title: "Terms & Conditions · AtomicCurious",
  description: "Rules for using AtomicCurious and how our content may be used.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-text">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Terms &amp; Conditions</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>By accessing or using AtomicCurious, you agree to the following terms.</p>

        <p>
          All content published on this site is provided for{" "}
          <strong>educational and informational purposes only</strong>. It does not
          constitute professional, medical, legal, or financial advice.
        </p>

        <p>
          Unless explicitly stated otherwise, all content—including text, visuals, design,
          and downloadable materials—is the intellectual property of AtomicCurious and may
          not be reproduced, redistributed, or republished without permission.
        </p>

        <p>
          Free resources and downloads are provided “as is,” without guarantees of accuracy,
          outcomes, or suitability for a specific purpose.
        </p>

        <p>
          AtomicCurious may include links to external websites. We are not responsible for
          the content, policies, or practices of third-party sites.
        </p>

        <p>
          These terms may be updated from time to time. Continued use of the site implies
          acceptance of the most recent version.
        </p>
      </div>
    </section>
  )
}
