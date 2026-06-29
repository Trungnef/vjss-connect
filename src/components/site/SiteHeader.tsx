import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo/logo.webp";

const navItems = [
  { to: "/about", key: "about" as const },
  { to: "/call-for-papers", key: "cfp" as const },
  { to: "/committees", key: "committees" as const },
  { to: "/speakers", key: "speakers" as const },
  { to: "/organizers", key: "organizers" as const },
  { to: "/sponsors", key: "sponsors" as const },
  { to: "/program", key: "program" as const },
  { to: "/venue", key: "venue" as const },
  { to: "/registration", key: "register" as const },
  { to: "/submission", key: "submit" as const },
  { to: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-muted/60 shadow-[0_8px_24px_-20px_color-mix(in_oklab,var(--navy)_35%,transparent)] supports-[backdrop-filter]:bg-muted/45 supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
      <div className="site-shell flex min-h-[4.5rem] items-center justify-between gap-3 py-2">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2.5 rounded-lg border border-border/60 bg-background/65 px-2 py-1.5 transition-all duration-200 hover:border-gold/30 hover:bg-background/80 hover:shadow-sm"
        >
          <div className="rounded-md border border-border/50 bg-background p-1">
            <img
              src={logoImg}
              alt={t("header.logoAlt")}
              className="h-9 w-auto object-contain sm:h-10"
            />
          </div>
          <span className="font-serif text-sm font-semibold text-foreground sm:text-base">
            {t("conf.shortName")}
          </span>
        </Link>

        <nav
          aria-label={t("header.primaryNav")}
          className="hidden min-w-0 flex-1 items-center justify-center lg:flex"
        >
          <div className="flex max-w-full flex-nowrap items-center justify-start gap-0.5 overflow-x-auto rounded-lg border border-border/60 bg-card/65 p-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground/68 transition-all duration-150 hover:bg-secondary/80 hover:text-foreground xl:px-3.5"
                activeProps={{
                  className:
                    "rounded-md bg-primary px-3 py-1.5 text-sm font-medium whitespace-nowrap text-primary-foreground xl:px-3.5",
                }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("header.toggleMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="h-9 w-9"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn("border-t border-border/50 bg-muted/65 lg:hidden", open ? "block" : "hidden")}
      >
        <div className="site-shell pb-3">
          <div className="panel-card mt-3 p-2">
            <nav aria-label={t("header.mobileNav")} className="grid gap-1 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-secondary/70 transition-colors"
                  activeProps={{
                    className:
                      "flex items-center justify-between rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground",
                  }}
                >
                  <span>{t(`nav.${item.key}`)}</span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
