import { NextRequest, NextResponse } from "next/server"

const DEFAULT_LOCALE = "en"
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
    pathname.startsWith("/characters") || // ✅ TU carpeta de imágenes
    pathname.startsWith("/icons") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    PUBLIC_FILE.test(pathname) // ✅ .png, .jpg, .css, .js, etc.
  ) {
    return NextResponse.next()
  }

  // ✅ Si ya empieza con /en o /es, no tocar
  const hasLocale = SUPPORTED.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (hasLocale) return NextResponse.next()

  // ✅ Redirigir cualquier ruta sin idioma a /en/...
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
}
