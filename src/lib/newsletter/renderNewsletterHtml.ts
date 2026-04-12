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
  const preheader = escapeHtml(input.preheader ?? input.intro ?? "")
  const unsubscribeUrl = options.unsubscribeUrl
    ? escapeHtml(options.unsubscribeUrl)
    : null

  const sections = input.sections
    .map(
      (section) => `
        <tr>
          <td style="padding:0 28px 22px 28px;">
            <h2 style="margin:0 0 8px 0;font-size:19px;line-height:1.35;color:#ffffff;font-weight:700;">
              ${escapeHtml(section.title)}
            </h2>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#d1d5db;white-space:pre-line;">
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
          <td style="padding:4px 28px 28px 28px;text-align:left;">
            <a
              href="${escapeHtml(input.cta.href)}"
              style="display:inline-block;background:#f3f4f6;color:#111827;text-decoration:none;font-size:14px;font-weight:700;padding:12px 18px;border-radius:999px;"
            >
              ${escapeHtml(input.cta.label)}
            </a>
          </td>
        </tr>
      `
    : ""

  const whyReceivingThis =
    input.locale === "es"
      ? `
        <p style="margin:12px 0 0 0;font-size:12px;line-height:1.7;color:#6b7280;">
          Recibes este correo porque te suscribiste a AtomicCurious en nuestra web.
        </p>
      `
      : `
        <p style="margin:12px 0 0 0;font-size:12px;line-height:1.7;color:#6b7280;">
          You are receiving this email because you subscribed to AtomicCurious on our website.
        </p>
      `

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

  const websiteBlock =
    input.locale === "es"
      ? `
        <p style="margin:12px 0 0 0;font-size:12px;line-height:1.7;color:#6b7280;">
          Sitio web:
          <a href="https://atomiccurious.com" style="color:#93c5fd;text-decoration:underline;">
            atomiccurious.com
          </a>
        </p>
      `
      : `
        <p style="margin:12px 0 0 0;font-size:12px;line-height:1.7;color:#6b7280;">
          Website:
          <a href="https://atomiccurious.com" style="color:#93c5fd;text-decoration:underline;">
            atomiccurious.com
          </a>
        </p>
      `

  return `
<!DOCTYPE html>
<html lang="${input.locale}">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(input.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0b0d12;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;">
      ${preheader}
    </div>

    <div style="background-color:#0b0d12;padding:24px 12px;">
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="100%"
        style="max-width:600px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:16px;overflow:hidden;"
      >
        <tr>
          <td style="padding:32px 28px 16px 28px;text-align:left;">
            <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;margin-bottom:10px;">
              AtomicCurious
            </div>

            <h1 style="margin:0;font-size:28px;line-height:1.25;color:#ffffff;font-weight:700;">
              ${title}
            </h1>

            <p style="margin:14px 0 0 0;font-size:16px;line-height:1.75;color:#d1d5db;">
              ${intro}
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 28px 20px 28px;">
            <div style="height:1px;background:#1f2937;"></div>
          </td>
        </tr>

        ${sections}
        ${cta}

        <tr>
          <td style="padding:28px;">
            <div style="border-top:1px solid #1f2937;padding-top:18px;text-align:left;">
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

              ${whyReceivingThis}
              ${websiteBlock}
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