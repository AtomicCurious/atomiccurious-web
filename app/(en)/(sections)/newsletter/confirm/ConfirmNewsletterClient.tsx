"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const CONFIRM_CSS = `
.ac-grain{
  background-image:
    radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 45%),
    linear-gradient(to bottom, rgba(255,255,255,0.028), transparent 55%);
  mix-blend-mode: normal;
}

.ac-shell-enter{
  opacity: 0;
  transform: translateY(26px) scale(.985);
  filter: blur(10px);
  animation: acShellEnter .95s cubic-bezier(.22,1,.36,1) forwards;
}

@keyframes acShellEnter{
  to{
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.ac-editorial-shell{
  position: relative;
  isolation: isolate;
}

.ac-editorial-shell::before,
.ac-editorial-shell::after{
  content: none;
}

.ac-orbit{
  position: absolute;
  inset: 56% auto auto 50%;
  width: min(52vw, 560px);
  height: min(52vw, 560px);
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  pointer-events: none;
  opacity: 0.50;
  filter: blur(1.25px);
  background:
    radial-gradient(circle, transparent 54%, rgb(var(--accent) / 0.12) 59%, transparent 64%),
    radial-gradient(circle, transparent 65%, rgb(var(--accent-alt) / 0.08) 69%, transparent 73%),
    radial-gradient(circle at 50% 50%, rgb(var(--accent) / 0.045), transparent 42%);
  animation: acOrbitBreath 7.2s ease-in-out infinite;
}

@keyframes acOrbitBreath{
  0%,100%{
    transform: translate(-50%, -50%) scale(1);
    opacity: .44;
  }
  50%{
    transform: translate(-50%, -50%) scale(1.03);
    opacity: .56;
  }
}

.ac-shell-tone-default{ border-color: rgb(var(--border) / 0.70); }
.ac-shell-tone-success{
  border-color: rgb(var(--accent) / 0.34);
  box-shadow: 0 20px 80px rgb(var(--accent) / 0.08), inset 0 1px 0 rgba(255,255,255,0.05);
}
.ac-shell-tone-danger{
  border-color: rgba(255,120,120,0.22);
  box-shadow: 0 20px 80px rgba(255,120,120,0.05), inset 0 1px 0 rgba(255,255,255,0.04);
}
.ac-shell-tone-warning{
  border-color: rgba(255,190,110,0.22);
  box-shadow: 0 20px 80px rgba(255,190,110,0.045), inset 0 1px 0 rgba(255,255,255,0.04);
}

.ac-confirm-rule{
  width: 84px; height: 1px; margin: 0 auto;
  border-radius: 9999px; opacity: 0.92;
}
html:not([data-character]) .ac-confirm-rule,
body:not([data-character]) .ac-confirm-rule,
html[data-character="atom"] .ac-confirm-rule,
body[data-character="atom"] .ac-confirm-rule {
  background: linear-gradient(to right, transparent, rgba(52,211,153,0.72), rgba(52,211,153,0.18), transparent);
}
html[data-character="iris"] .ac-confirm-rule,
body[data-character="iris"] .ac-confirm-rule {
  background: linear-gradient(to right, transparent, rgba(34,211,238,0.72), rgba(34,211,238,0.18), transparent);
}
html[data-character="core"] .ac-confirm-rule,
body[data-character="core"] .ac-confirm-rule {
  background: linear-gradient(to right, transparent, rgba(251,146,60,0.72), rgba(251,146,60,0.18), transparent);
}
.ac-confirm-rule--danger{
  background: linear-gradient(to right, transparent, rgba(255,120,120,0.75), rgba(255,120,120,0.16), transparent) !important;
}
.ac-confirm-rule--warning{
  background: linear-gradient(to right, transparent, rgba(255,190,110,0.75), rgba(255,190,110,0.16), transparent) !important;
}

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
.ac-delay-6{ animation-delay: 0.44s; }
.ac-delay-7{ animation-delay: 0.52s; }

@keyframes acReveal{
  to{ opacity: 1; transform: translateY(0); }
}

/* ── CARD: true champagne-gold frame ── */
.ac-image-frame{
  position: relative;
  isolation: isolate;
  transform: translateZ(0);
  box-shadow:
    0 26px 60px rgba(0,0,0,0.32),
    0 10px 26px rgba(194,166,96,0.07);
}

.ac-image-frame::before{
  content: "";
  position: absolute;
  inset: -12px;
  border-radius: 1.4rem;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 24%, rgba(205,182,120,0.18), transparent 24%),
    radial-gradient(circle at 82% 18%, rgba(255,248,228,0.18), transparent 22%),
    radial-gradient(circle at 50% 100%, rgba(188,160,92,0.10), transparent 28%);
  filter: blur(24px);
  opacity: .95;
  z-index: 0;
}

.ac-image-frame::after{
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.10), transparent 18%, transparent 82%, rgba(255,255,255,0.04)),
    linear-gradient(to bottom, rgba(255,255,255,0.03), transparent 18%);
  box-shadow:
    0 0 0 1px rgba(255,248,236,0.30),
    0 0 0 2px rgba(198,171,103,0.15) inset,
    0 0 24px rgba(198,171,103,0.14),
    0 18px 48px rgba(198,171,103,0.07);
  z-index: 5;
  transition: box-shadow .35s ease;
}

