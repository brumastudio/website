import { NextResponse } from "next/server";

// Simple in-memory rate limiter (per-IP, resets on deploy)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // requests per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

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

function sanitize(input: string): string {
  return input.trim().slice(0, 2000);
}

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
    const name = sanitize(body.name || "");
    const email = sanitize(body.email || "").toLowerCase();
    const projectType = sanitize(body.projectType || "");
    const budget = sanitize(body.budget || "");
    const message = sanitize(body.message || "");

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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

    // Honeypot / spam check: reject if message contains excessive URLs
    const urlCount = (message.match(/https?:\/\//g) || []).length;
    if (urlCount > 3) {
      return NextResponse.json(
        { error: "Message flagged as spam." },
        { status: 400 }
      );
    }

    // TODO: Integrate with Resend
    // await resend.emails.send({ ... })

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
