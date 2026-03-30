// app/(en)/about/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | AtomicCurious",
  description:
    "AtomicCurious is an editorial universe for science, technology, and the future—questions, rankings, and interactive experiences guided by Atom, Iris, and Core.",
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      es: "/es/about",
    },
  },
}

type CharacterId = "atom" | "iris" | "core"

function AboutCharacterAccentCss() {
  return (
    <style>{`
      [data-ac-host] { display: none; }

      html:not([data-character]) [data-ac-host="atom"],
      body:not([data-character]) [data-ac-host="atom"],
      html[data-character="atom"] [data-ac-host="atom"],
      body[data-character="atom"] [data-ac-host="atom"],
      html[data-character="iris"] [data-ac-host="iris"],
      body[data-character="iris"] [data-ac-host="iris"],
      html[data-character="core"] [data-ac-host="core"],
      body[data-character="core"] [data-ac-host="core"] {
        display: var(--ac-display, block);
      }

      html:not([data-character]) .ac-about-accent,
      body:not([data-character]) .ac-about-accent,
      html[data-character="atom"] .ac-about-accent,
      body[data-character="atom"] .ac-about-accent {
        color: rgb(52 211 153);
      }

      html[data-character="iris"] .ac-about-accent,
      body[data-character="iris"] .ac-about-accent {
        color: rgb(34 211 238);
      }

      html[data-character="core"] .ac-about-accent,
      body[data-character="core"] .ac-about-accent {
        color: rgb(251 146 60);
      }

      html:not([data-character]) .ac-about-accent-soft,
      body:not([data-character]) .ac-about-accent-soft,
      html[data-character="atom"] .ac-about-accent-soft,
      body[data-character="atom"] .ac-about-accent-soft {
        color: rgba(52, 211, 153, 0.82);
      }

      html[data-character="iris"] .ac-about-accent-soft,
      body[data-character="iris"] .ac-about-accent-soft {
        color: rgba(34, 211, 238, 0.82);
      }

      html[data-character="core"] .ac-about-accent-soft,
      body[data-character="core"] .ac-about-accent-soft {
        color: rgba(251, 146, 60, 0.86);
      }

      html:not([data-character]) .ac-about-kicker,
      body:not([data-character]) .ac-about-kicker,
      html[data-character="atom"] .ac-about-kicker,
      body[data-character="atom"] .ac-about-kicker {
        color: rgba(52, 211, 153, 0.88);
      }

      html[data-character="iris"] .ac-about-kicker,
      body[data-character="iris"] .ac-about-kicker {
        color: rgba(34, 211, 238, 0.88);
      }

      html[data-character="core"] .ac-about-kicker,
      body[data-character="core"] .ac-about-kicker {
        color: rgba(251, 146, 60, 0.9);
      }

      html:not([data-character]) .ac-about-line,
      body:not([data-character]) .ac-about-line,
      html[data-character="atom"] .ac-about-line,
      body[data-character="atom"] .ac-about-line {
        background: linear-gradient(
          to right,
          rgba(52,211,153,0.78),
          rgba(52,211,153,0.20),
          transparent
        );
      }

      html[data-character="iris"] .ac-about-line,
      body[data-character="iris"] .ac-about-line {
        background: linear-gradient(
          to right,
          rgba(34,211,238,0.78),
          rgba(34,211,238,0.20),
          transparent
        );
      }

      html[data-character="core"] .ac-about-line,
      body[data-character="core"] .ac-about-line {
        background: linear-gradient(
          to right,
          rgba(251,146,60,0.82),
          rgba(251,146,60,0.22),
          transparent
        );
      }

      html:not([data-character]) .ac-about-link:hover,
      body:not([data-character]) .ac-about-link:hover,
      html[data-character="atom"] .ac-about-link:hover,
      body[data-character="atom"] .ac-about-link:hover {
        color: rgb(52 211 153);
      }

      html[data-character="iris"] .ac-about-link:hover,
      body[data-character="iris"] .ac-about-link:hover {
        color: rgb(34 211 238);
      }

      html[data-character="core"] .ac-about-link:hover,
      body[data-character="core"] .ac-about-link:hover {
        color: rgb(251 146 60);
      }

      html:not([data-character]) .ac-about-ring,
      body:not([data-character]) .ac-about-ring,
      html[data-character="atom"] .ac-about-ring,
      body[data-character="atom"] .ac-about-ring {
        border-color: rgba(52, 211, 153, 0.18);
        box-shadow: 0 24px 60px -34px rgba(52, 211, 153, 0.16);
      }

      html[data-character="iris"] .ac-about-ring,
      body[data-character="iris"] .ac-about-ring {
        border-color: rgba(34, 211, 238, 0.18);
        box-shadow: 0 24px 60px -34px rgba(34, 211, 238, 0.16);
      }

      html[data-character="core"] .ac-about-ring,
      body[data-character="core"] .ac-about-ring {
        border-color: rgba(251, 146, 60, 0.20);
        box-shadow: 0 24px 60px -34px rgba(251, 146, 60, 0.18);
      }

      html:not([data-character]) .ac-about-hero-frame,
      body:not([data-character]) .ac-about-hero-frame,
      html[data-character="atom"] .ac-about-hero-frame,
      body[data-character="atom"] .ac-about-hero-frame {
        --ac-about-hero-ring: rgba(52, 211, 153, 0.20);
        --ac-about-hero-glow: rgba(52, 211, 153, 0.12);
        --ac-about-hero-soft: rgba(52, 211, 153, 0.10);
      }

      html[data-character="iris"] .ac-about-hero-frame,
      body[data-character="iris"] .ac-about-hero-frame {
        --ac-about-hero-ring: rgba(34, 211, 238, 0.20);
        --ac-about-hero-glow: rgba(34, 211, 238, 0.12);
        --ac-about-hero-soft: rgba(34, 211, 238, 0.10);
      }

      html[data-character="core"] .ac-about-hero-frame,
      body[data-character="core"] .ac-about-hero-frame {
        --ac-about-hero-ring: rgba(251, 146, 60, 0.22);
        --ac-about-hero-glow: rgba(251, 146, 60, 0.13);
        --ac-about-hero-soft: rgba(251, 146, 60, 0.11);
      }

      .ac-about-hero-frame {
        border-color: var(--ac-about-hero-ring, rgba(52, 211, 153, 0.20));
        box-shadow:
          0 1px 0 rgba(255,255,255,0.04),
          0 24px 60px -40px var(--ac-about-hero-glow, rgba(52, 211, 153, 0.12));
      }

      .ac-about-hero-topline {
        background: linear-gradient(
          to right,
          var(--ac-about-hero-ring, rgba(52, 211, 153, 0.20)),
          transparent
        );
      }

      .ac-about-hero-radial {
        background:
          radial-gradient(circle at 50% 8%, var(--ac-about-hero-soft, rgba(52, 211, 153, 0.10)), transparent 42%);
      }

      .ac-about-manifesto {
        position: relative;
        overflow: hidden;
        background:
          linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012)),
          linear-gradient(180deg, rgba(5,10,20,0.92), rgba(3,7,18,0.86));
      }

      .ac-about-manifesto::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          radial-gradient(circle at 12% 16%, rgba(255,255,255,0.06), transparent 28%),
          radial-gradient(circle at 88% 24%, rgba(255,255,255,0.05), transparent 24%),
          radial-gradient(circle at 82% 80%, rgba(255,255,255,0.03), transparent 28%);
      }

      .ac-about-manifesto::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(to bottom, rgba(255,255,255,0.03), transparent 22%),
          linear-gradient(to right, rgba(255,255,255,0.015), transparent 38%);
        mix-blend-mode: screen;
      }

      html:not([data-character]) .ac-about-quote-mark,
      body:not([data-character]) .ac-about-quote-mark,
      html[data-character="atom"] .ac-about-quote-mark,
      body[data-character="atom"] .ac-about-quote-mark {
        color: rgba(52, 211, 153, 0.22);
      }

      html[data-character="iris"] .ac-about-quote-mark,
      body[data-character="iris"] .ac-about-quote-mark {
        color: rgba(34, 211, 238, 0.22);
      }

      html[data-character="core"] .ac-about-quote-mark,
      body[data-character="core"] .ac-about-quote-mark {
        color: rgba(251, 146, 60, 0.24);
      }

      html:not([data-character]) .ac-about-button,
      body:not([data-character]) .ac-about-button,
      html[data-character="atom"] .ac-about-button,
      body[data-character="atom"] .ac-about-button {
        background: rgb(52 211 153);
        color: rgb(5 10 20);
        box-shadow: 0 18px 40px -24px rgba(52, 211, 153, 0.42);
      }

      html[data-character="iris"] .ac-about-button,
      body[data-character="iris"] .ac-about-button {
        background: rgb(34 211 238);
        color: rgb(5 10 20);
        box-shadow: 0 18px 40px -24px rgba(34, 211, 238, 0.42);
      }

      html[data-character="core"] .ac-about-button,
      body[data-character="core"] .ac-about-button {
        background: rgb(251 146 60);
        color: rgb(5 10 20);
        box-shadow: 0 18px 40px -24px rgba(251, 146, 60, 0.42);
      }

      .ac-about-button:hover {
        filter: brightness(1.06);
      }

      .ac-about-purpose {
        position: relative;
        margin-top: 0.9rem;
        padding-left: 1rem;
        font-weight: 500;
        color: rgb(255 255 255 / 0.96);
      }

      .ac-about-purpose::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.24em;
        width: 3px;
        height: 1.12em;
        border-radius: 999px;
        background: currentColor;
      }

      html:not([data-character]) .ac-about-purpose,
      body:not([data-character]) .ac-about-purpose,
      html[data-character="atom"] .ac-about-purpose,
      body[data-character="atom"] .ac-about-purpose {
        color: rgb(255 255 255 / 0.96);
      }

      html:not([data-character]) .ac-about-purpose::before,
      body:not([data-character]) .ac-about-purpose::before,
      html[data-character="atom"] .ac-about-purpose::before,
      body[data-character="atom"] .ac-about-purpose::before {
        background: rgb(52 211 153);
        box-shadow: 0 0 14px rgba(52, 211, 153, 0.22);
      }

      html[data-character="iris"] .ac-about-purpose,
      body[data-character="iris"] .ac-about-purpose {
        color: rgb(255 255 255 / 0.96);
      }

      html[data-character="iris"] .ac-about-purpose::before,
      body[data-character="iris"] .ac-about-purpose::before {
        background: rgb(34 211 238);
        box-shadow: 0 0 14px rgba(34, 211, 238, 0.22);
      }

      html[data-character="core"] .ac-about-purpose,
      body[data-character="core"] .ac-about-purpose {
        color: rgb(255 255 255 / 0.96);
      }

      html[data-character="core"] .ac-about-purpose::before,
      body[data-character="core"] .ac-about-purpose::before {
        background: rgb(251 146 60);
        box-shadow: 0 0 14px rgba(251, 146, 60, 0.22);
      }

      @keyframes acHeroAura {
        0%, 100% {
          opacity: 0.24;
          transform: scale(1);
        }
        50% {
          opacity: 0.38;
          transform: scale(1.018);
        }
      }

      @keyframes acHeroBorderBreath {
        0%, 100% {
          opacity: 0.14;
        }
        50% {
          opacity: 0.28;
        }
      }

      @keyframes acHeroImageDrift {
        0%, 100% {
          transform: scale(1.028) translate3d(0,0,0);
        }
        50% {
          transform: scale(1.034) translate3d(0,-2px,0);
        }
      }

      .ac-about-hero-ambient {
        position: absolute;
        inset: -8%;
        pointer-events: none;
        border-radius: 999px;
        filter: blur(42px);
        opacity: 0.24;
        animation: acHeroAura 7s ease-in-out infinite;
      }

      .ac-about-hero-border-glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
        border-radius: inherit;
        box-shadow:
          inset 0 0 0 1px rgba(255,255,255,0.05),
          0 0 0 1px rgba(255,255,255,0.02);
        opacity: 0.14;
        animation: acHeroBorderBreath 5.5s ease-in-out infinite;
      }

      .ac-about-hero-image {
        animation: acHeroImageDrift 8s ease-in-out infinite;
        will-change: transform;
      }
    `}</style>
  )
}

