"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, Clock, LoaderCircle, LocateFixed, MapPin, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { branches, directionsUrl } from "@/data/branches";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { GoogleRating } from "./branch-card";
import { MapEmbed } from "./map-embed";
import { OpenNow } from "./open-now";

type Coords = { lat: number; lng: number };
type Geo = { status: "idle" | "loading" | "denied" | "unsupported" | "done"; km?: Record<string, number> };

const toRad = (deg: number) => (deg * Math.PI) / 180;
/** Great-circle (straight-line) distance in km. */
function distanceKm(a: Coords, b: Coords) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/** Interactive clinic locator: pick a clinic (or find the nearest) to see its map, hours and actions. */
export function BranchLocator() {
  const [slug, setSlug] = useState<string>(branches[0].slug);
  const [geo, setGeo] = useState<Geo>({ status: "idle" });
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});
  const selected = branches.find((b) => b.slug === slug) ?? branches[0];
  const nearestSlug = geo.km ? Object.entries(geo.km).sort((a, b) => a[1] - b[1])[0][0] : null;

  function locate() {
    if (!("geolocation" in navigator)) {
      setGeo({ status: "unsupported" });
      return;
    }
    setGeo({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const km = Object.fromEntries(branches.map((b) => [b.slug, distanceKm(here, b.coordinates)]));
        setGeo({ status: "done", km });
        setSlug(Object.entries(km).sort((a, b) => a[1] - b[1])[0][0]);
      },
      () => setGeo({ status: "denied" }),
      { timeout: 10_000, maximumAge: 5 * 60_000 },
    );
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % branches.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + branches.length) % branches.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = branches.length - 1;
    const target = branches[next];
    setSlug(target.slug);
    tabs.current[target.slug]?.focus();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[23rem_1fr] lg:gap-8">
      <div className="grid content-start gap-4">
        <button
          type="button"
          onClick={locate}
          disabled={geo.status === "loading"}
          className="flex min-h-14 cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-primary-300 bg-primary-50/60 px-4 text-[0.95rem] font-bold text-primary-800 transition-colors hover:border-primary-600 hover:bg-primary-50 disabled:opacity-70"
        >
          {geo.status === "loading" ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <LocateFixed className="size-5 text-accent-600" aria-hidden="true" />}
          {geo.status === "loading" ? "Finding your location…" : "Find the clinic nearest to me"}
        </button>
        <p className="-mt-1 min-h-5 text-sm text-muted" role="status" aria-live="polite">
          {geo.status === "denied" && "We couldn't access your location — choose a clinic below instead."}
          {geo.status === "unsupported" && "Location isn't available on this device — choose a clinic below."}
          {geo.status === "done" && "Distances are approximate straight-line distances from your location."}
        </p>

        <div role="tablist" aria-label="Clinics" aria-orientation="vertical" className="grid gap-3">
          {branches.map((b, i) => {
            const active = b.slug === slug;
            return (
              <button
                key={b.slug}
                ref={(el) => {
                  tabs.current[b.slug] = el;
                }}
                role="tab"
                id={`tab-${b.slug}`}
                aria-selected={active}
                aria-controls="branch-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setSlug(b.slug)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "cursor-pointer rounded-3xl border-2 p-5 text-left transition-[border-color,box-shadow,background-color]",
                  active ? "border-primary-600 bg-white shadow-card ring-4 ring-primary-100" : "border-line bg-white shadow-soft hover:border-primary-300",
                )}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-2xl leading-tight text-primary-800">
                    {b.shortName}
                    {b.city !== b.shortName && <span className="text-primary-800/70">, {b.city}</span>}
                  </span>
                  {nearestSlug === b.slug && <span className="shrink-0 rounded-full bg-accent-600 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-white">Nearest</span>}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{b.fullAddress}</span>
                <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-semibold text-ink-soft">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="size-3.5 text-accent-600" aria-hidden="true" /> {b.phone.display}
                  </span>
                  {geo.km && <span className="inline-flex items-center gap-1.5 text-primary-700">≈ {geo.km[b.slug] < 10 ? geo.km[b.slug].toFixed(1) : Math.round(geo.km[b.slug])} km away</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="branch-panel" role="tabpanel" aria-labelledby={`tab-${selected.slug}`} className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-card">
        <div className="h-72 sm:h-96">
          <MapEmbed key={selected.slug} branch={selected} autoLoad className="min-h-0" />
        </div>
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-3xl leading-tight text-primary-800">
                {selected.shortName}
                {selected.city !== selected.shortName && <span className="text-primary-800/70">, {selected.city}</span>}
              </h2>
              <OpenNow />
            </div>
            <ul className="mt-5 grid gap-3 text-[0.98rem] text-ink-soft">
              <li className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-accent-600" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {selected.fullAddress}
                  <span className="block text-sm text-muted">Plus Code: {selected.plusCode}</span>
                </address>
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
              <GoogleRating branch={selected} />
            </div>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
            <ButtonLink href={directionsUrl(selected)}>
              <Navigation className="size-4" aria-hidden="true" /> Get Directions
            </ButtonLink>
            <ButtonLink href={telUrl(selected)} variant="outline">
              <Phone className="size-4" aria-hidden="true" /> Call
            </ButtonLink>
            <ButtonLink href={whatsappUrl(selected.phone.whatsapp, `Hello ${site.name} (${selected.shortName}), I'd like to book an appointment.`)} variant="whatsapp">
              <WhatsAppIcon className="size-4" /> WhatsApp
            </ButtonLink>
          </div>
        </div>
        <div className="border-t border-line bg-surface px-6 py-4 sm:px-8">
          <Link href={`/branches/${selected.slug}`} className="inline-flex items-center gap-1.5 rounded-md text-sm font-bold text-primary-700 hover:text-accent-600">
            More about our {selected.shortName} clinic <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
