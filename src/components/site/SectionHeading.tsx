import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
  size = "default",
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "default" | "large" | "small";
}) {
  const titleSizes = {
    small: "mt-3 font-serif text-xl font-semibold leading-tight sm:text-2xl",
    default: "mt-4 font-serif text-2xl font-semibold leading-[1.12] text-balance sm:text-3xl lg:text-4xl",
    large: "mt-5 font-serif text-3xl font-bold leading-[1.08] text-balance sm:text-4xl lg:text-[2.75rem]",
  };

  const eyebrowSizes = {
    small: "section-kicker text-lg sm:text-xl font-semibold",
    default: "section-kicker text-xl sm:text-2xl lg:text-[1.75rem] font-semibold",
    large: "section-kicker text-2xl sm:text-3xl font-bold",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "items-center text-center lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
            <span className="accent-bar" aria-hidden="true" />
            <p className={eyebrowSizes[size]}>{eyebrow}</p>
          </div>
        ) : null}
        {title ? (
          <h2 className={cn(titleSizes[size], "text-foreground")}>
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/72 sm:text-lg sm:leading-8">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div
          className={cn(
            "flex flex-wrap gap-3 lg:self-start",
            align === "center" && "justify-center",
          )}
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}
