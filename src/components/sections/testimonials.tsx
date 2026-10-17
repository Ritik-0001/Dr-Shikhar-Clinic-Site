import type { CSSProperties } from "react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { branches } from "@/data/branches";
import { googleThemes, testimonials, type Testimonial } from "@/data/testimonials";

export function Stars({ count = 5, className = "size-4" }: { count?: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={`${className} fill-amber-400 text-amber-400`} aria-hidden="true" />
      ))}
    </span>
  );
}

export function TestimonialCard({ t, index = 0 }: { t: Testimonial; index?: number }) {
  return (
    <figure style={{ "--i": index % 3 } as CSSProperties} className="reveal relative flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft">
      {t.sample && (
        <span className="absolute right-5 top-5 rounded-full bg-amber-100 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-amber-900">
          Sample
        </span>
      )}
      <Quote className="size-9 fill-accent-100 text-accent-200" aria-hidden="true" />
      <div className="mt-3">
        <Stars count={t.rating} />
      </div>
      <blockquote className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-ink-soft">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-700 text-base font-bold text-white" aria-hidden="true">
          {t.name[0]}
        </span>
        <span>
          <span className="block font-bold text-ink">{t.name}</span>
          <span className="block text-sm text-muted">
            {t.treatment} · {t.branch}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export const hasSampleReviews = testimonials.some((t) => t.sample);

export function SampleNotice() {
  if (!hasSampleReviews) return null;
  return (
    <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
      Comments marked <strong className="font-semibold text-amber-900">Sample</strong> are placeholder text used to preview the design. They are replaced with
      real patient feedback before launch.
    </p>
  );
}

/** Google rating summary — links to each branch's real Google listing, where the genuine reviews live. */
export function GoogleSummary() {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-4">
        <span className="font-display text-6xl leading-none text-primary-700">5.0</span>
        <div>
          <Stars className="size-5" />
          <p className="mt-1 text-sm font-semibold text-ink-soft">Rated on Google</p>
        </div>
      </div>
      <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-muted">Patients mention</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {googleThemes.map((theme) => (
          <li key={theme} className="rounded-full bg-primary-50 px-3.5 py-1.5 text-sm font-semibold text-primary-800">
            {theme}
          </li>
        ))}
      </ul>
      <ul className="mt-6 grid gap-2.5 border-t border-line pt-5">
        {branches.map((b) => (
          <li key={b.slug}>
            <a
              href={b.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl px-1 py-1 text-[0.95rem] font-semibold text-primary-800 hover:text-accent-600"
            >
              <span>
                {b.shortName} · {b.google.rating.toFixed(1)} <span className="font-normal text-muted">({b.google.reviews} reviews)</span>
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-accent-600">
                Read on Google <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-y bg-surface" aria-labelledby="testimonials-heading">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Patient stories"
            title={<span id="testimonials-heading">Comfortable, honest care — in our patients&apos; words</span>}
            description="Trust is earned one appointment at a time. See what patients say about their experience at Shree Hari Dental Care."
          />
          <GoogleSummary />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.quote} t={t} index={i} />
          ))}
        </div>
        <SampleNotice />
      </div>
    </section>
  );
}
