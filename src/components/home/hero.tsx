import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Heart, Star } from "lucide-react";
import { OpenNow } from "@/components/branches/open-now";
import { ButtonLink } from "@/components/ui/button";
import { branches } from "@/data/branches";
import { photos } from "@/data/photos";
import { site } from "@/data/site";

const totalReviews = branches.reduce((n, b) => n + b.google.reviews, 0);
const rating = (branches.reduce((n, b) => n + b.google.rating * b.google.reviews, 0) / totalReviews).toFixed(1);

/** Hand-drawn style underline for the accent phrase */
function Underline() {
  return (
    <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-[0.2em] left-0 h-[0.26em] w-full text-accent-300" aria-hidden="true">
      <path d="M3 9c40-8 90-9 147-5s103 6 147-1" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* atmosphere: two big, soft warm glows that fade out before the section edge */}
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" aria-hidden="true">
        <span className="glow absolute -right-44 -top-48 size-[46rem] [--glow:rgb(236_205_150/0.5)]" />
        <span className="glow absolute -left-60 top-1/3 size-[36rem] [--glow:rgb(246_205_188/0.8)]" />
      </div>

      <div className="container-page grid items-center gap-10 pb-14 pt-8 sm:pb-20 sm:pt-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-10 lg:pb-28 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-[0.6875rem] font-extrabold uppercase tracking-[0.16em] text-primary-800 sm:text-xs">
            <Heart className="size-3.5 fill-accent-600 text-accent-600" aria-hidden="true" />
            Multispeciality dental clinic · Ahmedabad &amp; Dhrangadhra
          </p>

          <h1 className="font-display mt-6 text-[clamp(2.6rem,1.4rem+5vw,5.1rem)] leading-[1.07] tracking-[-0.032em] [word-spacing:0.06em] text-primary-900">
            {site.taglineParts[0]}{" "}
            <span className="relative inline-block text-accent-600">
              {site.taglineParts[1]}
              <Underline />
            </span>{" "}
            {site.taglineParts[2]}
          </h1>

          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted sm:text-lg">
            Ethical, painless, evidence-based dentistry with advanced technology, at our clinics in{" "}
            <strong className="font-bold text-ink-soft">Nikol, Ahmedabad</strong> and <strong className="font-bold text-ink-soft">Dhrangadhra</strong>.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row [&>*]:max-sm:w-full">
            <ButtonLink href="/appointment" size="lg">
              <CalendarCheck className="size-5" aria-hidden="true" /> Book Appointment
            </ButtonLink>
            <ButtonLink href="/treatments" variant="outline" size="lg">
              Explore Treatments <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.95rem] font-semibold text-ink-soft">
            <li className="flex items-center gap-2">
              <Star className="size-[1.05rem] fill-amber-500 text-amber-500" aria-hidden="true" />
              {rating} · {totalReviews} Google reviews
            </li>
            <li>
              <OpenNow />
            </li>
          </ul>
        </div>

        {/* Brand arch */}
        <div className="relative mx-auto w-full max-w-[14.5rem] sm:max-w-[24rem] lg:max-w-[28rem]">
          <div className="relative aspect-[4/5]">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[2rem] bg-accent-200/70 sm:translate-x-4 sm:translate-y-4" aria-hidden="true" />
            <div className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-t-[999px] rounded-b-[2rem] border border-primary-900/15 sm:-translate-x-4 sm:-translate-y-4" aria-hidden="true" />

            <div className="relative isolate size-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-primary-950 shadow-lift">
              {photos.hero ? (
                <Image src={photos.hero} alt="Shree Hari Dental Care" fill sizes="(min-width: 1024px) 28rem, 70vw" className="object-cover" preload />
              ) : (
                <>
                  <span className="glow absolute -right-24 -top-24 -z-10 size-72 [--glow:rgb(58_116_192/0.55)]" aria-hidden="true" />
                  <span className="glow absolute -bottom-24 -left-20 -z-10 size-72 [--glow:rgb(195_38_47/0.3)]" aria-hidden="true" />
                  <span className="grain-layer -z-10" aria-hidden="true" />
                  {/* concentric arches echo the logo's tooth outline */}
                  <svg viewBox="0 0 400 500" className="absolute inset-0 size-full text-white/15" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                    <path d="M52 500V200a148 148 0 0 1 296 0v300" />
                    <path d="M92 500V204a108 108 0 0 1 216 0v296" />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center pb-8">
                    <Image
                      src="/brand/emblem-reversed.svg"
                      alt="Shree Hari Dental Care emblem"
                      width={555}
                      height={705}
                      unoptimized
                      loading="eager"
                      fetchPriority="high"
                      className="h-auto w-[44%]"
                    />
                  </div>
                  <p className="absolute inset-x-0 bottom-6 text-center text-[0.625rem] font-extrabold uppercase tracking-[0.3em] text-white/70 sm:text-xs">
                    Healthy teeth · Happy life
                  </p>
                </>
              )}
            </div>

            <div className="enter absolute -right-3 top-[16%] hidden items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-card sm:flex sm:-right-8" style={{ "--i": 2 } as CSSProperties}>
              <span className="grid size-9 place-items-center rounded-full bg-accent-100 text-accent-700">
                <Heart className="size-[1.1rem]" aria-hidden="true" />
              </span>
              <span className="text-sm font-extrabold leading-tight text-primary-900">
                Painless &amp;
                <br />
                ethical care
              </span>
            </div>
            <div className="enter absolute -left-3 bottom-[14%] flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-card sm:-left-8" style={{ "--i": 3 } as CSSProperties}>
              <Star className="size-6 fill-amber-500 text-amber-500" aria-hidden="true" />
              <span className="text-sm font-extrabold leading-tight text-primary-900">
                {rating} on Google
                <span className="block text-xs font-semibold text-muted">{totalReviews} patient reviews</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
