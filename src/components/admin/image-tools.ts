"use client";

const MAX_EDGE = 1800;
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];

/** Shrinks a photo in the browser (max 1800 px, JPEG) so uploads are fast and the site stays quick. */
export async function prepareImage(file: File): Promise<File> {
  if (!ACCEPT.includes(file.type)) throw new Error("Please choose a JPG, PNG or WebP photo.");
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error("That photo could not be opened. Try a different file.");
  });
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser could not prepare the photo.");
  ctx.fillStyle = "#ffffff"; // transparent PNGs get a white background
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.86));
  if (!blob) throw new Error("Your browser could not prepare the photo.");
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}

/** Prepares and uploads a photo. With `slot` it is saved as that site photo; without, only its address comes back. */
export async function uploadImage(file: File, slot?: string): Promise<string> {
  const prepared = await prepareImage(file);
  const body = new FormData();
  body.set("file", prepared);
  if (slot) body.set("slot", slot);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const json = (await res.json().catch(() => ({}))) as { src?: string; error?: string };
  if (!res.ok || !json.src) throw new Error(json.error ?? "The upload did not work. Please try again.");
  return json.src;
}
