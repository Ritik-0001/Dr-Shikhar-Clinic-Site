import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { DentalIcon } from "@/components/icons/dental-icons";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { treatmentHref, treatments } from "@/data/treatments";
import { cn } from "@/lib/cn";

const tile =
  "group relative isolate flex h-full min-h-[9.75rem] flex-col overflow-hidden rounded-3xl p-4 transition-[box-shadow,translate] duration-300 hover:-translate-y-1 sm:min-h-[12.5rem] sm:p-6";

/** "What we treat": every speciality as a compact tile. Implants (a key service) are the deep navy tile. */
export function TreatmentsShowcase() {
  return (
    <section className="section-y pt-4 sm:pt-6" aria-labelledby="treatments-heading">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we treat"
            title={<span id="treatments-heading">{treatments.length} specialities, one trusted clinic</span>}
            description="From a routine check-up to a complete smile makeover, every treatment is planned around you and explained before we begin."
          />
          <ButtonLink href="/treatments" variant="outline" className="self-start max-sm:hidden lg:self-auto">
            All treatments <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {treatments.map((t) => {
            const featured = t.slug === "dental-implants";
            return (
              <li key={t.slug}>
                <Link
                  href={treatmentHref(t)}
                  className={cn(
                    tile,
                    featured
                      ? "bg-primary-900 text-white hover:shadow-lift [--icon-accent:var(--color-accent-300)]"
                      : "border border-line bg-white hover:shadow-card",
                  )}
                >
                  {featured && <span className="glow absolute -right-16 -top-20 -z-10 size-56 [--glow:rgb(58_116_192/0.55)]" aria-hidden="true" />}
                  <span
                    className={cn(
                      "grid size-11 place-items-center rounded-2xl transition-colors duration-300 sm:size-14",
                      featured ? "bg-white/10 text-white" : "bg-accent-50 text-primary-700 group-hover:bg-primary-700 group-hover:text-white group-hover:[--icon-accent:var(--color-accent-300)]",
                    )}
                  >
                    <DentalIcon name={t.icon} size={34} />
                  </span>
                  <span className="mt-auto block pt-4 sm:pt-5">
                    <span className="font-display block text-[1.06rem] leading-[1.15] sm:text-[1.4rem]">{t.title}</span>
                    <span className={cn("mt-1.5 block text-[0.8125rem] leading-snug sm:text-sm", featured ? "text-primary-200" : "text-muted")}>{t.tagline}</span>
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "absolute right-3.5 top-3.5 size-5 transition-[translate,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:right-5 sm:top-5",
                      featured ? "text-white/60" : "text-primary-900/25 group-hover:text-accent-600",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/treatments"
              className={cn(tile, "justify-between bg-accent-600 text-white shadow-cta hover:bg-accent-700 hover:shadow-lift")}
            >
              <span className="font-display text-[1.12rem] leading-[1.15] sm:text-[1.4rem]">See every treatment in detail</span>
              <span className="grid size-12 place-items-center rounded-full bg-white/15 transition-colors group-hover:bg-white group-hover:text-accent-700 sm:size-14">
                <ArrowRight className="size-6" aria-hidden="true" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
