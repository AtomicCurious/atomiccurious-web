// src/components/visual/AtomFactBubble.tsx
"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type AtomFactBubbleProps = {
  open: boolean
  onClose: () => void
  anchorEl: HTMLElement | null
  facts: string[]

  // Optional labels
  nextLabel?: string
  closeLabel?: string
  ariaLabel?: string
  title?: string
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function AtomFactBubble({
  open,
  onClose,
  anchorEl,
  facts,
  title = "Atom",
  nextLabel = "Otra curiosidad",
  closeLabel = "Cerrar",
  ariaLabel = "Curiosity bubble",
}: AtomFactBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement | null>(null)

  // Mounted/exit animation support
  const [mounted, setMounted] = useState(false)
  const [leaving, setLeaving] = useState(false)

  const [fact, setFact] = useState("")
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 80, left: 24 })

  // Tail position inside bubble (px from RIGHT edge)
  const [tailRight, setTailRight] = useState<number>(24)

  // Non-repeating rotation for facts
  const [order, setOrder] = useState<number[]>([])
  const [idx, setIdx] = useState<number>(0)
  const lastFactRef = useRef<string>("")

  // Mount / unmount with exit animation
  useEffect(() => {
    if (open) {
      setMounted(true)
      setLeaving(false)
      return
    }
    if (!mounted) return
    setLeaving(true)
    const t = window.setTimeout(() => {
      setMounted(false)
      setLeaving(false)
    }, 160)
    return () => window.clearTimeout(t)
  }, [open, mounted])

  // Build/refresh order when facts change
  useEffect(() => {
    if (!mounted) return
    const n = Math.max(0, facts.length)
    const base = Array.from({ length: n }, (_, i) => i)

    if (n === 0) {
      setOrder([])
      setIdx(0)
      setFact("")
      lastFactRef.current = ""
      return
    }

    const shuffled = shuffle(base)
    const last = lastFactRef.current
    if (last) {
      const firstFact = facts[shuffled[0]] ?? ""
      if (firstFact === last && shuffled.length > 1) {
        ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
      }
    }

    setOrder(shuffled)
    setIdx(0)
    const first = facts[shuffled[0]] ?? ""
    setFact(first)
    lastFactRef.current = first
  }, [facts, mounted])

  // When it opens, ensure we show a fact
  useEffect(() => {
    if (!open) return
    if (!facts.length) {
      setFact("")
      return
    }

    if (!order.length) {
      const base = Array.from({ length: facts.length }, (_, i) => i)
      const shuffled = shuffle(base)
      setOrder(shuffled)
      setIdx(0)
      const first = facts[shuffled[0]] ?? ""
      setFact(first)
      lastFactRef.current = first
      return
    }

    if (!fact) {
      const first = facts[order[0]] ?? facts[0] ?? ""
      setFact(first)
      lastFactRef.current = first
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function nextFact() {
    if (!facts.length) return

    // If order is invalid, rebuild
    if (!order.length || order.length !== facts.length) {
      const base = Array.from({ length: facts.length }, (_, i) => i)
      const shuffled = shuffle(base)
      setOrder(shuffled)
      setIdx(0)
      const first = facts[shuffled[0]] ?? ""
      setFact(first)
      lastFactRef.current = first
      return
    }

    const next = idx + 1

    // Cycle ended -> reshuffle (avoid last shown as first if possible)
    if (next >= order.length) {
      const base = Array.from({ length: facts.length }, (_, i) => i)
      const shuffled = shuffle(base)

      const last = lastFactRef.current
      if (last && shuffled.length > 1) {
        const firstFact = facts[shuffled[0]] ?? ""
        if (firstFact === last) {
          ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
        }
      }

      setOrder(shuffled)
      setIdx(0)
      const f = facts[shuffled[0]] ?? ""
      setFact(f)
      lastFactRef.current = f
      return
    }

    setIdx(next)
    const f = facts[order[next]] ?? ""
    setFact(f)
    lastFactRef.current = f
  }

  // Position bubble near the anchor (footer signature)
  useEffect(() => {
    if (!mounted) return
    if (!open) return
    if (!anchorEl) return

    const update = () => {
      const rBtn = anchorEl.getBoundingClientRect()

      const bubbleW = 320
      const bubbleH = 220
      const gap = 14
      const viewportPadding = 16

      // Prefer ABOVE footer (premium, less intrusive)
      let left = rBtn.left - bubbleW * 0.65
      let top = rBtn.top - bubbleH - gap

      // If no space above, drop below
      if (top < viewportPadding) {
        top = rBtn.bottom + gap
      }

      left = clamp(left, viewportPadding, window.innerWidth - bubbleW - viewportPadding)
      top = clamp(top, viewportPadding, window.innerHeight - bubbleH - viewportPadding)

      setPos({ top, left })

      // Tail aim: toward the middle of the button
      const aimX = rBtn.left + rBtn.width * 0.5
      const centerInsideBubble = aimX - left

      let nextTailRight = bubbleW - centerInsideBubble - 8
      nextTailRight = clamp(nextTailRight, 18, bubbleW - 18)
      setTailRight(nextTailRight)
    }

    update()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)

    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [mounted, open, anchorEl])

  // Focus bubble on open
  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => bubbleRef.current?.focus(), 0)
    return () => window.clearTimeout(t)
  }, [open])

  // Close on ESC + outside click
  useEffect(() => {
    if (!mounted) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node | null
      if (!t) return
      if (bubbleRef.current?.contains(t)) return
      if (anchorEl?.contains(t)) return
      onClose()
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("pointerdown", onPointerDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("pointerdown", onPointerDown)
    }
  }, [mounted, onClose, anchorEl])

  const bubble = useMemo(() => {
    if (!mounted) return null

    return (
      <div
        ref={bubbleRef}
        role="dialog"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={[
          "fixed z-[80]",
          "w-[320px] max-w-[90vw]",
          "rounded-2xl border border-border/70",
          "bg-surface-1/85 backdrop-blur-xl",
          "shadow-[0_20px_80px_rgba(0,0,0,0.55)]",
          "p-4",
          "outline-none",
          "origin-bottom-right",
          leaving
            ? "animate-[atomBubbleOut_140ms_ease-in_forwards]"
            : "animate-[atomBubbleIn_140ms_ease-out]",
          "motion-reduce:animate-none",
        ].join(" ")}
        style={{ top: pos.top, left: pos.left }}
      >
        {/* Tail */}
        <div
          aria-hidden="true"
          className="absolute -bottom-2 h-4 w-4 rotate-45 border-r border-b border-border/70 bg-surface-1/85 backdrop-blur-xl"
          style={{ right: tailRight }}
        />

        <div className="flex items-start gap-3">
          {/* Avatar (Atom only) */}
          <div className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/70 bg-surface-2/40">
            <img src="/characters/atom.png" alt="Atom" className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-text">{title}</p>

            <p className="mt-1 text-sm leading-relaxed text-muted">{fact}</p>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={nextFact}
                className="rounded-lg border border-border/70 bg-surface-2/40 px-3 py-1.5 text-xs font-medium text-text/90 hover:bg-surface-2/60"
              >
                {nextLabel}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:text-text"
              >
                {closeLabel}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes atomBubbleIn {
            from {
              opacity: 0;
              transform: translateY(6px) scale(0.985);
              filter: blur(1px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          @keyframes atomBubbleOut {
            from {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
            to {
              opacity: 0;
              transform: translateY(4px) scale(0.985);
              filter: blur(1px);
            }
          }
        `}</style>
      </div>
    )
  }, [
    mounted,
    leaving,
    pos.top,
    pos.left,
    tailRight,
    fact,
    nextLabel,
    closeLabel,
    ariaLabel,
    title,
  ])

  return bubble
}
