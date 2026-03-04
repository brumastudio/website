import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "vault_session";
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

function getSecret(): string {
  const password = process.env.VAULT_PASSWORD;
  if (!password) throw new Error("VAULT_PASSWORD is not set");
  return password;
}

export function createSessionValue(): string {
  const timestamp = Date.now().toString();
  const hmac = createHmac("sha256", getSecret()).update(timestamp).digest("hex");
  return `${timestamp}.${hmac}`;
}

export function verifySessionValue(value: string): boolean {
  const [timestamp, hmac] = value.split(".");
  if (!timestamp || !hmac) return false;

  // Check timestamp is within 7 days
  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age < 0 || age > MAX_AGE * 1000) return false;

  // Verify HMAC
  const expected = createHmac("sha256", getSecret()).update(timestamp).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(hmac, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);
    if (!session?.value) return false;
    return verifySessionValue(session.value);
  } catch {
    return false;
  }
}

export const cookieConfig = {
  name: COOKIE_NAME,
  maxAge: MAX_AGE,
  path: "/vault",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
};
