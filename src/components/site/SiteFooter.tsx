import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, CalendarDays, Mail, MapPin, Phone, Users } from "lucide-react";

import logoImg from "@/assets/logo/logo.webp";
import { OrganizationLogo } from "@/components/site/OrganizationLogo";
import { Button } from "@/components/ui/button";
import { conferenceIdentity, ecosystemGroups, venueReference } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

// Contact data matching the Contact page
const footerContacts = {
  academicLiaisons: [
    {
      name: "Bui Nguyen Quoc Trinh",
      title: "Assoc. Prof.",
      affiliation: { en: "VNU Vietnam Japan University", vi: "Trường Đại học Việt Nhật", ja: "ベトナム日本大学" },
    },
    {
      name: "Le Duc Anh",
      title: "Assoc. Prof.",
      affiliation: { en: "University of Tokyo", vi: "Đại học Tokyo", ja: "東京大学" },
    },
    
  ],
  secretariat: {
    name: "Bui Thu Trang",
    title: "BA",
    affiliation: { en: "VNU Vietnam Japan University", vi: "Trường Đại học Việt Nhật", ja: "ベトナム日本大学" },
    email: "vjss-info@vju.ac.vn",
    phone: "+84 856389040",
  },
};

const previousEditionUrl = "https://vjsemiconductor.vanj.jp/";

const navigationLinks = [
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



export function SiteFooter() {
  const { pick, t } = useSiteLocale();
  const year = new Date().getFullYear();
  
  // Get hosts (organizers) and patrons (partners) from ecosystemGroups
  const hostsGroup = ecosystemGroups.find((g) => g.id === "hosts");
  const patronsGroup = ecosystemGroups.find((g) => g.id === "patrons");
  const footerOrganizers = hostsGroup?.items ?? [];
  const footerPartners = patronsGroup?.items ?? [];

  return (
    <footer className="mt-16 border-t border-border/35 bg-[oklch(0.89_0.008_78)] text-foreground">
      <div className="site-shell py-8 sm:py-10">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr]">
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
            <div className="space-y-2 pt-2">
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
              <div className="space-y-2 rounded-sm border border-border/40 bg-white/30 p-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-vn-red" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("footer.venueLabel")}
                  </p>
                </div>
                <p className="font-serif text-sm font-semibold text-foreground">
                  {pick(conferenceIdentity.venue)}
                </p>
                {/* <p className="text-xs leading-5 text-foreground/70">
                  {pick(venueReference.address)}
                </p> */}
                <div className="mt-2 overflow-hidden rounded-sm border border-border/40">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949675861!2d105.78316!3d21.028333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cd0c66f05%3A0xea31563511af2078!2sVietnam%20Japan%20University!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="120"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VJSS 2026 Venue Location"
                    className="grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <Button asChild variant="outline" size="sm" className="w-full text-xs">
                  <a href={venueReference.mapLink} target="_blank" rel="noreferrer">
                    {t("common.openMap")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <nav className="space-y-3" aria-label={t("footer.navigation")}>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("footer.navigation")}</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navigationLinks.slice(0, -2).map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold/50 transition-colors group-hover:bg-gold" />
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-border/30 pt-3">
              <Button asChild size="sm" className="w-full justify-between text-xs">
                <Link to="/submission">
                  {t("nav.submit")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="w-full justify-between text-xs">
                <Link to="/contact">
                  {t("nav.contact")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </nav>

          <div className="space-y-3">
            {/* Contact Card - combines Academic Liaisons and Secretariat */}
            <article className="rounded-sm border border-border/40 bg-white/25 p-3">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-vn-red" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("nav.contact")}</h3>
              </div>
              
              {/* Academic Liaisons */}
              <div className="space-y-2 pb-3 border-b border-border/30">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">{t("contact.academicLiaisons")}</p>
                <div className="space-y-1.5">
                  {footerContacts.academicLiaisons.map((liaison) => (
                    <div key={liaison.name} className="text-xs">
                      <p className="font-semibold text-foreground">{liaison.title} {liaison.name}</p>
                      <p className="text-foreground/55">{pick(liaison.affiliation)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conference Secretariat */}
              <div className="space-y-2 pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">{t("contact.secretariat")}</p>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">{footerContacts.secretariat.title}. {footerContacts.secretariat.name}</p>
                  <p className="text-foreground/55">{pick(footerContacts.secretariat.affiliation)}</p>
                </div>
                <div className="space-y-1.5 pt-1">
                  <a
                    href={`mailto:${footerContacts.secretariat.email}`}
                    className="flex items-center gap-2 text-xs font-medium text-foreground/75 hover:text-primary transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>{footerContacts.secretariat.email}</span>
                  </a>
                  <a
                    href={`tel:${footerContacts.secretariat.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-xs font-medium text-foreground/75 hover:text-semi-blue transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-semi-blue" />
                    <span>{footerContacts.secretariat.phone}</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Previous Edition */}
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
            {/* Organizers (Hosts) */}
            <article className="space-y-2 rounded-sm border border-border/40 bg-white/25 p-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gold" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("footer.organizers")}</h3>
              </div>
              <div className="space-y-2">
                {footerOrganizers.map((item) => (
                  <div key={`footer-organizer-${item.name}`} className="space-y-1">
                    <OrganizationLogo item={item} className="min-h-0 py-1" />
                    <p className="text-[10px] font-semibold leading-4 text-foreground/65">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Partners (Patrons) */}
            <article className="space-y-2 rounded-sm border border-border/40 bg-white/25 p-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-semi-blue" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("footer.partners")}</h3>
              </div>
              <div className="space-y-2">
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

      <div className="border-t border-border/35 bg-[oklch(0.86_0.01_78)]">
        <div className="site-shell flex flex-col items-center justify-between gap-2 py-3 text-[10px] text-foreground/60 sm:flex-row">
          <p>
            &copy; {year} {t("conf.shortName")}. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-1.5">
            {t("footer.copyrightNote")}
            <span className="text-foreground/35">•</span>
            <span>
              {t("footer.madeBy")}{" "}
              <a
                href="https://www.facebook.com/Trungg.nef"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-semi-blue/90 hover:text-primary hover:underline transition-colors"
              >
                Trune
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
