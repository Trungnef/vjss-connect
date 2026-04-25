import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Mic,
  FileText,
  Users,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import heroImg from "@/assets/hero_semiconductor_bg.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: i18n.t("home.metaTitle") || "VJSS 2026 — Vietnam–Japan Semiconductor Symposium" },
      {
        name: "description",
        content: i18n.t("home.metaDescription") || "September 17–19, 2026 in Hanoi. Three days of keynotes, technical sessions, and Vietnam–Japan industry collaboration in semiconductors.",
      },
      {
        property: "og:title",
        content: i18n.t("home.metaTitle") || "VJSS 2026 — Vietnam–Japan Semiconductor Symposium",
      },
      {
        property: "og:description",
        content: i18n.t("home.metaDescription") || "Join leading researchers from Vietnam, Japan, and beyond — September 17–19, 2026, Hanoi.",
      },
    ],
  }),
  component: HomePage,
});

const stats = [
  { key: "countries" as const, value: "20+" },
  { key: "speakers" as const, value: "40+" },
  { key: "papers" as const, value: "300+" },
  { key: "tracks" as const, value: "8" },
];

const speakers = [
  {
    name: "Prof. Hiroshi Tanaka",
    roleKey: "keynote",
    affiliationKey: "utokyo",
    initials: "HT",
    accent: "jp-indigo",
  },
  {
    name: "Prof. Nguyễn Minh Hà",
    roleKey: "keynote",
    affiliationKey: "vnu",
    initials: "NH",
    accent: "vn-red",
  },
  {
    name: "Dr. Aiko Yamamoto",
    roleKey: "invited",
    affiliationKey: "renesas",
    initials: "AY",
    accent: "semi-blue",
  },
  {
    name: "Dr. Trần Quốc Bảo",
    roleKey: "invited",
    affiliationKey: "fpt",
    initials: "TB",
    accent: "navy",
  },
] as const;

const programDayKeys = ["day1", "day2", "day3"] as const;

const importantDates = [
  { key: "submissionOpen", date: "Mar 1, 2026" },
  { key: "submissionDeadline", date: "May 15, 2026" },
  { key: "notification", date: "Jul 1, 2026" },
  { key: "cameraReady", date: "Aug 5, 2026" },
  { key: "earlyReg", date: "Aug 20, 2026" },
  { key: "conference", date: "Sep 17–19, 2026" },
] as const;

const sponsorKeys = [0, 1, 2, 3, 4, 5, 6, 7] as const;

