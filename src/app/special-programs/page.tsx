import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { MessageForm } from "@/components/forms/message-form";
import { ProgramsGrid } from "@/components/sections/programs-grid";
import { CtaBanner } from "@/components/ui/cta-banner";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Special Programs: Dental Camps, School & Corporate Programs",
  description:
    "Free dental consultation days, oral cancer screening camps, school dental check-up programs, dental awareness programs and corporate dental camps by Shree Hari Dental Care, Ahmedabad & Dhrangadhra.",
  path: "/special-programs",
  keywords: ["oral cancer screening camp Ahmedabad", "school dental check-up", "corporate dental camp", "free dental consultation Ahmedabad"],
});

const steps = [
  { title: "Tell us what you need", text: "Share the type of program, your group and roughly how many people will take part." },
  { title: "We plan it together", text: "We agree a date, venue and format that suits your school, workplace or community." },
  { title: "We come to you", text: "Our dental team runs the session on site: screening, check-ups or an awareness talk." },
];

export default function SpecialProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Special programs"
        title="Taking dental health beyond the clinic"
        description="Prevention works best when it reaches people early. We run free consultation days, screening camps and awareness programs for schools, workplaces and neighbourhoods."
        breadcrumbs={[{ label: "Special Programs" }]}
      />

      <ProgramsGrid intro={false} className="pt-4 sm:pt-6" />

      <section className="section-y" aria-labelledby="how-camps">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="How it works" title={<span id="how-camps">Arranging a program is simple</span>} />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} style={{ "--i": i } as CSSProperties} className="reveal rounded-3xl border border-line bg-white p-7">
                <span className="font-display grid size-12 place-items-center rounded-full bg-primary-900 text-xl text-white">{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold text-primary-900">{s.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="request" className="section-y scroll-mt-28 bg-surface" aria-labelledby="request-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Request a program"
            title={<span id="request-heading">Bring a camp to your school or workplace</span>}
            description="Fill in a few details and your request opens in WhatsApp, ready to send to the nearest clinic. We'll get back to you to plan the rest."
          />
          <div className="rounded-[1.75rem] border border-line bg-white p-5 sm:rounded-[2rem] sm:p-9">
            <MessageForm variant="camp" submitLabel="Send request on WhatsApp" />
          </div>
        </div>
      </section>

      <CtaBanner className="pt-16 sm:pt-24" />
    </>
  );
}
