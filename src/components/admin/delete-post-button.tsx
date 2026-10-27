"use client";

import { Trash2 } from "lucide-react";
import { deletePost } from "@/app/admin/actions";

export function DeletePostButton({ slug, title }: { slug: string; title: string }) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <button type="submit" className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-bold text-accent-700 transition-colors hover:bg-accent-50">
        <Trash2 className="size-4" aria-hidden="true" /> Delete post
      </button>
    </form>
  );
}
