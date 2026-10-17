import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { branches } from "@/data/branches";
import { site } from "@/data/site";
import { telUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a Dental Appointment",
  description:
    "Book an appointment at Shree Hari Dental Care in Nikol, Ahmedabad or Dhrangadhra. Choose your clinic, treatment and preferred time — we'll confirm on WhatsApp. Open Monday to Saturday.",
  path: "/appointment",
  keywords: ["dentist in Ahmedabad", "dentist in Dhrangadhra", "book dentist appointment Ahmedabad"],
});

const next = [
  { title: "Send your request", text: "Fill in the short form. It opens WhatsApp with your details ready for the clinic." },
  { title: "We confirm your slot", text: "The clinic team replies on WhatsApp to confirm a time — or to suggest the nearest alternative." },
  { title: "Visit us", text: "Arrive a few minutes early. Bring any previous dental records or X-rays if you have them." },
];

export default function AppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointment booking"
        title="Book your visit"
        description="Tell us a little about what you need and when suits you — the clinic team will confirm your slot on WhatsApp."
        breadcrumbs={[{ label: "Book Appointment" }]}
      />

      <section className="section-y pt-4" aria-label="Appointment request">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:gap-14">
          <div className="rounded-[2rem] border border-line bg-white p-6 shadow-card sm:p-10">
            <AppointmentForm />
          </div>

          <aside className="grid content-start gap-6" aria-label="Before you book">
            <div className="rounded-3xl bg-surface p-7 ring-1 ring-line">
              <h2 className="font-display text-3xl leading-tight text-primary-800">What happens next</h2>
              <ol className="mt-6 grid gap-5">
                {next.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-700 text-sm font-bold text-white">{i + 1}</span>
                    <span>
                      <span className="block font-bold text-primary-900">{s.title}</span>
                      <span className="mt-0.5 block text-[0.95rem] leading-relaxed text-muted">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-line bg-white p-7 shadow-soft">
              <h2 className="text-lg font-bold text-primary-900">Prefer to talk?</h2>
              <ul className="mt-4 grid gap-4">
                {branches.map((b) => (
                  <li key={b.slug} className="flex items-start gap-3">
                    <MapPin className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block font-bold text-primary-900">{b.shortName}</span>
                      <a href={telUrl(b)} className="inline-flex items-center gap-1.5 font-semibold text-primary-700 hover:text-accent-600">
                        <Phone className="size-4" aria-hidden="true" /> {b.phone.display}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-3 border-t border-line pt-5 text-[0.95rem] text-muted">
                <Clock className="mt-0.5 size-5 shrink-0 text-accent-600" aria-hidden="true" />
                <span>
                  {site.hours.label}
                  <br />
                  {site.hours.sessions.map((s) => s.display).join(" · ")}
                  <br />
                  {site.hours.closedLabel}: Closed
                </span>
              </p>
            </div>

            <ButtonLink href="/faqs" variant="outline" className="justify-self-start">
              Read common questions
            </ButtonLink>
          </aside>
        </div>
      </section>
    </>
  );
}
