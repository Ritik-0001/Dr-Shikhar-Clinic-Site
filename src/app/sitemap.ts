import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/cms/content";
import { branches } from "@/data/branches";
import { treatmentPages } from "@/data/treatments";
import { absoluteUrl } from "@/lib/contact";

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: Entry["changeFrequency"], lastModified: Date = now): Entry => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/appointment", 0.9, "monthly"),
    page("/treatments", 0.9, "monthly"),
    ...treatmentPages.map((t) => page(`/treatments/${t.slug}`, 0.8, "monthly")),
    page("/dental-implants", 0.9, "monthly"),
    page("/branches", 0.8, "monthly"),
    ...branches.map((b) => page(`/branches/${b.slug}`, 0.8, "monthly")),
    page("/about", 0.7, "monthly"),
    page("/doctors", 0.7, "monthly"),
    page("/technology", 0.6, "monthly"),
    page("/contact", 0.7, "yearly"),
    page("/smile-gallery", 0.6, "monthly"),
    page("/testimonials", 0.6, "monthly"),
    page("/special-programs", 0.5, "monthly"),
    page("/faqs", 0.6, "monthly"),
    page("/blog", 0.7, "weekly"),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.6, "yearly", new Date(`${p.date}T00:00:00+05:30`))),
  ];
}
