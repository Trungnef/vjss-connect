import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const quickLinks = [
  { to: "/about", key: "about" as const },
  { to: "/program", key: "program" as const },
  { to: "/speakers", key: "speakers" as const },
  { to: "/venue", key: "venue" as const },
];

const authorLinks = [
  { to: "/call-for-papers", key: "cfp" as const },
  { to: "/registration", key: "registration" as const },
  { to: "/news", key: "news" as const },
  { to: "/contact", key: "contact" as const },
];

export function SiteFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-primary-foreground text-primary font-serif text-sm font-bold"
            >
              V·J
            </span>
            <span className="font-serif text-lg font-semibold">
              {t("conf.shortName")}
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/75">
            {t("footer.tagline")}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-primary-foreground/60">
            {t("footer.secretariat")}
          </p>
          <p className="mt-1 text-sm text-primary-foreground/85">
            secretariat@vjss2026.org
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
            {t("footer.quickLinks")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-primary-foreground/85 hover:text-primary-foreground"
                >
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
            {t("footer.forAuthors")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {authorLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-primary-foreground/85 hover:text-primary-foreground"
                >
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-primary-foreground/65 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {t("conf.fullName")}. {t("footer.rights")}
          </p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-primary-foreground">
              {t("footer.privacy")}
            </Link>
            <Link to="/" className="hover:text-primary-foreground">
              {t("footer.terms")}
            </Link>
            <Link to="/" className="hover:text-primary-foreground">
              {t("footer.sitemap")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
