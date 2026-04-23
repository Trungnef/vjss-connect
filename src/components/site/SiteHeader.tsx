import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/about", key: "about" as const },
  { to: "/program", key: "program" as const },
  { to: "/speakers", key: "speakers" as const },
  { to: "/venue", key: "venue" as const },
  { to: "/call-for-papers", key: "cfp" as const },
  { to: "/sponsors", key: "sponsors" as const },
];

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground font-serif text-sm font-bold"
          >
            V
            <span className="text-vn-red">·</span>
            J
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold text-foreground">
              {t("conf.shortName")}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              Vietnam · Japan Semiconductor
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-sm font-medium"
          >
            <Link to="/">{t("nav.signIn")}</Link>
          </Button>
          <Button asChild size="sm" className="text-sm font-medium">
            <Link to="/call-for-papers">{t("nav.submit")}</Link>
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
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-border/60 pt-3">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link to="/">{t("nav.signIn")}</Link>
            </Button>
            <Button asChild size="sm" className="flex-1">
              <Link to="/call-for-papers" onClick={() => setOpen(false)}>
                {t("nav.submit")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
