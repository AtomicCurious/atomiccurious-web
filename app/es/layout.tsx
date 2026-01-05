// app/es/layout.tsx
import NavBarEs from "@/components/NavBarEs"
import SocialLinks from "@/components/SocialLinks"

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarEs />

      {/* ✅ NO offset because header is not fixed */}
      <main className="w-full">{children}</main>

      <footer className="border-t border-border/70 bg-bg">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-tight text-text">
                AtomicCurious
              </p>
              <p className="mt-1 text-sm text-muted">
                Ciencia, tecnología y futuro — curiosidad con intención.
              </p>
              <p className="mt-4 text-sm text-muted">
                © {new Date().getFullYear()} AtomicCurious
              </p>
            </div>

            <SocialLinks
              title="Sigue el universo"
              items={[
                { label: "YouTube", href: "https://www.youtube.com/@AtomicCurious" },
                { label: "TikTok", href: "https://tiktok.com/@atomic_curious" },
                { label: "Instagram", href: "https://instagram.com/atomiccurious" },
              ]}
            />
          </div>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-accent/0 via-accent/25 to-accent/0 opacity-70" />
        </div>
      </footer>
    </>
  )
}
