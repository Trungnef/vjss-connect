import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageShell } from "./about";

export const Route = createFileRoute("/organizers")({
  head: () => ({
    meta: [
      { title: "Organizers — VJSS 2026" },
      {
        name: "description",
        content: "Organizers, co-organizers, patrons, and academic partners of VJSS 2026.",
      },
      { property: "og:title", content: "Organizers — VJSS 2026" },
    ],
  }),
  component: OrganizersPage,
});

function OrganizersPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Organizers" title={t("nav.organizers")}>
      <p className="text-muted-foreground">
        Tiered logo wall of organizers, co-organizers, patrons, and academic
        partners — coming soon.
      </p>
    </PageShell>
  );
}
