import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Users, Calendar, CreditCard, MapPin, Clock, CheckCircle2, Mail } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  conferenceIdentity,
  pageCopy,
  keyDates,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/registration")({
  head: () => ({
    meta: [
      { title: i18n.t("registration.metaTitle") },
      {
        name: "description",
        content: i18n.t("registration.metaDescription"),
      },
      { property: "og:title", content: i18n.t("registration.metaTitle") },
    ],
  }),
  component: RegistrationPage,
});

// Structured registration info
const registrationInfo = {
  status: "coming-soon" as const, // "coming-soon" | "open" | "closed"
  venue: {
    name: { en: "VNU Vietnam Japan University", vi: "Trường Đại học Việt Nhật", ja: "ベトナム日本大学" },
    location: { en: "Hanoi, Vietnam", vi: "Hà Nội, Việt Nam", ja: "ハノイ、ベトナム" },
  },
  format: { en: "In-person with hybrid support", vi: "Trực tiếp kết hợp trực tuyến", ja: "対面（ハイブリッド対応）" },
  includes: [
    { key: "sessions", icon: CheckCircle2 },
    { key: "materials", icon: CheckCircle2 },
    { key: "coffee", icon: CheckCircle2 },
    { key: "networking", icon: CheckCircle2 },
  ],
};

const audienceGroups = [
  { key: "researchers", color: "bg-primary/10 text-primary" },
  { key: "students", color: "bg-semi-blue/10 text-semi-blue" },
  { key: "industry", color: "bg-gold/10 text-gold" },
  { key: "universities", color: "bg-vn-red/10 text-vn-red" },
  { key: "public", color: "bg-primary/10 text-primary" },
];

function RegistrationPage() {
  const { pick, t } = useSiteLocale();
  const registrationPage = pageCopy.registration;
  
  // Show all key dates
  const registrationDates = keyDates;

  return (
    <PageShell
      eyebrow={t("nav.registration")}
      title={pick(registrationPage.title)}
      description={pick(registrationPage.intro)}
      quickLinks={[
        { label: t("registration.quickInfo"), href: "#info" },
        { label: t("registration.quickAudience"), href: "#audience" },
        { label: t("registration.quickDates"), href: "#dates" },
      ]}
      heroNote={t("registration.heroNote")}
      actions={
        <>
          <Button asChild className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/contact">
              {t("registration.ctaContactSupport")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/program">{t("registration.ctaReviewProgram")}</Link>
          </Button>
        </>
      }
    >
      {/* Registration Status Banner */}
      <section id="info" className="anchor-target section-frame">
        <SectionHeading eyebrow={t("registration.infoTitle")} />

        <div className="mt-6 panel-card p-5 sm:p-6 max-w-3xl">
          <div className="flex items-start gap-4">
            <span className="icon-wrap icon-wrap-md icon-wrap-gold shrink-0">
              <CreditCard className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm sm:text-base leading-relaxed text-foreground/72 text-justify">
                Registration fees will be announced later. The registration fee is expected to cover access to symposium sessions, conference materials, coffee breaks, and selected official networking activities. Details regarding student registration, early bird registration, industry registration, and hybrid participation will be provided on the official symposium website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      {/* <section id="audience" className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7">
        <SectionHeading
          eyebrow={t("registration.audienceTitle")}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {audienceGroups.map((group, index) => (
            <article 
              key={group.key}
              className="panel-card interactive-card p-5 text-center"
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${group.color}`}>
                <Users className="h-6 w-6" />
              </span>
              <p className="mt-4 font-serif text-base font-semibold text-foreground">
                {t(`registration.audience.${group.key}`)}
              </p>
            </article>
          ))}
        </div>
      </section> */}

      {/* Key Dates */}
      <section id="dates" className="anchor-target section-frame mt-8 sm:mt-10">
        <SectionHeading eyebrow={t("registration.datesEyebrow")} />

        <div className="relative mt-8 pl-7 sm:pl-8">
          {/* Gradient rail */}
          <div className="absolute left-[6px] top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-gold/70 via-semi-blue/35 to-border/15" />

          <div className="space-y-2">
            {registrationDates.map((dateItem, index) => {
              const isFirst = index === 0;
              const isLast = index === registrationDates.length - 1;
              const isHighlight = isFirst || isLast;
              const isDeadline = pick(dateItem.label).toLowerCase().includes("deadline");
              const isSymposium = pick(dateItem.label).toLowerCase().includes("symposium") || pick(dateItem.label).toLowerCase().includes("hội thảo");

              return (
                <div
                  key={pick(dateItem.label)}
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
                      {pick(dateItem.label)}
                    </span>
                    {"note" in dateItem && dateItem.note ? (
                      <span className="text-xs text-muted-foreground/60">
                        ({pick(dateItem.note as Record<"en" | "vi" | "ja", string>)})
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
                    {pick(dateItem.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <Button asChild size="sm" className="rounded-none uppercase tracking-wider text-xs">
            <Link to="/call-for-papers">
              {t("registration.ctaViewTimeline")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section-frame mt-8 sm:mt-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start gap-3">
            <span className="icon-wrap icon-wrap-md icon-wrap-navy">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {t("registration.supportTitle")}
              </h3>
              <p className="mt-1 text-sm text-foreground/65">
                {t("registration.supportDescription")}
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="rounded-none uppercase tracking-wider text-xs">
            <Link to="/contact">
              {t("registration.ctaContactSupport")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
