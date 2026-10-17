"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronsLeftRight } from "lucide-react";

type Props = {
  before: ReactNode;
  after: ReactNode;
  /** Accessible description, e.g. "Teeth whitening" */
  label: string;
  className?: string;
};

/**
 * Before/after comparison. A native range input sits on top, so dragging, touch and keyboard arrow
 * keys all work out of the box and the control is announced properly by screen readers.
 */
export function BeforeAfterSlider({ before, after, label, className }: Props) {
  const [pos, setPos] = useState(58); // a little more of "before" so the problem is visible at first glance
  const id = useId();
  return (
    <div className={`group relative aspect-[16/10] select-none overflow-hidden rounded-3xl bg-primary-50 ${className ?? ""}`}>
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-primary-900/85 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">After</span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(17_48_92/0.25)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-primary-800 shadow-lift ring-1 ring-line transition-transform group-hover:scale-105">
          <ChevronsLeftRight className="size-5" aria-hidden="true" />
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        Before and after comparison: {label}. Use the arrow keys or drag to reveal the result.
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% before, ${100 - pos}% after`}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
