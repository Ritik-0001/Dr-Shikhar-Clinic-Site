"use client";

import { useState } from "react";
import { MapPin, MousePointerClick } from "lucide-react";
import { mapEmbedUrl, type Branch } from "@/data/branches";
import { cn } from "@/lib/cn";

/** Abstract street-map artwork shown until the visitor asks for the live Google map. */
function MapFacadeArt() {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
      <rect width="400" height="260" fill="#e9f1fb" />
      <path d="M-10 190 C80 150 120 230 210 200 S340 120 420 150 V270 H-10Z" fill="#dbe8f7" />
      <rect x="258" y="34" width="110" height="64" rx="16" fill="#d3ecdc" />
      <rect x="30" y="40" width="70" height="46" rx="10" fill="#f4f8fd" />
      <rect x="130" y="30" width="86" height="60" rx="10" fill="#f4f8fd" />
      <rect x="40" y="130" width="90" height="56" rx="10" fill="#f4f8fd" />
      <rect x="260" y="140" width="100" height="70" rx="10" fill="#f4f8fd" />
      <g stroke="#fff" strokeLinecap="round" fill="none">
        <path d="M-10 108 H410" strokeWidth="14" />
        <path d="M232 -10 V270" strokeWidth="14" />
        <path d="M-10 238 C120 190 260 250 410 196" strokeWidth="10" />
        <path d="M118 -10 V270" strokeWidth="8" />
        <path d="M-10 60 H410" strokeWidth="6" />
      </g>
      <g transform="translate(232 108)">
        <circle r="30" fill="#c3262f" opacity="0.14" />
        <circle r="16" fill="#c3262f" opacity="0.22" />
        <path d="M0 -26c-10 0-18 8-18 18 0 14 18 30 18 30s18-16 18-30c0-10-8-18-18-18Z" fill="#c3262f" />
        <circle cy="-8" r="6.5" fill="#fff" />
      </g>
    </svg>
  );
}

type Props = {
  branch: Branch;
  /** Load the live map immediately (still lazy-loaded by the browser) instead of waiting for a click */
  autoLoad?: boolean;
  className?: string;
};

/**
 * Google map for a branch. By default it's a lightweight facade: no Google scripts load until the
 * visitor taps "Show interactive map", which keeps pages fast. Uses Google's official keyless embed.
 */
export function MapEmbed({ branch, autoLoad = false, className }: Props) {
  const [loaded, setLoaded] = useState(autoLoad);

  return (
    <div className={cn("relative size-full min-h-64 overflow-hidden bg-primary-50", className)}>
      {loaded ? (
        <iframe
          title={`Map showing ${branch.listingName}`}
          src={mapEmbedUrl(branch)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setLoaded(true)} className="group absolute inset-0 grid size-full cursor-pointer place-items-end text-left">
          <MapFacadeArt />
          <span className="relative m-4 flex w-[calc(100%-2rem)] items-center justify-between gap-3 rounded-2xl bg-white/95 p-3 pl-4 shadow-card ring-1 ring-line backdrop-blur-sm transition-shadow group-hover:shadow-lift">
            <span className="flex min-w-0 items-center gap-2.5">
              <MapPin className="size-5 shrink-0 text-accent-600" aria-hidden="true" />
              <span className="truncate text-sm font-bold text-primary-900">{branch.area}, {branch.city === branch.area ? "Gujarat" : branch.city}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-700 px-3.5 py-2 text-xs font-bold text-white">
              <MousePointerClick className="size-3.5" aria-hidden="true" /> Show map
            </span>
            <span className="sr-only">Loads the interactive Google map for {branch.listingName}</span>
          </span>
        </button>
      )}
    </div>
  );
}
