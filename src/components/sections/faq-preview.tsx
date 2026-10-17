import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeFaqs } from "@/data/faqs";
import { FaqList } from "./faq-list";

export function FaqPreview() {
  return (
    <section className="section-y bg-surface" aria-labelledby="faq-heading">
      <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="Questions, answered"
            title={<span id="faq-heading">Everything you wanted to ask your dentist</span>}
            description="Quick answers about timings, comfort, safety and cost. Can't find yours? Just ask — we're happy to help."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/faqs" variant="secondary">
              All FAQs <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              <MessageCircleQuestion className="size-4" aria-hidden="true" /> Ask a question
            </ButtonLink>
          </div>
        </div>
        <FaqList faqs={homeFaqs} name="home-faq" />
      </div>
    </section>
  );
}
