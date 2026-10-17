import { TOOTH_PATH } from "@/components/icons/dental-icons";

const star = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}L${cx + r * 0.3} ${cy - r * 0.3}L${cx + r} ${cy}L${cx + r * 0.3} ${cy + r * 0.3}L${cx} ${cy + r}L${cx - r * 0.3} ${cy + r * 0.3}L${cx - r} ${cy}L${cx - r * 0.3} ${cy - r * 0.3}Z`;

/** Glossy brand-toned molar used as the hero centrepiece. Pure SVG: zero image weight. */
export function HeroTooth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 380" className={className} role="img" aria-label="Illustration of a healthy, gleaming tooth">
      <defs>
        <linearGradient id="ht-body" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#f2f7fd" />
          <stop offset="1" stopColor="#c9dcf3" />
        </linearGradient>
        <linearGradient id="ht-shade" x1="0.2" y1="0.1" x2="1" y2="0.9">
          <stop offset="0.45" stopColor="#16478c" stopOpacity="0" />
          <stop offset="1" stopColor="#16478c" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="ht-ground" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#11305c" stopOpacity="0.3" />
          <stop offset="1" stopColor="#11305c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="160" cy="354" rx="104" ry="11" fill="url(#ht-ground)" />

      <g transform="translate(-70.3 -48.5) scale(9.6)">
        <path d={TOOTH_PATH} fill="url(#ht-body)" stroke="#7fa6dc" strokeWidth="0.34" strokeLinejoin="round" />
        <path d={TOOTH_PATH} fill="url(#ht-shade)" />
        {/* gloss */}
        <path d="M14.6 12.4c-.7 2.4-.8 5.2.1 8.2" fill="none" stroke="#fff" strokeWidth="1.15" strokeLinecap="round" opacity="0.95" />
        <circle cx="16.4" cy="11.3" r="0.55" fill="#fff" opacity="0.95" />
        <path d="M31.4 13.4c.6 1.8.7 3.6.3 5.6" fill="none" stroke="#fff" strokeWidth="0.7" strokeLinecap="round" opacity="0.55" />
      </g>

      <path d={star(268, 74, 17)} fill="#6496d6" />
      <path d={star(48, 176, 11)} fill="#c3262f" />
      <path d={star(256, 304, 9)} fill="#9bbce7" />
    </svg>
  );
}
