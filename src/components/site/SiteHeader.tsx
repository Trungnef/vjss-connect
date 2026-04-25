import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo/logo.webp";

const navItems = [
  { to: "/about", key: "about" as const },
  { to: "/program", key: "program" as const },
  { to: "/speakers", key: "speakers" as const },
  { to: "/venue", key: "venue" as const },
  { to: "/organizers", key: "organizers" as const },
  { to: "/sponsors", key: "sponsors" as const },
  { to: "/news", key: "news" as const },
  { to: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/78 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-vn-red/0 via-gold to-jp-indigo/0 opacity-90" />
      <div className="site-shell flex min-h-[5.75rem] items-center justify-between gap-4 py-3">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-full border border-border/70 bg-white/70 px-2.5 py-2 shadow-[0_24px_60px_-42px_color-mix(in_oklab,var(--navy)_42%,transparent)] backdrop-blur"
        >
          <div className="rounded-[1.5rem] border border-border/60 bg-white/80 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <img
              src={logoImg}
              alt={t("header.logoAlt")}
              className="h-14 w-auto object-contain sm:h-16"
            />
          </div>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold text-foreground sm:text-lg">
              {t("conf.shortName")}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              {t("conf.bridgeLabel")}
            </span>
          </span>
        </Link>

        <nav
          aria-label={t("header.primaryNav")}
          className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
        >
          <div className="flex max-w-full flex-nowrap items-center justify-start gap-1 overflow-x-auto rounded-full border border-border/70 bg-white/72 p-1 shadow-[0_18px_42px_-34px_color-mix(in_oklab,var(--navy)_34%,transparent)] backdrop-blur [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-foreground/72 transition-colors hover:bg-secondary hover:text-foreground xl:px-3.5"
                activeProps={{
                  className:
                    "rounded-full bg-primary px-3 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-[0_14px_34px_-20px_color-mix(in_oklab,var(--navy)_48%,transparent)] xl:px-3.5",
                }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-primary/15 bg-white/80 px-4"
          >
            <Link to="/call-for-papers">{t("nav.submit")}</Link>
          </Button>
          <Button asChild size="sm" className="px-4">
            <Link to="/registration">{t("nav.register")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("header.toggleMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border/60 bg-background/82 backdrop-blur-xl lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="site-shell pb-4">
          <div className="panel-card mt-4 p-3">
            <nav aria-label={t("header.mobileNav")} className="grid gap-2 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
                  activeProps={{
                    className:
                      "rounded-2xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground",
                  }}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex gap-2 border-t border-border/60 pt-3">
              <Button asChild variant="outline" size="sm" className="flex-1 bg-white/75">
                <Link to="/call-for-papers" onClick={() => setOpen(false)}>
                  {t("nav.submit")}
                </Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link to="/registration" onClick={() => setOpen(false)}>
                  {t("nav.register")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
