import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, Mic, SlidersHorizontal, UserRound } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpeakerDialog } from "@/components/site/SpeakerDialog";
import { Button } from "@/components/ui/button";
import {
  pageCopy,
  programSessions,
  speakerCountryLabels,
  speakerKindLabels,
  speakers,
} from "@/content/site-content";
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
  const [kindFilter, setKindFilter] = useState<keyof typeof speakerKindLabels>("all");
  const [countryFilter, setCountryFilter] = useState<keyof typeof speakerCountryLabels>("all");
  const sessionById = new Map(programSessions.map((session) => [session.id, session]));
  const hasActiveFilters = kindFilter !== "all" || countryFilter !== "all";
  const visibleSpeakers = speakers.filter((speaker) => {
    const matchesKind = kindFilter === "all" || speaker.kind === kindFilter;
    const matchesCountry = countryFilter === "all" || speaker.country === countryFilter;

    return matchesKind && matchesCountry;
  });

  return (
    <PageShell
      eyebrow={t("nav.speakers")}
      title={pick(speakersPage.title)}
      description={pick(speakersPage.intro)}
      meta={[
        {
          label: t("speakers.metaWorkingRecords"),
          value: speakers.length,
        },
        {
          label: t("speakers.metaCountries"),
          value: Object.keys(speakerCountryLabels).filter((value) => value !== "all").length,
        },
        {
          label: t("speakers.metaRoles"),
          value: Object.keys(speakerKindLabels).filter((value) => value !== "all").length,
        },
      ]}
      quickLinks={[
        { label: t("speakers.quickFilters"), href: "#filters" },
        { label: t("speakers.quickDirectory"), href: "#directory" },
      ]}
      // heroNote={t("speakers.heroNote")}
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="panel-card-muted p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("speakers.metaWorkingRecords")}
              </p>
              <p className="mt-2 font-serif text-3xl font-semibold text-primary">
                {speakers.length}
              </p>
            </div>
            <div className="panel-card-muted p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("speakers.visibleAfterFilter")}
              </p>
              <p className="mt-2 font-serif text-3xl font-semibold text-primary">
                {visibleSpeakers.length}
              </p>
            </div>
          </div>
        </div>
      }
    >
      <section
        id="filters"
        className="anchor-target section-frame grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]"
      >
        <aside className="grid gap-4 self-start xl:sticky xl:top-24">
          <div className="panel-card panel-card-strong p-5">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="h-5 w-5 text-vn-red" />
              <p className="section-kicker">{t("speakers.filtersEyebrow")}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-foreground/78">{t("speakers.filtersBody")}</p>
          </div>

          <div className="panel-card p-5">
            <p className="section-kicker">{t("speakers.roleLabel")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(speakerKindLabels).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setKindFilter(value as keyof typeof speakerKindLabels)}
                  aria-pressed={kindFilter === value}
                  className={
                    kindFilter === value
                      ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                      : "rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground/75 transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground"
                  }
                >
                  {pick(label)}
                </button>
              ))}
            </div>
          </div>

          <div className="panel-card p-5">
            <p className="section-kicker">{t("speakers.geographyLabel")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(speakerCountryLabels).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCountryFilter(value as keyof typeof speakerCountryLabels)}
                  aria-pressed={countryFilter === value}
                  className={
                    countryFilter === value
                      ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                      : "rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground/75 transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground"
                  }
                >
                  {pick(label)}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters ? (
            <Button
              variant="outline"
              onClick={() => {
                setKindFilter("all");
                setCountryFilter("all");
              }}
            >
              {t("common.resetFilters")}
            </Button>
          ) : null}
        </aside>

        <div id="directory" className="anchor-target">
          <SectionHeading
            eyebrow={t("speakers.directoryEyebrow")}
            title={t("speakers.directoryTitle")}
            description={t("speakers.directoryDescription")}
            actions={
              <Button asChild variant="outline">
                <Link to="/program">
                  {t("speakers.matchSessionsCta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          />

          {visibleSpeakers.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {visibleSpeakers.map((speaker) => {
                const session = speaker.sessionId ? sessionById.get(speaker.sessionId) : null;

                return (
                  <SpeakerDialog
                    key={speaker.id}
                    speaker={speaker}
                    trigger={
                      <button
                        type="button"
                        className="panel-card interactive-card group overflow-hidden text-left"
                      >
                        <div className="relative h-72 overflow-hidden border-b border-border/70 bg-secondary">
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
                          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white/88 px-3 py-1 text-xs font-medium text-foreground">
                              {pick(speakerKindLabels[speaker.kind])}
                            </span>
                            <span className="rounded-[0.35rem] border border-white/24 bg-black/22 px-3 py-1 text-xs font-medium text-white">
                              {pick(speakerCountryLabels[speaker.country])}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4 p-6">
                          <div>
                            <h2 className="font-serif text-2xl font-semibold leading-tight">
                              {speaker.name}
                            </h2>
                            <p className="mt-2 text-sm font-medium text-foreground/82">
                              {pick(speaker.role)}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                              {pick(speaker.organization)}
                            </p>
                          </div>

                          {session ? (
                            <div className="panel-card-muted p-4 text-sm leading-6 text-foreground/74">
                              <span className="font-medium">{t("common.session")}:</span>{" "}
                              {pick(session.title)}
                            </div>
                          ) : null}

                          <p className="text-sm leading-7 text-foreground/74">
                            {pick(speaker.summary)}
                          </p>
                          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                            {t("common.openProfile")}
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </button>
                    }
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-8 panel-card p-7 sm:p-8">
              <p className="section-kicker">{t("speakers.emptyEyebrow")}</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                {t("speakers.emptyTitle")}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/76">
                {t("speakers.emptyBody")}
              </p>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
