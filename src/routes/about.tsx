import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenText, CalendarRange, Database, Landmark, Layers3 } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  conferenceIdentity,
  expectedOutcomes,
  homeMetrics,
  pageCopy,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: i18n.t("about.metaTitle") },
      {
        name: "description",
        content: i18n.t("about.metaDescription"),
      },
      { property: "og:title", content: i18n.t("about.metaTitle") },
      {
        property: "og:description",
        content: i18n.t("about.metaDescription"),
      },
    ],
  }),
  component: AboutPage,
});

const focusBlocks = [
  {
    id: "vision",
    icon: Landmark,
    titleKey: "visionTitle" as const,
    itemsKey: "vision" as const,
  },
  {
    id: "mission",
    icon: BookOpenText,
    titleKey: "missionTitle" as const,
    itemsKey: "mission" as const,
  },
  {
    id: "objectives",
    icon: Database,
    titleKey: "objectiveTitle" as const,
    itemsKey: "objectives" as const,
  },
];

function AboutPage() {
  const { pick, t } = useSiteLocale();
  const about = pageCopy.about;

  return (
    <PageShell
      eyebrow={t("nav.about")}
      title={pick(about.title)}
      description={pick(about.intro)}
      meta={[
        {
          label: t("dates.conference"),
          value: pick(conferenceIdentity.dates),
        },
        {
          label: t("common.hostCity"),
          value: pick(conferenceIdentity.venue),
        },
        {
          label: t("common.programScope"),
          value: t("about.metaProgramScope", { themes: homeMetrics[1]?.value }),
          detail: t("about.metaProgramScopeDetail", { days: homeMetrics[2]?.value }),
        },
      ]}
      quickLinks={[
        { label: t("about.quickFraming"), href: "#framing" },
        { label: t("about.quickContext"), href: "#context" },
        { label: t("about.quickOutcomes"), href: "#outcomes" },
      ]}
      heroNote={t("about.heroNote")}
      actions={
        <>
          <Button asChild>
            <Link to="/program">
              {t("nav.program")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/organizers">{t("nav.organizers")}</Link>
          </Button>
        </>
      }
      aside={
        <div className="space-y-5">
          <div>
            <p className="section-kicker">{t("common.reference")}</p>
            <p className="mt-3 text-sm leading-6 text-foreground/78">
              {pick(conferenceIdentity.referenceNote)}
            </p>
          </div>

          <div className="panel-card-muted p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("about.asideFormatLabel")}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/82">
              {pick(conferenceIdentity.format)}
            </p>
          </div>
        </div>
      }
    >
      <section id="framing" className="anchor-target section-frame">
        <SectionHeading
          eyebrow={t("about.framingEyebrow")}
          title={t("about.framingTitle")}
          description={pick(about.intro)}
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {focusBlocks.map((block, index) => {
            const Icon = block.icon;

            return (
              <article key={block.id} className="panel-card interactive-card overflow-hidden p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-primary text-primary-foreground shadow-[0_24px_60px_-32px_color-mix(in_oklab,var(--navy)_48%,transparent)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="section-kicker">{`0${index + 1}`}</span>
                </div>
                <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight">
                  {pick(about[block.titleKey])}
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/78">
                  {about[block.itemsKey].map((item) => (
                    <li key={item.en} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>{pick(item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="context"
        className="anchor-target section-frame mt-16 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-vn-red">
              <Layers3 className="h-5 w-5" />
            </span>
            <p className="section-kicker">{t("about.contextEyebrow")}</p>
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight">
            {pick(about.contextTitle)}
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/76">{pick(about.contextBody)}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="panel-card-muted p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("dates.conference")}
              </p>
              <p className="mt-3 text-lg font-semibold text-foreground">
                {pick(conferenceIdentity.dates)}
              </p>
            </div>
            <div className="panel-card-muted p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("common.hostCity")}
              </p>
              <p className="mt-3 text-lg font-semibold text-foreground">
                {pick(conferenceIdentity.venue)}
              </p>
            </div>
          </div>
        </article>

        <article className="panel-card panel-card-strong p-7 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-semi-blue">
              <CalendarRange className="h-5 w-5" />
            </span>
            <p className="section-kicker">{t("about.continuityEyebrow")}</p>
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight">
            {pick(about.heritageTitle)}
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/76">{pick(about.heritageBody)}</p>

          <div className="mt-8 rounded-[1.6rem] border border-border/70 bg-white/72 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("about.designIntentLabel")}
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground/78">
              {t("about.designIntentBody")}
            </p>
          </div>
        </article>
      </section>

      <section
        id="outcomes"
        className="anchor-target section-frame mt-16 grid gap-6 xl:grid-cols-[1.16fr_0.84fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("about.outcomesEyebrow")}
            title={t("about.outcomesTitle")}
            description={t("about.outcomesDescription")}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {expectedOutcomes.map((item) => (
              <article
                key={item.en}
                className="panel-card-muted interactive-card p-5 text-sm leading-7 text-foreground/78"
              >
                {pick(item)}
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card panel-card-strong p-7 sm:p-8">
          <p className="section-kicker">{t("about.nextRoutesEyebrow")}</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
            {t("about.nextRoutesTitle")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground/78">{t("about.nextRoutesBody")}</p>

          <div className="mt-7 grid gap-3">
            <Button asChild className="justify-between">
              <Link to="/program">
                {t("about.ctaProgram")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-between">
              <Link to="/sponsors">
                {t("about.ctaSponsors")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" className="justify-between">
              <Link to="/contact">
                {t("about.ctaContact")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
