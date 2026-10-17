import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { programs } from "@/data/content";
import { cn } from "@/lib/cn";

/** The five community programs. `intro` toggles the section heading (used on the home page). */
export function ProgramsGrid({ intro = true, className }: { intro?: boolean; className?: string }) {
  return (
    <section className={cn("section-y bg-surface", className)} aria-labelledby="programs-heading">
      <div className="container-page">
        {!intro && (
          <h2 id="programs-heading" className="sr-only">
            Our community programs
          </h2>
        )}
        {intro && (
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Beyond the clinic"
              title={<span id="programs-heading">Special programs for our community</span>}
              description="Dental health shouldn't wait for a toothache. We bring check-ups, screening and awareness to schools, workplaces and neighbourhoods."
            />
            <ButtonLink href="/special-programs" variant="outline" className="self-start lg:self-auto">
              About our programs <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        )}
        <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-6", intro && "mt-12")}>
          {programs.map(({ title, text, icon: Icon }, i) => (
            <li
              key={title}
              style={{ "--i": i % 3 } as CSSProperties}
              className={cn(
                "reveal relative overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft",
                i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                i === 4 && "sm:col-span-2",
              )}
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-accent-50 text-accent-600">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl font-bold leading-snug text-primary-900">{title}</h3>
              <p className="mt-2.5 text-[0.98rem] leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
