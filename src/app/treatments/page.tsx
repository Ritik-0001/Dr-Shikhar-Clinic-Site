import Link from "next/link";
import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { TreatmentCard } from "@/components/sections/treatment-card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { totalProcedures, treatmentHref, treatments } from "@/data/treatments";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/contact";

export const metadata: Metadata = pageMetadata({
  title: "Dental Treatments in Ahmedabad & Dhrangadhra",
  description:
    "Explore 11 dental specialities at Shree Hari Dental Care. Check-ups, root canal, implants, braces & clear aligners, whitening, crowns, oral surgery, children's and gum care in Nikol, Ahmedabad and Dhrangadhra.",
  path: "/treatments",
  keywords: ["dental clinic Ahmedabad", "multispeciality dental clinic Gujarat", "dental treatments Ahmedabad"],
});

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our treatments"
        title="Complete dental care for every smile"
        description={`Eleven dental specialities and ${totalProcedures} procedures, from preventive check-ups to dental implants and clear aligners, explained in plain language so you always know what to expect.`}
        breadcrumbs={[{ label: "Treatments" }]}
      />

      <section className="section-y pt-4 sm:pt-6">
        <h2 className="sr-only">All treatments</h2>
        <div className="container-page grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {treatments.map((t, i) => (
            <TreatmentCard key={t.slug} treatment={t} index={i} featured={t.slug === "dental-implants"} />
          ))}
        </div>
      </section>

      <section className="faq bg-surface py-12 sm:py-16" aria-labelledby="glance-heading">
        <div className="container-page">
          <details className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-3xl">
              <span>
                <span className="eyebrow">At a glance</span>
                <h2 id="glance-heading" className="font-display mt-3 text-[clamp(1.6rem,1.2rem+1.8vw,2.4rem)] leading-tight text-primary-900">
                  Browse all {totalProcedures} procedures
                </h2>
              </span>
              <span className="faq-icon grid size-12 shrink-0 place-items-center rounded-full bg-white text-accent-700 transition-[transform,background-color,color] duration-300">
                <Plus className="size-6" aria-hidden="true" />
              </span>
            </summary>
            <p className="mt-4 max-w-2xl text-muted">Looking for something specific? Find the procedure below and jump straight to its page.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {treatments.map((t) => (
              <div key={t.slug} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-lg font-bold text-primary-900">
                  <Link href={treatmentHref(t)} className="hover:text-accent-700">
                    {t.title}
                  </Link>
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {t.procedures.map((p) => (
                    <li key={p.name}>
                      <Link href={treatmentHref(t)} className="inline-block rounded-full bg-accent-50 px-3 py-1.5 text-[0.8125rem] font-bold text-primary-800 transition-colors hover:bg-accent-100">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </details>
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
