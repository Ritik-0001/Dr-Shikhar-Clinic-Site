import type { Metadata } from "next";
import { BranchLocator } from "@/components/branches/branch-locator";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { branches } from "@/data/branches";
import { dentistJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Branch Locator — Clinics in Nikol, Ahmedabad & Dhrangadhra",
  description:
    "Find a Shree Hari Dental Care clinic near you: Nikol (Palm Arcade, Nikol–Naroda Road, Ahmedabad) and Dhrangadhra (Navyug Road). Map, directions, phone numbers, WhatsApp and timings.",
  path: "/branches",
  keywords: ["dentist in Nikol", "dentist in Dhrangadhra", "dental clinic Ahmedabad", "multispeciality dental clinic Gujarat"],
});

export default function BranchesPage() {
  return (
    <>
      <PageHero
        eyebrow="Branch locator"
        title="Find your nearest clinic"
        description="Two clinics, one standard of care. Choose a clinic to see it on the map, check if it's open right now, and get directions, a call or a WhatsApp message in one tap."
        breadcrumbs={[{ label: "Branch Locator" }]}
      />
      <section className="section-y pt-4" aria-label="Clinic locator">
        <div className="container-page">
          <BranchLocator />
        </div>
      </section>
      <CtaBanner className="pt-0" />
      <JsonLd data={branches.map(dentistJsonLd)} />
    </>
  );
}
