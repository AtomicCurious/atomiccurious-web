import type { ReactNode } from "react"

type Host = "atom" | "iris" | "core"

type Props = {
  children: ReactNode
  host?: Host
}

const baseProseStyles = `
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
  prose-blockquote:bg-[rgba(var(--accent),0.04)]
  prose-blockquote:px-5 prose-blockquote:py-4
  prose-blockquote:rounded-r-xl
  prose-blockquote:text-white/85
  prose-blockquote:not-italic

  prose-code:text-[rgb(var(--accent))]
  prose-code:bg-[rgba(var(--accent),0.075)]
  prose-code:px-1.5 prose-code:py-0.5
  prose-code:rounded-md prose-code:text-sm
`

const irisProseStyles = `
  prose-p:leading-[2]
  prose-p:text-white/76
  prose-p:mb-8

  prose-headings:font-medium
  prose-headings:tracking-[-0.04em]

  prose-h2:text-[2rem] sm:prose-h2:text-[2.75rem]
  prose-h3:text-[1.18rem]
  prose-h3:font-medium
  prose-h3:text-white/86

  prose-li:text-white/74
  prose-li:leading-8

  prose-blockquote:bg-[rgba(var(--accent),0.035)]
  prose-blockquote:border-[rgba(var(--accent),0.42)]
  prose-blockquote:text-white/78
`

const coreProseStyles = `
  prose-p:text-white/78

  prose-headings:tracking-[-0.03em]

  prose-h2:text-[2rem] sm:prose-h2:text-[2.65rem]
  prose-h3:text-[1.2rem]

  prose-blockquote:bg-[rgba(var(--accent),0.045)]
  prose-blockquote:border-[rgba(var(--accent),0.5)]
`

export function PostProse({ children, host = "atom" }: Props) {
  const isIris = host === "iris"
  const isCore = host === "core"

  return (
    <div data-post-prose data-host={host} className="relative">
      <style>
        {`
          [data-post-prose] h2 {
            position: relative;
            margin-top: ${isIris ? "5.5rem" : isCore ? "5.25rem" : "5rem"};
            margin-bottom: ${isIris ? "2.75rem" : isCore ? "2.6rem" : "2.5rem"};
            padding-top: 2rem;
            border-bottom: 0 !important;
          }

          [data-post-prose] p + h2,
          [data-post-prose] ul + h2,
          [data-post-prose] ol + h2 {
            margin-top: ${isIris ? "5.5rem" : isCore ? "5.25rem" : "5rem"};
          }

          [data-post-prose] [data-post-block] + h2 {
            margin-top: ${isIris ? "6.5rem" : isCore ? "6.25rem" : "6rem"};
          }

          [data-post-prose] h2::before {
            content: "";
            position: absolute;
            top: -18px;
            left: 0;
            width: ${isIris ? "48%" : isCore ? "54%" : "60%"};
            height: ${isIris ? "2px" : isCore ? "3px" : "3px"};
            border-radius: 999px;

            background: linear-gradient(
              90deg,
              rgb(var(--accent) / ${isIris ? "0.68" : isCore ? "0.78" : "0.85"}) 0%,
              rgb(var(--accent) / ${isIris ? "0.42" : isCore ? "0.5" : "0.55"}) 35%,
              rgb(var(--accent) / ${isIris ? "0.16" : isCore ? "0.2" : "0.22"}) 70%,
              transparent 100%
            );

            box-shadow: 0 0 ${isIris ? "8px" : isCore ? "10px" : "12px"} rgb(var(--accent) / ${isIris ? "0.16" : isCore ? "0.22" : "0.25"});
          }
        `}
      </style>

      <div
        className={`ac-post-reveal ${baseProseStyles} ${
          isIris ? irisProseStyles : isCore ? coreProseStyles : ""
        }`}
        data-delay="2"
      >
        {children}
      </div>
    </div>
  )
}