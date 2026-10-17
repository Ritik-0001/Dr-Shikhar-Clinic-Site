import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { doctors } from "@/data/doctors";
import { DoctorPortrait } from "./doctor-portrait";

/** Home-page teaser for the founder. */
export function DoctorIntro() {
  const doctor = doctors[0];
  return (
    <section className="section-y" aria-labelledby="doctor-heading">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div className="reveal mx-auto w-full max-w-md lg:max-w-none">
          <DoctorPortrait doctor={doctor} />
        </div>
        <div>
          <SectionHeading
            eyebrow="Meet the founder"
            title={<span id="doctor-heading">Dentistry led by listening, honesty and gentle hands</span>}
          />
          <div className="mt-6 grid gap-4 text-lg leading-relaxed text-muted">
            {doctor.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {doctor.principles.map((p) => (
              <li key={p.title} className="flex items-start gap-3 text-[0.98rem] font-semibold text-ink-soft">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {p.title}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
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
