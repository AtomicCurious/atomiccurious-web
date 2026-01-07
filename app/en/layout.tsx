// app/en/layout.tsx
import NavBarEn from "@/components/NavBarEn"
import SocialLinks from "@/components/SocialLinks"

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <NavBarEn />

      <main className="w-full flex-1">{children}</main>

      <footer className="border-t border-border/70 bg-bg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-[11px] text-muted leading-none whitespace-nowrap">
            © {new Date().getFullYear()} AtomicCurious
          </p>

          <SocialLinks
            variant="footer"
            title="Follow the universe"
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



