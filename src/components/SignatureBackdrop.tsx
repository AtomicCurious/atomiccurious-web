// src/components/SignatureBackdrop.tsx
"use client"

import { usePathname } from "next/navigation"

export default function SignatureBackdrop({
  enabledOnHome = false,
}: {
  enabledOnHome?: boolean
}) {
  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/es"

  if (isHome && !enabledOnHome) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient (theme controls bg via --bg, so keep this subtle) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)] opacity-60" />

      {/* Editorial grid (very subtle, theme-neutral) */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 78%)",
        }}
      />

      {/* Accent glows (your rule: energy comes from accent) */}
      <div className="absolute -left-40 -top-44 h-[620px] w-[920px] rounded-full blur-[90px]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(var(--accent)/0.22),transparent_70%)]" />
      </div>

      <div className="absolute -right-44 top-[18%] h-[560px] w-[780px] rounded-full blur-[100px] opacity-80">
        <div className="h-full w-full bg-[radial-gradient(circle_at_70%_45%,rgba(var(--accent)/0.14),transparent_72%)]" />
      </div>

      {/* Secondary “brand spice” glow (optional, low) */}
      <div className="absolute left-[30%] bottom-[-220px] h-[520px] w-[720px] rounded-full blur-[120px] opacity-35">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--accent-alt)/0.12),transparent_70%)]" />
      </div>

      {/* Vignette (keeps premium focus, works on light too if subtle) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,transparent_55%,rgba(0,0,0,0.30)_100%)] opacity-40" />
    </div>
  )
}
