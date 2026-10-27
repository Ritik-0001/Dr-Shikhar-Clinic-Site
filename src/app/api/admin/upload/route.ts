import { NextResponse } from "next/server";
import { getPhotoSlot } from "@/data/photos";
import { isAdmin } from "@/lib/cms/auth";
import { getStateFresh, revalidateSite } from "@/lib/cms/content";
import { deleteImage, saveImage, sniffImage, storageKind, writeState } from "@/lib/cms/store";

export const runtime = "nodejs";
const MAX_BYTES = 4 * 1024 * 1024; // the browser shrinks photos first; this is a safety limit (Vercel allows 4.5 MB)

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

/** Upload one image. With `slot` it becomes that photo on the site; with `folder=blog` it only returns the address (blog covers). */
export async function POST(request: Request) {
  if (!(await isAdmin())) return fail("Please sign in again.", 401);
  if (storageKind() === "none") return fail("Storage is not connected yet. Add a Vercel Blob store to the project.", 503);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("The photo could not be read. Please try again.");
  }
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) return fail("Choose a photo to upload.");
  if (file.size > MAX_BYTES) return fail("That photo is too large. Please choose one under 4 MB.", 413);

  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(bytes);
  if (!kind) return fail("Please upload a JPG, PNG or WebP photo.", 415);

  const slotId = String(form.get("slot") ?? "");
  try {
    if (!slotId) {
      const src = await saveImage(bytes, kind, "blog");
      return NextResponse.json({ src });
    }
    const slot = getPhotoSlot(slotId);
    if (!slot) return fail("Unknown photo position.");

    const src = await saveImage(bytes, kind, "photos");
    const state = await getStateFresh();
    const previous = state.photos[slotId];
    await writeState({ ...state, photos: { ...state.photos, [slotId]: { src, alt: previous?.alt ?? "" } } });
    if (previous?.src) await deleteImage(previous.src);
    revalidateSite();
    return NextResponse.json({ src });
  } catch (error) {
    console.error("[admin upload]", error);
    return fail(error instanceof Error ? error.message : "The upload did not work. Please try again.", 500);
  }
}
