//\es\(sections)\newsletter\confirm\page.tsx
import { Suspense } from "react"
import ConfirmNewsletterEsClient from "./ConfirmNewsletterEsClient"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ConfirmNewsletterEsClient />
    </Suspense>
  )
}