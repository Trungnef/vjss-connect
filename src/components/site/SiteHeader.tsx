import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo/logo.png";

const navItems = [
  { to: "/about", key: "about" as const },
  { to: "/program", key: "program" as const },
  { to: "/speakers", key: "speakers" as const },
  { to: "/venue", key: "venue" as const },
  { to: "/organizers", key: "organizers" as const },
  { to: "/sponsors", key: "sponsors" as const },
];

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <img src={logoImg} alt="VJSS 2026 Logo" className="h-25 w-auto object-contain" />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold text-foreground">
              {t("conf.shortName")}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              {t("conf.bridgeLabel")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link to="/call-for-papers">{t("nav.submit")}</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full">
            <Link to="/registration">{t("nav.register")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border/60 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
              activeProps={{ className: "bg-secondary text-foreground" }}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-border/60 pt-3">
            <Button asChild variant="outline" size="sm" className="flex-1">
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
    </header>
  );
}
