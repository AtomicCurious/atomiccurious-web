export type PostFormat = "curiosity" | "ranked" | "quiz"

export type AffiliateItem = {
  name: string
  href: string
  tag?: string
  cta?: string
  description?: string
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
    slug: "the-wtf-chain-flamingos",
    id: "ac-003",
    title:
      "The WTF Chain: How a Pink Flamingo Is Connected to Your Next Breath",
    description:
      "Flamingos aren’t born pink. Shrimp aren’t either. And that chain ends with the oxygen you breathe.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-05-27T17:00:00-04:00"),

    format: "quiz",
    tag: "Science / Systems",
    readingTime: 9,
    bullets: [
      "Flamingos are not born pink",
      "The invisible chain that reaches your next breath",
    ],
    featured: true,

    affiliateItems: [
      {
        name: "Entangled Life — Merlin Sheldrake",
        href: "https://amzn.to/48ZOMVz",
        tag: "Book",
        description:
          "Explores how invisible fungal networks connect entire ecosystems beneath the surface.",
      },

      {
        name: "Carson MicroBrite Plus",
        href: "https://amzn.to/4dFZXW4",
        tag: "Tool",
        description:
          "A pocket microscope for exploring textures, organisms, and hidden details in the everyday world.",
      },

      {
        name: "iNaturalist",
        href: "https://www.inaturalist.org",
        tag: "App",
        cta: "Explore tool →",
        description:
          "A tool for identifying species and turning curiosity into observations that contribute to science.",
      },
    ],
  },

  {
    slug: "science-backed-habits",
    id: "ac-002",
    title: "Top 7 science-backed habits",
    description:
      "Most habit rankings mix scientific impact with ease of implementation as if they were the same thing. They are not.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-05-20T17:00:00-04:00"),

    format: "ranked",
    tag: "Health / Habits",
    readingTime: 10,
    bullets: [
      "Two criteria. Two winners.",
      "Why the #1 habit depends on how you measure it",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Why We Sleep — Matthew Walker",
        href: "https://amzn.to/4tCpg05",
        tag: "Book",
        description:
          "A deep exploration of how sleep affects memory, energy, health, and cognitive performance.",
      },

      {
        name: "The Circadian Code — Satchin Panda",
        href: "https://amzn.to/3PlbmBs",
        tag: "Book",
        description:
          "A practical guide to how circadian rhythms influence sleep, energy, metabolism, and long-term health.",
      },

      {
        name: "Rise Science",
        href: "https://www.risescience.com",
        tag: "App",
        cta: "Explore tool →",
        description:
          "A tool for exploring sleep debt, daily energy patterns, and circadian rhythm metrics.",
      },
    ],
  },

  {
    slug: "why-8-hrs",
    id: "ac-001",
    title: "Why We Work 8 Hours a Day",
    description:
      "The real origin of the 8-hour workday and why it was never designed for the kind of work you do today.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-05-13T17:00:00-04:00"),

    format: "curiosity",
    tag: "Work / Productivity",
    readingTime: 7,
    bullets: [
      "Where the 8-hour workday actually comes from",
      "Why your brain was never built for it",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Deep Work — Cal Newport",
        href: "https://amzn.to/3OGP110",
        tag: "Book",
        description:
          "Explores how deep focus became one of the rarest and most valuable skills in modern work.",
      },

      {
        name: "Rize",
        href: "https://rize.io",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "A tool for visualizing focus time, distractions, and real work patterns in real time.",
      },

      {
        name: "Four Thousand Weeks — Oliver Burkeman",
        href: "https://amzn.to/48vWyq8",
        tag: "Book",
        description:
          "A reflection on time, productivity, and the real limits of human life.",
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