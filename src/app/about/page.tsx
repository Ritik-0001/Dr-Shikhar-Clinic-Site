import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/ui/cta-banner";
import { Logo } from "@/components/ui/logo";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, sterilization, technology, values } from "@/data/content";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Shree Hari Dental Care is a modern multispeciality dental clinic offering ethical, painless and evidence-based treatment with advanced technology and strict sterilization — in Nikol, Ahmedabad and Dhrangadhra, Gujarat.",
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
      <section className="section-y pt-6" aria-labelledby="story">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our story" title={<span id="story">Preventive, patient-first dentistry for Gujarat</span>} />
            <div className="mt-6 grid gap-5 text-lg leading-relaxed text-muted">
              {about.paragraphs.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                Shree Hari Dental Care is a <strong className="font-semibold text-ink-soft">{site.parentCompany}</strong> company, with clinics in{" "}
                <strong className="font-semibold text-ink-soft">Nikol, Ahmedabad</strong> and <strong className="font-semibold text-ink-soft">Dhrangadhra</strong>.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/doctors" variant="secondary" size="lg">
                Meet our doctors
              </ButtonLink>
              <ButtonLink href="/branches" variant="outline" size="lg">
                Find a clinic
              </ButtonLink>
            </div>
          </div>

          <div className="relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br from-primary-50 via-white to-primary-50 p-8 shadow-card ring-1 ring-line sm:p-12">
            <div className="bg-dots absolute inset-0 -z-10 opacity-40" />
            <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-8">
              <Logo variant="stacked-gujarati" height={190} alt={`${site.name} (Gujarati logo)`} />
              <span className="hidden h-32 w-px bg-line sm:block" aria-hidden="true" />
              <Logo variant="stacked-english" height={165} alt={`${site.name} (English logo)`} />
            </div>
            <p className="mt-8 text-center text-sm text-muted">Our identity in Gujarati and English</p>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="section-y bg-surface" aria-label="Vision and mission">
        <div className="container-page grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="reveal relative isolate overflow-hidden rounded-[2rem] bg-primary-900 p-8 text-white sm:p-12">
            <div
              className="absolute inset-0 -z-10"
              style={{ backgroundImage: "radial-gradient(60% 55% at 100% 0%, color-mix(in oklab, var(--color-primary-500) 50%, transparent), transparent 70%), radial-gradient(40% 50% at 0% 100%, color-mix(in oklab, var(--color-accent-600) 35%, transparent), transparent 70%)" }}
              aria-hidden="true"
            />
            <p className="eyebrow text-accent-300">Our vision</p>
            <p className="font-display mt-5 text-[clamp(1.7rem,1.1rem+1.8vw,2.5rem)] leading-[1.2]">{about.vision}</p>
          </div>
          <div className="reveal rounded-[2rem] border border-line bg-white p-8 shadow-card sm:p-10" style={{ "--i": 1 } as CSSProperties}>
            <p className="eyebrow">Our mission</p>
            <ul className="mt-6 grid gap-4">
              {about.mission.map((m) => (
                <li key={m} className="flex items-center gap-3.5 text-[1.05rem] font-semibold text-ink-soft">
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
          <SectionHeading align="center" eyebrow="Core values" title={<span id="values">What we stand for</span>} description="Seven principles guide every decision — from how we plan treatment to how we welcome you at the front desk." />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, text, icon: Icon }, i) => (
              <li
                key={title}
                style={{ "--i": i % 4 } as CSSProperties}
                className={cn(
                  "reveal rounded-3xl border border-line p-7 shadow-soft",
                  i === 0 ? "bg-linear-to-br from-primary-700 to-primary-900 text-white sm:col-span-2 [--icon-accent:#fff]" : "bg-white",
                )}
              >
                <span className={cn("grid size-14 place-items-center rounded-2xl", i === 0 ? "bg-white/15 text-white" : "bg-accent-50 text-accent-600")}>
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className={cn("mt-6 font-bold", i === 0 ? "text-2xl" : "text-xl text-primary-900")}>{title}</h3>
                <p className={cn("mt-2.5 leading-relaxed", i === 0 ? "text-lg text-primary-100" : "text-[0.98rem] text-muted")}>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="section-y scroll-mt-28 bg-surface" aria-labelledby="tech-heading">
        <div className="container-page">
          <SectionHeading eyebrow="Technology & equipment" title={<span id="tech-heading">Advanced tools that make dentistry gentler</span>} description="We invest in modern equipment because it means more accurate diagnosis, shorter treatments and a more comfortable experience for you." />
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {technology.map(({ title, text, icon: Icon }, i) => (
              <li key={title} style={{ "--i": i % 2 } as CSSProperties} className="reveal flex gap-5 rounded-3xl border border-line bg-white p-6 shadow-soft">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-700">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-primary-900">{title}</h3>
                  <p className="mt-1.5 text-[0.98rem] leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sterilization */}
      <section id="sterilization" className="section-y relative isolate scroll-mt-28 overflow-hidden bg-primary-950 text-white" aria-labelledby="steril-heading">
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundImage: "radial-gradient(50% 50% at 100% 0%, color-mix(in oklab, var(--color-primary-600) 38%, transparent), transparent 70%), radial-gradient(40% 40% at 0% 100%, color-mix(in oklab, var(--color-accent-600) 26%, transparent), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="container-page">
          <SectionHeading
            tone="dark"
            eyebrow="Sterilization protocol"
            title={<span id="steril-heading">Safety you can see, at every step</span>}
            description="International-standard sterilization is one of our core commitments. Here's exactly how we protect every patient, every time."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sterilization.map(({ title, text, icon: Icon }, i) => (
              <li key={title} style={{ "--i": i % 3 } as CSSProperties} className="reveal rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
                <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-accent-300">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold leading-snug">{title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-primary-200">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner className="pt-16 sm:pt-24" />
    </>
  );
}
