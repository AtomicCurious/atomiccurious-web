"use client"

import type { ReactElement, ReactNode } from "react"
import { Children, isValidElement } from "react"
import { useEffect } from "react"

type HeroCopy = {
  eyebrow: string
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}

type LatestTile = {
  href: string
  badge: string
  badgeDot: "teal" | "pink"
  title: string
  description: string
  image?: {
    src: string
    alt: string
  }
  tags: readonly string[]
  ctaLabel: string
}

type DownloadTile = {
  href: string
  badge: string
  badgeDot: "pink"
  title: string
  description: string
  ctaLabel: string
  footnote: string
  mockTitle: string
}

type HeroTiles = {
  latest: LatestTile
  download: DownloadTile
}

export function HeroOverlay({ children }: { children: ReactNode }) {
  return <>{children}</>
}
HeroOverlay.displayName = "HeroOverlay"

type HostRowMode = "none" | "host" | "trio"

type HeroProps = {
  copy: HeroCopy
  tiles: HeroTiles
  children?: ReactNode
  hostRow?: HostRowMode
  hostRowLabel?: string
}

function HostBadge({
  who,
  title,
  subtitle,
  className,
}: {
  who: "atom" | "iris" | "core"
  title: string
  subtitle: string
  className?: string
}) {
  const icon =
    who === "atom" ? (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3c3.5 0 7 3.6 7 9s-3.5 9-7 9-7-3.6-7-9 3.5-9 7-9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.9"
        />
        <path
          d="M5.5 8.2c2.4-1.6 6.8-1.6 9.2 0M5.5 15.8c2.4 1.6 6.8 1.6 9.2 0"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.7"
          strokeLinecap="round"
        />
      </svg>
    ) : who === "iris" ? (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2l1.2 4.3 4.1-1.8-1.8 4.1L20 10.8l-4.3 1.2 1.8 4.1-4.1-1.8L12 22l-1.2-4.3-4.1 1.8 1.8-4.1L4 10.8l4.3-1.2-1.8-4.1 4.1 1.8L12 2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>
    ) : (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19c4.4 0 8-3 8-6.7 0-3.7-3.6-6.6-8-6.6s-8 3-8 6.6C4 16 7.6 19 12 19Z"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.9"
        />
        <path
          d="M9 20.5c.7 1.1 1.8 1.5 3 1.5 1.2 0 2.3-.4 3-1.5"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.6"
          strokeLinecap="round"
        />
      </svg>
    )

  return (
    <div
      className={[
        "relative overflow-hidden rounded-[22px] border border-border/70",
        "bg-surface-1/55 backdrop-blur-xl shadow-soft",
        "px-5 py-4",
        "transition hover:border-accent/25",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "inline-flex h-9 w-9 items-center justify-center rounded-xl",
            "border border-border/70 bg-bg/35 text-text/90",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
          ].join(" ")}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight text-text">{title}</div>
          <div className="mt-0.5 text-[13px] leading-relaxed text-muted">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

function Hero({ copy, tiles, children, hostRow = "none", hostRowLabel }: HeroProps) {
  const hasEyebrow = Boolean(copy.eyebrow && copy.eyebrow.trim().length > 0)

  const overlayChildren: ReactNode[] = []
  const belowChildren: ReactNode[] = []

  Children.forEach(children, (child) => {
    if (!child) return
    if (isValidElement(child) && child.type === HeroOverlay) {
      const overlayEl = child as ReactElement<{ children?: ReactNode }>
      overlayChildren.push(overlayEl.props.children)
    } else {
      belowChildren.push(child)
    }
  })

  useEffect(() => {
    if (hostRow === "none") return

    const mode = hostRow === "trio" ? "trio" : "host"
    const main = document.querySelector("main")
    if (main) main.setAttribute("data-chmode", mode)
    document.body.setAttribute("data-chmode", mode)

    return () => {
      const m = document.querySelector("main")
      if (m?.getAttribute("data-chmode") === mode) m.removeAttribute("data-chmode")
      if (document.body.getAttribute("data-chmode") === mode) document.body.removeAttribute("data-chmode")
    }
  }, [hostRow])

  const HERO_LAYOUT = {
    irisTranslateYDesktop: 7,
    subtitleMarginTop: 24,
    subtitleMaxWidth: 980,
    subtitleFontSize: "clamp(1.28rem, 3.15vw, 1.72rem)",
    subtitleLineHeight: 1.6,
    subtitleUnderlineWidth: 110,
    subtitleUnderlineMarginTop: 16,
  } as const

  const STRIP_MAX_W = "max-w-[1280px] 2xl:max-w-[1440px]"
  const STRIP_PX = "px-4 sm:px-6 lg:px-8"

  const GRID_COLS_LG = "lg:grid-cols-[minmax(332px,1fr)_244px_minmax(332px,1fr)]"
  const GRID_GAP = "gap-6 lg:gap-10"

  const CARD_MIN_H = "min-h-[260px] sm:min-h-[290px]"
  const CARD_P = "p-4"

  const CARD_BASE = [
    "group relative h-full overflow-visible rounded-[28px]",
    "bg-[#050709]/55 backdrop-blur-xl",
    "shadow-[0_0_0_1px_rgba(34,211,238,0.06),0_18px_60px_rgba(0,0,0,0.55)]",
    "transition-all duration-300",
  ].join(" ")

  const CARD_HOVER_TEAL = [
    "hover:-translate-y-0.5",
    "hover:border-[#22D3EE]/45",
    "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_22px_80px_rgba(0,0,0,0.65)]",
  ].join(" ")

  const CARD_HOVER_PINK = [
    "hover:-translate-y-0.5",
    "hover:border-[#FF4D9D]/35",
    "hover:shadow-[0_0_0_1px_rgba(255,77,157,0.10),0_22px_80px_rgba(0,0,0,0.65)]",
  ].join(" ")

  const CARD_INNER_GLOW =
    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"

  const CARD_GRID_OVERLAY = `
    pointer-events-none absolute inset-0 opacity-[0.05]
    [background-image:linear-gradient(rgba(34,211,238,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.9)_1px,transparent_1px)]
    [background-size:56px_56px]
  `

  const effectiveHostRowLabel =
    hostRowLabel ?? (hostRow === "trio" ? "ATOMICCURIOUS TEAM" : "YOUR HOST")

  return (
    <section
      className={[
        "relative w-full bg-bg isolate",
        "overflow-x-hidden overflow-y-visible",
        "lg:min-h-[calc(100svh-var(--ac-header-h,72px)-var(--ac-footer-h,56px))]",
        "lg:overflow-hidden",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg via-bg to-bg" />

        <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgb(var(--accent)/0.14),transparent_65%)] dark:hidden" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_70%_50%_at_85%_0%,rgb(var(--accent-alt)/0.12),transparent_60%)] dark:hidden" />

        <div className="absolute inset-0 z-[2] hidden dark:block">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050709] via-[#0A0E12] to-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(34,211,238,0.40),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_15%_10%,rgba(34,211,238,0.30),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_0%,rgba(255,77,157,0.35),transparent_60%)]" />
          <div className="absolute -left-20 -top-20 h-[800px] w-[800px] rounded-full bg-[rgba(34,211,238,0.25)] blur-[100px]" />
          <div className="absolute -right-20 top-0 h-[900px] w-[900px] rounded-full bg-[rgba(255,77,157,0.20)] blur-[120px]" />
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[rgba(34,211,238,0.15)] blur-[160px]" />
          <div className="absolute left-1/4 top-1/2 h-[500px] w-[500px] rounded-full bg-[rgba(139,92,246,0.07)] blur-[140px]" />
        </div>

        <div className="absolute inset-0 z-[3] opacity-25 dark:opacity-60">
          <div className="absolute left-[8.5%] top-[12%] h-3 w-3 rounded-full bg-accent/80 blur-[2px] shadow-[0_0_18px_rgb(var(--accent)/0.35)] dark:bg-[#22D3EE] dark:blur-[3px] dark:shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-glow" />
          <div
            className="absolute left-[20%] top-[30%] h-4 w-4 rounded-full bg-accent/70 blur-[2px] shadow-[0_0_20px_rgb(var(--accent)/0.30)] dark:bg-[#22D3EE] dark:blur-[3px] dark:shadow-[0_0_25px_rgba(34,211,238,0.8)] animate-glow"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute right-[8.5%] top-[12%] h-3 w-3 rounded-full bg-accent-alt/70 blur-[1.5px] shadow-[0_0_16px_rgb(var(--accent-alt)/0.28)] dark:bg-[#FF4D9D] dark:blur-[2px] dark:shadow-[0_0_18px_rgba(255,77,157,0.8)] animate-glow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute right-[20%] top-[30%] h-4 w-4 rounded-full bg-accent-alt/70 blur-[2px] shadow-[0_0_18px_rgb(var(--accent-alt)/0.30)] dark:bg-[#FF4D9D] dark:blur-[3px] dark:shadow-[0_0_22px_rgba(255,77,157,0.8)] animate-glow"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="absolute inset-0 z-[3] opacity-[0.025] [background-image:linear-gradient(rgb(var(--accent)/1)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--accent)/1)_1px,transparent_1px)] [background-size:56px_56px] dark:opacity-[0.055] dark:[background-size:50px_50px]" />

        <div className="absolute left-0 top-[18%] z-[3] h-px w-56 bg-gradient-to-r from-transparent via-accent to-transparent opacity-25 dark:h-[2px] dark:opacity-40 dark:animate-pulse" />
        <div
          className="absolute right-0 top-[55%] z-[3] h-px w-64 bg-gradient-to-l from-transparent via-accent-alt to-transparent opacity-22 dark:h-[2px] dark:opacity-40 dark:animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-10 pb-14 sm:px-6 sm:pt-12 sm:pb-16 lg:px-8 lg:pt-[56px] lg:pb-[90px]">
        <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center text-center animate-slide-up">
          {hasEyebrow ? (
            <div className="inline-flex items-center rounded-full border border-border/70 bg-surface-1/70 px-4 py-1.5 text-xs text-muted backdrop-blur-xl shadow-soft dark:border-[#22D3EE]/40 dark:bg-gradient-to-r dark:from-[#22D3EE]/15 dark:via-[#FF4D9D]/10 dark:to-[#22D3EE]/15 dark:shadow-[0_0_40px_rgba(34,211,238,0.3),inset_0_0_20px_rgba(34,211,238,0.1)]">
              {copy.eyebrow}
            </div>
          ) : null}

          <h1 className="mt-6 text-balance font-semibold tracking-tight text-text dark:font-bold dark:text-white dark:[text-shadow:0_0_70px_rgba(34,211,238,0.45),0_0_110px_rgba(255,77,157,0.28),0_2px_4px_rgba(0,0,0,0.8)] text-[clamp(2.15rem,6vw,4.5rem)] leading-[1.06]">
            {copy.headline}
          </h1>

          <div className="flex flex-col items-center" style={{ marginTop: `${HERO_LAYOUT.subtitleMarginTop}px` }}>
            <p
              className="whitespace-pre-line text-balance text-muted dark:text-gray-300"
              style={{
                maxWidth: `${HERO_LAYOUT.subtitleMaxWidth}px`,
                fontSize: HERO_LAYOUT.subtitleFontSize,
                lineHeight: HERO_LAYOUT.subtitleLineHeight,
              }}
            >
              {copy.subheadline}
            </p>
            <span
              className="block h-px rounded-full bg-gradient-to-r from-transparent via-white/55 to-transparent dark:via-[#22D3EE]/65"
              style={{
                marginTop: `${HERO_LAYOUT.subtitleUnderlineMarginTop}px`,
                width: `${HERO_LAYOUT.subtitleUnderlineWidth}px`,
              }}
            />
          </div>

          <div className="mt-7 flex w-full max-w-[360px] flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
            <a
              href={copy.primaryCta.href}
              className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-accent via-accent to-accent-alt px-8 py-4 text-base font-bold text-[rgb(var(--bg))] shadow-[0_12px_40px_rgb(var(--accent)/0.18)] transition-all hover:scale-[1.03] hover:shadow-[0_18px_60px_rgb(var(--accent)/0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:w-auto dark:from-[#22D3EE] dark:via-[#3BDBF0] dark:to-[#FF4D9D] dark:text-[#050709] dark:shadow-[0_0_50px_rgba(34,211,238,0.5),0_0_80px_rgba(255,77,157,0.3)] dark:hover:shadow-[0_0_70px_rgba(34,211,238,0.7),0_0_100px_rgba(255,77,157,0.5)]"
            >
              <span className="relative z-10 flex items-center">
                {copy.primaryCta.label}
                <span className="ml-2 transition-transform group-hover:translate-x-1">›</span>
              </span>
            </a>

            <a
              href={copy.secondaryCta.href}
              className="group inline-flex w-full items-center justify-center rounded-xl border border-border/80 bg-surface-1/70 px-8 py-4 text-base font-semibold text-text backdrop-blur-xl shadow-soft transition-all hover:border-accent/35 hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:w-auto dark:border-2 dark:border-[#22D3EE]/40 dark:bg-[#0A0E12]/60 dark:text-white dark:hover:border-[#22D3EE]/60 dark:hover:bg-[#0A0E12]/80 dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
            >
              {copy.secondaryCta.label}
              <span className="ml-2 text-muted transition-transform group-hover:translate-x-1 dark:text-gray-400">
                ›
              </span>
            </a>
          </div>

          {hostRow !== "none" ? (
            <div className="mt-7 w-full">
              <div className="mx-auto max-w-3xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-[11px] font-semibold tracking-[0.18em] text-muted/75">
                    {effectiveHostRowLabel}
                  </div>

                  <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                    <HostBadge
                      who="atom"
                      title="Atom"
                      subtitle="Curiosity + first principles."
                      className="ac-ch ac-ch-atom"
                    />
                    <HostBadge
                      who="iris"
                      title="Iris"
                      subtitle="Clarity, patterns, and ranking logic."
                      className="ac-ch ac-ch-iris"
                    />
                    <HostBadge
                      who="core"
                      title="Core"
                      subtitle="Playful learning, quizzes, and sparks."
                      className="ac-ch ac-ch-core"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative z-20 mt-6 sm:mt-8 lg:mt-[-50px]">
        <div className={["mx-auto w-full", STRIP_MAX_W, STRIP_PX].join(" ")}>
          <div className="relative">
            <div className={["grid grid-cols-1", GRID_GAP, GRID_COLS_LG].join(" ")}>
              <a
                href={tiles.download.href}
                className={[
                  "order-1",
                  CARD_BASE,
                  "border border-[#22D3EE]/25",
                  CARD_HOVER_TEAL,
                  CARD_P,
                  CARD_MIN_H,
                ].join(" ")}
              >
                <div className={CARD_INNER_GLOW}>
                  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[rgba(34,211,238,0.22)] blur-[70px]" />
                  <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[rgba(255,77,157,0.10)] blur-[80px]" />
                </div>

                <div className="hero-card-rise hero-card-rise--teal" />
                <div className={CARD_GRID_OVERLAY} />

                <div className="relative z-[3]">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/25 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22D3EE" }} />
                    {tiles.download.badge}
                  </div>

                  <h3 className="mt-2 text-balance text-lg font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#22D3EE]">
                    {tiles.download.title}
                  </h3>

                  <p className="mt-1.5 max-w-[56ch] text-[13px] leading-relaxed text-gray-300/90">
                    {tiles.download.description}
                  </p>

                  <div className="mt-3">
                    <div className="relative mx-auto h-[180px] w-full max-w-[238px]">
                      <div className="absolute left-1 top-5 w-[32%] rotate-[-11deg] opacity-60">
                        <div className="overflow-hidden rounded-[12px] border border-white/14 bg-white/5 shadow-[0_12px_32px_rgba(0,0,0,0.42)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/lead-magnets/calendario-2026-es-introduccion.webp"
                            alt="Vista previa del calendario científico"
                            className="aspect-[3/4] h-auto w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="absolute right-1 top-6 w-[32%] rotate-[11deg] opacity-60">
                        <div className="overflow-hidden rounded-[12px] border border-white/14 bg-white/5 shadow-[0_12px_32px_rgba(0,0,0,0.42)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/lead-magnets/calendario-2026-es-enero.webp"
                            alt="Página de ejemplo del calendario científico"
                            className="aspect-[3/4] h-auto w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      <div className="absolute left-1/2 top-0 z-10 w-[41%] -translate-x-1/2">
                        <div className="overflow-hidden rounded-[14px] border border-white/16 bg-white/6 shadow-[0_16px_42px_rgba(0,0,0,0.50)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/lead-magnets/calendario-2026-es-portada.webp"
                            alt="Portada del calendario científico 2026"
                            className="aspect-[3/4] h-auto w-full object-cover"
                            loading="eager"
                          />
                        </div>
                      </div>

                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_44%_at_50%_18%,rgba(34,211,238,0.18),transparent_58%)]" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_42%_30%_at_52%_28%,rgba(255,77,157,0.10),transparent_62%)]" />
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-gray-400">{tiles.download.footnote}</p>
                </div>
              </a>

              {overlayChildren.length > 0 ? (
                <div className="order-2 pointer-events-none flex justify-center lg:hidden">
                  <div className="relative w-full">
                    <div className="mx-auto w-full max-w-[360px] py-2">{overlayChildren}</div>
                  </div>
                </div>
              ) : null}

              <div className="order-2 hidden lg:block" />

              <a
                href={tiles.latest.href}
                className={[
                  "order-3",
                  "group relative h-full overflow-visible rounded-[28px]",
                  "bg-[#050709]/55 backdrop-blur-xl",
                  "border border-[#FF4D9D]/18",
                  "shadow-[0_0_0_1px_rgba(255,77,157,0.06),0_18px_60px_rgba(0,0,0,0.55)]",
                  "transition-all duration-300",
                  CARD_HOVER_PINK,
                  CARD_P,
                  CARD_MIN_H,
                ].join(" ")}
              >
                <div className={CARD_INNER_GLOW}>
                  <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[rgba(34,211,238,0.12)] blur-[80px]" />
                  <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[rgba(255,77,157,0.18)] blur-[70px]" />
                </div>

                <div className="hero-card-rise hero-card-rise--pink" />
                <div className={CARD_GRID_OVERLAY} />

                <div className="relative z-[3] flex h-full flex-col">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#FF4D9D]/18 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#FF4D9D" }} />
                    {tiles.latest.badge}
                  </div>

                  <h3 className="mt-3 whitespace-nowrap text-[1.28rem] font-semibold leading-[1.12] tracking-tight text-white transition-colors duration-300 group-hover:text-[#FF4D9D] sm:text-[1.38rem]">
                    {tiles.latest.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-relaxed text-gray-300/88">
                    {tiles.latest.description}
                  </p>

                  {tiles.latest.image ? (
                    <div className="mt-4 flex justify-center">
                      <div
                        className="relative h-[140px] w-[300px] overflow-hidden rounded-[16px] border border-white/12 shadow-[0_14px_36px_rgba(0,0,0,0.38)]
                        bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(34,211,238,0.28),transparent_70%),
                        radial-gradient(ellipse_50%_70%_at_50%_50%,rgba(255,77,157,0.22),transparent_75%),
                        #0A0E12]"
                      >
                        <div
                          className="pointer-events-none absolute inset-0
                          bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(34,211,238,0.12),transparent_70%)]"
                        />

                        <img
                          src={tiles.latest.image.src}
                          alt={tiles.latest.image.alt}
                          className="relative z-[2] h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {tiles.latest.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 text-[13px] leading-relaxed text-gray-300/88">
                    {tiles.latest.ctaLabel}
                  </div>
                </div>
              </a>
            </div>

            {overlayChildren.length > 0 ? (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden justify-center lg:flex">
                <div
                  id="ac-iris-anchor"
                  className="relative"
                  style={{ transform: `translateY(${HERO_LAYOUT.irisTranslateYDesktop}px)` }}
                >
                  {overlayChildren}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {belowChildren.length > 0 ? (
        <div className="relative z-20 mx-auto mt-6 w-full max-w-5xl px-4 sm:mt-8 sm:px-6 lg:px-8">
          {belowChildren}
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-bg" />
    </section>
  )
}

;(Hero as any).Overlay = HeroOverlay
export default Hero as typeof Hero & { Overlay: typeof HeroOverlay }