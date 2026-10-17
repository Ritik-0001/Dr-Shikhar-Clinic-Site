import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyHighlights } from "@/data/content";
import { branches } from "@/data/branches";
import { site } from "@/data/site";
import { treatments } from "@/data/treatments";

const stats = [
  { value: String(treatments.length), label: "Specialities" },
  { value: String(branches.length), label: "Clinics" },
  { value: String(site.hours.openDays.length), label: "Days a week" },
];

/** Deep navy band: why patients choose us, as six numbered statements (no icon cards). */
export function WhyUs() {
  return (
    <section className="defer-render section-y relative isolate overflow-hidden bg-primary-950 text-white" aria-labelledby="why-heading">
      <span className="glow absolute -left-40 -top-48 -z-10 size-[44rem] [--glow:rgb(58_116_192/0.34)]" aria-hidden="true" />
      <span className="glow absolute -bottom-56 -right-40 -z-10 size-[40rem] [--glow:rgb(195_38_47/0.2)]" aria-hidden="true" />
      <span className="grain-layer -z-10" aria-hidden="true" />

      <div className="container-page grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            tone="dark"
            eyebrow="Why Shree Hari"
            title={<span id="why-heading">Care that is honest, gentle and thoroughly modern</span>}
            description="We built our clinics around one idea: you should understand your treatment, trust your dentist and feel comfortable in the chair."
          />
          <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-white/15 pt-7">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-[0.8125rem] leading-snug text-primary-200">{s.label}</dt>
                <dd className="font-display text-[2.6rem] leading-none text-white sm:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row [&>*]:max-sm:w-full">
            <ButtonLink href="/about" variant="light" size="lg">
              About our clinic <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/technology" variant="outline-light" size="lg">
              Technology &amp; Safety
            </ButtonLink>
          </div>
        </div>

        <ol className="divide-y divide-white/10 border-y border-white/10">
          {whyHighlights.map(({ title, text }, i) => (
            <li key={title} className="grid grid-cols-[3.25rem_1fr] gap-x-2 py-6 sm:grid-cols-[4.75rem_1fr] sm:py-8">
              <span className="font-display text-[2rem] leading-none text-accent-300 sm:text-[2.75rem]" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-bold leading-snug sm:text-xl">{title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-primary-200">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
