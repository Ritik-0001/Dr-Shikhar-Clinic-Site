import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { SmileIllustration, type SmileCase } from "@/components/illustrations/smile-illustration";
import { BeforeAfterSlider } from "@/components/sections/before-after-slider";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/ui/cta-banner";
import { PageHero } from "@/components/ui/page-hero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Smile Gallery: Before & After",
  description:
    "See what teeth whitening, gap closure, braces and clear aligners, chip repair and dental implants can do. Drag the sliders to compare before and after at Shree Hari Dental Care, Ahmedabad & Dhrangadhra.",
  path: "/smile-gallery",
  keywords: ["smile design Ahmedabad", "teeth whitening Ahmedabad", "before and after dental", "clear aligners Ahmedabad"],
});

const cases: { kind: SmileCase; title: string; text: string; href: string; link: string }[] = [
  { kind: "whitening", title: "Teeth whitening", text: "Stains lifted and the natural shade brightened, for a fresher, more youthful smile.", href: "/treatments/cosmetic-dentistry", link: "Cosmetic dentistry" },
  { kind: "gap", title: "Gap (diastema) closure", text: "A space between the front teeth closed with tooth-coloured bonding.", href: "/treatments/cosmetic-dentistry", link: "Cosmetic dentistry" },
  { kind: "alignment", title: "Braces & clear aligners", text: "Crowded and rotated teeth guided gradually into a straight, even line.", href: "/treatments/orthodontics", link: "Orthodontics" },
  { kind: "chip", title: "Chip repair with bonding", text: "A chipped front tooth rebuilt to its natural shape and shade, often in a single visit.", href: "/treatments/cosmetic-dentistry", link: "Cosmetic dentistry" },
  { kind: "missing", title: "Dental implant & crown", text: "A missing tooth replaced with an implant-supported crown that matches its neighbours.", href: "/dental-implants", link: "Dental implants" },
  { kind: "makeover", title: "Complete smile makeover", text: "Whitening and alignment combined into one natural-looking transformation, planned around your face.", href: "/treatments/cosmetic-dentistry", link: "Smile design" },
];

export default function SmileGalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Smile gallery"
        title="See what a confident smile can look like"
        description="Drag the slider on each example to compare before and after. Every smile is different. Your dentist will plan what's right for you."
        breadcrumbs={[{ label: "Smile Gallery" }]}
      />

      <section className="section-y pt-4 sm:pt-6" aria-label="Before and after examples">
        <div className="container-page">
          <p className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-[0.98rem] leading-relaxed text-amber-950">
            <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <span>
              <strong>Illustrative examples.</strong> These drawings show the kind of change each treatment can make. Real patient cases are added to this gallery only with the patient&apos;s consent, and individual results always vary.
            </span>
          </p>

          <ul className="grid gap-8 md:grid-cols-2">
            {cases.map((c, i) => (
              <li
                key={c.kind}
                style={{ "--i": i % 2 } as CSSProperties}
                className="reveal rounded-[1.75rem] border border-line bg-white p-3 sm:rounded-[2rem] sm:p-5"
              >
                <BeforeAfterSlider
                  label={c.title}
                  before={<SmileIllustration kind={c.kind} state="before" className="size-full" />}
                  after={<SmileIllustration kind={c.kind} state="after" className="size-full" />}
                />
                <div className="px-2 pb-2 pt-5 sm:px-3">
                  <h2 className="text-xl font-bold text-primary-900">{c.title}</h2>
                  <p className="mt-1.5 text-[0.98rem] leading-relaxed text-muted">{c.text}</p>
                  <Link href={c.href} className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm font-bold text-accent-700 hover:underline">
                    About {c.link.toLowerCase()} <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-surface" aria-label="Plan your smile">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div>
            <p className="eyebrow">Your smile, your plan</p>
            <h2 className="font-display mt-4 text-[clamp(1.9rem,1.3rem+2.4vw,3rem)] leading-[1.12] tracking-[-0.03em] text-primary-900">A smile designed around you, not a template</h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-muted sm:text-lg">
              We start with a conversation about what you&apos;d like to change, examine your teeth and gums, and then show you the options, the timeline and the cost, before anything begins.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end [&>*]:max-sm:w-full">
            <ButtonLink href="/appointment?treatment=cosmetic-dentistry" size="lg">
              Book a smile consultation
            </ButtonLink>
            <ButtonLink href="/treatments" variant="outline" size="lg">
              Explore treatments
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBanner className="pt-16 sm:pt-24" />
    </>
  );
}
