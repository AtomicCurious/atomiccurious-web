import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Subscription confirmed | AtomicCurious",
  description: "Your AtomicCurious newsletter subscription is confirmed.",
  alternates: {
    canonical: "/newsletter/confirmed",
    languages: {
      en: "/newsletter/confirmed",
      es: "/es/newsletter/confirmed",
    },
  },
}

const CONFIRMED_CSS = `
/* ── BACKGROUND ── */
.ac-confirm-bg{
  background:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.06), transparent 32%),
    radial-gradient(circle at 82% 0%, rgb(var(--accent) / 0.12), transparent 30%),
    radial-gradient(circle at 70% 38%, rgb(var(--accent-alt) / 0.09), transparent 34%),
    linear-gradient(to bottom, rgba(255,255,255,0.02), transparent 28%);
  animation: acGlowDrift 9s ease-in-out infinite;
}

.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
    radial-gradient(circle at 80% 0%, rgb(var(--accent) / 0.08), transparent 55%),
    radial-gradient(circle at 70% 40%, rgb(var(--accent-alt) / 0.06), transparent 58%),
    linear-gradient(to bottom, rgba(255,255,255,0.03), transparent 55%);
  mix-blend-mode: normal;
  opacity: 0.9;
}

/* ── SHELL ── */
.ac-editorial-shell{
  position: relative;
  isolation: isolate;
}

.ac-editorial-shell::before{
  content: "";
  position: absolute;
  left: 10%;
  right: 10%;
  top: -90px;
  height: 220px;
  pointer-events: none;
  filter: blur(30px);
  opacity: 0.95;
  background: radial-gradient(ellipse at center, rgb(var(--accent) / 0.18), transparent 72%);
  animation: acHaloPulse 7s ease-in-out infinite;
}

.ac-editorial-shell::after{
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1.75rem;
  pointer-events: none;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.06),
    inset 0 -1px 0 rgba(255,255,255,0.02);
}

/* ── ORBIT ── */
.ac-orbit{
  position: absolute;
  inset: 52% auto auto 50%;
  width: min(56vw, 580px);
  height: min(56vw, 580px);
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  pointer-events: none;
  opacity: 0.42;
  filter: blur(1.25px);
  background:
    radial-gradient(circle, transparent 54%, rgb(var(--accent) / 0.13) 59%, transparent 64%),
    radial-gradient(circle, transparent 65%, rgb(var(--accent-alt) / 0.08) 69%, transparent 73%),
    radial-gradient(circle at 50% 50%, rgb(var(--accent) / 0.04), transparent 42%);
  animation: acOrbitBreath 7.2s ease-in-out infinite;
}

@keyframes acOrbitBreath{
  0%,100%{ transform: translate(-50%,-50%) scale(1); opacity: .38; }
  50%{ transform: translate(-50%,-50%) scale(1.04); opacity: .50; }
}

/* ── RULE ── */
.ac-confirm-rule{
  width: 94px;
  height: 1px;
  margin: 0 auto;
  border-radius: 9999px;
  background: linear-gradient(to right, transparent, rgb(var(--accent) / 0.72), transparent);
}

/* ── REVEALS ── */
.ac-reveal{
  opacity: 0;
  transform: translateY(18px);
  animation: acReveal 0.82s cubic-bezier(.22,1,.36,1) forwards;
  will-change: opacity, transform;
}
.ac-delay-1{ animation-delay: 0.04s; }
.ac-delay-2{ animation-delay: 0.12s; }
.ac-delay-3{ animation-delay: 0.20s; }
.ac-delay-4{ animation-delay: 0.28s; }
.ac-delay-5{ animation-delay: 0.36s; }
.ac-delay-6{ animation-delay: 0.46s; }
.ac-delay-7{ animation-delay: 0.56s; }
.ac-delay-8{ animation-delay: 0.66s; }

@keyframes acReveal{
  to{ opacity: 1; transform: translateY(0); }
}

@keyframes acGlowDrift{
  0%,100%{ transform: scale(1) translate3d(0,0,0); opacity: 1; }
  50%{ transform: scale(1.02) translate3d(0,-8px,0); opacity: 0.96; }
}

@keyframes acHaloPulse{
  0%,100%{ opacity: 0.90; transform: scale(1); }
  50%{ opacity: 1; transform: scale(1.03); }
}

/* ── IMAGE CARD: champagne-gold frame ── */
.ac-image-frame{
  position: relative;
  isolation: isolate;
  transform: translateZ(0);
  box-shadow:
    0 26px 60px rgba(0,0,0,0.32),
    0 10px 26px rgba(194,166,96,0.10);
}

.ac-image-frame::before{
  content: "";
  position: absolute;
  inset: -14px;
  border-radius: 1.6rem;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 24%, rgba(205,182,120,0.26), transparent 26%),
    radial-gradient(circle at 82% 18%, rgba(255,248,228,0.22), transparent 24%),
    radial-gradient(circle at 50% 100%, rgba(188,160,92,0.14), transparent 30%);
  filter: blur(28px);
  opacity: 1;
  z-index: 0;
}

.ac-image-frame::after{
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.12), transparent 18%, transparent 82%, rgba(255,255,255,0.05)),
    linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 20%);
  box-shadow:
    0 0 0 1px rgba(255,248,236,0.36),
    0 0 0 2px rgba(198,171,103,0.20) inset,
    0 0 30px rgba(198,171,103,0.18),
    0 20px 54px rgba(198,171,103,0.10);
  z-index: 5;
  transition: box-shadow .35s ease;
}

.ac-image-frame:hover::after{
  box-shadow:
    0 0 0 1px rgba(255,248,236,0.44),
    0 0 0 2px rgba(198,171,103,0.28) inset,
    0 0 42px rgba(198,171,103,0.26),
    0 24px 64px rgba(198,171,103,0.14);
}

/* ── GOLD FOIL SWEEP ── */
.ac-gold-foil{
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  overflow: hidden;
  border-radius: inherit;
}

.ac-gold-foil::before{
  content: "";
  position: absolute;
  top: -10%;
  bottom: -10%;
  width: 26%;
  background: linear-gradient(
    110deg,
    transparent 0%,
    rgba(255,248,232,0.06) 30%,
    rgba(255,252,244,0.22) 50%,
    rgba(198,171,103,0.12) 66%,
    transparent 100%
  );
  transform: translateX(-180%);
  animation: acGoldSweep 12s ease-in-out infinite;
}

@keyframes acGoldSweep{
  0%{ transform: translateX(-180%); opacity: 0; }
  2%{ opacity: 1; }
  14%{ transform: translateX(390%); opacity: 1; }
  16%{ transform: translateX(390%); opacity: 0; }
  70%{ transform: translateX(-180%); opacity: 0; }
  72%{ opacity: 1; }
  84%{ transform: translateX(390%); opacity: 1; }
  86%,100%{ transform: translateX(390%); opacity: 0; }
}

/* ── MEDIA WRAPPER ── */
.ac-confirm-media{
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.ac-confirm-media::before{
  content: "";
  position: absolute;
  inset: -18%;
  background:
    conic-gradient(
      from 180deg,
      transparent 0deg,
      rgba(198,171,103,0.10) 90deg,
      transparent 180deg,
      rgba(255,248,232,0.07) 270deg,
      transparent 360deg
    );
  filter: blur(22px);
  animation: acRotateAura 22s linear infinite;
  z-index: 0;
}

.ac-confirm-media::after{
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(to top, rgba(0,0,0,0.18), transparent 36%),
    radial-gradient(circle at 50% 8%, rgba(255,255,255,0.05), transparent 24%),
    linear-gradient(to bottom, rgba(255,255,255,0.03), transparent 22%);
  z-index: 2;
}

@keyframes acRotateAura{
  to{ transform: rotate(360deg); }
}

.ac-confirm-image{
  transform: scale(1) translateY(0px);
  animation: acFloatImage 12s ease-in-out infinite;
  will-change: transform;
}

@keyframes acFloatImage{
  0%,100%{ transform: scale(1) translateY(0px); }
  50%{ transform: scale(1) translateY(-5px); }
}

/* ── CELEBRATION SPARKS ── */
.ac-sparks{
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 6;
  overflow: hidden;
  border-radius: inherit;
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 36%, transparent 58%);
  mask-image: linear-gradient(to bottom, black 0%, black 36%, transparent 58%);
}

.ac-spark{
  position: absolute;
  font-style: normal;
  line-height: 1;
  user-select: none;
  opacity: 0;
  will-change: opacity, transform;
}

.ac-spark-1{ left: 6%; top: 12%; font-size: 18px; color: rgba(255,240,180,0.92); text-shadow: 0 0 10px rgba(198,171,103,0.60); animation: acSparkFloat 8s ease-in-out infinite; animation-delay: 0.2s; }
.ac-spark-2{ left: 22%; top: 8%; font-size: 11px; color: rgba(255,248,210,0.80); text-shadow: 0 0 8px rgba(198,171,103,0.45); animation: acSparkFloat 7s ease-in-out infinite; animation-delay: 1.1s; }
.ac-spark-3{ left: 44%; top: 6%; font-size: 15px; color: rgba(255,235,160,0.85); text-shadow: 0 0 12px rgba(198,171,103,0.55); animation: acSparkFloat 9s ease-in-out infinite; animation-delay: 2.4s; }
.ac-spark-4{ left: 74%; top: 10%; font-size: 20px; color: rgba(255,242,190,0.90); text-shadow: 0 0 12px rgba(198,171,103,0.60); animation: acSparkFloat 8.5s ease-in-out infinite; animation-delay: 0.6s; }
.ac-spark-5{ left: 90%; top: 7%; font-size: 10px; color: rgba(255,248,210,0.75); text-shadow: 0 0 7px rgba(198,171,103,0.40); animation: acSparkFloat 7.5s ease-in-out infinite; animation-delay: 3.2s; }
.ac-spark-6{ left: 14%; top: 28%; font-size: 9px; color: rgba(255,240,185,0.55); text-shadow: 0 0 6px rgba(198,171,103,0.30); animation: acSparkFloat 11s ease-in-out infinite; animation-delay: 1.8s; }
.ac-spark-7{ left: 58%; top: 22%; font-size: 13px; color: rgba(255,245,200,0.60); text-shadow: 0 0 8px rgba(198,171,103,0.34); animation: acSparkFloat 10s ease-in-out infinite; animation-delay: 4.0s; }
.ac-spark-8{ left: 82%; top: 26%; font-size: 8px; color: rgba(255,248,215,0.50); text-shadow: 0 0 5px rgba(198,171,103,0.28); animation: acSparkFloat 12s ease-in-out infinite; animation-delay: 2.8s; }
.ac-spark-9{ left: 35%; top: 16%; font-size: 8px; color: rgba(255,235,165,0.50); animation: acSparkFloat 13s ease-in-out infinite; animation-delay: 5.1s; }
.ac-spark-10{ left: 66%; top: 8%; font-size: 7px; color: rgba(255,248,210,0.45); animation: acSparkFloat 10.5s ease-in-out infinite; animation-delay: 3.7s; }

@keyframes acSparkFloat{
  0%{ opacity: 0; transform: translateY(8px) scale(0.80) rotate(-8deg); }
  10%{ opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
  30%{ opacity: 0.85; transform: translateY(-4px) scale(1.04) rotate(4deg); }
  44%{ opacity: 0; transform: translateY(-9px) scale(0.92) rotate(-2deg); }
  100%{ opacity: 0; transform: translateY(8px) scale(0.80) rotate(-8deg); }
}

/* ── CHECK BURST ── */
.ac-burst-wrap{
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ac-burst-ring{
  position: absolute;
  inset: -12px;
  border-radius: 9999px;
  border: 1.5px solid rgb(var(--accent) / 0.30);
  animation: acBurstRing 2.4s cubic-bezier(.22,1,.36,1) infinite;
  animation-delay: 0.3s;
}

.ac-burst-ring-2{
  position: absolute;
  inset: -24px;
  border-radius: 9999px;
  border: 1px solid rgb(var(--accent) / 0.16);
  animation: acBurstRing 2.4s cubic-bezier(.22,1,.36,1) infinite;
  animation-delay: 0.6s;
}

@keyframes acBurstRing{
  0%{ opacity: 0.80; transform: scale(0.88); }
  100%{ opacity: 0; transform: scale(1.55); }
}

.ac-success-mark{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 76px; height: 76px;
  border-radius: 9999px;
  border: 1px solid rgb(var(--accent) / 0.32);
  background:
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.14), transparent 48%),
    linear-gradient(180deg, rgb(var(--accent) / 0.20), rgb(var(--accent) / 0.10));
  box-shadow:
    0 0 0 6px rgb(var(--accent) / 0.06),
    0 14px 40px rgb(var(--accent) / 0.20),
    inset 0 1px 0 rgba(255,255,255,0.14);
  animation: acSuccessPop .72s cubic-bezier(.22,1,.36,1) both;
  animation-delay: 0.28s;
}

.ac-success-mark svg{
  width: 28px; height: 28px;
  stroke: rgb(var(--accent));
  stroke-width: 2.3; fill: none;
  stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 42; stroke-dashoffset: 42;
  animation: acCheckDraw .65s 0.56s ease forwards;
}

@keyframes acSuccessPop{
  0%{ opacity: 0; transform: scale(.82) translateY(10px); }
  100%{ opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes acCheckDraw{ to{ stroke-dashoffset: 0; } }

/* ── BADGE DOT ── */
.ac-badge-dot{
  animation: acBadgePulse 2.4s ease-in-out infinite;
}

@keyframes acBadgePulse{
  0%,100%{ box-shadow: 0 0 0 0 rgb(var(--accent)/0.00); transform: scale(1); }
  50%{ box-shadow: 0 0 0 5px rgb(var(--accent)/0.10); transform: scale(1.08); }
}

/* ── PILL ── */
.ac-pill{
  position: relative;
  overflow: hidden;
}

.ac-pill::before{
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.12) 50%, transparent 80%);
  transform: translateX(-130%);
  animation: acShimmer 5.2s ease-in-out infinite;
}

@keyframes acShimmer{
  0%,84%,100%{ transform: translateX(-130%); }
  92%{ transform: translateX(130%); }
}

/* ── STEP CARDS ── */
.ac-step-card{
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(198,171,103,0.06), rgba(255,255,255,0.012) 60%, rgba(198,171,103,0.03));
  box-shadow:
    0 0 0 1px rgba(198,171,103,0.22),
    0 0 0 2px rgba(198,171,103,0.07) inset,
    0 0 18px rgba(198,171,103,0.08),
    inset 0 1px 0 rgba(255,255,255,0.05),
    0 10px 30px rgba(0,0,0,0.12);
  transition:
    transform .28s ease,
    box-shadow .28s ease;
}

.ac-step-card::before{
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(198,171,103,0.70), rgba(255,248,220,0.50), transparent);
  opacity: 0.85;
}

.ac-step-card::after{
  content: "";
  position: absolute;
  top: -18px; left: -18px;
  width: 80px; height: 80px;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(198,171,103,0.14), transparent 70%);
  pointer-events: none;
  filter: blur(10px);
  opacity: 0.7;
}

.ac-step-card:hover{
  transform: translateY(-2px);
  box-shadow:
    0 0 0 1px rgba(198,171,103,0.38),
    0 0 0 2px rgba(198,171,103,0.10) inset,
    0 0 28px rgba(198,171,103,0.16),
    inset 0 1px 0 rgba(255,255,255,0.07),
    0 18px 36px rgba(0,0,0,0.18);
}

.ac-step-number{
  color: rgba(198,171,103,0.92);
  text-shadow: 0 0 12px rgba(198,171,103,0.30);
}

/* ── BUTTONS ── */
.ac-primary-btn{
  position: relative;
  overflow: hidden;
  box-shadow:
    0 10px 30px rgb(var(--accent) / 0.12),
    inset 0 1px 0 rgba(255,255,255,0.08);
}

.ac-primary-btn::before{
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 18%, rgba(255,255,255,0.18) 50%, transparent 82%);
  transform: translateX(-130%);
  transition: transform .9s ease;
}

.ac-primary-btn:hover::before{ transform: translateX(130%); }

.ac-secondary-btn{
  transition:
    transform .24s ease,
    border-color .24s ease,
    background-color .24s ease,
    box-shadow .24s ease;
}

.ac-secondary-btn:hover{
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.12);
}

/* ── REDUCED MOTION ── */
@media (prefers-reduced-motion: reduce){
  .ac-confirm-bg,
  .ac-editorial-shell::before,
  .ac-confirm-image,
  .ac-badge-dot,
  .ac-reveal,
  .ac-pill::before,
  .ac-confirm-media::before,
  .ac-orbit,
  .ac-success-mark,
  .ac-success-mark svg,
  .ac-burst-ring,
  .ac-burst-ring-2,
  .ac-gold-foil::before,
  .ac-spark{
    animation: none !important;
    transition: none !important;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
  }
  .ac-primary-btn::before{
    transition: none !important;
    transform: translateX(-130%);
  }
  .ac-step-card,
  .ac-secondary-btn{ transition: none !important; }
  .ac-spark{ opacity: 0.08 !important; }
  .ac-success-mark{ opacity: 1 !important; transform: none !important; }
  .ac-success-mark svg{ stroke-dashoffset: 0 !important; }
}
`

