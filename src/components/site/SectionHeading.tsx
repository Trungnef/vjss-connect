import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "items-center text-center lg:flex-col lg:items-center",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
            <p className="section-kicker">{eyebrow}</p>
            <span className="h-px w-14 bg-gradient-to-r from-gold via-semi-blue to-transparent" />
          </div>
        ) : null}
        <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.08] text-balance sm:text-4xl lg:text-[3rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-8 text-foreground/74 sm:text-lg">
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
