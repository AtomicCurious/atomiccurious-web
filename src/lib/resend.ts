// lib/resend.ts
import "server-only"
import { Resend } from "resend"

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`[resend] Missing environment variable: ${name}`)
  }
  return value
}

function normalizeAppUrl(url: string) {
  if (!/^https?:\/\//.test(url)) {
    throw new Error(`[resend] APP_URL must include protocol (https://)`)
  }
  return url.replace(/\/+$/, "")
}

export const RESEND_API_KEY = requireEnv("RESEND_API_KEY")
export const RESEND_FROM = requireEnv("RESEND_FROM")

// ✅ NO uses SITE_URL en Netlify: es reservada y apunta a *.netlify.app
export const APP_URL = normalizeAppUrl(requireEnv("APP_URL"))

export const resend = new Resend(RESEND_API_KEY)