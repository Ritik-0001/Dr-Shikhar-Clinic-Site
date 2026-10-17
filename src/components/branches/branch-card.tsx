import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Navigation, Phone, Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { directionsUrl, type Branch } from "@/data/branches";
import { site } from "@/data/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { MapEmbed } from "./map-embed";
import { OpenNow } from "./open-now";

export function GoogleRating({ branch }: { branch: Branch }) {
  return (
    <a
      href={branch.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[0.8125rem] font-semibold text-ink-soft ring-1 ring-line hover:bg-primary-50"
    >
      <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
      <span className="font-bold text-ink">{branch.google.rating.toFixed(1)}</span>
      <span>· {branch.google.reviews} Google reviews</span>
    </a>
  );
}

/** Branch summary card with a click-to-load map, live open/closed status and one-tap actions. */
export function BranchCard({ branch: b, index = 0 }: { branch: Branch; index?: number }) {
  return (
    <article style={{ "--i": index } as CSSProperties} className="reveal flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <div className="aspect-[16/9] bg-primary-50">
        <MapEmbed branch={b} />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow">{b.tagline}</p>
            <h3 className="font-display mt-3 text-[2rem] leading-tight text-primary-800">
              {b.shortName}
              {b.city !== b.shortName && <span className="text-primary-800/70">, {b.city}</span>}
            </h3>
          </div>
          <GoogleRating branch={b} />
        </div>

        <ul className="mt-6 grid gap-3.5 text-[0.98rem] text-ink-soft">
          <li className="flex gap-3">
            <MapPin className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
            <address className="not-italic leading-relaxed">{b.fullAddress}</address>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
            <a href={telUrl(b)} className="font-semibold text-primary-800 hover:underline">
              {b.phone.display}
            </a>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
            <span>
              {site.hours.label}: {site.hours.sessions.map((s) => s.display).join(" & ")}
              <span className="block text-sm text-muted">{site.hours.closedLabel}: Closed</span>
            </span>
          </li>
        </ul>

        <div className="mt-5">
          <OpenNow />
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-7">
          <ButtonLink href={directionsUrl(b)} size="md">
            <Navigation className="size-4" aria-hidden="true" /> Get Directions
          </ButtonLink>
          <ButtonLink href={telUrl(b)} variant="outline" size="md">
            <Phone className="size-4" aria-hidden="true" /> Call
          </ButtonLink>
          <ButtonLink href={whatsappUrl(b.phone.whatsapp, `Hello ${site.name} (${b.shortName}), I'd like to book an appointment.`)} variant="whatsapp" size="md">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </ButtonLink>
        </div>
        <Link href={`/branches/${b.slug}`} className="mt-5 inline-flex items-center gap-1.5 self-start rounded-md text-sm font-bold text-primary-700 hover:text-accent-600">
          Clinic details &amp; services <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