.ac-image-frame:hover::after{
  box-shadow:
    0 0 0 1px rgba(255,248,236,0.36),
    0 0 0 2px rgba(198,171,103,0.21) inset,
    0 0 34px rgba(198,171,103,0.18),
    0 22px 58px rgba(198,171,103,0.10);
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
    rgba(255,248,232,0.05) 30%,
    rgba(255,252,244,0.18) 50%,
    rgba(198,171,103,0.10) 66%,
    transparent 100%
  );
  transform: translateX(-180%);
  animation: acGoldSweep 12s ease-in-out infinite;
}

@keyframes acGoldSweep{
  0%{
    transform: translateX(-180%);
    opacity: 0;
  }
  2%{
    opacity: 1;
  }
  14%{
    transform: translateX(390%);
    opacity: 1;
  }
  16%{
    transform: translateX(390%);
    opacity: 0;
  }
  70%{
    transform: translateX(-180%);
    opacity: 0;
  }
  72%{
    opacity: 1;
  }
  84%{
    transform: translateX(390%);
    opacity: 1;
  }
  86%,100%{
    transform: translateX(390%);
    opacity: 0;
  }
}

/* ── QUESTION MARKS ── */
.ac-curiosity-bg{
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 30%, transparent 55%);
  mask-image: linear-gradient(to bottom, black 0%, black 30%, transparent 55%);
}

.ac-qm{
  position: absolute;
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-style: italic;
  color: rgba(241,226,186,0.92);
  line-height: 1;
  user-select: none;
  opacity: 0;
  will-change: opacity, transform;
  text-shadow: 0 0 12px rgba(198,171,103,0.24);
}

.ac-qm-1{ left: 7%; top: 6%; font-size: 42px; animation: acQmFade 9s ease-in-out infinite; animation-delay: 0s; }
.ac-qm-2{ left: 21%; top: 9%; font-size: 24px; animation: acQmFade 9s ease-in-out infinite; animation-delay: 1.4s; }
.ac-qm-3{ left: 38%; top: 4%; font-size: 32px; animation: acQmFade 11s ease-in-out infinite; animation-delay: 3.2s; }
.ac-qm-4{ left: 58%; top: 7%; font-size: 20px; animation: acQmFade 10s ease-in-out infinite; animation-delay: 0.8s; }
.ac-qm-5{ left: 72%; top: 5%; font-size: 36px; animation: acQmFade 9.5s ease-in-out infinite; animation-delay: 2.1s; }
.ac-qm-6{ left: 86%; top: 8%; font-size: 26px; animation: acQmFade 11s ease-in-out infinite; animation-delay: 4.5s; }
.ac-qm-7{ left: 14%; top: 22%; font-size: 18px; animation: acQmFade 13s ease-in-out infinite; animation-delay: 1.8s; }
.ac-qm-8{ left: 48%; top: 19%; font-size: 16px; animation: acQmFade 12s ease-in-out infinite; animation-delay: 5.2s; }
.ac-qm-9{ left: 79%; top: 24%; font-size: 20px; animation: acQmFade 10.5s ease-in-out infinite; animation-delay: 2.9s; }

