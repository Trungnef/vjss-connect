import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageShell } from "./about";

export const Route = createFileRoute("/call-for-papers")({
  head: () => ({
    meta: [
      { title: "Call for Papers — VJSS 2026" },
      {
        name: "description",
        content:
          "Topics, important dates, and submission guidelines for VJSS 2026 papers.",
      },
      { property: "og:title", content: "Call for Papers — VJSS 2026" },
      {
        property: "og:description",
        content: "Submit your semiconductor research to VJSS 2026 in Hanoi.",
      },
    ],
  }),
  component: CfpPage,
});

function CfpPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Call for Papers" title={t("nav.cfp")}>
      <p className="text-muted-foreground">
        Tracks, important dates, LaTeX/Word templates, ethics policy, and the
        author submission portal — coming soon.
      </p>
    </PageShell>
  );
}
