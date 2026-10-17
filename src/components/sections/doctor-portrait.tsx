import Image from "next/image";
import type { Doctor } from "@/data/doctors";
import { cn } from "@/lib/cn";

/**
 * Doctor portrait card. Shows the real photo when `doctor.photo` is set; until then it shows a
 * designed monogram card (brand arch, the logo's "family" dots and the doctor's initials).
 */
export function DoctorPortrait({ doctor, className, priority = false }: { doctor: Doctor; className?: string; priority?: boolean }) {
  return (
    <figure className={cn("relative isolate aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-linear-to-br from-primary-700 via-primary-800 to-primary-950 shadow-lift", className)}>
      {doctor.photo ? (
        <Image src={doctor.photo} alt={`${doctor.name}, ${doctor.credential}`} fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover" preload={priority} />
      ) : (
        <div aria-hidden="true">
          <div className="bg-dots absolute inset-0 -z-10 opacity-25" />
          <div className="absolute -right-20 -top-16 size-72 rounded-full bg-primary-500/40 blur-2xl" />
          <div className="absolute -bottom-24 -left-16 size-72 rounded-full bg-accent-600/35 blur-2xl" />
          {/* the logo's three figures */}
          <div className="absolute left-1/2 top-[14%] flex -translate-x-1/2 items-end gap-2">
            <span className="size-9 rounded-full bg-accent-500" />
            <span className="mb-0.5 size-6 rounded-full bg-accent-500" />
            <span className="size-9 rounded-full bg-white" />
          </div>
          <p className="font-display absolute inset-x-0 top-[26%] text-center text-[9.5rem] leading-none tracking-tight text-white/95">{doctor.initials}</p>
        </div>
      )}
      <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur-sm">
        <p className="font-display text-2xl leading-tight text-primary-800">{doctor.name}</p>
        <p className="mt-1 text-sm font-semibold text-accent-600">
          {doctor.credential} · {doctor.title}
        </p>
        <p className="mt-0.5 text-sm text-muted">{doctor.role}</p>
      </figcaption>
    </figure>
  );
}
