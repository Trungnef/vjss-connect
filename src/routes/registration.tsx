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
  
  // Filter key dates for registration-related ones
  const registrationDates = keyDates.filter(d => 
    pick(d.label).toLowerCase().includes('registration') || 
    pick(d.label).toLowerCase().includes('conference')
  );

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
      <section id="info" className="anchor-target section-frame p-5 sm:p-7">
        <SectionHeading
          eyebrow={t("registration.infoTitle")}
        />

        <p className="mt-8 text-base sm:text-lg leading-relaxed text-foreground/70 max-w-4xl text-justify">
          Registration fees will be announced later. The registration fee is expected to cover access to symposium sessions, conference materials, coffee breaks, and selected official networking activities. Details regarding student registration, early bird registration, industry registration, and hybrid participation will be provided on the official symposium website.
        </p>
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
      <section id="dates" className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7">
        <SectionHeading
          eyebrow={t("registration.datesEyebrow")}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {registrationDates.map((dateItem, index) => (
            <article 
              key={pick(dateItem.label)}
              className="panel-card p-5 flex items-start gap-4"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold font-mono text-sm font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground/70">{pick(dateItem.label)}</p>
                <p className="mt-1 font-serif text-lg font-semibold text-foreground">
                  {pick(dateItem.date)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button asChild className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/call-for-papers">
              {t("registration.ctaViewTimeline")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section-frame mt-12 sm:mt-16 p-5 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {t("registration.supportTitle")}
              </h3>
              <p className="mt-1 text-sm text-foreground/70">
                {t("registration.supportDescription")}
              </p>
            </div>
          </div>
          <Button asChild className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/contact">
              {t("registration.ctaContactSupport")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
