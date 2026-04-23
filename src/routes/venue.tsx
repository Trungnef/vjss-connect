import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageShell } from "./about";

export const Route = createFileRoute("/venue")({
  head: () => ({
    meta: [
      { title: "Venue — VJSS 2026" },
      {
        name: "description",
        content: "VJSS 2026 venue, transport, and accommodation guidance in Hanoi.",
      },
      { property: "og:title", content: "Venue — VJSS 2026" },
      {
        property: "og:description",
        content: "Hanoi University of Science and Technology — directions, hotels, and tips.",
      },
    ],
  }),
  component: VenuePage,
});

function VenuePage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Venue" title={t("nav.venue")}>
      <p className="text-lg text-foreground/85">{t("conf.venue")}</p>
      <p className="mt-6 text-muted-foreground">
        Interactive map, transport guide, and recommended hotels — coming soon.
      </p>
    </PageShell>
  );
}
