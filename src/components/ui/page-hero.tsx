import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  /** Optional content shown to the right on large screens */
  aside?: ReactNode;
  className?: string;
};

/** Shared banner for inner pages: soft brand glow, faint emblem watermark, breadcrumbs, H1. */
export function PageHero({ eyebrow, title, description, breadcrumbs, actions, aside, className }: Props) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-linear-to-b from-primary-50 via-white to-white", className)}>
      <div className="bg-hero-glow absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <span className="emblem-mask absolute right-[3%] top-1/2 -z-10 hidden h-[25rem] -translate-y-1/2 text-primary-700 opacity-[0.06] md:block" aria-hidden="true" />
      <div className="container-page pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-20">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={cn("grid gap-10", !!aside && "lg:grid-cols-[1.15fr_.85fr] lg:items-center")}>
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.4rem,1.4rem+3.8vw,4.4rem)] leading-[1.04] text-primary-800">{title}</h1>
            {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{description}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
