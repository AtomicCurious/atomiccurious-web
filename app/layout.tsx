// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AtomicCurious",
  description: "Science, technology & the future.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-[100svh] overflow-x-hidden bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  )
}
