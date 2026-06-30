import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, FileText, Download, CheckCircle2, Calendar, BookOpen, Send, Clock, Cpu, Lightbulb, Layers, Package, Brain, Sparkles, Users } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  submissionGuidelines,
  keyDates,
  technicalThemes,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/submission")({
  head: () => ({
    meta: [
      { title: i18n.t("submission.metaTitle") },
      {
        name: "description",
        content: i18n.t("submission.metaDescription"),
      },
      { property: "og:title", content: i18n.t("submission.metaTitle") },
    ],
  }),
  component: SubmissionPage,
});

// Theme icons config (same as program page)
const themeIcons = [Cpu, Lightbulb, Layers, Package, Brain, Sparkles, Users];
const themeColors = [
  "bg-gold/10 text-gold",
  "bg-semi-blue/10 text-semi-blue", 
  "bg-vn-red/10 text-vn-red",
  "bg-primary/10 text-primary",
  "bg-gold/10 text-gold",
  "bg-semi-blue/10 text-semi-blue",
  "bg-vn-red/10 text-vn-red",
];

function SubmissionPage() {
  const { pick, t } = useSiteLocale();
  
  // Show all key dates
  const submissionDates = keyDates;

  return (
    <PageShell
      eyebrow={t("nav.submission")}
      title={t("submission.pageTitle")}
      description={t("submission.pageDescription")}
      quickLinks={[
        { label: t("submission.quickGuidelines"), href: "#guidelines" },
        { label: t("submission.quickTimeline"), href: "#timeline" },
        { label: t("submission.quickThemes"), href: "#themes" },
        { label: t("submission.quickSubmit"), href: "#submit" },
      ]}
      heroNote={t("submission.heroNote")}
      actions={
        <>
          <Button disabled className="rounded-none uppercase tracking-[0.14em] cursor-not-allowed opacity-60" aria-disabled="true" title={t("submission.easyChairPending")}>
            <Send className="h-4 w-4" />
            {t("submission.submitCta")}
          </Button>
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/call-for-papers">{t("nav.cfp")}</Link>
          </Button>
        </>
      }
    >
      {/* Submit Online CTA - Top of page */}
      <section id="submit" className="anchor-target section-frame p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ExternalLink className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {t("submission.submitTitle")}
              </h3>
              <p className="mt-1 text-sm text-foreground/70">
                {t("submission.submitDescription")}
              </p>
            </div>
          </div>
          <Button disabled size="lg" className="rounded-none uppercase tracking-[0.14em] opacity-60" aria-disabled="true">
            <Send className="h-4 w-4" />
            {t("submission.easyChairPending")}
          </Button>
        </div>
      </section>

      {/* Submission Overview - Status + Guidelines */}
      <section id="guidelines" className="anchor-target section-frame mt-8 sm:mt-10">
        <SectionHeading
          eyebrow={t("submission.guidelinesEyebrow")}
          title={t("submission.guidelinesTitle")}
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {/* Submission Status Card */}
          <article className="panel-card panel-card-strong p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="icon-wrap icon-wrap-lg icon-wrap-gold shrink-0">
                <Send className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <p className="section-kicker text-base">{t("submission.statusLabel")}</p>
                <p className="mt-1 font-serif text-xl sm:text-2xl font-semibold text-foreground">
                  {t("submission.statusComingSoon")}
                </p>
              </div>
            </div>
            
            <p className="mt-4 text-sm leading-relaxed text-foreground/68">
              {t("submission.statusDescription")}
            </p>

            {/* Templates */}
            <div className="mt-5 pt-4 border-t border-border/40">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
                {t("submission.templatesLabel")}
              </p>
              <div className="grid gap-2">
                <a 
                  href="/assets/VJSS2026-Abstract-Template.docx" 
                  download="VJSS2026-Abstract-Template.docx"
                  className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 transition-colors hover:border-primary/50 hover:bg-primary/10"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{t("submission.abstractTemplateCta")}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-primary">
                    <Download className="h-3.5 w-3.5" />
                    {t("submission.downloadLabel")}
                  </span>
                </a>
                {/* <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary/55" />
                    <span className="text-sm font-medium text-foreground/75">{t("submission.fullPaperTemplateCta")}</span>
                  </div>
                  <Button disabled size="sm" variant="ghost" className="h-7 px-2 opacity-40">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div> */}
              </div>
            </div>
          </article>

          {/* Requirements Card */}
          <article className="panel-card p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="icon-wrap icon-wrap-sm icon-wrap-navy">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-semibold">{t("submission.requirementsTitle")}</h3>
            </div>
            
            <p className="text-sm leading-relaxed text-foreground/75 text-justify">
              {t("submission.requirementsText")}
            </p>
          </article>
        </div>
      </section>

      {/* Submission Timeline */}
      <section id="timeline" className="anchor-target section-frame mt-8 sm:mt-10">
        <SectionHeading
          eyebrow={t("submission.timelineEyebrow")}
          title={t("submission.timelineTitle")}
        />

        <div className="relative mt-8 pl-7 sm:pl-8">
          {/* Gradient rail */}
          <div className="absolute left-[6px] top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-gold/70 via-semi-blue/35 to-border/15" />

          <div className="space-y-2">
            {submissionDates.map((item, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === submissionDates.length - 1;
              const isHighlight = isFirst || isLast;
              const isDeadline = pick(item.label).toLowerCase().includes("deadline");
              const isSymposium = pick(item.label).toLowerCase().includes("symposium") || pick(item.label).toLowerCase().includes("hội thảo");

              return (
                <div
                  key={idx}
                  className={`group relative grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border px-4 py-3 sm:px-5 sm:py-3.5 transition-all duration-200 ${
                    isSymposium
                      ? "border-gold/35 bg-gradient-to-r from-gold/8 via-gold/4 to-transparent"
                      : isHighlight
                        ? "border-gold/25 bg-gradient-to-r from-gold/5 to-transparent"
                        : "border-border/25 bg-card/40 hover:border-semi-blue/20 hover:bg-card/60"
                  }`}
                >
                  {/* Timeline node */}
                  <div className={`absolute -left-7 sm:-left-8 top-1/2 -translate-y-1/2 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-[2px] ring-background transition-colors ${
                    isSymposium
                      ? "bg-gold shadow-[0_0_8px_rgba(180,140,40,0.3)]"
                      : isHighlight
                        ? "bg-gold"
                        : "bg-semi-blue/45 group-hover:bg-semi-blue/65"
                  }`}>
                    {(isHighlight || isSymposium) && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Label */}
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-base leading-snug ${isSymposium ? "font-semibold text-foreground" : isHighlight ? "font-medium text-foreground/88" : "text-foreground/72"}`}>
                      {pick(item.label)}
                    </span>
                    {"note" in item && item.note ? (
                      <span className="text-xs text-muted-foreground/60">
                        ({pick(item.note as Record<"en" | "vi" | "ja", string>)})
                      </span>
                    ) : null}
                  </div>

                  {/* Date badge */}
                  <span className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold tabular-nums ${
                    isSymposium
                      ? "bg-gold/12 text-gold font-bold"
                      : isDeadline
                        ? "bg-vn-red/8 text-vn-red"
                        : isHighlight
                          ? "bg-primary/8 text-primary"
                          : "bg-muted/50 text-foreground/55"
                  }`}>
                    {pick(item.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <Button asChild variant="outline" size="sm" className="rounded-none uppercase tracking-wider text-xs">
            <Link to="/call-for-papers">
              {t("submission.viewFullTimeline")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Technical Themes - Compact Grid */}
      <section id="themes" className="anchor-target section-frame mt-8 sm:mt-10">
        <SectionHeading eyebrow={t("submission.themesEyebrow")} />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {technicalThemes.slice(0, 4).map((theme, idx) => {
            const Icon = themeIcons[idx];
            return (
              <article key={idx} className="panel-card interactive-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <span className={`icon-wrap icon-wrap-sm ${themeColors[idx]}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/55">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-3 font-serif text-sm font-semibold leading-snug text-foreground">
                  {pick(theme.name)}
                </h3>
              </article>
            );
          })}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {technicalThemes.slice(4).map((theme, idx) => {
            const actualIdx = idx + 4;
            const Icon = themeIcons[actualIdx];
            return (
              <article key={actualIdx} className="panel-card interactive-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <span className={`icon-wrap icon-wrap-sm ${themeColors[actualIdx]}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/55">{String(actualIdx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-3 font-serif text-sm font-semibold leading-snug text-foreground">
                  {pick(theme.name)}
                </h3>
              </article>
            );
          })}
        </div>

        {/* <div className="mt-6">
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/program#themes">
              {t("submission.viewThemeDetails")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div> */}
      </section>

      {/* Publishing Opportunity */}
      <section id="publishing" className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={t("submission.publishingEyebrow")}
              title={t("submission.publishingTitle")}
            />
          </div>
          <article className="panel-card p-6">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-semi-blue/10 text-semi-blue shrink-0">
                <BookOpen className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm leading-relaxed text-foreground/75">
                  {pick(submissionGuidelines.publishingOpportunity)}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
