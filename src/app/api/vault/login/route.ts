import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { createSessionValue, cookieConfig } from "@/app/vault/lib/auth";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
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

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    const expected = process.env.VAULT_PASSWORD;
    if (!expected) {
      return NextResponse.json({ error: "Vault not configured." }, { status: 500 });
    }

    const passwordBuffer = Buffer.from(password.slice(0, 200));
    const expectedBuffer = Buffer.from(expected);

    const isValid =
      passwordBuffer.length === expectedBuffer.length &&
      timingSafeEqual(passwordBuffer, expectedBuffer);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const sessionValue = createSessionValue();
    const response = NextResponse.json({ success: true });

    response.cookies.set(cookieConfig.name, sessionValue, {
      maxAge: cookieConfig.maxAge,
      path: cookieConfig.path,
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
