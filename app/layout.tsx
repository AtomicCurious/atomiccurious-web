// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import HomeThemeLock from "@/components/HomeThemeLock"

export const metadata: Metadata = {
  title: "AtomicCurious",
  description: "Science, technology & the future.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // ✅ Set a real default. Avoid empty attribute = “no theme”
        data-theme="dark"
        className="min-h-[100svh] overflow-x-hidden bg-bg text-text antialiased"
      >
        {/* ✅ Hard reset theme when entering Home so Home never inherits section themes */}
        <HomeThemeLock />

        {children}
      </body>
    </html>
  )
}
