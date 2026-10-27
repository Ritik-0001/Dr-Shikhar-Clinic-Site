"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, ImagePlus, LoaderCircle, Trash2, TriangleAlert, UploadCloud } from "lucide-react";
import { removePhoto, setPhotoAlt } from "@/app/admin/actions";
import type { PhotoSlot } from "@/data/photos";
import { cn } from "@/lib/cn";
import type { PhotoEntry } from "@/lib/cms/types";
import { uploadImage } from "./image-tools";

/** One photo position on the website: preview, upload or replace (click or drop), description, remove. */
export function PhotoCard({ slot, entry, canSave }: { slot: PhotoSlot; entry?: PhotoEntry; canSave: boolean }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<"" | "upload" | "other">("");
  const [drag, setDrag] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [alt, setAlt] = useState(entry?.alt ?? "");
  const [, startTransition] = useTransition();

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy("upload");
    setNote(null);
    try {
      await uploadImage(file, slot.id);
      setNote({ ok: true, text: "Saved. The website is updated." });
      router.refresh();
    } catch (error) {
      setNote({ ok: false, text: error instanceof Error ? error.message : "The upload did not work." });
    } finally {
      setBusy("");
      if (input.current) input.current.value = "";
    }
  }

  const run = (fn: () => Promise<{ ok: boolean; message: string }>) => {
    setBusy("other");
    setNote(null);
    startTransition(async () => {
      const result = await fn();
      setNote({ ok: result.ok, text: result.message });
      setBusy("");
      router.refresh();
    });
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (canSave) setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          if (canSave) void handleFile(e.dataTransfer.files?.[0]);
        }}
        style={{ aspectRatio: slot.ratio }}
        className={cn("relative max-h-72 w-full overflow-hidden bg-surface transition-colors", drag && "bg-accent-50 ring-4 ring-inset ring-accent-300")}
      >
        {entry?.src ? (
          <Image src={entry.src} alt={entry.alt || slot.alt} fill sizes="(min-width: 1024px) 24rem, 100vw" unoptimized className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div>
              <UploadCloud className="mx-auto size-8 text-primary-900/35" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold text-ink-soft">No photo yet</p>
              <p className="text-sm text-muted">The site shows its default artwork</p>
            </div>
          </div>
        )}
        {busy === "upload" && (
          <div className="absolute inset-0 grid place-items-center bg-white/80 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-900">
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> Uploading…
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-bold text-primary-900">{slot.label}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{slot.where}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{slot.hint}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!canSave || busy !== ""}
            onClick={() => input.current?.click()}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-primary-900 px-5 text-sm font-bold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ImagePlus className="size-4" aria-hidden="true" /> {entry?.src ? "Replace photo" : "Upload photo"}
          </button>
          {entry?.src && (
            <button
              type="button"
              disabled={busy !== ""}
              onClick={() => {
                if (window.confirm(`Remove the photo from "${slot.label}"?`)) run(() => removePhoto(slot.id));
              }}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-bold text-accent-700 transition-colors hover:bg-accent-50 disabled:opacity-50"
            >
              <Trash2 className="size-4" aria-hidden="true" /> Remove
            </button>
          )}
          <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" tabIndex={-1} aria-label={`Choose a photo for ${slot.label}`} onChange={(e) => void handleFile(e.target.files?.[0])} />
        </div>

        {entry?.src && (
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              run(() => setPhotoAlt(slot.id, alt));
            }}
          >
            <label className="sr-only" htmlFor={`alt-${slot.id}`}>
              Describe this photo
            </label>
            <input id={`alt-${slot.id}`} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe the photo (helps Google and screen readers)" maxLength={160} className="field !min-h-11 !rounded-xl !py-2 !text-sm" />
            <button type="submit" disabled={busy !== "" || alt === entry.alt} className="h-11 shrink-0 cursor-pointer rounded-xl bg-surface px-4 text-sm font-bold text-primary-900 transition-colors hover:bg-surface-2 disabled:opacity-50">
              Save
            </button>
          </form>
        )}

        <div aria-live="polite" className="min-h-6">
          {note && (
            <p className={cn("mt-3 flex items-start gap-2 text-sm font-bold", note.ok ? "text-emerald-800" : "text-accent-700")}>
              {note.ok ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> : <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
              {note.text}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
