import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildAutoReplyEmail,
  buildNotificationEmail,
} from "@/lib/email-templates";

// Simple in-memory rate limiter (per-IP, resets on deploy)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  "Bruma Studio <contacto@mail.brumastudio.dev>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contacto@brumastudio.dev";
const BCC_EMAILS = (
  process.env.CONTACT_BCC_EMAIL ||
  "bojorquez.dg@gmail.com,lc.aracelyrivera@gmail.com"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

function sanitize(input: string, maxLen = 2000): string {
  return input.trim().slice(0, maxLen);
}

const ALLOWED_COUNTRY_CODES = new Set(["+52", "+1"]);
const ALLOWED_CONTACT_PREFS = new Set(["phone", "email", "whatsapp"]);

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const firstName = sanitize(body.firstName || "", 100);
    const lastName = sanitize(body.lastName || "", 100);
    const email = sanitize(body.email || "", 320).toLowerCase();
    const countryCodeRaw = sanitize(body.countryCode || "", 6);
    const phoneRaw = sanitize(body.phone || "", 40);
    const contactPreferenceRaw = sanitize(body.contactPreference || "", 20);
    const projectType = sanitize(body.projectType || "", 50);
    const message = sanitize(body.message || "");
    const locale = body.locale === "es" ? "es" : "en";

    // Validate required text fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Country code
    if (!ALLOWED_COUNTRY_CODES.has(countryCodeRaw)) {
      return NextResponse.json(
        { error: "Please select a valid country code." },
        { status: 400 }
      );
    }

    // Phone: strip non-digits, require exactly 10
    const phoneDigits = phoneRaw.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      return NextResponse.json(
        { error: "Phone number must be 10 digits." },
        { status: 400 }
      );
    }

    // Contact preference
    if (!ALLOWED_CONTACT_PREFS.has(contactPreferenceRaw)) {
      return NextResponse.json(
        { error: "Please select a preferred contact method." },
        { status: 400 }
      );
    }
    const contactPreference = contactPreferenceRaw as
      | "phone"
      | "email"
      | "whatsapp";

    // Spam check: reject if message contains excessive URLs
    const urlCount = (message.match(/https?:\/\//g) || []).length;
    if (urlCount > 3) {
      return NextResponse.json(
        { error: "Message flagged as spam." },
        { status: 400 }
      );
    }

    // Send via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const notification = buildNotificationEmail({
      firstName,
      lastName,
      email,
      countryCode: countryCodeRaw,
      phone: phoneDigits,
      contactPreference,
      projectType,
      message,
      locale,
    });

    const notificationResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      bcc: BCC_EMAILS,
      replyTo: email,
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
    });

    if (notificationResult.error) {
      console.error("[contact] notification send failed:", notificationResult.error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again later." },
        { status: 502 }
      );
    }

    // Auto-reply to submitter (best-effort — failure here doesn't fail the request)
    const autoReply = buildAutoReplyEmail({ name: firstName, locale });
    const autoReplyResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: TO_EMAIL,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    });

    if (autoReplyResult.error) {
      console.warn("[contact] auto-reply send failed:", autoReplyResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
