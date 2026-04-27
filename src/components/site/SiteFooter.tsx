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
    <footer className="mt-24 border-t border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--paper)_96%,var(--background)),color-mix(in_oklab,var(--background)_88%,var(--gold)))] text-foreground">
      <div className="site-shell py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.72fr_0.78fr_0.88fr]">
          <div className="panel-card panel-card-strong p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-[0.75rem] border border-border/70 bg-white/74 p-2">
                <img
                  src={logoImg}
                  alt={t("footer.logoAlt")}
                  className="h-[68px] w-auto object-contain"
                />
              </div>
              <div>
                <p className="section-kicker">{t("conf.shortName")}</p>
                <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight">
                  {t("conf.bridgeLabel")}
                </h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-foreground/76">{t("footer.description")}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="panel-card-muted p-4">
                <CalendarDays className="h-4 w-4 text-gold" />
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {t("dates.conference")}
                </p>
                <p className="mt-2 font-serif text-xl font-semibold">
                  {pick(conferenceIdentity.dates)}
                </p>
              </div>
              <div className="panel-card-muted p-4">
                <MapPin className="h-4 w-4 text-vn-red" />
                <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {t("footer.venueLabel")}
                </p>
                <p className="mt-2 font-serif text-xl font-semibold">
                  {pick(conferenceIdentity.venue)}
                </p>
              </div>
            </div>
          </div>

          <nav className="panel-card p-6" aria-label={t("footer.navigation")}>
            <h3 className="section-kicker">{t("footer.navigation")}</h3>
            <ul className="mt-5 grid gap-2 text-sm">
              {navigationLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex rounded-[0.45rem] px-2 py-1.5 font-medium text-foreground/74 transition hover:bg-secondary hover:text-foreground"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-2 border-t border-border/70 pt-5">
              {actionLinks.map((item, index) => (
                <Button
                  key={item.to}
                  asChild
                  size="sm"
                  variant={index === 0 ? "default" : "outline"}
                  className="justify-between"
                >
                  <Link to={item.to}>
                    {t(`nav.${item.key}`)}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </nav>

          <div className="grid gap-4">
            <article className="panel-card p-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-semi-blue" />
                <h3 className="section-kicker">{t("footer.contactInfo")}</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-foreground/76">{t("footer.contactBody")}</p>
              <a
                href={`mailto:${t("footer.contactEmail")}`}
                className="mt-4 inline-flex text-sm font-semibold text-primary underline decoration-primary/25 underline-offset-4 hover:decoration-primary"
              >
                {t("footer.contactEmail")}
              </a>
            </article>

            <article className="panel-card p-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-vn-red" />
                <h3 className="section-kicker">{t("footer.venueLabel")}</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-foreground/76">
                {pick(venueReference.address)}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-5">
                <a href={venueReference.mapLink} target="_blank" rel="noreferrer">
                  {t("common.openMap")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </article>
          </div>

          <div className="grid gap-4">
            <article className="panel-card p-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gold" />
                <h3 className="section-kicker">{t("footer.organizersLabel")}</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-foreground/76">
                {t("footer.organizersSummary")}
              </p>
              <div className="mt-5 grid gap-3">
                {footerPartners.map((item) => (
                  <div key={`footer-partner-${item.name}`} className="grid gap-2">
                    <OrganizationLogo item={item} className="min-h-0 py-3" />
                    <p className="text-xs font-semibold leading-5 text-foreground/70">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel-card panel-card-strong p-6">
              <p className="section-kicker">{t("footer.previousEdition")}</p>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight">
                {t("footer.previousEditionTitle")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-foreground/76">
                {t("footer.previousEditionBody")}
              </p>
              <Button asChild variant="outline" size="sm" className="mt-5 justify-between">
                <a href={previousEditionUrl} target="_blank" rel="noreferrer">
                  {t("footer.previousEditionCta")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </article>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70 bg-white/48">
        <div className="site-shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-foreground/62 sm:flex-row">
          <p>
            &copy; {year} {t("conf.shortName")}. {t("footer.rights")}
          </p>
          <p>{t("footer.copyrightNote")}</p>
        </div>
      </div>
    </footer>
  );
}
