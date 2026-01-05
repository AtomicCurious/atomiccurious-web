import type { ReactNode } from "react"

type HeroCopy = {
  eyebrow: string
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

export default function Hero({
  copy,
  children,
}: {
  copy: HeroCopy
  children?: ReactNode
}) {
  const hasEyebrow = Boolean(copy.eyebrow && copy.eyebrow.trim().length > 0)

  return (
    <section className="relative w-full overflow-hidden bg-bg">
      {/* Background (theme-aware) */}
      <div className="pointer-events-none absolute inset-0">
        {/* Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />

        {/* LIGHT: paper glow (subtle) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgb(var(--accent)/0.14),transparent_65%)] dark:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_0%,rgb(var(--accent-alt)/0.12),transparent_60%)] dark:hidden" />

        {/* DARK: your ultra vibrant neon layers */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050709] via-[#0A0E12] to-bg" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(34,211,238,0.40),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_15%_10%,rgba(34,211,238,0.30),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_0%,rgba(255,77,157,0.35),transparent_60%)]" />

          <div className="absolute -left-20 -top-20 h-[800px] w-[800px] rounded-full bg-[rgba(34,211,238,0.25)] blur-[100px]" />
          <div className="absolute -right-20 top-0 h-[900px] w-[900px] rounded-full bg-[rgba(255,77,157,0.20)] blur-[120px]" />
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[rgba(34,211,238,0.15)] blur-[160px]" />
          <div className="absolute left-1/4 top-1/2 h-[500px] w-[500px] rounded-full bg-[rgba(139,92,246,0.12)] blur-[140px]" />
        </div>

        {/* Particles (subtle in light, strong in dark) */}
        <div className="absolute inset-0 opacity-25 dark:opacity-60">
          {/* teal */}
          <div className="absolute left-[8%] top-[12%] h-3 w-3 rounded-full bg-accent/80 blur-[2px] shadow-[0_0_18px_rgb(var(--accent)/0.35)] dark:bg-[#22D3EE] dark:blur-[3px] dark:shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-glow" />
          <div
            className="absolute left-[65%] top-[35%] h-4 w-4 rounded-full bg-accent/70 blur-[2px] shadow-[0_0_20px_rgb(var(--accent)/0.30)] dark:bg-[#22D3EE] dark:blur-[3px] dark:shadow-[0_0_25px_rgba(34,211,238,0.8)] animate-glow"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute left-[18%] top-[55%] h-2.5 w-2.5 rounded-full bg-accent/70 blur-[1.5px] shadow-[0_0_16px_rgb(var(--accent)/0.30)] dark:bg-[#22D3EE] dark:blur-[2px] dark:shadow-[0_0_18px_rgba(34,211,238,0.8)] animate-glow"
            style={{ animationDelay: "0.5s" }}
          />

          {/* magenta */}
          <div
            className="absolute right-[12%] top-[20%] h-2.5 w-2.5 rounded-full bg-accent-alt/70 blur-[1.5px] shadow-[0_0_16px_rgb(var(--accent-alt)/0.28)] dark:bg-[#FF4D9D] dark:blur-[2px] dark:shadow-[0_0_18px_rgba(255,77,157,0.8)] animate-glow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute right-[22%] top-[65%] h-3 w-3 rounded-full bg-accent-alt/70 blur-[2px] shadow-[0_0_18px_rgb(var(--accent-alt)/0.30)] dark:bg-[#FF4D9D] dark:blur-[3px] dark:shadow-[0_0_22px_rgba(255,77,157,0.8)] animate-glow"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* Grid (very subtle in light, visible in dark) */}
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgb(var(--accent)/1)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--accent)/1)_1px,transparent_1px)] [background-size:56px_56px] dark:opacity-[0.08] dark:[background-size:50px_50px]" />

        {/* Data lines (subtle in light, animated in dark) */}
        <div className="absolute left-0 top-[18%] h-px w-56 bg-gradient-to-r from-transparent via-accent to-transparent opacity-25 dark:h-[2px] dark:opacity-40 dark:animate-pulse" />
        <div
          className="absolute right-0 top-[55%] h-px w-64 bg-gradient-to-l from-transparent via-accent-alt to-transparent opacity-22 dark:h-[2px] dark:opacity-40 dark:animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[92svh] w-full max-w-6xl items-center px-6 py-12 sm:px-10 sm:py-20">
        <div className="w-full animate-slide-up">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Eyebrow (only if text exists) */}
            {hasEyebrow ? (
              <div className="inline-flex items-center rounded-full border border-border/70 bg-surface-1/70 px-4 py-1.5 text-xs text-muted backdrop-blur-xl shadow-soft dark:border-[#22D3EE]/40 dark:bg-gradient-to-r dark:from-[#22D3EE]/15 dark:via-[#FF4D9D]/10 dark:to-[#22D3EE]/15 dark:shadow-[0_0_40px_rgba(34,211,238,0.3),inset_0_0_20px_rgba(34,211,238,0.1)]">
                {copy.eyebrow}
              </div>
            ) : null}

            {/* Headline */}
            <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight text-text sm:text-6xl sm:leading-[1.08] dark:font-bold dark:text-white dark:[text-shadow:0_0_80px_rgba(34,211,238,0.5),0_0_120px_rgba(255,77,157,0.3),0_2px_4px_rgba(0,0,0,0.8)]">
              {copy.headline}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg dark:text-gray-300">
              {copy.subheadline}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={copy.primaryCta.href}
                className="
                  group relative inline-flex items-center justify-center overflow-hidden rounded-xl
                  bg-gradient-to-r from-accent via-accent to-accent-alt
                  px-7 py-3.5 text-sm font-bold text-[rgb(var(--bg))]
                  shadow-[0_12px_40px_rgb(var(--accent)/0.18)]
                  transition-all hover:shadow-[0_18px_60px_rgb(var(--accent)/0.22)] hover:scale-[1.03]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  dark:from-[#22D3EE] dark:via-[#3BDBF0] dark:to-[#FF4D9D]
                  dark:text-[#050709]
                  dark:shadow-[0_0_50px_rgba(34,211,238,0.5),0_0_80px_rgba(255,77,157,0.3)]
                  dark:hover:shadow-[0_0_70px_rgba(34,211,238,0.7),0_0_100px_rgba(255,77,157,0.5)]
                "
              >
                <span className="relative z-10 flex items-center">
                  {copy.primaryCta.label}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    ›
                  </span>
                </span>
              </a>

              <a
                href={copy.secondaryCta.href}
                className="
                  group inline-flex items-center justify-center rounded-xl
                  border border-border/80 bg-surface-1/70 px-7 py-3.5
                  text-sm font-semibold text-text backdrop-blur-xl shadow-soft transition-all
                  hover:border-accent/35 hover:bg-surface-2
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  dark:border-2 dark:border-[#22D3EE]/40 dark:bg-[#0A0E12]/60 dark:text-white
                  dark:hover:border-[#22D3EE]/60 dark:hover:bg-[#0A0E12]/80 dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]
                "
              >
                {copy.secondaryCta.label}
                <span className="ml-2 text-muted transition-transform group-hover:translate-x-1 dark:text-gray-400">
                  ›
                </span>
              </a>
            </div>
          </div>

          {/* Children (MeetTheMinds) */}
          {children ? <div className="mt-16 sm:mt-20">{children}</div> : null}
        </div>
      </div>

      {/* Fade to content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-bg/80 to-bg" />
    </section>
  )
}
