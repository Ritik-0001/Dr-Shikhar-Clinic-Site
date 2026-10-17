"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarCheck, CheckCircle2, Mail, MapPin, Pencil, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button, ButtonLink } from "@/components/ui/button";
import { branches, type Branch } from "@/data/branches";
import { site } from "@/data/site";
import { treatments } from "@/data/treatments";
import { cn } from "@/lib/cn";
import { mailtoUrl, telUrl } from "@/lib/contact";
import { formatLongDate, greeting, isClosedDay, isValidPhone, messageLink, todayIST, type Errors } from "@/lib/forms";
import { Field, FieldSet, fieldAria } from "./field";

const timeSlots = [
  { value: "Morning (9 AM – 1 PM)", label: "Morning", sub: "9 AM – 1 PM" },
  { value: "Evening (4 PM – 8 PM)", label: "Evening", sub: "4 PM – 8 PM" },
  { value: "No preference", label: "Any time", sub: "Whatever's free" },
];

type Summary = {
  name: string;
  phone: string;
  branch: Branch;
  treatment: string;
  date: string;
  time: string;
  notes: string;
  waLink: string;
};

/**
 * Appointment request. There's no booking backend yet, so the form composes the details into a
 * WhatsApp message to the chosen clinic — the quickest route to a confirmed slot for most patients.
 */
