/** Vertical numbered timeline for "what to expect" sequences. */
export function StepsTimeline({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="relative grid gap-7">
      <span className="absolute bottom-6 left-[1.4rem] top-6 w-0.5 bg-linear-to-b from-primary-200 via-primary-200 to-transparent" aria-hidden="true" />
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5">
          <span className="font-display relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-primary-900 text-lg text-white ring-4 ring-canvas">{i + 1}</span>
          <div className="pt-1.5">
            <h3 className="text-lg font-bold text-primary-900">{s.title}</h3>
            <p className="mt-1 text-[1rem] leading-relaxed text-muted">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
