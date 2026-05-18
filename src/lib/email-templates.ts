// Branded email templates for transactional emails.
//
// Designed for max email-client compatibility:
// - Table-based layout (Outlook safe)
// - Inline styles everywhere (Gmail strips <style>, Outlook ignores parts of it)
// - System serif fallbacks (Cinzel won't load in most clients, so Georgia stands in)
// - Width capped at 600px (email standard)
// - Plain-text alternative included

const COLOR = {
  bg: "#0D0D12",
  surface: "#1A1425",
  border: "#2A2833",
  gold: "#C9A669",
  goldLight: "#E0D0A0",
  text: "#E8E2D6",
  muted: "#857F98",
} as const;

const SITE_URL = "https://brumastudio.dev";

const DISPLAY_FONT =
  "'Cinzel', Georgia, 'Times New Roman', Times, serif";
const BODY_FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(input: string): string {
  return escapeHtml(input).replace(/\r?\n/g, "<br>");
}

function layout(args: {
  preheader: string;
  eyebrow: string;
  body: string;
  footnote: string;
}): string {
  const { preheader, eyebrow, body, footnote } = args;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark only" />
<meta name="supported-color-schemes" content="dark only" />
<title>Bruma Studio</title>
</head>
<body style="margin:0;padding:0;background-color:${COLOR.bg};color:${COLOR.text};font-family:${BODY_FONT};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;visibility:hidden;mso-hide:all;">
${escapeHtml(preheader)}
</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${COLOR.bg};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background-color:${COLOR.surface};border:1px solid ${COLOR.border};border-radius:8px;">
        <!-- Header -->
        <tr>
          <td style="padding:32px 32px 24px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td style="vertical-align:middle;width:48px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td width="40" height="40" align="center" valign="middle" style="width:40px;height:40px;border:1.5px solid ${COLOR.gold};border-radius:6px;background-color:${COLOR.bg};font-family:${DISPLAY_FONT};color:${COLOR.gold};font-size:20px;font-weight:600;letter-spacing:0.02em;line-height:40px;text-align:center;">
                        B
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align:middle;padding-left:14px;">
                  <div style="font-family:${DISPLAY_FONT};color:${COLOR.gold};font-size:16px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;line-height:1.2;">
                    Bruma Studio
                  </div>
                  <div style="font-family:${BODY_FONT};color:${COLOR.muted};font-size:11px;letter-spacing:0.15em;text-transform:uppercase;margin-top:4px;">
                    Dark arts of digital craft
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Gold divider -->
        <tr>
          <td style="padding:0 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td height="1" style="height:1px;line-height:1px;background-color:${COLOR.gold};opacity:0.4;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Eyebrow -->
        <tr>
          <td style="padding:28px 32px 0;">
            <div style="font-family:${BODY_FONT};color:${COLOR.muted};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;">
              ${escapeHtml(eyebrow)}
            </div>
          </td>
        </tr>

        <!-- Body content -->
        <tr>
          <td style="padding:12px 32px 32px;">
            ${body}
          </td>
        </tr>

        <!-- Footer divider -->
        <tr>
          <td style="padding:0 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td height="1" style="height:1px;line-height:1px;background-color:${COLOR.border};">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px 28px;">
            <div style="font-family:${BODY_FONT};color:${COLOR.muted};font-size:12px;line-height:1.6;">
              ${footnote}
            </div>
            <div style="margin-top:12px;font-family:${BODY_FONT};color:${COLOR.muted};font-size:11px;letter-spacing:0.1em;">
              <a href="${SITE_URL}" style="color:${COLOR.gold};text-decoration:none;">brumastudio.dev</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

const CONTACT_PREF_LABEL: Record<string, string> = {
  phone: "Phone",
  email: "Email",
  whatsapp: "WhatsApp",
};

function formatPhone(countryCode: string, digits: string): string {
  if (digits.length !== 10) return `${countryCode} ${digits}`;
  if (countryCode === "+1") {
    return `${countryCode} (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (countryCode === "+52") {
    return `${countryCode} ${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
  }
  return `${countryCode} ${digits}`;
}

export function buildNotificationEmail(args: {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  contactPreference: "phone" | "email" | "whatsapp";
  projectType: string;
  message: string;
  locale: string;
}): { subject: string; text: string; html: string } {
  const {
    firstName,
    lastName,
    email,
    countryCode,
    phone,
    contactPreference,
    projectType,
    message,
    locale,
  } = args;

  const fullName = `${firstName} ${lastName}`.trim();
  const formattedPhone = formatPhone(countryCode, phone);
  const prefLabel = CONTACT_PREF_LABEL[contactPreference] || contactPreference;
  const subject = `New inquiry from ${fullName}`;

  // WhatsApp / tel links use E.164 (no spaces or punctuation)
  const e164 = `${countryCode.replace(/\D/g, "")}${phone}`;
  const whatsappUrl = `https://wa.me/${e164}`;
  const telUrl = `tel:+${e164}`;

  const text = [
    `New inquiry from ${fullName}`,
    "",
    `Name:               ${fullName}`,
    `Email:              ${email}`,
    `Phone:              ${formattedPhone}`,
    `Preferred contact:  ${prefLabel}`,
    `Project type:       ${projectType || "—"}`,
    `Locale:             ${locale.toUpperCase()}`,
    "",
    "Message:",
    "—".repeat(40),
    message,
    "—".repeat(40),
    "",
    "Reply directly to this email to respond.",
    "Bruma Studio — brumastudio.dev",
  ].join("\n");

  const detailRow = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 16px 6px 0;font-family:${BODY_FONT};color:${COLOR.muted};font-size:13px;letter-spacing:0.1em;text-transform:uppercase;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:6px 0;font-family:${BODY_FONT};color:${COLOR.text};font-size:15px;vertical-align:top;">${value}</td>
    </tr>`;

  const phoneCell = (() => {
    if (contactPreference === "whatsapp") {
      return `<a href="${whatsappUrl}" style="color:${COLOR.gold};text-decoration:none;">${escapeHtml(formattedPhone)}</a> <span style="color:${COLOR.muted};font-size:12px;">(WhatsApp)</span>`;
    }
    return `<a href="${telUrl}" style="color:${COLOR.gold};text-decoration:none;">${escapeHtml(formattedPhone)}</a>`;
  })();

  const prefBadge = `<span style="display:inline-block;padding:3px 10px;border:1px solid ${COLOR.gold};border-radius:999px;color:${COLOR.gold};font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">${escapeHtml(prefLabel)}</span>`;

  const body = `
    <h1 style="margin:8px 0 18px;font-family:${DISPLAY_FONT};color:${COLOR.gold};font-size:24px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;line-height:1.2;">
      New inquiry
    </h1>
    <p style="margin:0 0 24px;font-family:${BODY_FONT};color:${COLOR.text};font-size:16px;line-height:1.6;">
      <strong style="color:${COLOR.goldLight};font-weight:600;">${escapeHtml(fullName)}</strong> just submitted the contact form.
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
      ${detailRow("Email", `<a href="mailto:${escapeHtml(email)}" style="color:${COLOR.gold};text-decoration:none;">${escapeHtml(email)}</a>`)}
      ${detailRow("Phone", phoneCell)}
      ${detailRow("Preferred contact", prefBadge)}
      ${detailRow("Project type", escapeHtml(projectType) || "—")}
      ${detailRow("Locale", escapeHtml(locale).toUpperCase())}
    </table>

    <div style="font-family:${BODY_FONT};color:${COLOR.muted};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin-bottom:10px;">
      Message
    </div>
    <div style="padding:18px 20px;background-color:${COLOR.bg};border-left:2px solid ${COLOR.gold};border-radius:4px;font-family:${BODY_FONT};color:${COLOR.text};font-size:15px;line-height:1.7;">
      ${nl2br(message)}
    </div>
  `;

  const html = layout({
    preheader: `${fullName} submitted the contact form. Preferred: ${prefLabel}.`,
    eyebrow: "New inquiry",
    body,
    footnote: `Reply directly to this email to respond — the sender's address is set as Reply-To.`,
  });

  return { subject, text, html };
}

