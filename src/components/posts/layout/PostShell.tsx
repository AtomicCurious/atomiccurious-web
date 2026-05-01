import type { CSSProperties, ReactNode } from "react"

type PostAccent = "atom" | "iris" | "core"

type PostShellProps = {
  children: ReactNode
  accent?: PostAccent
  intensity?: "soft" | "medium" | "cinematic"
  className?: string
}

const accentRgbByPost: Record<PostAccent, string> = {
  atom: "29 196 151", // verde
  iris: "125 211 252", // azul
  core: "245 158 11", // ámbar/naranja
}

const atmosphereByIntensity = {
  soft: "bg-[rgba(var(--accent),0.05)]",
  medium: "bg-[rgba(var(--accent),0.08)]",
  cinematic: "bg-[rgba(var(--accent),0.14)]",
}

export function PostShell({
  children,
  accent = "atom",
  intensity = "medium",
  className = "",
}: PostShellProps) {
  return (
    <article
      data-post-shell
      data-accent={accent}
      data-intensity={intensity}
      style={
        {
          "--accent": accentRgbByPost[accent],
        } as CSSProperties
      }
      className={[
        "relative mx-auto w-full max-w-4xl px-5 pb-24 pt-12 sm:px-6 lg:px-8",
        className,
      ].join(" ")}
    >
      {/* ATMOSPHERE (fondo suave) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Glow central */}
        <div
          className={[
            "absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl opacity-70",
            atmosphereByIntensity[intensity],
          ].join(" ")}
        />

        {/* Grid ultra sutil */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.9)_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      {/* SURFACE (contenido principal) */}
      <div
        className="
          ac-post-surface
          relative z-10
          rounded-[28px]
          border border-white/10
          bg-white/[0.025]
          px-6 py-10
          sm:px-10 sm:py-12
          shadow-[0_12px_60px_rgba(0,0,0,0.30)]
        "
      >
        {children}
      </div>
    </article>
  )
}