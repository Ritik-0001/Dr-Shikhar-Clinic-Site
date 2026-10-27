import type { DentalIconName } from "@/data/treatments";

export type CoverTone = "blue" | "red" | "navy" | "sky";

/** A blog post written in the admin panel. `body` is plain text with a few markdown marks (see markdown.ts). */
export type StoredPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** YYYY-MM-DD */
  date: string;
  status: "draft" | "published";
  body: string;
  keywords: string[];
  coverTone: CoverTone;
  coverIcon: DentalIconName;
  /** Optional uploaded cover photo; the brand artwork is used when empty */
  coverImage?: string;
  coverAlt?: string;
  /** treatment slug this post supports (adds an internal link under the article) */
  treatment?: string;
  createdAt: string;
  updatedAt: string;
};

export type PhotoEntry = { src: string; alt: string };

export type CmsState = {
  photos: Record<string, PhotoEntry>;
  posts: StoredPost[];
  updatedAt: string | null;
};

export const emptyState = (): CmsState => ({ photos: {}, posts: [], updatedAt: null });
