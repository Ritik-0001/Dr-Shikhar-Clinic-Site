import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostEditor } from "@/components/admin/post-editor";
import { posts as builtIn } from "@/data/blog";
import { getStateFresh } from "@/lib/cms/content";

export const metadata: Metadata = { title: "New post" };

export default async function NewPostPage() {
  const state = await getStateFresh();
  const categories = [...new Set([...builtIn.map((p) => p.category), ...state.posts.map((p) => p.category)])];
  return (
    <div>
      <Link href="/admin/posts" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-accent-700">
        <ArrowLeft className="size-4" aria-hidden="true" /> All posts
      </Link>
      <h1 className="font-display mb-8 mt-3 text-[clamp(1.9rem,1.5rem+1.8vw,2.6rem)] leading-tight text-primary-900">New post</h1>
      <PostEditor categories={categories} />
    </div>
  );
}
