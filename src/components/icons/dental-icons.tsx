import type { ReactNode, SVGProps } from "react";
import type { DentalIconName } from "@/data/treatments";

/**
 * Custom duotone dental icon family (48×48, 2.4px stroke).
 * Outlines use `currentColor`; the red accent uses `--icon-accent` (defaults to brand red) so the
 * same icon can be re-themed on dark backgrounds.
 */

/** Molar silhouette, centred in a 48×48 box (spans x 10.5–37.5, y 7.6–40). */
export const TOOTH_PATH =
  "M24 10.2C21.6 8.2 16.2 7.3 13 10.6c-2.8 3-2.2 7.8-.8 12.4 1.4 4.6 2 14.2 5.2 16.2 2.8 1.6 4-5.4 5-9 .7-2.4 2.5-2.4 3.2 0 1 3.6 2.2 10.6 5 9 3.2-2 3.8-11.6 5.2-16.2 1.4-4.6 2-9.4-.8-12.4-3.2-3.3-8.6-2.4-11-.4Z";
const TOOTH = TOOTH_PATH;

/** Small tooth used for bridges (12×16, origin top-left). */
const MINI_TOOTH =
  "M0 7.5C0 3.1 2.6.3 6 .3s6 2.8 6 7.2c0 3.4-.8 8.2-2 8.2-1 0-1.4-2.4-4-2.4s-3 2.4-4 2.4C.8 15.7 0 10.9 0 7.5Z";

const spark = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}l${r * 0.36} ${r * 0.64} ${r * 0.64} ${r * 0.36}-${r * 0.64} ${r * 0.36}-${r * 0.36} ${r * 0.64}-${r * 0.36}-${r * 0.64}-${r * 0.64}-${r * 0.36} ${r * 0.64}-${r * 0.36}Z`;

const glyphs: Record<DentalIconName, () => ReactNode> = {
  tooth: () => <path d={TOOTH} />,

  general: () => (
    <>
      <g transform="translate(-2.5 -3) scale(.9)">
        <path d={TOOTH} />
      </g>
      <circle cx="35.5" cy="35.5" r="8" className="ic-fill" />
      <path d="m31.7 35.7 2.7 2.7 4.9-5.3" className="ic-white" />
    </>
  ),

  preventive: () => (
    <>
      <path d="M24 5.5 38.5 10.8V22c0 9-6 15.2-14.5 19.5C15.5 37.2 9.5 31 9.5 22V10.8Z" />
      <g transform="translate(14.4 11.6) scale(.4)">
        <path d={TOOTH} className="ic-fill" />
      </g>
    </>
  ),

  restorative: () => (
    <>
      <path d={TOOTH} />
      <rect x="18.2" y="13" width="11.6" height="7.4" rx="3.7" className="ic-fill" />
    </>
  ),

  rootcanal: () => (
    <>
      <path d={TOOTH} />
      <path d="M24 17.5c-2.4 4.4-5.9 7.6-6.4 14.5" className="ic-stroke" />
      <path d="M24 17.5c2.4 4.4 5.9 7.6 6.4 14.5" className="ic-stroke" />
      <circle cx="24" cy="16.5" r="3" className="ic-fill" />
    </>
  ),

  prostho: () => (
    <>
      <g transform="translate(3 8.5) scale(1.12)">
        <path d={MINI_TOOTH} />
      </g>
      <g transform="translate(17.4 6.5) scale(1.12)">
        <path d={MINI_TOOTH} />
      </g>
      <g transform="translate(31.8 8.5) scale(1.12)">
        <path d={MINI_TOOTH} />
      </g>
      <path d="M5.5 35.5h37" className="ic-stroke" strokeWidth="3.6" />
    </>
  ),

  implant: () => (
    <>
      <path d="M14.5 17v-7.5c0-2.5 1.7-4.2 4.2-4.2h10.6c2.5 0 4.2 1.7 4.2 4.2V17c0 2.1-1.3 3.3-3.2 3.3H17.7c-1.9 0-3.2-1.2-3.2-3.3Z" />
      <path d="M20.5 20.3h7V25h-7Z" className="ic-fill" />
      <path d="M19.2 25h9.6l-1.5 17.4h-6.6Z" />
      <path d="M19.4 29.6h9.2M20 34.4h8M20.6 39h6.8" className="ic-stroke" strokeWidth="2" />
    </>
  ),

  cosmetic: () => (
    <>
      <g transform="translate(-4 3.4) scale(.86)">
        <path d={TOOTH} />
      </g>
      <path d={spark(37.5, 11, 7)} className="ic-fill" />
      <path d={spark(41, 27, 3.8)} className="ic-fill" />
    </>
  ),

  ortho: () => (
    <>
      <rect x="4.5" y="14" width="11.5" height="20" rx="4.5" />
      <rect x="18.25" y="12" width="11.5" height="22" rx="4.5" />
      <rect x="32" y="14" width="11.5" height="20" rx="4.5" />
      <path d="M2.5 24.2h43" className="ic-stroke" strokeWidth="1.9" />
      <rect x="7.4" y="21.4" width="5.7" height="5.6" rx="1.3" className="ic-fill" />
      <rect x="21.15" y="21.4" width="5.7" height="5.6" rx="1.3" className="ic-fill" />
      <rect x="34.9" y="21.4" width="5.7" height="5.6" rx="1.3" className="ic-fill" />
    </>
  ),

  surgery: () => (
    <>
      <g transform="translate(2.6 9.4) scale(.76)">
        <path d={TOOTH} />
      </g>
      <path d="M24 13V4" className="ic-stroke" />
      <path d="m19.2 8.2 4.8-4.7 4.8 4.7" className="ic-stroke" />
    </>
  ),

  pediatric: () => (
    <>
      <path d={TOOTH} />
      <circle cx="19.8" cy="17.4" r="1.6" className="ic-fill" />
      <circle cx="28.2" cy="17.4" r="1.6" className="ic-fill" />
      <path d="M19.8 22.4c1.3 1.9 2.6 2.7 4.2 2.7s2.9-.8 4.2-2.7" className="ic-stroke" strokeWidth="2" />
    </>
  ),

  perio: () => (
    <>
      <path d={TOOTH} />
      <path d="M5.5 27.6c3.2-3.8 6.3 3.8 9.5 0s6.3-3.8 9.5 0 6.3 3.8 9.5 0 3.3-2.6 8.5-.2" className="ic-stroke" strokeWidth="2.6" />
    </>
  ),
};

type Props = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: DentalIconName;
  size?: number | string;
  strokeWidth?: number;
};

export function DentalIcon({ name, size = 48, strokeWidth = 2.4, className, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {glyphs[name]()}
    </svg>
  );
}
