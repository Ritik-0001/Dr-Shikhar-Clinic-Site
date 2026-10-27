"use server";

import { redirect } from "next/navigation";
import { posts as builtInPosts } from "@/data/blog";
import { getPhotoSlot } from "@/data/photos";
import { treatments, type DentalIconName } from "@/data/treatments";
import { authConfigured, checkPassword, endSession, requireAdmin, startSession } from "@/lib/cms/auth";
import { getStateFresh, revalidateSite } from "@/lib/cms/content";
import { slugify } from "@/lib/cms/markdown";
import { deleteImage, writeState } from "@/lib/cms/store";
import type { CoverTone, StoredPost } from "@/lib/cms/types";

export type FormState = { ok: boolean; message: string; slug?: string };

const TONES: CoverTone[] = ["blue", "red", "navy", "sky"];
const ICONS: DentalIconName[] = ["general", "preventive", "restorative", "rootcanal", "prostho", "implant", "cosmetic", "ortho", "surgery", "pediatric", "perio", "tooth"];
const IMAGE_URL = /^(\/media\/[\w./-]+|https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\/[\w./%-]+)$/i;

const text = (f: FormData, key: string) => String(f.get(key) ?? "").trim();
const todayIST = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());

/* ------------------------------------------------------------------- auth */

export async function login(_prev: { error: string } | null, formData: FormData): Promise<{ error: string }> {
  if (!authConfigured()) return { error: "The admin password has not been set up yet." };
  if (!checkPassword(String(formData.get("password") ?? ""))) {
    await new Promise((resolve) => setTimeout(resolve, 900)); // slows down guessing
    return { error: "That password is not right. Please try again." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

/* ------------------------------------------------------------------ posts */

export async function savePost(_prev: FormState | null, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const fail = (message: string): FormState => ({ ok: false, message });

  const title = text(formData, "title");
  const excerpt = text(formData, "excerpt");
  const body = String(formData.get("body") ?? "").replace(/\r\n?/g, "\n").trim();
  const status = text(formData, "status") === "published" ? "published" : "draft";
  const originalSlug = text(formData, "originalSlug");
  const date = /^\d{4}-\d{2}-\d{2}$/.test(text(formData, "date")) ? text(formData, "date") : todayIST();

  if (!title) return fail("Please give the post a title.");
  if (title.length > 140) return fail("The title is a little long. Please keep it under 140 characters.");
  if (status === "published") {
    if (!excerpt) return fail("Add a short summary before publishing. It shows on the blog list and in Google.");
    if (body.length < 80) return fail("The article is very short. Write a few sentences before publishing.");
  }
  if (excerpt.length > 320) return fail("The summary is too long. Please keep it under 320 characters.");

  const slug = slugify(text(formData, "slug") || title);
  if (!slug) return fail("The web address (slug) needs some letters or numbers.");
  if (builtInPosts.some((p) => p.slug === slug)) return fail("That web address is already used by one of the built-in articles. Please change it.");

  const coverImage = text(formData, "coverImage");
  if (coverImage && !IMAGE_URL.test(coverImage)) return fail("The cover photo could not be used. Please upload it again.");
  const tone = text(formData, "coverTone") as CoverTone;
  const icon = text(formData, "coverIcon") as DentalIconName;
  const treatment = text(formData, "treatment");

  const state = await getStateFresh();
  if (state.posts.some((p) => p.slug === slug && p.slug !== originalSlug)) return fail("Another post already uses that web address. Please change it.");

  const existing = state.posts.find((p) => p.slug === originalSlug);
  const now = new Date().toISOString();
  const post: StoredPost = {
    slug,
    title,
    excerpt,
    category: text(formData, "category").slice(0, 40) || "Guides",
    date,
    status,
    body,
    keywords: text(formData, "keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
      .slice(0, 12),
    coverTone: TONES.includes(tone) ? tone : "blue",
    coverIcon: ICONS.includes(icon) ? icon : "tooth",
    coverImage: coverImage || undefined,
    coverAlt: text(formData, "coverAlt").slice(0, 160) || undefined,
    treatment: treatments.some((t) => t.slug === treatment) ? treatment : undefined,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  try {
    if (existing?.coverImage && existing.coverImage !== post.coverImage) await deleteImage(existing.coverImage);
    await writeState({ ...state, posts: [post, ...state.posts.filter((p) => p.slug !== originalSlug && p.slug !== slug)] });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Saving did not work. Please try again.");
  }
  revalidateSite();
  return { ok: true, slug, message: status === "published" ? "Published. It is now live on the blog." : "Saved as a draft. It is not on the website yet." };
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const slug = text(formData, "slug");
  const state = await getStateFresh();
  const post = state.posts.find((p) => p.slug === slug);
  if (post) {
    await deleteImage(post.coverImage);
    await writeState({ ...state, posts: state.posts.filter((p) => p.slug !== slug) });
    revalidateSite();
  }
  redirect("/admin/posts?deleted=1");
}

/* ----------------------------------------------------------------- photos */

export async function removePhoto(slotId: string): Promise<FormState> {
  await requireAdmin();
  if (!getPhotoSlot(slotId)) return { ok: false, message: "Unknown photo." };
  const state = await getStateFresh();
  const entry = state.photos[slotId];
  if (!entry) return { ok: true, message: "Nothing to remove." };
  const { [slotId]: _removed, ...rest } = state.photos;
  void _removed;
  await writeState({ ...state, photos: rest });
  await deleteImage(entry.src);
  revalidateSite();
  return { ok: true, message: "Photo removed. The site is showing its default artwork again." };
}

export async function setPhotoAlt(slotId: string, alt: string): Promise<FormState> {
  await requireAdmin();
  const state = await getStateFresh();
  const entry = state.photos[slotId];
  if (!entry) return { ok: false, message: "Upload a photo first." };
  await writeState({ ...state, photos: { ...state.photos, [slotId]: { ...entry, alt: alt.trim().slice(0, 160) } } });
  revalidateSite();
  return { ok: true, message: "Description saved." };
}
