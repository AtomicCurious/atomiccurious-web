// src/components/visual/AtomNoteBubble.tsx
"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type AtomNoteBubbleProps = {
  open: boolean
  onClose: () => void
  anchorEl: HTMLElement | null
  notes: string[]
  title?: string
  nextLabel?: string
  closeLabel?: string
  ariaLabel?: string

  /**
   * Nudges (optional):
   * - Allows fine positioning without touching layout logic
   */
  offsetX?: number
  offsetY?: number
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

export default function AtomNoteBubble({
  open,
  onClose,
  anchorEl,
  notes,
  title = "Atom",
  nextLabel = "Another note",
  closeLabel = "Close",
  ariaLabel = "Editor’s note",
  offsetX = 0,
  offsetY = 0,
}: AtomNoteBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement | null>(null)

  const [mounted, setMounted] = useState(false)
  const [leaving, setLeaving] = useState(false)

  const [text, setText] = useState("")
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 80, left: 24 })

  // Tail position inside bubble (px from LEFT edge)
  const [tailLeft, setTailLeft] = useState<number>(40)

  const [order, setOrder] = useState<number[]>([])
  const [idx, setIdx] = useState<number>(0)
  const lastRef = useRef<string>("")

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

  // Build/refresh order when notes change
  useEffect(() => {
    if (!mounted) return
    const n = Math.max(0, notes.length)
    const base = Array.from({ length: n }, (_, i) => i)

    if (n === 0) {
      setOrder([])
      setIdx(0)
      setText("")
      lastRef.current = ""
      return
    }

    const shuffled = shuffle(base)
    const last = lastRef.current
    if (last) {
      const first = notes[shuffled[0]] ?? ""
      if (first === last && shuffled.length > 1) {
        ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
      }
    }

    setOrder(shuffled)
    setIdx(0)
    const first = notes[shuffled[0]] ?? ""
    setText(first)
    lastRef.current = first
  }, [notes, mounted])

  // Ensure a note is shown on open
  useEffect(() => {
    if (!open) return
    if (!notes.length) {
      setText("")
      return
    }

    if (!order.length) {
      const base = Array.from({ length: notes.length }, (_, i) => i)
      const shuffled = shuffle(base)
      setOrder(shuffled)
      setIdx(0)
      const first = notes[shuffled[0]] ?? ""
      setText(first)
      lastRef.current = first
      return
    }

    if (!text) {
      const first = notes[order[0]] ?? notes[0] ?? ""
      setText(first)
      lastRef.current = first
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function nextNote() {
    if (!notes.length) return

    if (!order.length || order.length !== notes.length) {
      const base = Array.from({ length: notes.length }, (_, i) => i)
      const shuffled = shuffle(base)
      setOrder(shuffled)
      setIdx(0)
      const first = notes[shuffled[0]] ?? ""
      setText(first)
      lastRef.current = first
      return
    }

    const next = idx + 1

    if (next >= order.length) {
      const base = Array.from({ length: notes.length }, (_, i) => i)
      const shuffled = shuffle(base)

      const last = lastRef.current
      if (last && shuffled.length > 1) {
        const first = notes[shuffled[0]] ?? ""
        if (first === last) {
          ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
        }
      }

      setOrder(shuffled)
      setIdx(0)
      const t = notes[shuffled[0]] ?? ""
      setText(t)
      lastRef.current = t
      return
    }

    setIdx(next)
    const t = notes[order[next]] ?? ""
    setText(t)
    lastRef.current = t
  }

  // Position bubble: centered BELOW the notebook icon
  useEffect(() => {
    if (!mounted) return
    if (!open) return
    if (!anchorEl) return

    const update = () => {
      const r = anchorEl.getBoundingClientRect()

      // ✅ Match CoreFactBubble sizing
      const bubbleW = 320
      const bubbleH = 240
      const gapY = 28
      const viewportPadding = 16

      const anchorCenterX = r.left + r.width / 2

      let left = anchorCenterX - bubbleW / 2 + offsetX
      let top = r.bottom + gapY + offsetY

      left = clamp(left, viewportPadding, window.innerWidth - bubbleW - viewportPadding)
      top = clamp(top, viewportPadding, window.innerHeight - bubbleH - viewportPadding)

      setPos({ top, left })

      // Tail centered to the anchor center
      const centerInside = anchorCenterX - left
      let nextTailLeft = centerInside - 8 // tail is 16px; center it
      nextTailLeft = clamp(nextTailLeft, 18, bubbleW - 18)
      setTailLeft(nextTailLeft)
    }

    update()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)

    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [mounted, open, anchorEl, offsetX, offsetY])

  // Focus on open
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

          // animation
          "origin-top",
          leaving ? "animate-[coreBubbleOut_140ms_ease-in_forwards]" : "animate-[coreBubbleIn_140ms_ease-out]",
          "motion-reduce:animate-none",
        ].join(" ")}
        style={{ top: pos.top, left: pos.left }}
      >
        {/* Tail — centered under notebook */}
        <div
          aria-hidden="true"
          className="absolute -top-2 h-4 w-4 rotate-45 border-l border-t border-border/70 bg-surface-1/85 backdrop-blur-xl"
          style={{ left: tailLeft }}
        />

        <div className="flex items-start gap-3">
          {/* ✅ Avatar: bigger + stronger border + subtle lift + better image pop */}
          <div className="relative mt-0.5 h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border/90 bg-surface-2/50 shadow-[0_0_0_2px_rgba(0,0,0,0.25),0_10px_30px_rgba(0,0,0,0.35)]">
            <img
              src="/images/sections/home/atom_home.webp"
              alt="Atom"
              className="h-full w-full object-cover contrast-110 saturate-110"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-text">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={nextNote}
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
          @keyframes coreBubbleIn {
            from {
              opacity: 0;
              transform: translateY(-4px) scale(0.98);
              filter: blur(1px);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          @keyframes coreBubbleOut {
            from {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
            to {
              opacity: 0;
              transform: translateY(-2px) scale(0.985);
              filter: blur(1px);
            }
          }
        `}</style>
      </div>
    )
  }, [mounted, leaving, pos.top, pos.left, tailLeft, text, title, nextLabel, closeLabel, ariaLabel])

  return bubble
}