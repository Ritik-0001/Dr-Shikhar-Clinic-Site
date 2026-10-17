import type { CSSProperties } from "react";
import { ArrowRight, CalendarCheck, Clock, Heart, MapPin, ScanLine } from "lucide-react";
import { HeroTooth } from "@/components/illustrations/hero-tooth";
import { ButtonLink } from "@/components/ui/button";
import { trustBadges } from "@/data/content";
import { branches } from "@/data/branches";
import { site } from "@/data/site";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

function FloatCard({ className, icon: Icon, title, text, i }: { className: string; icon: typeof Heart; title: string; text: string; i: number }) {
  return (
    <div
      style={delay(i)}
      className={`enter absolute flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-card ring-1 ring-line backdrop-blur-sm max-sm:hidden ${className}`}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm font-bold leading-tight text-ink">{title}</span>
        <span className="mt-0.5 block text-xs leading-tight text-muted">{text}</span>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-hero-glow relative isolate overflow-hidden">
      <div
        className="bg-dots absolute inset-0 -z-10 opacity-40"
        style={{ maskImage: "radial-gradient(55% 60% at 78% 38%, #000, transparent 75%)", WebkitMaskImage: "radial-gradient(55% 60% at 78% 38%, #000, transparent 75%)" }}
        aria-hidden="true"
      />
      <div className="container-page grid items-center gap-14 pb-24 pt-8 sm:pt-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-6 lg:pb-32 lg:pt-14">
        {/* Copy */}
        <div>
          <p className="eyebrow">Multispeciality dental clinic · Ahmedabad &amp; Dhrangadhra</p>
          <h1 className="font-display mt-5 text-[clamp(2.7rem,1.4rem+5vw,5.2rem)] leading-[1.02] text-primary-800">
            {site.taglineParts[0]}
            <span className="block text-accent-600">{site.taglineParts[1]}</span>
            {site.taglineParts[2]}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Ethical, painless, evidence-based dentistry with advanced technology — at our clinics in <strong className="font-semibold text-ink-soft">Nikol, Ahmedabad</strong> and{" "}
            <strong className="font-semibold text-ink-soft">Dhrangadhra</strong>. Because every smile deserves honest care.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/appointment" size="lg">
              <CalendarCheck className="size-5" aria-hidden="true" /> Book Appointment
            </ButtonLink>
            <ButtonLink href="/treatments" variant="outline" size="lg">
              Explore Treatments <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3.5">
            {trustBadges.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2.5 text-[0.95rem] font-semibold text-ink-soft">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[34rem] pt-6" aria-hidden="false">
          <div className="relative aspect-[5/5.5] sm:aspect-[5/6]">
            {/* The arch */}
            <div className="absolute inset-x-[7%] bottom-0 top-[7%] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-linear-to-b from-primary-100 via-primary-50 to-white shadow-lift ring-1 ring-primary-200/70">
              <div className="bg-dots absolute inset-0 opacity-50" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-white to-transparent" />
            </div>

            {/* "Family" motif from the logo: two red, one blue */}
            <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-end gap-2.5" aria-hidden="true">
              <span className="size-[3.4rem] rounded-full bg-accent-600 shadow-[0_10px_24px_-8px_rgb(195_38_47/0.7)]" />
              <span className="mb-1 size-9 rounded-full bg-accent-600 shadow-[0_8px_18px_-8px_rgb(195_38_47/0.7)]" />
              <span className="size-[3.4rem] rounded-full bg-primary-700 shadow-[0_10px_24px_-8px_rgb(22_71_140/0.7)]" />
            </div>

            <HeroTooth className="animate-float absolute left-1/2 top-[16%] w-[66%] -translate-x-1/2 sm:w-[68%]" />

            <FloatCard i={2} icon={Heart} title="Painless & ethical care" text="Gentle technique, honest advice" className="-left-1 top-[40%] sm:-left-8" />
            <FloatCard i={3} icon={ScanLine} title="Digital X-ray diagnosis" text="See exactly what we see" className="-right-1 top-[20%] sm:-right-8" />
            <FloatCard
              i={4}
              icon={MapPin}
              title={`${branches.length} clinics in Gujarat`}
              text={branches.map((b) => b.shortName).join(" · ")}
              className="-right-1 bottom-[9%] sm:-right-6"
            />
            <div
              style={delay(5)}
              className="enter absolute bottom-[4%] left-[6%] hidden items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-xs font-semibold text-white shadow-lift sm:flex"
            >
              <Clock className="size-3.5 text-accent-300" aria-hidden="true" />
              Mon–Sat · 9–1 &amp; 4–8
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
