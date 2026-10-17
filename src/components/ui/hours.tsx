import { site } from "@/data/site";

/**
 * Opening hours as short lines: the days, one line per session and the closed day.
 * Each session stays on one line so a time range never breaks in the middle on narrow screens.
 */
export function HoursLines({ className, showClosed = true }: { className?: string; showClosed?: boolean }) {
  return (
    <span className={className}>
      {site.hours.label}
      {site.hours.sessions.map((s) => (
        <span key={s.name} className="block whitespace-nowrap">
          {s.display}
        </span>
      ))}
      {showClosed && (
        <span className="block">
          {site.hours.closedLabel}: Closed
        </span>
      )}
    </span>
  );
}
