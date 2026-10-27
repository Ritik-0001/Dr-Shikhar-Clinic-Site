import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/ui/logo";
import { authConfigured, isAdmin } from "@/lib/cms/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = authConfigured();

  return (
    <div className="relative isolate grid min-h-dvh place-items-center overflow-hidden px-4 py-12">
      <span className="glow absolute -right-40 -top-40 -z-10 size-[44rem] [--glow:rgb(236_205_150/0.5)]" aria-hidden="true" />
      <span className="glow absolute -bottom-48 -left-40 -z-10 size-[40rem] [--glow:rgb(246_205_188/0.8)]" aria-hidden="true" />
      <div className="w-full max-w-md">
        <div className="flex justify-center">
          <Logo height={52} eager />
        </div>
        <div className="mt-8 rounded-[2rem] border border-line bg-white p-7 sm:p-9">
          <h1 className="font-display text-[1.9rem] leading-tight text-primary-900">Welcome back</h1>
          <p className="mt-2 text-muted">Sign in to manage the blog and the photos on your website.</p>
          <div className="mt-7">
            {configured ? (
              <LoginForm />
            ) : (
              <div className="rounded-2xl bg-accent-50 p-5 text-[0.95rem] leading-relaxed text-ink-soft">
                <p className="font-bold text-primary-900">The admin password is not set up yet.</p>
                <p className="mt-1.5">
                  In your Vercel project, open Settings, then Environment Variables, add <strong>ADMIN_PASSWORD</strong> with a strong password, and redeploy.
                </p>
              </div>
            )}
          </div>
        </div>
        <p className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-accent-700">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to the website
          </Link>
        </p>
      </div>
    </div>
  );
}
