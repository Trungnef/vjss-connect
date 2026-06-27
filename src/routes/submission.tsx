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
  
  // Filter submission-related dates
  const submissionDates = keyDates.filter(d => 
    pick(d.label).toLowerCase().includes('submission') || 
    pick(d.label).toLowerCase().includes('abstract') ||
    pick(d.label).toLowerCase().includes('paper') ||
    pick(d.label).toLowerCase().includes('notification')
  );

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
      {/* Submission Overview - Status + Guidelines */}
      <section id="guidelines" className="anchor-target section-frame p-5 sm:p-7">
        <SectionHeading
          eyebrow={t("submission.guidelinesEyebrow")}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Submission Status Card */}
          <article className="panel-card panel-card-strong p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                <Send className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <p className="section-kicker">{t("submission.statusLabel")}</p>
                <p className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                  {t("submission.statusComingSoon")}
                </p>
              </div>
            </div>
            
            <p className="mt-5 text-sm leading-relaxed text-foreground/70">
              {t("submission.statusDescription")}
            </p>

            {/* Templates */}
            <div className="mt-6 pt-5 border-t border-border/50">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {t("submission.templatesLabel")}
              </p>
              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/60 p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary/60" />
                    <span className="text-sm font-medium">{t("submission.abstractTemplateCta")}</span>
                  </div>
                  <Button disabled size="sm" variant="ghost" className="h-8 px-3 opacity-50">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/60 p-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary/60" />
                    <span className="text-sm font-medium">{t("submission.fullPaperTemplateCta")}</span>
                  </div>
                  <Button disabled size="sm" variant="ghost" className="h-8 px-3 opacity-50">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{t("submission.templatesPending")}</p>
            </div>
          </article>

          {/* Requirements Card */}
          <article className="panel-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl sm:text-2xl font-semibold">{t("submission.requirementsTitle")}</h3>
            </div>
            
            <p className="text-sm leading-7 text-foreground/85 text-justify">
              {t("submission.requirementsText")}
            </p>
          </article>
        </div>
      </section>

      {/* Submission Timeline */}
      <section id="timeline" className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7">
        <SectionHeading
          eyebrow={t("submission.timelineEyebrow")}
          title={t("submission.timelineTitle")}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {submissionDates.map((item, idx) => (
            <article key={idx} className="panel-card p-5 relative">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold font-mono text-sm font-bold mb-4">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="text-sm font-medium text-foreground/70 leading-snug">
                {pick(item.label)}
                {"note" in item && item.note ? (
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    ({pick(item.note as Record<"en" | "vi" | "ja", string>)})
                  </span>
                ) : null}
              </p>
              <p className="mt-2 font-serif text-lg font-semibold text-primary">
                {pick(item.date)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6">
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/call-for-papers">
              {t("submission.viewFullTimeline")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Technical Themes - Compact Grid */}
      <section id="themes" className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7">
        <SectionHeading eyebrow={t("submission.themesEyebrow")} />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {technicalThemes.slice(0, 4).map((theme, idx) => {
            const Icon = themeIcons[idx];
            return (
              <article key={idx} className="panel-card interactive-card p-5">
                <div className="flex items-start gap-3">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${themeColors[idx]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 font-serif text-base font-semibold leading-snug text-foreground">
                  {pick(theme.name)}
                </h3>
              </article>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {technicalThemes.slice(4).map((theme, idx) => {
            const actualIdx = idx + 4;
            const Icon = themeIcons[actualIdx];
            return (
              <article key={actualIdx} className="panel-card interactive-card p-5">
                <div className="flex items-start gap-3">
                  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${themeColors[actualIdx]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{String(actualIdx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 font-serif text-base font-semibold leading-snug text-foreground">
                  {pick(theme.name)}
                </h3>
              </article>
            );
          })}
        </div>

        <div className="mt-6">
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/program#themes">
              {t("submission.viewThemeDetails")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Publishing Opportunity */}
      <section id="publishing" className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={t("submission.publishingEyebrow")}
              // title={t("submission.publishingTitle")}
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

      {/* Submit Online CTA */}
      <section id="submit" className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7">
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
    </PageShell>
  );
}
