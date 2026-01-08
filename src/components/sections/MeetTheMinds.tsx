import Image from "next/image"
import { characters } from "@/content/characters"

type MeetCopy = {
  title: string
  subtitle: string
  // ✅ Accept readonly arrays from `as const` content files
  items: readonly {
    name: string
    role: string
    description?: string
  }[]
  cta: { label: string; href: string }
}

type Variant = "stage" | "section" | "hero-iris" | "hero-mini"

// Centralized paths (from src/content/characters.ts)
const characterImageByName: Record<string, string> = {
  Iris: characters.iris.image,
  Atom: characters.atom.image,
  Core: characters.core.image,
}

function StageTrio({
  items,
  hideCaptions = false,
}: {
  items: MeetCopy["items"]
  hideCaptions?: boolean
}) {
  const ordered = ["Atom", "Iris", "Core"]
    .map((name) => items.find((i) => i.name === name))
    .filter(Boolean) as MeetCopy["items"]

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="relative px-4 pt-2 sm:px-0">
        {/* Stage glow (dark-only) */}
        <div className="pointer-events-none absolute inset-x-0 -top-16 mx-auto h-64 w-[60rem] max-w-full rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.30),transparent_65%)] blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-56 w-[50rem] max-w-full rounded-full bg-[radial-gradient(closest-side,rgba(255,77,157,0.25),transparent_70%)] blur-[100px]" />

        <div className="relative grid items-end gap-6 md:grid-cols-3 md:gap-10">
          {ordered.map((item) => {
            const src = characterImageByName[item.name] ?? characters.atom.image
            const isCenter = item.name === "Iris"
            const isLeft = item.name === "Atom"
            const isRight = item.name === "Core"

            return (
              <figure
                key={item.name}
                className={[
                  "relative flex flex-col items-center",
                  isCenter ? "md:-translate-y-6" : "",
                ].join(" ")}
              >
                <div
                  className={[
                    "relative w-full",
                    isCenter ? "h-72 sm:h-80 md:h-[24rem]" : "h-64 sm:h-72 md:h-80",
                  ].join(" ")}
                >
                  {/* Iris extra FX (dark-only) */}
                  {isCenter && (
                    <>
                      {/* left brain */}
                      <div className="pointer-events-none absolute -left-8 top-8 h-32 w-32 opacity-80 animate-pulse sm:-left-12 sm:top-6 sm:h-40 sm:w-40 md:-left-16 md:top-4 md:h-48 md:w-48">
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.3),transparent_60%)] blur-2xl" />
                        <svg
                          viewBox="0 0 100 100"
                          className="relative h-full w-full opacity-60"
                          style={{
                            filter: "drop-shadow(0 0 20px rgba(34,211,238,0.8))",
                          }}
                        >
                          <path
                            d="M50,20 C40,20 35,25 35,35 C35,25 30,20 20,20 C15,20 10,25 10,35 C10,45 15,50 20,55 C15,60 10,65 10,75 C10,85 15,90 25,90 C35,90 40,85 40,75 C40,85 45,90 55,90 C65,90 70,85 70,75 C70,65 65,60 60,55 C65,50 70,45 70,35 C70,25 65,20 55,20 C45,20 40,25 40,35 C40,25 45,20 50,20 Z"
                            fill="none"
                            stroke="#22D3EE"
                            strokeWidth="1.5"
                            opacity="0.6"
                          />
                          <path
                            d="M30,30 Q35,35 30,40"
                            stroke="#22D3EE"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.5"
                          />
                          <path
                            d="M25,45 Q30,48 25,52"
                            stroke="#22D3EE"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.5"
                          />
                          <path
                            d="M35,60 Q40,63 35,68"
                            stroke="#22D3EE"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.5"
                          />
                        </svg>
                      </div>

                      {/* right brain */}
                      <div
                        className="pointer-events-none absolute -right-8 top-8 h-32 w-32 opacity-80 animate-pulse sm:-right-12 sm:top-6 sm:h-40 sm:w-40 md:-right-16 md:top-4 md:h-48 md:w-48"
                        style={{ animationDelay: "0.5s" }}
                      >
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,77,157,0.3),transparent_60%)] blur-2xl" />
                        <svg
                          viewBox="0 0 100 100"
                          className="relative h-full w-full opacity-60"
                          style={{
                            filter: "drop-shadow(0 0 20px rgba(255,77,157,0.8))",
                          }}
                        >
                          <path
                            d="M50,20 C60,20 65,25 65,35 C65,25 70,20 80,20 C85,20 90,25 90,35 C90,45 85,50 80,55 C85,60 90,65 90,75 C90,85 85,90 75,90 C65,90 60,85 60,75 C60,85 55,90 45,90 C35,90 30,85 30,75 C30,65 35,60 40,55 C35,50 30,45 30,35 C30,25 35,20 45,20 C55,20 60,25 60,35 C60,25 55,20 50,20 Z"
                            fill="none"
                            stroke="#FF4D9D"
                            strokeWidth="1.5"
                            opacity="0.6"
                          />
                          <path
                            d="M70,30 Q65,35 70,40"
                            stroke="#FF4D9D"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.5"
                          />
                          <path
                            d="M75,45 Q70,48 75,52"
                            stroke="#FF4D9D"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.5"
                          />
                          <path
                            d="M65,60 Q60,63 65,68"
                            stroke="#FF4D9D"
                            strokeWidth="1"
                            fill="none"
                            opacity="0.5"
                          />
                        </svg>
                      </div>

                      {/* particles */}
                      <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-[15%] top-[20%] h-2 w-2 rounded-full bg-[#22D3EE] blur-[2px] shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-glow" />
                        <div
                          className="absolute right-[18%] top-[25%] h-1.5 w-1.5 rounded-full bg-[#FF4D9D] blur-[1px] shadow-[0_0_10px_rgba(255,77,157,0.8)] animate-glow"
                          style={{ animationDelay: "0.8s" }}
                        />
                        <div
                          className="absolute left-[20%] top-[60%] h-2 w-2 rounded-full bg-[#8B5CF6] blur-[2px] shadow-[0_0_10px_rgba(139,92,246,0.8)] animate-glow"
                          style={{ animationDelay: "1.2s" }}
                        />
                        <div
                          className="absolute right-[15%] top-[65%] h-1 w-1 rounded-full bg-[#22D3EE] blur-[1px] shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-glow"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </>
                  )}

                  {/* Local halo (dark-only) */}
                  <div className="pointer-events-none absolute inset-0">
                    <div
                      className={[
                        "absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]",
                        isCenter
                          ? "h-56 w-56 bg-[radial-gradient(closest-side,rgba(34,211,238,0.35),transparent_65%)]"
                          : "h-48 w-48 bg-[radial-gradient(closest-side,rgba(34,211,238,0.22),transparent_70%)]",
                      ].join(" ")}
                    />
                    <div
                      className={[
                        "absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]",
                        isCenter
                          ? "h-52 w-52 bg-[radial-gradient(closest-side,rgba(255,77,157,0.30),transparent_68%)]"
                          : "h-44 w-44 bg-[radial-gradient(closest-side,rgba(255,77,157,0.18),transparent_72%)]",
                      ].join(" ")}
                    />
                  </div>

                  {/* Character image */}
                  <Image
                    key={src}
                    src={src}
                    alt={item.name}
                    fill
                    priority={isCenter}
                    unoptimized
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.75)]"
                  />

                  {/* Underline accent */}
                  <div className="pointer-events-none absolute left-1/2 top-[92%] h-[2px] w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent opacity-60 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />

                  {/* Side emphasis */}
                  {isLeft && (
                    <div className="pointer-events-none absolute -left-8 top-12 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.18),transparent_70%)] blur-[100px]" />
                  )}
                  {isRight && (
                    <div className="pointer-events-none absolute -right-8 top-12 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(57,255,20,0.15),transparent_70%)] blur-[100px]" />
                  )}
                </div>

                {/* Caption (optional) */}
                {!hideCaptions && (
                  <figcaption className="mt-6 text-center">
                    <p className="text-base font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {item.name}
                    </p>
                    <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {item.role}
                    </p>
                  </figcaption>
                )}
              </figure>
            )
          })}
        </div>

        {!hideCaptions && (
          <div className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-[#22D3EE]/40 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
        )}
      </div>
    </div>
  )
}

