import type { Metadata } from "next";
import { Info, TriangleAlert } from "lucide-react";
import { PhotoCard } from "@/components/admin/photo-card";
import { photoGroups, photoSlots } from "@/data/photos";
import { getStateFresh } from "@/lib/cms/content";
import { storageKind } from "@/lib/cms/store";

export const metadata: Metadata = { title: "Photos" };

export default async function PhotosPage() {
  const state = await getStateFresh();
  const canSave = storageKind() !== "none";

  return (
    <div>
      <p className="eyebrow">Photos</p>
      <h1 className="font-display mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.6rem)] leading-tight text-primary-900">Website photos</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Each card is a place on your website. Upload a photo, or drag one onto a card, and it appears on the site straight away. Photos are resized automatically, so you can upload straight from your phone.
      </p>

      {!canSave && (
        <p role="alert" className="mt-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-[0.95rem] leading-relaxed text-amber-950">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" /> Storage is not connected yet, so uploads are switched off. See the dashboard for the one-minute setup.
        </p>
      )}
      <p className="mt-6 flex gap-3 rounded-2xl bg-surface p-4 text-sm leading-relaxed text-muted">
        <Info className="mt-0.5 size-5 shrink-0 text-primary-700" aria-hidden="true" />
        Only upload photos you own or have permission to use. Patient photos need the patient&apos;s written consent.
      </p>

      {photoGroups.map((group) => {
        const slots = photoSlots.filter((s) => s.group === group);
        if (!slots.length) return null;
        return (
          <section key={group} className="mt-10" aria-labelledby={`g-${group}`}>
            <h2 id={`g-${group}`} className="text-sm font-extrabold uppercase tracking-[0.16em] text-muted">
              {group}
            </h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {slots.map((slot) => (
                <PhotoCard key={slot.id} slot={slot} entry={state.photos[slot.id]} canSave={canSave} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
