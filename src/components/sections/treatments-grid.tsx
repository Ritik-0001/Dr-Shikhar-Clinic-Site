import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { treatments } from "@/data/treatments";
import { TreatmentCard } from "./treatment-card";

/** Home-page treatments overview: eleven specialities + a "see everything" tile. */
export function TreatmentsGrid() {
  return (
    <section className="section-y" aria-labelledby="treatments-heading">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our treatments"
            title={<span id="treatments-heading">Complete dental care, under one trusted roof</span>}
            description="From preventive check-ups to dental implants and clear aligners — eleven specialities, each explained in plain language so you always know what to expect."
          />
          <ButtonLink href="/treatments" variant="outline" className="self-start lg:self-auto">
            All treatments <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {treatments.map((t, i) => (
            <TreatmentCard key={t.slug} treatment={t} index={i} />
          ))}
          <div className="reveal relative flex flex-col justify-between overflow-hidden rounded-3xl bg-primary-900 p-7 text-white" style={{ "--i": 3 } as CSSProperties}>
            <div
              className="absolute inset-0"
              style={{ backgroundImage: "radial-gradient(70% 70% at 100% 0%, color-mix(in oklab, var(--color-accent-600) 45%, transparent), transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="font-display text-3xl leading-tight">Not sure what you need?</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-primary-200">
                Start with a check-up. We&apos;ll find out what&apos;s going on and explain your options — no pressure.
              </p>
            </div>
            <div className="relative mt-8 flex flex-col gap-2.5">
              <ButtonLink href="/appointment" size="md">
                <CalendarCheck className="size-4" aria-hidden="true" /> Book a check-up
              </ButtonLink>
              <Link href="/faqs" className="inline-flex items-center gap-1.5 self-start rounded-md py-1 text-sm font-semibold text-primary-100 hover:text-white">
                Read common questions <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
