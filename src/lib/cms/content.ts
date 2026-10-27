import { cache } from "react";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { posts as builtInPosts, type Post } from "@/data/blog";
import { getPhotoSlot } from "@/data/photos";
import { parseBody, readingMinutes } from "./markdown";
import { readStateRaw, storageKind } from "./store";
import type { CmsState, StoredPost } from "./types";

/**
 * Read side of the CMS, used by the public pages. Blob reads are cached (and refreshed the moment the admin
 * saves); local reads are plain file reads. This never throws: if storage is empty or unreachable the site
 * simply shows its built-in content.
 */
const cachedBlobState = unstable_cache(readStateRaw, ["shdc-cms-state"], { tags: ["cms"], revalidate: 900 });

export const getState = cache(async (): Promise<CmsState> => {
  try {
    return storageKind() === "blob" ? await cachedBlobState() : await readStateRaw();
  } catch (error) {
    console.error("[cms] falling back to built-in content:", error);
    return { photos: {}, posts: [], updatedAt: null };
  }
});

/** Fresh read for the admin screens (never cached). */
export const getStateFresh = readStateRaw;

/** Tell the site that content changed, so pages rebuild on their next visit. */
export function revalidateSite() {
  revalidateTag("cms", { expire: 0 });
  revalidatePath("/", "layout");
}

/* ----------------------------------------------------------------- photos */

export type SitePhoto = { src: string; alt: string };

export async function getPhoto(slotId: string): Promise<SitePhoto | null> {
  const entry = (await getState()).photos[slotId];
  if (!entry?.src) return null;
  return { src: entry.src, alt: entry.alt || getPhotoSlot(slotId)?.alt || "" };
}

/* ------------------------------------------------------------------ posts */

export function toPost(sp: StoredPost): Post {
  return {
    slug: sp.slug,
    title: sp.title,
    excerpt: sp.excerpt,
    category: sp.category,
    date: sp.date,
    readMinutes: readingMinutes(sp.body),
    keywords: sp.keywords,
    cover: { icon: sp.coverIcon, tone: sp.coverTone, image: sp.coverImage, imageAlt: sp.coverAlt },
    treatment: sp.treatment,
    blocks: parseBody(sp.body),
  };
}

/** Built-in posts plus published posts from the admin, newest first. */
export async function getAllPosts(): Promise<Post[]> {
  const stored = (await getState()).posts.filter((p) => p.status === "published").map(toPost);
  const slugs = new Set(stored.map((p) => p.slug));
  return [...stored, ...builtInPosts.filter((p) => !slugs.has(p.slug))].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return (await getAllPosts()).find((p) => p.slug === slug);
}
