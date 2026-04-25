import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, FileText, Microscope } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  implementationTimeline,
  pageCopy,
  submissionCards,
  technicalThemes,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

const submissionTimelinePeriods = new Set(["June 2026", "July 2026", "August 2026"]);

export const Route = createFileRoute("/call-for-papers")({
  head: () => ({
    meta: [
      { title: i18n.t("cfp.metaTitle") },
      {
        name: "description",
        content: i18n.t("cfp.metaDescription"),
      },
      { property: "og:title", content: i18n.t("cfp.metaTitle") },
      {
        property: "og:description",
        content: i18n.t("cfp.metaDescription"),
      },
    ],
  }),
  component: CfpPage,
});

function CfpPage() {
  const { pick, t } = useSiteLocale();
  const cfpPage = pageCopy.cfp;
  const timelineItems = implementationTimeline.filter((item) =>
    submissionTimelinePeriods.has(item.period),
  );

  return (
    <PageShell
      eyebrow={t("nav.cfp")}
      title={pick(cfpPage.title)}
      description={pick(cfpPage.intro)}
      meta={[
        {
          label: t("cfp.metaSubmissionThemes"),
          value: technicalThemes.length,
        },
        {
          label: t("cfp.metaTimelineStages"),
          value: timelineItems.length,
        },
        {
          label: t("cfp.metaIntakeCycle"),
          value: "2026",
        },
      ]}
      quickLinks={[
        { label: t("cfp.quickFramework"), href: "#framework" },
        { label: t("cfp.quickScope"), href: "#scope" },
        { label: t("cfp.quickTimeline"), href: "#timeline" },
      ]}
      heroNote={t("cfp.heroNote")}
      actions={
        <>
          <Button asChild>
            <Link to="/program">
              {t("nav.program")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">{t("nav.contact")}</Link>
          </Button>
        </>
      }
      aside={
        <div className="space-y-4">
          <div className="panel-card-muted p-4">
            <p className="section-kicker">{pick(submissionCards[0].title)}</p>
            <p className="mt-3 text-sm leading-6 text-foreground/80">
              {pick(submissionCards[0].body)}
            </p>
          </div>
          <div className="panel-card-muted p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("cfp.plannedMilestones")}
            </p>
            <p className="mt-2 font-serif text-3xl font-semibold text-primary">
              {timelineItems.length}
            </p>
            <p className="mt-1 text-sm text-foreground/72">{t("cfp.plannedMilestonesDetail")}</p>
          </div>
        </div>
      }
    >
      <section id="framework" className="anchor-target section-frame">
        <SectionHeading
          eyebrow={t("cfp.frameworkEyebrow")}
          title={t("cfp.frameworkTitle")}
          description={t("cfp.frameworkDescription")}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {submissionCards.map((card, index) => (
            <article key={card.title.en} className="panel-card interactive-card p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-secondary text-vn-red">
                {index === 0 ? (
                  <FileText className="h-5 w-5" />
                ) : index === 1 ? (
                  <Microscope className="h-5 w-5" />
                ) : (
                  <CalendarClock className="h-5 w-5" />
                )}
              </span>
              <h2 className="mt-5 font-serif text-2xl font-semibold">{pick(card.title)}</h2>
              <p className="mt-4 text-sm leading-7 text-foreground/78">{pick(card.body)}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="scope"
        className="anchor-target section-frame mt-16 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("cfp.scopeEyebrow")}
            title={t("cfp.scopeTitle")}
            description={t("cfp.scopeDescription")}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {technicalThemes.map((theme) => (
              <article key={theme.name.en} className="panel-card-muted interactive-card p-5">
                <h2 className="font-serif text-2xl font-semibold">{pick(theme.name)}</h2>
                <p className="mt-3 text-sm leading-7 text-foreground/78">{pick(theme.scope)}</p>
                <p className="mt-4 text-sm text-muted-foreground">{theme.chairs.join(", ")}</p>
              </article>
            ))}
          </div>
        </article>

        <article id="timeline" className="anchor-target panel-card panel-card-strong p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("cfp.timelineEyebrow")}
            title={t("cfp.timelineTitle")}
            description={t("cfp.timelineDescription")}
          />

          <ol className="mt-8 grid gap-4">
            {timelineItems.map((item) => (
              <li key={item.period} className="timeline-rail">
                <span className="timeline-node" aria-hidden />
                <div className="rounded-[1.6rem] border border-border/70 bg-white/74 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <p className="font-serif text-2xl font-semibold text-foreground">
                      {pick(item.output)}
                    </p>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground/72">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-foreground/78">
                    {pick(item.milestones)}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-7 grid gap-3">
            <Button asChild className="justify-between">
              <Link to="/contact">
                {t("cfp.ctaAskSubmissions")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-between">
              <Link to="/program">
                {t("cfp.ctaReviewTracks")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
