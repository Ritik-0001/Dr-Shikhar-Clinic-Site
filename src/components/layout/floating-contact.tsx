"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, CalendarCheck, MapPin, Phone, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { branches } from "@/data/branches";
import { site } from "@/data/site";
import { telUrl, whatsappUrl } from "@/lib/contact";

type Action = "call" | "whatsapp";

const copy: Record<Action, { title: string; hint: string }> = {
  whatsapp: { title: "Chat on WhatsApp", hint: "Choose the clinic you'd like to message." },
  call: { title: "Call a clinic", hint: "Choose the clinic you'd like to call." },
};

/**
 * Always-available contact: a WhatsApp button on desktop and a sticky Call / WhatsApp / Book bar on
 * mobile. Because there are two clinics, both open one small chooser instead of guessing a number.
 */
export function FloatingContact() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [action, setAction] = useState<Action>("whatsapp");

  const open = (next: Action) => {
    setAction(next);
    dialogRef.current?.showModal();
  };

  return (
    <>
      {/* Desktop floating button */}
      <button
        type="button"
        onClick={() => open("whatsapp")}
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden size-14 cursor-pointer place-items-center rounded-full bg-whatsapp text-white shadow-[0_14px_32px_-10px_rgb(31_168_85/0.75)] transition-transform duration-200 hover:scale-105 focus-visible:outline-offset-4 lg:grid"
      >
        <WhatsAppIcon className="size-7" />
      </button>

      {/* Mobile sticky action bar */}
      <div role="region" aria-label="Quick contact actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_-12px_rgb(17_48_92/0.25)] lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-[1fr_1fr_1.5fr] gap-2 p-2.5">
          <button
            type="button"
            onClick={() => open("call")}
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-primary-900/25 bg-white text-sm font-bold text-primary-900"
          >
            <Phone className="size-[1.1rem]" aria-hidden="true" /> Call
          </button>
          <button
            type="button"
            onClick={() => open("whatsapp")}
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-whatsapp-deep text-sm font-bold text-white"
          >
            <WhatsAppIcon className="size-[1.1rem]" /> Chat
          </button>
          <Link
            href="/appointment"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent-600 text-sm font-bold text-white shadow-cta"
          >
            <CalendarCheck className="size-[1.1rem]" aria-hidden="true" /> Book Now
          </Link>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={copy[action].title}
        className="sheet"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="rounded-t-[2rem] bg-canvas p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-lift lg:rounded-[2rem]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-primary-900">{copy[action].title}</h2>
              <p className="mt-0.5 text-sm text-muted">{copy[action].hint}</p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => dialogRef.current?.close()}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-surface text-primary-900 hover:bg-surface-2"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-4 grid gap-2.5">
            {branches.map((b) => {
              const href =
                action === "call"
                  ? telUrl(b)
                  : whatsappUrl(b.phone.whatsapp, `Hello ${site.name} (${b.shortName}), I'd like to book an appointment.`);
              return (
                <li key={b.slug}>
                  <a
                    href={href}
                    {...(action === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => dialogRef.current?.close()}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-primary-900/30 hover:bg-white"
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-full text-white ${action === "call" ? "bg-primary-700" : "bg-whatsapp"}`}
                    >
                      {action === "call" ? <Phone className="size-5" aria-hidden="true" /> : <WhatsAppIcon className="size-6" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 font-bold text-primary-900">
                        <MapPin className="size-4 shrink-0 text-accent-600" aria-hidden="true" />
                        <span>
                          {b.shortName}
                          {b.city !== b.shortName && <span className="font-medium text-muted">, {b.city}</span>}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-sm text-muted">{b.phone.display}</span>
                    </span>
                    <ArrowRight className="size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary-700" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </dialog>
    </>
  );
}
