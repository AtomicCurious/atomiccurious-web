import { formatLabels } from "@/lib/posts-utils"

type PostHeaderAnimatedProps = {
  title: string
  description: string
  format: keyof typeof formatLabels
  tag?: string
  postDate: string
  readingTime?: string
}

export function PostHeaderAnimated({
  title,
  description,
  format,
  tag,
  postDate,
  readingTime,
}: PostHeaderAnimatedProps) {
  return (
    <header className="mx-auto w-full max-w-6xl pb-10">
      <p className="ac-post-breadcrumb text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--accent))]">
        ATOMICCURIOUS · POST
      </p>

      <h1 className="ac-post-h1 mt-5 max-w-5xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-white/90 sm:text-6xl lg:text-7xl">
        {title}
      </h1>

      <p className="ac-post-description mt-6 max-w-2xl text-pretty text-base leading-[1.65] text-[#a0a0a0] sm:text-lg">
        {description}
      </p>

      <div className="ac-post-meta-row mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Badge principal — más silencioso */}
          <span className="rounded-full border border-[rgba(var(--accent),0.34)] bg-[rgba(var(--accent),0.055)] px-3 py-1 text-xs font-medium text-[rgb(var(--accent))]">
            {formatLabels[format]}
          </span>

          {/* Tag secundario — más suave */}
          {tag ? (
            <span className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1 text-xs text-white/55">
              {tag}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-5 text-xs text-white/40">
          <span>{postDate}</span>

          {readingTime ? (
            <>
              <span className="h-3 w-px bg-white/15" />
              <span>{readingTime} de lectura</span>
            </>
          ) : null}
        </div>
      </div>
    </header>
  )
}