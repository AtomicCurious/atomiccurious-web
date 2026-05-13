// src/data/resources.en.ts

export type Category =
  | "All"
  | "Books"
  | "Apps"
  | "Websites"
  | "Tools"
  | "Courses"
  | "Productivity"
  | "Learning"

export type ResourceGroup = Exclude<Category, "All">

export type FeaturedResource = {
  title: string
  creator: string
  description: string
  category: string
  group: ResourceGroup
  href: string
  image?: string
  fallback: string
  tags: string[]
}

export type RecentResource = {
  title: string
  description: string
  category: string
  group: ResourceGroup
  href: string
  icon: string
  tags: string[]
}

export const categories: Category[] = [
  "All",
  "Books",
  "Apps",
  "Websites",
  "Tools",
  "Courses",
  "Productivity",
  "Learning",
]

export const featuredResources: FeaturedResource[] = [
  {
    title: "Thinking, Fast and Slow",
    creator: "Daniel Kahneman",
    description:
      "An essential read on the two systems that shape how we think and make decisions.",
    category: "BOOK",
    group: "Books",
    href: "https://www.amazon.com/s?k=Thinking+Fast+and+Slow",
    image: "/images/sections/resources/thinking-fast-and-slow.webp",
    fallback: "T",
    tags: ["psychology", "thinking", "decisions", "biases", "book"],
  },
  {
    title: "Readwise",
    creator: "Readwise",
    description:
      "Remember more of what you read and build a system for long-term knowledge.",
    category: "APP",
    group: "Apps",
    href: "https://readwise.io",
    image: "/images/sections/resources/readwise.webp",
    fallback: "R",
    tags: ["reading", "notes", "learning", "memory", "app"],
  },
  {
    title: "Kurzgesagt",
    creator: "In a Nutshell",
    description:
      "Science explained through clear, beautiful, and highly engaging visual stories.",
    category: "WEBSITE",
    group: "Websites",
    href: "https://kurzgesagt.org",
    image: "/images/sections/resources/kurzgesagt.webp",
    fallback: "K",
    tags: ["science", "education", "videos", "learning", "website"],
  },
  {
    title: "Obsidian",
    creator: "Obsidian",
    description:
      "A powerful personal knowledge base for connecting ideas and thinking clearly.",
    category: "TOOL",
    group: "Tools",
    href: "https://obsidian.md",
    image: "/images/sections/resources/obsidian.webp",
    fallback: "O",
    tags: ["notes", "productivity", "knowledge", "thinking", "tool"],
  },
]

export const recentResources: RecentResource[] = [
  {
    title: "Notion",
    description:
      "Organize notes, tasks, and projects in one flexible workspace.",
    category: "PRODUCTIVITY",
    group: "Productivity",
    href: "https://www.notion.com",
    icon: "N",
    tags: ["notes", "organization", "projects", "productivity"],
  },
  {
    title: "Superhuman",
    description:
      "An email experience designed to save you hours every week.",
    category: "PRODUCTIVITY",
    group: "Productivity",
    href: "https://superhuman.com",
    icon: "S",
    tags: ["email", "inbox", "productivity", "time"],
  },
  {
    title: "Physics Girl",
    description:
      "Intuitive and entertaining physics experiments that make complex ideas easy to understand.",
    category: "LEARNING",
    group: "Learning",
    href: "https://www.youtube.com/@physicsgirl",
    icon: "P",
    tags: ["physics", "science", "youtube", "learning"],
  },
]