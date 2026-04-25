import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logoImg from "@/assets/logo/logo.png";

const navigationLinks = [
  { to: "/about", key: "about" as const },
  { to: "/program", key: "program" as const },
  { to: "/speakers", key: "speakers" as const },
  { to: "/venue", key: "venue" as const },
  { to: "/organizers", key: "organizers" as const },
  { to: "/sponsors", key: "sponsors" as const },
];

const actionLinks = [
  { to: "/call-for-papers", key: "cfp" as const },
  { to: "/registration", key: "registration" as const },
];

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/70 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="VJSS 2026 Logo" className="h-[80px] w-auto object-contain" />
            <span className="font-serif text-lg font-semibold">
              {t("conf.bridgeLabel")}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/75">
            {t("footer.tagline")}
          </p>
          <div className="mt-6 rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 text-sm text-primary-foreground/75">
            <p className="text-xs uppercase tracking-[0.18em] text-primary-foreground/55">
              {t("footer.contactHeader")}
            </p>
            <p className="mt-2 leading-6">{t("footer.contactBody")}</p>
            <a
              href={`mailto:${t("footer.contactEmail")}`}
              className="mt-3 inline-flex font-mono text-sm text-gold hover:text-primary-foreground underline underline-offset-4 decoration-gold/30 hover:decoration-gold"
            >
              {t("footer.contactEmail")}
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
            {t("footer.navigation")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navigationLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-primary-foreground/85 hover:text-primary-foreground"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
            {t("footer.status")}
          </h4>
          <p className="mt-4 text-sm leading-6 text-primary-foreground/75">
            {t("footer.statusBody")}
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {actionLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-primary-foreground/85 hover:text-primary-foreground"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-primary-foreground/65 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {t("conf.shortName")}. {t("footer.rights")}
          </p>
          <p>{t("conf.bridgeLabel")}</p>
        </div>
      </div>
    </footer>
  );
}
