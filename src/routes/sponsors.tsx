import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageShell } from "./about";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors — VJSS 2026" },
      {
        name: "description",
        content: "Sponsorship tiers and partners supporting VJSS 2026.",
      },
      { property: "og:title", content: "Sponsors — VJSS 2026" },
    ],
  }),
  component: SponsorsPage,
});

function SponsorsPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Sponsors" title={t("nav.sponsors")}>
      <p className="text-muted-foreground">
        Tiered sponsor showcase (Platinum / Gold / Silver / Bronze / Supporter)
        and a "Become a sponsor" prospectus — coming soon.
      </p>
    </PageShell>
  );
}
