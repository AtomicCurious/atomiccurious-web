"use client"

// app/(en)/(sections)/resources/resources-client.tsx
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  categories,
  featuredResources,
  recentResources,
  type Category,
  type FeaturedResource,
  type RecentResource,
} from "@/data/resources.en"

const HERO_CORE_IMAGE = "/images/sections/resources/resources_p1.webp"
const SEARCH_DEBOUNCE_MS = 180

type Resource = FeaturedResource | RecentResource

type PreparedResource<T extends Resource> = T & {
  searchText: string
  normalizedTitle: string
  normalizedDescription: string
  normalizedCategory: string
  normalizedCreator: string
  normalizedTags: string[]
  resourceKey: string
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}

function getResourceCreator(resource: Resource) {
  return "creator" in resource ? resource.creator : ""
}

function getResourceKey(resource: Resource) {
  return `${resource.group}-${resource.href}-${resource.title}`
}

function prepareResource<T extends Resource>(resource: T): PreparedResource<T> {
  const normalizedTitle = normalizeText(resource.title)
  const normalizedDescription = normalizeText(resource.description)
  const normalizedCategory = normalizeText(resource.category)
  const normalizedCreator = normalizeText(getResourceCreator(resource))
  const normalizedGroup = normalizeText(resource.group)
  const normalizedTags = resource.tags.map((tag) => normalizeText(tag))

  return {
    ...resource,
    normalizedTitle,
    normalizedDescription,
    normalizedCategory,
    normalizedCreator,
    normalizedTags,
    resourceKey: getResourceKey(resource),
    searchText: [
      normalizedTitle,
      normalizedDescription,
      normalizedCategory,
      normalizedCreator,
      normalizedGroup,
      normalizedTags.join(" "),
    ].join(" "),
  }
}

function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}

function isValidCategory(value: string | null): value is Category {
  return categories.includes(value as Category)
}

function resourceMatchesCategory(resource: Resource, category: Category) {
  if (category === "All") return true
  return resource.group === category
}

function resourceMatchesSearch(resource: PreparedResource<Resource>, query: string) {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return true
  return resource.searchText.includes(normalizedQuery)
}

function hasExactTag(resource: PreparedResource<Resource>, tag: string) {
  return resource.normalizedTags.includes(normalizeText(tag))
}

function scoreResource(resource: PreparedResource<Resource>, query: string) {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return 0

  let score = 0

  if (resource.normalizedTitle === normalizedQuery) score += 20
  if (resource.normalizedTitle.includes(normalizedQuery)) score += 10
  if (resource.normalizedTags.includes(normalizedQuery)) score += 8
  if (resource.normalizedTags.some((tag) => tag.includes(normalizedQuery))) score += 5
  if (resource.normalizedCategory.includes(normalizedQuery)) score += 5
  if (resource.normalizedCreator.includes(normalizedQuery)) score += 4
  if (resource.normalizedDescription.includes(normalizedQuery)) score += 3
  if (resource.searchText.includes(normalizedQuery)) score += 1

  return score
}

function sortResourcesByRelevance<T extends PreparedResource<Resource>>(
  resources: T[],
  query: string,
) {
  return [...resources].sort(
    (a, b) => scoreResource(b, query) - scoreResource(a, query),
  )
}

