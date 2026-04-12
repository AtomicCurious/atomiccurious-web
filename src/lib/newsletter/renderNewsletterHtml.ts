// src/lib/newsletter/renderNewsletterHtml.ts

import type { NewsletterEdition } from "@/lib/newsletter/types"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

type RenderNewsletterHtmlOptions = {
  unsubscribeUrl?: string
}

export function renderNewsletterHtml(
  input: NewsletterEdition,
  options: RenderNewsletterHtmlOptions = {}
) {
  const title = escapeHtml(input.title)
  const intro = escapeHtml(input.intro)
  const preheader = escapeHtml(input.preheader ?? "")
  const unsubscribeUrl = options.unsubscribeUrl
    ? escapeHtml(options.unsubscribeUrl)
    : null

  const sections = input.sections
    .map(
      (section) => `
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <h2 style="margin:0 0 8px 0;font-size:20px;line-height:1.3;color:#ffffff;font-weight:700;">
              ${escapeHtml(section.title)}
            </h2>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#d1d5db;">
              ${escapeHtml(section.body)}
            </p>
          </td>
        </tr>
      `
    )
    .join("")

  const cta = input.cta
    ? `
        <tr>
          <td style="padding:8px 32px 32px 32px;text-align:center;">
            <a
              href="${escapeHtml(input.cta.href)}"
              style="display:inline-block;background:#ffffff;color:#0a0a0f;text-decoration:none;font-size:15px;font-weight:700;padding:14px 24px;border-radius:999px;"
            >
              ${escapeHtml(input.cta.label)}
            </a>
          </td>
        </tr>
      `
    : ""

  const unsubscribeBlock = unsubscribeUrl
    ? `
        <p style="margin:12px 0 0 0;font-size:12px;line-height:1.7;color:#6b7280;">
          ${
            input.locale === "es"
              ? `Si ya no quieres recibir estos correos, puedes <a href="${unsubscribeUrl}" style="color:#93c5fd;text-decoration:underline;">darte de baja aquí</a>.`
              : `If you no longer want to receive these emails, you can <a href="${unsubscribeUrl}" style="color:#93c5fd;text-decoration:underline;">unsubscribe here</a>.`
          }
        </p>
      `
    : ""

  return `
<!DOCTYPE html>
<html lang="${input.locale}">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(input.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0a0a0f;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      ${preheader}
    </div>

    <div style="background-color:#0a0a0f;padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="padding:40px 32px 20px 32px;text-align:center;">
            <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#9ca3af;margin-bottom:12px;">
              AtomicCurious
            </div>
            <h1 style="margin:0;font-size:30px;line-height:1.2;color:#ffffff;font-weight:700;">
              ${title}
            </h1>
            <p style="margin:16px 0 0 0;font-size:16px;line-height:1.7;color:#d1d5db;">
              ${intro}
            </p>
          </td>
        </tr>

        ${sections}
        ${cta}

        <tr>
          <td style="padding:32px;">
            <div style="border-top:1px solid #1f2937;padding-top:20px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.7;color:#6b7280;">
                © AtomicCurious
              </p>
              <p style="margin:8px 0 0 0;font-size:12px;line-height:1.7;color:#6b7280;">
                ${
                  input.locale === "es"
                    ? "Ideas, herramientas y descubrimientos."
                    : "Ideas, tools, and discoveries."
                }
              </p>
              ${unsubscribeBlock}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `.trim()
}