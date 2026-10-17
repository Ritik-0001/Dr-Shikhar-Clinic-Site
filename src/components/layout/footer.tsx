import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { Logo } from "@/components/ui/logo";
import { branches, directionsUrl } from "@/data/branches";
import { footerNav, treatmentLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { telUrl, whatsappUrl } from "@/lib/contact";

const heading = "text-sm font-bold uppercase tracking-[0.14em] text-white";
const link = "inline-block rounded-md py-1 text-primary-200 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-primary-950 text-primary-200">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(45% 50% at 100% 0%, color-mix(in oklab, var(--color-primary-600) 28%, transparent), transparent 70%), radial-gradient(35% 45% at 0% 100%, color-mix(in oklab, var(--color-accent-600) 18%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="container-page pb-28 pt-16 sm:pt-20 lg:pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_.8fr_1.35fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" aria-label={`${site.name} — home`} className="inline-block rounded-lg">
              <Logo reversed height={52} />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed">
              Modern multispeciality dental care in Nikol, Ahmedabad and Dhrangadhra — ethical, painless and evidence-based, with strict sterilization at every step.
            </p>
            <Logo variant="wordmark-gujarati" reversed height={56} alt={`${site.name} — Gujarati wordmark`} className="mt-5" />
            <p className="font-display mt-4 text-xl text-white">{site.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
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

          {/* Treatments */}
          <nav aria-label="Treatments">
            <h2 className={heading}>Treatments</h2>
            <ul className="mt-5 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
              {treatmentLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className={link}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Links */}
          <nav aria-label="Footer">
            <h2 className={heading}>Patients</h2>
            <ul className="mt-5">
              {footerNav.patients.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className={`${heading} mt-8`}>Clinic</h2>
            <ul className="mt-5">
              {footerNav.clinic.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Clinics */}
          <div>
            <h2 className={heading}>Our clinics</h2>
            <ul className="mt-5 grid gap-6">
              {branches.map((b) => (
                <li key={b.slug}>
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <MapPin className="size-4 text-accent-300" aria-hidden="true" />
                    <Link href={`/branches/${b.slug}`} className="hover:underline">
                      {b.shortName}
                      {b.city !== b.shortName ? `, ${b.city}` : ""}
                    </Link>
                  </p>
                  <address className="mt-1.5 text-sm not-italic leading-relaxed">{b.fullAddress}</address>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <a href={telUrl(b)} className="inline-flex items-center gap-1.5 font-semibold text-white hover:underline">
                      <Phone className="size-3.5" aria-hidden="true" /> {b.phone.display}
                    </a>
                    <a href={directionsUrl(b)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                      Directions <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-2 text-sm">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent-300" aria-hidden="true" />
              <span>
                {site.hours.label}
                <br />
                {site.hours.sessions.map((s) => s.display).join(" · ")}
                <br />
                {site.hours.closedLabel}: Closed
              </span>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-primary-300">A {site.parentCompany} company</p>
        </div>
      </div>
    </footer>
  );
}
