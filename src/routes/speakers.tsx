import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { SpeakerDialog } from "@/components/site/SpeakerDialog";
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
      { title: "Speakers | VJSS 2026" },
      {
        name: "description",
        content:
          "Reference speaker directory for the VJSS 2026 build, grouped for browsing and later 2026 updates.",
      },
      { property: "og:title", content: "Speakers | VJSS 2026" },
      {
        property: "og:description",
        content:
          "Browse the VJSS reference speaker roster by role, geography, and session.",
      },
    ],
  }),
  component: SpeakersPage,
});

function SpeakersPage() {
  const { pick, t } = useSiteLocale();
  const speakersPage = pageCopy.speakers;
  const [kindFilter, setKindFilter] = useState<keyof typeof speakerKindLabels>("all");
  const [countryFilter, setCountryFilter] =
    useState<keyof typeof speakerCountryLabels>("all");
  const sessionById = new Map(programSessions.map((session) => [session.id, session]));
  const visibleSpeakers = speakers.filter((speaker) => {
    const matchesKind = kindFilter === "all" || speaker.kind === kindFilter;
    const matchesCountry =
      countryFilter === "all" || speaker.country === countryFilter;

    return matchesKind && matchesCountry;
  });

  return (
    <PageShell
      eyebrow={t("nav.speakers")}
      title={pick(speakersPage.title)}
      description={pick(speakersPage.intro)}
      aside={
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Directory model
            </p>
            <p className="mt-2 text-sm text-foreground/80">
              {speakers.length} reference records
            </p>
            <p className="mt-1 text-sm text-foreground/80">
              {visibleSpeakers.length} visible after filtering
            </p>
          </div>
          <p className="text-sm leading-6 text-foreground/80">
            Cards keep the scan lightweight. The modal holds the longer bio and
            topic summary without overloading the index page.
          </p>
        </div>
      }
    >
      <section className="mb-8 grid gap-3 lg:grid-cols-2">
        <div className="rounded-3xl border border-border/70 bg-card p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vn-red">
            Role
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(speakerKindLabels).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setKindFilter(value as keyof typeof speakerKindLabels)
                }
                className={
                  kindFilter === value
                    ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    : "rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground/75 transition hover:border-primary/30 hover:text-foreground"
                }
              >
                {pick(label)}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vn-red">
            Geography
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(speakerCountryLabels).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setCountryFilter(value as keyof typeof speakerCountryLabels)
                }
                className={
                  countryFilter === value
                    ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    : "rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground/75 transition hover:border-primary/30 hover:text-foreground"
                }
              >
                {pick(label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleSpeakers.map((speaker) => {
          const session = speaker.sessionId ? sessionById.get(speaker.sessionId) : null;

          return (
            <SpeakerDialog
              key={speaker.id}
              speaker={speaker}
              trigger={
                <button
                  type="button"
                  className="group overflow-hidden rounded-3xl border border-border/70 bg-card text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
                >
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="h-64 w-full object-cover"
                  />
                  <div className="space-y-3 p-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/70">
                        {pick(speakerKindLabels[speaker.kind])}
                      </span>
                      <span className="rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-foreground/70">
                        {pick(speakerCountryLabels[speaker.country])}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-semibold leading-tight">
                        {speaker.name}
                      </h2>
                      <p className="mt-2 text-sm font-medium text-foreground/80">
                        {speaker.role}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {speaker.organization}
                      </p>
                    </div>
                    {session ? (
                      <div className="rounded-2xl bg-background px-4 py-3 text-sm text-foreground/72">
                        <span className="font-medium">{t("common.session")}:</span>{" "}
                        {session.title}
                      </div>
                    ) : null}
                    <p className="text-sm leading-6 text-foreground/74">
                      {speaker.summary}
                    </p>
                    <span className="inline-flex text-sm font-medium text-primary">
                      {t("common.openProfile")}
                    </span>
                  </div>
                </button>
              }
            />
          );
        })}
      </section>
    </PageShell>
  );
}
