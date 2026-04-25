import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  eyebrow,
  title,
  description,
  actions,
  aside,
  meta,
  quickLinks,
  heroNote,
  children,
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  meta?: PageMetaItem[];
  quickLinks?: PageQuickLink[];
  heroNote?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const { t } = useTranslation();
  const hasSidebar = Boolean(aside) || Boolean(quickLinks?.length);

  return (
    <article className="relative overflow-hidden">
      <section className="page-hero border-b border-border/70 border-beam">
        <div
          className={cn(
            "site-shell grid gap-10 py-18 sm:py-22 lg:py-24",
            hasSidebar && "lg:grid-cols-[minmax(0,1fr)_23rem] xl:grid-cols-[minmax(0,1fr)_25rem]",
          )}
        >
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground/48">
              <Link to="/" className="transition-colors hover:text-foreground">
                {t("pageShell.home")}
              </Link>
              <span>/</span>
              <span className="text-foreground/72">{eyebrow}</span>
            </div>
            <span className="signal-chip mt-4">{eyebrow}</span>
            <h1 className="mt-6 max-w-5xl font-serif text-4xl font-semibold leading-[1.06] text-balance sm:text-5xl lg:text-[4rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-6 max-w-3xl text-base leading-7 text-foreground/76 sm:text-lg">
                {description}
              </p>
            ) : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
            {meta?.length ? (
              <dl className="hero-meta-grid mt-8">
                {meta.map((item, index) => (
                  <div key={`meta-${index}`} className="hero-meta-card">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-3 font-serif text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                      {item.value}
                    </dd>
                    {item.detail ? (
                      <p className="mt-2 text-sm leading-6 text-foreground/68">{item.detail}</p>
                    ) : null}
                  </div>
                ))}
              </dl>
            ) : null}
            {(heroNote || meta?.length) && <div className="gold-divider mt-8 max-w-sm" />}
            {heroNote ? (
              <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/58">{heroNote}</p>
            ) : null}
          </div>

          {hasSidebar ? (
            <aside className="self-start space-y-5 lg:sticky lg:top-28">
              {aside ? <div className="panel-card panel-card-strong p-6">{aside}</div> : null}
              {quickLinks?.length ? (
                <div className="quick-nav">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t("pageShell.onThisPage")}
                  </p>
                  <div className="mt-3 grid gap-1.5">
                    {quickLinks.map((item, index) => (
                      <a key={`quick-link-${index}`} href={item.href} className="quick-nav-link">
                        <span>{item.label}</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          ) : (
            <div className="hidden lg:block" aria-hidden />
          )}
        </div>
      </section>

      <section className={cn("site-shell py-16 sm:py-20", className)}>{children}</section>
    </article>
  );
}
