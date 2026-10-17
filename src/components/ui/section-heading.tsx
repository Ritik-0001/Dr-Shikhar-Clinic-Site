import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", tone = "light", as: Tag = "h2", className }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", dark && "text-accent-300")}>{eyebrow}</p>}
      <Tag
        className={cn(
          "font-display mt-4 text-[clamp(1.9rem,1.4rem+2.3vw,3.1rem)] leading-[1.12] tracking-[-0.03em]",
          dark ? "text-white" : "text-primary-900",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className={cn("mt-5 text-[1.05rem] leading-relaxed sm:text-lg", dark ? "text-primary-200" : "text-muted", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
