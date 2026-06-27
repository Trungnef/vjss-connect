import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone, User, Users, Building2, ExternalLink } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { pageCopy } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: i18n.t("contact.metaTitle") },
      {
        name: "description",
        content: i18n.t("contact.metaDescription"),
      },
      { property: "og:title", content: i18n.t("contact.metaTitle") },
    ],
  }),
  component: ContactPage,
});

// Structured contact data for cleaner display
const structuredContacts = {
  secretariat: {
    role: { en: "Conference Secretariat", vi: "Ban Thư ký Hội nghị", ja: "事務局" },
    name: "Bui Thu Trang",
    title: "BA",
    affiliation: { en: "VNU Vietnam Japan University", vi: "Trường Đại học Việt Nhật", ja: "ベトナム日本大学" },
    email: "vjss-info@vju.ac.vn",
    phone: "+84 856389040",
    description: { 
      en: "Main contact for registration, logistics, and general inquiries.", 
      vi: "Liên hệ chính cho đăng ký, hậu cần và các câu hỏi chung.",
      ja: "登録、ロジスティクス、一般的なお問い合わせの主要連絡先。"
    },
  },
  academicLiaisons: [
    {
      name: "Le Duc Anh",
      title: "Assoc. Prof.",
      affiliation: { en: "University of Tokyo", vi: "Đại học Tokyo", ja: "東京大学" },
    },
    {
      name: "Bui Nguyen Quoc Trinh", 
      title: "Assoc. Prof.",
      affiliation: { en: "VNU Vietnam Japan University", vi: "Trường Đại học Việt Nhật", ja: "ベトナム日本大学" },
    },
  ],
  generalEmail: "vjss-info@vju.ac.vn",
};

function ContactPage() {
  const { pick, t } = useSiteLocale();
  const contactPage = pageCopy.contact;

  return (
    <PageShell
      eyebrow={t("nav.contact")}
      title={pick(contactPage.title)}
      description={pick(contactPage.intro)}
      quickLinks={[
        { label: t("contact.quickContacts"), href: "#contacts" },
        { label: t("contact.quickActions"), href: "#actions" },
      ]}
      heroNote={t("contact.heroNote")}
      actions={
        <>
          <Button asChild className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/registration">
              {t("nav.registration")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/sponsors">{t("nav.sponsors")}</Link>
          </Button>
        </>
      }
    >
      {/* Primary Contact - Conference Secretariat */}
      <section id="contacts" className="anchor-target section-frame p-5 sm:p-7">
        <SectionHeading
          eyebrow={t("contact.academicLiaisons")}
        />

        {/* Academic Liaisons - Grid */}
        <div className="mt-6 sm:mt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {structuredContacts.academicLiaisons.map((liaison, index) => (
              <article key={liaison.name} className="panel-card interactive-card p-5">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold font-mono text-sm font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-lg font-semibold text-foreground">
                      {liaison.title} {liaison.name}
                    </p>
                    <p className="mt-1 text-sm text-foreground/65 truncate">
                      {pick(liaison.affiliation)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <Building2 className="h-5 w-5 text-gold" />
            <p className="section-kicker text-[30px] font-bold">{pick(structuredContacts.secretariat.role)}</p>
          </div>

          <article className="panel-card panel-card-strong p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
              <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center lg:min-w-[140px]">
                <span className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Building2 className="h-7 w-7 sm:h-8 sm:w-8" />
                </span>
              </div>

              <div className="flex-1">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
                  {structuredContacts.secretariat.title}. {structuredContacts.secretariat.name}
                </h3>
                <p className="mt-1.5 text-sm text-foreground/70">
                  {pick(structuredContacts.secretariat.affiliation)}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={`mailto:${structuredContacts.secretariat.email}`}
                    className="inline-flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{structuredContacts.secretariat.email}</span>
                  </a>
                  <a
                    href={`tel:${structuredContacts.secretariat.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-3 rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <Phone className="h-4 w-4 text-semi-blue" />
                    <span>{structuredContacts.secretariat.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Quick Actions */}
      <section
        id="actions"
        className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-7"
      >
        <SectionHeading
          title={t("contact.actionsTitle")}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email Us */}
          <a 
            href={`mailto:${structuredContacts.generalEmail}`}
            className="group panel-card interactive-card p-5 sm:p-6 flex flex-col"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Mail className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{t("contact.actionEmail")}</h3>
            <p className="mt-2 text-sm text-foreground/65 flex-1">{t("contact.actionEmailDesc")}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
              <span>{structuredContacts.generalEmail}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </a>

          {/* Register */}
          <Link 
            to="/registration"
            className="group panel-card interactive-card p-5 sm:p-6 flex flex-col"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-semi-blue/10 text-semi-blue transition-colors group-hover:bg-semi-blue group-hover:text-white">
              <User className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{t("contact.actionRegister")}</h3>
            <p className="mt-2 text-sm text-foreground/65 flex-1">{t("contact.actionRegisterDesc")}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-semi-blue">
              <span>{t("contact.goToRegistration")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>

          {/* Sponsorship */}
          <Link 
            to="/sponsors"
            className="group panel-card interactive-card p-5 sm:p-6 flex flex-col"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
              <Building2 className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">{t("contact.actionSponsor")}</h3>
            <p className="mt-2 text-sm text-foreground/65 flex-1">{t("contact.actionSponsorDesc")}</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gold">
              <span>{t("contact.sponsorInquiryCta")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
