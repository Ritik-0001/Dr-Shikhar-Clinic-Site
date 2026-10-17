import { ClinicsSection } from "@/components/home/clinics";
import { DoctorTeaser } from "@/components/home/doctor";
import { FaqTeaser } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { TreatmentsShowcase } from "@/components/home/treatments";
import { WhyUs } from "@/components/home/why-us";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { branches } from "@/data/branches";
import { dentistJsonLd } from "@/lib/seo";

/** Deliberately short: the essentials only. Everything else lives on its own page. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TreatmentsShowcase />
      <WhyUs />
      <DoctorTeaser />
      <TestimonialsSection />
      <ClinicsSection />
      <FaqTeaser />
      <CtaBanner className="pt-16 sm:pt-24" />
      <JsonLd data={branches.map(dentistJsonLd)} />
    </>
  );
}
