import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { PostEditor } from "@/components/admin/post-editor";
import { posts as builtIn } from "@/data/blog";
import { getStateFresh } from "@/lib/cms/content";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ saved?: string }> }) {
  const [{ slug }, { saved }] = await Promise.all([params, searchParams]);
  const state = await getStateFresh();
  const post = state.posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const categories = [...new Set([...builtIn.map((p) => p.category), ...state.posts.map((p) => p.category)])];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/posts" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-accent-700">
          <ArrowLeft className="size-4" aria-hidden="true" /> All posts
        </Link>
        {post.status === "published" && (
          <Link href={`/blog/${post.slug}`} target="_blank" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-accent-700">
            View on website <ExternalLink className="size-4" aria-hidden="true" />
          </Link>
        )}
      </div>
      <h1 className="font-display mb-8 mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.6rem)] leading-tight text-primary-900">Edit post</h1>
      <PostEditor key={post.slug} post={post} categories={categories} saved={saved} />
      <div className="mt-6">
        <DeletePostButton slug={post.slug} title={post.title} />
      </div>
    </div>
  );
}
