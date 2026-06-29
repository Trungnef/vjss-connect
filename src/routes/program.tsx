import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Filter } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  pageCopy,
  programSessions,
  programThemeFilters,
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
  const { pick, t, locale } = useSiteLocale();
  const program = pageCopy.program;
  const [activeTheme, setActiveTheme] = useState("all");
  const visibleSessions =
    activeTheme === "all"
      ? programSessions
      : programSessions.filter((session) => session.themeId === activeTheme);

  return (
    <PageShell
      eyebrow={t("nav.program")}
      title={pick(program.title)}
      description={pick(program.intro)}
      quickLinks={[
        { label: t("program.quickSchedule"), href: "#schedule" },
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
    >
      <section id="schedule" className="anchor-target section-frame p-4 sm:p-6 lg:p-7">
        <SectionHeading
          eyebrow={t("program.browserEyebrow")}
          // title={t("program.browserTitle")}
        />

        <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-[0.85rem] border border-border/70 bg-background/92 p-3 sm:p-4 lg:sticky lg:top-2 lg:z-20">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
          <div className="mt-6 sm:mt-8 space-y-8 sm:space-y-10">
            {["Day 1", "Day 2", "Day 3", "Day 4"].map((dayKey) => {
              const sessionsForDay = visibleSessions.filter(
                (s) => s.day.en === dayKey
              );
              if (sessionsForDay.length === 0) return null;

              const dayLabel = pick(sessionsForDay[0].day);
              const dayDate = pick(sessionsForDay[0].date);

              // Localization helper for headers
              const getHeaderTime = () => {
                if (locale === 'vi') return "Thời gian";
                if (locale === 'ja') return "時間";
                return "Time";
              };
              const getHeaderSession = () => {
                if (locale === 'vi') return "Phiên";
                if (locale === 'ja') return "セッション";
                return "Session";
              };
              const getHeaderNotes = () => {
                if (locale === 'vi') return "Nội dung dự kiến / Ghi chú";
                if (locale === 'ja') return "予定内容 / 備考";
                return "Planned content / notes";
              };

              return (
                <div key={dayKey} className="section-frame p-4 sm:p-6">
                  <div className="mb-5 sm:mb-6 flex flex-col justify-between gap-2 sm:gap-3 border-b border-border/40 pb-3 sm:pb-4 sm:flex-row sm:items-end">
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                        {dayLabel}
                      </h3>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-0.5 sm:gap-1">
                      <p className="font-mono text-xs sm:text-sm font-semibold text-primary">
                        {dayDate}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-muted-foreground italic">
                        {locale === "vi"
                          ? "* Lịch trình dự kiến và có thể thay đổi"
                          : locale === "ja"
                            ? "* プログラムは予定であり変更される場合があります"
                            : "* Schedule is tentative and subject to change"}
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg sm:rounded-[0.8rem] border-2 border-border/80 bg-card">
                    <table className="w-full text-left text-sm block md:table border-collapse">
                      <thead className="hidden md:table-header-group">
                        <tr className="bg-muted/50 md:table-row">
                          <th className="w-[18%] px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold uppercase tracking-[0.08em] text-foreground border-b-2 border-r border-border">
                            {getHeaderTime()}
                          </th>
                          <th className="w-[32%] px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold uppercase tracking-[0.08em] text-foreground border-b-2 border-r border-border">
                            {getHeaderSession()}
                          </th>
                          <th className="w-[50%] px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold uppercase tracking-[0.08em] text-foreground border-b-2 border-border">
                            {getHeaderNotes()}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="block md:table-row-group">
                        {sessionsForDay.map((session, idx) => (
                          <tr
                            key={session.id}
                            className={`transition-colors hover:bg-gold/8 flex flex-col md:table-row py-4 md:py-0 ${idx % 2 === 0 ? 'bg-card' : 'bg-muted/20'}`}
                          >
                            <td className="px-6 py-3 md:py-5 align-top md:table-cell md:w-[18%] border-b border-r border-border">
                              <span className="font-serif text-lg font-semibold text-primary">
                                {session.time}
                              </span>
                            </td>
                            <td className="px-6 py-3 md:py-5 align-top md:table-cell md:w-[32%] border-b border-r border-border">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="rounded-full bg-secondary/85 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-foreground/72">
                                  {pick(session.theme)}
                                </span>
                                {session.status !== "final" && (
                                  <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-destructive">
                                    {t(`status.${session.status}`)}
                                  </span>
                                )}
                              </div>
                              <h4 className="font-serif text-xl font-bold leading-tight text-foreground">
                                {pick(session.title)}
                              </h4>
                            </td>
                            <td className="px-6 py-3 md:py-5 align-top md:table-cell md:w-[50%] border-b border-border">
                              <p className="text-sm leading-6 text-foreground/78 whitespace-pre-line">
                                {pick(session.summary)}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 panel-card panel-card-strong p-6 sm:p-8 text-center flex flex-col items-center">
            <p className="section-kicker">{t("program.emptyEyebrow")}</p>
            <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-semibold leading-tight text-balance">
              {t("program.emptyTitle")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-foreground/70">
              {t("program.emptyBody")}
            </p>
          </div>
        )}
      </section>
    </PageShell>
  );
}
