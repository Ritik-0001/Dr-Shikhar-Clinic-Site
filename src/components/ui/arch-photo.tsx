import type { SitePhoto } from "@/lib/cms/content";
import { SiteImage } from "./site-image";

/** A photo in the brand's arch shape (same silhouette as the home hero), used beside page titles. */
export function ArchPhoto({ photo, sizes = "(min-width: 1024px) 15rem, 60vw" }: { photo: SitePhoto; sizes?: string }) {
  return (
    <div className="relative aspect-[4/5] w-60">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[2rem] bg-accent-200/70" aria-hidden="true" />
      <div className="relative size-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-primary-950 shadow-lift">
        <SiteImage src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
