// src/components/FooterSignatureAtom.tsx
"use client"

import { useMemo, useRef, useState } from "react"
import AtomFactBubble from "@/components/visual/AtomFactBubble"

type FooterSignatureAtomProps = {
  className?: string
}

export default function FooterSignatureAtom({ className = "" }: FooterSignatureAtomProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(false)

  const facts = useMemo(
    () => [
      "Nuevo post cada semana: ciencia, tecnología y lo que viene.",
      "Exploraciones cortas, visuales y con una idea clara (sin relleno).",
      "La newsletter trae lo mejor del universo AtomicCurious + drops exclusivos.",
      "Recursos: plantillas, guías y herramientas para aprender mejor.",
      "Si esto te encendió curiosidad, vuelve: aquí se explora en serio.",
    ],
    []
  )

  return (
    <span className={["inline-flex items-center gap-2", className].join(" ")}>
      <span className="text-[11px] text-muted leading-none whitespace-nowrap">
        Curiosity, by design.
      </span>

      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "group relative inline-flex items-center gap-2",
          "rounded-full border border-border/60 bg-surface-1/15 px-2.5 py-1",
          "backdrop-blur-md",
          "hover:bg-surface-1/30",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          "transition-colors",
        ].join(" ")}
        aria-label="Abrir curiosidades de AtomicCurious"
      >
        {/* Elegant pen + signature stroke */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14.7 3.3l6 6-9.9 9.9-4.2 1.2 1.2-4.2L14.7 3.3Z"
            className="stroke-text/70"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M6.2 20.2c2.6-1 5.2-1.2 7.8-.6 1.6.4 2.8.3 3.8-.2"
            className="stroke-text/70"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: open ? 0 : 60,
              transition: "stroke-dashoffset 420ms cubic-bezier(.2,.8,.2,1)",
            }}
          />
        </svg>

        <span className="text-[11px] font-medium text-text/80 group-hover:text-text">
          Atom
        </span>

        <span className="relative ml-0.5 h-1.5 w-1.5 rounded-full bg-text/60 opacity-60 group-hover:opacity-90" />
      </button>

      <AtomFactBubble
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={btnRef.current}
        facts={facts}
        title="Atom"
        nextLabel="Otra curiosidad"
        closeLabel="Cerrar"
        ariaLabel="Curiosidades de AtomicCurious"
      />
    </span>
  )
}
