import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { directionsUrl, type Branch } from "@/data/branches";
import { SiteImage } from "@/components/ui/site-image";
import { getPhoto } from "@/lib/cms/content";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { GoogleRating } from "./google-rating";
import { MapEmbed } from "./map-embed";
import { OpenNow } from "./open-now";
import { HoursLines } from "@/components/ui/hours";

/** Top of the compact card: the clinic photo when one has been supplied, otherwise a designed brand block. */
async function ClinicCover({ branch: b }: { branch: Branch }) {
  const photo = await getPhoto(`clinic-${b.slug}`);
  return (
    <div className="relative isolate aspect-[16/8] overflow-hidden bg-primary-950 text-white sm:aspect-[16/7]">
      {photo ? (
        <SiteImage src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 36rem, 100vw" className="object-cover" />
      ) : (
        <>
          <span className="glow absolute -right-16 -top-24 -z-10 size-72 [--glow:rgb(58_116_192/0.5)]" aria-hidden="true" />
          <span className="glow absolute -bottom-32 -left-10 -z-10 size-72 [--glow:rgb(195_38_47/0.28)]" aria-hidden="true" />
          <span className="grain-layer -z-10" aria-hidden="true" />
          <span className="emblem-mask absolute -bottom-8 right-6 h-[75%] text-white opacity-[0.09]" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-accent-300">
              <MapPin className="size-4" aria-hidden="true" /> {b.tagline}
            </p>
            <p className="font-display mt-2 text-[clamp(1.9rem,1.4rem+1.6vw,2.6rem)] leading-none">
              {b.shortName}
              {b.city !== b.shortName && <span className="text-white/70">, {b.city}</span>}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Branch summary card with live open/closed status and one-tap actions.
 * `compact` swaps the click-to-load map for a brand cover and drops the long address block (home page).
 */
export function BranchCard({ branch: b, index = 0, compact = false }: { branch: Branch; index?: number; compact?: boolean }) {
  return (
    <article
      style={{ "--i": index } as CSSProperties}
      className={cn("reveal flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white", !compact && "shadow-card")}
    >
      {compact ? (
        <ClinicCover branch={b} />
      ) : (
        <div className="aspect-[16/9] bg-surface">
          <MapEmbed branch={b} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          {!compact && (
            <div>
              <p className="eyebrow">{b.tagline}</p>
              <h3 className="font-display mt-3 text-[2rem] leading-tight text-primary-900">
                {b.shortName}
                {b.city !== b.shortName && <span className="text-primary-900/65">, {b.city}</span>}
              </h3>
            </div>
          )}
          <GoogleRating branch={b} />
          {compact && <OpenNow />}
        </div>

        <ul className="mt-6 grid gap-3.5 text-[0.98rem] text-ink-soft">
          <li className="flex gap-3">
            <MapPin className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
            <address className="not-italic leading-relaxed">{b.fullAddress}</address>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
            <a href={telUrl(b)} className="font-bold text-primary-800 hover:text-accent-700">
              {b.phone.display}
            </a>
          </li>
          {!compact && (
            <li className="flex gap-3">
              <Clock className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
              <HoursLines />
            </li>
          )}
        </ul>

        {!compact && (
          <div className="mt-5">
            <OpenNow />
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-7 sm:flex sm:flex-wrap">
          <ButtonLink href={directionsUrl(b)} size="md" className="col-span-2">
            <Navigation className="size-4" aria-hidden="true" /> Get Directions
          </ButtonLink>
          <ButtonLink href={telUrl(b)} variant="outline" size="md">
            <Phone className="size-4" aria-hidden="true" /> Call
          </ButtonLink>
          <ButtonLink href={whatsappUrl(b.phone.whatsapp, `Hello ${site.name} (${b.shortName}), I'd like to book an appointment.`)} variant="whatsapp" size="md">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </ButtonLink>
        </div>
        <Link href={`/branches/${b.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start rounded-md text-sm font-bold text-primary-700 hover:text-accent-700">
          Clinic details &amp; services <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
