import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { sterilization, technology } from "@/data/content";

/** Home-page pairing: advanced technology (light card) and the sterilization protocol (dark card). */
export function TechSterilization() {
  return (
    <section className="section-y" aria-label="Technology and sterilization">
      <div className="container-page grid gap-6 lg:grid-cols-2">
        <div className="reveal flex flex-col rounded-[2rem] bg-surface p-8 ring-1 ring-line sm:p-10">
          <SectionHeading
            eyebrow="Technology"
            title="Advanced equipment, gentler dentistry"
            description="Modern tools make diagnosis more accurate and treatment more comfortable."
            as="h2"
          />
          <ul className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
            {technology.map(({ title, icon: Icon }) => (
              <li key={title} className="flex items-center gap-3 text-[0.98rem] font-semibold text-ink-soft">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-primary-700 shadow-soft ring-1 ring-line">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                {title}
              </li>
            ))}
          </ul>
          <Link href="/about#technology" className="mt-auto inline-flex items-center gap-1.5 self-start rounded-md pt-8 text-sm font-bold text-accent-600 hover:underline">
            How each one helps you <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="reveal relative isolate overflow-hidden rounded-[2rem] bg-primary-900 p-8 text-white sm:p-10" style={{ "--i": 1 } as CSSProperties}>
          <div
            className="absolute inset-0 -z-10"
            style={{ backgroundImage: "radial-gradient(60% 50% at 100% 0%, color-mix(in oklab, var(--color-primary-500) 50%, transparent), transparent 70%)" }}
            aria-hidden="true"
          />
          <SectionHeading
            tone="dark"
            eyebrow="Sterilization protocol"
            title="Safety you can see"
            description="International-standard sterilization — because your health comes before everything."
            as="h2"
          />
          <ul className="mt-8 grid gap-4">
            {sterilization.map(({ title, text }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold leading-snug">{title}</span>
                  <span className="mt-0.5 block text-[0.95rem] leading-relaxed text-primary-200">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
