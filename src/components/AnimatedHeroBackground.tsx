"use client"

import { useMemo } from "react"

type Dot = { top: string; left: string; size: number; delay: number; dur: number; blur: number; opacity: number }

export default function AnimatedHeroBackground() {
  const dots = useMemo<Dot[]>(() => {
    // deterministic-ish positions (no Math.random in render)
    return [
      { top: "18%", left: "12%", size: 10, delay: 0.2, dur: 9.5, blur: 0.6, opacity: 0.35 },
      { top: "32%", left: "78%", size: 8, delay: 1.1, dur: 11.2, blur: 0.8, opacity: 0.28 },
      { top: "64%", left: "22%", size: 12, delay: 0.6, dur: 12.8, blur: 1.0, opacity: 0.26 },
      { top: "70%", left: "70%", size: 7, delay: 1.7, dur: 10.7, blur: 0.7, opacity: 0.25 },
      { top: "44%", left: "52%", size: 6, delay: 0.9, dur: 14.2, blur: 0.7, opacity: 0.22 },
      { top: "22%", left: "56%", size: 9, delay: 2.0, dur: 13.4, blur: 0.9, opacity: 0.20 },
      { top: "58%", left: "86%", size: 11, delay: 0.3, dur: 15.0, blur: 1.1, opacity: 0.18 },
      { top: "80%", left: "10%", size: 8, delay: 1.4, dur: 16.2, blur: 0.9, opacity: 0.18 },
    ]
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient already in your Hero likely; this is the animated layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgb(var(--accent)/0.18),transparent_65%)]" />

      {/* Aurora drift layer */}
      <div className="ac-aurora absolute inset-[-20%] opacity-[0.55]" />

      {/* Soft dots */}
      {dots.map((d, i) => (
        <span
          key={i}
          className="ac-dot absolute rounded-full"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            filter: `blur(${d.blur}px)`,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_20%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.55)_100%)]" />

      <style jsx>{`
        .ac-aurora {
          background:
            radial-gradient(60% 50% at 30% 30%, rgba(34, 211, 238, 0.22), transparent 60%),
            radial-gradient(60% 55% at 70% 40%, rgba(182, 146, 255, 0.20), transparent 62%),
            radial-gradient(55% 55% at 55% 75%, rgba(255, 105, 180, 0.10), transparent 65%);
          transform: translate3d(0, 0, 0);
          filter: blur(22px);
          animation: auroraDrift 14s ease-in-out infinite alternate;
          mix-blend-mode: screen;
        }

        .ac-dot {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(34, 211, 238, 0.55), transparent 70%);
          animation: dotFloat 12s ease-in-out infinite;
          mix-blend-mode: screen;
        }

        @keyframes auroraDrift {
          0% {
            transform: translate3d(-2%, -1%, 0) scale(1.02) rotate(-1deg);
          }
          100% {
            transform: translate3d(2%, 1%, 0) scale(1.06) rotate(1deg);
          }
        }

        @keyframes dotFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(14px, -10px, 0) scale(1.08);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ac-aurora,
          .ac-dot {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
