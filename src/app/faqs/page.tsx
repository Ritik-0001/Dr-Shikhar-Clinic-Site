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
    "Answers to common questions about timings, appointments, painless treatment, sterilization, root canals, implants, braces, whitening and costs at Shree Hari Dental Care in Ahmedabad and Dhrangadhra.",
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
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">Topics</p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:grid lg:gap-1">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-bold text-primary-800 transition-colors hover:border-primary-300 lg:rounded-xl lg:border-transparent lg:bg-transparent lg:px-3 lg:hover:bg-surface">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-14">
            {faqGroups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28" aria-labelledby={`${g.id}-title`}>
                <h2 id={`${g.id}-title`} className="font-display text-[clamp(1.8rem,1.2rem+1.8vw,2.4rem)] leading-tight text-primary-900">
                  {g.title}
                </h2>
                <FaqList faqs={g.faqs} className="mt-6" />
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Still have a question?" description="Message us on WhatsApp, call the clinic or book a consultation. We're happy to help, and there's never any pressure." className="pt-8" />
      <JsonLd data={faqJsonLd(allFaqs.map((f) => ({ q: f.q, a: plainAnswer(f.a) })))} />
    </>
  );
}
