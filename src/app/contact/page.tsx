import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import { BranchCard } from "@/components/branches/branch-card";
import { MessageForm } from "@/components/forms/message-form";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { branches } from "@/data/branches";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Shree Hari Dental Care. Call, WhatsApp or visit our clinics in Nikol, Ahmedabad and Dhrangadhra. Open Monday to Saturday, 9 AM to 1 PM and 4 to 8 PM.",
  path: "/contact",
  keywords: ["dentist in Ahmedabad", "dentist in Dhrangadhra", "dental clinic Ahmedabad contact"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We'd love to hear from you"
        description="Call, message on WhatsApp or drop in. Choose the clinic closest to you. We're open Monday to Saturday."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <section className="section-y pt-4 sm:pt-6">
        <h2 className="sr-only">Our clinics</h2>
        <div className="container-page grid gap-5 sm:gap-6 lg:grid-cols-2">
          {branches.map((b, i) => (
            <BranchCard key={b.slug} branch={b} index={i} />
          ))}
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="message-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Send a message" title={<span id="message-heading">Ask us anything</span>} description="Tell us how we can help and which clinic you'd like to reach. Your message opens in WhatsApp, ready to send." />
            <div className="mt-9 rounded-[1.75rem] border border-line bg-white p-5 sm:rounded-[2rem] sm:p-9">
              <MessageForm />
            </div>
          </div>

          <aside className="grid content-start gap-5" aria-label="More ways to reach us">
            <div className="rounded-3xl border border-line bg-white p-7">
              <h2 className="flex items-center gap-2.5 text-lg font-bold text-primary-900">
                <Clock className="size-5 text-accent-600" aria-hidden="true" /> Clinic hours
              </h2>
              <dl className="mt-5 grid gap-3 text-[0.98rem]">
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="font-semibold text-ink-soft">{site.hours.label}</dt>
                  <dd className="text-right text-muted">
                    {site.hours.sessions.map((s) => (
                      <span key={s.name} className="block">
                        {s.display}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-ink-soft">{site.hours.closedLabel}</dt>
                  <dd className="text-muted">Closed</dd>
                </div>
              </dl>
            </div>

            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-6 transition-shadow hover:shadow-card"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-accent-600 to-primary-700 text-white">
                <InstagramIcon className="size-7" />
              </span>
              <span>
                <span className="block font-bold text-primary-900">Follow us on Instagram</span>
                <span className="block text-muted group-hover:text-accent-700">@{site.instagram.handle}</span>
              </span>
            </a>

            {site.email && (
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-3xl border border-line bg-white p-6 transition-shadow hover:shadow-card">
                <span className="grid size-14 place-items-center rounded-2xl bg-accent-50 text-primary-700">
                  <Mail className="size-7" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-primary-900">Email us</span>
                  <span className="block text-muted">{site.email}</span>
                </span>
              </a>
            )}

            <p className="rounded-3xl bg-primary-950 p-7 text-[0.98rem] leading-relaxed text-primary-100">
              <strong className="block font-display text-2xl font-normal text-white">Dental emergency?</strong>
              Call your nearest clinic during opening hours and tell us it&apos;s urgent. We&apos;ll do our best to see you as soon as possible.
            </p>
          </aside>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${site.name}`,
          url: absoluteUrl("/contact"),
          mainEntity: branches.map((b) => ({ "@id": absoluteUrl(`/branches/${b.slug}#dentist`) })),
        }}
      />
    </>
  );
}
