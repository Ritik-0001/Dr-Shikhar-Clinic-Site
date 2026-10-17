import { CalendarCheck, Clock, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { branches } from "@/data/branches";
import { site } from "@/data/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { HoursLines } from "@/components/ui/hours";

type Props = {
  title?: string;
  text?: string;
  /** treatment slug to pre-select on the appointment form */
  treatment?: string;
  className?: string;
};

/** Sticky sidebar card: book online, or call / WhatsApp whichever clinic is closest. */
export function BookingCard({
  title = "Book your visit",
  text = "Choose a time that suits you. We'll confirm your appointment and answer any questions.",
  treatment,
  className,
}: Props) {
  return (
    <aside aria-label="Book an appointment" className={cn("relative isolate overflow-hidden rounded-[1.75rem] bg-primary-950 p-6 text-white sm:p-7", className)}>
      <span className="glow absolute -right-24 -top-28 -z-10 size-72 [--glow:rgb(58_116_192/0.5)]" aria-hidden="true" />
      <span className="glow absolute -bottom-28 -left-20 -z-10 size-64 [--glow:rgb(195_38_47/0.25)]" aria-hidden="true" />
      <span className="grain-layer -z-10" aria-hidden="true" />
      <h2 className="font-display text-3xl leading-tight">{title}</h2>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-primary-200">{text}</p>
      <ButtonLink href={treatment ? `/appointment?treatment=${treatment}` : "/appointment"} size="lg" className="mt-6 w-full">
        <CalendarCheck className="size-5" aria-hidden="true" /> Book Appointment
      </ButtonLink>

      <ul className="mt-6 grid gap-4 border-t border-white/15 pt-5">
        {branches.map((b) => (
          <li key={b.slug}>
            <p className="text-sm font-bold">{b.shortName}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href={telUrl(b)} className="flex h-11 items-center justify-center gap-2 rounded-full bg-white/10 text-sm font-bold transition-colors hover:bg-white/20">
                <Phone className="size-4" aria-hidden="true" /> Call
              </a>
              <a
                href={whatsappUrl(b.phone.whatsapp, `Hello ${site.name} (${b.shortName}), I'd like to book an appointment.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp-deep text-sm font-bold transition-colors hover:bg-[#0c6a38]"
              >
                <WhatsAppIcon className="size-4" /> Chat
              </a>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 flex items-start gap-2.5 border-t border-white/15 pt-5 text-sm text-primary-200">
        <Clock className="mt-0.5 size-4 shrink-0 text-accent-300" aria-hidden="true" />
        <HoursLines />
      </p>
    </aside>
  );
}
