// components/posts/blocks/PostNote.tsx
import { ReactNode } from "react"

type Locale = "es" | "en"
type Variant = "note" | "tip" | "warning" | "video"

type Props = {
  children: ReactNode
  variant?: Variant
  locale?: Locale
}

const variantMap: Record<Locale, Record<Variant, string>> = {
  es: {
    note: "Nota",
    tip: "Tip",
    warning: "Importante",
    video: "Video",
  },
  en: {
    note: "Note",
    tip: "Tip",
    warning: "Important",
    video: "Video",
  },
}

export default function PostNote({
  children,
  variant = "note",
  locale = "es",
}: Props) {
  return (
    <div
      className="mt-5 rounded-xl border border-[rgba(var(--accent),0.14)] bg-[rgba(var(--accent),0.045)] px-5 py-4"
      data-post-block="post-note"
      data-variant={variant}
      data-locale={locale}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent))]/70">
        {variantMap[locale]?.[variant] ?? variantMap.es[variant]}
      </p>

      <div className="mt-2 text-sm leading-relaxed text-white/78">
        {children}
      </div>
    </div>
  )
}