function CharacterStoryCard({
  id,
  label,
  chapter,
  title,
  body,
  href,
  cta,
}: {
  id: CharacterId
  label: string
  chapter: string
  title: string
  body: string
  href: string
  cta: string
}) {
  const accentGlow =
    id === "atom"
      ? "bg-[radial-gradient(circle_at_20%_8%,rgb(var(--accent)/0.16),transparent_56%)]"
      : id === "iris"
        ? "bg-[radial-gradient(circle_at_20%_8%,rgb(var(--accent-alt)/0.15),transparent_56%)]"
        : "bg-[radial-gradient(circle_at_20%_8%,rgba(251,146,60,0.14),transparent_58%)]"

  const badgeBorder =
    id === "atom"
      ? "border-[rgba(52,211,153,0.30)]"
      : id === "iris"
        ? "border-[rgba(34,211,238,0.30)]"
        : "border-[rgba(251,146,60,0.28)]"

  const badgeText =
    id === "atom"
      ? "text-[rgb(52,211,153)]"
      : id === "iris"
        ? "text-[rgb(34,211,238)]"
        : "text-[rgb(251,146,60)]"

  const chapterText =
    id === "atom"
      ? "text-[rgba(52,211,153,0.82)]"
      : id === "iris"
        ? "text-[rgba(34,211,238,0.82)]"
        : "text-[rgba(251,146,60,0.84)]"

  const hoverText =
    id === "atom"
      ? "group-hover:text-[rgb(52,211,153)]"
      : id === "iris"
        ? "group-hover:text-[rgb(34,211,238)]"
        : "group-hover:text-[rgb(251,146,60)]"

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[30px]",
        "border border-border bg-surface-1/95 p-7 shadow-soft",
        "transition duration-300 hover:bg-surface-2/95 hover:border-white/10",
        "sm:p-8",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 opacity-0 transition duration-500",
          "group-hover:opacity-100",
          accentGlow,
        ].join(" ")}
      />

      <div className="relative flex h-full flex-col">
        <span
          className={[
            "inline-flex w-fit items-center rounded-full border bg-bg/30 px-4 py-2",
            "text-[10px] font-semibold tracking-[0.14em]",
            badgeBorder,
            badgeText,
          ].join(" ")}
        >
          {label}
        </span>

        <p
          className={[
            "mt-4 text-[11px] font-semibold uppercase tracking-[0.2em]",
            chapterText,
          ].join(" ")}
        >
          {chapter}
        </p>

        <h3 className="mt-6 max-w-[20ch] text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-text">
          {title}
        </h3>

        <p className="mt-5 max-w-[34ch] text-base leading-8 text-muted">
          {body}
        </p>

        <div className="relative mt-auto pt-8">
          <Link
            href={href}
            className={[
              "inline-flex items-center gap-2 text-sm font-semibold text-text transition duration-300",
              hoverText,
            ].join(" ")}
          >
            {cta} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