function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-primary-foreground border-b border-border">
        
        {/* High-Tech Glowing Ambient Orbs */}
        <div className="absolute -top-40 -right-40 h-[800px] w-[800px] rounded-full bg-semi-blue/30 blur-[140px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute -bottom-40 -left-20 h-[600px] w-[600px] rounded-full bg-jp-indigo/40 blur-[120px] pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />

        {/* Primary Semiconductor Image Background */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-60 mix-blend-luminosity brightness-110 contrast-125"
          />
          {/* Deep Navy Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-90" />
        </div>

        {/* Decorative Circuit Board Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15]" 
          style={{ 
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)", 
            backgroundSize: "64px 64px",
            maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
          }}>
        </div>
        
        {/* Horizontal Laser Scanning Line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gold pointer-events-none opacity-50 shadow-[0_0_15px_#d4af37] animate-[pulse_4s_ease-in-out_infinite]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-gold">
              {t("home.eyebrow")}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.1] text-balance sm:text-5xl lg:text-[3.75rem]">
              {t("conf.fullName")}
            </h1>
            <div className="gold-divider mt-7 max-w-sm" />
            <p className="mt-7 max-w-2xl text-lg text-primary-foreground/85">
              {t("conf.tagline")}
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-primary-foreground/60">
                    {t("dates.conference")}
                  </dt>
                  <dd className="mt-1 font-medium">{t("conf.dates")}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-gold" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-primary-foreground/60">
                    {t("nav.venue")}
                  </dt>
                  <dd className="mt-1 font-medium">{t("conf.venue")}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link to="/call-for-papers">
                  {t("home.heroCtaSubmit")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/registration">{t("home.heroCtaRegister")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.key} className="text-center sm:text-left">
                <dd className="font-serif text-4xl font-semibold text-primary">
                  {s.value}
                </dd>
                <dt className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {t(`home.stats.${s.key}`)}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* WELCOME */}
      <section className="wafer-pattern bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-vn-red">
              {t("home.welcomeCategory")}
            </p>
            <div className="gold-divider mt-4 max-w-[8rem]" />
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              {t("home.welcomeTitle")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/85">
              {t("home.welcomeBody")}
            </p>
            <p className="mt-6 font-serif italic text-muted-foreground">
              — {t("home.welcomeSignature")}
            </p>
          </div>
        </div>
      </section>

      {/* SPEAKERS */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-vn-red">
                {t("home.speakersCategory")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                {t("home.speakersTitle")}
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                {t("home.speakersSubtitle")}
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/speakers">
                {t("home.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {speakers.map((s) => (
              <article
                key={s.name}
                className="group relative flex flex-col rounded-lg border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full font-serif text-xl font-semibold text-primary-foreground"
                  style={{ backgroundColor: `var(--${s.accent})` }}
                  aria-hidden
                >
                  {s.initials}
                </div>
                <Badge
                  variant="outline"
                  className="mt-5 w-fit border-gold/40 text-[10px] uppercase tracking-wider text-foreground/70"
                >
                  {t(`home.speakersData.${s.roleKey}`)}
                </Badge>
                <h3 className="mt-3 font-serif text-lg font-semibold leading-snug">
                  {s.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(`home.speakersData.affiliations.${s.affiliationKey}`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM HIGHLIGHTS */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-vn-red">
                {t("home.programCategory")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                {t("home.programTitle")}
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                {t("home.programSubtitle")}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/program">{t("home.viewProgram")}</Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {programDayKeys.map((dayKey, i) => {
              const items = t(`home.programDays.${dayKey}.items`, { returnObjects: true }) as string[];
              return (
                <article
                  key={dayKey}
                  className="relative flex flex-col rounded-lg border border-border bg-card p-7"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {t(`home.programDays.${dayKey}.day`)}
                    </span>
                    <span className="font-serif text-sm text-jp-indigo">
                      {t(`home.programDays.${dayKey}.date`)}
                    </span>
                  </div>
                  <div className="gold-divider mt-4" />
                  <h3 className="mt-5 font-serif text-xl font-semibold">
                    {t(`home.programDays.${dayKey}.title`)}
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                    {items && Array.isArray(items) && items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1 w-4 flex-none bg-gold"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span
                    aria-hidden
                    className="absolute right-6 top-6 font-serif text-5xl font-semibold text-foreground/5"
                  >
                    0{i + 1}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPORTANT DATES */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-vn-red">
                {t("home.calendarCategory")}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                {t("home.importantDates")}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t("home.calendarSubtitle")}
              </p>
              <Button asChild className="mt-8">
                <Link to="/call-for-papers">
                  {t("nav.cfp")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="lg:col-span-8">
              <ol className="divide-y divide-border border-y border-border">
                {importantDates.map((d) => (
                  <li
                    key={d.key}
                    className="grid grid-cols-3 items-baseline gap-4 py-4 sm:grid-cols-[1fr_auto]"
                  >
                    <span className="col-span-2 font-serif text-base text-foreground sm:col-span-1">
                      {t(`dates.${d.key}`)}
                    </span>
                    <span className="text-right font-mono text-sm tabular-nums text-jp-indigo">
                      {t(`dates.values.${d.key}`)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS STRIP */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-vn-red">
              {t("home.partnersCategory")}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {t("home.sponsorsTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {t("home.sponsorsSubtitle")}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {sponsorKeys.map((idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-card px-4 py-8 font-serif text-sm text-foreground/70 transition hover:text-primary"
              >
                {t(`home.sponsorsList.${idx}`)}
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <Link
              to="/sponsors"
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition hover:border-primary/40"
            >
              <Users className="h-6 w-6 flex-none text-semi-blue" />
              <div>
                <h3 className="font-serif text-base font-semibold">{t("home.becomeSponsor")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("home.becomeSponsorDesc")}
                </p>
              </div>
            </Link>
            <Link
              to="/call-for-papers"
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition hover:border-primary/40"
            >
              <FileText className="h-6 w-6 flex-none text-vn-red" />
              <div>
                <h3 className="font-serif text-base font-semibold">{t("home.submitPaper")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("home.submitPaperDesc")}
                </p>
              </div>
            </Link>
            <Link
              to="/program"
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition hover:border-primary/40"
            >
              <Mic className="h-6 w-6 flex-none text-jp-indigo" />
              <div>
                <h3 className="font-serif text-base font-semibold">{t("home.exploreProgram")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("home.exploreProgramDesc")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* TRILINGUAL CALLOUT */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-12 text-center sm:flex-row sm:justify-center sm:gap-6 sm:text-left">
          <Globe2 className="h-6 w-6 text-gold" />
          <p className="font-serif text-base">
            {t("home.trilingual")}
          </p>
        </div>
      </section>
    </>
  );
}
