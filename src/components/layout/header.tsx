import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DentalIcon } from "@/components/icons/dental-icons";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { primaryNav, treatmentLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";

const linkBase =
  "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:bg-primary-50 hover:text-primary-800";
const linkActive = "bg-primary-50 text-primary-800";

/** Panels stay mounted but hidden; they open on hover OR keyboard focus (no JS needed on desktop). */
const panelBase =
  "invisible absolute z-50 pt-3 opacity-0 translate-y-1 transition-[opacity,translate,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100";

export function Header() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="relative mx-auto flex h-[4.25rem] max-w-[78rem] items-center justify-between gap-3 rounded-full border border-line/80 bg-white/85 pl-5 pr-2.5 shadow-[0_10px_36px_-14px_rgb(17_48_92/0.28)] backdrop-blur-xl sm:pl-6">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0 rounded-lg">
          <Logo height={44} eager />
        </Link>

        <nav aria-label="Primary" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-0.5">
            {primaryNav.map((item) => {
              const match = item.children?.map((c) => c.href);
              return (
                <li key={item.label} className={`group flex h-full items-center ${item.children ? "relative" : ""}`}>
                  <NavLink href={item.href} match={match} className={linkBase} activeClassName={linkActive}>
                    {item.label}
                    {(item.children || item.mega) && (
                      <ChevronDown className="size-4 text-muted transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
                    )}
                  </NavLink>

                  {/* Standard dropdown */}
                  {item.children && (
                    <div className={`${panelBase} left-1/2 top-full w-72 -translate-x-1/2 group-hover:-translate-x-1/2 group-focus-within:-translate-x-1/2`}>
                      <ul className="rounded-3xl border border-line bg-white p-2 shadow-lift">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className="block rounded-2xl px-4 py-3 transition-colors hover:bg-primary-50">
                              <span className="block text-[0.95rem] font-semibold text-primary-800">{child.label}</span>
                              {child.description && <span className="mt-0.5 block text-sm leading-snug text-muted">{child.description}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Treatments mega menu — spans the full width of the header pill */}
                  {item.mega && (
                    <div className={`${panelBase} inset-x-0 top-full`}>
                      <div className="grid gap-2 rounded-[2rem] border border-line bg-white p-3 shadow-lift lg:grid-cols-[17rem_1fr]">
                        <div className="flex flex-col justify-between rounded-3xl bg-primary-900 p-6 text-white">
                          <div>
                            <p className="eyebrow text-accent-300">Our treatments</p>
                            <p className="font-display mt-3 text-3xl leading-tight">Complete care for every smile</p>
                            <p className="mt-3 text-sm leading-relaxed text-primary-200">
                              Eleven dental specialities — from preventive check-ups to dental implants and aligners.
                            </p>
                          </div>
                          <ButtonLink href="/treatments" variant="light" size="sm" className="mt-6 self-start">
                            View all treatments <ArrowRight className="size-4" aria-hidden="true" />
                          </ButtonLink>
                        </div>
                        <ul className="grid gap-x-2 gap-y-1 p-1 sm:grid-cols-2 xl:grid-cols-3">
                          {treatmentLinks.map((t) => (
                            <li key={t.href}>
                              <Link href={t.href} className="flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-primary-50">
                                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
                                  <DentalIcon name={t.icon} size={28} />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-[0.95rem] font-semibold leading-snug text-primary-800">{t.label}</span>
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

        <div className="flex items-center gap-2">
          {/* wrapper (not a class on the button) controls visibility: the button's own display class would win */}
          <div className="hidden sm:block">
            <ButtonLink href="/appointment">Book Appointment</ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
