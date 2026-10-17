import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyChooseUs } from "@/data/content";

/** Dark "reasons to choose us" band: sticky intro on the left, ten reasons on the right. */
export function WhyChooseUs() {
  return (
    <section className="section-y relative isolate overflow-hidden bg-primary-950 text-white" aria-labelledby="why-heading">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(50% 45% at 0% 0%, color-mix(in oklab, var(--color-primary-600) 38%, transparent), transparent 70%), radial-gradient(40% 40% at 100% 100%, color-mix(in oklab, var(--color-accent-600) 26%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="container-page grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            tone="dark"
            eyebrow="Why Shree Hari"
            title={<span id="why-heading">Care that&apos;s honest, gentle and thoroughly modern</span>}
            description="We built our clinics around one idea: you should understand your treatment, trust your dentist and feel comfortable in the chair."
          />
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/about" variant="light" size="lg">
              About our clinic <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {whyChooseUs.map(({ title, text, icon: Icon }, i) => (
            <li
              key={title}
              style={{ "--i": i % 2 } as CSSProperties}
              className="reveal rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.1]"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-accent-300">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold leading-snug">{title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-primary-200">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
