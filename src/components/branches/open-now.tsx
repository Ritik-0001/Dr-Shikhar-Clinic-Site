"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const label = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${m ? `:${String(m).padStart(2, "0")}` : ""} ${suffix}`;
};

/** Works out whether the clinic is open right now, in Indian Standard Time, from the shared timings. */
export function getOpenStatus(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.hours.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = WEEKDAY[get("weekday")] ?? 0;
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const sessions = site.hours.sessions;
  const openToday = (site.hours.openDays as readonly number[]).includes(day);

  if (openToday) {
    const current = sessions.find((s) => minutes >= toMinutes(s.from) && minutes < toMinutes(s.to));
    if (current) return { open: true, text: `Open now · closes ${label(current.to)}` };
    const next = sessions.find((s) => minutes < toMinutes(s.from));
    if (next) return { open: false, text: `Closed now · opens ${label(next.from)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if ((site.hours.openDays as readonly number[]).includes(d)) {
      return { open: false, text: `Closed · opens ${i === 1 ? "tomorrow" : DAYS[d]} ${label(sessions[0].from)}` };
    }
  }
  return { open: false, text: "Closed" };
}

// Time is an external store: re-read once a minute. The snapshot is a primitive string so React can
// compare it cheaply, and the server snapshot is null so the static HTML never claims a stale status.
const subscribe = (notify: () => void) => {
  const id = setInterval(notify, 60_000);
  return () => clearInterval(id);
};
const getSnapshot = () => {
  const s = getOpenStatus(new Date());
  return `${s.open ? "1" : "0"}|${s.text}`;
};
const getServerSnapshot = () => null;

/** Small live status pill ("Open now · closes 1 PM"), computed in Indian Standard Time. */
export function OpenNow({ className }: { className?: string }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!snapshot) return <span className={cn("inline-block h-7 w-40", className)} aria-hidden="true" />;
  const [flag, ...rest] = snapshot.split("|");
  const status = { open: flag === "1", text: rest.join("|") };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.8125rem] font-bold",
        status.open ? "bg-emerald-50 text-emerald-800" : "bg-surface-2 text-ink-soft",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", status.open ? "bg-emerald-500" : "bg-muted")} aria-hidden="true" />
      {status.text}
    </span>
  );
}
