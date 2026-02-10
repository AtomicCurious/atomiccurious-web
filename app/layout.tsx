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
        suppressHydrationWarning
        data-theme="dark"
        className="min-h-[100svh] overflow-x-hidden bg-bg text-text antialiased"
      >
        <HomeThemeLock />
        {children}
      </body>
    </html>
  )
}
