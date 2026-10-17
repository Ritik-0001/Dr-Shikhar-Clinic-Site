import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ImplantDiagram } from "@/components/illustrations/implant-diagram";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getTreatment } from "@/data/treatments";

/** Home-page spotlight for dental implants (one of the clinic's key services). */
export function ImplantSpotlight() {
  const implants = getTreatment("dental-implants");
  if (!implants) return null;
  return (
    <section className="section-y bg-surface" aria-labelledby="implants-heading">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-linear-to-br from-primary-100 to-white" aria-hidden="true" />
          <div className="rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-line sm:p-8">
            <ImplantDiagram className="h-auto w-full" />
            <p className="mt-2 text-center text-sm text-muted">How a dental implant restores a missing tooth — from the root up.</p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Dental implants"
            title={<span id="implants-heading">Missing a tooth? Get your smile — and your bite — back.</span>}
            description={implants.lead}
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {implants.procedures.slice(0, 8).map((p) => (
              <li key={p.name} className="flex items-start gap-3 text-[0.98rem] font-semibold text-ink-soft">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {p.name}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/dental-implants" size="lg">
              Explore dental implants <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <Link href="/appointment" className="rounded-md px-2 py-2 text-[0.95rem] font-bold text-primary-700 hover:text-accent-600">
              Book an implant consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
