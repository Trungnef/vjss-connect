import { Link } from "@tanstack/react-router";
import { CalendarDays, Globe2, MapPin } from "lucide-react";

import logoImg from "@/assets/logo/logo.webp";
import { Button } from "@/components/ui/button";
import { conferenceIdentity } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

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
  { to: "/call-for-papers", key: "cfp" as const },
  { to: "/registration", key: "registration" as const },
];

export function SiteFooter() {
  const { pick, t } = useSiteLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--navy)_94%,black),color-mix(in_oklab,var(--navy)_88%,var(--jp-indigo)))] text-primary-foreground">
      {/* <div className="site-shell pt-14">
        <div className="rounded-[2.2rem] border border-primary-foreground/14 bg-primary-foreground/7 p-6 shadow-[0_34px_90px_-56px_rgba(0,0,0,0.6)] backdrop-blur sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_1.1fr] xl:items-end">
            <div>
              <div className="flex items-center gap-3">
                <Globe2 className="h-5 w-5 text-gold" />
                <p className="section-kicker text-gold">{t("footer.snapshotEyebrow")}</p>
              </div>
              <h2 className="mt-4 max-w-xl font-serif text-3xl font-semibold leading-tight sm:text-[2.45rem]">
                {t("footer.snapshotTitle")}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-primary-foreground/76 sm:text-base">
                {t("footer.tagline")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.6rem] border border-primary-foreground/12 bg-black/16 p-4">
                <div className="flex items-center gap-2 text-gold">
                  <CalendarDays className="h-4 w-4" />
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/55">
                    {t("dates.conference")}
                  </p>
                </div>
                <p className="mt-3 font-serif text-xl font-semibold">
                  {pick(conferenceIdentity.dates)}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-primary-foreground/12 bg-black/16 p-4">
                <div className="flex items-center gap-2 text-gold">
                  <MapPin className="h-4 w-4" />
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/55">
                    {t("nav.venue")}
                  </p>
                </div>
                <p className="mt-3 font-serif text-xl font-semibold">
                  {pick(conferenceIdentity.venue)}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-primary-foreground/12 bg-black/16 p-4">
                <div className="flex items-center gap-2 text-gold">
                  <Globe2 className="h-4 w-4" />
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/55">
                    {t("footer.formatLabel")}
                  </p>
                </div>
                <p className="mt-3 font-serif text-xl font-semibold">
                  {pick(conferenceIdentity.format)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-background text-foreground hover:bg-background/95">
              <Link to="/registration">{t("nav.registration")}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary-foreground/16 bg-primary-foreground/8 text-primary-foreground hover:bg-primary-foreground/12 hover:text-primary-foreground"
            >
              <Link to="/contact">{t("nav.contact")}</Link>
            </Button>
          </div>
        </div>
      </div> */}

      <div className="site-shell grid gap-10 py-16 lg:grid-cols-[minmax(0,1.2fr)_0.75fr_0.95fr]">
        <div>
          <div className="flex items-center gap-4">
            <div className="rounded-[1.75rem] border border-primary-foreground/12 bg-primary-foreground/6 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <img
                src={logoImg}
                alt={t("footer.logoAlt")}
                className="h-[84px] w-auto object-contain"
              />
            </div>
            <div>
              <p className="section-kicker text-gold">{t("conf.shortName")}</p>
              <span className="mt-3 block max-w-xs font-serif text-xl font-semibold">
                {t("conf.bridgeLabel")}
              </span>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/74">
            {t("footer.tagline")}
          </p>

          <div className="mt-7 rounded-[2rem] border border-primary-foreground/14 bg-primary-foreground/6 p-6 text-sm text-primary-foreground/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <p className="text-xs uppercase tracking-[0.22em] text-gold/85">
              {t("footer.contactHeader")}
            </p>
            <p className="mt-3 leading-6">{t("footer.contactBody")}</p>
            <a
              href={`mailto:${t("footer.contactEmail")}`}
              className="mt-4 inline-flex font-mono text-sm text-gold underline underline-offset-4 decoration-gold/30 hover:text-primary-foreground hover:decoration-gold"
            >
              {t("footer.contactEmail")}
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/56">
            {t("footer.navigation")}
          </h4>
          <ul className="mt-5 space-y-2.5 text-sm">
            {navigationLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex rounded-full px-2 py-1 text-primary-foreground/84 transition hover:bg-primary-foreground/8 hover:text-primary-foreground"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/56">
            {t("footer.status")}
          </h4>
          <p className="mt-5 text-sm leading-6 text-primary-foreground/74">
            {t("footer.statusBody")}
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            {actionLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex rounded-full border border-primary-foreground/14 bg-primary-foreground/6 px-3 py-1.5 text-primary-foreground/88 transition hover:bg-primary-foreground/12 hover:text-primary-foreground"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="site-shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-primary-foreground/62 sm:flex-row">
          <p>
            &copy; {year} {t("conf.shortName")}. {t("footer.rights")}
          </p>
          <p>{t("conf.bridgeLabel")}</p>
        </div>
      </div>
    </footer>
  );
}
