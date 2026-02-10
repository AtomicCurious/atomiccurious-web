"use client"

import { ThemeProvider } from "next-themes"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"         // <-- usa .dark en <html>
      defaultTheme="dark"       // tu proyecto es dark-first
      enableSystem={true}       // respeta sistema si quieres
      disableTransitionOnChange  // evita flash raro al cambiar
    >
      {children}
    </ThemeProvider>
  )
}