@keyframes acQmFade{
  0%{
    opacity: 0;
    transform: translateY(6px) scale(0.88);
  }
  8%{
    opacity: 0.11;
    transform: translateY(0) scale(1);
  }
  28%{
    opacity: 0.09;
    transform: translateY(-2px) scale(1.01);
  }
  38%{
    opacity: 0;
    transform: translateY(-5px) scale(0.96);
  }
  100%{
    opacity: 0;
    transform: translateY(6px) scale(0.88);
  }
}

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
      rgba(198,171,103,0.08) 90deg,
      transparent 180deg,
      rgba(255,248,232,0.06) 270deg,
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
    linear-gradient(to top, rgba(0,0,0,0.16), transparent 34%),
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
  50%{ transform: scale(1) translateY(-4px); }
}

.ac-badge-dot{
  animation: acBadgePulse 2.4s ease-in-out infinite;
}

@keyframes acBadgePulse{
  0%,100%{ box-shadow: 0 0 0 0 rgb(var(--accent)/0.00); transform: scale(1); }
  50%{ box-shadow: 0 0 0 5px rgb(var(--accent)/0.10); transform: scale(1.08); }
}

.ac-word-reveal{
  opacity: 0;
  filter: blur(10px);
  transform: translateY(22px);
  animation: acWordReveal .72s cubic-bezier(.22,1,.36,1) forwards;
  will-change: transform, opacity, filter;
}

@keyframes acWordReveal{
  to{ opacity: 1; filter: blur(0); transform: translateY(0); }
}

.ac-success-mark{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 68px; height: 68px;
  border-radius: 9999px;
  border: 1px solid rgb(var(--accent) / 0.26);
  background:
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 46%),
    linear-gradient(180deg, rgb(var(--accent) / 0.16), rgb(var(--accent) / 0.08));
  box-shadow: 0 12px 36px rgb(var(--accent) / 0.16), inset 0 1px 0 rgba(255,255,255,0.12);
  animation: acSuccessPop .7s cubic-bezier(.22,1,.36,1);
}

.ac-success-mark svg{
  width: 26px; height: 26px;
  stroke: rgb(var(--accent));
  stroke-width: 2.25; fill: none;
  stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 40; stroke-dashoffset: 40;
  animation: acCheckDraw .7s .18s ease forwards;
}

@keyframes acSuccessPop{
  0%{ opacity: 0; transform: scale(.88) translateY(8px); }
  100%{ opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes acCheckDraw{ to{ stroke-dashoffset: 0; } }

.ac-confirm-cta{
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(var(--accent) / 0.34);
  background: linear-gradient(180deg, rgb(var(--accent) / 0.98), rgb(var(--accent) / 0.84));
  color: #04110c;
  box-shadow:
    0 14px 30px rgb(var(--accent) / 0.18),
    0 0 0 1px rgba(255,255,255,0.08) inset,
    inset 0 1px 0 rgba(255,255,255,0.24);
  transition: transform .22s ease, box-shadow .22s ease, filter .22s ease;
  animation: acCtaBreath 2.8s ease-in-out infinite, acCtaJitter 11s ease-in-out infinite;
}

.ac-confirm-cta::before{
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.24) 50%, transparent 80%);
  transform: translateX(-140%);
  transition: transform .95s ease;
}

.ac-confirm-cta::after{
  content: "";
  position: absolute; inset: -2px;
  border-radius: inherit; pointer-events: none;
  box-shadow: 0 0 26px rgb(var(--accent) / 0.18);
  opacity: .65;
}