export function AppointmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const treatmentRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState<Summary | null>(null);

  // Earliest selectable date = today (IST), plus optional ?treatment=<slug> / ?branch=<slug> presets from other pages.
  // Both are written straight to the DOM, so the form stays fully static (no Suspense, no hydration mismatch).
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayIST();
    const query = new URLSearchParams(window.location.search);
    const preset = treatments.find((t) => t.slug === query.get("treatment"));
    if (preset && treatmentRef.current) treatmentRef.current.value = preset.title;
    const branch = branches.find((b) => b.slug === query.get("branch"));
    if (branch) formRef.current?.querySelector<HTMLInputElement>(`input[name="branch"][value="${branch.slug}"]`)?.click();
  }, []);

  useEffect(() => {
    if (summary) successRef.current?.focus();
  }, [summary]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = get("name");
    const phone = get("phone");
    const branchSlug = get("branch");
    const treatment = get("treatment");
    const date = get("date");
    const time = get("time") || "No preference";
    const notes = get("notes");

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your full name.";
    if (!isValidPhone(phone)) next.phone = "Enter a valid 10-digit mobile number (e.g. 98765 43210).";
    if (!branchSlug) next.branch = "Please choose the clinic you'd like to visit.";
    if (date) {
      if (date < todayIST()) next.date = "Please choose today or a future date.";
      else if (isClosedDay(date)) next.date = "We're closed on Sundays — please choose Monday to Saturday.";
    }
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const branch = branches.find((b) => b.slug === branchSlug)!;
    const lines = [
      greeting(branch),
      "I'd like to book an appointment.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Treatment: ${treatment || "General check-up / not sure"}`,
      `Preferred date: ${date ? formatLongDate(date) : "Flexible"}`,
      `Preferred time: ${time}`,
      ...(notes ? [`Notes: ${notes}`] : []),
    ];
    const waLink = messageLink(branch, lines);
    window.open(waLink, "_blank", "noopener,noreferrer");
    setSummary({ name, phone, branch, treatment: treatment || "General check-up / not sure", date: date ? formatLongDate(date) : "Flexible", time, notes, waLink });
  }

  if (summary) {
    const mail = mailtoUrl(
      `Appointment request — ${summary.name}`,
      [greeting(summary.branch), "", `Name: ${summary.name}`, `Phone: ${summary.phone}`, `Treatment: ${summary.treatment}`, `Preferred date: ${summary.date}`, `Preferred time: ${summary.time}`, summary.notes && `Notes: ${summary.notes}`]
        .filter(Boolean)
        .join("\n"),
    );
    return (
      <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className="rounded-[2rem] border border-emerald-200 bg-emerald-50/60 p-7 outline-none sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h2 className="font-display mt-6 text-[clamp(1.9rem,1.3rem+2vw,2.6rem)] leading-tight text-primary-800">One last step: send it on WhatsApp</h2>
        <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-soft">
          We&apos;ve opened WhatsApp with your details for the <strong>{summary.branch.shortName}</strong> clinic. Just press <strong>send</strong> and the team will confirm your slot. Didn&apos;t open? Use the button below.
        </p>

        <dl className="mt-7 grid gap-x-8 gap-y-3 rounded-2xl bg-white p-6 text-[0.98rem] shadow-soft sm:grid-cols-2">
          {[
            ["Name", summary.name],
            ["Mobile", summary.phone],
            ["Clinic", `${summary.branch.shortName}${summary.branch.city !== summary.branch.shortName ? `, ${summary.branch.city}` : ""}`],
            ["Treatment", summary.treatment],
            ["Preferred date", summary.date],
            ["Preferred time", summary.time],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-sm font-semibold text-muted">{k}</dt>
              <dd className="font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={summary.waLink} variant="whatsapp" size="lg">
            <WhatsAppIcon className="size-5" /> Open WhatsApp
          </ButtonLink>
          <ButtonLink href={telUrl(summary.branch)} variant="outline" size="lg">
            <Phone className="size-5" aria-hidden="true" /> Call {summary.branch.shortName}
          </ButtonLink>
          {mail && (
            <ButtonLink href={mail} variant="outline" size="lg">
              <Mail className="size-5" aria-hidden="true" /> Email instead
            </ButtonLink>
          )}
          <Button variant="ghost" size="lg" onClick={() => setSummary(null)}>
            <Pencil className="size-4" aria-hidden="true" /> Edit details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-7" aria-label="Appointment request form">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="e.g. Ritesh Patel" className="field" {...fieldAria("name", errors.name)} />
        </Field>
        <Field label="Mobile number" htmlFor="phone" required error={errors.phone} hint="We'll use this only to confirm your appointment.">
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className="field" {...fieldAria("phone", errors.phone, "hint")} />
        </Field>
      </div>

      <FieldSet legend="Choose your clinic" required error={errors.branch}>
        <div className="grid gap-3 sm:grid-cols-2">
          {branches.map((b) => (
            <label key={b.slug} className="group relative cursor-pointer">
              <input type="radio" name="branch" value={b.slug} className="peer sr-only" />
              <span className="flex h-full gap-3.5 rounded-2xl border-[1.5px] border-line bg-white p-4 shadow-soft transition-colors hover:border-primary-300 peer-checked:border-primary-600 peer-checked:bg-primary-50 peer-checked:ring-4 peer-checked:ring-primary-100 peer-focus-visible:ring-4 peer-focus-visible:ring-primary-300">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-primary-50 text-accent-600 group-has-[:checked]:bg-primary-700 group-has-[:checked]:text-white">
                  <MapPin className="size-[1.1rem]" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-bold text-primary-900">
                    {b.shortName}
                    {b.city !== b.shortName && <span className="font-medium text-muted">, {b.city}</span>}
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-muted">{b.landmark ?? b.streetAddress}</span>
                </span>
              </span>
            </label>
          ))}
        </div>
      </FieldSet>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Treatment" htmlFor="treatment" hint="Not sure? Leave it — we'll start with a check-up.">
          <select ref={treatmentRef} id="treatment" name="treatment" defaultValue="" className="field" aria-describedby="treatment-hint">
            <option value="">General check-up / not sure</option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.title}>
                {t.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred date" htmlFor="date" error={errors.date} hint={`${site.hours.label} · ${site.hours.closedLabel} closed`}>
          <input ref={dateRef} id="date" name="date" type="date" className="field" {...fieldAria("date", errors.date, "hint")} />
        </Field>
      </div>

      <FieldSet legend="Preferred time">
        <div className="grid gap-3 sm:grid-cols-3">
          {timeSlots.map((s, i) => (
            <label key={s.value} className="cursor-pointer">
              <input type="radio" name="time" value={s.value} defaultChecked={i === 2} className="peer sr-only" />
              <span className="block rounded-2xl border-[1.5px] border-line bg-white px-4 py-3.5 text-center shadow-soft transition-colors hover:border-primary-300 peer-checked:border-primary-600 peer-checked:bg-primary-50 peer-checked:ring-4 peer-checked:ring-primary-100 peer-focus-visible:ring-4 peer-focus-visible:ring-primary-300">
                <span className="block font-bold text-primary-900">{s.label}</span>
                <span className="block text-sm text-muted">{s.sub}</span>
              </span>
            </label>
          ))}
        </div>
      </FieldSet>

      <Field label="Anything we should know?" htmlFor="notes" hint="Symptoms, allergies or medicines — whatever helps us prepare.">
        <textarea id="notes" name="notes" rows={3} placeholder="e.g. Pain in the lower right tooth for 3 days" className="field" aria-describedby="notes-hint" />
      </Field>

      <div className="flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="whatsapp" size="lg" className="w-full sm:w-auto">
          <WhatsAppIcon className="size-5" /> Request on WhatsApp
        </Button>
        <p className={cn("flex items-start gap-2 text-sm text-muted sm:max-w-xs")}>
          <CalendarCheck className="mt-0.5 size-4 shrink-0 text-accent-600" aria-hidden="true" />
          Your details open in WhatsApp for you to review and send — nothing is submitted until you press send.
        </p>
      </div>
    </form>
  );
}
