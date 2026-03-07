import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Unsubscribed | AtomicCurious",
  description:
    "You have been unsubscribed from the AtomicCurious newsletter.",
}

export default function Page() {
  return (
    <main className="w-full">
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">

        <Image
          src="/images/sections/Community/Core_Secciones_Inactivas.webp"
          alt="Core after newsletter unsubscribe"
          width={800}
          height={450}
          className="mx-auto rounded-2xl"
        />

        <h1 className="mt-10 text-4xl font-semibold text-text">
          You have been unsubscribed
        </h1>

        <p className="mt-4 text-lg text-muted">
          You will no longer receive newsletter emails from AtomicCurious.
        </p>

        <p className="mt-2 text-muted">
          You can subscribe again anytime.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">

          <Link href="/newsletter" className="btn">
            Subscribe again →
          </Link>

          <Link href="/posts" className="btn">
            Browse posts →
          </Link>

          <Link href="/" className="btn">
            Back home
          </Link>

        </div>

      </section>
    </main>
  )
}