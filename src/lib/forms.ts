import type { Branch } from "@/data/branches";
import { site } from "@/data/site";
import { whatsappUrl } from "./contact";

/** Indian mobile number, with optional +91 / 91 / leading 0. Spaces and dashes are ignored. */
const PHONE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/;
export const cleanPhone = (value: string) => value.replace(/[\s\-().]/g, "");
export const isValidPhone = (value: string) => PHONE_RE.test(cleanPhone(value));

/** Today's date in India as YYYY-MM-DD (used as the minimum for date pickers). */
export const todayIST = () => new Intl.DateTimeFormat("en-CA", { timeZone: site.hours.timeZone }).format(new Date());

/** The clinic is closed on days that aren't in `site.hours.openDays` (Sunday). */
export function isClosedDay(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return !(site.hours.openDays as readonly number[]).includes(weekday);
}

export const formatLongDate = (isoDate: string) => {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
};

export type Errors = Record<string, string>;

/** Builds the WhatsApp deep link for a branch with a pre-filled message. */
export const messageLink = (branch: Branch, lines: string[]) =>
  whatsappUrl(branch.phone.whatsapp, lines.filter((l) => l !== undefined).join("\n"));

export const greeting = (branch: Branch) => `Hello ${site.name} (${branch.shortName}),`;
