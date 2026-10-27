import { DentalIcon } from "@/components/icons/dental-icons";
import type { Post } from "@/data/blog";
import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/cn";

const tones: Record<Post["cover"]["tone"], { box: string; glowA: string; glowB: string }> = {
  blue: {
    box: "bg-primary-800 text-white [--icon-accent:var(--color-accent-300)]",
    glowA: "[--glow:rgb(58_116_192/0.6)]",
    glowB: "[--glow:rgb(195_38_47/0.25)]",
  },
  red: {
    box: "bg-accent-700 text-white [--icon-accent:#fff]",
    glowA: "[--glow:rgb(245_159_154/0.55)]",
    glowB: "[--glow:rgb(58_116_192/0.3)]",
  },
  navy: {
    box: "bg-primary-950 text-white [--icon-accent:var(--color-accent-300)]",
    glowA: "[--glow:rgb(58_116_192/0.5)]",
    glowB: "[--glow:rgb(195_38_47/0.3)]",
  },
  sky: {
    box: "bg-primary-100 text-primary-800",
    glowA: "[--glow:rgb(255_253_249/0.9)]",
    glowB: "[--glow:rgb(246_205_188/0.8)]",
  },
};

/** Brand-toned cover art for a post (no photography needed): soft colour washes and a large tooth icon. */
export function PostCover({ post, className }: { post: Post; className?: string }) {
  const tone = tones[post.cover.tone];
  if (post.cover.image) {
    return (
      <div className={cn("relative isolate overflow-hidden bg-surface", className)}>
        <SiteImage src={post.cover.image} alt={post.cover.imageAlt ?? ""} fill sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div className={cn("relative isolate overflow-hidden", tone.box, className)} aria-hidden="true">
      <span className={cn("glow absolute -right-12 -top-20 -z-10 size-72", tone.glowA)} />
      <span className={cn("glow absolute -bottom-24 -left-10 -z-10 size-64", tone.glowB)} />
      {post.cover.tone !== "sky" && <span className="grain-layer -z-10" />}
      <DentalIcon name={post.cover.icon} size="46%" strokeWidth={1.7} className="absolute right-[8%] top-1/2 aspect-square h-[72%] w-auto -translate-y-1/2 opacity-95" />
    </div>
  );
}
