// app/(en)/contact/page.tsx
import Link from "next/link"
import Image from "next/image"
import ContactFormEn from "@/components/sections/ContactFormEn"

export const metadata = {
  title: "Contact | AtomicCurious",
  description:
    "Collaborations, feedback, press, or thoughtful conversations. We read every message.",
  alternates: {
    canonical: "/contact",
    languages: {
      en: "/contact",
      es: "/es/contacto",
    },
  },
}

const CONTACT_CSS = `
/* ─────────────────────────────────────────────────────────
   CONTACT image switching (SSR-safe, CSS-only)
   Default = Atom (no data-character yet)
   ───────────────────────────────────────────────────────── */
.ac-contact-img{
  opacity: 0;
  transition: opacity 280ms ease;
  will-change: opacity;
}
.ac-contact-atom{ opacity: 1; }

body[data-character="iris"] .ac-contact-atom,
html[data-character="iris"] .ac-contact-atom{ opacity: 0; }
body[data-character="iris"] .ac-contact-iris,
html[data-character="iris"] .ac-contact-iris{ opacity: 1; }

body[data-character="core"] .ac-contact-atom,
html[data-character="core"] .ac-contact-atom{ opacity: 0; }
body[data-character="core"] .ac-contact-core,
html[data-character="core"] .ac-contact-core{ opacity: 1; }

/* Explicit atom */
body[data-character="atom"] .ac-contact-atom,
html[data-character="atom"] .ac-contact-atom{ opacity: 1; }
body[data-character="atom"] .ac-contact-iris,
body[data-character="atom"] .ac-contact-core,
html[data-character="atom"] .ac-contact-iris,
html[data-character="atom"] .ac-contact-core{ opacity: 0; }

/* ─────────────────────────────────────────────────────────
   Character accent tokens
   ───────────────────────────────────────────────────────── */
html:not([data-character]),
body:not([data-character]),
html[data-character="atom"],
body[data-character="atom"]{
  --ac-contact-accent: 52 211 153;
  --ac-contact-accent-alt: 16 185 129;
}

html[data-character="iris"],
body[data-character="iris"]{
  --ac-contact-accent: 34 211 238;
  --ac-contact-accent-alt: 59 130 246;
}

html[data-character="core"],
body[data-character="core"]{
  --ac-contact-accent: 251 146 60;
  --ac-contact-accent-alt: 249 115 22;
}

/* ─────────────────────────────────────────────────────────
   Entrance animations
   ───────────────────────────────────────────────────────── */
@keyframes ac-fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ac-contact-header{
  animation: ac-fade-up 0.55s ease both;
}
.ac-contact-grid-form{
  animation: ac-fade-up 0.55s 0.10s ease both;
}
.ac-contact-grid-aside{
  animation: ac-fade-up 0.55s 0.20s ease both;
}

/* Make both cards match height on desktop */
@media (min-width: 768px){
  .ac-contact-grid-form{
    display: flex;
    height: 100%;
  }

  .ac-contact-grid-form > *{
    width: 100%;
    height: 100%;
  }

  .ac-contact-grid-aside{
    height: 100%;
  }
}

/* ─────────────────────────────────────────────────────────
   Kicker with decorative lines
   ───────────────────────────────────────────────────────── */
.ac-contact-kicker{
  color: rgb(var(--ac-contact-accent) / 0.88);
}

.ac-contact-kicker-bar{
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.ac-contact-kicker-bar::before,
.ac-contact-kicker-bar::after{
  content: "";
  display: block;
  width: 22px;
  height: 1px;
  background: rgb(var(--ac-contact-accent) / 0.35);
  transition: width 300ms ease;
}

.ac-contact-kicker-bar:hover::before,
.ac-contact-kicker-bar:hover::after{
  width: 32px;
}

/* ─────────────────────────────────────────────────────────
   Accent helpers
   ───────────────────────────────────────────────────────── */
.ac-contact-chip,
.ac-contact-btn{
  transition:
    border-color 220ms ease,
    background-color 220ms ease,
    color 220ms ease,
    box-shadow 220ms ease,
    transform 220ms ease;
}

.ac-contact-chip:hover,
.ac-contact-btn:hover{
  border-color: rgb(var(--ac-contact-accent) / 0.35);
  background: rgb(var(--surface-2) / 0.92);
  box-shadow: 0 18px 44px -28px rgb(var(--ac-contact-accent) / 0.22);
  transform: translateY(-2px);
}

.ac-contact-chip:focus-visible,
.ac-contact-btn:focus-visible{
  border-color: rgb(var(--ac-contact-accent) / 0.35);
  box-shadow:
    0 0 0 2px rgb(var(--ac-contact-accent) / 0.18),
    0 18px 44px -28px rgb(var(--ac-contact-accent) / 0.22);
}

.ac-contact-mail{
  transition: color 220ms ease, text-decoration-color 220ms ease;
  text-decoration-color: rgb(var(--border) / 0.70);
}

.ac-contact-mail:hover{
  color: rgb(var(--text));
  text-decoration-color: rgb(var(--ac-contact-accent) / 0.55);
}

.ac-contact-visual{
  position: relative;
}

.ac-contact-visual::before{
  content: "";
  position: absolute;
  inset: -10% 12% auto 12%;
  height: 180px;
  pointer-events: none;
  filter: blur(26px);
  opacity: 0.9;
  background:
    radial-gradient(
      ellipse at center,
      rgb(var(--ac-contact-accent) / 0.12) 0%,
      rgb(var(--ac-contact-accent-alt) / 0.06) 34%,
      transparent 72%
    );
}

.ac-contact-note strong{
  color: rgb(var(--ac-contact-accent) / 0.95);
  font-weight: 600;
}

/* ─────────────────────────────────────────────────────────
   Topic tags in aside
   ───────────────────────────────────────────────────────── */
.ac-contact-topic-tag{
  display: inline-block;
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid rgb(var(--ac-contact-accent) / 0.22);
  color: rgb(var(--ac-contact-accent) / 0.72);
  font-weight: 500;
  letter-spacing: 0.03em;
  transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
}

.ac-contact-topic-tag:hover{
  border-color: rgb(var(--ac-contact-accent) / 0.40);
  color: rgb(var(--ac-contact-accent) / 0.95);
  background: rgb(var(--ac-contact-accent) / 0.06);
}

.ac-contact-tags-label{
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgb(var(--muted) / 0.65);
  margin-bottom: 8px;
}

.ac-contact-aside-divider{
  height: 1px;
  background: rgb(var(--border) / 0.6);
  margin: 14px 0;
}
`

