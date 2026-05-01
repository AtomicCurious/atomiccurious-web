import type { ReactNode } from "react"

const proseStyles = `
  prose prose-invert max-w-none
  selection:bg-[rgba(var(--accent),0.25)] selection:text-white

  prose-p:text-[1.05rem] sm:prose-p:text-[1.1rem]
  prose-p:leading-[1.9]
  prose-p:text-white/80
  prose-p:mb-7

  [&>p:first-of-type]:text-white/90

  prose-strong:text-white prose-strong:font-semibold
  prose-em:text-white/85

  prose-headings:font-semibold
  prose-headings:tracking-[-0.035em]
  prose-headings:text-white

  prose-h2:text-3xl sm:prose-h2:text-4xl
  prose-h3:mt-12 prose-h3:mb-3
  prose-h3:text-xl
  prose-h3:text-white/90

  prose-hr:my-20 prose-hr:border-white/10

  prose-ul:my-7 prose-ul:space-y-2
  prose-li:text-white/80 prose-li:leading-7

  prose-ol:my-7 prose-ol:space-y-2
  prose-ol:list-decimal prose-ol:pl-6

  prose-a:text-[rgb(var(--accent))]
  prose-a:no-underline
  prose-a:font-medium
  hover:prose-a:opacity-80

  prose-blockquote:border-l-[3px]
  prose-blockquote:border-[rgba(var(--accent),0.6)]
  prose-blockquote:bg-white/[0.04]
  prose-blockquote:px-5 prose-blockquote:py-4
  prose-blockquote:rounded-r-xl
  prose-blockquote:text-white/85
  prose-blockquote:not-italic

  prose-code:text-[rgb(var(--accent))]
  prose-code:bg-white/[0.06]
  prose-code:px-1.5 prose-code:py-0.5
  prose-code:rounded-md prose-code:text-sm
`

export function PostProse({ children }: { children: ReactNode }) {
  return (
    <div data-post-prose className="relative">
      <style>
        {`
          [data-post-prose] h2 {
            position: relative;
            margin-top: 5rem;
            margin-bottom: 2.5rem;
            padding-top: 2rem;
            border-bottom: 0 !important;
          }

          [data-post-prose] p + h2,
          [data-post-prose] ul + h2,
          [data-post-prose] ol + h2 {
            margin-top: 5rem;
          }

          [data-post-prose] [data-post-block] + h2 {
            margin-top: 6rem;
          }

          [data-post-prose] h2::before {
            content: "";
            position: absolute;
            top: -18px;
            left: 0;
            width: 60%;
            height: 3px;
            border-radius: 999px;

            background: linear-gradient(
              90deg,
              rgb(var(--accent) / 0.85) 0%,
              rgb(var(--accent) / 0.55) 35%,
              rgb(var(--accent) / 0.22) 70%,
              transparent 100%
            );

            box-shadow: 0 0 12px rgb(var(--accent) / 0.25);
          }
        `}
      </style>

      <div className={`ac-post-reveal ${proseStyles}`} data-delay="2">
        {children}
      </div>
    </div>
  )
}