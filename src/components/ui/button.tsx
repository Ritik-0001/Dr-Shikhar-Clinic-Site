import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "outline-light" | "ghost" | "light" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold leading-none transition-[background-color,box-shadow,border-color,color,translate] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent-600 text-white shadow-cta hover:bg-accent-700",
  secondary: "bg-primary-900 text-white hover:bg-primary-800",
  outline: "border-[1.5px] border-primary-900/25 text-primary-900 hover:border-primary-900 hover:bg-white/70",
  "outline-light": "border-2 border-white/30 text-white hover:border-white/70 hover:bg-white/10",
  ghost: "text-primary-900 hover:bg-surface",
  light: "bg-white text-primary-900 hover:bg-primary-50",
  whatsapp: "bg-whatsapp-deep text-white hover:bg-[#0c6a38]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.95rem] sm:px-6",
  lg: "h-14 px-6 text-base sm:px-8",
};

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string };

export const buttonStyles = ({ variant = "primary", size = "md", className }: StyleProps = {}) =>
  cn(base, variants[variant], sizes[size], className);

type LinkProps = StyleProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & { href: string; external?: boolean };

/** Anchor-styled button. Internal paths use next/link; everything else (tel:, wa.me, https) is a plain <a>. */
export function ButtonLink({ variant, size, className, href, external, children, ...rest }: LinkProps) {
  const cls = buttonStyles({ variant, size, className });
  const isInternal = href.startsWith("/") && !external;
  if (isInternal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  const isWeb = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={cls}
      {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

type ButtonProps = StyleProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant, size, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...rest} />;
}
