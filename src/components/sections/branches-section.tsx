import { BranchCard } from "@/components/branches/branch-card";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { branches } from "@/data/branches";
import { ArrowRight } from "lucide-react";

export function BranchesSection() {
  return (
    <section className="section-y" aria-labelledby="branches-heading">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Find a clinic"
            title={<span id="branches-heading">Two clinics, one standard of care</span>}
            description="Visit us in Nikol, Ahmedabad or in Dhrangadhra. Same ethical, painless and evidence-based dentistry at both."
          />
          <ButtonLink href="/branches" variant="outline" className="self-start lg:self-auto">
            Branch locator <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {branches.map((b, i) => (
            <BranchCard key={b.slug} branch={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