.ac-confirm-cta:hover::before{ transform: translateX(135%); }
.ac-confirm-cta:hover{
  transform: translateY(-2px) scale(1.018);
  box-shadow:
    0 18px 40px rgb(var(--accent) / 0.24),
    0 0 0 1px rgba(255,255,255,0.10) inset,
    inset 0 1px 0 rgba(255,255,255,0.28);
  filter: saturate(1.06);
}
.ac-confirm-cta:active{ transform: translateY(0) scale(0.995); }

@keyframes acCtaBreath{
  0%,100%{
    box-shadow:
      0 14px 30px rgb(var(--accent) / 0.14),
      0 0 0 1px rgba(255,255,255,0.08) inset,
      inset 0 1px 0 rgba(255,255,255,0.24);
  }
  50%{
    box-shadow:
      0 18px 42px rgb(var(--accent) / 0.24),
      0 0 0 1px rgba(255,255,255,0.08) inset,
      inset 0 1px 0 rgba(255,255,255,0.24);
  }
}

@keyframes acCtaJitter{
  0%,90%,100%{
    transform: translateX(0) translateY(0);
  }
  91%{ transform: translateX(-2px) translateY(0); }
  92%{ transform: translateX(2px) translateY(-1px); }
  93%{ transform: translateX(-2px) translateY(1px); }
  94%{ transform: translateX(2px) translateY(0); }
  95%{ transform: translateX(-1px) translateY(-1px); }
  96%{ transform: translateX(1px) translateY(1px); }
  97%{ transform: translateX(-1px) translateY(0); }
  98%{ transform: translateX(0) translateY(0); }
}

