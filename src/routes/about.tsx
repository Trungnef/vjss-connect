import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VJSS 2026" },
      {
        name: "description",
        content:
          "Vision, mission, and the Vietnam–Japan collaboration behind VJSS 2026.",
      },
      { property: "og:title", content: "About — VJSS 2026" },
      {
        property: "og:description",
        content: "The story and committees behind the Vietnam–Japan Semiconductor Symposium 2026.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="About" title={t("nav.about")}>
      <p className="text-lg leading-relaxed text-foreground/85">
        {t("conf.tagline")}
      </p>
      <p className="mt-6 text-muted-foreground">
        Detailed content for vision, mission, scope, the Vietnam–Japan collaboration
        context, and committee rosters will be published here as the program is
        finalized. This page is CMS-managed in three languages.
      </p>
    </PageShell>
  );
}

export function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-vn-red">
        {eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">
        {title}
      </h1>
      <div className="gold-divider mt-6 max-w-[8rem]" />
      <div className="mt-10">{children}</div>
    </article>
  );
}
