// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import Script from "next/script"
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
        <Script
          id="amazon-onelink-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.amzn_assoc_placement = "adunit0";
              window.amzn_assoc_tracking_id = "atomiccurious-20";
              window.amzn_assoc_ad_mode = "manual";
              window.amzn_assoc_ad_type = "smart";
              window.amzn_assoc_marketplace = "amazon";
              window.amzn_assoc_region = "US";
              window.amzn_assoc_linkid = "atomiccurious";
            `,
          }}
        />

        <Script
          id="amazon-onelink-script"
          strategy="afterInteractive"
          src="https://z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"
        />

        <HomeThemeLock />
        {children}
      </body>
    </html>
  )
}