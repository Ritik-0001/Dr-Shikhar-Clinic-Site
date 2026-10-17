import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/** Intrinsic sizes of the traced SVG logos in /public/brand (see scripts/build-brand-assets.mjs). */
const LOGOS = {
  horizontal: { file: "logo-horizontal", w: 2716, h: 705 },
  emblem: { file: "emblem", w: 555, h: 705 },
  "stacked-english": { file: "logo-stacked-english", w: 1241, h: 1027 },
  "stacked-gujarati": { file: "logo-stacked-gujarati", w: 746, h: 1163 },
  "wordmark-english": { file: "wordmark-english", w: 1241, h: 313 },
  "wordmark-gujarati": { file: "wordmark-gujarati", w: 746, h: 439 },
} as const;

export type LogoVariant = keyof typeof LOGOS;

type Props = {
  variant?: LogoVariant;
  /** White/coral version for dark backgrounds */
  reversed?: boolean;
  /** Rendered height in px (width follows the logo's aspect ratio) */
  height?: number;
  eager?: boolean;
  className?: string;
  alt?: string;
};

export function Logo({ variant = "horizontal", reversed = false, height = 48, eager = false, className, alt = site.name }: Props) {
  const { file, w, h } = LOGOS[variant];
  return (
    <Image
      src={`/brand/${file}${reversed ? "-reversed" : ""}.svg`}
      alt={alt}
      width={w}
      height={h}
      unoptimized // already vector — nothing for the image optimiser to do
      loading={eager ? "eager" : "lazy"}
      style={{ height, width: "auto" }}
      className={cn("block max-w-none select-none", className)}
    />
  );
}
