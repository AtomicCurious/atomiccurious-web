"use client"

import { useMemo } from "react"

type Intensity = "low" | "medium" | "high"
type Palette = "mixed" | "atom" | "iris" | "core"

type Props = {
  count?: number
  intensity?: Intensity
  palette?: Palette
  className?: string
}

type Tone = "atom" | "iris" | "core"

type Star = {
  id: number
  top: number
  left: number
  size: number
  tail: number
  duration: number
  delay: number
  opacity: number
  blur: number
  driftY: number
  driftX: number
  rotate: number
  tone: Tone
  depth: number
}

const INTENSITY_SCALE: Record<Intensity, number> = {
  low: 0.86,
  medium: 1,
  high: 1.16,
}

function mulberry32(seed: number) {
  let t = seed
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), t | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function pickTone(rand: () => number, palette: Palette): Tone {
  if (palette === "atom") return "atom"
  if (palette === "iris") return "iris"
  if (palette === "core") return "core"

  const value = rand()
  if (value < 0.34) return "atom"
  if (value < 0.68) return "iris"
  return "core"
}

function generateStars(count: number, intensity: Intensity, palette: Palette): Star[] {
  const rand = mulberry32(1847 + count * 17 + intensity.length * 29 + palette.length * 13)
  const scale = INTENSITY_SCALE[intensity]

  return Array.from({ length: count }, (_, i) => {
    const depth = rand() // 0 = lejana, 1 = cercana
    const near = 0.42 + depth * 0.82

    const tail = 42 + depth * 82
    const size = 0.9 + depth * 1.9
    const duration = (6.8 - depth * 2.5) / scale
    const opacity = 0.16 + depth * 0.48
    const blur = depth < 0.45 ? 0.5 + rand() * 0.9 : 0.12 + rand() * 0.3

    return {
      id: i,
      top: 6 + rand() * 78,
      left: -10 - rand() * 22,
      size,
      tail,
      duration,
      delay: -rand() * 12,
      opacity,
      blur,
      driftY: 26 + rand() * 48 + depth * 22,
      driftX: 108 + rand() * 36 + depth * 24,
      rotate: 18 + rand() * 12,
      tone: pickTone(rand, palette),
      depth,
    }
  })
}

