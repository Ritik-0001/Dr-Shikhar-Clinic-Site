"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowRight, CalendarCheck, ChevronDown, Menu, Phone, X } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { DentalIcon } from "@/components/icons/dental-icons";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { branches } from "@/data/branches";
import { treatmentLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { telUrl, whatsappUrl } from "@/lib/contact";

const before = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Doctors", href: "/doctors" },
] as const;
const after = [
  { label: "Dental Implants", href: "/dental-implants" },
  { label: "Smile Gallery", href: "/smile-gallery" },
  { label: "Contact Us", href: "/contact" },
] as const;
const secondary = [
  { label: "Patient Testimonials", href: "/testimonials" },
  { label: "Technology & Safety", href: "/technology" },
  { label: "Special Programs", href: "/special-programs" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Branch Locator", href: "/branches" },
] as const;

const rowClass =
  "font-display flex min-h-[3.4rem] items-center justify-between rounded-xl px-3 text-[1.45rem] font-semibold leading-none text-primary-900 transition-colors active:bg-surface";

/** Mobile/tablet navigation drawer built on the native <dialog> (focus trap, Esc to close, inert page). */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Safety net: whatever triggers a route change, the drawer closes with it.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const current = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  const row = (item: { label: string; href: string }) => (
    <li key={item.href}>
      <Link href={item.href} aria-current={current(item.href) ? "page" : undefined} className={cn(rowClass, current(item.href) && "text-accent-700")}>
        {item.label}
        {current(item.href) && <span className="size-2 rounded-full bg-accent-600" aria-hidden="true" />}
      </Link>
    </li>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="grid size-11 cursor-pointer place-items-center self-center rounded-full border border-line bg-white text-primary-900 transition-colors hover:bg-surface xl:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="drawer"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close(); // click on the backdrop
        }}
      >
        <div className="flex min-h-full flex-col bg-canvas">
          <div className="flex items-center justify-between border-b border-line bg-white px-5 py-3">
            <Link href="/" aria-label={`${site.name} home`}>
              <Logo height={38} eager />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => dialogRef.current?.close()}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-primary-900 hover:bg-surface"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          {/* any link tap closes the drawer immediately */}
          <nav
            aria-label="Mobile"
            className="flex-1 overflow-y-auto px-3 py-4"
            onClick={(e) => {
              if ((e.target as Element).closest("a")) dialogRef.current?.close();
            }}
          >
            <ul className="grid gap-0.5">
              {before.map(row)}

              <li>
                <details className="group" open={pathname.startsWith("/treatments")}>
                  <summary className={cn(rowClass, "list-none [&::-webkit-details-marker]:hidden", pathname.startsWith("/treatments") && "text-accent-700")}>
                    Treatments
                    <ChevronDown className="size-5 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mb-2 ml-3 grid gap-0.5 border-l-2 border-line pl-2">
                    {treatmentLinks.map((t) => (
                      <li key={t.href}>
                        <Link
                          href={t.href}
                          className={cn(
                            "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-base font-semibold text-ink-soft active:bg-surface",
                            current(t.href) && "bg-surface text-primary-900",
                          )}
                        >
                          <span className="text-primary-800">
                            <DentalIcon name={t.icon} size={24} />
                          </span>
                          {t.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/treatments" className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-base font-bold text-accent-700">
                        All treatments <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              {after.map(row)}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2 border-t border-line px-1 pt-5">
              {secondary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current(item.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-bold text-ink-soft active:bg-surface",
                      current(item.href) && "border-accent-600 text-accent-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-3 border-t border-line bg-white px-5 py-5">
            <ButtonLink href="/appointment" size="lg" className="w-full">
              <CalendarCheck className="size-5" aria-hidden="true" /> Book Appointment
            </ButtonLink>
            <div className="grid grid-cols-2 gap-2">
              {branches.map((b) => (
                <a
                  key={`call-${b.slug}`}
                  href={telUrl(b)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-canvas px-3 text-sm font-bold text-primary-900"
                >
                  <Phone className="size-4 text-accent-600" aria-hidden="true" /> {b.shortName}
                </a>
              ))}
              {branches.map((b) => (
                <a
                  key={`wa-${b.slug}`}
                  href={whatsappUrl(b.phone.whatsapp, `Hello ${site.name}, I'd like to book an appointment.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-whatsapp-deep px-3 text-sm font-bold text-white"
                >
                  <WhatsAppIcon className="size-4" /> {b.shortName}
                </a>
              ))}
            </div>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-1 text-sm font-bold text-muted"
            >
              <InstagramIcon className="size-4" /> @{site.instagram.handle}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
