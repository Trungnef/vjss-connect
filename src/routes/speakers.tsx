import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageShell } from "./about";

export const Route = createFileRoute("/speakers")({
  head: () => ({
    meta: [
      { title: "Speakers — VJSS 2026" },
      {
        name: "description",
        content: "Keynote, invited, and panel speakers at VJSS 2026.",
      },
      { property: "og:title", content: "Speakers — VJSS 2026" },
      {
        property: "og:description",
        content: "Meet the speakers shaping the Vietnam–Japan semiconductor agenda.",
      },
    ],
  }),
  component: SpeakersPage,
});

function SpeakersPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Speakers" title={t("nav.speakers")}>
      <p className="text-muted-foreground">
        Speaker grid with filters by track, country, and affiliation — coming soon.
      </p>
    </PageShell>
  );
}
