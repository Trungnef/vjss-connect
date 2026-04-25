import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeHelp, Users } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  conferenceIdentity,
  implementationTimeline,
  pageCopy,
  registrationCards,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

const registrationTimelinePeriods = new Set([
  "August 2026",
  "September 1-19, 2026",
  "September 20-23, 2026",
]);

export const Route = createFileRoute("/registration")({
  head: () => ({
    meta: [
      { title: i18n.t("registration.metaTitle") },
      {
        name: "description",
        content: i18n.t("registration.metaDescription"),
      },
      { property: "og:title", content: i18n.t("registration.metaTitle") },
    ],
  }),
  component: RegistrationPage,
});

function RegistrationPage() {
  const { pick, t } = useSiteLocale();
  const registrationPage = pageCopy.registration;
  const timelineItems = implementationTimeline.filter((item) =>
    registrationTimelinePeriods.has(item.period),
  );
  const audienceSegments = [
    t("registration.audienceResearchers"),
    t("registration.audienceStudents"),
    t("registration.audienceIndustry"),
    t("registration.audiencePublic"),
    t("registration.audienceUniversities"),
    t("registration.audienceInnovation"),
    t("registration.audienceNexus"),
  ];

  return (
    <PageShell
      eyebrow={t("nav.registration")}
      title={pick(registrationPage.title)}
      description={pick(registrationPage.intro)}
      meta={[
        {
          label: t("registration.metaInfoBlocks"),
          value: registrationCards.length,
        },
        {
          label: t("registration.metaStages"),
          value: timelineItems.length,
        },
        {
          label: t("registration.metaAudienceGroups"),
          value: audienceSegments.length,
        },
      ]}
      quickLinks={[
        { label: t("registration.quickAttendance"), href: "#attendance" },
        { label: t("registration.quickTimeline"), href: "#timeline" },
        { label: t("registration.quickSupport"), href: "#support" },
      ]}
      heroNote={t("registration.heroNote")}
      actions={
        <>
          <Button asChild>
            <Link to="/contact">
              {t("nav.contact")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/program">{t("nav.program")}</Link>
          </Button>
        </>
      }
      aside={
        <div className="space-y-4">
          <div className="panel-card-muted p-4">
            <p className="section-kicker">{t("registration.attendanceNoteEyebrow")}</p>
            <p className="mt-3 text-sm leading-6 text-foreground/80">
              {t("registration.attendanceNoteBody")}
            </p>
          </div>
          <div className="panel-card-muted p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("registration.participationModeLabel")}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {pick(conferenceIdentity.format)}
            </p>
          </div>
        </div>
      }
    >
      <section
        id="attendance"
        className="anchor-target section-frame grid gap-6 xl:grid-cols-[1.05fr_0.95fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("registration.attendanceEyebrow")}
            title={t("registration.attendanceTitle")}
            description={t("registration.attendanceDescription")}
          />

          <div className="mt-8 grid gap-4">
            {registrationCards.map((card) => (
              <article key={card.title.en} className="panel-card-muted interactive-card p-5">
                <h2 className="font-serif text-2xl font-semibold">{pick(card.title)}</h2>
                <p className="mt-3 text-sm leading-7 text-foreground/78">{pick(card.body)}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card panel-card-strong p-7 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/72 text-vn-red">
              <Users className="h-5 w-5" />
            </span>
            <p className="section-kicker">{t("registration.audienceEyebrow")}</p>
          </div>

          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight">
            {t("registration.audienceTitle")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground/78">
            {t("registration.audienceDescription")}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {audienceSegments.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/70 bg-white/76 px-3 py-2 text-sm text-foreground/78"
              >
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section
        id="timeline"
        className="anchor-target section-frame mt-16 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("registration.timelineEyebrow")}
            title={t("registration.timelineTitle")}
            description={t("registration.timelineDescription")}
          />

          <ol className="mt-8 grid gap-4">
            {timelineItems.map((item) => (
              <li key={item.period} className="timeline-rail">
                <span className="timeline-node" aria-hidden />
                <div className="panel-card-muted p-5">
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
        </article>

        <article id="support" className="anchor-target panel-card panel-card-strong p-7 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/72 text-semi-blue">
              <BadgeHelp className="h-5 w-5" />
            </span>
            <p className="section-kicker">{t("registration.supportEyebrow")}</p>
          </div>

          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight">
            {t("registration.supportTitle")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground/78">
            {t("registration.supportDescription")}
          </p>

          <div className="mt-7 grid gap-3">
            <Button asChild className="justify-between">
              <Link to="/contact">
                {t("registration.ctaContactSupport")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-between">
              <Link to="/program">
                {t("registration.ctaReviewProgram")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
