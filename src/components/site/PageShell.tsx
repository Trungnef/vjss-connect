import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageMetaItem = {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
};

type PageQuickLink = {
  label: ReactNode;
  href: string;
};

export function PageShell({
  children,
  className,
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  meta?: PageMetaItem[];
  quickLinks?: PageQuickLink[];
  heroNote?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className="relative overflow-hidden">
      <section className={cn("site-shell py-10 sm:py-12", className)}>{children}</section>
    </article>
  );
}
