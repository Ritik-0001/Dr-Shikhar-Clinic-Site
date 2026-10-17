import { Clock } from "lucide-react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { branches } from "@/data/branches";
import { site } from "@/data/site";
import { telUrl } from "@/lib/contact";

/** Slim utility strip above the header (desktop only): hours, branch phone numbers, Instagram. */
export function TopBar() {
  return (
    <aside aria-label="Clinic hours and phone numbers" className="hidden bg-primary-950 text-[0.8125rem] text-primary-100 lg:block">
      <div className="container-page flex h-10 items-center justify-between gap-6">
        <p className="flex items-center gap-2">
          <Clock className="size-3.5 text-accent-300" aria-hidden="true" />
          <span>
            {site.hours.label}: {site.hours.sessions.map((s) => s.display).join(" & ")} · {site.hours.closedLabel} closed
          </span>
        </p>
        <div className="flex items-center gap-6">
          {branches.map((b) => (
            <a key={b.slug} href={telUrl(b)} className="rounded-md hover:text-white">
              <span className="text-primary-300">{b.shortName}:</span> <span className="font-semibold">{b.phone.display}</span>
            </a>
          ))}
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-md text-primary-200 hover:text-white"
          >
            <InstagramIcon className="size-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}
