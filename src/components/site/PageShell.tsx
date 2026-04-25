import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageShell({
  eyebrow,
  title,
  description,
  aside,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className="relative overflow-hidden">
      <section className="surface-grid border-b border-border/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-vn-red">
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-6 max-w-3xl text-base leading-7 text-foreground/80 sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>

          {aside ? (
            <aside className="soft-panel self-start rounded-3xl border border-border/70 p-6">
              {aside}
            </aside>
          ) : null}
        </div>
      </section>

      <section
        className={cn("mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", className)}
      >
        {children}
      </section>
    </article>
  );
}
