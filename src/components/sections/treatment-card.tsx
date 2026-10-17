import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DentalIcon } from "@/components/icons/dental-icons";
import { treatmentHref, type Treatment } from "@/data/treatments";

/** Card for one treatment speciality. Used on the home page and the /treatments index. */
export function TreatmentCard({ treatment: t, index = 0 }: { treatment: Treatment; index?: number }) {
  return (
    <Link
      href={treatmentHref(t)}
      style={{ "--i": index % 4 } as CSSProperties}
      className="reveal group relative flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lift sm:p-7"
    >
      <span className="grid size-16 place-items-center rounded-2xl bg-primary-50 text-primary-700 transition-colors duration-300 group-hover:bg-primary-700 group-hover:text-white group-hover:[--icon-accent:var(--color-accent-300)]">
        <DentalIcon name={t.icon} size={40} />
      </span>
      <h3 className="mt-6 text-xl font-bold leading-snug text-primary-900">{t.title}</h3>
      <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-muted">{t.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-accent-600">
        Explore
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
