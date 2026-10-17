import type { Metadata } from "next";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { DentalIcon } from "@/components/icons/dental-icons";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="bg-hero-glow relative isolate overflow-hidden">
      <div className="container-page grid place-items-center py-20 text-center sm:py-32">
        <div className="relative isolate grid h-44 w-36 place-items-center overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-primary-950 text-white shadow-lift [--icon-accent:var(--color-accent-300)]" aria-hidden="true">
          <span className="glow absolute -right-16 -top-16 -z-10 size-48 [--glow:rgb(58_116_192/0.55)]" />
          <span className="grain-layer -z-10" />
          <span className="mt-6">
            <DentalIcon name="tooth" size={64} />
          </span>
        </div>
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="font-display mt-4 max-w-2xl text-[clamp(2.3rem,1.5rem+3.8vw,4.1rem)] leading-[1.08] tracking-[-0.035em] text-primary-900">Looks like this page has gone missing</h1>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted sm:text-lg">
          The page you&apos;re looking for may have moved or never existed. Let&apos;s get you back to healthy teeth and happy smiles.
        </p>
        <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
          <ButtonLink href="/" size="lg">
            Back to home <ArrowRight className="size-5" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/treatments" variant="outline" size="lg">
            Browse treatments
          </ButtonLink>
          <ButtonLink href="/appointment" variant="outline" size="lg">
            <CalendarCheck className="size-5" aria-hidden="true" /> Book an appointment
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
