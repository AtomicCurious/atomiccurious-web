// app/(en)/resources/page.tsx
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Resources | AtomicCurious",
  description:
    "Ebooks, templates, magazine and future products designed for curious minds. Launching July 18, 2026.",
}

const LAUNCH_DATE = "July 18, 2026"

/**
 * Toggle this when you launch Resources.
 * - false = minimal Coming Soon (Core waiting)
 * - true  = full Resources experience (your original page)
 */
const IS_RESOURCES_LIVE = false

/**
 * Shared subtle grain (matches your Community/Newsletter coming-soon visuals)
 */
const COMING_SOON_CSS = `
.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgba(var(--accent),0.10), transparent 55%),
    radial-gradient(circle at 70% 40%, rgba(var(--accent-alt),0.08), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 55%);
  mix-blend-mode: normal;
}
`

/**
 * Your original Resources CSS (kept intact)
 * - Filter bar (radio buttons) controls which guide sections are visible.
 * - Optional highlight based on body[data-character].
 */
const RESOURCES_CSS = `
/* ============ Optional: highlight current selected character section ============ */
.ac-res-section { position: relative; }

body[data-character="core"] .ac-res-section[data-guide="core"],
body[data-character="iris"] .ac-res-section[data-guide="iris"],
body[data-character="atom"] .ac-res-section[data-guide="atom"]{
  outline: 1px solid rgba(var(--accent), 0.28);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 26px 70px rgba(0,0,0,0.35);
}

/* ============ Resource card thumb fallback ============ */
.ac-thumb {
  background: radial-gradient(120% 120% at 30% 20%, rgba(var(--accent),0.18), transparent 55%),
              radial-gradient(120% 120% at 70% 80%, rgba(var(--accent-alt),0.14), transparent 60%),
              linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
}

/* ============ Filter (radio) ============ */
.ac-filter {
  position: relative;
}

.ac-filter input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
}

.ac-filter .ac-pill {
  user-select: none;
  cursor: pointer;
}

/* Selected pill styling */
#ac-f-all:checked  ~ .ac-filterbar label[for="ac-f-all"],
#ac-f-core:checked ~ .ac-filterbar label[for="ac-f-core"],
#ac-f-iris:checked ~ .ac-filterbar label[for="ac-f-iris"],
#ac-f-atom:checked ~ .ac-filterbar label[for="ac-f-atom"]{
  border-color: rgba(var(--accent), 0.30);
  background: rgba(var(--accent), 0.12);
  color: rgb(var(--text));
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 14px 40px rgba(0,0,0,0.25);
}

/* Content switching */
.ac-guide-core, .ac-guide-iris, .ac-guide-atom { display: block; }

#ac-f-core:checked ~ .ac-panel .ac-guide-iris,
#ac-f-core:checked ~ .ac-panel .ac-guide-atom { display: none; }

#ac-f-iris:checked ~ .ac-panel .ac-guide-core,
#ac-f-iris:checked ~ .ac-panel .ac-guide-atom { display: none; }

#ac-f-atom:checked ~ .ac-panel .ac-guide-core,
#ac-f-atom:checked ~ .ac-panel .ac-guide-iris { display: none; }

/* All = show all (default) */
#ac-f-all:checked ~ .ac-panel .ac-guide-core,
#ac-f-all:checked ~ .ac-panel .ac-guide-iris,
#ac-f-all:checked ~ .ac-panel .ac-guide-atom { display: block; }
`

type GuideKey = "core" | "iris" | "atom"

type ResourceCard = {
  title: string
  note: string
  href: string
  thumbnail?: string
  guide: GuideKey
}

type GuideSection = {
  guide: GuideKey
  emoji: string
  heading: string
  avatarSrc: string
  byline: string
  items: ResourceCard[]
}

