// app/(en)/cookies/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://atomiccurious.com"),
  title: "Cookies Policy · AtomicCurious",
  description: "How AtomicCurious uses cookies and how you can control them.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cookies" },
}

export default function CookiesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-text">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Cookies Policy</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>
          AtomicCurious uses cookies to ensure the site functions properly and to better
          understand how visitors interact with content.
        </p>

        <p>Cookies may be used to:</p>

        <ul className="list-disc pl-5">
          <li>Enable essential site functionality</li>
          <li>Measure general usage patterns through analytics</li>
          <li>Improve performance and overall user experience</li>
        </ul>

        <p>
          AtomicCurious does <strong>not</strong> use cookies for advertising, retargeting,
          or intrusive tracking.
        </p>

        <p>
          You can control or disable cookies through your browser settings. Please note
          that disabling certain cookies may affect how the site functions.
        </p>

        <p>
          By continuing to browse AtomicCurious, you consent to the use of cookies as
          described in this policy.
        </p>
      </div>
    </section>
  )
}
