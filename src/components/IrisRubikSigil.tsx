// src/components/IrisRubikSigil.tsx
"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type Props = {
  className?: string
  speed?: number
  ariaLabel?: string
  onClick?: () => void
}

type V3 = { x: number; y: number; z: number }
type Q = { w: number; x: number; y: number; z: number }
type Axis = "x" | "y" | "z"
type Move = { axis: Axis; layer: -1 | 1; dir: -1 | 1 }

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export default function IrisRubikSigil({
  className = "",
  speed = 1,
  ariaLabel = "Interactive Rubik's Cube",
  onClick,
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const rubikRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  }, [])

  useEffect(() => {
    const mountEl = mountRef.current
    const rubikEl = rubikRef.current
    if (!mountEl || !rubikEl) return

    const rubikElNonNull = rubikEl

    // Reduced motion
    if (reducedMotion) {
      rubikElNonNull.style.transform = "rotateX(-26deg) rotateY(32deg)"
      setIsInitialized(true)
      return
    }

    // ======== PARÁMETROS ========
    const sp = Math.max(0.25, Math.min(speed, 2))
    const MOVE_EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    const MOVE_TIME = Math.round(180 / sp)
    const GAP_BETWEEN_MOVES = Math.round(60 / sp)
    const IDLE_TIME = Math.round(1200 / sp)
    const FULL_SHOWCASE_TIME = 12000 // 12 segundos para mostrar todas las caras

    // ======== FUNCIONES MATEMÁTICAS ========
    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))
    
    function normalize(v: V3): V3 {
      const m = Math.hypot(v.x, v.y, v.z)
      return m === 0 ? { x: 0, y: 0, z: 0 } : { x: v.x / m, y: v.y / m, z: v.z / m }
    }

    const LIGHT = normalize({ x: -0.6, y: 0.5, z: 0.3 })

    function qMul(a: Q, b: Q): Q {
      return {
        w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
        x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
        y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
        z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
      }
    }

    function qAxis(axis: Axis, deg: number): Q {
      const t = (deg * Math.PI) / 180 / 2
      const s = Math.sin(t)
      const c = Math.cos(t)
      if (axis === "x") return { w: c, x: s, y: 0, z: 0 }
      if (axis === "y") return { w: c, x: 0, y: s, z: 0 }
      return { w: c, x: 0, y: 0, z: s }
    }

    function qRotateVec(q: Q, v: V3): V3 {
      const qi = { w: q.w, x: -q.x, y: -q.y, z: -q.z }
      const vx = { w: 0, x: v.x, y: v.y, z: v.z }
      const r = qMul(qMul(q, vx as any), qi as any) as any
      return { x: r.x, y: r.y, z: r.z }
    }

    function euler(q: Q) {
      const { w, x, y, z } = q
      const test = 2 * (w * y - z * x)
      const sy = Math.asin(clamp(test, -1, 1))
      const sx = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y))
      const sz = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z))
      return { rx: sx, ry: sy, rz: sz }
    }

    function shade(dot: number) {
      const nd = clamp(dot, 0, 1)
      const base = 0.65 + nd * 0.4
      const spec = Math.pow(nd, 8) * 0.35
      const fres = Math.pow(1 - nd, 3) * 0.08
      const litCap = 1.2
      const lit = clamp(base + spec, 0.6, litCap)
      return { lit, spec, rim: fres }
    }

    function rotPos(p: V3, axis: Axis, dir: number): V3 {
      const { x, y, z } = p
      if (axis === "y") return { x: -dir * z, y, z: dir * x }
      if (axis === "x") return { x, y: dir * z, z: -dir * y }
      return { x: dir * y, y: -dir * x, z }
    }

    // ======== CONSTRUIR 26 CUBIES ========
    const cubies: Array<{
      el: HTMLDivElement
      faces: Record<"U" | "D" | "F" | "B" | "R" | "L", HTMLElement>
      p: V3
      q: Q
    }> = []

    // Limpiar contenedor
    while (rubikElNonNull.firstChild) {
      rubikElNonNull.removeChild(rubikElNonNull.firstChild)
    }

    // Crear cubies con las caras correctas visibles
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue

          const el = document.createElement("div")
          
          // Determinar qué caras son visibles (solo las exteriores)
          const visibleFaces: string[] = []
          if (y === 1) visibleFaces.push("sU")
          if (y === -1) visibleFaces.push("sD")
          if (z === 1) visibleFaces.push("sF")
          if (z === -1) visibleFaces.push("sB")
          if (x === 1) visibleFaces.push("sR")
          if (x === -1) visibleFaces.push("sL")
          
          el.className = `ac-cubie ${visibleFaces.join(' ')}`
          
          // SOLO crear las caras que son visibles
          const facesHTML = []
          if (y === 1) facesHTML.push('<div class="ac-face fU"><i class="spec"></i><i class="rim"></i></div>')
          if (y === -1) facesHTML.push('<div class="ac-face fD"><i class="spec"></i><i class="rim"></i></div>')
          if (z === 1) facesHTML.push('<div class="ac-face fF"><i class="spec"></i><i class="rim"></i></div>')
          if (z === -1) facesHTML.push('<div class="ac-face fB"><i class="spec"></i><i class="rim"></i></div>')
          if (x === 1) facesHTML.push('<div class="ac-face fR"><i class="spec"></i><i class="rim"></i></div>')
          if (x === -1) facesHTML.push('<div class="ac-face fL"><i class="spec"></i><i class="rim"></i></div>')
          
          el.innerHTML = `<div class="ac-core"></div>${facesHTML.join('')}`
          rubikElNonNull.appendChild(el)

          const faces: Record<"U" | "D" | "F" | "B" | "R" | "L", HTMLElement> = {
            U: el.querySelector(".fU") as HTMLElement,
            D: el.querySelector(".fD") as HTMLElement,
            F: el.querySelector(".fF") as HTMLElement,
            B: el.querySelector(".fB") as HTMLElement,
            R: el.querySelector(".fR") as HTMLElement,
            L: el.querySelector(".fL") as HTMLElement,
          }

          cubies.push({
            el,
            faces,
            p: { x, y, z },
            q: { w: 1, x: 0, y: 0, z: 0 },
          })
        }
      }
    }

    // Tamaño de celda
    const getCellSize = () => {
      const computed = window.getComputedStyle(rubikElNonNull)
      const size = parseFloat(computed.getPropertyValue('--rubik-size')) || 24
      return size / 3
    }

    // Aplicar transformación a un cubie
    function apply(c: (typeof cubies)[number]) {
      const cs = getCellSize()
      const ang = euler(c.q)

      c.el.style.transform = `translate3d(${c.p.x * cs}px,${-c.p.y * cs}px,${c.p.z * cs}px) rotateX(${(ang.rx * 180) / Math.PI}deg) rotateY(${(ang.ry * 180) / Math.PI}deg)`

      const normals: Record<"U" | "D" | "F" | "B" | "R" | "L", V3> = {
        U: { x: 0, y: 1, z: 0 },
        D: { x: 0, y: -1, z: 0 },
        F: { x: 0, y: 0, z: 1 },
        B: { x: 0, y: 0, z: -1 },
        R: { x: 1, y: 0, z: 0 },
        L: { x: -1, y: 0, z: 0 },
      }

      Object.keys(normals).forEach((k) => {
        const key = k as keyof typeof normals
        const nWorld = qRotateVec(c.q, normals[key])
        const dot = Math.max(0, nWorld.x * LIGHT.x + nWorld.y * LIGHT.y + nWorld.z * LIGHT.z)
        const { lit, spec, rim } = shade(dot)
        const face = c.faces[key]
        
        if (face) {
          face.style.setProperty("--lit", lit.toFixed(3))
          face.style.setProperty("--spec", spec.toFixed(3))
          face.style.setProperty("--rim", rim.toFixed(3))
        }
      })
    }

    function layoutAll() {
      cubies.forEach(apply)
    }
    layoutAll()

    // ======== MOVIMIENTOS DEL CUBO ========
    async function turn(axis: Axis, layer: -1 | 1, dir: -1 | 1) {
      const q = qAxis(axis, dir * 90)
      const sel = cubies.filter((c) => (c.p as any)[axis] === layer)

      cubies.forEach((c) => {
        c.el.style.transition = (c.p as any)[axis] === layer 
          ? `transform ${MOVE_TIME}ms ${MOVE_EASE}` 
          : "none"
      })

      sel.forEach((c) => {
        c.p = rotPos(c.p, axis, dir)
        c.q = qMul(q, c.q)
        apply(c)
      })

      await sleep(MOVE_TIME)
    }

    // Generar movimientos de scramble
    function randomScrambleMoves(count: number): Move[] {
      const faces: Move[] = [
        { axis: "y", layer: 1, dir: 1 }, { axis: "y", layer: 1, dir: -1 },
        { axis: "x", layer: 1, dir: 1 }, { axis: "x", layer: 1, dir: -1 },
        { axis: "z", layer: 1, dir: 1 }, { axis: "z", layer: 1, dir: -1 },
      ]

      const seq: Move[] = []
      let lastAxis: Axis | null = null

      for (let i = 0; i < count; i++) {
        let pick: Move
        do {
          pick = faces[Math.floor(Math.random() * faces.length)]!
        } while (pick.axis === lastAxis)
        
        lastAxis = pick.axis
        seq.push(pick)
      }
      return seq
    }

    // ======== ROTACIÓN PARA MOSTRAR LAS 6 CARAS ========
    let showcasing = false

    function stopShowcase() {
      showcasing = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      rubikElNonNull.style.transition = `transform ${MOVE_TIME * 3}ms cubic-bezier(0.33, 1, 0.68, 1)`
      rubikElNonNull.style.transform = "rotateX(-26deg) rotateY(32deg)"
    }

    function startShowcase(durationMs: number = FULL_SHOWCASE_TIME) {
      if (showcasing) return Promise.resolve()
      showcasing = true

      // Secuencia que muestra claramente las 6 caras:
      // 1. Cara frontal (verde)
      // 2. Gira 90° Y - Cara derecha (rojo)
      // 3. Gira 90° Y - Cara posterior (azul)
      // 4. Gira 90° Y - Cara izquierda (naranja)
      // 5. Gira 90° X - Cara superior (blanco)
      // 6. Gira 180° X - Cara inferior (amarillo)
      // 7. Vuelve a posición inicial
      
      const positions = [
        { x: -26, y: 32, z: 0 },      // Vista inicial - cara verde frontal
        { x: -26, y: 122, z: 0 },     // Gira 90° Y - cara roja derecha
        { x: -26, y: 212, z: 0 },     // Gira 180° Y - cara azul posterior
        { x: -26, y: 302, z: 0 },     // Gira 270° Y - cara naranja izquierda
        { x: 64, y: 32, z: 0 },       // Gira 90° X - cara blanca superior
        { x: -116, y: 32, z: 0 },     // Gira -90° X - cara amarilla inferior
        { x: -26, y: 32, z: 0 },      // Vuelve a posición inicial
      ]

      const segmentDuration = durationMs / positions.length

      return new Promise<void>((resolve) => {
        let currentPosition = 0
        let segmentStartTime = performance.now()

        const animateSegment = (currentTime: number) => {
          if (!showcasing) {
            resolve()
            return
          }

          const segmentElapsed = currentTime - segmentStartTime
          const segmentProgress = Math.min(segmentElapsed / segmentDuration, 1)
          
          // Easing suave
          const easeInOut = segmentProgress < 0.5 
            ? 2 * segmentProgress * segmentProgress 
            : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2

          // Interpolación entre posiciones
          const currentPos = positions[currentPosition]
          const nextPos = positions[Math.min(currentPosition + 1, positions.length - 1)]
          
          const rx = currentPos.x + (nextPos.x - currentPos.x) * easeInOut
          const ry = currentPos.y + (nextPos.y - currentPos.y) * easeInOut
          const rz = currentPos.z + (nextPos.z - currentPos.z) * easeInOut

          rubikElNonNull.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`

          // Si terminó este segmento, pasar al siguiente
          if (segmentProgress >= 1) {
            currentPosition++
            segmentStartTime = currentTime
            
            // Si terminamos todas las posiciones, finalizar
            if (currentPosition >= positions.length - 1) {
              showcasing = false
              stopShowcase()
              resolve()
              return
            }
          }

          animationRef.current = requestAnimationFrame(animateSegment)
        }

        animationRef.current = requestAnimationFrame(animateSegment)
      })
    }

    // ======== BUCLE PRINCIPAL ========
    let cancelled = false

    const runSequence = async () => {
      if (cancelled) return

      // 1. Espera inicial
      await sleep(IDLE_TIME)
      if (cancelled) return

      // 2. Scramble (6-8 movimientos)
      const scrambleCount = 6 + Math.floor(Math.random() * 3)
      const scrambleSeq = randomScrambleMoves(scrambleCount)

      for (const m of scrambleSeq) {
        if (cancelled) break
        await turn(m.axis, m.layer, m.dir)
        await sleep(GAP_BETWEEN_MOVES)
      }
      if (cancelled) return

      // 3. Pausa breve
      await sleep(Math.round(100 / sp))
      if (cancelled) return

      // 4. Resolver (reverso exacto)
      const solveSeq: Move[] = [...scrambleSeq].reverse().map((m) => ({
        axis: m.axis,
        layer: m.layer,
        dir: (m.dir * -1) as -1 | 1,
      }))

      for (const m of solveSeq) {
        if (cancelled) break
        await turn(m.axis, m.layer, m.dir)
        await sleep(GAP_BETWEEN_MOVES)
      }
      if (cancelled) return

      // 5. Pausa antes de mostrar
      await sleep(Math.round(5000 / sp))
      if (cancelled) return

      // 6. Mostrar las 6 caras claramente
      await startShowcase(FULL_SHOWCASE_TIME)
      if (cancelled) return

      // 7. Vuelta a posición inicial
      rubikElNonNull.style.transition = `transform ${MOVE_TIME * 2}ms cubic-bezier(0.33, 1, 0.68, 1)`
      rubikElNonNull.style.transform = "rotateX(-26deg) rotateY(32deg)"
      await sleep(MOVE_TIME * 2)

      // 8. Repetir
      await sleep(10000)
      runSequence()
    }

    // Manejar resize
    const onResize = () => {
      layoutAll()
    }
    window.addEventListener("resize", onResize)

    // Iniciar secuencia
    runSequence()
    setIsInitialized(true)

    return () => {
      cancelled = true
      window.removeEventListener("resize", onResize)
      stopShowcase()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [reducedMotion, speed])

  return (
    <div
      ref={mountRef}
      className={[
        "group relative inline-grid place-items-center",
        "h-8 w-12 sm:h-9 sm:w-14 md:h-10 md:w-16",
        "select-none" + (onClick ? " cursor-pointer" : ""),
        "opacity-90 hover:opacity-100 active:opacity-80 transition-all duration-200",
        "hover:scale-105 active:scale-95",
        !isInitialized ? "invisible" : "visible",
        className,
      ].join(" ")}
      role={onClick ? "button" : "presentation"}
      tabIndex={onClick ? 0 : -1}
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
          "opacity-0 transition-all duration-300",
          "group-hover:opacity-100 group-focus-visible:opacity-100",
        ].join(" ")}
        style={{
          background:
            "radial-gradient(closest-side, rgba(34,211,238,.22), rgba(255,77,157,.14), transparent 68%)",
          filter: "blur(10px)",
        }}
      />

      <div className="ac-rubikAnchor" aria-hidden="true">
        <div
          ref={rubikRef}
          className="ac-rubik"
          style={
            {
              ["--rubik-size" as any]: "24px",
              ["--gap" as any]: "0px",
              ["--thickness" as any]: "6px",
              ["--sticker-radius" as any]: "1.5px",
              ["--epsilon" as any]: "0.05px",
              
              // Colores del cubo de Rubik estándar
              ["--U" as any]: "#FFFFFF",    // Blanco
              ["--D" as any]: "#FFD700",    // Amarillo
              ["--F" as any]: "#00CC66",    // Verde
              ["--B" as any]: "#0066FF",    // Azul
              ["--R" as any]: "#FF3333",    // Rojo
              ["--L" as any]: "#FF6600",    // Naranja
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  )
}