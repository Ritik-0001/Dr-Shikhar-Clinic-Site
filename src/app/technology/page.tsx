import type { Metadata } from "next";
import { CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/ui/cta-banner";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { sterilization, technology } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Technology & Sterilization",
  description:
    "Digital X-ray, rotary endodontics, apex locators, intraoral cameras and an autoclave-based sterilization protocol: the equipment and safety standards behind every treatment at Shree Hari Dental Care.",
  path: "/technology",
  keywords: ["digital X-ray dental clinic Ahmedabad", "sterilization protocol dental clinic", "advanced dental equipment Ahmedabad", "safe dental clinic Gujarat"],
});

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology & safety"
        title="Advanced tools. Uncompromising safety."
        description="Modern equipment makes diagnosis more accurate and treatment more comfortable. Strict sterilization protects every patient, every time."
        breadcrumbs={[{ label: "Technology & Safety" }]}
        actions={
          <>
            <ButtonLink href="/appointment" size="lg">
              <CalendarCheck className="size-5" aria-hidden="true" /> Book Appointment
            </ButtonLink>
            <ButtonLink href="#sterilization" variant="outline" size="lg">
              Our sterilization protocol
            </ButtonLink>
          </>
        }
      />

      {/* Technology */}
      <section id="technology" className="section-y scroll-mt-28 pt-6 sm:pt-8" aria-labelledby="tech-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Technology & equipment"
            title={<span id="tech-heading">Advanced tools that make dentistry gentler</span>}
            description="We invest in modern equipment because it means more accurate diagnosis, shorter treatments and a more comfortable experience for you."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
            {technology.map(({ title, text, icon: Icon }) => (
              <li key={title} className="flex gap-4 rounded-3xl border border-line bg-white p-5 sm:gap-5 sm:p-7">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-50 text-primary-700 sm:size-14">
                  <Icon className="size-6 sm:size-7" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-primary-900">{title}</h3>
                  <p className="mt-1.5 text-[0.98rem] leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sterilization */}
      <section id="sterilization" className="section-y relative isolate scroll-mt-20 overflow-hidden bg-primary-950 text-white" aria-labelledby="steril-heading">
        <span className="glow absolute -right-40 -top-48 -z-10 size-[44rem] [--glow:rgb(58_116_192/0.34)]" aria-hidden="true" />
        <span className="glow absolute -bottom-56 -left-40 -z-10 size-[40rem] [--glow:rgb(195_38_47/0.2)]" aria-hidden="true" />
        <span className="grain-layer -z-10" aria-hidden="true" />
        <div className="container-page">
          <SectionHeading
            tone="dark"
            eyebrow="Sterilization protocol"
            title={<span id="steril-heading">Safety you can see, at every step</span>}
            description="International-standard sterilization is one of our core commitments. Here is exactly how we protect every patient, every time."
          />
          <ol className="mt-12 grid border-t border-white/10 md:grid-cols-2 md:gap-x-16">
            {sterilization.map(({ title, text }, i) => (
              <li key={title} className="grid grid-cols-[3.25rem_1fr] gap-x-2 border-b border-white/10 py-6 sm:grid-cols-[4.5rem_1fr] sm:py-8">
                <span className="font-display text-[2rem] leading-none text-accent-300 sm:text-[2.6rem]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug sm:text-xl">{title}</h3>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-primary-200">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner className="pt-16 sm:pt-24" />
    </>
  );
}
