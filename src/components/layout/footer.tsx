import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { Logo } from "@/components/ui/logo";
import { branches, directionsUrl } from "@/data/branches";
import { footerNav, treatmentLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { HoursLines } from "@/components/ui/hours";

const heading = "text-xs font-extrabold uppercase tracking-[0.16em] text-white";
const link = "inline-flex min-h-10 items-center rounded-md text-primary-200 transition-colors hover:text-white lg:min-h-9";

export function Footer() {
  return (
    <footer className="defer-render relative isolate overflow-hidden bg-primary-950 text-primary-200">
      <span className="glow absolute -right-40 -top-48 -z-10 size-[40rem] [--glow:rgb(58_116_192/0.3)]" aria-hidden="true" />
      <span className="glow absolute -bottom-56 -left-40 -z-10 size-[36rem] [--glow:rgb(195_38_47/0.18)]" aria-hidden="true" />
      <span className="grain-layer -z-10" aria-hidden="true" />

      <div className="container-page pb-28 pt-14 sm:pt-20 lg:pb-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-11 lg:grid-cols-[1.3fr_1fr_.8fr_1.35fr] lg:gap-x-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" aria-label={`${site.name} home`} className="inline-block rounded-lg">
              <Logo reversed height={48} />
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed">
              Modern multispeciality dental care in Nikol, Ahmedabad and Dhrangadhra. Ethical, painless and evidence-based, with strict sterilization at every step.
            </p>
            <div className="mt-6 flex items-end justify-between gap-6 lg:block">
              <div>
                <Logo variant="wordmark-gujarati" reversed height={46} alt={`${site.name} (Gujarati wordmark)`} />
                <p className="font-display mt-3 text-xl leading-snug text-white">{site.tagline}</p>
              </div>
              <div className="flex items-center gap-3 lg:mt-6">
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram @${site.instagram.handle}`}
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-primary-800"
                >
                  <InstagramIcon className="size-5" />
                </a>
                <a
                  href={whatsappUrl(branches[0].phone.whatsapp, `Hello ${site.name}, I'd like to book an appointment.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-whatsapp"
                >
                  <WhatsAppIcon className="size-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Treatments */}
          <nav aria-label="Treatments" className="col-span-2 lg:col-span-1">
            <h2 className={heading}>Treatments</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 lg:mt-4 lg:grid-cols-1">
              {treatmentLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className={link}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Patients + Clinic: side by side on phones, stacked on desktop */}
          <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-8 lg:col-span-1 lg:grid-cols-1">
            <nav aria-label="Patients">
              <h2 className={heading}>Patients</h2>
              <ul className="mt-3 lg:mt-4">
                {footerNav.patients.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Clinic">
              <h2 className={heading}>Clinic</h2>
              <ul className="mt-3 lg:mt-4">
                {footerNav.clinic.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Clinics */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className={heading}>Our clinics</h2>
            <ul className="mt-4 grid gap-6">
              {branches.map((b) => (
                <li key={b.slug}>
                  <p className="flex items-center gap-2 font-bold text-white">
                    <MapPin className="size-4 text-accent-300" aria-hidden="true" />
                    <Link href={`/branches/${b.slug}`} className="hover:underline">
                      {b.shortName}
                      {b.city !== b.shortName ? `, ${b.city}` : ""}
                    </Link>
                  </p>
                  <address className="mt-1.5 text-sm not-italic leading-relaxed">{b.fullAddress}</address>
                  <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                    <a href={telUrl(b)} className="inline-flex min-h-10 items-center gap-1.5 font-bold text-white hover:underline">
                      <Phone className="size-3.5" aria-hidden="true" /> {b.phone.display}
                    </a>
                    <a href={directionsUrl(b)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 hover:text-white">
                      Directions <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent-300" aria-hidden="true" />
              <HoursLines />
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-primary-300">A {site.parentCompany} company</p>
        </div>
      </div>
    </footer>
  );
}
