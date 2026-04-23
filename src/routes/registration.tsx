import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageShell } from "./about";

export const Route = createFileRoute("/registration")({
  head: () => ({
    meta: [
      { title: "Registration — VJSS 2026" },
      {
        name: "description",
        content:
          "Registration tiers, fees, deadlines, and payment instructions for VJSS 2026.",
      },
      { property: "og:title", content: "Registration — VJSS 2026" },
    ],
  }),
  component: RegistrationPage,
});

function RegistrationPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Registration" title={t("nav.registration")}>
      <p className="text-muted-foreground">
        Fee tiers, what's included, deadlines, and payment instructions — coming soon.
      </p>
    </PageShell>
  );
}
