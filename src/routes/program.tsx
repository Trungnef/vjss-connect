import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Filter, Cpu, Lightbulb, Layers, Package, Brain, Sparkles, Users } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  pageCopy,
  programSessions,
  programThemeFilters,
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
        { label: t("program.technicalEyebrow"), href: "#themes" },
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

      <section
        id="themes"
        className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7"
      >
        <SectionHeading
          eyebrow={t("program.technicalEyebrow")}
          // title={t("program.technicalTitle")}
          actions={
            <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
              <Link to="/call-for-papers">
                {t("home.submitPaper")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        {/* 
          Balanced grid layout for 7 themes:
          - xl: 3 cols → Row 1: [1][1][1], Row 2: [1][1][1], Row 3: [full-width featured]
          - md: 2 cols → alternating layout with last item full width
          - mobile: single column
        */}
        <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {technicalThemes.map((theme, index) => {
            // Theme-specific configurations with full class names for Tailwind
            const themeConfigs = [
              { icon: Cpu, iconBox: "bg-gold/10 group-hover:bg-gold/18", iconColor: "text-gold", gradient: "from-gold/15 to-gold/5" },
              { icon: Lightbulb, iconBox: "bg-semi-blue/10 group-hover:bg-semi-blue/18", iconColor: "text-semi-blue", gradient: "from-semi-blue/15 to-semi-blue/5" },
              { icon: Layers, iconBox: "bg-vn-red/10 group-hover:bg-vn-red/15", iconColor: "text-vn-red", gradient: "from-vn-red/12 to-vn-red/4" },
              { icon: Package, iconBox: "bg-primary/10 group-hover:bg-primary/18", iconColor: "text-primary", gradient: "from-primary/15 to-primary/5" },
              { icon: Brain, iconBox: "bg-gold/10 group-hover:bg-gold/18", iconColor: "text-gold", gradient: "from-gold/15 to-gold/5" },
              { icon: Sparkles, iconBox: "bg-semi-blue/10 group-hover:bg-semi-blue/18", iconColor: "text-semi-blue", gradient: "from-semi-blue/15 to-semi-blue/5" },
              { icon: Users, iconBox: "bg-vn-red/10 group-hover:bg-vn-red/15", iconColor: "text-vn-red", gradient: "from-vn-red/12 to-vn-red/4" },
            ];
            const config = themeConfigs[index];
            const Icon = config.icon;
            
            // Last theme (index 6) spans full width for featured closing emphasis
            const isFeatured = index === 6;
            
            return (
              <article
                key={theme.name.en}
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_24px_60px_-20px_color-mix(in_oklab,var(--navy)_22%,transparent)] ${isFeatured ? 'md:col-span-2 xl:col-span-3 p-7 sm:p-8' : 'p-6 sm:p-7'}`}
              >
                {/* Gradient accent bar at top */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${config.gradient} to-transparent`} />
                
                {isFeatured ? (
                  // Featured layout: horizontal with icon left, content right
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
                    {/* Left: Icon and number */}
                    <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                      <div className={`inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl transition-colors ${config.iconBox}`}>
                        <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${config.iconColor}`} />
                      </div>
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-muted/80 px-2.5 font-mono text-xs font-bold text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {/* Right: Title and description */}
                    <div className="flex-1">
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.65rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {pick(theme.name)}
                      </h3>
                      <ul className="mt-4 space-y-1.5 max-w-3xl">
                        {pick(theme.scope).split(";").map(s => s.trim()).filter(Boolean).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm sm:text-[15px] leading-relaxed text-foreground/65">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  // Standard card layout
                  <>
                    {/* Header with icon and number */}
                    <div className="mb-5 flex items-start justify-between">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${config.iconBox}`}>
                        <Icon className={`h-6 w-6 ${config.iconColor}`} />
                      </div>
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-muted/80 px-2 font-mono text-[11px] font-bold text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl lg:text-[1.35rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {pick(theme.name)}
                    </h3>
                    
                    {/* Scope description */}
                    <ul className="mt-4 space-y-1.5">
                      {pick(theme.scope).split(";").map(s => s.trim()).filter(Boolean).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/65">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                {/* Bottom decorative element */}
                <div className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${config.gradient} to-transparent opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70`} />
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
