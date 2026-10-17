/**
 * Illustrated before/after smiles (front view of the upper teeth) used by the Smile Gallery.
 * Pure SVG, no photography, each case changes one thing (shade, gap, alignment, chip, missing tooth).
 */

export type SmileCase = "whitening" | "gap" | "alignment" | "chip" | "missing" | "makeover";
export type SmileState = "before" | "after";

type Tooth = {
  /** left edge */
  x: number;
  /** visible bottom edge */
  bottom: number;
  w: number;
  shape: "incisor" | "canine";
  rotate?: number;
  /** nudge forward (towards viewer): draws on top of neighbours */
  front?: boolean;
  chipped?: boolean;
  missing?: boolean;
  stain?: boolean;
};

const TOP = 62; // teeth start under the gum

/** Natural-ish smile arc: canines slightly higher, centrals lowest. */
function baseTeeth(): Tooth[] {
  return [
    { x: 38, bottom: 150, w: 56, shape: "canine" },
    { x: 94, bottom: 156, w: 50, shape: "incisor" },
    { x: 144, bottom: 166, w: 58, shape: "incisor" },
    { x: 202, bottom: 166, w: 58, shape: "incisor" },
    { x: 260, bottom: 156, w: 50, shape: "incisor" },
    { x: 310, bottom: 150, w: 56, shape: "canine" },
  ];
}

/**
 * Defects are placed on the LEFT half of the smile: the comparison slider shows "before" on the left,
 * so the problem is visible at the slider's default position.
 */
function teethFor(kind: SmileCase, state: SmileState): Tooth[] {
  const t = baseTeeth();
  const before = state === "before";
  if (kind === "whitening") return t.map((x) => ({ ...x, stain: before }));
  if (kind === "gap" && before) {
    t[2] = { ...t[2], x: t[2].x - 11 };
    t[3] = { ...t[3], x: t[3].x + 11 };
  }
  if ((kind === "alignment" || kind === "makeover") && before) {
    t[0] = { ...t[0], x: t[0].x + 2, rotate: -8 };
    t[1] = { ...t[1], x: t[1].x + 4, bottom: t[1].bottom - 6, rotate: 13, front: true };
    t[2] = { ...t[2], rotate: -5 };
    t[3] = { ...t[3], x: t[3].x - 4, rotate: 6, front: true };
    t[4] = { ...t[4], x: t[4].x - 8, bottom: t[4].bottom - 2, rotate: -11 };
  }
  if (kind === "makeover") return t.map((x) => ({ ...x, stain: before }));
  if (kind === "chip" && before) t[2] = { ...t[2], chipped: true, bottom: t[2].bottom - 6 };
  if (kind === "missing" && before) t[1] = { ...t[1], missing: true };
  return t;
}

function toothPath(t: Tooth) {
  const { x, w, bottom: b } = t;
  const r = 15;
  const top = TOP;
  if (t.shape === "canine") {
    return `M${x} ${top} H${x + w} V${b - 26} Q${x + w - 4} ${b - 6} ${x + w / 2} ${b + 4} Q${x + 4} ${b - 6} ${x} ${b - 26}Z`;
  }
  if (t.chipped) {
    // missing top-right corner
    return `M${x} ${top} H${x + w} V${b - 44} L${x + w - 22} ${b - 30} L${x + w - 14} ${b - 12} Q${x + w - 18} ${b} ${x + w - r - 6} ${b} H${x + r} Q${x} ${b} ${x} ${b - r}Z`;
  }
  return `M${x} ${top} H${x + w} V${b - r} Q${x + w} ${b} ${x + w - r} ${b} H${x + r} Q${x} ${b} ${x} ${b - r}Z`;
}

export function SmileIllustration({ kind, state, className }: { kind: SmileCase; state: SmileState; className?: string }) {
  const teeth = teethFor(kind, state);
  const ordered = [...teeth].sort((a, b) => Number(a.front ?? false) - Number(b.front ?? false));
  const id = `${kind}-${state}`;
  return (
    <svg viewBox="0 0 400 230" className={className} role="img" aria-label={`${state === "before" ? "Before" : "After"} illustration: ${kind}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}-white`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfdff" />
          <stop offset="1" stopColor="#e6eefa" />
        </linearGradient>
        <linearGradient id={`${id}-stain`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ead9a0" />
          <stop offset="1" stopColor="#cdb26a" />
        </linearGradient>
        <linearGradient id={`${id}-gum`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e98f94" />
          <stop offset="1" stopColor="#f2a7aa" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect width="400" height="230" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        {/* mouth interior + lips */}
        <rect width="400" height="230" fill="#6f2b36" />
        <path d="M0 0H400V70Q200 40 0 70Z" fill="#cf6f78" />
        <path d="M0 230H400V186Q200 226 0 186Z" fill="#d7808a" />

        {/* teeth (behind-to-front) */}
        {ordered.map((t, i) => {
          if (t.missing) return null;
          const cx = t.x + t.w / 2;
          const cy = (TOP + t.bottom) / 2;
          const fill = t.stain ? `url(#${id}-stain)` : `url(#${id}-white)`;
          return (
            <g key={i} transform={t.rotate ? `rotate(${t.rotate} ${cx} ${cy})` : undefined}>
              <path d={toothPath(t)} fill={fill} stroke={t.stain ? "#b69a52" : "#c7d7ee"} strokeWidth="1.6" strokeLinejoin="round" />
              {!t.stain && <path d={`M${t.x + 10} ${TOP + 22} Q${t.x + 7} ${(TOP + t.bottom) / 2} ${t.x + 11} ${t.bottom - 30}`} fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" opacity="0.9" />}
              {t.stain && <path d={`M${t.x + 12} ${t.bottom - 28} q${t.w / 3} 8 ${t.w - 26} 0`} fill="none" stroke="#b8993f" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />}
            </g>
          );
        })}

        {/* gum line on top of the teeth */}
        <path d={`M0 0H400V ${TOP + 6}Q300 ${TOP + 30} 200 ${TOP + 8}Q100 ${TOP + 30} 0 ${TOP + 6}Z`} fill={`url(#${id}-gum)`} />
        <path d={`M0 ${TOP + 6}Q100 ${TOP + 30} 200 ${TOP + 8}Q300 ${TOP + 30} 400 ${TOP + 6}`} fill="none" stroke="#d9777d" strokeWidth="2" opacity="0.7" />
      </g>
    </svg>
  );
}
