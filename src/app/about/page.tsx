import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Logo } from "@/components/ui/logo";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, values, whyChooseUs } from "@/data/content";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Shree Hari Dental Care is a modern multispeciality dental clinic offering ethical, painless and evidence-based treatment with advanced technology and strict sterilization, in Nikol, Ahmedabad and Dhrangadhra, Gujarat.",
  path: "/about",
  keywords: ["multispeciality dental clinic Gujarat", "dental clinic Ahmedabad", "affordable dental clinic Ahmedabad", "painless dental treatment"],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Shree Hari Dental Care"
        title={about.headline}
        description={about.paragraphs[0]}
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Story */}
      <section className="section-y pt-6 sm:pt-8" aria-labelledby="story">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our story" title={<span id="story">Preventive, patient-first dentistry for Gujarat</span>} />
            <div className="mt-6 grid gap-5 text-[1.05rem] leading-relaxed text-muted sm:text-lg">
              {about.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                Shree Hari Dental Care is a <strong className="font-bold text-ink-soft">{site.parentCompany}</strong> company, with clinics in{" "}
                <strong className="font-bold text-ink-soft">Nikol, Ahmedabad</strong> and <strong className="font-bold text-ink-soft">Dhrangadhra</strong>.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row [&>*]:max-sm:w-full">
              <ButtonLink href="/doctors" variant="secondary" size="lg">
                Meet our doctors
              </ButtonLink>
              <ButtonLink href="/branches" variant="outline" size="lg">
                Find a clinic
              </ButtonLink>
            </div>
          </div>

          <div className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-white p-8 sm:p-12">
            <span className="glow absolute -right-24 -top-24 -z-10 size-72 [--glow:rgb(236_205_150/0.5)]" aria-hidden="true" />
            <span className="glow absolute -bottom-28 -left-20 -z-10 size-72 [--glow:rgb(246_205_188/0.7)]" aria-hidden="true" />
            <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-8">
              <Logo variant="stacked-gujarati" height={170} alt={`${site.name} (Gujarati logo)`} />
              <span className="hidden h-32 w-px bg-line sm:block" aria-hidden="true" />
              <Logo variant="stacked-english" height={150} alt={`${site.name} (English logo)`} />
            </div>
            <p className="mt-8 text-center text-sm text-muted">Our identity in Gujarati and English</p>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="section-y bg-surface" aria-label="Vision and mission">
        <div className="container-page grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:gap-6">
          <div className="reveal relative isolate overflow-hidden rounded-[2rem] bg-primary-950 p-8 text-white sm:p-12">
            <span className="glow absolute -right-24 -top-28 -z-10 size-80 [--glow:rgb(58_116_192/0.45)]" aria-hidden="true" />
            <span className="glow absolute -bottom-32 -left-20 -z-10 size-80 [--glow:rgb(195_38_47/0.28)]" aria-hidden="true" />
            <span className="grain-layer -z-10" aria-hidden="true" />
            <p className="eyebrow text-accent-300">Our vision</p>
            <p className="font-display mt-5 text-[clamp(1.5rem,1.1rem+1.6vw,2.2rem)] font-semibold leading-[1.3] tracking-[-0.02em]">{about.vision}</p>
          </div>
          <div className="reveal rounded-[2rem] border border-line bg-white p-8 sm:p-10" style={{ "--i": 1 } as CSSProperties}>
            <p className="eyebrow">Our mission</p>
            <ul className="mt-6 grid gap-4">
              {about.mission.map((m) => (
                <li key={m} className="flex items-center gap-3.5 text-[1.05rem] font-bold text-ink-soft">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y" aria-labelledby="values">
        <div className="container-page">
          <SectionHeading align="center" eyebrow="Core values" title={<span id="values">What we stand for</span>} description="Seven principles guide every decision, from how we plan treatment to how we welcome you at the front desk." />
          <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {values.map(({ title, text, icon: Icon }, i) => (
              <li
                key={title}
                style={{ "--i": i % 4 } as CSSProperties}
                className={cn(
                  "reveal relative isolate overflow-hidden rounded-3xl p-5 sm:p-7",
                  i === 0 ? "bg-primary-900 text-white sm:col-span-2" : "flex items-start gap-4 border border-line bg-white sm:block",
                )}
              >
                {i === 0 && <span className="glow absolute -right-20 -top-24 -z-10 size-72 [--glow:rgb(58_116_192/0.5)]" aria-hidden="true" />}
                <span className={cn("grid shrink-0 place-items-center rounded-2xl", i === 0 ? "size-14 bg-white/10 text-white" : "size-12 bg-accent-50 text-accent-600 sm:size-14")}>
                  <Icon className="size-6 sm:size-7" aria-hidden="true" />
                </span>
                <div>
                  <h3 className={cn(i === 0 ? "font-display mt-6 text-3xl" : "text-lg font-bold leading-snug text-primary-900 sm:mt-6 sm:text-xl")}>{title}</h3>
                  <p className={cn("leading-relaxed", i === 0 ? "mt-2.5 text-lg text-primary-100" : "mt-1.5 text-[0.98rem] text-muted sm:mt-2.5")}>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-y bg-surface" aria-labelledby="why-heading">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Why choose us" title={<span id="why-heading">Ten reasons patients trust Shree Hari</span>} />
            <ButtonLink href="/technology" variant="outline" className="self-start lg:self-auto">
              Technology &amp; Safety <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-14">
            {whyChooseUs.map(({ title, text }) => (
              <li key={title} className="flex gap-4 border-b border-line py-6">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-snug text-primary-900">{title}</h3>
                  <p className="mt-1 text-[0.98rem] leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner className="pt-16 sm:pt-24" />
    </>
  );
}
