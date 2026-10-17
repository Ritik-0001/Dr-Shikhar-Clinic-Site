import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { GoogleSummary, SampleNotice, TestimonialCard } from "@/components/sections/testimonials";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/ui/cta-banner";
import { PageHero } from "@/components/ui/page-hero";
import { branches } from "@/data/branches";
import { testimonials } from "@/data/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Patient Testimonials & Reviews",
  description:
    "What patients say about Shree Hari Dental Care in Nikol, Ahmedabad and Dhrangadhra — gentle, painless, honest dentistry. Read our Google reviews.",
  path: "/testimonials",
  keywords: ["dentist reviews Ahmedabad", "best dentist in Nikol", "dentist in Dhrangadhra", "painless dental treatment"],
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient testimonials"
        title="Trust, earned one appointment at a time"
        description="Nothing means more to us than our patients' comfort and confidence. Here's what they say — and where you can read their reviews yourself."
        breadcrumbs={[{ label: "Patient Testimonials" }]}
        aside={<GoogleSummary />}
      />

      <section className="section-y pt-6" aria-label="Patient comments">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.quote} t={t} index={i} />
            ))}
          </div>
          <SampleNotice />
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="review-us">
        <div className="container-page max-w-4xl text-center">
          <p className="eyebrow justify-center">Share your experience</p>
          <h2 id="review-us" className="font-display mt-4 text-[clamp(2rem,1.3rem+2.6vw,3.2rem)] leading-[1.08] text-primary-800">
            Been to Shree Hari Dental Care? Tell others about it
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            An honest review on Google helps other families choose a dentist with confidence — and helps us keep improving.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {branches.map((b) => (
              <ButtonLink key={b.slug} href={b.mapsUrl} variant="outline" size="lg">
                Review {b.shortName} on Google <ArrowUpRight className="size-5" aria-hidden="true" />
              </ButtonLink>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner className="pt-16 sm:pt-24" />
    </>
  );
}
