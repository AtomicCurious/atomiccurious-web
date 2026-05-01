// components/posts/blocks/PostNote.tsx
import { ReactNode } from "react"

type Variant = "note" | "tip" | "warning" | "video"

type Props = {
  children: ReactNode
  variant?: Variant
}

const variantMap: Record<Variant, string> = {
  note: "Nota",
  tip: "Tip",
  warning: "Importante",
  video: "Video",
}

export default function PostNote({
  children,
  variant = "note",
}: Props) {
  return (
    <div className="mt-5 rounded-xl border border-[rgba(var(--accent),0.18)] bg-[rgba(var(--accent),0.06)] px-5 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent))]/70">
        {variantMap[variant]}
      </p>

      <div className="mt-2 text-sm leading-relaxed text-white/80">
        {children}
      </div>
    </div>
  )
}