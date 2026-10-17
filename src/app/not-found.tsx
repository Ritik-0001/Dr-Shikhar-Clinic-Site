import type { Metadata } from "next";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { DentalIcon } from "@/components/icons/dental-icons";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="bg-hero-glow relative isolate overflow-hidden">
      <div className="container-page grid place-items-center py-24 text-center sm:py-32">
        <span className="grid size-28 place-items-center rounded-[2rem] bg-white text-primary-700 shadow-lift ring-1 ring-line">
          <DentalIcon name="tooth" size={72} />
        </span>
        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="font-display mt-4 max-w-2xl text-[clamp(2.4rem,1.5rem+4vw,4.4rem)] leading-[1.05] text-primary-800">Looks like this page has gone missing</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          The page you&apos;re looking for may have moved or never existed. Let&apos;s get you back to healthy teeth and happy smiles.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
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
