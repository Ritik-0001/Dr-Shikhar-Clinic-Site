import { ArrowRight, CalendarCheck } from "lucide-react";
import { ButtonLink } from "./button";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

type Props = {
  title?: string;
  description?: string;
  className?: string;
};

/** Closing call-to-action: a deep navy band with soft glows and fine grain. */
export function CtaBanner({
  title = "Ready for a healthier, happier smile?",
  description = "Book a consultation at our Nikol (Ahmedabad) or Dhrangadhra clinic. We'll listen, explain your options clearly and never rush you.",
  className,
}: Props) {
  return (
    <section className={cn("pb-14 sm:pb-24", className)}>
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-primary-950 px-6 py-12 text-white sm:rounded-[2.25rem] sm:px-14 sm:py-20">
          <span className="glow absolute -right-32 -top-40 -z-10 size-[34rem] [--glow:rgb(58_116_192/0.38)]" aria-hidden="true" />
          <span className="glow absolute -bottom-48 -left-24 -z-10 size-[30rem] [--glow:rgb(195_38_47/0.22)]" aria-hidden="true" />
          <span className="emblem-mask absolute -bottom-16 -right-6 -z-10 hidden h-[24rem] text-white opacity-[0.05] sm:block" aria-hidden="true" />
          <span className="grain-layer -z-10" aria-hidden="true" />
          <div className="max-w-2xl">
            <p className="eyebrow text-accent-300">{site.tagline}</p>
            <h2 className="font-display mt-4 text-[clamp(1.95rem,1.35rem+2.8vw,3.3rem)] leading-[1.1] tracking-[-0.03em]">{title}</h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-primary-200 sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
