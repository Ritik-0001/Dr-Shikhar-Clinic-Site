import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/data/content";
import { cn } from "@/lib/cn";

/** The nine-step patient journey, from booking to long-term maintenance. */
export function PatientJourney({ className, tone = "tint" }: { className?: string; tone?: "tint" | "plain" }) {
  return (
    <section className={cn("section-y", tone === "tint" && "bg-surface", className)} aria-labelledby="journey-heading">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Your patient journey"
          title={<span id="journey-heading">From first call to lasting smile — in nine clear steps</span>}
          description="No surprises, no pressure. Here's what to expect, every step of the way."
        />
        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {journey.map(({ title, text, icon: Icon }, i) => (
            <li
              key={title}
              style={{ "--i": i % 3 } as CSSProperties}
              className="reveal relative overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft"
            >
              <span aria-hidden="true" className="font-display absolute right-5 top-3 text-[5rem] leading-none text-primary-100">
                {i + 1}
              </span>
              <span className="relative grid size-14 place-items-center rounded-2xl bg-accent-50 text-accent-600">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h3 className="relative mt-6 text-lg font-bold text-primary-900">
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className="relative mt-2 text-[0.95rem] leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
