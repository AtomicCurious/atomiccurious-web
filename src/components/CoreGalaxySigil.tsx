// src/components/CoreGalaxySigil.tsx
"use client"

import { useEffect, useMemo, useRef } from "react"

type Props = {
  className?: string
  energy?: number
  speed?: number
  density?: number
  ariaLabel?: string
  onClick?: () => void
}

type ThemeName = "light" | "dark" | "cosmic" | "ocean" | "mocha" | "unknown"

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

function readTheme(): ThemeName {
  try {
    const dt =
      (document.documentElement.getAttribute("data-theme") ||
        document.body.getAttribute("data-theme") ||
        "") as ThemeName

    if (dt === "light" || dt === "dark" || dt === "cosmic" || dt === "ocean" || dt === "mocha")
      return dt
  } catch {
    // ignore
  }
  return "unknown"
}

function rgba(c: { r: number; g: number; b: number }, a: number) {
  return `rgba(${c.r},${c.g},${c.b},${a})`
}

export default function CoreGalaxySigil({
  className = "",
  energy = 1.0,
  speed = 1.0,
  density = 1.0, // kept for API compatibility (not used)
  ariaLabel = "Go to Home",
  onClick,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let W = 1
    let H = 1
    let CX = 0
    let CY = 0
    let R = 0

    let lastThemeSample = 0
    let themeName: ThemeName = "unknown"

    // ✅ Theme-fixed palettes (never reads accent)
    const PALETTES: Record<
      ThemeName,
      {
        a: { r: number; g: number; b: number }
        b: { r: number; g: number; b: number }
        c: { r: number; g: number; b: number }
        nucleus: { r: number; g: number; b: number }
        glow: { r: number; g: number; b: number }
        ink: { r: number; g: number; b: number }
      }
    > = {
      dark: {
        a: { r: 220, g: 224, b: 235 },
        b: { r: 178, g: 196, b: 228 },
        c: { r: 198, g: 184, b: 232 },
        nucleus: { r: 248, g: 250, b: 255 },
        glow: { r: 255, g: 255, b: 255 },
        ink: { r: 24, g: 24, b: 28 },
      },
      cosmic: {
        a: { r: 210, g: 232, b: 255 },
        b: { r: 198, g: 182, b: 255 },
        c: { r: 255, g: 186, b: 232 },
        nucleus: { r: 250, g: 252, b: 255 },
        glow: { r: 210, g: 240, b: 255 },
        ink: { r: 24, g: 24, b: 28 },
      },
      ocean: {
        a: { r: 206, g: 246, b: 252 },
        b: { r: 170, g: 212, b: 255 },
        c: { r: 178, g: 252, b: 236 },
        nucleus: { r: 248, g: 252, b: 255 },
        glow: { r: 210, g: 248, b: 255 },
        ink: { r: 24, g: 24, b: 28 },
      },
      mocha: {
        // Mocha: confident ink + warm highlight, so it never disappears
        a: { r: 68, g: 46, b: 34 },
        b: { r: 96, g: 70, b: 52 },
        c: { r: 128, g: 98, b: 76 },
        nucleus: { r: 58, g: 38, b: 28 },
        glow: { r: 255, g: 250, b: 244 },
        ink: { r: 46, g: 30, b: 22 },
      },
      light: {
        // Light: elegant ink lines + controlled bloom
        a: { r: 38, g: 42, b: 52 },
        b: { r: 56, g: 64, b: 82 },
        c: { r: 68, g: 56, b: 86 },
        nucleus: { r: 18, g: 20, b: 24 },
        glow: { r: 255, g: 255, b: 255 },
        ink: { r: 18, g: 20, b: 24 },
      },
      unknown: {
        a: { r: 220, g: 224, b: 235 },
        b: { r: 178, g: 196, b: 228 },
        c: { r: 198, g: 184, b: 232 },
        nucleus: { r: 248, g: 250, b: 255 },
        glow: { r: 255, g: 255, b: 255 },
        ink: { r: 24, g: 24, b: 28 },
      },
    }

    const sampleTheme = (t: number) => {
      if (t - lastThemeSample < 500) return
      lastThemeSample = t
      themeName = readTheme()
    }

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      W = Math.max(1, Math.floor(r.width))
      H = Math.max(1, Math.floor(r.height))

      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`

      CX = W / 2
      CY = H / 2

      // ✅ keep perceived size (don’t change your component size)
      R = Math.min(W, H) * 0.46

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()

    const drawBackplate = (pal: (typeof PALETTES)[ThemeName], isLightBg: boolean, t: number) => {
      const tt = reducedMotion ? 0 : t * 0.00012 * speed
      const breathe = reducedMotion ? 1 : 0.92 + 0.08 * Math.sin(tt * 2.0)

      ctx.save()
      ctx.globalCompositeOperation = "screen"

      const a0 = isLightBg ? 0.12 : 0.16
      const a1 = isLightBg ? 0.05 : 0.08

      const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 1.25)
      g.addColorStop(0, rgba(pal.glow, a0 * energy * breathe))
      g.addColorStop(0.38, rgba(pal.b, a1 * energy * breathe))
      g.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(CX, CY, R * 1.25, 0, Math.PI * 2)
      ctx.fill()

      // Gentle vignette (keeps it “contained” + premium)
      ctx.globalCompositeOperation = isLightBg ? "multiply" : "source-over"
      const v = ctx.createRadialGradient(CX, CY, R * 0.30, CX, CY, R * 1.25)
      v.addColorStop(0, "rgba(0,0,0,0)")
      v.addColorStop(1, `rgba(0,0,0,${(isLightBg ? 0.06 : 0.10) * energy})`)
      ctx.fillStyle = v
      ctx.beginPath()
      ctx.arc(CX, CY, R * 1.25, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
      ctx.globalCompositeOperation = "source-over"
    }

    const drawNucleus = (pal: (typeof PALETTES)[ThemeName], isLightBg: boolean, t: number) => {
      const tt = reducedMotion ? 0 : t * 0.0011 * speed
      const pulse = reducedMotion ? 1 : 0.90 + 0.10 * Math.sin(tt)

      ctx.save()
      ctx.globalCompositeOperation = isLightBg ? "multiply" : "screen"

      const r0 = R * 0.12
      const g0 = ctx.createRadialGradient(CX, CY, 0, CX, CY, r0 * 2.4)

      if (isLightBg) {
        g0.addColorStop(0, rgba(pal.ink, 0.22 * energy * pulse))
        g0.addColorStop(0.60, rgba(pal.ink, 0.08 * energy))
        g0.addColorStop(1, "rgba(0,0,0,0)")
      } else {
        g0.addColorStop(0, rgba(pal.nucleus, 0.25 * energy * pulse))
        g0.addColorStop(0.65, rgba(pal.glow, 0.10 * energy))
        g0.addColorStop(1, "rgba(0,0,0,0)")
      }

      ctx.fillStyle = g0
      ctx.beginPath()
      ctx.arc(CX, CY, r0 * 2.4, 0, Math.PI * 2)
      ctx.fill()

      // Micro spec highlight
      ctx.globalCompositeOperation = "screen"
      ctx.fillStyle = `rgba(255,255,255,${(isLightBg ? 0.16 : 0.12) * energy})`
      ctx.beginPath()
      ctx.arc(CX - R * 0.045, CY - R * 0.055, Math.max(0.7, R * 0.032), 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
      ctx.globalCompositeOperation = "source-over"
    }

    const drawOrbitSet = (pal: (typeof PALETTES)[ThemeName], isLightBg: boolean, t: number) => {
      const baseRot = reducedMotion ? 0 : t * 0.00042 * speed
      const spin = reducedMotion ? 0 : t * 0.001 * speed

      const rx = R * 0.98
      const ry = R * 0.40

      const lw = Math.max(0.85, R * 0.032)

      // ✅ deterministic by theme (no luminance sampling)
      const inkA = isLightBg ? 0.30 : 0.0
      const glowA = isLightBg ? 0.20 : 0.20

      const electronR = Math.max(0.9, R * 0.060)

      const tilts = [0, Math.PI / 3, (2 * Math.PI) / 3]
      const colors = [pal.a, pal.b, pal.c]

      for (let i = 0; i < 3; i++) {
        const tilt = tilts[i]!
        const col = colors[i]!

        ctx.save()
        ctx.translate(CX, CY)
        ctx.rotate(baseRot + tilt)

        // pass 1: ink contrast for light/mocha
        if (isLightBg) {
          ctx.globalCompositeOperation = "multiply"
          ctx.lineWidth = lw + 0.4
          ctx.strokeStyle = rgba(pal.ink, inkA * energy)
          ctx.shadowBlur = 0
          ctx.beginPath()
          ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
          ctx.stroke()
        }

        // pass 2: luminous stroke
        ctx.globalCompositeOperation = "screen"
        ctx.lineWidth = lw
        ctx.strokeStyle = rgba(col, glowA * energy)

        if (!isLightBg) {
          ctx.shadowBlur = Math.max(6, R * 0.10)
          ctx.shadowColor = rgba(col, 0.18 * energy)
        } else {
          ctx.shadowBlur = Math.max(2, R * 0.06)
          ctx.shadowColor = rgba(pal.glow, 0.08 * energy)
        }

        ctx.beginPath()
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
        ctx.stroke()

        // electron (always moving)
        const phase = (i * (Math.PI * 2)) / 3
        const ang = (reducedMotion ? 0 : spin * 0.35) + phase
        const ex = Math.cos(ang) * rx
        const ey = Math.sin(ang) * ry

        ctx.globalCompositeOperation = "screen"
        ctx.shadowBlur = isLightBg ? Math.max(4, R * 0.10) : Math.max(8, R * 0.14)
        ctx.shadowColor = rgba(col, (isLightBg ? 0.18 : 0.28) * energy)

        ctx.fillStyle = isLightBg ? rgba(pal.ink, 0.34 * energy) : rgba(col, 0.70 * energy)
        ctx.beginPath()
        ctx.arc(ex, ey, electronR, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255,255,255,${(isLightBg ? 0.08 : 0.10) * energy})`
        ctx.beginPath()
        ctx.arc(ex, ey, electronR * 2.1, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
        ctx.globalCompositeOperation = "source-over"
      }
    }

    const softEdgeMask = () => {
      ctx.save()
      ctx.globalCompositeOperation = "destination-in"
      const m = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 1.20)
      m.addColorStop(0, "rgba(255,255,255,1)")
      m.addColorStop(0.80, "rgba(255,255,255,0.99)")
      m.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = m
      ctx.beginPath()
      ctx.arc(CX, CY, R * 1.36, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      ctx.globalCompositeOperation = "source-over"
    }

    const render = (t: number) => {
      sampleTheme(t)

      // ✅ ONLY theme decides “light mode rendering”
      const isLightBg = themeName === "light" || themeName === "mocha"
      const pal = PALETTES[themeName] ?? PALETTES.unknown

      ctx.clearRect(0, 0, W, H)

      drawBackplate(pal, isLightBg, t)
      drawOrbitSet(pal, isLightBg, t)
      drawNucleus(pal, isLightBg, t)
      softEdgeMask()

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [density, energy, speed, reducedMotion])

  return (
    <div
      ref={wrapRef}
      className={[
        "group relative inline-grid place-items-center",
        "h-8 w-12 sm:h-9 sm:w-14 md:h-10 md:w-16", // ✅ exact size
        "select-none",
        "opacity-90 hover:opacity-100 transition-opacity duration-300",
        "focus:outline-none focus-visible:outline-none",
        className,
      ].join(" ")}
      role={onClick ? "link" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-[-30%] rounded-full",
          "opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
        ].join(" ")}
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,.14), rgba(255,255,255,.06), transparent 72%)",
          filter: "blur(12px)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  )
}
