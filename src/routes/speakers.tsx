import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { pageCopy } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/speakers")({
  head: () => ({
    meta: [
      { title: i18n.t("speakers.metaTitle") },
      {
        name: "description",
        content: i18n.t("speakers.metaDescription"),
      },
      { property: "og:title", content: i18n.t("speakers.metaTitle") },
      {
        property: "og:description",
        content: i18n.t("speakers.metaDescription"),
      },
    ],
  }),
  component: SpeakersPage,
});

function SpeakersPage() {
  const { pick, t } = useSiteLocale();
  const speakersPage = pageCopy.speakers;

  return (
    <PageShell
      eyebrow={t("nav.speakers")}
      title={pick(speakersPage.title)}
      description={pick(speakersPage.intro)}
    >
      <div className="max-w-2xl mx-auto">
        <section className="section-frame p-6 sm:p-10 lg:p-12 text-center flex flex-col items-center">
          <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-secondary text-primary mb-5 sm:mb-6 border border-border/60">
            <Users className="h-6 w-6 sm:h-7 sm:w-7 text-vn-red" />
          </div>
          <SectionHeading
            align="center"
            eyebrow={pick(speakersPage.title)}
            title={pick(speakersPage.intro)}
          />
        </section>
      </div>
    </PageShell>
  );
}
