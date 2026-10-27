import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { del, list, put } from "@vercel/blob";
import { emptyState, type CmsState } from "./types";

/**
 * Where the admin panel keeps what it saves (blog posts, photo choices and the photos themselves).
 *  - Vercel Blob (production): used automatically when BLOB_READ_WRITE_TOKEN is set (create a Blob store in the Vercel dashboard).
 *  - Local files (development): `.data/` in the project, so the panel works with no setup on your own computer.
 *  - Neither: the site still works, the admin just shows a "connect storage" notice.
 * Every saved version of the content is its own file, so a published page never reads a half-written one.
 */
export type StorageKind = "blob" | "local" | "none";

export const storageKind = (): StorageKind => {
  if (process.env.BLOB_READ_WRITE_TOKEN) return "blob";
  if (process.env.NODE_ENV !== "production") return "local";
  return "none";
};

const PREFIX = "shdc/";
const LOCAL_DIR = path.join(process.cwd(), ".data");
export const LOCAL_UPLOADS = path.join(LOCAL_DIR, "uploads");

const normalise = (raw: unknown): CmsState => {
  const s = (raw ?? {}) as Partial<CmsState>;
  return {
    photos: s.photos && typeof s.photos === "object" ? s.photos : {},
    posts: Array.isArray(s.posts) ? s.posts : [],
    updatedAt: s.updatedAt ?? null,
  };
};

/* ------------------------------------------------------------------ state */

async function readBlobState(): Promise<CmsState> {
  const { blobs } = await list({ prefix: `${PREFIX}state-` });
  const latest = blobs.map((b) => b).sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
  if (!latest) return emptyState();
  const res = await fetch(latest.url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Could not read content (${res.status})`);
  return normalise(await res.json());
}

export async function readStateRaw(): Promise<CmsState> {
  const kind = storageKind();
  try {
    if (kind === "blob") return await readBlobState();
    if (kind === "local") return normalise(JSON.parse(await readFile(path.join(LOCAL_DIR, "content.json"), "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code !== "ENOENT") console.error("[cms] read failed:", error);
  }
  return emptyState();
}

export async function writeState(next: CmsState): Promise<void> {
  const kind = storageKind();
  const state = { ...next, updatedAt: new Date().toISOString() };
  const json = JSON.stringify(state, null, 2);
  if (kind === "local") {
    await mkdir(LOCAL_DIR, { recursive: true });
    const tmp = path.join(LOCAL_DIR, `content.${process.pid}.tmp`);
    await writeFile(tmp, json, "utf8");
    await rename(tmp, path.join(LOCAL_DIR, "content.json"));
    return;
  }
  if (kind === "blob") {
    const name = `${PREFIX}state-${String(Date.now()).padStart(15, "0")}.json`;
    await put(name, json, { access: "public", contentType: "application/json", addRandomSuffix: false, allowOverwrite: false });
    // keep the three newest versions as a safety net, remove the rest
    const { blobs } = await list({ prefix: `${PREFIX}state-` });
    const old = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname)).slice(3);
    if (old.length) await del(old.map((b) => b.url)).catch(() => undefined);
    return;
  }
  throw new Error("Storage is not connected. Add a Vercel Blob store to this project (see the admin dashboard).");
}

/* ----------------------------------------------------------------- images */

export type ImageKind = "jpg" | "png" | "webp";
const MIME: Record<ImageKind, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

/** Identify an image by its first bytes (never trust the file name or the browser-supplied type). */
export function sniffImage(bytes: Uint8Array): ImageKind | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  if (bytes.length > 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP") return "webp";
  return null;
}

export const mimeFor = (ext: string) => MIME[ext as ImageKind] ?? "application/octet-stream";

export async function saveImage(bytes: Uint8Array, kind: ImageKind, folder: string): Promise<string> {
  const id = `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
  const rel = `${folder}/${id}.${kind}`;
  const storage = storageKind();
  if (storage === "blob") {
    const blob = await put(`${PREFIX}${rel}`, Buffer.from(bytes), { access: "public", contentType: MIME[kind], addRandomSuffix: false });
    return blob.url;
  }
  if (storage === "local") {
    const file = path.join(LOCAL_UPLOADS, rel);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, bytes);
    return `/media/${rel}`;
  }
  throw new Error("Storage is not connected.");
}

export async function deleteImage(src: string | undefined): Promise<void> {
  if (!src) return;
  try {
    if (src.startsWith("/media/")) {
      const file = path.join(LOCAL_UPLOADS, src.slice("/media/".length));
      if (file.startsWith(LOCAL_UPLOADS)) await rm(file, { force: true });
    } else if (/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i.test(src)) {
      await del(src);
    }
  } catch (error) {
    console.error("[cms] could not delete image:", error);
  }
}
