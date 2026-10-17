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
import { telUrl, whatsappUrl } from "@/lib/contact";

const pages = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Doctors", href: "/doctors" },
] as const;
const morePages = [
  { label: "Dental Implants", href: "/dental-implants" },
  { label: "Smile Gallery", href: "/smile-gallery" },
  { label: "Patient Testimonials", href: "/testimonials" },
  { label: "Special Programs", href: "/special-programs" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Branch Locator", href: "/branches" },
  { label: "Contact Us", href: "/contact" },
] as const;

const rowClass =
  "flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-lg font-semibold text-primary-900 transition-colors hover:bg-primary-50";

/** Mobile/tablet navigation drawer built on the native <dialog> (focus trap, Esc to close, inert page). */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close the drawer whenever navigation happens.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="grid size-11 cursor-pointer place-items-center rounded-full bg-primary-50 text-primary-800 transition-colors hover:bg-primary-100 lg:hidden"
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
        <div className="flex min-h-full flex-col bg-white">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Link href="/" aria-label={`${site.name} — home`}>
              <Logo height={40} eager />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => dialogRef.current?.close()}
              className="grid size-11 cursor-pointer place-items-center rounded-full bg-primary-50 text-primary-800 transition-colors hover:bg-primary-100"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="grid gap-0.5">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={rowClass}>
                    {p.label}
                  </Link>
                </li>
              ))}

              <li>
                <details className="group">
                  <summary className={`${rowClass} list-none [&::-webkit-details-marker]:hidden`}>
                    Treatments
                    <ChevronDown className="size-5 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mb-2 ml-3 grid gap-0.5 border-l-2 border-primary-100 pl-2">
                    {treatmentLinks.map((t) => (
                      <li key={t.href}>
                        <Link href={t.href} className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-base font-medium text-ink-soft hover:bg-primary-50">
                          <span className="text-primary-700">
                            <DentalIcon name={t.icon} size={24} />
                          </span>
                          {t.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/treatments" className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-base font-semibold text-accent-700 hover:bg-accent-50">
                        All treatments <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              {morePages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={rowClass}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-3 border-t border-line bg-surface px-5 py-5">
            <ButtonLink href="/appointment" size="lg" className="w-full">
              <CalendarCheck className="size-5" aria-hidden="true" /> Book Appointment
            </ButtonLink>
            <div className="grid grid-cols-2 gap-2">
              {branches.map((b) => (
                <a
                  key={`call-${b.slug}`}
                  href={telUrl(b)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-3 text-sm font-semibold text-primary-800"
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
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-whatsapp-deep px-3 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="size-4" /> {b.shortName}
                </a>
              ))}
            </div>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-semibold text-muted"
            >
              <InstagramIcon className="size-4" /> @{site.instagram.handle}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
