//src\components\QuillFeatherIcon.tsx

import * as React from "react"

export default function QuillFeatherIcon({
  className,
  title = "Home",
}: {
  className?: string
  title?: string
}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id="quillFill" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="rgb(var(--accent))" />
          <stop offset="0.6" stopColor="rgb(var(--accent-alt))" />
          <stop offset="1" stopColor="rgba(255,255,255,0.14)" />
        </linearGradient>
        <linearGradient id="quillStroke" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="1" stopColor="rgba(var(--accent-alt),0.35)" />
        </linearGradient>
      </defs>

      <path
        d="M52 7C40 7 28 18 22 32c-5 12-7 21-12 26-2 2 0 5 3 3 7-5 13-13 19-21 8-12 18-22 24-26 4-3 2-7-4-7Z"
        fill="url(#quillFill)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.2"
      />
      <path d="M48 11C34 23 26 37 18 55" stroke="url(#quillStroke)" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path
        d="M42 16 30 28M44 22 30 36M42 30 28 44"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