function HeroCharacterVisual() {
  const heroImages: Record<
    CharacterId,
    { src: string; alt: string; objectPosition?: string }
  > = {
    atom: {
      src: "/images/sections/about/about_equipo_v5.webp",
      alt: "Atom, Iris and Core in an AtomicCurious editorial scene",
      objectPosition: "56% 36%",
    },
    iris: {
      src: "/images/sections/about/about_equipo_v5.webp",
      alt: "Atom, Iris and Core in an AtomicCurious editorial scene",
      objectPosition: "56% 36%",
    },
    core: {
      src: "/images/sections/about/about_equipo_v5.webp",
      alt: "Atom, Iris and Core in an AtomicCurious editorial scene",
      objectPosition: "56% 36%",
    },
  }

  return (
    <aside className="w-full self-stretch">
      <div className="ac-about-hero-frame relative h-full overflow-hidden rounded-[30px] border bg-surface-1/85 shadow-soft backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="ac-about-hero-radial pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="ac-about-hero-topline absolute inset-x-0 top-0 h-px"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%,rgba(0,0,0,0.10)_100%)]"
        />
        <div
          aria-hidden="true"
          className="ac-about-hero-ambient bg-[radial-gradient(circle,rgba(52,211,153,0.14),transparent_64%)]"
        />

        <div className="relative h-full w-full p-3">
          <div className="relative h-full min-h-[720px] overflow-hidden rounded-[24px] border border-white/8 bg-bg/40 lg:min-h-0">
            {(Object.entries(heroImages) as [
              CharacterId,
              (typeof heroImages)[CharacterId],
            ][]).map(([key, image]) => (
              <Image
                key={key}
                data-ac-host={key}
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="ac-about-hero-image object-cover"
                style={{
                  objectPosition: image.objectPosition,
                  ["--ac-display" as string]: "block",
                }}
              />
            ))}

            <div aria-hidden="true" className="ac-about-hero-border-glow" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/6"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.42),rgba(2,6,23,0.04)_38%,transparent_70%)]"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default function Page() {
  return (
    <div className="relative w-full overflow-hidden bg-bg">
      <AboutCharacterAccentCss />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        <div className="absolute -top-28 left-0 h-[560px] w-[820px] bg-[radial-gradient(circle_at_25%_25%,rgb(var(--accent)/0.18),transparent_62%)]" />
        <div className="absolute -bottom-44 right-0 h-[560px] w-[820px] bg-[radial-gradient(circle_at_75%_55%,rgb(var(--accent-alt)/0.13),transparent_64%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_20%_30%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_80%_35%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_40%_80%,#fff_1px,transparent_1.5px)] [background-size:420px_420px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,transparent_55%,rgb(0_0_0/0.60)_100%)] opacity-80" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        <header className="grid items-stretch gap-10 lg:grid-cols-2 xl:gap-14">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-wide text-muted">
              ATOMICCURIOUS · ABOUT
            </p>

            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl xl:text-6xl">
              An editorial universe for{" "}
              <span className="ac-about-accent">curiosity</span>.
            </h1>

            <div
              aria-hidden="true"
              className="ac-about-line mt-5 h-px w-24 rounded-full opacity-80"
            />

            <div className="mt-4 max-w-4xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              <p>AtomicCurious begins with a clear intention:</p>

              <p className="ac-about-purpose">
                design your curiosity, develop your own perspective
              </p>

              <p className="mt-5">
                Because we believe learning should not feel like a maze of
                complicated concepts, but an adventure that pulls you in — like
                learning for the joy of it, without schedules or obligations,
                with the freedom to ask, get things wrong, and try again.
              </p>
            </div>

            <div className="mt-8">
              <div className="ac-about-manifesto ac-about-ring overflow-hidden rounded-[30px] border border-border px-7 py-7 shadow-soft sm:px-8 sm:py-8">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="ac-about-quote-mark absolute -left-1 -top-10 text-7xl font-semibold leading-none sm:-top-11 sm:text-[84px]"
                  >
                    “
                  </span>

                  <p className="max-w-2xl pr-2 text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight text-text sm:text-[2.35rem]">
                    What matters is that something in you wanted to know more.
                  </p>

                  <p className="mt-5 max-w-[34ch] text-base leading-8 text-white/78 sm:text-lg">
                    Because curiosity is one of the most human ways to evolve.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <HeroCharacterVisual />
        </header>

        <section className="mt-14 border-t border-border pt-12">
          <p className="ac-about-kicker text-[11px] font-medium uppercase tracking-[0.18em]">
            What defines AtomicCurious
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text">
            Our way of creating
          </h2>

          <div
            aria-hidden="true"
            className="ac-about-line mt-4 h-px w-20 rounded-full opacity-70"
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Make the complex feel more{" "}
                <span className="ac-about-accent">clear</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We turn intimidating topics into clear mental models — without
                diluting their depth.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                Precision, not{" "}
                <span className="ac-about-accent">saturation</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Strong visuals, clear writing, and calm design — all with
                intention.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-1 p-6 shadow-soft transition hover:bg-surface-2 hover:border-accent/20">
              <p className="text-sm font-semibold text-text">
                A universe you can return to
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Videos spark curiosity. The site keeps knowledge searchable,
                structured, and useful.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <p className="ac-about-kicker text-[11px] font-medium uppercase tracking-[0.18em]">
              How they arrived here
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-text">
              Three stories. One shared impulse.
            </h2>

            <p className="text-muted">
              They did not enter through the same door.{" "}
              <span className="ac-about-accent-soft">
                Each one found a different reason to stay.
              </span>
            </p>
          </div>

          <div
            aria-hidden="true"
            className="ac-about-line mt-4 h-px w-20 rounded-full opacity-70"
          />

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            <CharacterStoryCard
              id="atom"
              label="ATOM · THE DESIGN"
              chapter="CHAPTER 01"
              title="Atom arrived understanding that not everything deserves your attention."
              body="Atom always felt that curiosity without direction tends to scatter. Not everything is worth your time, and not everything deserves to be explored. When he found AtomicCurious, he discovered that curiosity can also be designed: choosing more carefully what to pause for, what to go deeper into, and what to let pass."
              href="/posts?format=curiosity"
              cta="Enter with Atom"
            />

            <CharacterStoryCard
              id="iris"
              label="IRIS · THE CLARITY"
              chapter="CHAPTER 02"
              title="Iris stayed when she saw that wonder could also be shaped into clarity."
              body="Wonder was never enough for Iris on its own. She wanted to understand, compare, separate what matters from noise, and find the logic behind ideas. She joined AtomicCurious because she saw a place where wonder did not stop at the surface, but could become clarity, context, and perspective."
              href="/posts?format=ranked"
              cta="See with Iris"
            />

            <CharacterStoryCard
              id="core"
              label="CORE · THE IMPULSE"
              chapter="CHAPTER 03"
              title="Core appeared when curiosity wanted to become an experience."
              body="For Core, learning was never something still. He needed to play, test, fail, and discover from the inside. That is why he found his place in AtomicCurious: because here curiosity is not only observed, it is touched. With him, every idea can feel more alive, more immediate, and more memorable."
              href="/posts?format=quiz"
              cta="Play with Core"
            />
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-12">
          <div className="ac-about-ring overflow-hidden rounded-3xl border border-border bg-surface-1 p-8 shadow-soft transition sm:p-10">
            <div className="max-w-none">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
                AtomicCurious · Designed curiosity
              </p>

              <p className="mt-4 text-[0.95rem] font-medium leading-relaxed text-white/88 sm:text-[1.08rem] md:text-[1.14rem] lg:text-[1.18rem] xl:text-[1.22rem]">
                “We may not remember every fact, but we never forget what
                awakened our curiosity.”
              </p>
            </div>
          </div>

          <div className="ac-about-ring mt-4 overflow-hidden rounded-3xl border border-border bg-surface-1 px-8 py-6 shadow-soft transition sm:px-10 sm:py-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold text-text sm:text-xl">
                  Join the{" "}
                  <span className="ac-about-accent">
                    AtomicCurious newsletter
                  </span>
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  Exclusive content and early access to tools — designed for
                  curious minds.
                </p>
              </div>

              <Link
                href="/newsletter"
                className={[
                  "ac-about-button inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold",
                  "transition duration-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                ].join(" ")}
              >
                Subscribe <span aria-hidden className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}