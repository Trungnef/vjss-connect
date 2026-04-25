import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarRange, Filter, Layers3, Mic } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  criticalDecisions,
  implementationTimeline,
  pageCopy,
  programArchitecture,
  programSessions,
  programThemeFilters,
  speakers,
  technicalThemes,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: i18n.t("program.metaTitle") },
      {
        name: "description",
        content: i18n.t("program.metaDescription"),
      },
      { property: "og:title", content: i18n.t("program.metaTitle") },
      {
        property: "og:description",
        content: i18n.t("program.metaDescription"),
      },
    ],
  }),
  component: ProgramPage,
});

function ProgramPage() {
  const { pick, t } = useSiteLocale();
  const program = pageCopy.program;
  const [activeTheme, setActiveTheme] = useState("all");
  const speakerById = new Map(speakers.map((speaker) => [speaker.id, speaker]));
  const visibleSessions =
    activeTheme === "all"
      ? programSessions
      : programSessions.filter((session) => session.themeId === activeTheme);

  return (
    <PageShell
      eyebrow={t("nav.program")}
      title={pick(program.title)}
      description={pick(program.intro)}
      meta={[
        {
          label: t("program.metaVisibleSessions"),
          value: visibleSessions.length,
          detail: t("program.metaVisibleDetail", { count: programSessions.length }),
        },
        {
          label: t("program.metaTracks"),
          value: technicalThemes.length,
        },
        {
          label: t("program.metaMilestones"),
          value: implementationTimeline.length,
        },
      ]}
      quickLinks={[
        { label: t("program.quickSchedule"), href: "#schedule" },
        { label: t("program.quickArchitecture"), href: "#architecture" },
        { label: t("program.quickTimeline"), href: "#timeline" },
      ]}
      heroNote={t("program.heroNote")}
      actions={
        <>
          <Button asChild>
            <Link to="/registration">
              {t("nav.registration")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/call-for-papers">{t("nav.cfp")}</Link>
          </Button>
        </>
      }
      aside={
        <div className="space-y-5">
          <div>
            <p className="section-kicker">{pick(program.legendTitle)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge status="draft" label={t("status.draft")} />
              <StatusBadge status="updated" label={t("status.updated")} />
              <StatusBadge status="final" label={t("status.final")} />
            </div>
          </div>

          <div className="grid gap-3">
            <div className="panel-card-muted p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {pick(program.architectureTitle)}
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/78">
                {pick(program.architectureBody)}
              </p>
            </div>
          </div>
        </div>
      }
    >
      <section id="schedule" className="anchor-target section-frame">
        <SectionHeading
          eyebrow={t("program.browserEyebrow")}
          title={t("program.browserTitle")}
          description={t("program.browserDescription")}
        />

        <div className="mt-8 rounded-[2rem] border border-border/70 bg-background/84 p-4 shadow-[0_24px_70px_-54px_color-mix(in_oklab,var(--navy)_34%,transparent)] backdrop-blur lg:sticky lg:top-24 lg:z-20">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              {t("program.filterLabel")}
            </span>
            {programThemeFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveTheme(filter.id)}
                aria-pressed={activeTheme === filter.id}
                className={
                  activeTheme === filter.id
                    ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_18px_36px_-24px_color-mix(in_oklab,var(--navy)_44%,transparent)]"
                    : "rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium text-foreground/75 transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground"
                }
              >
                {pick(filter.label)}
              </button>
            ))}
          </div>
        </div>

        {visibleSessions.length > 0 ? (
          <ol className="mt-8 grid gap-5">
            {visibleSessions.map((session) => (
              <li key={session.id} className="timeline-rail">
                <span className="timeline-node" aria-hidden />
                <article className="panel-card interactive-card p-6 sm:p-7">
                  <div className="grid gap-6 xl:grid-cols-[11rem_minmax(0,1fr)]">
                    <div className="space-y-3">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {pick(session.day)}
                      </p>
                      <p className="font-serif text-3xl font-semibold text-primary">
                        {session.time}
                      </p>
                      <p className="text-sm text-foreground/72">{pick(session.date)}</p>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <StatusBadge
                          status={session.status}
                          label={t(`status.${session.status}`)}
                        />
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground/72">
                          {pick(session.theme)}
                        </span>
                      </div>

                      <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                        {pick(session.title)}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-foreground/78">
                        {pick(session.summary)}
                      </p>

                      {session.chairs.length > 0 ? (
                        <div className="mt-5 panel-card-muted p-4">
                          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                            {t("common.chairs")}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-foreground/78">
                            {session.chairs.join(", ")}
                          </p>
                        </div>
                      ) : null}

                      {session.speakerIds.length > 0 ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {session.speakerIds.map((speakerId) => {
                            const speaker = speakerById.get(speakerId);

                            if (!speaker) {
                              return null;
                            }

                            return (
                              <Link
                                key={speakerId}
                                to="/speakers"
                                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-1.5 text-sm text-foreground/76 transition hover:border-primary/30 hover:text-foreground"
                              >
                                <Mic className="h-3.5 w-3.5 text-semi-blue" />
                                {speaker.name}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-8 panel-card p-7 sm:p-8">
            <p className="section-kicker">{t("program.emptyEyebrow")}</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
              {t("program.emptyTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/76">
              {t("program.emptyBody")}
            </p>
          </div>
        )}
      </section>

      <section
        id="architecture"
        className="anchor-target section-frame mt-16 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={pick(program.architectureTitle)}
            title={t("program.architectureTitle")}
            description={pick(program.architectureBody)}
          />

          <div className="mt-8 grid gap-4">
            {programArchitecture.map((item) => (
              <article key={item.title.en} className="panel-card-muted interactive-card p-5">
                <h2 className="font-serif text-2xl font-semibold">{pick(item.title)}</h2>
                <p className="mt-3 text-sm leading-7 text-foreground/78">
                  {pick(item.description)}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{pick(item.audience)}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card panel-card-strong p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("program.technicalEyebrow")}
            title={t("program.technicalTitle")}
            description={t("program.technicalDescription")}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {technicalThemes.map((theme) => (
              <article
                key={theme.name.en}
                className="rounded-[1.6rem] border border-border/70 bg-white/74 p-5 shadow-[0_24px_60px_-50px_color-mix(in_oklab,var(--navy)_32%,transparent)]"
              >
                <h2 className="font-serif text-2xl font-semibold">{pick(theme.name)}</h2>
                <p className="mt-3 text-sm leading-7 text-foreground/78">{pick(theme.scope)}</p>
                <p className="mt-4 text-sm text-muted-foreground">{theme.chairs.join(", ")}</p>
              </article>
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
            eyebrow={pick(program.timelineTitle)}
            title={t("program.timelineTitle")}
            description={pick(program.timelineBody)}
          />

          <ol className="mt-8 grid gap-4">
            {implementationTimeline.map((item) => (
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
                  <p className="mt-3 text-sm text-muted-foreground">{pick(item.owner)}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="panel-card panel-card-strong p-7 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/72 text-vn-red">
              <Layers3 className="h-5 w-5" />
            </span>
            <p className="section-kicker">{pick(program.noteTitle)}</p>
          </div>

          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight">
            {t("program.decisionsTitle")}
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-foreground/78">
            {criticalDecisions.map((item) => (
              <li key={item.en} className="flex gap-3">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                <span>{pick(item)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 grid gap-3">
            <Button asChild className="justify-between">
              <Link to="/registration">
                {t("program.ctaReviewRegistration")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-between">
              <Link to="/contact">
                {t("program.ctaContactProgram")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
