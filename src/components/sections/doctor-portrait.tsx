import { SiteImage } from "@/components/ui/site-image";
import { getPhoto } from "@/lib/cms/content";
import type { Doctor } from "@/data/doctors";
import { cn } from "@/lib/cn";

/**
 * Doctor portrait card in the brand's arch shape. Shows the real photo when `doctor.photo` is set;
 * until then it shows a designed monogram (soft glows, fine grain, the logo's family dots and initials).
 */
export async function DoctorPortrait({ doctor, className, priority = false }: { doctor: Doctor; className?: string; priority?: boolean }) {
  const uploaded = await getPhoto(`doctor-${doctor.slug}`);
  const photo = uploaded ?? (doctor.photo ? { src: doctor.photo, alt: `${doctor.name}, ${doctor.credential}` } : null);
  return (
    <figure className={cn("relative isolate aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-primary-950 shadow-lift", className)}>
      {photo ? (
        <SiteImage src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" preload={priority} />
      ) : (
        <div aria-hidden="true">
          <span className="glow absolute -right-24 -top-24 -z-10 size-80 [--glow:rgb(58_116_192/0.55)]" />
          <span className="glow absolute -bottom-28 -left-24 -z-10 size-80 [--glow:rgb(195_38_47/0.3)]" />
          <span className="grain-layer -z-10" />
          <svg viewBox="0 0 400 500" className="absolute inset-0 -z-10 size-full text-white/15" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M52 500V200a148 148 0 0 1 296 0v300" />
            <path d="M92 500V204a108 108 0 0 1 216 0v296" />
          </svg>
          {/* the logo's three figures */}
          <div className="absolute left-1/2 top-[19%] flex -translate-x-1/2 items-end gap-2">
            <span className="size-7 rounded-full bg-accent-500" />
            <span className="mb-0.5 size-5 rounded-full bg-accent-500" />
            <span className="size-7 rounded-full bg-white" />
          </div>
          <p className="font-display absolute inset-x-0 top-[29%] text-center text-[7.5rem] font-extrabold leading-none tracking-[-0.06em] text-white/95">{doctor.initials}</p>
        </div>
      )}
      <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-white px-5 py-4 shadow-card">
        <p className="font-display text-[1.45rem] leading-tight text-primary-900">{doctor.name}</p>
        <p className="mt-1 text-sm font-bold text-accent-700">
          {doctor.credential} · {doctor.title}
        </p>
        <p className="mt-0.5 text-sm text-muted">{doctor.role}</p>
      </figcaption>
    </figure>
  );
}
