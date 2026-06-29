import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, ArrowRight, Mic2 } from "lucide-react";
import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
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
      <div className="max-w-xl mx-auto">
        <section className="section-frame text-center flex flex-col items-center">
          <span className="icon-wrap icon-wrap-lg icon-wrap-primary mb-5">
            <Mic2 className="h-7 w-7" />
          </span>
          <SectionHeading
            align="center"
            eyebrow={pick(speakersPage.title)}
            size="small"
          />
          <p className="mt-4 text-sm leading-relaxed text-foreground/70 max-w-md">
            {pick(speakersPage.intro)}
          </p>
          {/* <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="sm" className="rounded-none uppercase tracking-wider text-xs">
              <Link to="/call-for-papers">
                {t("nav.cfp")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-none uppercase tracking-wider text-xs">
              <Link to="/program">
                {t("nav.program")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div> */}
        </section>
      </div>
    </PageShell>
  );
}
