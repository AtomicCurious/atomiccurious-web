type FeatureTile = {
  tag?: string
  title: string
  description: string
  href: string
}

export default function FeatureTiles({ tiles }: { tiles: FeatureTile[] }) {
  return (
    <section className="grid gap-6 sm:grid-cols-3">
      {tiles.map((tile, index) => (
        <a
          key={tile.title}
          href={tile.href}
          className="
            group relative overflow-hidden rounded-2xl
            border border-border/80
            bg-surface-1/80
            p-8 backdrop-blur-xl transition-all duration-300
            hover:border-accent/35 hover:bg-surface-2
            hover:shadow-[0_18px_60px_rgb(var(--accent)/0.10)]
            hover:scale-[1.01]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg

            dark:border-2 dark:border-[#22D3EE]/20
            dark:bg-gradient-to-br dark:from-[#0A0E12]/90 dark:via-[#0F1419]/95 dark:to-[#0A0E12]/90
            dark:hover:border-[#22D3EE]/50
            dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.2),0_0_60px_rgba(255,77,157,0.1)]
            dark:hover:scale-[1.02]
            dark:focus-visible:ring-[#22D3EE]/70
          "
        >
          {/* Hover background glows (subtle in light, strong in dark) */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {/* LIGHT */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent)/0.10),transparent_60%)] dark:hidden" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgb(var(--accent-alt)/0.08),transparent_65%)] dark:hidden" />
            {index === 1 && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(var(--accent-alt)/0.06),transparent_70%)] dark:hidden" />
            )}

            {/* DARK */}
            <div className="absolute inset-0 hidden dark:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,77,157,0.12),transparent_65%)]" />
              {index === 1 && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.08),transparent_70%)]" />
              )}
            </div>
          </div>

          {/* Top hairline accent */}
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-500 group-hover:via-accent/35 dark:h-[2px] dark:group-hover:via-[#22D3EE]/60 dark:group-hover:shadow-[0_0_10px_rgba(34,211,238,0.6)]" />

          {/* Decorative particles (keep mostly dark) */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <div className="absolute right-[15%] top-[20%] h-1 w-1 rounded-full bg-accent/70 blur-[1px] shadow-[0_0_8px_rgb(var(--accent)/0.30)] dark:bg-[#22D3EE] dark:shadow-[0_0_8px_rgba(34,211,238,0.8)] dark:animate-glow" />
            <div
              className="absolute left-[20%] top-[70%] h-1.5 w-1.5 rounded-full bg-accent-alt/70 blur-[1px] shadow-[0_0_8px_rgb(var(--accent-alt)/0.26)] dark:bg-[#FF4D9D] dark:shadow-[0_0_8px_rgba(255,77,157,0.8)] dark:animate-glow"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute right-[25%] bottom-[25%] h-1 w-1 rounded-full bg-accent/50 blur-[1px] shadow-[0_0_6px_rgb(var(--accent)/0.22)] dark:bg-[#8B5CF6] dark:shadow-[0_0_6px_rgba(139,92,246,0.8)] dark:animate-glow"
              style={{ animationDelay: "0.8s" }}
            />
          </div>

          {/* Background grid (very subtle in light, visible in dark) */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.018] transition-opacity duration-500 group-hover:opacity-[0.035] [background-image:linear-gradient(rgb(var(--accent)/0.7)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--accent)/0.7)_1px,transparent_1px)] [background-size:34px_34px] dark:opacity-[0.02] dark:group-hover:opacity-[0.05] dark:[background-image:linear-gradient(rgba(34,211,238,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.8)_1px,transparent_1px)] dark:[background-size:30px_30px]" />

          <div className="relative">
            {tile.tag && (
              <span
                className="
                  inline-flex items-center gap-1.5 rounded-full
                  border border-border/80 bg-surface-2/70
                  px-3 py-1 text-[11px] font-bold uppercase tracking-wider
                  text-muted backdrop-blur-xl shadow-soft
                  dark:border-[#22D3EE]/30 dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]
                  dark:shadow-[0_0_15px_rgba(34,211,238,0.2)]
                "
              >
                <span className="h-1 w-1 rounded-full bg-accent shadow-[0_0_6px_rgb(var(--accent)/0.35)] dark:bg-[#22D3EE] dark:shadow-[0_0_6px_rgba(34,211,238,0.8)] dark:animate-pulse" />
                {tile.tag}
              </span>
            )}

            <h3 className="mt-5 text-xl font-semibold tracking-tight text-text transition-all duration-300 group-hover:text-text dark:font-bold dark:text-white dark:group-hover:text-[#22D3EE] dark:group-hover:[text-shadow:0_0_20px_rgba(34,211,238,0.4)]">
              {tile.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-text/90 dark:text-gray-300 dark:group-hover:text-gray-200">
              {tile.description}
            </p>

            {/* CTA */}
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent/80 transition-all duration-300 group-hover:text-accent group-hover:gap-3 dark:text-[#22D3EE]/80 dark:group-hover:text-[#22D3EE]">
              <span>Explore</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>

          {/* Bottom accent line (subtle in light, strong in dark) */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent/60 to-transparent transition-all duration-500 group-hover:w-24 dark:from-[#22D3EE]/80 dark:shadow-[0_0_8px_rgba(34,211,238,0.6)]" />

          {/* Corner accent (mostly dark) */}
          <div className="pointer-events-none absolute right-0 top-0 h-0 w-px bg-gradient-to-b from-accent-alt/35 to-transparent transition-all duration-500 group-hover:h-16 dark:from-[#FF4D9D]/60" />
        </a>
      ))}
    </section>
  )
}
