// app/robots.ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/privacy",
          "/terms",
          "/cookies",
          "/legal",
          "/es/privacidad",
          "/es/terminos",
          "/es/cookies",
          "/es/aviso-legal",
        ],
      },
    ],
    sitemap: "https://atomiccurious.com/sitemap.xml",
  }
}
