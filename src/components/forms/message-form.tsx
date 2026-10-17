"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Pencil, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button, ButtonLink } from "@/components/ui/button";
import { branches, type Branch } from "@/data/branches";
import { telUrl } from "@/lib/contact";
import { greeting, isValidPhone, messageLink, type Errors } from "@/lib/forms";
import { Field, fieldAria } from "./field";

export const campPrograms = [
  "School dental check-up program",
  "Corporate dental camp",
  "Oral cancer screening camp",
  "Dental awareness program",
  "Free consultation information",
] as const;

type Variant = "contact" | "camp";

type Props = {
  variant?: Variant;
  /** Pre-selects a clinic (e.g. on a branch page) */
  defaultBranch?: Branch["slug"];
  submitLabel?: string;
};

type Sent = { branch: Branch; waLink: string };

/**
 * Message to a clinic. Like the appointment form, it composes a WhatsApp message (no backend needed).
 * `variant="camp"` adds the fields needed to request a school / corporate / community program.
 */
export function MessageForm({ variant = "contact", defaultBranch, submitLabel }: Props) {
  const camp = variant === "camp";
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<Sent | null>(null);

  useEffect(() => {
    if (sent) doneRef.current?.focus();
  }, [sent]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = get("name");
    const phone = get("phone");
    const branchSlug = get("branch");
    const message = get("message");
    const organisation = get("organisation");
    const program = get("program");
    const people = get("people");

    const next: Errors = {};
    if (name.length < 2) next.name = camp ? "Please enter the contact person's name." : "Please enter your name.";
    if (!isValidPhone(phone)) next.phone = "Enter a valid 10-digit mobile number (e.g. 98765 43210).";
    if (!branchSlug) next.branch = "Please choose a clinic.";
    if (camp && organisation.length < 2) next.organisation = "Please enter your school, company or group name.";
    if (!camp && message.length < 5) next.message = "Please tell us a little about how we can help.";
    setErrors(next);
    if (Object.keys(next).length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    const branch = branches.find((b) => b.slug === branchSlug)!;
    const lines = camp
      ? [
          greeting(branch),
          "I'd like to arrange a dental program.",
          "",
          `Program: ${program || campPrograms[0]}`,
          `Organisation: ${organisation}`,
          `Contact person: ${name}`,
          `Phone: ${phone}`,
          ...(people ? [`Expected participants: ${people}`] : []),
          ...(message ? ["", message] : []),
        ]
      : [greeting(branch), "", `Name: ${name}`, `Phone: ${phone}`, "", message];
    const waLink = messageLink(branch, lines);
    window.open(waLink, "_blank", "noopener,noreferrer");
    setSent({ branch, waLink });
  }

  if (sent) {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" aria-live="polite" className="rounded-[2rem] border border-emerald-200 bg-emerald-50/60 p-7 outline-none sm:p-9">
        <span className="grid size-12 place-items-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <h3 className="font-display mt-5 text-3xl leading-tight text-primary-800">Press send in WhatsApp to finish</h3>
        <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-soft">
          Your message to the <strong>{sent.branch.shortName}</strong> clinic is ready in WhatsApp. If it didn&apos;t open, use the button below.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={sent.waLink} variant="whatsapp">
            <WhatsAppIcon className="size-5" /> Open WhatsApp
          </ButtonLink>
          <ButtonLink href={telUrl(sent.branch)} variant="outline">
            <Phone className="size-4" aria-hidden="true" /> Call {sent.branch.shortName}
          </ButtonLink>
          <Button variant="ghost" onClick={() => setSent(null)}>
            <Pencil className="size-4" aria-hidden="true" /> Edit message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6" aria-label={camp ? "Request a dental program" : "Contact form"}>
      {camp && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="School / company / group" htmlFor="organisation" required error={errors.organisation}>
            <input id="organisation" name="organisation" type="text" autoComplete="organization" className="field" {...fieldAria("organisation", errors.organisation)} />
          </Field>
          <Field label="Type of program" htmlFor="program">
            <select id="program" name="program" className="field" defaultValue={campPrograms[0]}>
              {campPrograms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={camp ? "Contact person" : "Your name"} htmlFor="name" required error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" className="field" {...fieldAria("name", errors.name)} />
        </Field>
        <Field label="Mobile number" htmlFor="phone" required error={errors.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className="field" {...fieldAria("phone", errors.phone)} />
        </Field>
      </div>

      <div className={camp ? "grid gap-6 sm:grid-cols-2" : ""}>
        <Field label={camp ? "Nearest clinic" : "Which clinic?"} htmlFor="branch" required error={errors.branch}>
          <select id="branch" name="branch" defaultValue={defaultBranch ?? ""} className="field" {...fieldAria("branch", errors.branch)}>
            <option value="" disabled>
              Choose a clinic
            </option>
            {branches.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.shortName}
                {b.city !== b.shortName ? `, ${b.city}` : ""}
              </option>
            ))}
          </select>
        </Field>
        {camp && (
          <Field label="Approx. number of participants" htmlFor="people">
            <input id="people" name="people" type="text" inputMode="numeric" placeholder="e.g. 120" className="field" />
          </Field>
        )}
      </div>

      <Field label={camp ? "Details" : "Your message"} htmlFor="message" required={!camp} error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={camp ? 3 : 5}
          placeholder={camp ? "Preferred dates, venue, age group — anything that helps us plan." : "How can we help?"}
          className="field"
          {...fieldAria("message", errors.message)}
        />
      </Field>

      <div>
        <Button type="submit" variant="whatsapp" size="lg" className="w-full sm:w-auto">
          <WhatsAppIcon className="size-5" /> {submitLabel ?? "Send on WhatsApp"}
        </Button>
        <p className="mt-3 text-sm text-muted">Opens WhatsApp with your message ready to send.</p>
      </div>
    </form>
  );
}