export default function ShootingStars({
  count = 7,
  intensity = "medium",
  palette = "mixed",
  className = "",
}: Props) {
  const safeCount = Math.max(1, Math.min(count, 16))

  const stars = useMemo(
    () => generateStars(safeCount, intensity, palette),
    [safeCount, intensity, palette]
  )

  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        {stars.map((star) => (
          <span
            key={star.id}
            className="ac-shooting-star"
            data-tone={star.tone}
            data-depth={star.depth > 0.58 ? "near" : "far"}
            style={
              {
                top: `${star.top}%`,
                left: `${star.left}%`,
                ["--ac-star-size" as string]: `${star.size}px`,
                ["--ac-star-tail" as string]: `${star.tail}px`,
                ["--ac-star-duration" as string]: `${star.duration}s`,
                ["--ac-star-delay" as string]: `${star.delay}s`,
                ["--ac-star-opacity" as string]: star.opacity,
                ["--ac-star-blur" as string]: `${star.blur}px`,
                ["--ac-star-drift-y" as string]: `${star.driftY}vh`,
                ["--ac-star-drift-x" as string]: `${star.driftX}vw`,
                ["--ac-star-rotate" as string]: `${star.rotate}deg`,
              } as React.CSSProperties
            }
          >
            <span className="ac-shooting-star-tail" />
            <span className="ac-shooting-star-core" />
            <span className="ac-shooting-star-glow" />
          </span>
        ))}
      </div>

      <style jsx global>{`
        .ac-shooting-star {
          position: absolute;
          display: block;
          width: var(--ac-star-tail);
          height: calc(var(--ac-star-size) * 2.4);
          opacity: 0;
          filter: blur(var(--ac-star-blur));
          transform:
            translate3d(0, 0, 0)
            rotate(var(--ac-star-rotate));
          transform-origin: left center;
          will-change: transform, opacity;
          animation:
            ac-shooting-star-travel var(--ac-star-duration) cubic-bezier(0.22, 0.61, 0.36, 1) infinite,
            ac-shooting-star-fade var(--ac-star-duration) ease-in-out infinite;
          animation-delay: var(--ac-star-delay), var(--ac-star-delay);
        }

        .ac-shooting-star[data-tone="atom"] {
          --ac-star-rgb: 52, 211, 153;
        }

        .ac-shooting-star[data-tone="iris"] {
          --ac-star-rgb: 34, 211, 238;
        }

        .ac-shooting-star[data-tone="core"] {
          --ac-star-rgb: 251, 146, 60;
        }

        .ac-shooting-star-tail {
          position: absolute;
          inset: 50% auto auto 0;
          width: 100%;
          height: max(1px, calc(var(--ac-star-size) * 0.9));
          border-radius: 999px;
          transform: translateY(-50%);
          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.22) 18%,
              rgba(var(--ac-star-rgb), 0.82) 42%,
              rgba(255, 255, 255, 0.18) 72%,
              rgba(255, 255, 255, 0) 100%
            );
          box-shadow:
            0 0 8px rgba(var(--ac-star-rgb), 0.16),
            0 0 18px rgba(var(--ac-star-rgb), 0.1),
            0 0 34px rgba(var(--ac-star-rgb), 0.06);
        }

        .ac-shooting-star-core {
          position: absolute;
          right: 8%;
          top: 50%;
          width: calc(var(--ac-star-size) * 1.65);
          height: calc(var(--ac-star-size) * 1.65);
          border-radius: 999px;
          transform: translate(50%, -50%);
          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.98) 0%,
              rgba(255, 255, 255, 0.8) 20%,
              rgba(var(--ac-star-rgb), 0.85) 48%,
              rgba(var(--ac-star-rgb), 0.12) 76%,
              rgba(var(--ac-star-rgb), 0) 100%
            );
          box-shadow:
            0 0 10px rgba(255, 255, 255, 0.18),
            0 0 18px rgba(var(--ac-star-rgb), 0.24),
            0 0 36px rgba(var(--ac-star-rgb), 0.12);
        }

        .ac-shooting-star-glow {
          position: absolute;
          right: 10%;
          top: 50%;
          width: calc(var(--ac-star-size) * 4.2);
          height: calc(var(--ac-star-size) * 4.2);
          border-radius: 999px;
          transform: translate(50%, -50%) scale(0.72);
          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.2) 0%,
              rgba(var(--ac-star-rgb), 0.14) 34%,
              rgba(var(--ac-star-rgb), 0.05) 58%,
              rgba(var(--ac-star-rgb), 0) 100%
            );
          animation: ac-shooting-star-pulse calc(var(--ac-star-duration) * 0.75) ease-in-out infinite;
          animation-delay: var(--ac-star-delay);
        }

        .ac-shooting-star[data-depth="far"] .ac-shooting-star-tail {
          opacity: 0.72;
        }

        .ac-shooting-star[data-depth="far"] .ac-shooting-star-glow {
          opacity: 0.58;
        }

        .ac-shooting-star[data-depth="near"] .ac-shooting-star-tail {
          opacity: 1;
        }

        .ac-shooting-star[data-depth="near"] .ac-shooting-star-glow {
          opacity: 0.92;
        }

        @keyframes ac-shooting-star-travel {
          0% {
            transform:
              translate3d(0, 0, 0)
              rotate(var(--ac-star-rotate));
          }
          100% {
            transform:
              translate3d(var(--ac-star-drift-x), var(--ac-star-drift-y), 0)
              rotate(calc(var(--ac-star-rotate) + 1.6deg));
          }
        }

        @keyframes ac-shooting-star-fade {
          0% {
            opacity: 0;
          }
          7% {
            opacity: calc(var(--ac-star-opacity) * 0.8);
          }
          15% {
            opacity: var(--ac-star-opacity);
          }
          68% {
            opacity: calc(var(--ac-star-opacity) * 0.7);
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes ac-shooting-star-pulse {
          0%,
          100% {
            opacity: 0.42;
            transform: translate(50%, -50%) scale(0.72);
          }
          50% {
            opacity: 0.9;
            transform: translate(50%, -50%) scale(1);
          }
        }

        @media (max-width: 640px) {
          .ac-shooting-star {
            width: calc(var(--ac-star-tail) * 0.74);
          }

          .ac-shooting-star-glow {
            width: calc(var(--ac-star-size) * 3.3);
            height: calc(var(--ac-star-size) * 3.3);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-shooting-star,
          .ac-shooting-star-glow {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </>
  )
}