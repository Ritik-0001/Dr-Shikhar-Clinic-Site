import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Pencil, Plus } from "lucide-react";
import { posts as builtIn, formatPostDateShort } from "@/data/blog";
import { getStateFresh } from "@/lib/cms/content";

export const metadata: Metadata = { title: "Blog posts" };

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ deleted?: string }> }) {
  const { deleted } = await searchParams;
  const state = await getStateFresh();
  const mine = [...state.posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Blog</p>
          <h1 className="font-display mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.6rem)] leading-tight text-primary-900">Blog posts</h1>
        </div>
        <Link href="/admin/posts/new" className="inline-flex h-12 items-center gap-2 rounded-full bg-accent-600 px-6 font-bold text-white shadow-cta transition-colors hover:bg-accent-700">
          <Plus className="size-5" aria-hidden="true" /> New post
        </Link>
      </div>

      {deleted && (
        <p role="status" className="mt-6 flex items-center gap-2.5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900">
          <CheckCircle2 className="size-5" aria-hidden="true" /> The post was deleted.
        </p>
      )}

      <h2 className="mt-8 text-sm font-extrabold uppercase tracking-[0.16em] text-muted">Your posts</h2>
      {mine.length === 0 ? (
        <div className="mt-3 rounded-3xl border border-dashed border-line bg-white/60 p-10 text-center">
          <p className="font-display text-2xl text-primary-900">No posts yet</p>
          <p className="mx-auto mt-2 max-w-md text-muted">Write about a treatment, share oral-health advice or announce a camp. Patients and Google both like fresh content.</p>
          <Link href="/admin/posts/new" className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary-900 px-6 font-bold text-white hover:bg-primary-800">
            <Plus className="size-5" aria-hidden="true" /> Write your first post
          </Link>
        </div>
      ) : (
        <ul className="mt-3 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
          {mine.map((p) => (
            <li key={p.slug} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4">
              <div className="min-w-0 flex-1 basis-64">
                <p className="truncate font-bold text-primary-900">{p.title}</p>
                <p className="text-sm text-muted">
                  {p.category} · {formatPostDateShort(p.date)}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${p.status === "published" ? "bg-emerald-50 text-emerald-800" : "bg-surface-2 text-ink-soft"}`}>
                {p.status === "published" ? "Live" : "Draft"}
              </span>
              <div className="flex items-center gap-1">
                {p.status === "published" && (
                  <Link href={`/blog/${p.slug}`} target="_blank" aria-label={`View ${p.title} on the website`} className="grid size-11 place-items-center rounded-full text-primary-700 hover:bg-surface">
                    <ExternalLink className="size-[1.1rem]" aria-hidden="true" />
                  </Link>
                )}
                <Link href={`/admin/posts/${p.slug}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-surface px-4 text-sm font-bold text-primary-900 transition-colors hover:bg-surface-2">
                  <Pencil className="size-4" aria-hidden="true" /> Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="mt-10 text-sm font-extrabold uppercase tracking-[0.16em] text-muted">Built-in articles</h2>
      <p className="mt-1 text-sm text-muted">These came with the website and are always live. To change one, ask your developer.</p>
      <ul className="mt-3 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white/70">
        {builtIn.map((p) => (
          <li key={p.slug} className="flex items-center justify-between gap-4 px-5 py-3.5">
            <div className="min-w-0">
              <p className="truncate font-bold text-ink-soft">{p.title}</p>
              <p className="text-sm text-muted">
                {p.category} · {formatPostDateShort(p.date)}
              </p>
            </div>
            <Link href={`/blog/${p.slug}`} target="_blank" aria-label={`View ${p.title} on the website`} className="grid size-11 shrink-0 place-items-center rounded-full text-primary-700 hover:bg-surface">
              <ExternalLink className="size-[1.1rem]" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
