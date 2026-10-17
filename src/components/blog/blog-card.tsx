import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatPostDateShort, type Post } from "@/data/blog";
import { PostCover } from "./post-cover";

export function BlogCard({ post, index = 0, featured = false }: { post: Post; index?: number; featured?: boolean }) {
  return (
    <article
      style={{ "--i": index % 3 } as CSSProperties}
      className="reveal group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lift"
    >
      <PostCover post={post} className={featured ? "aspect-[16/8]" : "aspect-[16/9]"} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p>
          <span className="inline-block rounded-full bg-accent-50 px-3 py-1 text-[0.8125rem] font-semibold text-accent-700">{post.category}</span>
        </p>
        <h3 className={`font-display mt-4 leading-[1.15] text-primary-800 ${featured ? "text-3xl" : "text-2xl"}`}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-[0.8125rem] font-semibold text-muted">
          <span className="flex items-center gap-2">
            <time dateTime={post.date}>{formatPostDateShort(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" /> {post.readMinutes} min
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-accent-600">
            Read
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
