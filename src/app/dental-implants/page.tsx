import type { Metadata } from "next";
import { ArrowRight, Bone, Check, Gem, HeartHandshake, ShieldCheck, Smile, Timer } from "lucide-react";
import { ImplantDiagram } from "@/components/illustrations/implant-diagram";
import { BlogCard } from "@/components/blog/blog-card";
import { BookingCard } from "@/components/sections/booking-card";
import { FaqList } from "@/components/sections/faq-list";
import { ProcedureList } from "@/components/sections/procedure-list";
import { StepsTimeline } from "@/components/sections/steps-timeline";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPost } from "@/data/blog";
import { branches } from "@/data/branches";
import { plainAnswer } from "@/data/faqs";
import { getTreatment } from "@/data/treatments";
import { absoluteUrl } from "@/lib/contact";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

const implants = getTreatment("dental-implants")!;

export const metadata: Metadata = pageMetadata({
  title: implants.seo.title,
  description: implants.seo.description,
  path: "/dental-implants",
  keywords: implants.seo.keywords,
});

const benefits = [
  { icon: Smile, title: "Natural look and feel", text: "Custom crowns are shaped and shaded to blend seamlessly with your own teeth." },
  { icon: ShieldCheck, title: "Protects neighbouring teeth", text: "Unlike a conventional bridge, implants don't require healthy teeth to be filed down." },
  { icon: Bone, title: "Helps preserve jawbone", text: "An implant stimulates the bone like a natural root, helping to prevent the bone loss that follows tooth loss." },
  { icon: HeartHandshake, title: "Confidence when you eat and speak", text: "Fixed teeth don't slip, click or need adhesive the way loose dentures can." },
  { icon: Timer, title: "Built to last, with care", text: "With good hygiene and regular check-ups, implants can serve you for many years." },
  { icon: Gem, title: "Planned digitally", text: "Digital X-rays and guided planning help place each implant precisely, where it's planned." },
];

const compare = {
  columns: ["Dental implant", "Dental bridge", "Dentures"],
  rows: [
    ["How it feels", "Closest to a natural tooth", "Fixed and natural-feeling", "Removable; can feel bulky or loose"],
    ["Affects neighbouring teeth?", "No", "Yes — they're reduced to hold the bridge", "Partial dentures clasp onto them"],
    ["Helps preserve jawbone?", "Yes", "No", "No"],
    ["Typical treatment time", "Several months, including healing", "A few visits over 1–2 weeks", "A few visits over a few weeks"],
    ["Daily care", "Brush and floss like natural teeth", "Special cleaning under the bridge", "Remove and clean every day"],
    ["Upfront cost", "Higher", "Moderate", "Lowest"],
  ],
};

