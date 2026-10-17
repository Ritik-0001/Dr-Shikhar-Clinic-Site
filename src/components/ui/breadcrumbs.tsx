import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

/** Visible breadcrumb trail + BreadcrumbList structured data. The first crumb is always Home. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.label} className="flex items-center gap-1.5">
                {c.href && !last ? (
                  <Link href={c.href} className="rounded-md hover:text-primary-700 hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={last ? "font-semibold text-ink-soft" : undefined}>
                    {c.label}
                  </span>
                )}
                {!last && <ChevronRight className="size-3.5 text-muted/70" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(trail.map((c, i) => ({ name: c.label, path: i === trail.length - 1 ? undefined : c.href })))} />
    </>
  );
}
