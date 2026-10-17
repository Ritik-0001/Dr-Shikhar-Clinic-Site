"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  /** Extra path prefixes that should also mark this link as current (e.g. a dropdown's children) */
  match?: string[];
  className?: string;
  activeClassName?: string;
  children: ReactNode;
};

/** Link that knows whether it points at the current section — the only client piece of the desktop nav. */
export function NavLink({ href, match = [], className, activeClassName, children }: Props) {
  const pathname = usePathname();
  const targets = [href, ...match];
  const active = targets.some((t) => (t === "/" ? pathname === "/" : pathname === t || pathname.startsWith(`${t}/`)));
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn(className, active && activeClassName)}>
      {children}
    </Link>
  );
}
