import { formatLabels } from "@/lib/posts-utils"

type Host = "atom" | "iris" | "core"

type Locale = "es" | "en"

type PostHeaderAnimatedProps = {
  title: string
  description: string
  format: keyof typeof formatLabels
  tag?: string
  postDate: string
  readingTime?: string
  host?: Host
  locale?: Locale
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export function PostHeaderAnimated({
  title,
  description,
  format,
  tag,
  postDate,
  readingTime,
  host = "atom",
  locale = "es",
}: PostHeaderAnimatedProps) {
  const isIris = host === "iris"
  const readingTimeSuffix = locale === "es" ? "de lectura" : "read"

  return (
    <header
      className={cn(
        "mx-auto w-full max-w-6xl",
        isIris ? "pb-14" : "pb-10"
      )}
      data-post-block="header"
      data-host={host}
    >
      <p
        className={cn(
          "ac-post-breadcrumb text-xs font-semibold uppercase text-[rgb(var(--accent))]",
          isIris
            ? "tracking-[0.24em] text-[rgb(var(--accent))]/82"
            : "tracking-[0.18em]"
        )}
      >
        {isIris ? "ATOMICCURIOUS · ANALYSIS" : "ATOMICCURIOUS · POST"}
      </p>

      <h1
        className={cn(
          "ac-post-h1 mt-5 max-w-5xl text-balance text-white/90",
          isIris
            ? `
              text-[3.5rem]
              font-medium
              leading-[0.98]
              tracking-[-0.05em]
              sm:text-[4.6rem]
              lg:text-[5.6rem]
            `
            : `
              text-5xl
              font-semibold
              leading-[0.96]
              tracking-[-0.045em]
              sm:text-6xl
              lg:text-7xl
            `
        )}
      >
        {title}
      </h1>

      <p
        className={cn(
          "ac-post-description mt-6 max-w-2xl text-pretty",
          isIris
            ? `
              text-[1.06rem]
              leading-[1.95]
              text-white/60
              sm:text-[1.12rem]
            `
            : `
              text-base
              leading-[1.65]
              text-[#a0a0a0]
              sm:text-lg
            `
        )}
      >
        {description}
      </p>

      <div
        className={cn(
          "ac-post-meta-row mt-7 flex flex-wrap items-center gap-x-6 gap-y-3",
          isIris && "mt-8"
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs",
              isIris
                ? `
                  border border-[rgba(var(--accent),0.18)]
                  bg-[rgba(var(--accent),0.04)]
                  font-normal
                  text-[rgb(var(--accent))]
                `
                : `
                  border border-[rgba(var(--accent),0.34)]
                  bg-[rgba(var(--accent),0.055)]
                  font-medium
                  text-[rgb(var(--accent))]
                `
            )}
          >
            {formatLabels[format]}
          </span>

          {tag ? (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs",
                isIris
                  ? `
                    border border-white/8
                    bg-white/[0.018]
                    text-white/48
                  `
                  : `
                    border border-white/10
                    bg-white/[0.025]
                    text-white/55
                  `
              )}
            >
              {tag}
            </span>
          ) : null}
        </div>

        <div
          className={cn(
            "flex items-center gap-5 text-xs",
            isIris ? "text-white/34" : "text-white/40"
          )}
        >
          <span>{postDate}</span>

          {readingTime ? (
            <>
              <span className="h-3 w-px bg-white/15" />

              <span>
                {readingTime} {readingTimeSuffix}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
}