import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Mail, MapPin, Users } from "lucide-react";

import logoImg from "@/assets/logo/logo.webp";
import { OrganizationLogo } from "@/components/site/OrganizationLogo";
import { Button } from "@/components/ui/button";
import { conferenceIdentity, partnerOrganizations, venueReference } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

const previousEditionUrl = "https://vjsemiconductor.vanj.jp/";

const navigationLinks = [
  { to: "/about", key: "about" as const },
  { to: "/program", key: "program" as const },
  { to: "/speakers", key: "speakers" as const },
  { to: "/venue", key: "venue" as const },
  { to: "/organizers", key: "organizers" as const },
  { to: "/sponsors", key: "sponsors" as const },
  { to: "/news", key: "news" as const },
  { to: "/contact", key: "contact" as const },
];

const actionLinks = [
  { to: "/registration", key: "registration" as const },
  { to: "/call-for-papers", key: "cfp" as const },
];

export function SiteFooter() {
  const { pick, t } = useSiteLocale();
  const year = new Date().getFullYear();
  const footerPartners = partnerOrganizations.slice(0, 4);

  return (
    <footer className="mt-24 border-t border-border/40 bg-[oklch(0.88_0.01_75)] text-foreground">
      <div className="site-shell py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.75fr_0.75fr_0.85fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-md border border-border/50 bg-white/60 p-1.5">
                <img
                  src={logoImg}
                  alt={t("footer.logoAlt")}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("conf.shortName")}</p>
                <p className="mt-1 font-serif text-sm font-semibold leading-tight text-foreground">
                  {t("conf.bridgeLabel")}
                </p>
              </div>
            </div>
            <p className="text-xs leading-6 text-foreground/70">{t("footer.description")}</p>
            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              <div className="space-y-1 rounded-sm border border-border/40 bg-white/30 p-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-gold" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("dates.conference")}
                  </p>
                </div>
                <p className="font-serif text-sm font-semibold text-foreground">
                  {pick(conferenceIdentity.dates)}
                </p>
              </div>
              <div className="space-y-1 rounded-sm border border-border/40 bg-white/30 p-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-vn-red" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("footer.venueLabel")}
                  </p>
                </div>
                <p className="font-serif text-sm font-semibold text-foreground">
                  {pick(conferenceIdentity.venue)}
                </p>
              </div>
            </div>
          </div>

          <nav className="space-y-3" aria-label={t("footer.navigation")}>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("footer.navigation")}</p>
            <ul className="grid gap-1.5 text-sm">
              {navigationLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex text-xs font-medium text-foreground/75 transition hover:text-foreground"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-border/30 pt-3">
              {actionLinks.map((item, index) => (
                <Button
                  key={item.to}
                  asChild
                  size="sm"
                  variant={index === 0 ? "default" : "outline"}
                  className="w-full justify-between text-xs"
                >
                  <Link to={item.to}>
                    {t(`nav.${item.key}`)}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </nav>

          <div className="space-y-3">
            <article className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-semi-blue" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("footer.contactInfo")}</h3>
              </div>
              <p className="text-xs leading-5 text-foreground/70">{t("footer.contactBody")}</p>
              <a
                href={`mailto:${t("footer.contactEmail")}`}
                className="inline-block text-xs font-semibold text-primary underline decoration-primary/25 underline-offset-2 hover:decoration-primary"
              >
                {t("footer.contactEmail")}
              </a>
            </article>

            <article className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-vn-red" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("footer.venueLabel")}</h3>
              </div>
              <p className="text-xs leading-5 text-foreground/70">
                {pick(venueReference.address)}
              </p>
              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <a href={venueReference.mapLink} target="_blank" rel="noreferrer">
                  {t("common.openMap")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </article>
            <article className="space-y-2 rounded-sm border border-border/40 bg-white/25 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("footer.previousEdition")}</p>
              <h3 className="font-serif text-sm font-semibold leading-tight text-foreground">
                {t("footer.previousEditionTitle")}
              </h3>
              <p className="text-xs leading-5 text-foreground/70">
                {t("footer.previousEditionBody")}
              </p>
              <Button asChild variant="outline" size="sm" className="w-full text-xs">
                <a href={previousEditionUrl} target="_blank" rel="noreferrer">
                  {t("footer.previousEditionCta")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </article>
          </div>

          <div className="space-y-3">
            <article className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gold" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("footer.organizersLabel")}</h3>
              </div>
              <p className="text-xs leading-5 text-foreground/70">
                {t("footer.organizersSummary")}
              </p>
              <div className="space-y-1.5">
                {footerPartners.map((item) => (
                  <div key={`footer-partner-${item.name}`} className="space-y-1">
                    <OrganizationLogo item={item} className="min-h-0 py-1" />
                    <p className="text-[10px] font-semibold leading-4 text-foreground/65">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>

      <div className="border-t border-border/40 bg-[oklch(0.84_0.012_75)]">
        <div className="site-shell flex flex-col items-center justify-between gap-2 py-4 text-[11px] text-foreground/65 sm:flex-row">
          <p>
            &copy; {year} {t("conf.shortName")}. {t("footer.rights")}
          </p>
          <p>{t("footer.copyrightNote")}</p>
        </div>
      </div>
    </footer>
  );
}
