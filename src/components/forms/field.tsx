import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

/** Label + control + hint + error, wired together for screen readers (ids: `${htmlFor}-hint` / `-error`). */
export function Field({ label, htmlFor, required, error, hint, className, children }: Props) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline gap-1.5 text-[0.95rem] font-bold text-primary-900">
        {label}
        {required ? <span className="text-accent-600" aria-hidden="true">*</span> : <span className="text-sm font-medium text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-accent-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/** aria wiring for a control inside <Field> */
export const fieldAria = (id: string, error?: string, hint?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});

export function FieldSet({ legend, required, error, children, className }: { legend: string; required?: boolean; error?: string; children: ReactNode; className?: string }) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="mb-2 flex items-baseline gap-1.5 text-[0.95rem] font-bold text-primary-900">
        {legend}
        {required ? <span className="text-accent-600" aria-hidden="true">*</span> : <span className="text-sm font-medium text-muted">(optional)</span>}
      </legend>
      {children}
      {error && (
        <p role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-accent-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </fieldset>
  );
}