export function buildAutoReplyEmail(args: {
  name: string;
  locale: string;
}): { subject: string; text: string; html: string } {
  const { name, locale } = args;
  const isEs = locale === "es";

  const subject = isEs
    ? "Recibimos tu mensaje — Bruma Studio"
    : "We received your message — Bruma Studio";

  const eyebrow = isEs ? "Mensaje recibido" : "Message received";

  const heading = isEs ? "Gracias por escribirnos" : "Thanks for reaching out";

  const greeting = isEs ? `Hola ${name},` : `Hi ${name},`;

  const bodyParagraph = isEs
    ? "Recibimos tu mensaje y te responderemos en un plazo de 24 horas en días hábiles. Si tu proyecto requiere atención inmediata, también puedes responder directamente a este correo."
    : "We've received your message and will get back to you within 24 hours on business days. If your project needs more urgent attention, feel free to reply directly to this email.";

  const closing = isEs
    ? "Mientras tanto, no dudes en explorar nuestros trabajos en"
    : "In the meantime, feel free to explore our work at";

  const team = isEs
    ? "— El equipo de Bruma Studio"
    : "— The Bruma Studio team";

  const text = [
    greeting,
    "",
    bodyParagraph,
    "",
    `${closing} ${SITE_URL}`,
    "",
    team,
  ].join("\n");

  const body = `
    <h1 style="margin:8px 0 20px;font-family:${DISPLAY_FONT};color:${COLOR.gold};font-size:26px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;line-height:1.2;">
      ${escapeHtml(heading)}
    </h1>
    <p style="margin:0 0 18px;font-family:${BODY_FONT};color:${COLOR.text};font-size:16px;line-height:1.7;">
      ${escapeHtml(greeting)}
    </p>
    <p style="margin:0 0 22px;font-family:${BODY_FONT};color:${COLOR.text};font-size:16px;line-height:1.7;">
      ${escapeHtml(bodyParagraph)}
    </p>
    <p style="margin:0 0 28px;font-family:${BODY_FONT};color:${COLOR.text};font-size:16px;line-height:1.7;">
      ${escapeHtml(closing)} <a href="${SITE_URL}" style="color:${COLOR.gold};text-decoration:none;border-bottom:1px solid ${COLOR.gold};">brumastudio.dev</a>.
    </p>

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:8px;">
      <tr>
        <td style="font-family:${BODY_FONT};color:${COLOR.goldLight};font-size:14px;line-height:1.6;">
          ${escapeHtml(team)}
        </td>
      </tr>
    </table>
  `;

  const footnote = isEs
    ? "Este es un acuse de recibo automático. Una persona te responderá pronto."
    : "This is an automatic confirmation. A human will reply soon.";

  const html = layout({
    preheader: isEs
      ? "Recibimos tu mensaje. Te responderemos pronto."
      : "We've received your message. We'll get back to you soon.",
    eyebrow,
    body,
    footnote,
  });

  return { subject, text, html };
}
