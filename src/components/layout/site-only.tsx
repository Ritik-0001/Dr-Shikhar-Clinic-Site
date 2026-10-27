"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders the public-site chrome (header, footer, contact buttons) everywhere except the admin panel, which has its own. */
export function SiteOnly({ children }: { children: ReactNode }) {
  return usePathname().startsWith("/admin") ? null : children;
}
