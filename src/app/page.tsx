import { BlogPreview } from "@/components/sections/blog-preview";
import { BranchesSection } from "@/components/sections/branches-section";
import { DoctorIntro } from "@/components/sections/doctor-intro";
import { FaqPreview } from "@/components/sections/faq-preview";
import { Hero } from "@/components/sections/hero";
import { ImplantSpotlight } from "@/components/sections/implant-spotlight";
import { PatientJourney } from "@/components/sections/patient-journey";
import { ProgramsGrid } from "@/components/sections/programs-grid";
import { TechSterilization } from "@/components/sections/tech-sterilization";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { TreatmentsGrid } from "@/components/sections/treatments-grid";
import { TrustStrip } from "@/components/sections/trust-strip";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { branches } from "@/data/branches";
import { dentistJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <TreatmentsGrid />
      <WhyChooseUs />
      <ImplantSpotlight />
      <PatientJourney tone="plain" />
      <TechSterilization />
      <DoctorIntro />
      <TestimonialsSection />
      <BranchesSection />
      <ProgramsGrid />
      <BlogPreview />
      <FaqPreview />
      <CtaBanner className="pt-16 sm:pt-24" />
      <JsonLd data={branches.map(dentistJsonLd)} />
    </>
  );
}
