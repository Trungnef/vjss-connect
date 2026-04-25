import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, GraduationCap, Mail } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { contactEntries, pageCopy } from "@/content/site-content";
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

const contactIcons = [Building2, GraduationCap, Mail] as const;

function ContactPage() {
  const { pick, t } = useSiteLocale();
  const contactPage = pageCopy.contact;
  const directEmails = contactEntries.flatMap((entry) => entry.emails ?? []);

  return (
    <PageShell
      eyebrow={t("nav.contact")}
      title={pick(contactPage.title)}
      description={pick(contactPage.intro)}
      meta={[
        {
          label: t("contact.metaDirectEmails"),
          value: directEmails.length,
        },
        {
          label: t("contact.metaPaths"),
          value: contactEntries.length,
        },
        {
          label: t("contact.metaPriority"),
          value: t("contact.metaPriorityValue"),
          detail: t("contact.metaPriorityDetail"),
        },
      ]}
      quickLinks={[
        { label: t("contact.quickContacts"), href: "#contacts" },
        { label: t("contact.quickActions"), href: "#actions" },
      ]}
      heroNote={t("contact.heroNote")}
      actions={
        <>
          <Button asChild>
            <Link to="/registration">
              {t("nav.registration")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/sponsors">{t("nav.sponsors")}</Link>
          </Button>
        </>
      }
      aside={
        <div className="space-y-4">
          <div className="panel-card-muted p-4">
            <p className="section-kicker">{t("contact.directEmailsEyebrow")}</p>
            <p className="mt-2 font-serif text-3xl font-semibold text-primary">
              {directEmails.length}
            </p>
            <p className="mt-1 text-sm text-foreground/72">{t("contact.directEmailsAvailable")}</p>
          </div>
        </div>
      }
    >
      <section id="contacts" className="anchor-target section-frame">
        <SectionHeading
          eyebrow={t("contact.contactsEyebrow")}
          title={t("contact.contactsTitle")}
          description={t("contact.contactsDescription")}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {contactEntries.map((entry, index) => {
            const Icon = contactIcons[index % contactIcons.length];

            return (
              <article key={entry.label.en} className="panel-card interactive-card p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-secondary text-vn-red">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 section-kicker">{pick(entry.label)}</p>
                <p className="mt-3 font-serif text-2xl font-semibold leading-tight text-foreground">
                  {pick(entry.value)}
                </p>
                <p className="mt-4 text-sm leading-7 text-foreground/78">{pick(entry.detail)}</p>

                {entry.emails?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {entry.emails.map((email) => (
                      <Button key={email} asChild size="sm" variant="outline">
                        <a href={`mailto:${email}`}>{email}</a>
                      </Button>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="actions"
        className="anchor-target section-frame mt-16 grid gap-6 xl:grid-cols-[0.96fr_1.04fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("contact.actionsEyebrow")}
            title={t("contact.actionsTitle")}
            description={t("contact.actionsDescription")}
          />
        </article>

        <article className="panel-card panel-card-strong p-7 sm:p-8">
          <p className="section-kicker">{t("contact.actionsEyebrow")}</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
            {t("contact.actionsTitle")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground/78">
            {t("contact.actionsDescription")}
          </p>

          <div className="mt-7 grid gap-3">
            {directEmails.map((email, index) => (
              <Button
                key={email}
                asChild
                variant={index === 0 ? "default" : "outline"}
                className="justify-between"
              >
                <a href={`mailto:${email}`}>
                  {email}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            ))}
            <Button asChild variant="ghost" className="justify-between">
              <Link to="/sponsors">
                {t("contact.sponsorInquiryCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
