import "server-only"
import { Resend } from "resend"

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`[resend] Missing environment variable: ${name}`)
  }
  return value
}

function normalizeSiteUrl(url: string) {
  if (!/^https?:\/\//.test(url)) {
    throw new Error(`[resend] SITE_URL must include protocol (https://)`)
  }
  return url.replace(/\/+$/, "")
}

export const RESEND_API_KEY = requireEnv("RESEND_API_KEY")
export const RESEND_FROM = requireEnv("RESEND_FROM")
export const SITE_URL = normalizeSiteUrl(requireEnv("SITE_URL"))

export const resend = new Resend(RESEND_API_KEY)