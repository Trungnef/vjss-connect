import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Handshake } from "lucide-react";

import i18n from "@/i18n";
import { OrganizationLogo } from "@/components/site/OrganizationLogo";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  pageCopy,
  partnerOrganizations,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: i18n.t("sponsors.metaTitle") },
      {
        name: "description",
        content: i18n.t("sponsors.metaDescription"),
      },
      { property: "og:title", content: i18n.t("sponsors.metaTitle") },
    ],
  }),
  component: SponsorsPage,
});

function SponsorsPage() {
  const { pick, t } = useSiteLocale();
  const sponsorsPage = pageCopy.sponsors;

  return (
    <PageShell
      eyebrow={t("nav.sponsors")}
      title={pick(sponsorsPage.title)}
      description={pick(sponsorsPage.intro)}
      quickLinks={[
        { label: t("sponsors.quickPartners"), href: "#partner-lockups" },
        { label: t("sponsors.quickTiers"), href: "#sponsorship-packages" },
      ]}
      heroNote={t("sponsors.heroNote")}
      actions={
        <>
          <Button asChild className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/contact">
              {t("nav.contact")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </>
      }
    >
      <section id="partner-lockups" className="anchor-target section-frame p-5 sm:p-6">
        <SectionHeading
          eyebrow={t("sponsors.partnerLockupsEyebrow")}
        />

        <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partnerOrganizations.map((item) => (
            <article key={item.name} className="institution-lockup">
              <OrganizationLogo item={item} />
              <div>
                <p className="institution-name mt-2">{item.name}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sponsorship-packages" className="anchor-target section-frame mt-12 sm:mt-16 p-5 sm:p-6">
        <div className="mt-6 sm:mt-8 panel-card p-6 sm:p-8 lg:p-10 text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-secondary text-vn-red mb-5 sm:mb-6">
            <Handshake className="h-7 w-7 sm:h-8 sm:w-8" />
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
            {pick(sponsorsPage.intro)}
          </h3>
          <Button asChild size="lg" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/contact">
              {t("sponsors.ctaContactSponsor")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
