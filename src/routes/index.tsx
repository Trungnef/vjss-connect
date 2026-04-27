import { createFileRoute, Link } from "@tanstack/react-router";
import i18n from "@/i18n";
import { ArrowRight, CalendarDays, FileText, Landmark, MapPin, Users } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  conferenceIdentity,
  featuredSpeakerIds,
  homeHighlights,
  homeImportantDates,
  homeMetrics,
  homePartnerNames,
  homeProgramDays,
  homeWelcome,
  speakerKindLabels,
  speakers,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

import heroImg from "@/assets/hero_semiconductor_bg.webp";

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

const accentByKind = {
  government: "var(--vn-red)",
  academia: "var(--jp-indigo)",
  industry: "var(--semi-blue)",
} as const;

const getInitials = (name: string) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const getPartnerMark = (name: string) => {
  if (/^[A-Z0-9]{2,6}$/.test(name.trim())) {
    return name.trim();
  }

  return name
    .split(/\s+/)
    .filter((part) => !["and", "of", "in", "the"].includes(part.toLowerCase()))
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

function HomePage() {
  const { pick, t } = useSiteLocale();
  const featuredSpeakers = featuredSpeakerIds
    .map((speakerId) => speakers.find((speaker) => speaker.id === speakerId))
    .filter((speaker): speaker is (typeof speakers)[number] => Boolean(speaker));

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-navy text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-48 mix-blend-luminosity brightness-110 contrast-125"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(58,116,191,0.32),transparent_32%),linear-gradient(180deg,rgba(9,17,38,0.6),rgba(9,17,38,0.95))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px] opacity-30" />
        </div>

        <div className="site-shell relative grid gap-10 py-20 sm:py-24 lg:grid-cols-[minmax(0,1.08fr)_0.78fr] lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-[0.35rem] border border-white/18 bg-white/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              {t("home.heroEyebrow")}
            </span>
            <h1 className="mt-7 max-w-5xl font-serif text-4xl font-semibold leading-[1.02] text-balance sm:text-5xl lg:text-[4.6rem]">
              {pick(conferenceIdentity.fullName)}
            </h1>
            <div className="gold-divider mt-7 max-w-sm" />
            <p className="mt-7 max-w-3xl text-lg leading-8 text-primary-foreground/84 sm:text-xl">
              {pick(conferenceIdentity.tagline)}
            </p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[0.65rem] border border-white/12 bg-white/8 px-4 py-4">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-primary-foreground/55">
                  {t("dates.conference")}
                </dt>
                <dd className="mt-2 flex items-start gap-2 text-sm font-medium text-primary-foreground">
                  <CalendarDays className="mt-0.5 h-4 w-4 text-gold" />
                  <span>{pick(conferenceIdentity.dates)}</span>
                </dd>
              </div>
              <div className="rounded-[0.65rem] border border-white/12 bg-white/8 px-4 py-4">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-primary-foreground/55">
                  {t("nav.venue")}
                </dt>
                <dd className="mt-2 flex items-start gap-2 text-sm font-medium text-primary-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                  <span>{pick(conferenceIdentity.venue)}</span>
                </dd>
              </div>
              <div className="rounded-[0.65rem] border border-white/12 bg-white/8 px-4 py-4">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-primary-foreground/55">
                  {t("home.heroFormatLabel")}
                </dt>
                <dd className="mt-2 text-sm font-medium text-primary-foreground">
                  {pick(conferenceIdentity.format)}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/95"
              >
                <Link to="/call-for-papers">
                  {t("home.heroCtaSubmit")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/18 bg-white/8 text-primary-foreground hover:bg-white/12 hover:text-primary-foreground"
              >
                <Link to="/registration">{t("home.heroCtaRegister")}</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <aside className="rounded-[0.85rem] border border-white/14 bg-white/9 p-6">
              <p className="section-kicker text-gold/95">{t("home.heroAsideEyebrow")}</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance">
                {t("home.heroAsideTitle")}
              </h2>
              <p className="mt-4 text-sm leading-7 text-primary-foreground/78">
                {t("home.heroAsideBody")}
              </p>
            </aside>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[0.75rem] border border-white/12 bg-white/8 p-5">
                <p className="section-kicker text-gold/95">{t("home.hostCardTitle")}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {homePartnerNames.slice(0, 3).map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs text-primary-foreground/80"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[0.75rem] border border-white/12 bg-white/8 p-5">
                <p className="section-kicker text-gold/95">{t("home.startHereTitle")}</p>
                <div className="mt-3 grid gap-2">
                  <Link
                    to="/program"
                    className="rounded-[0.35rem] border border-white/12 bg-black/16 px-3 py-2 text-sm text-primary-foreground/82 transition hover:bg-white/12 hover:text-primary-foreground"
                  >
                    {t("home.startHereProgram")}
                  </Link>
                  <Link
                    to="/speakers"
                    className="rounded-[0.35rem] border border-white/12 bg-black/16 px-3 py-2 text-sm text-primary-foreground/82 transition hover:bg-white/12 hover:text-primary-foreground"
                  >
                    {t("home.startHereSpeakers")}
                  </Link>
                  <Link
                    to="/venue"
                    className="rounded-[0.35rem] border border-white/12 bg-black/16 px-3 py-2 text-sm text-primary-foreground/82 transition hover:bg-white/12 hover:text-primary-foreground"
                  >
                    {t("home.startHereVenue")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="snapshot" className="site-shell anchor-target py-14 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {homeMetrics.map((metric) => (
            <article key={metric.label.en} className="metric-tile interactive-card">
              <p className="font-serif text-4xl font-semibold text-primary">{metric.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {pick(metric.label)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="direction" className="site-shell anchor-target section-frame py-8 sm:py-10">
        <SectionHeading
          eyebrow={t("home.directionEyebrow")}
          title={t("home.directionTitle")}
          actions={
            <Button asChild variant="outline">
              <Link to="/about">
                {t("nav.about")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {homeHighlights.map((item, index) => (
            <article
              key={item.title.en}
              className="panel-card interactive-card overflow-hidden p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="section-kicker">{`0${index + 1}`}</span>
                <span className="h-8 w-8 rounded-full bg-[linear-gradient(180deg,var(--gold),color-mix(in_oklab,var(--gold)_65%,white))] opacity-85" />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight">
                {pick(item.title)}
              </h3>
              <p className="mt-4 text-sm leading-7 text-foreground/76">{pick(item.body)}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="program-overview"
        className="site-shell anchor-target section-frame py-14 sm:py-16"
      >
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <article className="panel-card panel-card-strong overflow-hidden p-7 sm:p-8">
            <p className="section-kicker">{t("home.planningNoteEyebrow")}</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-[2.55rem]">
              {t("home.overviewTitle")}
            </h2>
            <p className="mt-5 text-base leading-8 text-foreground/78">{pick(homeWelcome.body)}</p>
            <p className="mt-6 font-serif text-lg italic text-muted-foreground">
              {t("home.overviewSignature")}
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {homeProgramDays.map((day, index) => (
              <article
                key={`${day.date}-${day.title.en}`}
                className="panel-card interactive-card relative overflow-hidden p-6"
              >
                <span className="absolute right-5 top-4 font-serif text-6xl font-semibold text-foreground/6">
                  0{index + 1}
                </span>
                <p className="section-kicker">{pick(day.day)}</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <h3 className="font-serif text-2xl font-semibold leading-tight">
                    {pick(day.title)}
                  </h3>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/72">
                    {pick(day.date)}
                  </span>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/76">
                  {day.items.map((item) => (
                    <li key={item.en} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>{pick(item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="speakers" className="site-shell anchor-target section-frame py-14 sm:py-16">
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

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredSpeakers.map((speaker) => (
            <article key={speaker.id} className="panel-card interactive-card overflow-hidden">
              <div className="relative h-64 overflow-hidden border-b border-border/70 bg-secondary">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/46 to-transparent" />
                <div
                  className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-primary-foreground"
                  style={{ backgroundColor: accentByKind[speaker.kind] }}
                >
                  {getInitials(speaker.name)}
                </div>
              </div>
              <div className="space-y-4 p-6">
                <Badge
                  variant="outline"
                  className="w-fit border-gold/40 bg-background/70 text-[10px] uppercase tracking-[0.22em] text-foreground/70"
                >
                  {pick(speakerKindLabels[speaker.kind])}
                </Badge>
                <div>
                  <h3 className="font-serif text-2xl font-semibold leading-tight">
                    {speaker.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-foreground/82">
                    {pick(speaker.role)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {pick(speaker.organization)}
                  </p>
                </div>
                <p className="text-sm leading-7 text-foreground/74">{pick(speaker.summary)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="partners" className="site-shell anchor-target section-frame py-14 sm:py-16">
        <div className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
          <article className="panel-card p-7 sm:p-8">
            <SectionHeading
              eyebrow={t("home.calendarCategory")}
              title={t("home.importantDates")}
              description={t("home.calendarSubtitle")}
              actions={
                <Button asChild>
                  <Link to="/program">
                    {t("home.viewProgram")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              }
            />

            <ol className="mt-8 grid gap-4">
              {homeImportantDates.map((item) => (
                <li key={`${item.label.en}-${item.value.en}`} className="timeline-rail">
                  <span className="timeline-node" aria-hidden />
                  <div className="panel-card-muted p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="font-serif text-xl font-semibold text-foreground">
                        {pick(item.value)}
                      </h3>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground/72">
                        {pick(item.label)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <div className="grid gap-6">
            <article className="panel-card panel-card-strong p-7 sm:p-8">
              <SectionHeading
                eyebrow={t("home.partnersCategory")}
                title={t("home.sponsorsTitle")}
                description={t("home.sponsorsSubtitle")}
              />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {homePartnerNames.map((name) => (
                  <div key={name} className="institution-lockup">
                    <div className="institution-mark">{getPartnerMark(name)}</div>
                    <div>
                      <p className="institution-role">{t("sponsors.partnerPlaceholderRole")}</p>
                      <p className="institution-name mt-2">{name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-3">
              <Link to="/sponsors" className="panel-card interactive-card block p-6">
                <Users className="h-6 w-6 text-semi-blue" />
                <h3 className="mt-5 font-serif text-2xl font-semibold">
                  {t("home.becomeSponsor")}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/76">
                  {t("home.becomeSponsorDesc")}
                </p>
              </Link>
              <Link to="/call-for-papers" className="panel-card interactive-card block p-6">
                <FileText className="h-6 w-6 text-vn-red" />
                <h3 className="mt-5 font-serif text-2xl font-semibold">{t("home.submitPaper")}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground/76">
                  {t("home.submitPaperDesc")}
                </p>
              </Link>
              <Link to="/contact" className="panel-card interactive-card block p-6">
                <Landmark className="h-6 w-6 text-jp-indigo" />
                <h3 className="mt-5 font-serif text-2xl font-semibold">{t("home.contactTitle")}</h3>
                <p className="mt-3 text-sm leading-7 text-foreground/76">{t("home.contactDesc")}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
