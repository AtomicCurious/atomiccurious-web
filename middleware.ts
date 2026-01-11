import { NextRequest, NextResponse } from "next/server"

const SUPPORTED = ["en", "es"] as const
const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Ignorar internos, API, y archivos estáticos
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

  // ✅ Si empieza con /en o /es, no tocar (pero /en ya no debe usarse)
  const hasLocale = SUPPORTED.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (hasLocale) return NextResponse.next()

  // ✅ IMPORTANTE:
  // Ya NO redirigimos a /en. El inglés vive en la raíz (/).
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
}
