import { DentalIcon } from "@/components/icons/dental-icons";
import type { Post } from "@/data/blog";
import { cn } from "@/lib/cn";

const tones: Record<Post["cover"]["tone"], string> = {
  blue: "bg-linear-to-br from-primary-600 to-primary-900 text-white [--icon-accent:var(--color-accent-300)]",
  red: "bg-linear-to-br from-accent-500 to-accent-800 text-white [--icon-accent:#fff]",
  navy: "bg-linear-to-br from-primary-800 to-primary-950 text-white [--icon-accent:var(--color-accent-300)]",
  sky: "bg-linear-to-br from-primary-100 to-primary-300 text-primary-800",
};

/** Brand-toned cover art for a post (no photography needed): gradient, dot grid and a large tooth icon. */
export function PostCover({ post, className }: { post: Post; className?: string }) {
  return (
    <div className={cn("relative isolate overflow-hidden", tones[post.cover.tone], className)} aria-hidden="true">
      <div className="bg-dots absolute inset-0 -z-10 opacity-30" />
      <div className="absolute -right-6 -top-6 size-44 rounded-full bg-white/10 blur-sm" />
      <div className="absolute -bottom-10 left-6 size-32 rounded-full bg-white/10" />
      <DentalIcon name={post.cover.icon} size="46%" strokeWidth={1.7} className="absolute right-[8%] top-1/2 aspect-square h-[72%] w-auto -translate-y-1/2 opacity-95" />
    </div>
  );
}
