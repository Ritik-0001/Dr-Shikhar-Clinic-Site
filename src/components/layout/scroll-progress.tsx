"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * A thin gradient line along the bottom edge of the header that fills as the page is scrolled and is
 * complete at the very bottom. It sticks with the header, so it is always visible while reading.
 * (Updates a single transform per animation frame: no state, no re-renders.)
 */
export function ScrollProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, root.scrollTop / scrollable)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // The page gets taller or shorter as images, accordions and deferred sections settle.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]); // a new page has a new height, so measure again after every route change

  return <div ref={barRef} aria-hidden="true" className="scroll-progress" />;
}
