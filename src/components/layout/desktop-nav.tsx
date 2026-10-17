"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DentalIcon } from "@/components/icons/dental-icons";
import { ButtonLink } from "@/components/ui/button";
import type { NavItem } from "@/data/navigation";
import type { DentalIconName } from "@/data/treatments";
import { cn } from "@/lib/cn";

type TreatmentLink = { label: string; href: string; tagline: string; icon: DentalIconName };

const isActive = (pathname: string, targets: string[]) => targets.some((t) => pathname === t || pathname.startsWith(`${t}/`));

/**
 * Desktop navigation with dropdowns. The menus are driven by state (not CSS :hover) so they always close when a
 * link is clicked, the route changes, Escape is pressed or the pointer leaves, and never linger over the next page.
 */
export function DesktopNav({ items, treatments }: { items: NavItem[]; treatments: TreatmentLink[] }) {
  const pathname = usePathname();
  // The open menu is remembered together with the path it was opened on, so changing route closes it automatically.
  const [opened, setOpened] = useState<{ path: string; key: string } | null>(null);
  const open = opened && opened.path === pathname ? opened.key : null;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openMenu = (key: string) => {
    clearTimeout(timer.current);
    setOpened({ path: pathname, key });
  };
  const closeMenu = (delay = 0) => {
    clearTimeout(timer.current);
    if (delay === 0) setOpened(null);
    else timer.current = setTimeout(() => setOpened(null), delay);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpened(null);
    const onPointer = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.("[data-nav-root]")) setOpened(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <nav aria-label="Primary" data-nav-root className="hidden h-full xl:block">
      <ul className="flex h-full items-stretch gap-1">
        {items.map((item) => {
          const hasMenu = Boolean(item.children || item.mega);
          const isOpen = open === item.label;
          const active = isActive(pathname, [item.href, ...(item.children?.map((c) => c.href) ?? [])]);
          const panelId = `menu-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
          return (
            <li
              key={item.label}
              className={cn("flex items-center", item.children && "relative")}
              onPointerEnter={(e) => hasMenu && e.pointerType === "mouse" && openMenu(item.label)}
              onPointerLeave={(e) => hasMenu && e.pointerType === "mouse" && closeMenu(140)}
              onBlur={(e) => hasMenu && !e.currentTarget.contains(e.relatedTarget as Node | null) && closeMenu()}
            >
              <div className="flex items-center">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => closeMenu()}
                  className={cn(
                    "relative whitespace-nowrap px-3 py-2 text-[0.95rem] font-semibold transition-colors",
                    "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent-600 after:transition-transform after:duration-300",
                    "hover:text-primary-900 hover:after:scale-x-100",
                    active ? "text-primary-900 after:scale-x-100" : "text-ink-soft",
                    hasMenu && "pr-1",
                  )}
                >
                  {item.label}
                </Link>
                {hasMenu && (
                  <button
                    type="button"
                    aria-label={`${isOpen ? "Close" : "Open"} the ${item.label} menu`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => (isOpen ? closeMenu() : openMenu(item.label))}
                    className="grid size-8 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-primary-900"
                  >
                    <ChevronDown className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Standard dropdown */}
              {item.children && (
                <div
                  id={panelId}
                  inert={!isOpen}
                  className={cn(
                    "absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-1 transition-[opacity,translate] duration-200",
                    isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0",
                  )}
                >
                  <ul className="rounded-2xl border border-line bg-white p-2 shadow-lift">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => closeMenu()} className="block rounded-xl px-4 py-3 transition-colors hover:bg-surface">
                          <span className="block text-[0.95rem] font-bold text-primary-900">{child.label}</span>
                          {child.description && <span className="mt-0.5 block text-sm leading-snug text-muted">{child.description}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Treatments mega menu: a full-width solid sheet directly under the header */}
              {item.mega && (
                <div
                  id={panelId}
                  inert={!isOpen}
                  className={cn(
                    "absolute inset-x-0 top-full z-50 border-b border-line bg-white shadow-lift transition-[opacity,translate] duration-200",
                    isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
                  )}
                >
                  <div className="container-page grid gap-10 py-9 lg:grid-cols-[17rem_1fr]">
                    <div>
                      <p className="eyebrow">Our treatments</p>
                      <p className="font-display mt-3 text-[1.9rem] leading-[1.1] text-primary-900">Complete care for every smile</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">Eleven dental specialities, from check-ups to implants and clear aligners.</p>
                      <ButtonLink href="/treatments" variant="secondary" size="sm" className="mt-5" onClick={() => closeMenu()}>
                        View all treatments <ArrowRight className="size-4" aria-hidden="true" />
                      </ButtonLink>
                    </div>
                    <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2 xl:grid-cols-3">
                      {treatments.map((t) => (
                        <li key={t.href}>
                          <Link href={t.href} onClick={() => closeMenu()} className="flex items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-surface">
                            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-50 text-primary-800">
                              <DentalIcon name={t.icon} size={28} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[0.95rem] font-bold leading-snug text-primary-900">{t.label}</span>
                              <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{t.tagline}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