export default function Page() {
  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: CONFIRMED_CSS }} />

      <section className="relative w-full overflow-hidden bg-bg">
        <div className="pointer-events-none absolute inset-0 ac-confirm-bg" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-4xl">
            <div className="ac-editorial-shell relative overflow-hidden rounded-[28px] border border-border/70 bg-surface-1/45 p-6 shadow-soft backdrop-blur-xl sm:p-10 md:p-12">
              <div className="ac-orbit" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 ac-grain" />

              <div className="relative text-center">

                {/* Badge */}
                <div className="ac-reveal ac-delay-1 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/35 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-text shadow-soft backdrop-blur">
                  <span className="ac-badge-dot h-1.5 w-1.5 rounded-full bg-accent/80" />
                  SUBSCRIPTION CONFIRMED
                </div>

                <p className="ac-reveal ac-delay-2 mt-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                  AtomicCurious · Newsletter
                </p>

                {/* Check burst */}
                <div className="ac-reveal ac-delay-3 mt-6 flex justify-center">
                  <div className="ac-burst-wrap">
                    <div className="ac-burst-ring" aria-hidden="true" />
                    <div className="ac-burst-ring-2" aria-hidden="true" />
                    <div className="ac-success-mark">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12.5l4.2 4.2L19 7.8" />
                      </svg>
                    </div>
                  </div>
                </div>

                <h1 className="ac-reveal ac-delay-3 mt-6 text-balance text-4xl font-semibold tracking-[-0.04em] text-text sm:text-5xl md:text-6xl">
                  You're in
                </h1>

                <p className="ac-reveal ac-delay-4 mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-muted sm:text-lg">
                     Your subscription is confirmed. You are now part of AtomicCurious:
                <br />
                <span className="opacity-90">
                     curated ideas and explorations, with early access to new content, resources, and what’s coming next.
                </span>
                </p>

                <div className="ac-reveal ac-delay-4 mt-6">
                  <div className="ac-confirm-rule" aria-hidden="true" />
                </div>

                {/* Image card with gold frame */}
                <div className="ac-reveal ac-delay-5 mt-8 overflow-visible rounded-2xl">
                  <div className="ac-image-frame relative overflow-hidden rounded-2xl border border-white/10 bg-bg/20 shadow-soft">

                    {/* Gold foil sweep */}
                    <div className="ac-gold-foil" aria-hidden="true" />

                    <div className="ac-confirm-media relative aspect-[16/10] w-full sm:aspect-[3/2]">

                      {/* Celebration sparks */}
                      <div className="ac-sparks" aria-hidden="true">
                        <span className="ac-spark ac-spark-1">✦</span>
                        <span className="ac-spark ac-spark-2">★</span>
                        <span className="ac-spark ac-spark-3">✦</span>
                        <span className="ac-spark ac-spark-4">✦</span>
                        <span className="ac-spark ac-spark-5">★</span>
                        <span className="ac-spark ac-spark-6">·</span>
                        <span className="ac-spark ac-spark-7">✦</span>
                        <span className="ac-spark ac-spark-8">·</span>
                        <span className="ac-spark ac-spark-9">◆</span>
                        <span className="ac-spark ac-spark-10">·</span>
                      </div>

                      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(198,171,103,0.10),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(255,248,232,0.08),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_60%)]" />

                      <Image
                        src="/images/sections/newsletter/newsletter_confirmed_v1.webp"
                        alt="Welcome to AtomicCurious"
                        fill
                        sizes="(min-width: 1024px) 720px, 92vw"
                        className="ac-confirm-image object-cover"
                        priority
                      />

                      <div className="pointer-events-none absolute inset-0 z-[3] [mask-image:radial-gradient(ellipse_78%_68%_at_50%_46%,black,transparent_88%)] bg-black/14" />
                    </div>
                  </div>
                </div>

                {/* Pill */}
                <div className="ac-pill ac-reveal ac-delay-6 mx-auto mt-7 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/25 px-4 py-2 text-xs font-semibold text-text shadow-soft backdrop-blur">
                  <span className="relative z-[1] h-1.5 w-1.5 rounded-full bg-accent/80" />
                  <span className="relative z-[1]">Subscription active</span>
                </div>

                {/* Step cards */}
                <div className="ac-reveal ac-delay-7 mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
                  <div className="ac-step-card rounded-2xl border border-transparent bg-bg/20 p-4">
                    <p className="ac-step-number text-[11px] font-semibold uppercase tracking-[0.18em]">01</p>
                    <p className="mt-2 text-sm font-medium text-text">
                      New releases delivered straight to your inbox, twice a month.
                    </p>
                  </div>

                  <div className="ac-step-card rounded-2xl border border-transparent bg-bg/20 p-4">
                    <p className="ac-step-number text-[11px] font-semibold uppercase tracking-[0.18em]">02</p>
                    <p className="mt-2 text-sm font-medium text-text">
                      Curated tools and recommendations to help you think better.
                    </p>
                  </div>

                  <div className="ac-step-card rounded-2xl border border-transparent bg-bg/20 p-4">
                    <p className="ac-step-number text-[11px] font-semibold uppercase tracking-[0.18em]">03</p>
                    <p className="mt-2 text-sm font-medium text-text">
                      Each release is designed to expand your curiosity.
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="ac-reveal ac-delay-8 mt-9 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/start-here"
                    className="ac-primary-btn inline-flex items-center justify-center rounded-xl border border-accent/30 bg-accent/12 px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/50 hover:bg-accent/16"
                  >
                    Explore AtomicCurious →
                  </Link>

                  <Link
                    href="/posts"
                    className="ac-secondary-btn inline-flex items-center justify-center rounded-xl border border-border bg-bg/35 px-5 py-2.5 text-sm font-semibold text-text hover:border-accent/35 hover:bg-surface-2"
                  >
                    Browse posts
                  </Link>

                  <Link
                    href="/newsletter"
                    className="ac-secondary-btn inline-flex items-center justify-center rounded-xl border border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-text hover:bg-surface-2"
                  >
                    Back to newsletter
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}