function HeroIris() {
  const src = characters.iris.image

  return (
    <div className="pointer-events-none flex justify-center">
      <div className="relative h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] md:h-[340px] md:w-[340px]">
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority
          unoptimized
          sizes="(min-width: 768px) 360px, 320px"
          className="object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.75)]"
        />
      </div>
    </div>
  )
}

function HeroMiniTrio({ items }: { items: MeetCopy["items"] }) {
  const atom = items.find((i) => i.name === "Atom")
  const iris = items.find((i) => i.name === "Iris")
  const core = items.find((i) => i.name === "Core")

  const aSrc = atom ? characterImageByName[atom.name] : characters.atom.image
  const iSrc = iris ? characterImageByName[iris.name] : characters.iris.image
  const cSrc = core ? characterImageByName[core.name] : characters.core.image

  return (
    <div className="pointer-events-none flex justify-center gap-8 sm:gap-10">
      <div className="relative h-[150px] w-[150px] sm:h-[170px] sm:w-[170px] md:h-[190px] md:w-[190px] opacity-90">
        <Image src={aSrc} alt="" fill priority unoptimized className="object-contain" />
      </div>
      <div className="relative h-[170px] w-[170px] sm:h-[200px] sm:w-[200px] md:h-[230px] md:w-[230px] opacity-95">
        <Image src={iSrc} alt="" fill priority unoptimized className="object-contain" />
      </div>
      <div className="relative h-[160px] w-[160px] sm:h-[185px] sm:w-[185px] md:h-[210px] md:w-[210px] opacity-95">
        <Image src={cSrc} alt="" fill priority unoptimized className="object-contain" />
      </div>
    </div>
  )
}

