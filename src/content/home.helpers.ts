import { postsEn, latestPostEn, type PostListItem as PostEnItem } from "./posts.en"
import { postsEs, latestPostEs, type PostListItem as PostEsItem } from "./posts.es"

/**
 * Home tiles helpers
 * - Usa post FEATURED si existe (control editorial)
 * - Fallback al latestPost*
 * - Los bullets vienen del post (single source of truth)
 * - Home NO duplica datos de posts
 */

export function getLatestPostTileEn() {
  const post = pickFeaturedOrLatest(postsEn, latestPostEn)

  return {
    href: `/en/posts/${post.slug}`,
    badge: "LATEST EXPLORATION",
    badgeDot: "teal" as const,
    title: post.title,
    description: post.description,
    tags: [
      formatSeriesEn(post.format),
      post.tag,
      post.date,
    ].filter(Boolean) as string[],
    bullets: mapBullets(post.bullets, "en"),
    ctaLabel: "Read exploration",
  }
}

export function getLatestPostTileEs() {
  const post = pickFeaturedOrLatest(postsEs, latestPostEs)

  return {
    href: `/es/posts/${post.slug}`,
    badge: "ÚLTIMA EXPLORACIÓN",
    badgeDot: "teal" as const,
    title: post.title,
    description: post.description,
    tags: [
      formatSeriesEs(post.format),
      post.tag,
      post.date,
    ].filter(Boolean) as string[],
    bullets: mapBullets(post.bullets, "es"),
    ctaLabel: "Leer exploración",
  }
}

/* ---------------------------------- */
/* Internal helpers                    */
/* ---------------------------------- */

function pickFeaturedOrLatest<T extends { featured?: boolean }>(
  posts: T[],
  latest: T
) {
  return posts.find((p) => p.featured) ?? latest
}

function mapBullets(
  bullets: string[] | undefined,
  locale: "en" | "es"
) {
  const safeBullets =
    bullets && bullets.length
      ? bullets
      : locale === "en"
        ? defaultBulletsEn()
        : defaultBulletsEs()

  return safeBullets.map((text, index) => ({
    text,
    dot: index === 0 ? ("teal" as const) : ("pink" as const),
  }))
}

function formatSeriesEn(format: PostEnItem["format"]) {
  switch (format) {
    case "curiosity":
      return "Curiosity · Atom"
    case "ranked":
      return "Ranked · Iris"
    case "quiz":
      return "Quiz · Core"
    default:
      return undefined
  }
}

function formatSeriesEs(format: PostEsItem["format"]) {
  switch (format) {
    case "curiosity":
      return "Curiosidad · Atom"
    case "ranked":
      return "Ranked · Iris"
    case "quiz":
      return "Quiz · Core"
    default:
      return undefined
  }
}

/* ---------------------------------- */
/* Fallback bullets (safety net)       */
/* ---------------------------------- */

function defaultBulletsEn() {
  return ["Key idea #1", "Key idea #2"]
}

function defaultBulletsEs() {
  return ["Idea clave #1", "Idea clave #2"]
}