function getResourceWhy(resource: PreparedResource<Resource>) {
  if (
    hasExactTag(resource, "productivity") ||
    resource.normalizedCategory === "productivity"
  ) {
    return "Useful for building sharper systems, better focus, and cleaner workflows."
  }

  if (
    hasExactTag(resource, "learning") ||
    resource.normalizedCategory === "learning"
  ) {
    return "Useful for understanding complex ideas with more clarity and structure."
  }

  if (
    hasExactTag(resource, "creativity") ||
    resource.normalizedCategory === "creative"
  ) {
    return "Useful for turning curiosity into ideas, projects, and better thinking."
  }

  if (hasExactTag(resource, "tools") || resource.normalizedCategory === "tools") {
    return "Useful when you want practical leverage, not just more information."
  }

  if (
    hasExactTag(resource, "book") ||
    hasExactTag(resource, "books") ||
    resource.normalizedCategory === "books"
  ) {
    return "Useful for going deeper than short-form content can usually take you."
  }

  return "Selected for clarity, usefulness, and long-term curiosity value."
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-muted" fill="none">
      <path d="M10.8 18.1a7.3 7.3 0 1 1 0-14.6 7.3 7.3 0 0 1 0 14.6Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16.1 16.1 4.1 4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-[rgb(var(--accent))]" fill="none">
      <path d="m12 2.8 2.5 6.4 6.7.5-5.1 4.3 1.6 6.6L12 17l-5.7 3.6L7.9 14 2.8 9.7l6.7-.5L12 2.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[rgb(var(--accent))]" fill="none">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3.2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[rgb(var(--accent))]" fill="none">
      <path d="M12 3.5 13.7 9l5.3 1.8-5.3 1.8L12 18l-1.7-5.4L5 10.8 10.3 9 12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function BookmarkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-muted transition group-hover:text-[rgb(var(--accent))]" fill="none">
      <path d="M7 4.5h10v15l-5-3.2-5 3.2v-15Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-muted transition group-hover:text-[rgb(var(--accent))]" fill="none">
      <path d="M14 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m19 5-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 14v4.5H5.5v-14H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AtomMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className="h-16 w-16 text-[rgb(var(--accent))]" fill="none">
      <circle cx="32" cy="32" r="3.5" fill="currentColor" />
      <ellipse cx="32" cy="32" rx="24" ry="8" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="32" cy="32" rx="24" ry="8" stroke="currentColor" strokeWidth="2" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="24" ry="8" stroke="currentColor" strokeWidth="2" transform="rotate(120 32 32)" />
    </svg>
  )
}

function ResourceTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-[rgb(var(--accent)/0.16)] bg-[rgb(var(--accent)/0.055)] px-2.5 py-1 text-[10px] font-semibold text-muted transition group-hover:border-[rgb(var(--accent)/0.26)] group-hover:text-text"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function FeaturedResourceCard({
  resource,
}: {
  resource: PreparedResource<FeaturedResource>
}) {
  return (
    <Link
      href={resource.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open featured resource: ${resource.title}`}
      className={[
        "ac-res-card group relative overflow-hidden rounded-2xl",
        "border border-border/70 bg-surface-1/35 p-4 shadow-soft backdrop-blur-xl",
        "transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(var(--accent)/0.32)]",
        "hover:bg-[rgb(var(--accent)/0.045)] hover:shadow-[0_22px_60px_rgba(var(--accent),0.13)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent)/0.55)]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[rgb(var(--accent)/0.13)] blur-3xl" />
        <div className="absolute -bottom-16 left-10 h-28 w-28 rounded-full bg-[rgb(var(--accent)/0.07)] blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent)/0.35)] to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative flex min-h-[126px] gap-4">
        <div className="ac-res-icon-tile relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/70 bg-bg/35">
          {resource.image ? (
            <Image
              src={resource.image}
              alt={`Cover or preview image for ${resource.title}`}
              fill
              sizes="96px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="text-3xl font-semibold text-text">
              {resource.fallback}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex rounded-full border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.10)] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[rgb(var(--accent))]">
              {resource.category}
            </span>

            <BookmarkIcon />
          </div>

          <h3 className="mt-3 text-base font-semibold tracking-tight text-text transition group-hover:text-[rgb(var(--accent))]">
            {resource.title}
          </h3>

          <p className="mt-1 text-xs font-medium text-muted">
            {resource.creator}
          </p>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {resource.description}
          </p>

          <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-[rgb(var(--accent))]">
            {getResourceWhy(resource)}
          </p>

          <ResourceTags tags={resource.tags} />
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-center rounded-xl border border-[rgb(var(--accent)/0.20)] bg-[rgb(var(--accent)/0.06)] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--accent))] transition duration-300 group-hover:border-[rgb(var(--accent)/0.42)] group-hover:bg-[rgb(var(--accent)/0.12)] group-hover:shadow-[0_0_24px_rgba(var(--accent),0.12)]">
        Explore resource
        <span className="ml-2 transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  )
}

function RecentResourceRow({
  resource,
}: {
  resource: PreparedResource<RecentResource>
}) {
  return (
    <Link
      href={resource.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open recent resource: ${resource.title}`}
      className={[
        "ac-res-row group relative grid grid-cols-[auto_1fr_auto] items-center gap-4",
        "border border-border/50 px-4 py-3 transition-all duration-200",
        "hover:border-[rgb(var(--accent)/0.22)] hover:bg-[rgb(var(--accent)/0.045)] hover:pl-5",
        "first:rounded-t-2xl last:rounded-b-2xl",
        "sm:grid-cols-[auto_1fr_auto_auto]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent)/0.55)]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      ].join(" ")}
    >
      <span className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-[rgb(var(--accent))] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-bg/40 text-sm font-bold text-text transition group-hover:border-[rgb(var(--accent)/0.30)] group-hover:text-[rgb(var(--accent))]">
        {resource.icon}
      </span>

      <div className="min-w-0 sm:grid sm:grid-cols-[220px_1fr] sm:items-center sm:gap-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-text transition group-hover:text-[rgb(var(--accent))]">
            {resource.title}
          </p>

          <p className="mt-1 hidden text-xs font-medium text-[rgb(var(--accent))] sm:block">
            {getResourceWhy(resource)}
          </p>
        </div>

        <p className="mt-1 line-clamp-1 text-sm text-muted sm:mt-0">
          {resource.description}
        </p>
      </div>

      <span className="hidden rounded-full border border-[rgb(var(--accent)/0.20)] bg-[rgb(var(--accent)/0.10)] px-3 py-1 text-[10px] font-bold tracking-wide text-[rgb(var(--accent))] sm:inline-flex">
        {resource.category}
      </span>

      <ExternalIcon />
    </Link>
  )
}

function EmptyState({
  searchQuery,
  activeCategory,
  onReset,
}: {
  searchQuery: string
  activeCategory: Category
  onReset: () => void
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-surface-1/35 p-6 text-center shadow-soft backdrop-blur">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.08)]">
        <SparkIcon />
      </div>

      <h3 className="mt-4 text-base font-semibold text-text">
        No resources found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
        No results matched
        {searchQuery ? ` “${searchQuery}”` : ""}
        {activeCategory !== "All" ? ` inside ${activeCategory}` : ""}. Try a
        broader search or clear the current filters.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center justify-center rounded-xl border border-[rgb(var(--accent)/0.30)] bg-[rgb(var(--accent)/0.12)] px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-[rgb(var(--accent)/0.18)]"
      >
        Reset filters
      </button>
    </div>
  )
}

export default function ResourcesClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchInputId = useId()
  const categoryGroupId = useId()
  const searchInputRef = useRef<HTMLInputElement>(null)

  const categoryParam = searchParams.get("category")
  const queryParam = searchParams.get("q")

  const initialCategory: Category = isValidCategory(categoryParam)
    ? categoryParam
    : "All"

  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory)
  const [searchQuery, setSearchQuery] = useState(queryParam ?? "")

  const debouncedSearchQuery = useDebouncedValue(searchQuery, SEARCH_DEBOUNCE_MS)

  const preparedFeaturedResources = useMemo(() => {
    return featuredResources.map((resource) => prepareResource(resource))
  }, [])

  const preparedRecentResources = useMemo(() => {
    return recentResources.map((resource) => prepareResource(resource))
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearchQuery.trim()) {
      params.set("q", debouncedSearchQuery.trim())
    } else {
      params.delete("q")
    }

    if (activeCategory !== "All") {
      params.set("category", activeCategory)
    } else {
      params.delete("category")
    }

    const nextQuery = params.toString()
    const currentQuery = searchParams.toString()
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname

    if (nextQuery !== currentQuery) {
      router.replace(nextUrl, { scroll: false })
    }
  }, [
    activeCategory,
    debouncedSearchQuery,
    pathname,
    router,
    searchParams,
  ])

  useEffect(() => {
    function handleSearchShortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable

      if (isTyping) return

      if (
        event.key === "/" ||
        ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")
      ) {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleSearchShortcut)
    return () => window.removeEventListener("keydown", handleSearchShortcut)
  }, [])

  const filteredFeaturedResources = useMemo(() => {
    const resources = preparedFeaturedResources.filter(
      (resource) =>
        resourceMatchesCategory(resource, activeCategory) &&
        resourceMatchesSearch(resource, debouncedSearchQuery),
    )

    return sortResourcesByRelevance(resources, debouncedSearchQuery)
  }, [
    activeCategory,
    debouncedSearchQuery,
    preparedFeaturedResources,
  ])

  const filteredRecentResources = useMemo(() => {
    const resources = preparedRecentResources.filter(
      (resource) =>
        resourceMatchesCategory(resource, activeCategory) &&
        resourceMatchesSearch(resource, debouncedSearchQuery),
    )

    return sortResourcesByRelevance(resources, debouncedSearchQuery)
  }, [activeCategory, debouncedSearchQuery, preparedRecentResources])

  const totalResults =
    filteredFeaturedResources.length + filteredRecentResources.length

  const isFiltering =
    debouncedSearchQuery.trim().length > 0 || activeCategory !== "All"

  const hasResults = totalResults > 0

  const resetFilters = useCallback(() => {
    setSearchQuery("")
    setActiveCategory("All")
    searchInputRef.current?.focus()
  }, [])

  return (
    <section className="ac-res-page relative w-full overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent)/0.35)] to-transparent" />
        <div className="absolute left-1/2 top-0 h-[440px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent),0.09),transparent_65%)] blur-3xl" />
        <div className="absolute right-[-120px] top-24 h-72 w-72 rounded-full bg-[rgb(var(--accent)/0.08)] blur-3xl" />
        <span className="ac-res-orb left-[66%] top-16 h-1 w-1" />
        <span className="ac-res-orb left-[81%] top-28 h-1.5 w-1.5" />
        <span className="ac-res-orb left-[61%] top-36 h-1 w-1" />
        <span className="ac-res-orb left-[88%] top-44 h-1 w-1" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-10 sm:px-10 sm:py-14">
        <header className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3">
              <span className="rounded-full border border-[rgb(var(--accent)/0.34)] bg-[rgb(var(--accent)/0.11)] px-3 py-1 text-xs font-bold tracking-wide text-[rgb(var(--accent))] shadow-[0_0_24px_rgba(var(--accent),0.12)] backdrop-blur">
                RESOURCES
              </span>
              <span className="text-[rgb(var(--accent))]">✦</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.04] tracking-tight text-text sm:text-6xl lg:text-7xl">
              Curated resources for{" "}
              <span className="bg-gradient-to-r from-[rgb(var(--accent))] via-text to-[rgb(var(--accent))] bg-clip-text text-transparent">
                curious
              </span>{" "}
              minds.
            </h1>

            <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg">
              Books, apps, websites, and tools selected to expand your
              perspective, sharpen your thinking, and turn curiosity into
              useful action.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-surface-1/35 p-4 shadow-soft backdrop-blur transition hover:border-[rgb(var(--accent)/0.22)]">
                <p className="text-2xl font-semibold text-text">
                  {featuredResources.length}
                </p>
                <p className="mt-1 text-xs font-medium text-muted">
                  Featured picks
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-surface-1/35 p-4 shadow-soft backdrop-blur transition hover:border-[rgb(var(--accent)/0.22)]">
                <p className="text-2xl font-semibold text-text">
                  {recentResources.length}
                </p>
                <p className="mt-1 text-xs font-medium text-muted">
                  Recent additions
                </p>
              </div>

              <div className="rounded-2xl border border-[rgb(var(--accent)/0.28)] bg-[rgb(var(--accent)/0.09)] p-4 shadow-[0_0_32px_rgba(var(--accent),0.10)] backdrop-blur transition hover:border-[rgb(var(--accent)/0.38)]">
                <p className="text-2xl font-semibold text-[rgb(var(--accent))]">
                  Core
                </p>
                <p className="mt-1 text-xs font-medium text-muted">
                  Curated by clarity
                </p>
              </div>
            </div>

            <div className="mt-7 max-w-2xl">
              <label
                htmlFor={searchInputId}
                className="mb-2 block text-sm font-semibold text-text"
              >
                Search AtomicCurious resources
              </label>

              <div className="ac-res-search flex items-center gap-3 rounded-2xl border border-[rgb(var(--accent)/0.30)] bg-bg/35 px-4 py-3 shadow-soft backdrop-blur transition-all duration-200 focus-within:border-[rgb(var(--accent)/0.65)] focus-within:bg-[rgb(var(--accent)/0.045)] focus-within:shadow-[0_0_0_3px_rgba(var(--accent),0.14)]">
                <SearchIcon />

                <input
                  ref={searchInputRef}
                  id={searchInputId}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search resources..."
                  aria-describedby={`${searchInputId}-hint`}
                  className="min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-muted sm:text-base"
                />

                <span
                  id={`${searchInputId}-hint`}
                  className="hidden text-xs font-medium text-muted sm:inline"
                >
                  Try: “productivity” · Press /
                </span>

                <span aria-hidden="true" className="text-[rgb(var(--accent))]">
                  ✦
                </span>
              </div>
            </div>

            <div className="mt-5">
              <p
                id={categoryGroupId}
                className="mb-2 text-sm font-semibold text-text"
              >
                Filter resources by category
              </p>

              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-labelledby={categoryGroupId}
              >
                {categories.map((category) => {
                  const isActive = activeCategory === category

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={[
                        "ac-res-chip rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                        isActive
                          ? "border-[rgb(var(--accent)/0.52)] bg-[rgb(var(--accent)/0.20)] text-text shadow-[0_0_24px_rgba(var(--accent),0.22)]"
                          : "border-border/70 bg-surface-1/35 text-muted hover:border-[rgb(var(--accent)/0.32)] hover:bg-[rgb(var(--accent)/0.07)] hover:text-text",
                      ].join(" ")}
                      aria-pressed={isActive}
                      aria-label={`Show ${category} resources`}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>

            {isFiltering && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <p className="text-sm text-muted" aria-live="polite">
                  {totalResults === 1
                    ? "1 resource found."
                    : `${totalResults} resources found.`}
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-semibold text-[rgb(var(--accent))] transition hover:opacity-80"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <div className="relative hidden min-h-[560px] lg:block">
            <div className="ac-res-hero-glow absolute inset-0 rounded-full blur-2xl" />

<div className="absolute left-1/2 top-[46%] h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_72%,rgba(var(--accent),0.20),transparent_72%)] blur-3xl" />

<div className="absolute left-1/2 top-[46%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--accent)/0.28)] shadow-[0_0_90px_rgba(var(--accent),0.16)]" />

<div className="absolute left-1/2 top-[46%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--accent)/0.12)] shadow-[inset_0_0_70px_rgba(var(--accent),0.08)]" />

<div className="absolute left-1/2 top-[46%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_50%_70%,rgba(var(--accent),0.08),transparent_68%)]" />

            <div className="ac-res-float relative -top-4 h-[560px] w-full scale-[1.08] transition duration-700 hover:scale-[1.11]">
              <Image
                src={HERO_CORE_IMAGE}
                alt="Core reading AtomicCurious resources"
                fill
                priority
                sizes="(min-width: 1024px) 680px, 90vw"
                className="object-contain object-center brightness-[1.04] contrast-[1.04] drop-shadow-[0_0_65px_rgba(var(--accent),0.38)] drop-shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="absolute bottom-0 left-1/2 w-[78%] -translate-x-1/2 rounded-2xl border border-[rgb(var(--accent)/0.18)] bg-bg/40 p-3.5 text-center shadow-[0_18px_54px_rgba(var(--accent),0.10)] backdrop-blur-md">
              <p className="text-sm font-semibold text-text">
                Core recommendation system
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Resources selected for usefulness, clarity, and long-term curiosity value.
              </p>
            </div>
          </div>
        </header>

        {!hasResults && isFiltering ? (
          <section className="mt-10">
            <EmptyState
              searchQuery={debouncedSearchQuery}
              activeCategory={activeCategory}
              onReset={resetFilters}
            />
          </section>
        ) : (
          <>
            <section className="mt-10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <StarIcon />
                  <h2 className="text-sm font-bold tracking-wide text-[rgb(var(--accent))]">
                    FEATURED RESOURCES
                  </h2>
                </div>

                <p className="hidden text-xs font-medium text-muted sm:block">
                  High-signal picks for deeper exploration.
                </p>
              </div>

              {filteredFeaturedResources.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
                  {filteredFeaturedResources.map((resource) => (
                    <FeaturedResourceCard
                      key={resource.resourceKey}
                      resource={resource}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border/70 bg-surface-1/35 p-6 text-sm text-muted">
                  No featured resources match your current filters.
                </div>
              )}
            </section>

            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <ClockIcon />
                  <h2 className="text-sm font-bold tracking-wide text-[rgb(var(--accent))]">
                    RECENTLY ADDED
                  </h2>
                </div>

                <p className="hidden text-xs font-medium text-muted sm:block">
                  New additions to the AtomicCurious library.
                </p>
              </div>

              {filteredRecentResources.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface-1/20 shadow-soft backdrop-blur">
                  {filteredRecentResources.map((resource) => (
                    <RecentResourceRow
                      key={resource.resourceKey}
                      resource={resource}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border/70 bg-surface-1/35 p-6 text-sm text-muted">
                  No recent resources match your current filters.
                </div>
              )}
            </section>
          </>
        )}

        <section className="ac-res-cta mt-8 overflow-hidden rounded-3xl border border-[rgb(var(--accent)/0.28)] bg-[radial-gradient(circle_at_top_left,rgba(var(--accent),0.12),transparent_45%)] p-6 shadow-[0_24px_70px_rgba(var(--accent),0.10)] backdrop-blur-xl sm:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
            <div className="flex justify-center md:justify-start">
              <AtomMark />
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold tracking-tight text-[rgb(var(--accent))]">
                Know a great resource?
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Suggest a book, tool, website, course, or system that helped
                you learn, think, create, or understand something better.
              </p>
            </div>

            <Link
              href="/en/contact"
              className="
                group inline-flex items-center justify-center rounded-2xl
                border border-[rgb(var(--accent)/0.36)]
                bg-[rgb(var(--accent)/0.20)]
                px-7 py-4 text-sm font-semibold text-text shadow-soft
                transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgb(var(--accent)/0.28)]
                hover:shadow-[0_0_30px_rgba(var(--accent),0.18)]
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-[rgb(var(--accent)/0.70)]
                focus-visible:ring-offset-2 focus-visible:ring-offset-bg
              "
            >
              Suggest resource
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}