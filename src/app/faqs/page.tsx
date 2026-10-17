import type { Metadata } from "next";
import { FaqList } from "@/components/sections/faq-list";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { allFaqs, faqGroups, plainAnswer } from "@/data/faqs";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dental FAQs",
  description:
    "Answers to common questions about timings, appointments, painless treatment, sterilization, root canals, implants, braces, whitening and costs at Shree Hari Dental Care — Ahmedabad & Dhrangadhra.",
  path: "/faqs",
  keywords: ["dental FAQs", "painless dental treatment", "dentist in Ahmedabad", "root canal treatment Ahmedabad"],
});

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Your questions, answered"
        description="Clear, honest answers about visiting us, comfort and safety, treatments and costs. Can't find what you need? Just ask."
        breadcrumbs={[{ label: "FAQs" }]}
      />

      <section className="section-y pt-4" aria-label="Frequently asked questions">
        <div className="container-page grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted">Topics</p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:grid lg:gap-1">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-100 lg:rounded-xl lg:bg-transparent lg:px-3 lg:hover:bg-primary-50">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-14">
            {faqGroups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28" aria-labelledby={`${g.id}-title`}>
                <h2 id={`${g.id}-title`} className="font-display text-[clamp(1.8rem,1.2rem+1.8vw,2.4rem)] leading-tight text-primary-800">
                  {g.title}
                </h2>
                <FaqList faqs={g.faqs} className="mt-6" />
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Still have a question?" description="Message us on WhatsApp, call the clinic or book a consultation — we're happy to help, and there's never any pressure." className="pt-8" />
      <JsonLd data={faqJsonLd(allFaqs.map((f) => ({ q: f.q, a: plainAnswer(f.a) })))} />
    </>
  );
}
