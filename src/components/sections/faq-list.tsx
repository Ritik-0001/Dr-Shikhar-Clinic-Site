import { Plus } from "lucide-react";
import { InlineText } from "@/components/ui/inline-text";
import type { Faq } from "@/data/treatments";
import { cn } from "@/lib/cn";

/**
 * Accessible accordion built on native <details>/<summary>: keyboard and screen-reader friendly,
 * works without JavaScript, and animates open in browsers that support ::details-content.
 */
export function FaqList({ faqs, className, name }: { faqs: Faq[]; className?: string; name?: string }) {
  return (
    <div className={cn("faq grid gap-3", className)}>
      {faqs.map((f) => (
        <details key={f.q} name={name} className="group rounded-2xl border border-line bg-white shadow-soft open:border-primary-300 open:shadow-card">
          <summary className="flex min-h-16 items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-[1.05rem] font-semibold leading-snug text-primary-900 sm:px-6">
            {f.q}
            <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700 transition-[transform,background-color,color] duration-300">
              <Plus className="size-5" aria-hidden="true" />
            </span>
          </summary>
          <div className="px-5 pb-6 pr-14 text-[1.02rem] leading-relaxed text-muted sm:px-6 sm:pr-16 [&_a]:font-semibold [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-accent-600">
            <InlineText text={f.a} />
          </div>
        </details>
      ))}
    </div>
  );
}
