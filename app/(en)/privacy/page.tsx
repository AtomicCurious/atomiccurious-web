// app/(en)/privacy/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://atomiccurious.com"),
  title: "Privacy Policy · AtomicCurious",
  description: "How AtomicCurious collects, uses, and protects your information.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-text">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Privacy Policy</h1>

      <div className="space-y-4 text-sm leading-relaxed text-muted">
        <p>AtomicCurious respects your privacy.</p>

        <p>
          We collect only the information necessary to operate this site and improve the
          experience, such as:
        </p>

        <ul className="list-disc pl-5">
          <li>Email address (if you subscribe to the newsletter)</li>
          <li>Basic analytics data (pages visited, device type, general location)</li>
          <li>Information you voluntarily provide through contact forms</li>
        </ul>

        <p>
          We <strong>do not sell</strong>, rent, or trade your personal data.
        </p>

        <p>
          Emails are used only to share updates, new content, or resources related to
          AtomicCurious. You can unsubscribe at any time using the link included in every
          email.
        </p>

        <p>
          Third-party services (such as analytics or email providers) may process limited
          data on our behalf, strictly for operational purposes.
        </p>

        <p>If you have questions about how your data is handled, you can contact us at any time.</p>
      </div>
    </section>
  )
}
