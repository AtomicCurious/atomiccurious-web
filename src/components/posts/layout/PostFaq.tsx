type FaqItem = {
  question: string
  answer: string
}

type PostFaqProps = {
  items: FaqItem[]
  title?: string
}

export function PostFaq({ items, title = "Preguntas rápidas" }: PostFaqProps) {
  const visibleItems = items.slice(0, 3)

  if (process.env.NODE_ENV !== "production" && items.length !== 3) {
    console.warn(
      `[PostFaq] AtomicCurious recomienda exactamente 3 preguntas. Recibidas: ${items.length}.`
    )
  }

  return (
    <section
      className="my-14"
      data-post-block="faq"
      data-faq-count={visibleItems.length}
    >
      <h2 className="mb-5 text-2xl font-semibold tracking-[-0.02em] text-white">
        {title}
      </h2>

      <div className="space-y-3">
        {visibleItems.map((item, i) => (
          <details
            key={`${item.question}-${i}`}
            className="group rounded-[20px] border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 text-[1rem] font-medium text-white marker:content-none">
              <span className="inline-flex items-center gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--accent))]" />
                {item.question}
              </span>

              <svg
                className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180"
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

            <p className="pt-3 text-[0.98rem] leading-7 text-white/75">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}