export default function MeetTheMinds({
  copy,
  variant = "section",
}: {
  copy: MeetCopy
  variant?: Variant
}) {
  if (variant === "stage") {
    return <StageTrio items={copy.items} />
  }

  // ✅ Hero variants (no section, no names)
  if (variant === "hero-iris") {
    return <HeroIris />
  }

  if (variant === "hero-mini") {
    return <HeroMiniTrio items={copy.items} />
  }

  // Default: full section
  return (
    <section className="border-t border-border/60 pt-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {copy.title}
          </h2>

          <p className="mt-3 text-pretty text-base leading-relaxed text-muted">
            {copy.subtitle}
          </p>
        </div>

        <a
          href={copy.cta.href}
          className="
            inline-flex w-fit items-center justify-center rounded-xl
            border border-border bg-surface-1
            px-5 py-2.5 text-sm font-semibold text-text shadow-soft transition
            hover:bg-surface-2 hover:border-accent/30
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg
          "
        >
          {copy.cta.label}
          <span className="ml-2 text-muted">›</span>
        </a>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {copy.items.map((item) => (
          <div
            key={item.name}
            className="
              group relative overflow-hidden rounded-2xl
              border border-border bg-surface-1
              p-6 shadow-soft transition
              hover:bg-surface-2 hover:border-accent/25
            "
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_20%_15%,rgb(var(--accent)/0.18),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_25%,rgb(var(--accent-alt)/0.12),transparent_62%)]" />
            </div>

            <p className="relative text-sm font-semibold text-text">{item.name}</p>

            <p className="relative mt-1 text-xs font-medium tracking-wide text-muted">
              {item.role}
            </p>

            {item.description ? (
              <p className="relative mt-4 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            ) : null}

            <div className="relative mt-5 h-px w-10 bg-accent/40" />
          </div>
        ))}
      </div>
    </section>
  )
}
