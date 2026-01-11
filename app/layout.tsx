// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import HomeThemeLock from "@/components/HomeThemeLock"

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
    <html lang="en" suppressHydrationWarning>
      {/* ✅ Themes are scoped to <body data-theme="..."> */}
      {/* ✅ Accents are scoped to <body data-accent="..."> */}
      <body
        data-accent="atom"
        // Optional: keep it explicit so first paint is always default dark tokens
        data-theme=""
        className="min-h-[100svh] overflow-x-hidden bg-bg text-text antialiased"
      >
        {/* ✅ Hard reset theme when entering Home so Home never inherits section themes */}
        <HomeThemeLock />

        {children}
      </body>
    </html>
  )
}

