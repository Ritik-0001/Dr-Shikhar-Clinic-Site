import { site } from "@/data/site";
import type { Branch } from "@/data/branches";

/** wa.me deep link. `phone` must be digits only, with country code (e.g. 919265616569). */
export function whatsappUrl(phone: string, message?: string) {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telUrl = (branch: Branch) => `tel:${branch.phone.tel}`;

export const mailtoUrl = (subject: string, body: string) =>
  site.email ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : null;

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
