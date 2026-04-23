import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageShell } from "./about";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — VJSS 2026" },
      { name: "description", content: "Announcements and updates from VJSS 2026." },
      { property: "og:title", content: "News — VJSS 2026" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="News" title={t("nav.news")}>
      <p className="text-muted-foreground">Announcements feed — coming soon.</p>
    </PageShell>
  );
}
