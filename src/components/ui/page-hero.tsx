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

/** Shared banner for inner pages: calm ivory canvas with a soft warm wash, breadcrumbs, H1. */
export function PageHero({ eyebrow, title, description, breadcrumbs, actions, aside, className }: Props) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div className="bg-hero-glow absolute inset-0 -z-10" aria-hidden="true" />
      {!aside && <span className="emblem-mask absolute right-[7%] top-1/2 -z-10 hidden h-[21rem] -translate-y-1/2 text-primary-900 opacity-[0.045] lg:block" aria-hidden="true" />}
      <div className="container-page pb-10 pt-6 sm:pb-14 sm:pt-10 lg:pb-16">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={cn("grid gap-10", !!aside && "lg:grid-cols-[1.15fr_.85fr] lg:items-center")}>
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.25rem,1.5rem+3.2vw,3.9rem)] leading-[1.08] tracking-[-0.035em] text-primary-900">{title}</h1>
            {description && <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted sm:text-lg">{description}</p>}
            {actions && <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>*]:max-sm:w-full">{actions}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
