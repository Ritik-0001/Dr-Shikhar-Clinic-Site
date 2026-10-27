"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Images, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/cn";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "Blog posts", icon: FileText },
  { href: "/admin/photos", label: "Photos", icon: Images },
];

export function AdminNav({ variant }: { variant: "sidebar" | "bar" }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className={cn(variant === "sidebar" ? "grid gap-1" : "flex gap-1 overflow-x-auto")}>
      {items.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center rounded-xl font-bold transition-colors",
              variant === "sidebar" ? "gap-3 px-4 py-3 text-[0.95rem]" : "shrink-0 gap-2 px-3 py-2.5 text-sm",
              active ? "bg-white text-primary-900" : "text-primary-100 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon className="size-[1.1rem]" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
