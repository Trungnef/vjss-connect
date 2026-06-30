import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Users, Calendar, CreditCard, MapPin, Clock, CheckCircle2, Mail, Building2, FileText, AlertCircle, Upload } from "lucide-react";

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

// Registration fee data
const registrationFees = [
  {
    code: "OPT1",
    categoryKey: "international",
    earlyBird: { usd: 300, vnd: null },
    regular: { usd: 350, vnd: null },
  },
  {
    code: "OPT2",
    categoryKey: "domestic",
    earlyBird: { usd: null, vnd: 2000000 },
    regular: { usd: null, vnd: 2500000 },
  },
  {
    code: "OPT3",
    categoryKey: "student",
    earlyBird: { usd: null, vnd: 1000000 },
    regular: { usd: null, vnd: 1500000 },
  },
];

const bankInfo = {
  accountName: "Vietnam Japan University [Truong Dai hoc Viet Nhat]",
  accountNumber: "2600816336",
  bankBranch: "BIDV – My Dinh Branch",
  swiftCode: "BIDVVNVX",
};

function RegistrationPage() {
  const { pick, t } = useSiteLocale();
  const registrationPage = pageCopy.registration;
  
  // Show all key dates
  const registrationDates = keyDates;

  // Format VND with thousand separator
  const formatVND = (amount: number | null) => {
    if (amount === null) return "—";
    return amount.toLocaleString("vi-VN");
  };

  // Format USD
  const formatUSD = (amount: number | null) => {
    if (amount === null) return "—";
    return amount.toString();
  };

  return (
    <PageShell
      eyebrow={t("nav.registration")}
      title={pick(registrationPage.title)}
      description={pick(registrationPage.intro)}
      quickLinks={[
        { label: t("registration.quickFees"), href: "#fees" },
        { label: t("registration.quickPayment"), href: "#payment" },
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
      {/* I. Registration Fees Section */}
      <section id="fees" className="anchor-target section-frame">
        <SectionHeading eyebrow={t("registration.feesTitle")} />

        {/* Fee Table - Clean academic data table */}
        <div className="mt-8">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <table className="w-full">
                <thead>
                  {/* Main header row */}
                  <tr className="bg-navy/[0.03]">
                    <th rowSpan={2} className="w-28 px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-foreground/80 border-b border-r border-border/60 align-bottom">
                      {t("registration.table.optionCode")}
                    </th>
                    <th rowSpan={2} className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-foreground/80 border-b border-r border-border/60 align-bottom">
                      {t("registration.table.category")}
                    </th>
                    <th colSpan={2} className="px-4 py-3 text-center border-b border-r border-border/60 bg-gold/[0.08]">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[12px] font-bold uppercase tracking-wider text-gold">{t("registration.table.earlyBird")}</span>
                        <span className="text-[11px] font-medium text-foreground/70">
                          {t("registration.table.earlyBirdDate")}
                        </span>
                      </div>
                    </th>
                    <th colSpan={2} className="px-4 py-3 text-center border-b border-border/60">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[12px] font-bold uppercase tracking-wider text-foreground">{t("registration.table.regular")}</span>
                        <span className="text-[11px] font-medium text-foreground/70">
                          {t("registration.table.regularDate")}
                        </span>
                      </div>
                    </th>
                  </tr>
                  {/* Currency sub-header */}
                  <tr className="bg-navy/[0.02]">
                    <th className="w-24 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-foreground/75 border-b border-r border-border/40 bg-gold/[0.04]">USD</th>
                    <th className="w-32 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-foreground/75 border-b border-r border-border/60 bg-gold/[0.04]">VND</th>
                    <th className="w-24 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-foreground/75 border-b border-r border-border/40">USD</th>
                    <th className="w-32 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-foreground/75 border-b border-border/60">VND</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {registrationFees.map((fee, index) => (
                    <tr key={fee.code} className={`${index % 2 === 1 ? "bg-navy/[0.015]" : "bg-transparent"} hover:bg-navy/[0.04] transition-colors duration-150`}>
                      <td className="px-5 py-5 border-r border-border/40 align-top">
                        <span className="inline-flex items-center justify-center rounded bg-navy/8 px-2.5 py-1 text-[11px] font-bold tracking-wide text-navy">
                          {fee.code}
                        </span>
                      </td>
                      <td className="px-6 py-5 border-r border-border/40">
                        <div className="flex flex-col gap-1">
                          <span className="text-[15px] font-bold text-foreground leading-snug">
                            {t(`registration.categories.${fee.categoryKey}.title`)}
                          </span>
                          <span className="text-[13px] font-medium text-foreground/70 leading-relaxed">
                            {t(`registration.categories.${fee.categoryKey}.description`)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-center border-r border-border/30 bg-gold/[0.025]">
                        <span className={`text-[15px] font-semibold tabular-nums ${fee.earlyBird.usd ? "text-gold" : "text-foreground/25"}`}>
                          {fee.earlyBird.usd ? `$${formatUSD(fee.earlyBird.usd)}` : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center border-r border-border/40 bg-gold/[0.025]">
                        <span className={`text-[15px] font-semibold tabular-nums ${fee.earlyBird.vnd ? "text-gold" : "text-foreground/25"}`}>
                          {fee.earlyBird.vnd ? formatVND(fee.earlyBird.vnd) : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center border-r border-border/30">
                        <span className={`text-[15px] font-semibold tabular-nums ${fee.regular.usd ? "text-foreground" : "text-foreground/25"}`}>
                          {fee.regular.usd ? `$${formatUSD(fee.regular.usd)}` : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className={`text-[15px] font-semibold tabular-nums ${fee.regular.vnd ? "text-foreground" : "text-foreground/25"}`}>
                          {fee.regular.vnd ? formatVND(fee.regular.vnd) : "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-border/30">
            {registrationFees.map((fee) => (
              <div key={fee.code} className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary mb-2">
                      {fee.code}
                    </span>
                    <h4 className="font-semibold text-foreground">
                      {t(`registration.categories.${fee.categoryKey}.title`)}
                    </h4>
                    <p className="text-xs text-foreground/55 mt-0.5">
                      {t(`registration.categories.${fee.categoryKey}.description`)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gold/5 border border-gold/20 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-gold/70 mb-1">{t("registration.table.earlyBird")}</div>
                    <div className="text-sm font-semibold text-gold tabular-nums">
                      {fee.earlyBird.usd ? `$${formatUSD(fee.earlyBird.usd)}` : `₫${formatVND(fee.earlyBird.vnd)}`}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/30 border border-border/30 p-3">
                    <div className="text-[10px] uppercase tracking-wider text-foreground/50 mb-1">{t("registration.table.regular")}</div>
                    <div className="text-sm font-semibold text-foreground tabular-nums">
                      {fee.regular.usd ? `$${formatUSD(fee.regular.usd)}` : `₫${formatVND(fee.regular.vnd)}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Notes */}
        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/20 border border-border/30">
            <AlertCircle className="h-4 w-4 text-foreground/50 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm text-foreground/70">
                <span className="font-medium text-foreground">{t("registration.notes.noteLabel")}</span>
              </p>
              <ul className="text-sm text-foreground/70 space-y-1.5 list-disc list-inside">
                <li>{t("registration.notes.domesticRate")}</li>
                <li>{t("registration.notes.internationalRate")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* II. Payment Information Section */}
      <section id="payment" className="anchor-target section-frame mt-10 sm:mt-12">
        <SectionHeading eyebrow={t("registration.paymentTitle")} />

        <p className="mt-4 text-sm sm:text-base text-foreground/70 max-w-3xl">
          {t("registration.paymentIntro")}
        </p>

        {/* Payment Cards Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Bank Information Card */}
          <div className="rounded-xl border border-gray-300 dark:border-gray-600 bg-gradient-to-br from-card via-card to-muted/20 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Building2 className="h-5 w-5" />
                </span>
                <h4 className="font-semibold text-base text-foreground">{t("registration.bankInfo.title")}</h4>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-5">
                <div className="pb-4 border-b border-gray-100 dark:border-gray-700/50">
                  <label className="text-[10px] uppercase tracking-wider text-foreground/50 block mb-1.5">{t("registration.bankInfo.accountName")}</label>
                  <p className="text-sm font-medium text-foreground leading-relaxed">{bankInfo.accountName}</p>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-foreground/50 block mb-1.5">{t("registration.bankInfo.accountNumber")}</label>
                    <p className="text-base font-mono font-bold text-primary tracking-wide">{bankInfo.accountNumber}</p>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-foreground/50 block mb-1.5">{t("registration.bankInfo.swiftCode")}</label>
                    <p className="text-base font-mono font-bold text-foreground tracking-wide">{bankInfo.swiftCode}</p>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-foreground/50 block mb-1.5">{t("registration.bankInfo.bankBranch")}</label>
                  <p className="text-sm font-medium text-foreground">{bankInfo.bankBranch}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Reference Card */}
          <div className="rounded-xl border border-gray-300 dark:border-gray-600 bg-gradient-to-br from-card via-card to-gold/5 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-transparent px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <FileText className="h-5 w-5" />
                </span>
                <h4 className="font-semibold text-base text-foreground">{t("registration.paymentRef.title")}</h4>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-foreground/70 leading-relaxed">
                {t("registration.paymentRef.description")}
              </p>
              <div className="mt-5 p-4 rounded-lg bg-muted/50 border border-gray-200 dark:border-gray-700">
                <p className="text-[10px] uppercase tracking-wider text-foreground/50 mb-2">{t("registration.paymentRef.formatLabel")}</p>
                <code className="text-sm font-mono font-bold text-primary block break-all">
                  [Participant Name] – [Abstract ID] – VJSS2026 – [Option code(s)]
                </code>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-gold/5 border border-gold/20">
                <p className="text-[10px] uppercase tracking-wider text-gold/70 mb-1">{t("registration.paymentRef.example")}</p>
                <code className="text-sm font-mono font-medium text-foreground">
                  Nguyen Van A – A010 – VJSS2026 – OPT1
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Notes */}
        <div className="mt-8">
          <div className="rounded-xl border border-gray-300 dark:border-gray-600 bg-gradient-to-r from-amber-50/50 via-transparent to-transparent dark:from-amber-900/10 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 shrink-0">
                <AlertCircle className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-3">{t("registration.notes.noteLabel")}</h4>
                <ul className="text-sm text-foreground/75 space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">1</span>
                    <span>{t("registration.paymentNotes.uploadReceipt")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">2</span>
                    <span>{t("registration.paymentNotes.confirmation")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">3</span>
                    <span>{t("registration.paymentNotes.bankCharges")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-vn-red/10 text-vn-red text-xs font-bold shrink-0 mt-0.5">4</span>
                    <span className="font-medium">{t("registration.paymentNotes.nonRefundable")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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
