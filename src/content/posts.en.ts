export type PostFormat = "curiosity" | "ranked" | "quiz"

export type AffiliateItem = {
  name: string
  href: string
  tag?: string
  cta?: string
}

export type PostListItem = {
  slug: string
  title: string
  description: string
  date: Date
  format: PostFormat
  tag?: string
  readingTime?: number

  bullets?: string[]
  featured?: boolean

  // affiliate items per post
  affiliateItems?: AffiliateItem[]

  id: string
}

export const postsEn: PostListItem[] = [
  {
    slug: "why-8-hrs",
    id: "ac-001",
    title: "Why We Work 8 Hours a Day",
    description:
      "The real origin of the 8-hour workday and why it was never designed for the kind of work you do today.",
    date: new Date("2026-04-26"),
    format: "curiosity",
    tag: "Work / Productivity",
    readingTime: 7,
    bullets: [
      "Where the 8-hour day actually comes from",
      "Why your brain isn't built for it",
    ],
    featured: true,

    affiliateItems: [
      {
        name: "Deep Work — Cal Newport",
        href: "https://amzn.to/3OGP110",
        tag: "Book",
      },
      {
        name: "Pomofocus",
        href: "https://pomofocus.io",
        tag: "Free tool",
        cta: "Open tool →",
      },
      {
        name: "Four Thousand Weeks — Oliver Burkeman",
        href: "https://amzn.to/48vWyq8",
        tag: "Book",
      },
    ],
  },
]

// Filters only published posts (allows scheduling by date)
export const publishedPostsEn: PostListItem[] = postsEn.filter(
  (post) => post.date <= new Date()
)

// Sorts by date descending using only published posts
export const latestPostEn = [...publishedPostsEn].sort(
  (a, b) => b.date.getTime() - a.date.getTime()
)[0]