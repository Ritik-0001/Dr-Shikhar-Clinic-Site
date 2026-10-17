import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { primaryNav, treatmentLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";
import { ScrollProgress } from "./scroll-progress";

/**
 * Solid, full-width header bar: fully opaque (nothing shows through it) and sticky, with a gradient
 * scroll-progress line along its bottom edge.
 * Note: the container must stay un-positioned so the mega menu can span the whole bar.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="container-page flex h-16 items-stretch justify-between gap-6 sm:h-[4.5rem]">
        <Link href="/" aria-label={`${site.name} home`} className="flex shrink-0 items-center rounded-lg">
          <Logo height={40} eager />
        </Link>

        <DesktopNav items={primaryNav} treatments={treatmentLinks} />

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <ButtonLink href="/appointment">Book Appointment</ButtonLink>
          </div>
          <MobileMenu />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
