"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Makes a page change feel like one. A slim progress bar starts the moment an internal link is clicked and
 * completes when the new route has rendered, and the new page eases in. Nothing animates on the first load.
 * (Pure DOM class toggles: no state, no re-renders.)
 */
export function RouteFeedback() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const previous = useRef(pathname);
  const giveUp = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Start the bar as soon as an internal, same-tab link is clicked.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      bar.classList.remove("done");
      void bar.offsetWidth; // restart the CSS transition
      bar.classList.add("running");
      // If the navigation never completes (offline, cancelled), do not leave the bar hanging.
      clearTimeout(giveUp.current);
      giveUp.current = setTimeout(() => bar.classList.remove("running"), 12_000);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(giveUp.current);
    };
  }, []);

  // Finish the bar and replay the entrance animation once the route has actually changed.
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    clearTimeout(giveUp.current);
    const bar = barRef.current;
    bar?.classList.remove("running");
    bar?.classList.add("done");
    const main = document.querySelector("main");
    if (main) {
      main.classList.remove("page-in");
      void main.offsetWidth;
      main.classList.add("page-in");
    }
  }, [pathname]);

  return <div ref={barRef} className="route-progress" aria-hidden="true" />;
}
