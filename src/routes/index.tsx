import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Mic,
  FileText,
  Users,
  Globe2,
} from "lucide-react";

import heroImg from "@/assets/hero-vjss.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VJSS 2026 — Vietnam–Japan Semiconductor Symposium" },
      {
        name: "description",
        content:
          "September 17–19, 2026 in Hanoi. Three days of keynotes, technical sessions, and Vietnam–Japan industry collaboration in semiconductors.",
      },
      {
        property: "og:title",
        content: "VJSS 2026 — Vietnam–Japan Semiconductor Symposium",
      },
      {
        property: "og:description",
        content:
          "Join leading researchers from Vietnam, Japan, and beyond — September 17–19, 2026, Hanoi.",
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
    role: "Keynote",
    affiliation: "University of Tokyo",
    initials: "HT",
    accent: "jp-indigo",
  },
  {
    name: "Prof. Nguyễn Minh Hà",
    role: "Keynote",
    affiliation: "VNU – University of Engineering",
    initials: "NH",
    accent: "vn-red",
  },
  {
    name: "Dr. Aiko Yamamoto",
    role: "Invited",
    affiliation: "Renesas Electronics",
    initials: "AY",
    accent: "semi-blue",
  },
  {
    name: "Dr. Trần Quốc Bảo",
    role: "Invited",
    affiliation: "FPT Semiconductor",
    initials: "TB",
    accent: "navy",
  },
];

const programDays = [
  {
    day: "Day 1",
    date: "Sep 17",
    title: "Foundations & Materials",
    items: [
      "Opening keynote · Compound semiconductors",
      "Materials & process technology",
      "Welcome reception",
    ],
  },
  {
    day: "Day 2",
    date: "Sep 18",
    title: "Devices & Design",
    items: [
      "Advanced packaging keynote",
      "Device physics · EDA & AI for chip design",
      "Industry panel: Vietnam–Japan supply chain",
    ],
  },
  {
    day: "Day 3",
    date: "Sep 19",
    title: "Systems & Industry",
    items: [
      "Power & RF semiconductors",
      "Talent and education roundtable",
      "Closing & best-paper awards",
    ],
  },
];

const importantDates = [
  { key: "submissionOpen", date: "Mar 1, 2026" },
  { key: "submissionDeadline", date: "May 15, 2026" },
  { key: "notification", date: "Jul 1, 2026" },
  { key: "cameraReady", date: "Aug 5, 2026" },
  { key: "earlyReg", date: "Aug 20, 2026" },
  { key: "conference", date: "Sep 17–19, 2026" },
] as const;

const sponsors = [
  "VNU-UET",
  "HUST",
  "Univ. of Tokyo",
  "Tohoku Univ.",
  "Renesas",
  "Sony Semi.",
  "FPT Semi.",
  "Viettel R&D",
];

function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />
        </div>

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
              01 — {t("home.welcomeTitle")}
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
                02 — Speakers
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
                  {s.role}
                </Badge>
                <h3 className="mt-3 font-serif text-lg font-semibold leading-snug">
                  {s.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.affiliation}
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
                03 — Program
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
            {programDays.map((day, i) => (
              <article
                key={day.day}
                className="relative flex flex-col rounded-lg border border-border bg-card p-7"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {day.day}
                  </span>
                  <span className="font-serif text-sm text-jp-indigo">
                    {day.date}
                  </span>
                </div>
                <div className="gold-divider mt-4" />
                <h3 className="mt-5 font-serif text-xl font-semibold">
                  {day.title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                  {day.items.map((item) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* IMPORTANT DATES */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-vn-red">
                04 — Calendar
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                {t("home.importantDates")}
              </h2>
              <p className="mt-4 text-muted-foreground">
                Mark your calendar — key author and registration milestones.
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
                      {d.date}
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
              05 — Partners
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {t("home.sponsorsTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {t("home.sponsorsSubtitle")}
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {sponsors.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center bg-card px-4 py-8 font-serif text-sm text-foreground/70 transition hover:text-primary"
              >
                {name}
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
                <h3 className="font-serif text-base font-semibold">Become a sponsor</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Reach the Vietnam–Japan semiconductor community.
                </p>
              </div>
            </Link>
            <Link
              to="/call-for-papers"
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition hover:border-primary/40"
            >
              <FileText className="h-6 w-6 flex-none text-vn-red" />
              <div>
                <h3 className="font-serif text-base font-semibold">Submit a paper</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Topics, templates, and submission guidelines.
                </p>
              </div>
            </Link>
            <Link
              to="/program"
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition hover:border-primary/40"
            >
              <Mic className="h-6 w-6 flex-none text-jp-indigo" />
              <div>
                <h3 className="font-serif text-base font-semibold">Explore the program</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sessions, panels, and side events.
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
            English · Tiếng Việt · 日本語 — fully trilingual program and submission system.
          </p>
        </div>
      </section>
    </>
  );
}
