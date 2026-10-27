import { Star } from "lucide-react";
import type { Branch } from "@/data/branches";

export function GoogleRating({ branch }: { branch: Branch }) {
  return (
    <a
      href={branch.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[0.8125rem] font-semibold text-ink-soft ring-1 ring-line hover:bg-surface-2"
    >
      <Star className="size-4 fill-amber-500 text-amber-500" aria-hidden="true" />
      <span className="font-bold text-ink">{branch.google.rating.toFixed(1)}</span>
      <span>· {branch.google.reviews} Google reviews</span>
    </a>
  );
}
