import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * One shared admin password and a signed, httpOnly session cookie.
 * The password is ADMIN_PASSWORD when set. Until then it is the built-in "admin123" (a temporary choice by the
 * site owner: it is in the source code, so set ADMIN_PASSWORD before connecting real storage).
 */
const COOKIE = "shdc_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // one week

const DEFAULT_PASSWORD = "admin123";
/** True while the built-in password is in use (no ADMIN_PASSWORD set). */
export const usingDefaultPassword = () => !process.env.ADMIN_PASSWORD;
const password = () => process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
export const authConfigured = () => Boolean(password());

const secret = () => process.env.ADMIN_SECRET ?? createHash("sha256").update(`shdc-admin:${password() ?? ""}`).digest("hex");
const sign = (value: string) => createHmac("sha256", secret()).update(value).digest("base64url");

const safeEqual = (a: string, b: string) => {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
};

export const checkPassword = (attempt: string) => {
  const real = password();
  return Boolean(real) && safeEqual(attempt, real!);
};

export async function startSession() {
  const expires = Date.now() + MAX_AGE * 1000;
  const store = await cookies();
  store.set(COOKIE, `${expires}.${sign(String(expires))}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  if (!authConfigured()) return false;
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [expires, mac] = raw.split(".");
  if (!expires || !mac || Number(expires) < Date.now()) return false;
  return safeEqual(mac, sign(expires));
}

/** For admin pages and server actions: send visitors without a valid session to the login screen. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
