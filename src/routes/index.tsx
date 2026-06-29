import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Cpu,
  MapPin,
  Lightbulb,
  Layers,
  Package,
  Brain,
  Sparkles,
  Users,
  Newspaper,
  Building2,
  Calendar,
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

// Theme icons for visual variety
const themeIcons = [Cpu, Lightbulb, Layers, Package, Brain, Sparkles, Users];
const themeColors = [
  "bg-gold/12 text-gold",
  "bg-semi-blue/12 text-semi-blue",
  "bg-vn-red/12 text-vn-red",
  "bg-primary/12 text-primary",
  "bg-gold/12 text-gold",
  "bg-semi-blue/12 text-semi-blue",
  "bg-vn-red/12 text-vn-red",
];

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
      <section id="welcome" className="site-shell anchor-target mt-12 sm:mt-16 lg:mt-20">
        <article className="section-frame">
          <SectionHeading
            eyebrow={pick(L("Welcome to VJSS-2026", "Chào mừng đến với VJSS-2026", "VJSS-2026 へようこそ"))}
            size="large"
          />
          
          {/* Content with decorative border */}
          <div className="relative mt-8 lg:mt-10">
            <div className="absolute -left-3 top-0 bottom-0 w-[3px] bg-gradient-to-b from-gold via-semi-blue/50 to-transparent rounded-full hidden lg:block" />
            <div className="lg:pl-8">
              <p className="text-base leading-relaxed text-foreground/78 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9 text-justify max-w-4xl">
                {pick(homeWelcome.body)}
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* News and Announcements Section */}
      <section id="news-announcements" className="site-shell anchor-target mt-12 sm:mt-16 lg:mt-20">
        <div className="section-frame">
          <SectionHeading
            eyebrow={pick(L("News & Announcements", "Tin tức & Thông báo", "ニュース・お知らせ"))}
            actions={
              <Button asChild variant="outline" size="sm" className="rounded-none uppercase tracking-wider text-xs">
                <Link to="/news">
                  {pick(L("View all news", "Xem tất cả", "すべてのニュース"))}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
          />
          
          {/* Content */}
          <div className="mt-8 panel-card p-6 sm:p-8 max-w-3xl">
            <div className="flex items-start gap-4">
              <span className="icon-wrap icon-wrap-md icon-wrap-gold shrink-0">
                <Newspaper className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-base leading-relaxed text-foreground/76 sm:text-lg">
                  {pick(
                    L(
                      "News and announcements will be updated soon.",
                      "Tin tức và thông báo của hội thảo sẽ được cập nhật sớm.",
                      "News and announcements will be updated soon."
                    )
                  )}
                </p>
                <p className="mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground/60 italic">
                  {pick(
                    L(
                      "[CMS Note: News links will be listed here in chronological order with the latest news on top]",
                      "[Ghi chú CMS: Link các tin tức về hội thảo sẽ được liệt kê tại đây theo thứ tự tin mới nhất trên đầu]",
                      "[CMS Note: News links will be listed here in chronological order with the latest news on top]"
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Themes Section */}
      <section id="themes" className="site-shell anchor-target mt-12 sm:mt-16 lg:mt-20">
        <div className="section-frame">
          <SectionHeading
            eyebrow={pick(L("Theme Clusters", "Chủ đề Kỹ thuật", "技術テーマ"))}
            actions={
              <Button asChild variant="outline" size="sm" className="rounded-none uppercase tracking-wider text-xs">
                <Link to="/call-for-papers">
                  {t("home.submitPaper")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-12">
            {technicalThemes.map((theme, index) => {
              const Icon = themeIcons[index % themeIcons.length];
              const colorClass = themeColors[index % themeColors.length];
              return (
                <article
                  key={theme.name.en}
                  className={`panel-card interactive-card p-5 sm:p-6 ${themeLayouts[index] ?? "xl:col-span-4"
                    } ${index === 0 || index === technicalThemes.length - 1
                      ? "panel-card-strong"
                      : ""
                    }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={`icon-wrap icon-wrap-md ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-medium text-muted-foreground/60">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="mt-4 max-w-2xl font-serif text-xl sm:text-2xl font-semibold leading-tight">
                    <span className="text-gold">Theme {index + 1}:</span> {pick(theme.name)}
                  </h2>

                  <ul className="mt-3 max-w-3xl space-y-2">
                    {pick(theme.scope).split(";").map(s => s.trim()).filter(Boolean).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-base leading-7 text-foreground/72">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Dates Section - Timeline Design */}
      <section id="key-dates" className="site-shell anchor-target mt-12 sm:mt-16 lg:mt-20">
        <div className="section-frame">
          <SectionHeading
            eyebrow={pick(L("Key Dates", "Mốc thời gian quan trọng", "重要な日程"))}
            actions={
              <Button asChild variant="outline" size="sm" className="rounded-none uppercase tracking-wider text-xs">
                <Link to="/submission">
                  {t("nav.submit")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
          />

          {/* Timeline - Full width */}
          <div className="relative mt-8 pl-7 sm:pl-8">
            {/* Elegant gradient rail */}
            <div className="absolute left-[6px] top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-gold/70 via-semi-blue/35 to-border/15" />
            
            <div className="space-y-2">
              {keyDates.map((item, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === keyDates.length - 1;
                const isHighlight = isFirst || isLast;
                const isDeadline = pick(item.label).toLowerCase().includes("deadline");
                
                return (
                  <div
                    key={idx}
                    className={`group relative grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border px-4 py-2.5 sm:px-5 sm:py-3 transition-all duration-200 ${
                      isHighlight 
                        ? "border-gold/30 bg-gradient-to-r from-gold/5 to-transparent" 
                        : "border-border/25 bg-card/40 hover:border-semi-blue/20 hover:bg-card/60"
                    }`}
                  >
                    {/* Timeline node - centered vertically */}
                    <div className={`absolute -left-7 sm:-left-8 top-1/2 -translate-y-1/2 flex h-3 w-3 items-center justify-center rounded-full ring-[2px] ring-background transition-colors ${
                      isHighlight 
                        ? "bg-gold" 
                        : "bg-semi-blue/45 group-hover:bg-semi-blue/65"
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
                          : "bg-muted/50 text-foreground/55"
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

      {/* Venue Section */}
      <section id="venue" className="site-shell anchor-target mt-12 sm:mt-16 lg:mt-20">
        <div className="section-frame">
          <SectionHeading
            eyebrow={pick(L("Venue", "Địa điểm", "会場"))}
            actions={
              <Button asChild variant="outline" size="sm" className="rounded-none uppercase tracking-wider text-xs">
                <Link to="/venue">
                  {t("nav.venue")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
          />
          
          {/* Content - Full width 2-column layout */}
          <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2">
            {/* Venue Card */}
            <div className="panel-card interactive-card p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="icon-wrap icon-wrap-md icon-wrap-gold">
                  <MapPin className="h-5 w-5" />
                </span>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                  {pick(L("Venue", "Địa điểm", "会場"))}
                </p>
              </div>
              <p className="font-serif text-lg sm:text-xl font-semibold text-foreground leading-tight">
                {pick(L("Hanoi, Vietnam", "Hà Nội, Việt Nam", "ハノイ、ベトナム"))}
              </p>
              <p className="mt-2 text-sm text-muted-foreground/70">
                {pick(L("Conference location", "Địa điểm hội thảo", "会議開催地"))}
              </p>
            </div>

            {/* Format Card */}
            <div className="panel-card interactive-card p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="icon-wrap icon-wrap-md icon-wrap-blue">
                  <Clock3 className="h-5 w-5" />
                </span>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                  {pick(L("Format", "Hình thức", "形式"))}
                </p>
              </div>
              <p className="font-serif text-lg sm:text-xl font-semibold text-foreground leading-tight">
                {pick(L("Hybrid", "Hybrid", "ハイブリッド"))}
              </p>
              <p className="mt-2 text-sm text-muted-foreground/70">
                {pick(L("In-person & Online", "Trực tiếp & Trực tuyến", "対面＆オンライン"))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tentative Schedule Section */}
      <section id="schedule" className="site-shell anchor-target mt-12 sm:mt-16 lg:mt-20">
        <div className="section-frame">
          <SectionHeading
            eyebrow={pick(L("Tentative Schedule", "Lịch trình Dự kiến", "暫定スケジュール"))}
            actions={
              <Button asChild variant="outline" size="sm" className="rounded-none uppercase tracking-wider text-xs">
                <Link to="/program">
                  {t("home.viewProgram")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            }
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {homeProgramDays.map((day, index) => (
              <article
                key={`${day.day.en}-${day.date.en}`}
                className={`panel-card interactive-card flex flex-col p-5 ${index === 0 ? "panel-card-strong" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="icon-wrap icon-wrap-sm icon-wrap-gold">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <p className="section-kicker text-base">{pick(day.day)}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/65">
                    {pick(day.date)}
                  </span>
                </div>

                <h2 className="mt-3 font-serif text-lg font-semibold leading-tight lg:text-xl">
                  {pick(day.title)}
                </h2>

                <ul className="mt-3 flex-1 space-y-2">
                  {day.items.map((item) => (
                    <li
                      key={item.en}
                      className="flex gap-2.5 text-base leading-7 text-foreground/72"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70"
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
        <div className="home-cta-card px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                {pick(L("Join VJSS-2026", "Tham dự VJSS-2026", "VJSS-2026 への参加"))}
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2rem]">
                {pick(
                  L(
                    "Reserve your place at VJSS-2026 and plan your Hanoi conference journey.",
                    "Đăng ký tham dự VJSS-2026 và bắt đầu lên kế hoạch cho hành trình hội nghị tại Hà Nội.",
                    "VJSS-2026 への参加を申し込み、ハノイでの会期に向けた準備を始めましょう。"
                  )
                )}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/62">
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
                className="rounded-none uppercase tracking-wider text-xs border-gold bg-gold text-navy hover:bg-[color-mix(in_oklab,var(--gold)_85%,var(--paper))] hover:text-navy"
              >
                <Link to="/registration">
                  {pick(L("Register now", "Đăng ký tham dự", "参加登録する"))}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-none uppercase tracking-wider text-xs border-white/14 bg-white/5 text-white hover:border-white/25 hover:bg-white/8 hover:text-white"
              >
                <Link to="/contact">
                  {t("nav.contact")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
