import { ArrowRight, Check } from "lucide-react";
import { DoctorPortrait } from "@/components/sections/doctor-portrait";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { doctors } from "@/data/doctors";

/** Home-page teaser for the founder. The full profile lives on /doctors. */
export function DoctorTeaser() {
  const doctor = doctors[0];
  return (
    <section className="defer-render section-y" aria-labelledby="doctor-heading">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div className="mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-none">
          <DoctorPortrait doctor={doctor} />
        </div>
        <div>
          <SectionHeading
            eyebrow="Meet the founder"
            title={<span id="doctor-heading">Dentistry led by listening, honesty and gentle hands</span>}
          />
          <p className="mt-6 text-[1.05rem] leading-relaxed text-muted sm:text-lg">{doctor.bio[0]}</p>
          <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
            {doctor.principles.map((p) => (
              <li key={p.title} className="flex items-start gap-3 text-[0.98rem] font-bold leading-snug text-ink-soft">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {p.title}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row [&>*]:max-sm:w-full">
            <ButtonLink href="/doctors" variant="secondary" size="lg">
              Meet our doctors <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/appointment" variant="outline" size="lg">
              Book a consultation
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
