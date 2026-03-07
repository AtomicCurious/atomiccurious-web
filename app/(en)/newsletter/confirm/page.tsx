import ConfirmNewsletterClient from "./ConfirmNewsletterClient"

export const dynamic = "force-dynamic"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  const token = (params?.token || "").trim()

  return <ConfirmNewsletterClient token={token} />
}