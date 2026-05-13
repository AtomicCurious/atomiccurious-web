import type { CSSProperties, ReactNode } from "react"

type PostAccent = "atom" | "iris" | "core"

type PostShellProps = {
  children: ReactNode
  accent?: PostAccent
  intensity?: "soft" | "medium" | "cinematic"
  className?: string
}

const accentRgbByPost: Record<PostAccent, string> = {
  atom: "29 196 151",
  iris: "125 211 252",
  core: "245 158 11",
}

const atmosphereByIntensity = {
  soft: "bg-[rgba(var(--accent),0.05)]",
  medium: "bg-[rgba(var(--accent),0.08)]",
  cinematic: "bg-[rgba(var(--accent),0.14)]",
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export function PostShell({
  children,
  accent = "atom",
  intensity = "medium",
  className = "",
}: PostShellProps) {
  const isIris = accent === "iris"

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
      className={cn(
        "relative mx-auto w-full max-w-5xl",
        isIris
          ? "px-6 pb-28 pt-14 sm:px-8 lg:px-10"
          : "px-5 pb-24 pt-12 sm:px-6 lg:px-8",
        className
      )}
    >
      {/* ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Glow principal */}
        <div
          className={cn(
            "absolute left-1/2 top-0 -translate-x-1/2 rounded-full blur-3xl",
            isIris ? "h-72 w-72 opacity-45" : "h-80 w-80 opacity-70",
            atmosphereByIntensity[intensity]
          )}
        />

        {/* Glow secundario Iris */}
        {isIris ? (
          <div
            className="
              absolute right-[8%] top-[18%]
              h-56 w-56 rounded-full
              bg-[rgba(var(--accent),0.035)]
              blur-3xl
            "
          />
        ) : null}

        {/* Grid */}
        <div
          className={cn(
            "absolute inset-0",
            isIris ? "opacity-[0.018]" : "opacity-[0.03]",
            "[background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.9)_1px,transparent_0)]",
            isIris ? "[background-size:34px_34px]" : "[background-size:28px_28px]"
          )}
        />
      </div>

      {/* SURFACE */}
      <div
        className={cn(
          "ac-post-surface relative z-10 border border-white/10",
          isIris
            ? `
              rounded-[36px]
              bg-[rgba(255,255,255,0.018)]
              px-7 py-12
              sm:px-12 sm:py-14
              shadow-[0_10px_70px_rgba(0,0,0,0.22)]
            `
            : `
              rounded-[28px]
              bg-white/[0.025]
              px-6 py-10
              sm:px-10 sm:py-12
              shadow-[0_12px_60px_rgba(0,0,0,0.30)]
            `
        )}
      >
        {children}
      </div>
    </article>
  )
}