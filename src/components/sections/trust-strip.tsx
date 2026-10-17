import { Star } from "lucide-react";
import { trustStats } from "@/data/content";

/** At-a-glance facts, overlapping the bottom of the hero. All numbers derive from the data files. */
export function TrustStrip() {
  return (
    <section aria-label="At a glance" className="relative z-10 -mt-12 sm:-mt-16">
      <div className="container-page">
        <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-white shadow-card md:grid-cols-4">
          {trustStats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse gap-1 px-6 py-6 sm:px-8 sm:py-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line md:border-t-0" : ""} ${i > 0 ? "md:border-l md:border-line" : ""}`}
            >
              <dt className="text-sm font-medium text-muted">{s.label}</dt>
              <dd className="font-display flex items-center gap-1.5 text-[2.6rem] leading-none text-primary-700 sm:text-5xl">
                {s.value.replace("★", "")}
                {s.value.includes("★") && <Star className="size-7 fill-amber-400 text-amber-400" aria-label="stars" />}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
