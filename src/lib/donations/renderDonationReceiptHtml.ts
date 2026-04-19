// src/lib/donations/renderDonationReceiptHtml.ts

type ReceiptInput = {
  amount: string
  supportId: string
  date: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export function renderDonationReceiptHtml({
  amount,
  supportId,
  date,
}: ReceiptInput) {
  const safeAmount = escapeHtml(amount)
  const safeSupportId = escapeHtml(supportId)
  const safeDate = escapeHtml(date)

  return `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Comprobante | AtomicCurious</title>
  </head>
  <body style="margin:0;padding:0;background-color:#05070b;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;">
      Tu aporte quedó registrado correctamente en AtomicCurious.
    </div>

    <div style="background:
      radial-gradient(circle at 18% 14%, rgba(52,211,153,0.10), transparent 32%),
      radial-gradient(circle at 82% 12%, rgba(34,211,238,0.10), transparent 30%),
      radial-gradient(circle at 50% 88%, rgba(251,146,60,0.08), transparent 30%),
      linear-gradient(180deg,#05070b 0%,#0a0f16 100%);
      padding:32px 14px;
    ">
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        border="0"
        width="100%"
        style="max-width:620px;margin:0 auto;"
      >
        <tr>
          <td>
            <table
              role="presentation"
              cellpadding="0"
              cellspacing="0"
              border="0"
              width="100%"
              style="
                background:
                  linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018));
                border:1px solid rgba(255,255,255,0.10);
                border-radius:26px;
                overflow:hidden;
                box-shadow:
                  0 24px 80px rgba(0,0,0,0.38),
                  inset 0 1px 0 rgba(255,255,255,0.05);
              "
            >
              <tr>
                <td style="padding:0;">
                  <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(52,211,153,0.50),rgba(34,211,238,0.46),rgba(251,146,60,0.42),transparent);"></div>
                </td>
              </tr>

              <tr>
                <td style="padding:30px 30px 18px 30px;">
                  <div
                    style="
                      display:inline-block;
                      padding:10px 16px;
                      border-radius:999px;
                      border:1px solid rgba(255,255,255,0.10);
                      background:rgba(255,255,255,0.04);
                      color:rgba(255,255,255,0.78);
                      font-size:11px;
                      line-height:1;
                      letter-spacing:2.4px;
                      font-weight:700;
                      text-transform:uppercase;
                    "
                  >
                    Universo AtomicCurious
                  </div>

                  <h1
                    style="
                      margin:22px 0 12px 0;
                      font-size:34px;
                      line-height:1.12;
                      color:#ffffff;
                      font-weight:700;
                      letter-spacing:-0.03em;
                    "
                  >
                    Aporte registrado
                  </h1>

                  <p
                    style="
                      margin:0;
                      max-width:500px;
                      font-size:17px;
                      line-height:1.75;
                      color:#d4d8df;
                    "
                  >
                    Tu aporte quedó registrado correctamente. Gracias por ayudar a sostener
                    este universo de ideas, exploraciones y recursos diseñados con intención.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:10px 30px 0 30px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td valign="top" style="padding:0 10px 10px 0;">
                        <table
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                          width="100%"
                          style="
                            border:1px solid rgba(255,255,255,0.10);
                            border-radius:22px;
                            background:rgba(255,255,255,0.035);
                          "
                        >
                          <tr>
                            <td style="padding:18px 20px;">
                              <div style="font-size:11px;line-height:1.2;color:#9aa3b2;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                                Registro
                              </div>
                              <div style="margin-top:10px;font-size:26px;line-height:1.2;color:#ffffff;font-weight:700;letter-spacing:-0.02em;">
                                ${safeSupportId}
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td valign="top" style="padding:0;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                          <tr>
                            <td valign="top" width="50%" style="padding:0 10px 10px 0;">
                              <table
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                width="100%"
                                style="
                                  border:1px solid rgba(255,255,255,0.10);
                                  border-radius:22px;
                                  background:rgba(255,255,255,0.03);
                                "
                              >
                                <tr>
                                  <td style="padding:18px 20px;">
                                    <div style="font-size:11px;line-height:1.2;color:#9aa3b2;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                                      Aporte
                                    </div>
                                    <div style="margin-top:10px;font-size:28px;line-height:1.15;color:#ffffff;font-weight:700;letter-spacing:-0.03em;">
                                      ${safeAmount}
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>

                            <td valign="top" width="50%" style="padding:0 0 10px 10px;">
                              <table
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                width="100%"
                                style="
                                  border:1px solid rgba(255,255,255,0.10);
                                  border-radius:22px;
                                  background:rgba(255,255,255,0.03);
                                "
                              >
                                <tr>
                                  <td style="padding:18px 20px;">
                                    <div style="font-size:11px;line-height:1.2;color:#9aa3b2;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                                      Fecha
                                    </div>
                                    <div style="margin-top:10px;font-size:20px;line-height:1.35;color:#ffffff;font-weight:600;letter-spacing:-0.02em;">
                                      ${safeDate}
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td colspan="2" style="padding:0;">
                              <table
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                                width="100%"
                                style="
                                  border:1px solid rgba(255,255,255,0.10);
                                  border-radius:22px;
                                  background:rgba(255,255,255,0.025);
                                "
                              >
                                <tr>
                                  <td style="padding:22px 20px;">
                                    <div style="font-size:11px;line-height:1.2;color:#9aa3b2;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                                      Nota
                                    </div>
                                    <p
                                      style="
                                        margin:12px 0 0 0;
                                        font-size:16px;
                                        line-height:1.9;
                                        color:#d3d8df;
                                      "
                                    >
                                      Gracias por sostener este universo. Cada aporte ayuda a convertir
                                      curiosidad en nuevas piezas, mejores recursos y exploraciones hechas
                                      con más intención y más curiosidad.
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding:22px 30px 30px 30px;">
                  <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent);margin-bottom:18px;"></div>

                  <p style="margin:0;font-size:12px;line-height:1.8;color:#7f8795;">
                    AtomicCurious
                  </p>
                  <p style="margin:8px 0 0 0;font-size:12px;line-height:1.8;color:#7f8795;">
                    Ideas, herramientas y descubrimientos.
                  </p>
                  <p style="margin:8px 0 0 0;font-size:12px;line-height:1.8;color:#7f8795;">
                    <a href="https://atomiccurious.com" style="color:#9fdfff;text-decoration:underline;">atomiccurious.com</a>
                  </p>
                </td>
              </tr>
            </table>

            <p
              style="
                margin:16px 0 0 0;
                text-align:center;
                font-size:11px;
                line-height:1.7;
                color:#667080;
              "
            >
              Este correo confirma el registro de tu aporte en AtomicCurious.
            </p>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `.trim()
}