type NewsletterCopy = {
  title: string
  description: string
  ctaLabel: string
  href: string
}

export default function NewsletterBar({ copy }: { copy: NewsletterCopy }) {
  return (
    <section>
      <div
        className="
          relative overflow-hidden rounded-2xl
          border border-border/80 bg-surface-1/80
          px-8 py-8 backdrop-blur-xl shadow-soft
          sm:px-10 sm:py-10

          dark:border-2 dark:border-[#22D3EE]/30
          dark:bg-gradient-to-br dark:from-[#0A0E12]/95 dark:via-[#0F1419] dark:to-[#0A0E12]/95
          dark:shadow-[0_0_50px_rgba(34,211,238,0.15),0_0_80px_rgba(255,77,157,0.08)]
        "
      >
        {/* Top hairline accent */}
        <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/35 to-transparent dark:h-[2px] dark:via-[#22D3EE]/60 dark:shadow-[0_0_10px_rgba(34,211,238,0.6)]" />

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          {/* LIGHT glows (subtle) */}
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.14),transparent_65%)] blur-[90px] dark:hidden" />
          <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-alt)/0.12),transparent_68%)] blur-[110px] dark:hidden" />

          {/* DARK glows (intense) */}
          <div className="hidden dark:block">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.25),transparent_65%)] blur-[100px]" />
            <div className="absolute -right-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,rgba(255,77,157,0.20),transparent_68%)] blur-[120px]" />
            <div className="absolute left-1/2 top-1/2 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.12),transparent_70%)] blur-[140px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050709]/30" />
          </div>
        </div>

        {/* Decorative particles (mostly dark; very subtle in light) */}
        <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-100">
          <div className="absolute left-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-accent/60 blur-[1px] shadow-[0_0_10px_rgb(var(--accent)/0.22)] dark:bg-[#22D3EE] dark:shadow-[0_0_10px_rgba(34,211,238,0.8)] dark:animate-glow" />
          <div
            className="absolute right-[18%] top-[35%] h-2 w-2 rounded-full bg-accent-alt/60 blur-[1px] shadow-[0_0_10px_rgb(var(--accent-alt)/0.20)] dark:bg-[#FF4D9D] dark:shadow-[0_0_10px_rgba(255,77,157,0.8)] dark:animate-glow"
            style={{ animationDelay: "0.8s" }}
          />
          <div
            className="absolute left-[25%] bottom-[30%] h-1 w-1 rounded-full bg-accent/45 blur-[1px] shadow-[0_0_8px_rgb(var(--accent)/0.18)] dark:bg-[#8B5CF6] dark:shadow-[0_0_8px_rgba(139,92,246,0.8)] dark:animate-glow"
            style={{ animationDelay: "1.2s" }}
          />
          <div
            className="absolute right-[15%] bottom-[25%] h-1.5 w-1.5 rounded-full bg-accent/55 blur-[1px] shadow-[0_0_8px_rgb(var(--accent)/0.20)] dark:bg-[#22D3EE] dark:shadow-[0_0_8px_rgba(34,211,238,0.8)] dark:animate-glow"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        {/* Background grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgb(var(--accent)/0.7)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--accent)/0.7)_1px,transparent_1px)] [background-size:44px_44px] dark:opacity-[0.03] dark:[background-image:linear-gradient(rgba(34,211,238,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.8)_1px,transparent_1px)] dark:[background-size:40px_40px]" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            {/* Badge */}
            <div
              className="
                mb-3 inline-flex items-center gap-1.5 rounded-full
                border border-border/80 bg-surface-2/70
                px-3 py-1 text-[10px] font-bold uppercase tracking-wider
                text-muted backdrop-blur-xl shadow-soft
                dark:border-[#22D3EE]/30 dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]
                dark:shadow-[0_0_15px_rgba(34,211,238,0.2)]
              "
            >
              <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_rgb(var(--accent)/0.28)] dark:bg-[#22D3EE] dark:shadow-[0_0_6px_rgba(34,211,238,0.8)] dark:animate-pulse" />
              Newsletter
            </div>

            <h3 className="text-xl font-semibold text-text sm:text-2xl dark:font-bold dark:text-white dark:[text-shadow:0_0_30px_rgba(34,211,238,0.2)]">
              {copy.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted dark:text-gray-300">
              {copy.description}
            </p>
          </div>

          {/* CTA Button */}
          <a
            href={copy.href}
            className="
              group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl
              bg-gradient-to-r from-accent via-accent to-accent-alt
              px-7 py-3.5 text-sm font-bold text-[rgb(var(--bg))]
              shadow-[0_14px_50px_rgb(var(--accent)/0.16)]
              transition-all hover:shadow-[0_18px_70px_rgb(var(--accent)/0.20)] hover:scale-[1.03]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg

              dark:from-[#22D3EE] dark:via-[#3BDBF0] dark:to-[#FF4D9D]
              dark:text-[#050709]
              dark:shadow-[0_0_40px_rgba(34,211,238,0.4),0_0_60px_rgba(255,77,157,0.2)]
              dark:hover:shadow-[0_0_60px_rgba(34,211,238,0.6),0_0_90px_rgba(255,77,157,0.3)]
              dark:hover:scale-[1.05]
              dark:focus-visible:ring-[#22D3EE]
              dark:focus-visible:ring-offset-[#050709]
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              {copy.ctaLabel}
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>

            {/* Shine sweep (keep, but softer in light) */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full dark:via-white/20" />
          </a>
        </div>

        {/* Corner accents */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-24 bg-gradient-to-r from-accent/45 to-transparent transition-all dark:w-32 dark:from-[#22D3EE]/60 dark:shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
        <div className="pointer-events-none absolute right-0 top-0 h-16 w-px bg-gradient-to-b from-accent-alt/25 to-transparent dark:h-20 dark:from-[#FF4D9D]/50" />
      </div>
    </section>
  )
}

