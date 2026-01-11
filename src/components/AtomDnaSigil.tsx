// src/components/AtomDnaSigil.tsx
"use client"

import { useEffect, useMemo, useRef } from "react"

type Props = {
  className?: string
  speed?: number
  ariaLabel?: string
  onClick?: () => void
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

function parseRgb(input: string): { r: number; g: number; b: number } | null {
  // supports: rgb(r,g,b) / rgba(r,g,b,a)
  const m = input.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*[\d.]+\s*)?\)/i)
  if (!m) return null
  const r = Number(m[1])
  const g = Number(m[2])
  const b = Number(m[3])
  if (![r, g, b].every((x) => Number.isFinite(x))) return null
  return { r, g, b }
}

function luminance01({ r, g, b }: { r: number; g: number; b: number }) {
  // sRGB relative luminance approx (good enough for theme detection)
  const sr = r / 255
  const sg = g / 255
  const sb = b / 255
  return clamp01(0.2126 * sr + 0.7152 * sg + 0.0722 * sb)
}

export default function AtomDnaSigil({
  className = "",
  speed = 1,
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

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      W = Math.max(1, Math.floor(r.width))
      H = Math.max(1, Math.floor(r.height))
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()

    // ✅ Fixed palette: ADN rojo/azul (no depende del accent)
    const BLUE = { r: 70, g: 140, b: 255 }
    const RED = { r: 255, g: 92, b: 92 }

    // Tema (para LIGHT): cachea luminancia del fondo y sube contraste si es claro
    let bgLum = 0.0
    let lastThemeSample = 0

    const sampleTheme = (t: number) => {
      if (t - lastThemeSample < 900) return
      lastThemeSample = t
      try {
        const bg = getComputedStyle(document.body).backgroundColor
        const rgb = parseRgb(bg)
        bgLum = rgb ? luminance01(rgb) : 0.0
      } catch {
        bgLum = 0.0
      }
    }

    const draw = (t: number) => {
      sampleTheme(t)

      ctx.clearRect(0, 0, W, H)

      const cx = W / 2
      const cy = H / 2
      const R = Math.min(W, H) * 0.46

      // Si el fondo es claro, subimos sutilmente alphas/anchos
      const isLightBg = bgLum > 0.72
      const alphaBoost = isLightBg ? 1.22 : 1.0
      const lineBoost = isLightBg ? 1.12 : 1.0

      // Halo interno MUY sutil (no “recuadro”).
      // En LIGHT ayuda a que “lea” sin poner caja.
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.15)
      halo.addColorStop(0, `rgba(${BLUE.r},${BLUE.g},${BLUE.b},${0.045 * alphaBoost})`)
      halo.addColorStop(0.45, `rgba(${RED.r},${RED.g},${RED.b},${0.038 * alphaBoost})`)
      halo.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2)
      ctx.fill()

      const tt = reducedMotion ? 0 : t * 0.001 * speed
      const turns = 2.05
      const points = 120

      // ✅ Más delgado / premium
      const AMP_X = R * 0.36
      const AMP_Y = R * 1.75

      const railW = Math.max(0.65, R * 0.040) * lineBoost
      const rungW = Math.max(0.6, R * 0.020) * lineBoost

      const WHITE = `rgba(255,255,255,${0.18 * alphaBoost})`

      // Rails
      for (let rail = 0; rail < 2; rail++) {
        const c = rail === 0 ? BLUE : RED
        ctx.beginPath()
        for (let i = 0; i <= points; i++) {
          const p = i / points
          const a = p * Math.PI * 2 * turns + (rail ? Math.PI : 0) + tt * 0.8
          const x = cx + Math.cos(a) * AMP_X
          const y = cy + (p - 0.5) * AMP_Y
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const baseA = rail ? 0.46 : 0.24
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${baseA * alphaBoost})`
        ctx.lineWidth = railW
        ctx.lineCap = "round"
        ctx.stroke()
      }

      // Rungs + nodes (aire editorial)
      const rungCount = 13
      for (let i = 0; i <= rungCount; i++) {
        const p = i / rungCount
        const a = p * Math.PI * 2 * turns + tt * 0.8
        const x1 = cx + Math.cos(a) * AMP_X
        const x2 = cx + Math.cos(a + Math.PI) * AMP_X
        const y = cy + (p - 0.5) * AMP_Y

        ctx.strokeStyle = WHITE
        ctx.lineWidth = rungW
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.stroke()

        const n1 = Math.max(0.75, R * 0.030) * lineBoost
        const n2 = Math.max(0.68, R * 0.028) * lineBoost

        const isBlue = i % 2 === 0
        const cA = isBlue ? BLUE : RED
        const cB = isBlue ? RED : BLUE

        ctx.fillStyle = `rgba(${cA.r},${cA.g},${cA.b},${0.88 * alphaBoost})`
        ctx.beginPath()
        ctx.arc(x1, y, n1, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(${cB.r},${cB.g},${cB.b},${0.62 * alphaBoost})`
        ctx.beginPath()
        ctx.arc(x2, y, n2, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion, speed])

  return (
    <div
      ref={wrapRef}
      className={[
        // ✅ Sin recuadro: no bg, no border, no ring, no shadow
        "group relative inline-grid place-items-center",
        "h-8 w-12 sm:h-9 sm:w-14 md:h-10 md:w-16",
        "select-none",
        // integración al header
        "opacity-90 hover:opacity-100 transition-opacity duration-300",
        // accesibilidad premium (sin caja permanente)
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
      {/* ✅ Halo SOLO en hover/focus (no contenedor, no borde) */}
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-[-30%] rounded-full",
          "opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
        ].join(" ")}
        style={{
          background:
            "radial-gradient(closest-side, rgba(70,140,255,.22), rgba(255,92,92,.14), transparent 68%)",
          filter: "blur(10px)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  )
}
