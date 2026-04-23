import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageShell } from "./about";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: "Program — VJSS 2026" },
      {
        name: "description",
        content: "Three-day program of keynotes, technical sessions, and panels at VJSS 2026.",
      },
      { property: "og:title", content: "Program — VJSS 2026" },
      {
        property: "og:description",
        content: "Sessions, tracks, and timing for VJSS 2026 in Hanoi.",
      },
    ],
  }),
  component: ProgramPage,
});

function ProgramPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Program" title={t("nav.program")}>
      <p className="text-muted-foreground">
        Full program timeline with track and day filters, session detail drawer,
        and downloadable PDF — coming soon.
      </p>
    </PageShell>
  );
}