const TOPIC_TAGS = ["Collaborations", "Ideas", "Feedback", "Projects"]

export default function Page() {
  return (
    <main className="relative w-full overflow-x-hidden" data-chmode="none">
      <style dangerouslySetInnerHTML={{ __html: CONTACT_CSS }} />

      <section className="relative w-full overflow-hidden bg-transparent">
        <div className="ac-noncosmic-only pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-bg" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 55% at 50% -10%, rgb(var(--ac-contact-accent) / 0.12), transparent 65%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 40% at 30% 20%, rgb(var(--ac-contact-accent-alt) / 0.08), transparent 62%)",
            }}
          />
        </div>

        <div className="ac-cosmic-only pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 50% -20%, rgb(var(--ac-contact-accent) / 0.18), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 110% 70% at 70% 10%, rgb(var(--ac-contact-accent-alt) / 0.14), transparent 62%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 20% 30%, rgb(var(--ac-contact-accent) / 0.10), transparent 64%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_120%_at_50%_50%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_30%,rgba(255,255,255,0.01))]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
          <header className="ac-contact-header mx-auto max-w-3xl text-center">
            <p className="ac-contact-kicker-bar ac-contact-kicker text-xs font-medium tracking-wide">
              ATOMICCURIOUS · CONTACT
            </p>

            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
              Write to us. <span className="ac-contact-kicker">We read everything.</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted sm:text-lg">
              Collaborations, feedback, press, or thoughtful conversations.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/newsletter"
                className="ac-contact-chip inline-flex items-center justify-center rounded-full border border-border/80 bg-surface-1 px-5 py-2 text-sm font-semibold text-text shadow-soft focus:outline-none"
              >
                Join the <span className="ml-1 ac-contact-kicker">newsletter</span>
              </Link>

              <Link
                href="/"
                className="ac-contact-chip inline-flex items-center justify-center rounded-full border border-border/80 bg-bg/40 px-5 py-2 text-sm font-semibold text-text shadow-soft focus:outline-none"
              >
                Back home
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted">
              Prefer email?{" "}
              <a
                className="ac-contact-mail font-semibold text-text underline underline-offset-4"
                href="mailto:hello.atomiccurious@gmail.com"
              >
                hello.atomiccurious@gmail.com
              </a>
            </p>
          </header>

          <div className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid items-stretch gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,420px)] md:gap-10">
              <div className="ac-contact-grid-form order-2 md:order-1">
                <ContactFormEn />
              </div>

              <aside className="ac-contact-grid-aside order-1 flex md:order-2">
                <div className="ac-contact-visual relative flex h-full w-full overflow-hidden rounded-3xl border border-border/70 bg-surface-1 shadow-soft">
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 10%, rgb(var(--ac-contact-accent) / 0.10), transparent 60%)",
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]" />

                  <div className="relative flex h-full w-full flex-col">
                    <div className="relative h-[520px] w-full shrink-0">
                      <Image
                        src="/images/sections/contact/atom_contact.webp"
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(min-width: 768px) 420px, 90vw"
                        className="ac-contact-img ac-contact-atom object-cover object-top"
                      />

                      <Image
                        src="/images/sections/contact/iris_contact.webp"
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(min-width: 768px) 420px, 90vw"
                        className="ac-contact-img ac-contact-iris object-cover object-top"
                      />

                      <Image
                        src="/images/sections/contact/core_contact_v1.webp"
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(min-width: 768px) 420px, 90vw"
                        className="ac-contact-img ac-contact-core object-cover object-top"
                      />
                    </div>

                    <div className="relative flex flex-1 flex-col px-5 py-4">
                      <p className="text-sm font-semibold text-text">
                        We’d love to hear from you.
                      </p>
                      <p className="ac-contact-note mt-1 text-sm leading-relaxed text-muted">
                        Short messages work perfectly. If it’s a collaboration,
                        share <strong>links</strong> and enough context to understand quickly.
                      </p>

                      <div className="ac-contact-aside-divider mt-4" />

                      <div className="mt-auto">
                        <p className="ac-contact-tags-label">Frequent topics</p>
                        <div className="flex flex-wrap gap-1.5">
                          {TOPIC_TAGS.map((tag) => (
                            <span key={tag} className="ac-contact-topic-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}