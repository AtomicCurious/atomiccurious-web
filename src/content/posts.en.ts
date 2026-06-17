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
    slug: "why-falling-in-love-makes-you-dumber",
    id: "ac-004",
    title: "Why Falling in Love Changes How Clearly You Think",
    description:
      "Romantic love can temporarily affect judgment, risk perception, and decision-making more than most people realize.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-06-03T17:00:00-04:00"),

    format: "curiosity",
    tag: "Psychology / Neuroscience",
    readingTime: 8,
    bullets: [
      "What love actually does to your brain",
      "Why falling in love changes your critical thinking",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Why We Love — Helen Fisher",
        href: "https://amzn.to/4nM7YfS",
        tag: "Book",
        description:
          "The researcher who helped map the brain in love. A clear look at the neuroscience and chemistry behind romantic attraction.",
      },
      {
        name: "Attached — Amir Levine",
        href: "https://amzn.to/3RR4D2S",
        tag: "Book",
        description:
          "How attachment styles shape emotional decisions, bonds, and the way we experience relationships.",
      },
      {
        name: "Emotional Intelligence — Daniel Goleman",
        href: "https://amzn.to/4ujnFxf",
        tag: "Book",
        description:
          "Why emotions influence thinking, behavior, and decision-making far more than we usually assume.",
      },
    ],
  },

  {
    slug: "reading-vs-audiobooks-which-retains-more",
    id: "ac-005",
    title: "Reading vs Listening: Which One Actually Retains More Information?",
    description:
      "Does your brain learn the same way from reading and listening? The answer is more complex than it seems.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-06-10T17:00:00-04:00"),

    format: "ranked",
    tag: "Learning / Neuroscience",
    readingTime: 8,
    bullets: [
      "How your brain processes information",
      "Which method remembers more and why",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Make It Stick — Peter C. Brown",
        href: "https://amzn.to/3Ql8UeG",
        tag: "Book",
        description:
          "A science-based book on memory, learning, and retention. A strong fit if you want to understand why remembering depends on attention, retrieval, and how you process information.",
      },
      {
        name: "Stolen Focus — Johann Hari",
        href: "https://amzn.to/4uT3SoG",
        tag: "Book / Audiobook",
        description:
          "A strong companion for the audio side of this topic. It explores attention, distraction, and why deep focus matters when you want information to actually land.",
      },
      {
        name: "Readwise Reader",
        href: "https://readwise.io/read",
        tag: "App",
        cta: "Explore tool →",
        description:
          "A read-it-later app for articles, newsletters, PDFs, EPUBs, highlights, and text-to-speech. Useful for turning reading and listening into a cleaner system for attention and retention.",
      },
    ],
  },

  {
    slug: "your-brain-vs-reality-paris-in-the-the-spring",
    id: "ac-006",
    title:
      'Your Brain vs Reality: Can You Read "PARIS IN THE THE SPRING" Without Failing?',
    description:
      "Your brain does not see reality exactly the way you think. It constantly fills in, skips and reconstructs information.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-06-17T17:00:00-04:00"),

    format: "quiz",
    tag: "Cognition / Perception",
    readingTime: 7,
    bullets: [
      "Why your brain ignores obvious mistakes",
      "How perception reconstructs reality",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Article: The Predictive Brain",
        href: "https://www.quantamagazine.org/to-be-energy-efficient-brains-predict-their-perceptions-20211115/",
        tag:  "Free read",
        cta:  "Read article →",
        description:
          "A Quanta Magazine article about how the brain predicts perception instead of processing every detail from scratch.",
      },
      {
        name: "The Invisible Gorilla — Christopher Chabris & Daniel Simons",
        href: "https://amzn.to/4xpJDRq",
        tag:  "Best starting point",
        cta:  "View book →",
        description:
          "The best follow-up to the attention part of this episode. A readable book about why we miss more than we think.",
      },
      {
        name: "The Brain: The Story of You — David Eagleman",
        href: "https://amzn.to/4egC1YH",
        tag:  "Best intro",
        cta: "View book →",
        description:
          "A clear and accessible introduction to how the brain shapes perception, memory, identity, and experience.",
      },
    ],
  },

  {
    slug: "why-ai-is-already-making-decisions-for-you",
    id: "ac-007",
    title:
      "AI Understands Nothing… So Why Is It Already Making Decisions for You?",
    description:
      "AI systems do not think like humans, yet they already influence work, information and everyday decisions.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-06-24T17:00:00-04:00"),

    format: "curiosity",
    tag: "AI / Technology",
    readingTime: 10,
    bullets: [
      "Why AI does not truly “understand”",
      "How it still ends up shaping decisions",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring artificial intelligence, algorithms and automated decisions.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for testing, understanding or comparing AI systems in everyday tasks.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for analyzing how AI influences information, work and human behavior.",
      },
    ],
  },

  {
    slug: "the-7-most-efficient-ways-to-learn",
    id: "ac-008",
    title: "The 7 Ways to Learn — Ranked by What Actually Works",
    description:
      "Not every learning technique works equally well. Some waste time while others dramatically improve retention.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-01T17:00:00-04:00"),

    format: "ranked",
    tag: "Learning / Science",
    readingTime: 10,
    bullets: [
      "Which methods have the strongest scientific support",
      "Why rereading usually performs worse",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring effective learning, memory and evidence-based study techniques.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for practicing spaced repetition, active recall or structured learning.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for improving long-term retention and learning habits.",
      },
    ],
  },

  {
    slug: "association-test-what-do-these-images-have-in-common",
    id: "ac-009",
    title:
      "What Do These Images Have in Common? The Test That Reveals How Your Brain Connects Patterns",
    description:
      "Your brain detects relationships even before you are consciously aware of them. This quiz puts that system to the test.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-08T17:00:00-04:00"),

    format: "quiz",
    tag: "Psychology / Patterns",
    readingTime: 6,
    bullets: [
      "How your brain connects patterns",
      "Why some associations feel instant",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring patterns, mental association and intuitive thinking.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for training lateral thinking, pattern recognition or creativity.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for exploring cognition, intuition and mental associations in more depth.",
      },
    ],
  },

  {
    slug: "why-music-is-the-only-universal-language",
    id: "ac-010",
    title: "Why Does Music Work Even Without Translation?",
    description:
      "Music activates deeply human brain systems even when you do not understand the lyrics.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-15T17:00:00-04:00"),

    format: "curiosity",
    tag: "Music / Neuroscience",
    readingTime: 8,
    bullets: [
      "Why music crosses languages",
      "What happens in your brain when you hear it",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring music, the brain, emotion and human communication.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for analyzing music, training your ear or exploring composition and sound patterns.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for exploring musical language, emotion and auditory perception in more depth.",
      },
    ],
  },

  {
    slug: "the-5-financial-decisions-that-impact-your-life-the-most",
    id: "ac-011",
    title: "The 5 Financial Decisions That Change Your Life the Most",
    description:
      "The biggest financial differences in life rarely come from small daily expenses.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-22T17:00:00-04:00"),

    format: "ranked",
    tag: "Finance / Decisions",
    readingTime: 9,
    bullets: [
      "Which decisions shape your financial future the most",
      "Why some choices matter far more than skipping coffee",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring financial decisions, economic behavior and personal planning.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for budgeting, comparing financial choices or visualizing long-term goals.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for improving financial judgement and decision-making.",
      },
    ],
  },

  {
    slug: "real-image-or-ai-generated",
    id: "ac-012",
    title: "Real Image or AI-Generated?",
    description:
      "AI-generated images are crossing the point where most people stop noticing the difference.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-07-29T17:00:00-04:00"),

    format: "quiz",
    tag: "AI / Perception",
    readingTime: 7,
    bullets: [
      "What makes a fake image detectable",
      "Why it is becoming harder to tell",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring AI-generated images, visual perception and digital culture.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for detecting, comparing or creating images with artificial intelligence.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for understanding visual authenticity, deepfakes and synthetic media.",
      },
    ],
  },

  {
    slug: "why-modern-entertainment-is-designed-to-kill-boredom",
    id: "ac-013",
    title: "Why Modern Entertainment Is Designed to Kill Boredom",
    description:
      "Modern platforms compete for something deeper than your attention: your ability to feel bored.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-08-05T17:00:00-04:00"),

    format: "curiosity",
    tag: "Technology / Psychology",
    readingTime: 9,
    bullets: [
      "How platforms optimize retention",
      "Why boredom has become rare",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring attention, digital entertainment and persuasive design.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for measuring screen time, reducing distractions or recovering focus time.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for understanding boredom, dopamine and digital habits.",
      },
    ],
  },

  {
    slug: "the-7-useless-things-school-taught-you",
    id: "ac-014",
    title: "The 7 Useless Things School Taught You",
    description:
      "School teaches many useful things. But it also spends years on skills most people rarely use again.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-08-12T17:00:00-04:00"),

    format: "ranked",
    tag: "Education / Society",
    readingTime: 9,
    bullets: [
      "Which knowledge often gets forgotten",
      "Why education systems prioritize certain skills",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring education, learning and practical skills.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for learning practical skills, organizing study or strengthening useful knowledge.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for questioning education models and everyday learning.",
      },
    ],
  },

  {
    slug: "how-many-hearts-does-an-octopus-have",
    id: "ac-015",
    title: "How Many Hearts Does an Octopus Have?",
    description:
      "Octopuses feel alien for a reason: much of their biology breaks human intuition.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-08-19T17:00:00-04:00"),

    format: "quiz",
    tag: "Biology / Quiz",
    readingTime: 6,
    bullets: [
      "Why octopuses are so strange",
      "The biological system most people do not know",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring octopuses, marine biology and animal intelligence.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for exploring marine species, biodiversity or visual biology learning.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for exploring anatomy, evolution and animal behavior.",
      },
    ],
  },

  {
    slug: "why-every-generation-thinks-the-last-one-did-everything-wrong",
    id: "ac-016",
    title: "Why Every Generation Thinks the Next One Is Ruined",
    description:
      "Every generation thinks the next one has lost values, discipline or intelligence. This has been happening for centuries.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-08-26T17:00:00-04:00"),

    format: "curiosity",
    tag: "Society / Psychology",
    readingTime: 8,
    bullets: [
      "Why this pattern keeps repeating",
      "How nostalgia distorts perception",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring generations, nostalgia, social change and historical perception.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for comparing generational data, cultural history or social change.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for understanding generational bias and collective memory.",
      },
    ],
  },

  {
    slug: "introvert-vs-extrovert-who-has-the-advantage-today",
    id: "ac-017",
    title: "Introvert vs Extrovert: Who Has the Advantage Today?",
    description:
      "Personality shapes work, relationships and social adaptation far more than it seems.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-09-02T17:00:00-04:00"),

    format: "ranked",
    tag: "Psychology / Personality",
    readingTime: 9,
    bullets: [
      "What advantages each personality type has",
      "Why the modern world rewards certain traits",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring personality, introversion, extroversion and social adaptation.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for exploring personality traits, self-knowledge or social dynamics.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for understanding behavior, communication and individual differences.",
      },
    ],
  },

  {
    slug: "guess-the-sequence",
    id: "ac-018",
    title: "Guess the Sequence",
    description:
      "Your brain hates incomplete patterns. That reveals a lot about how human cognition works.",

    // 5:00 PM New York (EDT)
    date: new Date("2026-09-09T17:00:00-04:00"),

    format: "quiz",
    tag: "Cognition / Quiz",
    readingTime: 6,
    bullets: [
      "Why the brain constantly searches for patterns",
      "How mental prediction works",
    ],
    featured: false,

    affiliateItems: [
      {
        name: "Related Book Placeholder",
        href: "https://example.com",
        tag: "Book",
        description:
          "Placeholder resource for exploring patterns, mental prediction and sequence solving.",
      },
      {
        name: "Related Tool Placeholder",
        href: "https://example.com",
        tag: "Tool",
        cta: "Explore tool →",
        description:
          "Placeholder tool for practicing logic, patterns, memory or analytical thinking.",
      },
      {
        name: "Additional Resource Placeholder",
        href: "https://example.com",
        tag: "Resource",
        description:
          "Placeholder resource for exploring cognition, prediction and reasoning.",
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