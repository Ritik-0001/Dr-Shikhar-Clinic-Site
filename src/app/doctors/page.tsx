import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { GraduationCap, Stethoscope, UserRound } from "lucide-react";
import { DoctorPortrait } from "@/components/sections/doctor-portrait";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { doctors } from "@/data/doctors";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Doctors",
  description:
    "Meet Dr. Shikhar Selara (BDS), dental surgeon and founder of Shree Hari Dental Care — and the dental team behind ethical, painless, evidence-based care in Ahmedabad and Dhrangadhra.",
  path: "/doctors",
  keywords: ["dentist in Ahmedabad", "dentist in Dhrangadhra", "Dr Shikhar Selara", "best dentist in Nikol"],
});

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our doctors"
        title="Meet the team behind your care"
        description="Skilled, gentle and honest — our dental team takes the time to listen, explain and treat you the way they'd want their own family treated."
        breadcrumbs={[{ label: "Our Doctors" }]}
      />

      {doctors.map((d, idx) => (
        <section key={d.slug} className="section-y pt-4" aria-labelledby={`${d.slug}-name`}>
          <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div className="mx-auto w-full max-w-md lg:max-w-none lg:sticky lg:top-28 lg:self-start">
              <DoctorPortrait doctor={d} priority={idx === 0} />
            </div>
            <div>
              <p className="eyebrow">{d.role}</p>
              <h2 id={`${d.slug}-name`} className="font-display mt-4 text-[clamp(2.2rem,1.4rem+3vw,3.6rem)] leading-[1.05] text-primary-800">
                {d.name}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                <li className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-bold text-primary-800">
                  <GraduationCap className="size-4 text-accent-600" aria-hidden="true" /> {d.credential}
                </li>
                <li className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-bold text-primary-800">
                  <Stethoscope className="size-4 text-accent-600" aria-hidden="true" /> {d.title}
                </li>
                <li className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-bold text-primary-800">
                  <UserRound className="size-4 text-accent-600" aria-hidden="true" /> Founder
                </li>
              </ul>
              <div className="mt-8 grid gap-5 text-lg leading-relaxed text-muted">
                {d.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <h3 className="mt-12 text-sm font-bold uppercase tracking-[0.14em] text-muted">How we practise</h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {d.principles.map((p, i) => (
                  <li key={p.title} style={{ "--i": i % 2 } as CSSProperties} className="reveal rounded-3xl border border-line bg-white p-6 shadow-soft">
                    <h4 className="text-lg font-bold leading-snug text-primary-900">{p.title}</h4>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{p.text}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/appointment" size="lg">
                  Book a consultation
                </ButtonLink>
                <ButtonLink href="/branches" variant="outline" size="lg">
                  Visit a clinic
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-y bg-surface" aria-label="Our dental team">
        <div className="container-page max-w-4xl text-center">
          <p className="eyebrow justify-center">Our dental team</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,1.3rem+2.6vw,3.2rem)] leading-[1.08] text-primary-800">Care is a team effort</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Behind every smooth appointment is an experienced dental team and trained clinic staff at both {site.shortName} clinics — from the front desk to the sterilization room — all following the same standards of comfort, hygiene and honesty.
          </p>
        </div>
      </section>

      <CtaBanner className="pt-16 sm:pt-24" />

      <JsonLd
        data={doctors.map((d) => ({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": absoluteUrl(`/doctors#${d.slug}`),
          name: d.name,
          jobTitle: d.title,
          description: d.bio[0],
          hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: d.credential },
          worksFor: { "@id": absoluteUrl("/#organization") },
        }))}
      />
    </>
  );
}
