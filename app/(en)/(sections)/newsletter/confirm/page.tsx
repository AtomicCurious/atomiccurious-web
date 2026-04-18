// app/newsletter/confirm/page.tsx
import { Suspense } from "react"
import ConfirmNewsletterClient from "./ConfirmNewsletterClient"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ConfirmNewsletterClient />
    </Suspense>
  )
}