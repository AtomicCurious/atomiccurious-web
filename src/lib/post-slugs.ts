import { postsEs } from "@/content/posts.es"
import { postsEn } from "@/content/posts.en"

export function getEnSlugFromEs(esSlug: string) {
  const esPost = postsEs.find((post) => post.slug === esSlug)
  if (!esPost) return null

  const enPost = postsEn.find((post) => post.id === esPost.id)
  return enPost?.slug ?? null
}

export function getEsSlugFromEn(enSlug: string) {
  const enPost = postsEn.find((post) => post.slug === enSlug)
  if (!enPost) return null

  const esPost = postsEs.find((post) => post.id === enPost.id)
  return esPost?.slug ?? null
}