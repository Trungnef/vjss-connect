import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Cpu,
  MapPin,
} from "lucide-react";

import heroConferenceImg from "@/assets/herro_banner.png";
import i18n from "@/i18n";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  conferenceIdentity,
  keyDates,
  homeWelcome,
  homeProgramDays,
  technicalThemes,
  type LocalizedText,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: i18n.t("home.metaTitle"),
      },
      {
        name: "description",
        content: i18n.t("home.metaDescription"),
      },
      {
        property: "og:title",
        content: i18n.t("home.metaTitle"),
      },
      {
        property: "og:description",
        content: i18n.t("home.metaDescription"),
      },
    ],
  }),
  component: HomePage,
});

const L = (en: string, vi: string, ja: string = en): LocalizedText => ({
  en,
  vi,
  ja,
});

function HomePage() {
  const { pick, t } = useSiteLocale();

  const heroFacts = [
    {
      label: t("dates.conference"),
      value: pick(conferenceIdentity.dates),
      icon: CalendarDays,
    },
    {
      label: t("nav.venue"),
      value: pick(conferenceIdentity.venue),
      icon: MapPin,
    },
    {
      label: t("home.heroFormatLabel"),
      value: pick(conferenceIdentity.format),
      icon: Clock3,
    },
  ];

  const themeLayouts = [
    "xl:col-span-7",
    "xl:col-span-5",
    "xl:col-span-4",
    "xl:col-span-4",
    "xl:col-span-4",
    "xl:col-span-6",
    "xl:col-span-6",
  ] as const;

  return (
    <>
      <section className="border-b border-border/20 bg-[#071427]">
        <div className="w-full overflow-hidden">
          <img
            src={heroConferenceImg}
            alt={pick(conferenceIdentity.fullName)}
            loading="eager"
            decoding="async"
            className="block h-auto w-full opacity-100"
          />
        </div>
      </section>

      {/* Welcome Section */}
      <section id="welcome" className="site-shell anchor-target mt-16 sm:mt-20 lg:mt-24">
        <article className="section-frame p-6 sm:p-8 lg:p-12 xl:p-16">
          {/* Section Header */}
          <div className="mb-10 lg:mb-14">
            <div className="flex items-center gap-4">
              <span className="inline-block w-12 h-px bg-gradient-to-r from-vn-red to-gold" />
              <h2 className="section-kicker text-base sm:text-lg lg:text-4xl tracking-[0.06em]">
                {pick(L("Welcome to VJSS-2026", "Chào mừng đến với VJSS-2026", "VJSS-2026 へようこそ"))}
              </h2>
            </div>
          </div>
          
          {/* Content with decorative border */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-semi-blue/60 to-transparent rounded-full hidden lg:block" />
            <div className="lg:pl-8 xl:pl-12">
              <p className="text-base leading-8 text-foreground/80 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10 sm:text-justify">
                {pick(homeWelcome.body)}
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* News and Announcements Section */}
      <section id="news-announcements" className="site-shell anchor-target mt-16 sm:mt-20 lg:mt-24">
        <div className="section-frame p-6 sm:p-8 lg:p-12 xl:p-16">
          {/* Section Header */}
          <div className="mb-10 lg:mb-14">
            <div className="flex items-center gap-4">
              <span className="inline-block w-12 h-px bg-gradient-to-r from-vn-red to-gold" />
              <h2 className="section-kicker text-base sm:text-lg lg:text-4xl tracking-[0.06em]">
                {pick(L("News & Announcements", "Tin tức & Thông báo", "ニュース・お知らせ"))}
              </h2>
            </div>
          </div>
          
          {/* Content */}
          <div className="panel-card p-6 sm:p-8 lg:p-10 max-w-4xl">
            <p className="text-base leading-8 text-foreground/80 sm:text-lg sm:leading-9">
              {pick(
                L(
                  "News and announcements will be updated soon.",
                  "Tin tức và thông báo của hội thảo sẽ được cập nhật sớm.",
                  "News and announcements will be updated soon."
                )
              )}
            </p>
            <div className="mt-6 pt-6 border-t border-border/40 text-sm text-muted-foreground/70 italic">
              {pick(
                L(
                  "[CMS Note: News links will be listed here in chronological order with the latest news on top]",
                  "[Ghi chú CMS: Link các tin tức về hội thảo sẽ được liệt kê tại đây theo thứ tự tin mới nhất trên đầu]",
                  "[CMS Note: News links will be listed here in chronological order with the latest news on top]"
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Themes Section */}
      <section id="themes" className="site-shell anchor-target mt-16 sm:mt-20 lg:mt-24">
        <div className="section-frame p-6 sm:p-8 lg:p-12 xl:p-16">
          {/* Section Header */}
          <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="inline-block w-12 h-px bg-gradient-to-r from-vn-red to-gold" />
              <h2 className="section-kicker text-base sm:text-lg lg:text-4xl tracking-[0.06em]">
                {pick(L("Theme Clusters", "Chủ đề Kỹ thuật", "技術テーマ"))}
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em] w-fit">
              <Link to="/call-for-papers">
                {t("home.submitPaper")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 xl:grid-cols-12">
          {technicalThemes.map((theme, index) => (
            <article
              key={theme.name.en}
              className={`panel-card interactive-card p-6 ${themeLayouts[index] ?? "xl:col-span-4"
                } ${index === 0 || index === technicalThemes.length - 1
                  ? "panel-card-strong"
                  : ""
                }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-semi-blue">
                  <Cpu className="h-5 w-5" />
                </span>
              </div>

              <h2 className="mt-5 max-w-2xl font-serif text-2xl font-semibold leading-tight">
                <span className="text-gold">Theme {index + 1}:</span> {pick(theme.name)}
              </h2>

              <ul className="mt-4 max-w-3xl space-y-1.5">
                {pick(theme.scope).split(";").map(s => s.trim()).filter(Boolean).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-6 text-foreground/76">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          </div>
        </div>
      </section>

      {/* Key Dates Section - Timeline Design */}
      <section id="key-dates" className="site-shell anchor-target mt-16 sm:mt-20 lg:mt-24">
        <div className="section-frame p-6 sm:p-8 lg:p-12 xl:p-16">
          {/* Section Header */}
          <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="inline-block w-12 h-px bg-gradient-to-r from-vn-red to-gold" />
              <h2 className="section-kicker text-base sm:text-lg lg:text-4xl tracking-[0.06em]">
                {pick(L("Key Dates", "Mốc thời gian quan trọng", "重要な日程"))}
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em] w-fit">
              <Link to="/submission">
                {t("nav.submit")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Timeline - Full width */}
          <div className="relative pl-7 sm:pl-9">
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
                      <span className={`text-sm sm:text-base leading-snug ${isHighlight ? "font-medium text-foreground/90" : "text-foreground/75"}`}>
                        {pick(item.label)}
                        {"note" in item && item.note ? (
                          <span className="ml-1.5 text-xs text-muted-foreground/70">
                            ({pick(item.note as LocalizedText)})
                          </span>
                        ) : null}
                      </span>
                      
                      {/* Date badge */}
                      <span className={`shrink-0 rounded px-2.5 py-1 text-xs sm:text-sm font-semibold tabular-nums ${
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
        </div>
      </section>

      {/* Conference Venue Section */}
      <section id="venue" className="site-shell anchor-target mt-16 sm:mt-20 lg:mt-24">
        <div className="section-frame p-6 sm:p-8 lg:p-12 xl:p-16">
          {/* Section Header */}
          <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="inline-block w-12 h-px bg-gradient-to-r from-vn-red to-gold" />
              <h2 className="section-kicker text-base sm:text-lg lg:text-4xl tracking-[0.06em]">
                {pick(L("Conference Venue", "Địa điểm Hội thảo", "会場"))}
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em] w-fit">
              <Link to="/venue">
                {t("nav.venue")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Content - Full width 2-column layout */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* VNU Card */}
            <div className="panel-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {pick(L("Option 1", "Lựa chọn 1", "オプション1"))}
                </p>
              </div>
              <p className="font-serif text-xl sm:text-2xl font-semibold text-foreground leading-tight">
                {pick(L("Vietnam National University, Hanoi", "Đại học Quốc gia Hà Nội", "ベトナム国家大学ハノイ校"))}
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                {pick(L("Academic venue", "Địa điểm học thuật", "学術会場"))}
              </p>
            </div>

            {/* Sheraton Card */}
            <div className="panel-card p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-semi-blue/10">
                  <MapPin className="h-5 w-5 text-semi-blue" />
                </div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {pick(L("Option 2", "Lựa chọn 2", "オプション2"))}
                </p>
              </div>
              <p className="font-serif text-xl sm:text-2xl font-semibold text-foreground leading-tight">
                {pick(L("Sheraton Hanoi West", "Sheraton Hanoi West", "シェラトンハノイウエスト"))}
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                {pick(L("Hotel venue", "Địa điểm khách sạn", "ホテル会場"))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tentative Schedule Section */}
            <section id="schedule" className="site-shell anchor-target mt-16 sm:mt-20 lg:mt-24">
        <div className="section-frame p-6 sm:p-8 lg:p-12 xl:p-16">
          {/* Section Header */}
          <div className="mb-10 lg:mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="inline-block w-12 h-px bg-gradient-to-r from-vn-red to-gold" />
              <h2 className="section-kicker text-base sm:text-lg lg:text-4xl tracking-[0.06em]">
                {pick(L("Tentative Schedule", "Lịch trình Dự kiến", "暫定スケジュール"))}
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em] w-fit">
              <Link to="/program">
                {t("home.viewProgram")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homeProgramDays.map((day, index) => (
              <article
                key={`${day.day.en}-${day.date.en}`}
                className={`panel-card interactive-card flex flex-col p-5 sm:p-6 ${index === 0 ? "panel-card-strong" : ""
                  }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="section-kicker">{pick(day.day)}</p>
                  <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/72">
                    {pick(day.date)}
                  </span>
                </div>

                <h2 className="mt-3 font-serif text-xl font-semibold leading-tight lg:text-2xl">
                  {pick(day.title)}
                </h2>

                <ul className="mt-4 flex-1 space-y-2">
                  {day.items.map((item) => (
                    <li
                      key={item.en}
                      className="flex gap-2.5 text-sm leading-6 text-foreground/78"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      />
                      <span>{pick(item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Join VJSS CTA Section */}
      <section className="site-shell mt-12 sm:mt-16 pb-12 sm:pb-16">
        <div className="home-cta-card px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/58">
                {pick(L("Join VJSS-2026", "Tham dự VJSS-2026", "VJSS-2026 への参加"))}
              </p>

              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {pick(
                  L(
                    "Reserve your place at VJSS-2026 and plan your Hanoi conference journey.",
                    "Đăng ký tham dự VJSS-2026 và bắt đầu lên kế hoạch cho hành trình hội nghị tại Hà Nội.",
                    "VJSS-2026 への参加を申し込み、ハノイでの会期に向けた準備を始めましょう。"
                  )
                )}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                {pick(
                  L(
                    "Whether you are joining as a delegate, speaker, partner or sponsor, the next step is simple: register, review the schedule or contact the organizing team.",
                    "Dù bạn tham gia với vai trò đại biểu, diễn giả, đối tác hay nhà tài trợ, bước tiếp theo đều rất đơn giản: đăng ký, xem lịch trình hoặc liên hệ ban tổ chức.",
                    "参加者、登壇者、パートナー、スポンサーのいずれであっても、次のステップはシンプルです — 登録する、プログラムを確認する、または運営事務局に連絡する。"
                  )
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-none uppercase tracking-[0.14em] border-gold bg-gold text-navy hover:bg-[color-mix(in_oklab,var(--gold)_82%,var(--paper))] hover:text-navy"
              >
                <Link to="/registration">
                  {pick(L("Register now", "Đăng ký tham dự", "参加登録する"))}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none uppercase tracking-[0.14em] border-white/16 bg-white/6 text-white hover:border-white/28 hover:bg-white/10 hover:text-white"
              >
                <Link to="/contact">
                  {t("nav.contact")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
