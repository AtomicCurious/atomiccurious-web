// app/(en)/(sections)/resources/page.tsx
import { Suspense } from "react"
import ResourcesClient from "./resources-client"
import ResourcesComingSoon from "./resources-coming-soon"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Resources | AtomicCurious",
  description:
    "Curated books, apps, websites, courses, and tools to expand your perspective, think better, and keep curiosity alive.",
}

const RESOURCES_LAUNCH_DATE = new Date("2026-07-18T00:00:00-04:00")

export default function ResourcesPage() {
  const isComingSoon = new Date() < RESOURCES_LAUNCH_DATE

  if (isComingSoon) {
    return <ResourcesComingSoon />
  }

  return (
    <Suspense fallback={null}>
      <ResourcesClient />
    </Suspense>
  )
}