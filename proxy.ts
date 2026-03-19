// atomiccurious-web/proxy.ts
import { NextRequest, NextResponse } from "next/server"

const SUPPORTED = ["en", "es"] as const
const PUBLIC_FILE = /\.(.*)$/

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar internos, API y archivos estáticos
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/characters") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  // Si empieza con /en o /es no tocar
  const hasLocale = SUPPORTED.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )

  if (hasLocale) return NextResponse.next()

  // Inglés vive en la raíz (/)
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
}