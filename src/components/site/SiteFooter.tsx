import { Link } from "@tanstack/react-router";
import { CalendarDays, Mail, MapPin, Send } from "lucide-react";

import logoImg from "@/assets/logo/logo.webp";
import { Button } from "@/components/ui/button";
import { conferenceIdentity, venueReference } from "@/content/site-content";
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
    <footer className="mt-28 border-t border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--navy)_94%,var(--foreground)),color-mix(in_oklab,var(--navy)_86%,var(--jp-indigo)))] text-primary-foreground">
      <div className="site-shell py-14 sm:py-16">
        {/* <div className="grid gap-8 border-b border-primary-foreground/14 pb-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <div className="rounded-[0.65rem] border border-primary-foreground/14 bg-primary-foreground/7 p-2">
                <img
                  src={logoImg}
                  alt={t("footer.logoAlt")}
                  className="h-[76px] w-auto object-contain"
                />
              </div>
              <div>
                <p className="section-kicker text-gold">{t("footer.snapshotEyebrow")}</p>
                <h2 className="mt-3 max-w-xl font-serif text-3xl font-semibold leading-tight sm:text-[2.5rem]">
                  {t("footer.snapshotTitle")}
                </h2>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-primary-foreground/76 sm:text-base">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[0.65rem] border border-primary-foreground/12 bg-primary-foreground/7 p-4">
              <CalendarDays className="h-4 w-4 text-gold" />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/55">
                {t("dates.conference")}
              </p>
              <p className="mt-2 font-serif text-xl font-semibold">
                {pick(conferenceIdentity.dates)}
              </p>
            </div>
            <div className="rounded-[0.65rem] border border-primary-foreground/12 bg-primary-foreground/7 p-4">
              <MapPin className="h-4 w-4 text-gold" />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/55">
                {t("nav.venue")}
              </p>
              <p className="mt-2 font-serif text-xl font-semibold">
                {pick(conferenceIdentity.venue)}
              </p>
            </div>
            <div className="rounded-[0.65rem] border border-primary-foreground/12 bg-primary-foreground/7 p-4">
              <Send className="h-4 w-4 text-gold" />
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/55">
                {t("footer.formatLabel")}
              </p>
              <p className="mt-2 font-serif text-xl font-semibold">
                {pick(conferenceIdentity.format)}
              </p>
            </div>
          </div>
        </div> */}

        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1.1fr)_0.62fr_0.82fr]">
          <div>
            <p className="section-kicker text-gold">{t("conf.shortName")}</p>
            <p className="mt-3 max-w-md font-serif text-2xl font-semibold leading-tight">
              {t("conf.bridgeLabel")}
            </p>
            <div className="mt-6 rounded-[0.75rem] border border-primary-foreground/14 bg-primary-foreground/7 p-5">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold/85">
                  {t("footer.contactHeader")}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
                {t("footer.contactBody")}
              </p>
              <a
                href={`mailto:${t("footer.contactEmail")}`}
                className="mt-4 inline-flex text-sm font-semibold text-gold underline underline-offset-4 decoration-gold/30 hover:text-primary-foreground hover:decoration-gold"
              >
                {t("footer.contactEmail")}
              </a>
            </div>
          </div>

          <nav aria-label={t("footer.navigation")}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/56">
              {t("footer.navigation")}
            </h4>
            <ul className="mt-5 grid gap-2 text-sm">
              {navigationLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex rounded-[0.35rem] px-2 py-1 text-primary-foreground/84 transition hover:bg-primary-foreground/8 hover:text-primary-foreground"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/56">
              {t("footer.status")}
            </h4>
            <p className="mt-5 text-sm leading-6 text-primary-foreground/74">
              {t("footer.statusBody")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {actionLinks.map((item, index) => (
                <Button
                  key={item.to}
                  asChild
                  size="sm"
                  variant={index === 0 ? "default" : "outline"}
                  className={
                    index === 0
                      ? "bg-background text-foreground hover:bg-background/95"
                      : "border-primary-foreground/18 bg-primary-foreground/7 text-primary-foreground hover:bg-primary-foreground/12 hover:text-primary-foreground"
                  }
                >
                  <Link to={item.to}>{t(`nav.${item.key}`)}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-primary-foreground/14 pt-10 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[0.85rem] border border-primary-foreground/14 bg-primary-foreground/7 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gold" />
              <p className="section-kicker text-gold">{t("footer.locationEyebrow")}</p>
            </div>
            <h4 className="mt-4 max-w-lg font-serif text-3xl font-semibold leading-tight">
              {t("footer.locationTitle")}
            </h4>
            <p className="mt-4 max-w-xl text-sm leading-7 text-primary-foreground/76">
              {t("footer.locationBody")}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[0.55rem] border border-primary-foreground/12 bg-primary-foreground/7 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/56">
                  {t("venue.referenceAddress")}
                </p>
                <p className="mt-3 text-sm leading-7 text-primary-foreground/84">
                  {pick(venueReference.address)}
                </p>
              </div>
              <div className="rounded-[0.55rem] border border-primary-foreground/12 bg-primary-foreground/7 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/56">
                  {t("common.hostCity")}
                </p>
                <p className="mt-3 text-sm leading-7 text-primary-foreground/84">
                  {pick(conferenceIdentity.venue)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-background text-foreground hover:bg-background/95">
                <a href={venueReference.mapLink} target="_blank" rel="noreferrer">
                  {t("common.openMap")}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary-foreground/18 bg-primary-foreground/7 text-primary-foreground hover:bg-primary-foreground/12 hover:text-primary-foreground"
              >
                <Link to="/venue">{t("nav.venue")}</Link>
              </Button>
            </div>
          </article>

          <div className="overflow-hidden rounded-[0.85rem] border border-primary-foreground/14">
            <iframe
              src={venueReference.mapEmbed}
              title={t("venue.mapTitle")}
              className="h-[20rem] w-full lg:h-full lg:min-h-[23rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
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
