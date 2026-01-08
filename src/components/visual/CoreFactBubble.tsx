"use client"

import { useEffect, useMemo, useRef, useState } from "react"

type CoreFactBubbleProps = {
  open: boolean
  onClose: () => void
  anchorEl: HTMLElement | null
  facts: string[]
  title?: string
}

export default function CoreFactBubble({
  open,
  onClose,
  anchorEl,
  facts,
  title = "Core",
}: CoreFactBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement | null>(null)
  const [fact, setFact] = useState("")
  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: 80,
    left: 24,
  })

  // Tail position inside bubble (px from RIGHT edge)
  const [tailRight, setTailRight] = useState<number>(24)

  // Pick a new fact each time it opens
  useEffect(() => {
    if (!open) return
    const pick = facts[Math.floor(Math.random() * Math.max(1, facts.length))] ?? ""
    setFact(pick)
  }, [open, facts])

  // Position bubble near the rocket — strong LEFT bias + tail aims at rocket BODY
  useEffect(() => {
    if (!open || !anchorEl) return

    const update = () => {
      const rBtn = anchorEl.getBoundingClientRect()

      const bubbleW = 320
      const gap = 14
      const viewportPadding = 16

      // Prefer LEFT
      let left = rBtn.left - bubbleW - gap
      let top = rBtn.bottom + 12

      // If not enough space on the left, clamp and drop slightly
      if (left < viewportPadding) {
        left = viewportPadding
        top = rBtn.bottom + 28
      }

      // Clamp within viewport
      left = Math.min(
        Math.max(viewportPadding, left),
        window.innerWidth - bubbleW - viewportPadding
      )
      top = Math.min(top, window.innerHeight - 240)

      setPos({ top, left })

      // ---- Tail alignment ----
      // Use the SVG bounding box if available
      const svgEl = anchorEl.querySelector("svg") as SVGElement | null
      const r = (svgEl ?? anchorEl).getBoundingClientRect()

      // IMPORTANT:
      // The SVG includes the trail on the left, so aiming at 50% hits the "tail".
      // Aim at the rocket BODY instead (towards the right side of the SVG).
      const BODY_AIM = 0.75 // tweakable: 0.62 (more center) -> 0.75 (more nose)
      const aimX = r.left + r.width * BODY_AIM

      const centerInsideBubble = aimX - left

      // Convert to "right" offset for the tail (tail is 16px; subtract 8 to center)
      let nextTailRight = bubbleW - centerInsideBubble - 8

      // Clamp so tail doesn't hug edges
      nextTailRight = Math.min(Math.max(18, nextTailRight), bubbleW - 18)

      setTailRight(nextTailRight)
    }

    update()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)

    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [open, anchorEl])

  // Close on ESC + outside click
  useEffect(() => {
    if (!open) return

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
  }, [open, onClose, anchorEl])

  const bubble = useMemo(() => {
    if (!open) return null

    return (
      <div
        ref={bubbleRef}
        role="dialog"
        aria-label="Core curiosity"
        className={[
          "fixed z-[80]",
          "w-[320px] max-w-[90vw]",
          "rounded-2xl border border-border/70",
          "bg-surface-1/85 backdrop-blur-xl",
          "shadow-[0_20px_80px_rgba(0,0,0,0.55)]",
          "p-4",

          // ✨ micro animation
          "origin-top-right",
          "animate-[coreBubbleIn_140ms_ease-out]",
          "motion-reduce:animate-none",
        ].join(" ")}
        style={{ top: pos.top, left: pos.left }}
      >
        {/* Tail — aligned to rocket BODY */}
        <div
          aria-hidden="true"
          className="absolute -top-2 h-4 w-4 rotate-45 border-l border-t border-border/70 bg-surface-1/85 backdrop-blur-xl"
          style={{ right: tailRight }}
        />

        <div className="flex items-start gap-3">
          {/* Core avatar */}
          <div className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/70 bg-surface-2/40">
            <img
              src="/characters/core.png"
              alt="Core"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-text">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{fact}</p>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const pick =
                    facts[Math.floor(Math.random() * Math.max(1, facts.length))] ?? ""
                  setFact(pick)
                }}
                className="rounded-lg border border-border/70 bg-surface-2/40 px-3 py-1.5 text-xs font-medium text-text/90 hover:bg-surface-2/60"
              >
                Otro dato
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted hover:text-text"
              >
                Cerrar
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
        `}</style>
      </div>
    )
  }, [open, pos.top, pos.left, tailRight, title, fact, facts, onClose])

  return bubble
}
