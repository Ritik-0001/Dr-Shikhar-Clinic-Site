import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import type { Procedure } from "@/data/treatments";

/** Every procedure in a speciality, with a plain-language description. */
export function ProcedureList({ procedures }: { procedures: Procedure[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      {procedures.map((p, i) => (
        <li
          key={p.name}
          style={{ "--i": i % 2 } as CSSProperties}
          className="reveal flex gap-4 rounded-3xl border border-line bg-white p-5 sm:p-6"
        >
          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
            <Check className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-[1.05rem] font-bold leading-snug text-primary-900">{p.name}</h3>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{p.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
