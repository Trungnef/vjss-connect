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
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 shadow-[0_12px_36px_-34px_color-mix(in_oklab,var(--navy)_42%,transparent)] supports-[backdrop-filter]:bg-white/78 supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-vn-red/0 via-gold to-semi-blue/0 opacity-90" />
      <div className="site-shell flex min-h-[5rem] items-center justify-between gap-4 py-3">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3 rounded-[0.65rem] border border-border/70 bg-white/72 px-2.5 py-2 transition hover:border-primary/25 hover:bg-white"
        >
          <div className="rounded-[0.45rem] border border-border/60 bg-background p-1.5">
            <img
              src={logoImg}
              alt={t("header.logoAlt")}
              className="h-11 w-auto object-contain sm:h-12"
            />
          </div>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-serif text-base font-semibold text-foreground sm:text-lg">
              {t("conf.shortName")}
            </span>
            <span className="hidden max-w-[14rem] truncate text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:inline xl:max-w-none">
              {t("conf.bridgeLabel")}
            </span>
          </span>
        </Link>

        <nav
          aria-label={t("header.primaryNav")}
          className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
        >
          <div className="flex max-w-full flex-nowrap items-center justify-start gap-1 overflow-x-auto rounded-[0.6rem] border border-border/70 bg-card/72 p-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-[0.35rem] px-3 py-2 text-sm font-medium whitespace-nowrap text-foreground/72 transition-colors hover:bg-secondary hover:text-foreground xl:px-3.5"
                activeProps={{
                  className:
                    "rounded-[0.35rem] bg-primary px-3 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground xl:px-3.5",
                }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <Button asChild size="sm" className="px-4">
            <Link to="/registration">{t("nav.register")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-primary/15 bg-white/70 px-4"
          >
            <Link to="/call-for-papers">{t("nav.submit")}</Link>
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
        className={cn("border-t border-border/60 bg-white/96 lg:hidden", open ? "block" : "hidden")}
      >
        <div className="site-shell pb-4">
          <div className="panel-card mt-4 p-3">
            <nav aria-label={t("header.mobileNav")} className="grid gap-2 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-[0.45rem] px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
                  activeProps={{
                    className:
                      "rounded-[0.45rem] bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground",
                  }}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex gap-2 border-t border-border/60 pt-3">
              <Button asChild size="sm" className="flex-1">
                <Link to="/registration" onClick={() => setOpen(false)}>
                  {t("nav.register")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1 bg-white/75">
                <Link to="/call-for-papers" onClick={() => setOpen(false)}>
                  {t("nav.submit")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
