type Host = "atom" | "iris" | "core"
type Locale = "es" | "en"

type FaqItem = {
  question: string
  answer: string
}

type PostFaqProps = {
  items: FaqItem[]
  title?: string
  host?: Host
  locale?: Locale
}

const faqTitleByLocale: Record<Locale, string> = {
  es: "Preguntas rápidas",
  en: "Quick Questions",
}

const faqCardByHost: Record<Host, string> = {
  atom: `
    rounded-[22px]
    border-[rgba(var(--accent),0.13)]
    bg-[rgba(var(--accent),0.035)]
    px-5 py-4
    hover:border-[rgba(var(--accent),0.24)]
    hover:bg-[rgba(var(--accent),0.055)]
  `,
  iris: `
    rounded-[24px]
    border-[rgba(var(--accent),0.12)]
    bg-[rgba(var(--accent),0.032)]
    px-6 py-5
    hover:border-[rgba(var(--accent),0.22)]
    hover:bg-[rgba(var(--accent),0.05)]
  `,
  core: `
    rounded-[24px]
    border-[rgba(var(--accent),0.14)]
    bg-[rgba(var(--accent),0.04)]
    px-5 py-4
    hover:border-[rgba(var(--accent),0.26)]
    hover:bg-[rgba(var(--accent),0.06)]
  `,
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export function PostFaq({
  items,
  title,
  host = "atom",
  locale = "es",
}: PostFaqProps) {
  const visibleItems = items.slice(0, 3)
  const isIris = host === "iris"
  const resolvedTitle = title ?? faqTitleByLocale[locale]

  if (process.env.NODE_ENV !== "production" && items.length !== 3) {
    const isDev = process.env.NODE_ENV === "development"

  if (isDev && items.length !== 3) {
  console.warn(
    locale === "en"
      ? `[PostFaq] AtomicCurious recommends exactly 3 questions. Received: ${items.length}.`
      : `[PostFaq] AtomicCurious recomienda exactamente 3 preguntas. Recibidas: ${items.length}.`
  )
}
  }

  return (
    <section
      className={cn("my-14", isIris && "my-16")}
      data-post-block="faq"
      data-faq-count={visibleItems.length}
      data-host={host}
      data-locale={locale}
    >
      <h2
        className={cn(
          "mb-5 tracking-[-0.02em] text-white",
          isIris ? "text-[2rem] font-medium" : "text-2xl font-semibold"
        )}
      >
        {resolvedTitle}
      </h2>

      <div className="space-y-3">
        {visibleItems.map((item, i) => (
          <details
            key={`${item.question}-${i}`}
            className={cn("group border transition", faqCardByHost[host])}
          >
            <summary
              className={cn(
                "flex cursor-pointer list-none items-center gap-4 marker:content-none",
                isIris
                  ? "text-[1rem] font-normal text-white/88"
                  : "text-[1rem] font-medium text-white"
              )}
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className={cn(
                    "shrink-0 rounded-full bg-[rgb(var(--accent))]",
                    isIris ? "h-1 w-1 opacity-75" : "h-1.5 w-1.5"
                  )}
                />

                {item.question}
              </span>

              <svg
                className={cn(
                  "ml-auto shrink-0 transition-transform duration-200 group-open:rotate-180",
                  isIris ? "h-4 w-4 text-white/42" : "h-4 w-4"
                )}
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>

            <p
              className={cn(
                "pt-3",
                isIris
                  ? "text-[0.99rem] leading-8 text-white/66"
                  : "text-[0.98rem] leading-7 text-white/75"
              )}
            >
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}