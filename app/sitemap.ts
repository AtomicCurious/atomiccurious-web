// app/sitemap.ts
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://atomiccurious.com"
  const now = new Date()

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // 👉 Aquí luego irán tus páginas reales:
    // {
    //   url: `${baseUrl}/explore/...`,
    //   lastModified: now,
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
  ]
}
