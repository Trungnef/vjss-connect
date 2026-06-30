import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Microscope, CalendarClock, Target, BookOpen, Send } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  pageCopy,
  submissionCards,
  technicalThemes,
  keyDates,
  submissionGuidelines,
  conferenceObjectives,
  type LocalizedText,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

const L = (en: string, vi: string, ja: string = en): LocalizedText => ({
  en,
  vi,
  ja,
});

export const Route = createFileRoute("/call-for-papers")({
  head: () => ({
    meta: [
      { title: i18n.t("cfp.metaTitle") },
      {
        name: "description",
        content: i18n.t("cfp.metaDescription"),
      },
      { property: "og:title", content: i18n.t("cfp.metaTitle") },
      {
        property: "og:description",
        content: i18n.t("cfp.metaDescription"),
      },
    ],
  }),
  component: CfpPage,
});

function CfpPage() {
  const { pick, t } = useSiteLocale();
  const cfpPage = pageCopy.cfp;

  return (
    <PageShell
      eyebrow={t("nav.cfp")}
      title={pick(cfpPage.title)}
      description={pick(cfpPage.intro)}
      quickLinks={[
        { label: t("cfp.quickFramework"), href: "#framework" },
        { label: t("cfp.quickScope"), href: "#scope" },
        { label: t("cfp.quickGuidelines"), href: "#guidelines" },
        { label: t("home.importantDates"), href: "#key-dates" },
      ]}
      heroNote={t("cfp.heroNote")}
      actions={
        <>
          <Button asChild className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/contact">
              {t("cfp.ctaAskSubmissions")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/program">{t("cfp.ctaReviewTracks")}</Link>
          </Button>
        </>
      }
      aside={
        <div className="space-y-4">
          <div className="panel-card-muted p-4">
            <p className="section-kicker">{pick(submissionCards[0].title)}</p>
            <p className="mt-3 text-sm leading-6 text-foreground/80">
              {pick(submissionCards[0].body)}
            </p>
          </div>
        </div>
      }
    >
      <section id="framework" className="anchor-target section-frame">
        <SectionHeading eyebrow={t("cfp.frameworkEyebrow")} />

        <div className="mt-6 space-y-4">
          {/* Background Card */}
          <article className="panel-card panel-card-strong p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="icon-wrap icon-wrap-md bg-primary text-primary-foreground shrink-0">
                <FileText className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h3 className="font-serif text-lg sm:text-xl font-semibold leading-tight">
                  {pick(submissionCards[0].title)}
                </h3>
                <div className="mt-3 text-sm leading-relaxed text-foreground/75 text-justify space-y-3">
                  {pick(submissionCards[0].body).split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Objectives Card */}
          <article className="panel-card-muted p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="icon-wrap icon-wrap-md icon-wrap-primary shrink-0">
                <Target className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h3 className="font-serif text-lg sm:text-xl font-semibold leading-tight">
                  {t("cfp.objectivesTitle")}
                </h3>
                <ul className="mt-3 space-y-2">
                  {conferenceObjectives.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/72">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                      <span>{pick(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        id="scope"
        className="anchor-target section-frame mt-8 sm:mt-10"
      >
        <SectionHeading eyebrow={t("cfp.scopeEyebrow")} />

        <div className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-2">
          {technicalThemes.map((theme, idx) => {
            const scopeItems = pick(theme.scope).split(";").map(s => s.trim()).filter(Boolean);
            const isLastOdd = technicalThemes.length % 2 === 1 && idx === technicalThemes.length - 1;
            return (
              <article 
                key={theme.name.en} 
                className={`panel-card interactive-card p-4 sm:p-5 ${idx === 0 ? "panel-card-strong" : ""} ${isLastOdd ? "md:col-span-2" : ""}`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-gold/12 px-2 py-0.5 text-xs font-bold tracking-wider text-gold">
                      Theme {idx + 1}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/50">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold leading-tight">{pick(theme.name)}</h3>
                  <ul className="mt-1 space-y-1">
                    {scopeItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/70">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="guidelines"
        className="anchor-target section-frame mt-8 sm:mt-10"
      >
        <SectionHeading
          eyebrow={pick(L("Submission Guidelines", "Hướng dẫn nộp bài", "投稿ガイドライン"))}
        />

        {/* Content grid - 2 columns on large screens */}
        <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-2">
          {/* Abstract Requirements - spans full width on mobile, left col on desktop */}
          <article className="panel-card p-5 sm:p-6 lg:row-span-2">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold">{pick(L("Abstract Requirements", "Yêu cầu tóm tắt"))}</h3>
            
            <p className="mt-4 text-sm leading-7 text-foreground/85 text-justify">
              {pick(L(
                "Authors wishing to present their work at VJSS 2026 are invited to submit an abstract in English. Each submission should include the title of the presentation, author names and affiliations, the corresponding author's full contact information, the preferred presentation format (oral or poster), the relevant symposium theme, an abstract of approximately 200–300 words, and three to five keywords. VJSS 2026 welcomes contributions from academia, industry, and government, and particularly encourages submissions from graduate students, early-career professionals, and industry researchers.",
                "Các tác giả muốn trình bày công trình tại VJSS 2026 được mời nộp tóm tắt bằng tiếng Anh. Mỗi bài nộp cần bao gồm tiêu đề bài trình bày, tên tác giả và đơn vị công tác, thông tin liên hệ đầy đủ của tác giả liên lạc, định dạng trình bày ưa thích (thuyết trình hoặc poster), chủ đề hội thảo liên quan, tóm tắt khoảng 200–300 từ, và ba đến năm từ khóa. VJSS 2026 chào đón các đóng góp từ giới học thuật, công nghiệp và chính phủ, đặc biệt khuyến khích các bài nộp từ nghiên cứu sinh, các chuyên gia trẻ và các nhà nghiên cứu trong ngành công nghiệp."
              ))}
            </p>
          </article>

          {/* Publishing Opportunity */}
          <article className="panel-card-muted p-5 sm:p-6">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold">{pick(L("Publishing Opportunity", "Cơ hội xuất bản"))}</h3>
            <p className="mt-3 text-sm leading-7 text-foreground/78 text-justify">{pick(submissionGuidelines.publishingOpportunity)}</p>
          </article>

          {/* Templates and Submission Portal */}
          <article className="panel-card-strong p-5 sm:p-6">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold">{pick(L("Templates & Submission", "Biểu mẫu & Nộp bài"))}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{pick(L("Download templates and submit via EasyChair", "Tải biểu mẫu và nộp qua EasyChair"))}</p>
            <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
              <Button variant="outline" asChild className="rounded-none uppercase tracking-[0.12em] text-xs">
                <a href="/assets/VJSS2026-Abstract-Template.docx" download="VJSS2026-Abstract-Template.docx">
                  {pick(L("Abstract Template", "Mẫu tóm tắt"))}
                </a>
              </Button>
              <Button disabled className="rounded-none uppercase tracking-[0.12em] text-xs cursor-not-allowed opacity-50" aria-disabled="true" title="EasyChair submission link to be updated">
                {pick(L("Submit via EasyChair", "Nộp qua EasyChair"))}
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* Key Dates Section - Timeline Design */}
      <section id="key-dates" className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7 lg:p-8">
        <SectionHeading
          eyebrow={t("home.importantDates")}
        />

        {/* Timeline */}
        <div className="mt-8 sm:mt-10 relative pl-7 sm:pl-9">
            {/* Elegant gradient rail */}
            <div className="absolute left-[7px] top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-gold/80 via-semi-blue/40 to-border/20" />
            
            <div className="space-y-2.5">
              {keyDates.map((item, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === keyDates.length - 1;
                const isHighlight = isFirst || isLast;
                const isDeadline = pick(item.label).toLowerCase().includes("deadline");
                
                return (
                  <div
                    key={idx}
                    className={`group relative grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg border px-4 py-3 sm:px-5 sm:py-3.5 transition-all duration-200 ${
                      isHighlight 
                        ? "border-gold/35 bg-gradient-to-r from-gold/6 to-transparent" 
                        : "border-border/30 bg-card/50 hover:border-semi-blue/25 hover:bg-card/70"
                    }`}
                  >
                    {/* Timeline node - centered vertically */}
                    <div className={`absolute -left-7 sm:-left-9 top-1/2 -translate-y-1/2 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-[3px] ring-background transition-colors ${
                      isHighlight 
                        ? "bg-gold" 
                        : "bg-semi-blue/50 group-hover:bg-semi-blue/70"
                    }`}>
                      {isHighlight && (
                        <span className="h-1 w-1 rounded-full bg-white" />
                      )}
                    </div>
                    
                    {/* Label */}
                    <span className={`text-sm sm:text-base leading-snug ${isHighlight ? "font-medium text-foreground/88" : "text-foreground/72"}`}>
                      {pick(item.label)}
                      {"note" in item && item.note ? (
                        <span className="ml-1.5 text-xs text-muted-foreground/65">
                          ({pick(item.note as LocalizedText)})
                        </span>
                      ) : null}
                    </span>
                    
                    {/* Date badge */}
                    <span className={`shrink-0 rounded-md px-2.5 py-1 text-xs sm:text-sm font-semibold tabular-nums ${
                      isDeadline 
                        ? "bg-vn-red/8 text-vn-red" 
                        : isHighlight 
                          ? "bg-primary/8 text-primary"
                          : "bg-muted/60 text-foreground/60"
                    }`}>
                      {pick(item.date)}
                    </span>
                  </div>
                );
              })}
            </div>
        </div>
      </section>
    </PageShell>
  );
}
