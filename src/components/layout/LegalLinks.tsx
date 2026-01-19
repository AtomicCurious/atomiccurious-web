// src/components/layout/LegalLinks.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

type Item = { label: string; href: string }

export default function LegalLinks() {
  const pathname = usePathname()
  const isEs = pathname === "/es" || pathname.startsWith("/es/")

  const items: Item[] = useMemo(() => {
    return isEs
      ? [
          { label: "Privacidad", href: "/es/privacidad" },
          { label: "Términos", href: "/es/terminos" },
          { label: "Cookies", href: "/es/cookies" },
          { label: "Aviso legal", href: "/es/aviso-legal" },
        ]
      : [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "Cookies", href: "/cookies" },
          { label: "Legal", href: "/legal" },
        ]
  }, [isEs])

  return (
    <nav aria-label={isEs ? "Enlaces legales" : "Legal links"} className="min-w-0">
      <ul className="flex min-w-0 flex-wrap items-center gap-2 text-[11px] font-medium text-muted">
        {items.map((it, idx) => (
          <li key={it.href} className="inline-flex min-w-0 items-center">
            <Link
              href={it.href}
              className={[
                "truncate transition",
                "hover:text-text",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              ].join(" ")}
            >
              {it.label}
            </Link>
            {idx < items.length - 1 ? (
              <span aria-hidden className="mx-2 text-border/80">
                ·
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}