export default function DentalImplantsPage() {
  const related = (implants.relatedPosts ?? []).map(getPost).filter((p): p is NonNullable<typeof p> => Boolean(p));
  return (
    <>
      <PageHero
        eyebrow="Dental implants · Ahmedabad & Dhrangadhra"
        title="Implants that look, feel and work like your own teeth"
        description={implants.lead}
        breadcrumbs={[{ label: "Dental Implants" }]}
        actions={
          <>
            <ButtonLink href="/appointment?treatment=dental-implants" size="lg">
              Book implant consultation <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#journey" variant="outline" size="lg">
              How it works
            </ButtonLink>
          </>
        }
        aside={
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-linear-to-br from-primary-100 to-white" aria-hidden="true" />
            <div className="rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-line">
              <ImplantDiagram className="h-auto w-full" />
            </div>
          </div>
        }
      />

      <section className="section-y pt-6" aria-labelledby="benefits">
        <div className="container-page">
          <SectionHeading eyebrow="Why implants" title={<span id="benefits">The closest thing to a natural tooth</span>} description="Missing teeth affect more than your smile. Here's why many patients choose implants." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal rounded-3xl border border-line bg-white p-7 shadow-soft">
                <span className="grid size-14 place-items-center rounded-2xl bg-accent-50 text-accent-600">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-bold text-primary-900">{title}</h3>
                <p className="mt-2.5 text-[0.98rem] leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="options">
        <div className="container-page">
          <SectionHeading eyebrow="Implant options" title={<span id="options">From a single tooth to a full arch</span>} description="The right solution depends on how many teeth you're replacing, your bone and your goals. We'll walk you through the options." />
          <div className="mt-12">
            <ProcedureList procedures={implants.procedures} />
          </div>
        </div>
      </section>

      <section id="journey" className="section-y" aria-labelledby="journey-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Your implant journey" title={<span id="journey-heading">What happens, step by step</span>} description="A clear plan from the first consultation to long-term care — with no surprises." />
            <div className="mt-10">
              <StepsTimeline steps={implants.steps} />
            </div>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <BookingCard treatment="dental-implants" title="Plan your implant" text="Start with a consultation and digital X-ray. We'll check suitability and explain your options and costs before anything begins." />
          </div>
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="compare-heading">
        <div className="container-page">
          <SectionHeading eyebrow="Compare your options" title={<span id="compare-heading">Implants vs bridges vs dentures</span>} description="Each option has its place. This is a general guide — your dentist will recommend what suits your mouth, health and budget." />
          <div tabIndex={0} role="region" aria-label="Comparison table (scrolls sideways on small screens)" className="mt-10 overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Comparison of dental implants, dental bridges and dentures</caption>
              <thead>
                <tr className="bg-primary-900 text-white">
                  <th scope="col" className="px-5 py-4 text-sm font-bold uppercase tracking-wider text-primary-200">
                    <span className="sr-only">Feature</span>
                  </th>
                  {compare.columns.map((c, i) => (
                    <th key={c} scope="col" className={`px-5 py-4 text-base font-bold ${i === 0 ? "bg-accent-600" : ""}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.rows.map(([label, ...cells]) => (
                  <tr key={label} className="border-t border-line">
                    <th scope="row" className="w-[22%] px-5 py-4 text-[0.95rem] font-bold text-primary-900">
                      {label}
                    </th>
                    {cells.map((c, i) => (
                      <td key={`${label}-${i}`} className={`px-5 py-4 text-[0.95rem] leading-snug ${i === 0 ? "bg-accent-50/60 font-semibold text-ink" : "text-muted"}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">Costs and timelines vary from patient to patient. You&apos;ll receive a clear plan and estimate before any treatment begins.</p>
        </div>
      </section>

      <section className="section-y" aria-labelledby="candidate">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Is it right for you?" title={<span id="candidate">Who is a good candidate for implants?</span>} />
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Most healthy adults are. What matters most is healthy gums and enough jawbone — which we check with digital X-rays. Conditions such as uncontrolled diabetes or heavy smoking can affect healing, so we discuss those openly first.
            </p>
          </div>
          <ul className="grid gap-4">
            {implants.goodFor.map((g) => (
              <li key={g} className="flex items-start gap-3.5 rounded-2xl border border-line bg-white p-5 shadow-soft">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="font-semibold text-ink-soft">{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="implant-faqs">
        <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="Implant FAQs" title={<span id="implant-faqs">Your questions, answered honestly</span>} description="Not seeing your question? Ask us at your consultation — we're always happy to explain." />
          <FaqList faqs={implants.faqs} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-y" aria-labelledby="implant-reading">
          <div className="container-page">
            <SectionHeading eyebrow="Keep reading" title={<span id="implant-reading">A guide to dental implants</span>} />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner title="Ready to replace missing teeth?" description="Book an implant consultation at our Nikol (Ahmedabad) or Dhrangadhra clinic. We'll examine, explain and plan — with honest advice on what's right for you." className="pt-0" />

      <JsonLd
        data={[
          faqJsonLd(implants.faqs.map((f) => ({ q: f.q, a: plainAnswer(f.a) }))),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Dental Implants",
            serviceType: "Dental implants",
            description: implants.seo.description,
            url: absoluteUrl("/dental-implants"),
            provider: branches.map((b) => ({ "@id": absoluteUrl(`/branches/${b.slug}#dentist`) })),
            areaServed: ["Nikol", "Ahmedabad", "Dhrangadhra", "Gujarat"].map((name) => ({ "@type": "Place", name })),
          },
        ]}
      />
    </>
  );
}
