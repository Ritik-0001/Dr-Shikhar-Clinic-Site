import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { Logo } from "@/components/ui/logo";
import { requireAdmin } from "@/lib/cms/auth";
import { logout } from "../actions";

/** Everything under /admin except the login screen: signed-in only, with a navy sidebar (top bar on phones). */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  const footerLinks = (
    <div className="grid gap-1">
      <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-3 text-[0.95rem] font-bold text-primary-100 hover:bg-white/10 hover:text-white">
        <ExternalLink className="size-[1.1rem]" aria-hidden="true" /> View website
      </Link>
      <form action={logout}>
        <button type="submit" className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-[0.95rem] font-bold text-primary-100 hover:bg-white/10 hover:text-white">
          <LogOut className="size-[1.1rem]" aria-hidden="true" /> Sign out
        </button>
      </form>
    </div>
  );

  return (
    <div className="lg:pl-64">
      {/* sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col overflow-hidden bg-primary-950 p-5 text-white lg:flex">
        <span className="glow absolute -left-24 -top-24 size-72 [--glow:rgb(58_116_192/0.4)]" aria-hidden="true" />
        <span className="glow absolute -bottom-32 -right-24 size-72 [--glow:rgb(195_38_47/0.22)]" aria-hidden="true" />
        <span className="grain-layer" aria-hidden="true" />
        <div className="relative flex h-full flex-col">
          <Link href="/admin" aria-label="Admin home" className="px-2 pt-1">
            <Logo reversed height={42} eager />
          </Link>
          <p className="mt-2 px-2 text-[0.6875rem] font-extrabold uppercase tracking-[0.18em] text-accent-300">Admin panel</p>
          <div className="mt-8">
            <AdminNav variant="sidebar" />
          </div>
          <div className="mt-auto border-t border-white/10 pt-4">{footerLinks}</div>
        </div>
      </aside>

      {/* top bar (phones and tablets) */}
      <header className="sticky top-0 z-30 bg-primary-950 px-4 pb-3 pt-3 text-white lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/admin" aria-label="Admin home">
            <Logo reversed height={34} eager />
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" target="_blank" aria-label="View website" className="grid size-10 place-items-center rounded-full text-primary-100 hover:bg-white/10">
              <ExternalLink className="size-5" aria-hidden="true" />
            </Link>
            <form action={logout}>
              <button type="submit" aria-label="Sign out" className="grid size-10 cursor-pointer place-items-center rounded-full text-primary-100 hover:bg-white/10">
                <LogOut className="size-5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-3">
          <AdminNav variant="bar" />
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">{children}</div>
    </div>
  );
}
