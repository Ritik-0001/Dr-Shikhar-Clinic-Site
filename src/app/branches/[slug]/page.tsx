import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { GoogleRating } from "@/components/branches/branch-card";
import { MapEmbed } from "@/components/branches/map-embed";
import { OpenNow } from "@/components/branches/open-now";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { DentalIcon } from "@/components/icons/dental-icons";
import { FaqList } from "@/components/sections/faq-list";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { branches, directionsUrl, getBranch, type Branch } from "@/data/branches";
import { site } from "@/data/site";
import { treatmentHref, treatments, type Faq } from "@/data/treatments";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { dentistJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

const place = (b: Branch) => (b.city === b.area ? b.city : `${b.area}, ${b.city}`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBranch(slug);
  if (!b) return {};
  const isAhmedabad = b.city === "Ahmedabad";
  return pageMetadata({
    title: `Dentist in ${place(b)}`,
    description: `Shree Hari Dental Care, ${b.fullAddress}. Open Monday–Saturday, 9–1 & 4–8. Check-ups, root canal, dental implants, braces & clear aligners, whitening and more. Call ${b.phone.display}.`,
    path: `/branches/${b.slug}`,
    keywords: isAhmedabad
      ? ["Best Dentist in Nikol", "Dentist in Ahmedabad", "Dental Clinic Ahmedabad", "Dental Implants Ahmedabad", "Root Canal Treatment Ahmedabad"]
      : ["Dentist in Dhrangadhra", "Dental clinic Dhrangadhra", "Dentist in Surendranagar district", "Painless Dental Treatment"],
  });
}

const branchFaqs = (b: Branch): Faq[] => [
  {
    q: `What are the timings of the ${b.shortName} clinic?`,
    a: `The ${b.shortName} clinic is open ${site.hours.label}, ${site.hours.sessions.map((s) => s.display).join(" and ")}. It is closed on ${site.hours.closedLabel}s.`,
  },
  {
    q: `Where is the ${b.shortName} clinic?`,
    a: `${b.fullAddress}. Landmark: ${b.landmark}. Google Plus Code: ${b.plusCode}. Use the "Get Directions" button on this page for turn-by-turn navigation.`,
  },
  {
    q: `How do I book an appointment at the ${b.shortName} clinic?`,
    a: `Use the online appointment form, message the clinic on WhatsApp at ${b.phone.display}, or call the same number. Booking ahead means dedicated time for you and less waiting.`,
  },
];

export default async function BranchPage({ params }: Props) {
  const { slug } = await params;
  const b = getBranch(slug);
  if (!b) notFound();
  const faqs = branchFaqs(b);
  const others = branches.filter((o) => o.slug !== b.slug);

  return (
    <>
      <PageHero
        eyebrow={b.tagline}
        title={`Dentist in ${place(b)}`}
        description={b.intro}
        breadcrumbs={[{ label: "Branch Locator", href: "/branches" }, { label: b.shortName }]}
        actions={
          <>
            <ButtonLink href={`/appointment?branch=${b.slug}`} size="lg">
              Book at {b.shortName} <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={directionsUrl(b)} variant="outline" size="lg">
              <Navigation className="size-5" aria-hidden="true" /> Get Directions
            </ButtonLink>
          </>
        }
      />

      <section className="section-y pt-4" aria-label={`${b.shortName} clinic details`}>
        <div className="container-page grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-8">
          <div className="rounded-[2rem] border border-line bg-white p-7 shadow-card sm:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <OpenNow />
              <GoogleRating branch={b} />
            </div>
            <ul className="mt-7 grid gap-5 text-[1.02rem] text-ink-soft">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
                <div>
                  <p className="font-bold text-primary-900">Address</p>
                  <address className="mt-1 not-italic leading-relaxed">{b.fullAddress}</address>
                  <p className="mt-1 text-sm text-muted">
                    Landmark: {b.landmark} · Plus Code: {b.plusCode}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
                <div>
                  <p className="font-bold text-primary-900">Phone &amp; WhatsApp</p>
                  <a href={telUrl(b)} className="mt-1 inline-block text-lg font-bold text-primary-700 hover:text-accent-600">
                    {b.phone.display}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
                <div>
                  <p className="font-bold text-primary-900">Clinic hours</p>
                  <p className="mt-1 leading-relaxed">
                    {site.hours.label}
                    <br />
                    {site.hours.sessions.map((s) => `${s.name}: ${s.display}`).join(" · ")}
                  </p>
                  <p className="text-sm text-muted">{site.hours.closedLabel}: Closed</p>
                </div>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <ButtonLink href={telUrl(b)} variant="secondary">
                <Phone className="size-4" aria-hidden="true" /> Call now
              </ButtonLink>
              <ButtonLink href={whatsappUrl(b.phone.whatsapp, `Hello ${site.name} (${b.shortName}), I'd like to book an appointment.`)} variant="whatsapp">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </ButtonLink>
              <ButtonLink href={b.mapsUrl} variant="outline">
                Open in Google Maps
              </ButtonLink>
            </div>
          </div>

          <div className="min-h-80 overflow-hidden rounded-[2rem] border border-line bg-primary-50 shadow-card lg:min-h-[28rem]">
            <MapEmbed branch={b} autoLoad />
          </div>
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="branch-treatments">
        <div className="container-page">
          <SectionHeading
            eyebrow={`Treatments in ${b.area}`}
            title={<span id="branch-treatments">Complete dental care in {place(b)}</span>}
            description="Eleven dental specialities, explained in plain language. Please confirm the availability of a specific procedure when you book."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {treatments.map((t) => (
              <li key={t.slug}>
                <Link href={treatmentHref(t)} className="group flex h-full items-center gap-4 rounded-3xl border border-line bg-white p-5 shadow-soft transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-700">
                    <DentalIcon name={t.icon} size={34} />
                  </span>
                  <span>
                    <span className="block font-bold text-primary-900">{t.title}</span>
                    <span className="mt-0.5 block text-sm text-muted">{t.tagline}</span>
                  </span>
                  <ArrowRight className="ml-auto size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-600" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="getting-here">
        <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Getting here" title={<span id="getting-here">Easy to reach from across {b.area === "Nikol" ? "east Ahmedabad" : "the area"}</span>} />
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Our clinic is at {b.landmark} — convenient for people in {b.serves.slice(0, -1).join(", ")}
              {b.serves.length > 1 ? " and " : ""}
              {b.serves[b.serves.length - 1]}.
            </p>
            {others.map((o) => (
              <p key={o.slug} className="mt-6 text-[0.98rem] text-muted">
                Looking for our other clinic?{" "}
                <Link href={`/branches/${o.slug}`} className="font-bold text-primary-700 hover:text-accent-600">
                  Visit {o.shortName}
                </Link>
                .
              </p>
            ))}
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBanner className="pt-0" />
      <JsonLd data={[dentistJsonLd(b), faqJsonLd(faqs)]} />
    </>
  );
}
