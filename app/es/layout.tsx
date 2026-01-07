// app/es/layout.tsx
import NavBarEs from "@/components/NavBarEs"
import SocialLinks from "@/components/SocialLinks"

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <NavBarEs />

      <main className="w-full flex-1">{children}</main>

      <footer className="border-t border-border/70 bg-bg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-[11px] text-muted leading-none whitespace-nowrap">
            © {new Date().getFullYear()} AtomicCurious
          </p>

          <SocialLinks
            variant="footer"
            title="Sigue el universo"
            items={[
              { label: "YouTube", href: "https://www.youtube.com/@AtomicCurious" },
              { label: "TikTok", href: "https://tiktok.com/@atomic_curious" },
              { label: "Instagram", href: "https://instagram.com/atomiccurious" },
            ]}
          />
        </div>
      </footer>
    </div>
  )
}

