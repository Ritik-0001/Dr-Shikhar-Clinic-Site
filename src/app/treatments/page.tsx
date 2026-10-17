import Link from "next/link";
import type { Metadata } from "next";
import { TreatmentCard } from "@/components/sections/treatment-card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { totalProcedures, treatmentHref, treatments } from "@/data/treatments";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/contact";

export const metadata: Metadata = pageMetadata({
  title: "Dental Treatments in Ahmedabad & Dhrangadhra",
  description:
    "Explore 11 dental specialities at Shree Hari Dental Care — check-ups, root canal, implants, braces & clear aligners, whitening, crowns, oral surgery, children's and gum care in Nikol, Ahmedabad and Dhrangadhra.",
  path: "/treatments",
  keywords: ["dental clinic Ahmedabad", "multispeciality dental clinic Gujarat", "dental treatments Ahmedabad"],
});

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our treatments"
        title="Complete dental care for every smile"
        description={`Eleven dental specialities and ${totalProcedures} procedures — from preventive check-ups to dental implants and clear aligners — explained in plain language so you always know what to expect.`}
        breadcrumbs={[{ label: "Treatments" }]}
      />

      <section className="section-y pt-4 sm:pt-6">
        <h2 className="sr-only">All treatments</h2>
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t, i) => (
            <TreatmentCard key={t.slug} treatment={t} index={i} />
          ))}
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="glance-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="At a glance"
            title={<span id="glance-heading">Everything we offer, in one place</span>}
            description="Looking for something specific? Find the procedure below and jump straight to its page."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => (
              <div key={t.slug} className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <h3 className="text-lg font-bold text-primary-900">
                  <Link href={treatmentHref(t)} className="hover:text-accent-600">
                    {t.title}
                  </Link>
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {t.procedures.map((p) => (
                    <li key={p.name}>
                      <Link href={treatmentHref(t)} className="inline-block rounded-full bg-primary-50 px-3 py-1.5 text-[0.8125rem] font-semibold text-primary-800 transition-colors hover:bg-primary-100">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner className="pt-16 sm:pt-24" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Dental treatments at Shree Hari Dental Care",
          itemListElement: treatments.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: t.title,
            url: absoluteUrl(treatmentHref(t)),
          })),
        }}
      />
    </>
  );
}
