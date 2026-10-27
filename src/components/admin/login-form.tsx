"use client";

import { useActionState } from "react";
import { LoaderCircle, Lock } from "lucide-react";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="grid gap-4">
      <div>
        <label htmlFor="password" className="mb-2 block text-[0.95rem] font-bold text-primary-900">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus className="field" aria-describedby={state?.error ? "login-error" : undefined} aria-invalid={state?.error ? true : undefined} />
      </div>
      {state?.error && (
        <p id="login-error" role="alert" className="text-sm font-semibold text-accent-700">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent-600 px-8 text-base font-bold text-white shadow-cta transition-colors hover:bg-accent-700 disabled:opacity-70">
        {pending ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <Lock className="size-5" aria-hidden="true" />}
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
