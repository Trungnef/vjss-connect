import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Filter } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { StatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  pageCopy,
  pickLocalized,
  programSessions,
  programThemeFilters,
  speakers,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: "Program | VJSS 2026" },
      {
        name: "description",
        content:
          "Reference schedule, timeline states, and editable session structure for the VJSS 2026 build.",
      },
      { property: "og:title", content: "Program | VJSS 2026" },
      {
        property: "og:description",
        content:
          "Reference schedule seeded from VJSS 2025, ready for 2026 program updates and PDF export.",
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
      : programSessions.filter(
          (session) => pickLocalized("en", session.theme) === activeTheme,
        );

  return (
    <PageShell
      eyebrow={t("nav.program")}
      title={pick(program.title)}
      description={pick(program.intro)}
      aside={
        <div className="space-y-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vn-red">
              {pick(program.legendTitle)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge status="draft" label={t("status.draft")} />
              <StatusBadge status="updated" label={t("status.updated")} />
              <StatusBadge status="final" label={t("status.final")} />
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vn-red">
              {pick(program.pdfTitle)}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {pick(program.referenceBody)}
            </p>
            <Button asChild className="mt-4 w-full rounded-full">
              <a href="/vjss-2025-reference-program.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                {t("common.downloadPdf")}
              </a>
            </Button>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {pick(program.editableTitle)}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {pick(program.editableBody)}
            </p>
          </div>
        </div>
      }
    >
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          Filter
        </span>
        {programThemeFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveTheme(filter.id)}
            className={
              activeTheme === filter.id
                ? "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                : "rounded-full border border-border/70 bg-card px-4 py-2 text-sm font-medium text-foreground/75 transition hover:border-primary/30 hover:text-foreground"
            }
          >
            {pick(filter.label)}
          </button>
        ))}
      </div>

      <section className="grid gap-4">
        {visibleSessions.map((session) => (
          <article
            key={session.id}
            className="rounded-3xl border border-border/70 bg-card p-6"
          >
            <div className="grid gap-5 lg:grid-cols-[10rem_minmax(0,1fr)]">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {session.day.en}
                </p>
                <p className="font-serif text-2xl font-semibold text-primary">
                  {session.time}
                </p>
                <p className="text-sm text-foreground/70">{session.date}</p>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge
                    status={session.status}
                    label={t(`status.${session.status}`)}
                  />
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/70">
                    {pick(session.theme)}
                  </span>
                </div>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                  {session.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-foreground/82">
                  {pick(session.summary)}
                </p>

                {session.chairs.length > 0 ? (
                  <p className="mt-5 text-sm text-foreground/72">
                    <span className="font-medium">{t("common.chairs")}:</span>{" "}
                    {session.chairs.join(", ")}
                  </p>
                ) : null}

                {session.speakerIds.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {session.speakerIds.map((speakerId) => {
                      const speaker = speakerById.get(speakerId);

                      if (!speaker) {
                        return null;
                      }

                      return (
                        <span
                          key={speakerId}
                          className="rounded-full border border-border/70 bg-background px-3 py-1.5 text-sm text-foreground/75"
                        >
                          {speaker.name}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
