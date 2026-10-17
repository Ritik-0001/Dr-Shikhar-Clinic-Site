import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { DentalIcon } from "@/components/icons/dental-icons";
import { BookingCard } from "@/components/sections/booking-card";
import { FaqList } from "@/components/sections/faq-list";
import { ProcedureList } from "@/components/sections/procedure-list";
import { StepsTimeline } from "@/components/sections/steps-timeline";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { branches } from "@/data/branches";
import { getPost } from "@/data/blog";
import { getTreatment, treatmentHref, treatmentPages, treatments } from "@/data/treatments";
import { absoluteUrl } from "@/lib/contact";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { plainAnswer } from "@/data/faqs";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return treatmentPages.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return pageMetadata({ title: t.seo.title, description: t.seo.description, path: `/treatments/${t.slug}`, keywords: t.seo.keywords });
}

const heading = "font-display text-[clamp(1.8rem,1.3rem+1.9vw,2.45rem)] leading-[1.15] text-primary-900";

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t || t.href) notFound();

  const related = (t.relatedPosts ?? []).map(getPost).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = treatments.filter((o) => o.slug !== t.slug);

  return (
    <>
      <PageHero
        eyebrow="Nikol, Ahmedabad & Dhrangadhra"
        title={t.title}
        description={t.summary}
        breadcrumbs={[{ label: "Treatments", href: "/treatments" }, { label: t.title }]}
        aside={
          <div className="hidden justify-self-end lg:block" aria-hidden="true">
            <div className="relative aspect-[4/5] w-60">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[2rem] bg-accent-200/70" />
              <div className="relative isolate grid size-full place-items-center overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-primary-950 text-white shadow-lift [--icon-accent:var(--color-accent-300)]">
                <span className="glow absolute -right-16 -top-20 -z-10 size-64 [--glow:rgb(58_116_192/0.55)]" />
                <span className="glow absolute -bottom-24 -left-16 -z-10 size-64 [--glow:rgb(195_38_47/0.3)]" />
                <span className="grain-layer -z-10" />
                <svg viewBox="0 0 400 500" className="absolute inset-0 -z-10 size-full text-white/15" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M52 500V200a148 148 0 0 1 296 0v300" />
                  <path d="M92 500V204a108 108 0 0 1 216 0v296" />
                </svg>
                <span className="mt-10">
                  <DentalIcon name={t.icon} size={120} strokeWidth={1.8} />
                </span>
              </div>
            </div>
          </div>
        }
        actions={
          <>
            <ButtonLink href={`/appointment?treatment=${t.slug}`} size="lg">
              Book Appointment <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/treatments" variant="outline" size="lg">
              All treatments
            </ButtonLink>
          </>
        }
      />

      <div className="container-page grid gap-12 pb-16 pt-4 sm:pb-24 lg:grid-cols-[1fr_22rem] lg:gap-14">
        <div className="grid min-w-0 gap-16">
          <section aria-labelledby="overview">
            <h2 id="overview" className={heading}>
              About {t.title.toLowerCase()}
            </h2>
            <p className="mt-5 max-w-3xl text-[1.15rem] leading-[1.8] text-ink-soft">{t.lead}</p>
          </section>

          <section aria-labelledby="included">
            <h2 id="included" className={heading}>
              What&apos;s included
            </h2>
            <p className="mt-3 max-w-2xl text-muted">The procedures we offer within {t.title.toLowerCase()}, and what each one does for you.</p>
            <div className="mt-7">
              <ProcedureList procedures={t.procedures} />
            </div>
          </section>

          <section aria-labelledby="goodfor" className="rounded-[2rem] bg-surface p-6 sm:p-10">
            <h2 id="goodfor" className={heading}>
              Is this right for you?
            </h2>
            <p className="mt-3 text-muted">Consider a visit if any of these sound familiar:</p>
            <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {t.goodFor.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[1rem] font-semibold leading-snug text-ink-soft">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="expect">
            <h2 id="expect" className={heading}>
              What to expect
            </h2>
            <p className="mt-3 max-w-2xl text-muted">Every treatment starts with a conversation and a clear plan. Here&apos;s how it usually goes.</p>
            <div className="mt-8">
              <StepsTimeline steps={t.steps} />
            </div>
          </section>

          <section aria-labelledby="faqs">
            <h2 id="faqs" className={heading}>
              Questions about {t.title.toLowerCase()}
            </h2>
            <FaqList faqs={t.faqs} className="mt-7" />
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related">
              <h2 id="related" className={heading}>
                Related reading
              </h2>
              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                {related.map((p, i) => (
                  <BlogCard key={p.slug} post={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="grid content-start gap-6 lg:sticky lg:top-28 lg:self-start">
          <BookingCard treatment={t.slug} title={`Book ${t.title.toLowerCase()}`} />
          <nav aria-label="Other treatments" className="rounded-[1.75rem] border border-line bg-white p-6">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">Other treatments</h2>
            <ul className="mt-4 grid gap-1">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={treatmentHref(o)} className="flex items-center gap-3 rounded-xl px-2 py-2 text-[0.95rem] font-semibold text-primary-800 transition-colors hover:bg-surface hover:text-accent-700">
                    <span className="text-primary-700">
                      <DentalIcon name={o.icon} size={24} />
                    </span>
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <CtaBanner className="pt-0" />

      <JsonLd
        data={[
          faqJsonLd(t.faqs.map((f) => ({ q: f.q, a: plainAnswer(f.a) }))),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: t.title,
            serviceType: t.title,
            description: t.seo.description,
            url: absoluteUrl(`/treatments/${t.slug}`),
            provider: branches.map((b) => ({ "@id": absoluteUrl(`/branches/${b.slug}#dentist`) })),
            areaServed: ["Nikol", "Ahmedabad", "Dhrangadhra", "Gujarat"].map((name) => ({ "@type": "Place", name })),
          },
        ]}
      />
    </>
  );
}
