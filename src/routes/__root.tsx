import { useEffect } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import appCss from "../styles.css?url";
import i18n from "../i18n";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

function NotFoundComponent() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <div className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t("root.notFound.eyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-foreground">
            {t("root.notFound.title")}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">{t("root.notFound.description")}</p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("root.notFound.cta")}
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: i18n.t("root.metaTitle") },
      {
        name: "description",
        content: i18n.t("root.metaDescription"),
      },
      { name: "author", content: i18n.t("root.author") },
      { property: "og:title", content: i18n.t("root.metaTitle") },
      {
        property: "og:description",
        content: i18n.t("root.ogDescription"),
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Serif+JP:wght@500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-[60] rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg focus:not-sr-only"
        >
          {t("root.skipToContent")}
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? "en";
  }, [i18n.resolvedLanguage]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
