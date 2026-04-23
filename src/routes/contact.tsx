import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageShell } from "./about";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VJSS 2026" },
      {
        name: "description",
        content: "Contact the VJSS 2026 organizing committee and secretariat.",
      },
      { property: "og:title", content: "Contact — VJSS 2026" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  return (
    <PageShell eyebrow="Contact" title={t("nav.contact")}>
      <p className="text-muted-foreground">
        Contact form and secretariat details — coming soon.
      </p>
      <p className="mt-6 font-serif text-foreground">
        secretariat@vjss2026.org
      </p>
    </PageShell>
  );
}
