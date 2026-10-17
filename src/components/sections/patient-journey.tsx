import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/data/content";
import { cn } from "@/lib/cn";

/** The nine-step patient journey, from booking to long-term maintenance. Typographic: numbers and hairlines, no cards. */
export function PatientJourney({ className, tone = "tint" }: { className?: string; tone?: "tint" | "plain" }) {
  return (
    <section className={cn("section-y", tone === "tint" && "bg-surface", className)} aria-labelledby="journey-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Your patient journey"
          title={<span id="journey-heading">From first call to lasting smile, in nine clear steps</span>}
          description="No surprises, no pressure. Here is what to expect, every step of the way."
        />
        <ol className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {journey.map(({ title, text }, i) => (
            <li key={title} className="border-t-2 border-primary-900/15 pt-5">
              <span className="font-display text-[2.6rem] leading-none text-accent-600" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-bold text-primary-900">
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className="mt-1.5 text-[0.98rem] leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
