import { NextResponse } from "next/server";
import { cookieConfig } from "@/app/vault/lib/auth";

export async function POST() {
  const response = NextResponse.redirect(new URL("/vault", process.env.NEXT_PUBLIC_SITE_URL || "https://brumastudio.dev"));

  response.cookies.set(cookieConfig.name, "", {
    maxAge: 0,
    path: cookieConfig.path,
    httpOnly: cookieConfig.httpOnly,
    secure: cookieConfig.secure,
    sameSite: cookieConfig.sameSite,
  });

  return response;
}