@keyframes acCtaDrop{
  0%{
    opacity: 0;
    transform: translateY(-48px) scale(.94);
    filter: blur(4px);
  }
  65%{ transform: translateY(5px) scale(1.012); filter: blur(0); }
  82%{ transform: translateY(-3px) scale(0.998); }
  100%{ opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

.ac-cta-drop{
  opacity: 0;
  animation: acCtaDrop .78s cubic-bezier(.22,1,.36,1) forwards;
  animation-delay: 0.46s;
}

.ac-spinner{
  width: 14px; height: 14px; border-radius: 9999px;
  border: 2px solid rgba(4,17,12,0.22);
  border-top-color: rgba(4,17,12,0.82);
  animation: acSpin .82s linear infinite;
}

@keyframes acSpin{ to{ transform: rotate(360deg); } }

.ac-secondary-link{
  background: rgba(255,255,255,0.02);
  transition: border-color .22s ease, background-color .22s ease, transform .22s ease, opacity .22s ease;
}
.ac-secondary-link:hover{
  transform: translateY(-1px);
  background: rgba(255,255,255,0.04);
  border-color: rgb(var(--accent) / 0.28);
}
.ac-secondary-link--soft{ opacity: 0.88; }
.ac-secondary-link--soft:hover{ opacity: 1; }

@media (prefers-reduced-motion: reduce){
  .ac-shell-enter,
  .ac-reveal,
  .ac-confirm-image,
  .ac-badge-dot,
  .ac-confirm-cta,
  .ac-spinner,
  .ac-confirm-media::before,
  .ac-orbit,
  .ac-success-mark,
  .ac-success-mark svg,
  .ac-word-reveal,
  .ac-cta-drop,
  .ac-gold-foil::before,
  .ac-qm{
    animation: none !important;
    transition: none !important;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
  }
  .ac-confirm-cta::before{
    transition: none !important;
    transform: translateX(-130%);
  }
  .ac-qm{ opacity: 0.07 !important; }
}
`

type ConfirmState =
  | "ready"
  | "loading"
  | "success"
  | "invalid"
  | "expired"
  | "error"
  | "missing"

type ConfirmTone = "default" | "success" | "danger" | "warning"

const STATE_COPY: Record<
  ConfirmState,
  { title: string; description: string; badge: string }
> = {
  ready: {
    title: "Confirm your subscription",
    description:
      "Just one final step. Confirm your email to activate your AtomicCurious newsletter subscription.",
    badge: "EMAIL CONFIRMATION",
  },
  loading: {
    title: "Confirming your subscription",
    description:
      "We’re validating your link and activating your subscription.",
    badge: "VALIDATING LINK",
  },
  success: {
    title: "Subscription confirmed",
    description: "Your email has been verified and your subscription is now active.",
    badge: "EMAIL VERIFIED",
  },
  invalid: {
    title: "Invalid link",
    description: "This confirmation link is invalid or has already been used.",
    badge: "INVALID LINK",
  },
  expired: {
    title: "Link expired",
    description: "This confirmation link has expired. Please subscribe again to receive a new one.",
    badge: "LINK EXPIRED",
  },
  error: {
    title: "Confirmation failed",
    description: "We couldn’t confirm your subscription this time. Please try again.",
    badge: "CONFIRMATION ERROR",
  },
  missing: {
    title: "Missing token",
    description: "This confirmation link is incomplete.",
    badge: "MISSING TOKEN",
  },
}

function SplitWords({
  text,
  className = "",
}: {
  text: string
  className?: string
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="ac-word-reveal inline-block"
          style={{ animationDelay: `${0.08 + i * 0.06}s` }}
          aria-hidden="true"
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  )
}

export default function ConfirmNewsletterClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const token = useMemo(
    () => (searchParams.get("token") || "").trim(),
    [searchParams]
  )

  const [state, setState] = useState<ConfirmState>("ready")

  useEffect(() => {
    setState(token ? "ready" : "missing")
  }, [token])

  async function handleConfirm() {
    if (!token) {
      setState("missing")
      return
    }

    try {
      setState("loading")

      const res = await fetch("/api/newsletter/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const data = await res.json().catch(() => null)

      if (res.ok && data?.ok) {
        setState("success")
        window.setTimeout(() => {
          router.replace("/newsletter/confirmed")
        }, 650)
        return
      }

      if (data?.error === "invalid_token") { setState("invalid"); return }
      if (data?.error === "token_expired") { setState("expired"); return }
      if (data?.error === "missing_token") { setState("missing"); return }

      setState("error")
    } catch {
      setState("error")
    }
  }

  const { title, description, badge } = STATE_COPY[state]

  const tone: ConfirmTone =
    state === "success"
      ? "success"
      : state === "invalid" || state === "error"
        ? "danger"
        : state === "expired"
          ? "warning"
          : "default"

  const shellToneClass =
    tone === "success" ? "ac-shell-tone-success"
    : tone === "danger" ? "ac-shell-tone-danger"
    : tone === "warning" ? "ac-shell-tone-warning"
    : "ac-shell-tone-default"

  const ruleToneClass =
    tone === "danger" ? "ac-confirm-rule--danger"
    : tone === "warning" ? "ac-confirm-rule--warning"
    : ""

  const imageOverlayClass =
    tone === "danger"
      ? "bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(255,120,120,0.10),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(255,120,120,0.06),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_60%)]"
      : tone === "warning"
        ? "bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(255,190,110,0.09),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(255,190,110,0.06),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_60%)]"
        : "bg-[radial-gradient(ellipse_120%_80%_at_20%_20%,rgba(198,171,103,0.09),transparent_60%),radial-gradient(ellipse_120%_90%_at_80%_30%,rgba(255,248,232,0.08),transparent_62%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_60%)]"

  const showSuccessMark = state === "success"
  const showPrimaryCta = state === "ready" || state === "loading"
  const canRetry = state === "error"

  return (
    <main className="w-full" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: CONFIRM_CSS }} />

      <section className="relative w-full overflow-hidden bg-bg">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
          <div className="mx-auto w-full max-w-5xl">
            <div
              className={`ac-shell-enter ac-editorial-shell relative overflow-hidden rounded-3xl bg-surface-1/40 p-6 shadow-soft backdrop-blur sm:p-8 md:p-10 ${shellToneClass}`}
            >
              <div className="ac-orbit" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 ac-grain" />

              <div className="relative mx-auto max-w-3xl text-center">
                <div className="ac-reveal ac-delay-1 inline-flex items-center gap-2 rounded-full border border-border/70 bg-bg/30 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-text shadow-soft backdrop-blur">
                  <span className="ac-badge-dot h-1.5 w-1.5 rounded-full bg-accent/80" />
                  {badge}
                </div>

                <div className="ac-reveal ac-delay-2 mt-8 overflow-visible rounded-2xl">
                  <div className="ac-image-frame relative overflow-hidden rounded-2xl border border-white/10 bg-bg/20 shadow-soft">
                    <div className="ac-gold-foil" aria-hidden="true" />

                    <div className="ac-confirm-media relative aspect-[16/10] w-full sm:aspect-[3/2]">
                      <div className="ac-curiosity-bg" aria-hidden="true">
                        <span className="ac-qm ac-qm-1">?</span>
                        <span className="ac-qm ac-qm-2">?</span>
                        <span className="ac-qm ac-qm-3">?</span>
                        <span className="ac-qm ac-qm-4">?</span>
                        <span className="ac-qm ac-qm-5">?</span>
                        <span className="ac-qm ac-qm-6">?</span>
                        <span className="ac-qm ac-qm-7">?</span>
                        <span className="ac-qm ac-qm-8">?</span>
                        <span className="ac-qm ac-qm-9">?</span>
                      </div>

                      <div className={`absolute inset-0 z-[1] ${imageOverlayClass}`} />

                      <Image
                        src="/images/sections/newsletter/newsletter_confirm.webp"
                        alt="Subscription confirmation"
                        fill
                        sizes="(min-width: 1024px) 760px, 92vw"
                        className="ac-confirm-image object-cover"
                        priority
                      />

                      <div className="pointer-events-none absolute inset-0 z-[3] [mask-image:radial-gradient(ellipse_78%_68%_at_50%_46%,black,transparent_88%)] bg-black/18" />
                    </div>
                  </div>
                </div>

                <p className="ac-reveal ac-delay-3 mt-8 text-xs font-semibold tracking-[0.18em] text-muted">
                  ATOMICCURIOUS · NEWSLETTER
                </p>

                {showSuccessMark && (
                  <div className="ac-reveal ac-delay-3 mt-6 flex justify-center">
                    <div className="ac-success-mark" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M5 12.5l4.2 4.2L19 7.8" />
                      </svg>
                    </div>
                  </div>
                )}

                <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl">
                  <SplitWords text={title} />
                </h1>

                <p className="ac-reveal ac-delay-5 mx-auto mt-5 max-w-2xl text-balance text-base text-muted sm:text-lg">
                  {description}
                </p>

                <div className="ac-reveal ac-delay-5 mt-6">
                  <div className={`ac-confirm-rule ${ruleToneClass}`} aria-hidden="true" />
                </div>

                {showPrimaryCta && (
                  <div className="ac-cta-drop mt-8">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={state === "loading"}
                      className="ac-confirm-cta inline-flex min-w-[240px] items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      <span className="relative z-[1] inline-flex items-center gap-2">
                        {state === "loading" && (
                          <span className="ac-spinner" aria-hidden="true" />
                        )}
                        {state === "loading" ? "Confirming..." : "Confirm subscription"}
                      </span>
                    </button>
                  </div>
                )}

                {canRetry && (
                  <div className="ac-cta-drop mt-8">
                    <button
                      type="button"
                      onClick={handleConfirm}
                      className="ac-confirm-cta inline-flex min-w-[240px] items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      <span className="relative z-[1] inline-flex items-center gap-2">
                        Try again
                      </span>
                    </button>
                  </div>
                )}

                <div className="ac-reveal ac-delay-7 mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/newsletter"
                    className="ac-secondary-link inline-flex items-center justify-center rounded-xl border border-border/90 px-5 py-2.5 text-sm font-semibold text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    Back to newsletter
                  </Link>

                  <Link
                    href="/"
                    className="ac-secondary-link ac-secondary-link--soft inline-flex items-center justify-center rounded-xl border border-border/80 px-5 py-2.5 text-sm font-semibold text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    Back home
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