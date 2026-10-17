import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DentalIcon } from "@/components/icons/dental-icons";
import { treatmentHref, type Treatment } from "@/data/treatments";
import { cn } from "@/lib/cn";

/** Card for one treatment speciality (the /treatments index). `featured` renders the deep navy version. */
export function TreatmentCard({
  treatment: t,
  index = 0,
  featured = false,
  className,
}: {
  treatment: Treatment;
  index?: number;
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={treatmentHref(t)}
      style={{ "--i": index % 3 } as CSSProperties}
      className={cn(
        "reveal group relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 transition-[box-shadow,translate] duration-300 hover:-translate-y-1 sm:p-8",
        featured
          ? "bg-primary-900 text-white shadow-card hover:shadow-lift [--icon-accent:var(--color-accent-300)]"
          : "border border-line bg-white hover:shadow-card",
        className,
      )}
    >
      {featured && (
        <>
          <span className="glow absolute -right-24 -top-28 -z-10 size-80 [--glow:rgb(58_116_192/0.5)]" aria-hidden="true" />
          <span className="grain-layer -z-10" aria-hidden="true" />
        </>
      )}
      <span
        className={cn(
          "grid size-16 place-items-center rounded-2xl transition-colors duration-300",
          featured ? "bg-white/10 text-white" : "bg-accent-50 text-primary-700 group-hover:bg-primary-700 group-hover:text-white group-hover:[--icon-accent:var(--color-accent-300)]",
        )}
      >
        <DentalIcon name={t.icon} size={40} />
      </span>
      <h3 className={cn("font-display mt-6 text-[1.7rem] leading-tight", featured ? "text-white" : "text-primary-900")}>{t.title}</h3>
      <p className={cn("mt-3 flex-1 text-[0.98rem] leading-relaxed", featured ? "text-primary-200" : "text-muted")}>{t.summary}</p>
      <span className={cn("mt-7 inline-flex items-center gap-1.5 text-sm font-bold", featured ? "text-accent-300" : "text-accent-700")}>
        Explore
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
