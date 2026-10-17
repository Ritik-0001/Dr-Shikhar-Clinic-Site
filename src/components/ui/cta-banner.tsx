import { ArrowRight, CalendarCheck } from "lucide-react";
import { ButtonLink } from "./button";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type Props = {
  title?: string;
  description?: string;
  className?: string;
};

/** Closing call-to-action used at the bottom of most pages. */
export function CtaBanner({
  title = "Ready for a healthier, happier smile?",
  description = "Book a consultation at our Nikol (Ahmedabad) or Dhrangadhra clinic. We'll listen, explain your options clearly and never rush you.",
  className,
}: Props) {
  return (
    <section className={cn("pb-16 sm:pb-24", className)}>
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-primary-900 px-6 py-14 text-white sm:rounded-[2.5rem] sm:px-14 sm:py-20">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(50% 70% at 90% 0%, color-mix(in oklab, var(--color-primary-500) 55%, transparent), transparent 70%), radial-gradient(40% 60% at 0% 100%, color-mix(in oklab, var(--color-accent-600) 40%, transparent), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <span className="emblem-mask absolute -bottom-16 -right-8 -z-10 hidden h-[26rem] text-white opacity-[0.08] sm:block" aria-hidden="true" />
          <div className="max-w-2xl">
            <p className="eyebrow text-accent-300">{site.tagline}</p>
            <h2 className="font-display mt-4 text-[clamp(2.1rem,1.4rem+3vw,3.6rem)] leading-[1.06]">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-primary-200">{description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/appointment" size="lg">
                <CalendarCheck className="size-5" aria-hidden="true" /> Book Appointment
              </ButtonLink>
              <ButtonLink href="/branches" variant="outline-light" size="lg">
                Find your nearest clinic <ArrowRight className="size-5" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
