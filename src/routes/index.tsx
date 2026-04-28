import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Cpu,
  GraduationCap,
  Handshake,
  Landmark,
  Layers3,
  MapPin,
  Mic,
  Sparkles,
  Users,
} from "lucide-react";

import heroConferenceImg from "@/assets/herro_banner.png";
import i18n from "@/i18n";
import { OrganizationLogo } from "@/components/site/OrganizationLogo";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpeakerImage } from "@/components/site/SpeakerImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  conferenceIdentity,
  ecosystemGroups,
  expectedOutcomes,
  featuredSpeakerIds,
  homeHighlights,
  homeMetrics,
  homeProgramDays,
  pageCopy,
  programSessions,
  speakerKindLabels,
  speakers,
  technicalThemes,
  venueReference,
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

  const aboutPage = pageCopy.about;

  const featuredSpeakers = featuredSpeakerIds
    .map((speakerId) => speakers.find((speaker) => speaker.id === speakerId))
    .filter((speaker): speaker is (typeof speakers)[number] => Boolean(speaker));

  const leadSpeaker = featuredSpeakers[0] ?? null;

  const supportingSpeakers = leadSpeaker
    ? featuredSpeakers.filter((speaker) => speaker.id !== leadSpeaker.id)
    : featuredSpeakers;

  const highlightedThemes = [
    technicalThemes[0],
    technicalThemes[1],
    technicalThemes[2],
    technicalThemes[3],
    technicalThemes[4],
    technicalThemes[6],
  ].filter((theme): theme is (typeof technicalThemes)[number] => Boolean(theme));

  const delegateCount = homeMetrics[0]?.value ?? "150+";

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

  const overviewCards = [
    {
      title: L("Technical depth", "Chiều sâu kỹ thuật"),
      body: L(
        "Seven themes spanning IC design, materials, packaging, AI, quantum and workforce development.",
        "Bảy chủ đề trải từ thiết kế IC, vật liệu, đóng gói, AI, lượng tử tới phát triển nhân lực."
      ),
      icon: Cpu,
    },
    {
      title: L("Bilateral exchange", "Kết nối song phương"),
      body: L(
        "Researchers, universities, agencies and companies from Vietnam and Japan meet in one program arc.",
        "Nhà nghiên cứu, trường đại học, cơ quan và doanh nghiệp từ Việt Nam, Nhật Bản gặp nhau trong cùng một mạch chương trình."
      ),
      icon: Handshake,
    },
    {
      title: L("Talent pipeline", "Dòng chảy nhân lực"),
      body: L(
        "Student lectures, orientation sessions and networking are built into the core conference experience.",
        "Bài giảng cho sinh viên, phiên định hướng và networking được đặt ngay trong khung chương trình chính."
      ),
      icon: GraduationCap,
    },
  ] as const;

  const attendanceReasons = [
    {
      title: L("Build new research connections", "Mở ra kết nối nghiên cứu mới"),
      body: expectedOutcomes[0],
      icon: Sparkles,
    },
    {
      title: L("Strengthen the talent pipeline", "Tăng cường dòng chảy nhân lực bán dẫn"),
      body: expectedOutcomes[1],
      icon: GraduationCap,
    },
    {
      title: L(
        "Meet universities and industry in one place",
        "Gặp gỡ trường đại học và doanh nghiệp trong cùng một không gian"
      ),
      body: expectedOutcomes[2],
      icon: Handshake,
    },
    {
      title: L(
        "Follow ecosystem and policy alignment",
        "Nắm bắt các chuyển động hệ sinh thái và chính sách"
      ),
      body: expectedOutcomes[3],
      icon: Landmark,
    },
  ] as const;

  const themeLayouts = [
    "xl:col-span-7",
    "xl:col-span-5",
    "xl:col-span-4",
    "xl:col-span-4",
    "xl:col-span-4",
    "xl:col-span-12",
  ] as const;

  const scheduleLayouts = ["lg:col-span-2", "", "", ""] as const;

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

      <section className="site-shell mt-10 sm:mt-12">
        <div className="section-frame p-5 sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold/90">
                <Sparkles className="h-3.5 w-3.5" />
                {t("home.heroEyebrow")}
              </p>

              <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                {pick(conferenceIdentity.fullName)}
              </h1>

              <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/72 sm:text-lg">
                {pick(conferenceIdentity.tagline)}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-navy text-white hover:bg-navy/90">
                  <Link to="/registration">
                    {t("home.heroCtaRegister")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline">
                  <Link to="/program">
                    {pick(L("View schedule", "Xem lịch trình", "View schedule"))}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {heroFacts.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className="panel-card-muted p-5"
                  >
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      <Icon className="h-4 w-4 text-semi-blue" />
                      {item.label}
                    </div>

                    <p className="mt-3 text-sm font-semibold leading-6 text-foreground">
                      {item.value}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell mt-10 sm:mt-12">
        <div className="grid gap-4 md:grid-cols-3">
          {overviewCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title.en}
                className={`panel-card interactive-card p-5 sm:p-6 ${
                  index === 0 ? "panel-card-strong" : ""
                }`}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-semi-blue">
                  <Icon className="h-5 w-5" />
                </span>

                <h2 className="mt-5 font-serif text-2xl font-semibold leading-tight">
                  {pick(item.title)}
                </h2>

                <p className="mt-3 text-sm leading-7 text-foreground/74">
                  {pick(item.body)}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="intro"
        className="site-shell anchor-target mt-20 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]"
      >
        <article className="section-frame p-6 sm:p-8">
          <SectionHeading
            eyebrow={pick(L("About the conference", "Giới thiệu hội nghị", "About the conference"))}
            title={pick(
              L(
                "A professional Vietnam-Japan platform for semiconductor dialogue and collaboration.",
                "Một nền tảng chuyên nghiệp Việt Nam - Nhật Bản cho đối thoại và hợp tác bán dẫn.",
                "A professional Vietnam-Japan platform for semiconductor dialogue and collaboration."
              )
            )}
            description={pick(aboutPage.intro)}
            actions={
              <Button asChild variant="outline">
                <Link to="/about">
                  {t("nav.about")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="panel-card-muted p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {t("home.heroFormatLabel")}
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/80">
                {pick(conferenceIdentity.format)}
              </p>
            </div>

            <div className="panel-card-muted p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {pick(L("Venue note", "Ghi chú địa điểm", "Venue note"))}
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/80">
                {pick(venueReference.address)}
              </p>
            </div>
          </div>
        </article>

        <aside className="section-frame surface-grid p-6 sm:p-8">
          <p className="section-kicker">
            {pick(L("What sets it apart", "Điểm nổi bật", "What sets it apart"))}
          </p>

          <div className="mt-6 space-y-6">
            {homeHighlights.map((item, index) => (
              <article
                key={item.title.en}
                className={
                  index === 0
                    ? "grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)]"
                    : "grid gap-3 border-t border-border/60 pt-6 sm:grid-cols-[3rem_minmax(0,1fr)]"
                }
              >
                <span className="font-serif text-3xl font-semibold text-gold">
                  {`0${index + 1}`}
                </span>

                <div>
                  <h2 className="font-serif text-2xl font-semibold leading-tight">
                    {pick(item.title)}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-foreground/76">
                    {pick(item.body)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section id="speakers" className="site-shell anchor-target mt-20">
        <SectionHeading
          eyebrow={t("home.speakersCategory")}
          title={t("home.speakersTitle")}
          description={t("home.speakersSubtitle")}
          actions={
            <Button asChild variant="outline">
              <Link to="/speakers">
                {t("home.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {leadSpeaker ? (
            <article className="group panel-card interactive-card overflow-hidden lg:col-span-7">
              <div className="grid md:grid-cols-[minmax(250px,0.9fr)_1.1fr]">
                <SpeakerImage
                  speaker={leadSpeaker}
                  className="aspect-[4/5] border-b border-border/40 md:h-full md:min-h-[420px] md:border-b-0 md:border-r"
                  imageClassName="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                >
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/28 to-transparent" />
                </SpeakerImage>

                <div className="p-6 sm:p-7">
                  <Badge
                    variant="outline"
                    className="border-gold/30 bg-gold/6 text-[10px] uppercase tracking-[0.16em] text-gold/80"
                  >
                    {pick(speakerKindLabels[leadSpeaker.kind])}
                  </Badge>

                  <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight">
                    {leadSpeaker.name}
                  </h2>

                  <p className="mt-3 text-base font-medium text-foreground/78">
                    {pick(leadSpeaker.role)}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-foreground/64">
                    {pick(leadSpeaker.organization)}
                  </p>

                  <div className="editorial-rule mt-6" />

                  <p className="mt-6 font-serif text-xl leading-tight text-primary">
                    {pick(leadSpeaker.topic)}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-foreground/78">
                    {pick(leadSpeaker.summary)}
                  </p>
                </div>
              </div>
            </article>
          ) : null}

          <div className="grid gap-5 lg:col-span-5">
            {supportingSpeakers.map((speaker) => (
              <article
                key={speaker.id}
                className="group panel-card interactive-card overflow-hidden"
              >
                <div className="grid sm:grid-cols-[180px_minmax(0,1fr)]">
                  <SpeakerImage
                    speaker={speaker}
                    className="aspect-[4/5] border-b border-border/40 sm:h-full sm:border-b-0 sm:border-r"
                    imageClassName="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/20 to-transparent" />
                  </SpeakerImage>

                  <div className="p-5 sm:p-6">
                    <Badge
                      variant="outline"
                      className="border-gold/28 bg-gold/5 text-[9px] uppercase tracking-[0.16em] text-gold/80"
                    >
                      {pick(speakerKindLabels[speaker.kind])}
                    </Badge>

                    <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight">
                      {speaker.name}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-foreground/72">
                      {pick(speaker.role)}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-foreground/60">
                      {pick(speaker.organization)}
                    </p>

                    <p className="mt-4 text-sm leading-6 text-foreground/72">
                      {pick(speaker.summary)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="themes" className="site-shell anchor-target mt-20">
        <SectionHeading
          eyebrow={pick(L("Spotlight themes", "Chủ đề nổi bật", "Spotlight themes"))}
          title={pick(
            L(
              "Six conversation tracks shaping the 2026 edition.",
              "Sáu hướng nội dung đang định hình kỳ hội nghị 2026.",
              "Six conversation tracks shaping the 2026 edition."
            )
          )}
          description={pick(
            L(
              "From IC design and optoelectronics to advanced packaging, AI, quantum and talent development, the program is built to serve both technical depth and ecosystem relevance.",
              "Từ thiết kế IC, quang điện tử đến đóng gói tiên tiến, AI, lượng tử và phát triển nhân lực, chương trình được xây để vừa có chiều sâu kỹ thuật vừa gắn với nhu cầu hệ sinh thái.",
              "From IC design and optoelectronics to advanced packaging, AI, quantum and talent development, the program is built to serve both technical depth and ecosystem relevance."
            )
          )}
          actions={
            <Button asChild variant="outline">
              <Link to="/call-for-papers">
                {t("home.submitPaper")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="mt-8 grid gap-4 xl:grid-cols-12">
          {highlightedThemes.map((theme, index) => (
            <article
              key={theme.name.en}
              className={`panel-card interactive-card p-6 ${
                themeLayouts[index] ?? "xl:col-span-4"
              } ${
                index === 0 || index === highlightedThemes.length - 1
                  ? "panel-card-strong"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-bold leading-none text-gold">
                  {`0${index + 1}`}
                </span>

                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-semi-blue">
                  <Cpu className="h-5 w-5" />
                </span>
              </div>

              <h2 className="mt-5 max-w-2xl font-serif text-2xl font-semibold leading-tight">
                {pick(theme.name)}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground/76">
                {pick(theme.scope)}
              </p>

              <div className="mt-5 rounded-[0.9rem] border border-border/60 bg-white/70 px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {pick(L("Track chairs", "Điều phối chủ đề", "Track chairs"))}
                </p>

                <p className="mt-2 text-sm leading-6 text-foreground/78">
                  {theme.chairs.join(", ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="schedule" className="site-shell anchor-target mt-20">
        <div className="section-frame p-6 sm:p-8">
          <SectionHeading
            eyebrow={pick(L("Schedule snapshot", "Lịch trình tóm tắt", "Schedule snapshot"))}
            title={pick(
              L(
                "The conference unfolds over four purposeful days.",
                "Hội nghị được thiết kế thành bốn ngày với nhịp nội dung rõ ràng.",
                "The conference unfolds over four purposeful days."
              )
            )}
            description={pick(
              L(
                "Visitors can scan the overall flow quickly before diving deeper into the full program, technical sessions and implementation timeline.",
                "Người xem có thể quét toàn bộ flow trước khi đi sâu vào lịch chi tiết, các phiên kỹ thuật và timeline triển khai.",
                "Visitors can scan the overall flow quickly before diving deeper into the full program, technical sessions and implementation timeline."
              )
            )}
            actions={
              <Button asChild variant="outline">
                <Link to="/program">
                  {t("home.viewProgram")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {homeProgramDays.map((day, index) => (
              <article
                key={`${day.day.en}-${day.date.en}`}
                className={`panel-card interactive-card p-6 ${
                  scheduleLayouts[index] ?? ""
                } ${index === 0 ? "panel-card-strong" : ""}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="section-kicker">{pick(day.day)}</p>

                    <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight">
                      {pick(day.title)}
                    </h2>
                  </div>

                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/72">
                    {pick(day.date)}
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {day.items.map((item) => (
                    <li
                      key={item.en}
                      className="flex gap-3 text-sm leading-7 text-foreground/78"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-gold"
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

      <section
        id="why-attend"
        className="site-shell anchor-target mt-20 grid gap-6 xl:grid-cols-[0.94fr_1.06fr]"
      >
        <article className="section-frame p-6 sm:p-8">
          <SectionHeading
            eyebrow={pick(L("Why attend", "Lý do nên tham dự", "Why attend"))}
            title={pick(
              L(
                "Join a symposium built to create lasting value after the event ends.",
                "Tham dự một hội nghị được thiết kế để tạo giá trị tiếp nối sau khi sự kiện kết thúc.",
                "Join a symposium built to create lasting value after the event ends."
              )
            )}
            description={pick(
              L(
                "VJSS 2026 is not positioned as a one-off gathering. It is designed to catalyze research exchange, talent access and ecosystem follow-up between Vietnam and Japan.",
                "VJSS 2026 không được định vị như một buổi gặp gỡ đơn lẻ. Hội nghị được thiết kế để kích hoạt trao đổi nghiên cứu, tiếp cận nhân lực và hợp tác hệ sinh thái giữa Việt Nam và Nhật Bản.",
                "VJSS 2026 is not positioned as a one-off gathering. It is designed to catalyze research exchange, talent access and ecosystem follow-up between Vietnam and Japan."
              )
            )}
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-border/60 bg-secondary/55 p-5">
              <Mic className="h-5 w-5 text-semi-blue" />
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {pick(L("Speakers", "Diễn giả"))}
              </p>
              <p className="mt-2 font-serif text-3xl font-semibold">
                {speakers.length}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-border/60 bg-secondary/55 p-5">
              <Layers3 className="h-5 w-5 text-semi-blue" />
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {pick(L("Sessions", "Phiên"))}
              </p>
              <p className="mt-2 font-serif text-3xl font-semibold">
                {programSessions.length}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-border/60 bg-secondary/55 p-5">
              <Users className="h-5 w-5 text-semi-blue" />
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {pick(L("Delegates", "Đại biểu"))}
              </p>
              <p className="mt-2 font-serif text-3xl font-semibold">
                {delegateCount}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[1.25rem] border border-border/60 bg-secondary/55 p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {pick(L("Built for", "Phù hợp cho", "Built for"))}
            </p>

            <p className="mt-3 text-sm leading-7 text-foreground/78">
              {pick(
                L(
                  "Academic leaders, researchers, students, policymakers, sponsor teams and companies looking for partnership, recruitment or market insight.",
                  "Lãnh đạo học thuật, nhà nghiên cứu, sinh viên, nhà hoạch định chính sách, nhà tài trợ và doanh nghiệp đang tìm cơ hội hợp tác, tuyển dụng hoặc góc nhìn thị trường.",
                  "Academic leaders, researchers, students, policymakers, sponsor teams and companies looking for partnership, recruitment or market insight."
                )
              )}
            </p>
          </div>
        </article>

        <div className="grid gap-4">
          {attendanceReasons.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title.en}
                className={`panel-card interactive-card p-5 sm:p-6 ${
                  index === 0 ? "panel-card-strong" : ""
                }`}
              >
                <div className="flex gap-4">
                  <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-vn-red">
                    <Icon className="h-5 w-5" />
                  </span>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold leading-tight">
                      {pick(item.title)}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-foreground/78">
                      {pick(item.body)}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="partners" className="site-shell anchor-target mt-20">
        <SectionHeading
          eyebrow={t("home.partnersCategory")}
          title={t("home.sponsorsTitle")}
          description={t("home.sponsorsSubtitle")}
          actions={
            <Button asChild variant="outline">
              <Link to="/sponsors">
                {t("nav.sponsors")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="section-frame mt-8 p-6 sm:p-8">
          {ecosystemGroups.map((group, groupIndex) => (
            <div
              key={group.id}
              className={
                groupIndex === 0
                  ? "grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)]"
                  : "mt-8 grid gap-6 border-t border-border/60 pt-8 lg:grid-cols-[13rem_minmax(0,1fr)]"
              }
            >
              <div>
                <p className="section-kicker">{pick(group.title)}</p>

                <p className="mt-3 max-w-xs text-sm leading-7 text-foreground/70">
                  {pick(
                    L(
                      "Official organizations and sponsor-facing partners connected to the symposium.",
                      "Các đơn vị chính thức và đối tác đồng hành gắn với hội nghị.",
                      "Official organizations and sponsor-facing partners connected to the symposium."
                    )
                  )}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {group.items.map((item) => (
                  <article
                    key={`${group.id}-${item.name}`}
                    className="panel-card interactive-card p-4"
                  >
                    <OrganizationLogo item={item} />

                    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {item.meta ? pick(item.meta) : pick(group.title)}
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                      {item.name}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="site-shell mt-20 pb-20">
        <div className="home-cta-card px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/58">
                {pick(L("Final call to action", "CTA cuối trang", "Final call to action"))}
              </p>

              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {pick(
                  L(
                    "Reserve your place at VJSS 2026 and plan your Hanoi conference journey now.",
                    "Đăng ký tham dự VJSS 2026 và bắt đầu lên kế hoạch cho hành trình hội nghị tại Hà Nội ngay từ bây giờ.",
                    "Reserve your place at VJSS 2026 and plan your Hanoi conference journey now."
                  )
                )}
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
                {pick(
                  L(
                    "Whether you are joining as a delegate, speaker, partner or sponsor, the next step should be simple: register, review the schedule or contact the organizing team.",
                    "Dù bạn tham gia với vai trò đại biểu, diễn giả, đối tác hay nhà tài trợ, bước tiếp theo đều nên thật rõ ràng: đăng ký, xem lịch trình hoặc liên hệ ban tổ chức.",
                    "Whether you are joining as a delegate, speaker, partner or sponsor, the next step should be simple: register, review the schedule or contact the organizing team."
                  )
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="border-gold bg-gold text-navy hover:bg-[color-mix(in_oklab,var(--gold)_82%,var(--paper))] hover:text-navy"
              >
                <Link to="/registration">
                  {pick(L("Register now", "Đăng ký tham dự", "Register now"))}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/16 bg-white/6 text-white hover:border-white/28 hover:bg-white/10 hover:text-white"
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