function ComingSoonResources() {
  return (
    <section className="relative w-full overflow-hidden bg-bg">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_70%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,rgb(var(--accent-alt)/0.07),transparent_62%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute inset-0 ac-grain" />

            {/* Image */}
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-bg/20 shadow-soft">
              <div className="relative aspect-video w-full">
                {/* subtle fallback gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(var(--accent),0.16),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(var(--accent-alt),0.12),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_60%)]" />

                <Image
                  src="/images/sections/Community/Core_Secciones_Inactivas.webp"
                  alt="Core waiting for Resources to launch"
                  fill
                  sizes="(min-width: 1024px) 960px, 92vw"
                  className="object-cover"
                  priority
                />

                {/* Premium vignette */}
                <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] bg-black/35" />

                {/* Label */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-wide text-text shadow-soft backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                  COMING SOON
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="relative mt-6 text-center">
              <p className="text-xs font-semibold tracking-wide text-muted">
                ATOMICCURIOUS · RESOURCES
              </p>

              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                Resources
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
                Ebooks, templates, and carefully crafted products — designed to
                help you think better, learn deeper, and build smarter.
              </p>

              <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/25 px-4 py-2 text-xs font-semibold text-text shadow-soft backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
                Launching <span className="text-text">{LAUNCH_DATE}</span>
              </div>

              <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
                First releases will open gradually.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/newsletter"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-border bg-bg/35 px-5 py-2.5
                    text-sm font-semibold text-text
                    transition hover:border-accent/35 hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                    focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  Get updates →
                </Link>

                <Link
                  href="/"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-border px-5 py-2.5
                    text-sm font-semibold text-text
                    transition hover:bg-surface-2
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55
                    focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                  "
                >
                  Back home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GuideHeader({
  emoji,
  heading,
  avatarSrc,
  byline,
}: {
  emoji: string
  heading: string
  avatarSrc: string
  byline: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-text">
          <span className="mr-2" aria-hidden="true">
            {emoji}
          </span>
          {heading}
        </p>
        <p className="mt-1 text-xs text-muted">{byline}</p>
      </div>

      <div className="shrink-0">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/35 px-3 py-1.5">
          <span className="relative h-5 w-5 overflow-hidden rounded-full border border-border/70 bg-surface-1">
            <Image
              src={avatarSrc}
              alt=""
              aria-hidden="true"
              fill
              sizes="20px"
              className="object-cover"
            />
          </span>
          <span className="text-[11px] font-semibold tracking-wide text-muted">
            Guide
          </span>
        </span>
      </div>
    </div>
  )
}

function ResourceItemCard({ item }: { item: ResourceCard }) {
  const guideName =
    item.guide === "atom" ? "Atom" : item.guide === "iris" ? "Iris" : "Core"
  const avatarSrc =
    item.guide === "atom"
      ? "/images/hosts/atom.webp"
      : item.guide === "iris"
      ? "/images/hosts/iris.webp"
      : "/images/hosts/core.webp"

  return (
    <Link
      href={item.href}
      className={[
        "group block rounded-2xl border border-border/70 bg-surface-1/45",
        "shadow-soft backdrop-blur transition",
        "hover:border-accent/25 hover:bg-surface-2/50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      ].join(" ")}
    >
      <div className="relative overflow-hidden rounded-2xl border-b border-border/60">
        <div className="relative aspect-[4/3] w-full ac-thumb">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 640px) 220px, 90vw"
              className="object-cover opacity-[0.92] transition group-hover:opacity-100"
            />
          ) : (
            <div className="absolute inset-0" aria-hidden="true" />
          )}

          <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/55 px-3 py-1 text-[11px] font-semibold text-text shadow-soft">
            Coming soon
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text">{item.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{item.note}</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative h-6 w-6 overflow-hidden rounded-full border border-border/70 bg-surface-1">
              <Image
                src={avatarSrc}
                alt=""
                aria-hidden="true"
                fill
                sizes="24px"
                className="object-cover"
              />
            </span>
            <p className="text-xs font-medium text-muted">
              Recommended by{" "}
              <span className="font-semibold text-text">{guideName}</span>
            </p>
          </div>

          <span className="text-xs font-semibold text-text/80 transition group-hover:text-text">
            View →
          </span>
        </div>
      </div>
    </Link>
  )
}

function FullResourcesPage() {
  const sections: GuideSection[] = [
    {
      guide: "core",
      emoji: "🧪",
      heading: "Core's Experiments",
      avatarSrc: "/images/hosts/core.webp",
      byline: "Practice, challenges, learning-by-doing.",
      items: [
        {
          title: "Mini Labs Pack",
          note: "Tiny experiments you can run with household stuff.",
          href: "/resources",
          guide: "core",
          thumbnail: "/images/sections/resources/core-1.webp",
        },
        {
          title: "Challenge Cards",
          note: "Short prompts to learn by doing (fast + practical).",
          href: "/resources",
          guide: "core",
          thumbnail: "/images/sections/resources/core-2.webp",
        },
        {
          title: "Hands-on Templates",
          note: "Reusable checklists and frameworks for building skills.",
          href: "/resources",
          guide: "core",
          thumbnail: "/images/sections/resources/core-3.webp",
        },
      ],
    },
    {
      guide: "iris",
      emoji: "🔗",
      heading: "Iris' Pattern Library",
      avatarSrc: "/images/hosts/iris.webp",
      byline: "Patterns, perspective, rankings with criteria.",
      items: [
        {
          title: "Pattern Notes",
          note: "Clean breakdowns: how to see structure in chaos.",
          href: "/resources",
          guide: "iris",
          thumbnail: "/images/sections/resources/iris-1.webp",
        },
        {
          title: "Ranking Sheets",
          note: "Decision matrices + scoring rubrics you can reuse.",
          href: "/resources",
          guide: "iris",
          thumbnail: "/images/sections/resources/iris-2.webp",
        },
        {
          title: "Framework Cards",
          note: "Mental models packaged into quick reference pages.",
          href: "/resources",
          guide: "iris",
          thumbnail: "/images/sections/resources/iris-3.webp",
        },
      ],
    },
    {
      guide: "atom",
      emoji: "💡",
      heading: "Atom's Deep Dives",
      avatarSrc: "/images/hosts/atom.webp",
      byline: "Questions, foundations, clear explanations.",
      items: [
        {
          title: "Deep Dive Essays",
          note: "Foundational explanations — calm, clear, precise.",
          href: "/resources",
          guide: "atom",
          thumbnail: "/images/sections/resources/atom-1.webp",
        },
        {
          title: "Starter Guides",
          note: "Beginner-friendly routes into complex topics.",
          href: "/resources",
          guide: "atom",
          thumbnail: "/images/sections/resources/atom-2.webp",
        },
        {
          title: "Concept Toolkits",
          note: "Definitions + examples + “how to think about it”.",
          href: "/resources",
          guide: "atom",
          thumbnail: "/images/sections/resources/atom-3.webp",
        },
      ],
    },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgb(var(--accent)/0.10),transparent_65%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-wide text-muted">
            ATOMICCURIOUS · RESOURCES
          </p>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Resources for curious minds
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Ebooks, templates, a future magazine and carefully crafted products.
            Everything here is designed to help you think better, learn deeper,
            and build smarter.
          </p>
        </header>

        {/* FILTER + PANEL (CSS-only) */}
        <div className="mx-auto mt-10 w-full max-w-4xl ac-filter">
          {/* radios (default = ALL) */}
          <input type="radio" name="ac-guide" id="ac-f-all" defaultChecked />
          <input type="radio" name="ac-guide" id="ac-f-core" />
          <input type="radio" name="ac-guide" id="ac-f-iris" />
          <input type="radio" name="ac-guide" id="ac-f-atom" />

          {/* Filter bar */}
          <div className="ac-filterbar rounded-2xl border border-border bg-surface-1/40 px-4 py-3 shadow-soft backdrop-blur">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-2 text-xs font-semibold tracking-wide text-muted">
                Filter by guide:
              </span>

              <label
                htmlFor="ac-f-core"
                className="ac-pill inline-flex items-center justify-center rounded-full border border-border bg-bg/30 px-3 py-1 text-xs font-semibold text-text transition"
              >
                Core
              </label>
              <label
                htmlFor="ac-f-iris"
                className="ac-pill inline-flex items-center justify-center rounded-full border border-border bg-bg/30 px-3 py-1 text-xs font-semibold text-text transition"
              >
                Iris
              </label>
              <label
                htmlFor="ac-f-atom"
                className="ac-pill inline-flex items-center justify-center rounded-full border border-border bg-bg/30 px-3 py-1 text-xs font-semibold text-text transition"
              >
                Atom
              </label>
              <label
                htmlFor="ac-f-all"
                className="ac-pill inline-flex items-center justify-center rounded-full border border-border bg-bg/20 px-3 py-1 text-xs font-semibold text-muted transition"
              >
                All
              </label>
            </div>
          </div>

          {/* Panel */}
          <div className="ac-panel mt-12 rounded-3xl border border-border bg-surface-1/35 p-6 shadow-soft backdrop-blur sm:p-7">
            <div className="space-y-10">
              {sections.map((sec) => (
                <section
                  key={sec.guide}
                  className={[
                    "ac-res-section rounded-2xl border border-border/60 bg-bg/20 p-5 sm:p-6",
                    sec.guide === "core"
                      ? "ac-guide-core"
                      : sec.guide === "iris"
                      ? "ac-guide-iris"
                      : "ac-guide-atom",
                  ].join(" ")}
                  data-guide={sec.guide}
                  aria-label={sec.heading}
                >
                  <GuideHeader
                    emoji={sec.emoji}
                    heading={sec.heading}
                    avatarSrc={sec.avatarSrc}
                    byline={sec.byline}
                  />

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {sec.items.map((it) => (
                      <ResourceItemCard key={it.title} item={it} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/newsletter"
            className="
              rounded-xl bg-accent px-6 py-3 font-semibold text-bg
              transition hover:opacity-90
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            Join the newsletter
          </Link>

          <Link
            href="/"
            className="
              rounded-xl border border-border px-6 py-3 font-semibold text-text
              transition hover:bg-surface-2
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
            "
          >
            Back home
          </Link>
        </div>

        <p className="mt-12 text-center text-sm text-muted">
          First releases coming soon.
        </p>
      </div>
    </section>
  )
}

export default function ResourcesPage() {
  return (
    <main className="w-full" data-chmode="none">
      <style
        dangerouslySetInnerHTML={{
          __html: (IS_RESOURCES_LIVE ? RESOURCES_CSS : "") + COMING_SOON_CSS,
        }}
      />

      {IS_RESOURCES_LIVE ? <FullResourcesPage /> : <ComingSoonResources />}
    </main>
  )
}
