import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Handshake, Megaphone, Trophy } from "lucide-react";

import i18n from "@/i18n";
import { OrganizationLogo } from "@/components/site/OrganizationLogo";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  pageCopy,
  partnerOrganizations,
  sponsorDeliverables,
  sponsorEngagementRoutes,
  sponsorTiers,
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

const routeIcons = [Handshake, Megaphone, Trophy] as const;

function SponsorsPage() {
  const { pick, t } = useSiteLocale();
  const sponsorsPage = pageCopy.sponsors;

  return (
    <PageShell
      eyebrow={t("nav.sponsors")}
      title={pick(sponsorsPage.title)}
      description={pick(sponsorsPage.intro)}
      meta={[
        {
          label: t("sponsors.metaRoutes"),
          value: sponsorEngagementRoutes.length,
        },
        {
          label: t("sponsors.metaTiers"),
          value: sponsorTiers.length,
        },
        {
          label: t("sponsors.metaDeliverables"),
          value: sponsorDeliverables.length,
        },
      ]}
      quickLinks={[
        { label: t("sponsors.quickPartners"), href: "#partner-lockups" },
        { label: t("sponsors.quickRoutes"), href: "#routes" },
        { label: t("sponsors.quickTiers"), href: "#tiers" },
        { label: t("sponsors.quickDeliverables"), href: "#deliverables" },
      ]}
      heroNote={t("sponsors.heroNote")}
      actions={
        <>
          <Button asChild>
            <Link to="/contact">
              {t("nav.contact")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/registration">{t("nav.registration")}</Link>
          </Button>
        </>
      }
      aside={
        <div className="space-y-4">
          <div className="panel-card-muted p-4">
            <p className="section-kicker">{pick(sponsorsPage.upcomingTitle)}</p>
            <p className="mt-3 text-sm leading-6 text-foreground/80">
              {pick(sponsorsPage.upcomingBody)}
            </p>
          </div>
          <div className="panel-card-muted p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("sponsors.outreachScopeLabel")}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {t("sponsors.outreachScopeBody")}
            </p>
          </div>
        </div>
      }
    >
      <section id="partner-lockups" className="anchor-target section-frame">
        <SectionHeading
          eyebrow={t("sponsors.partnerLockupsEyebrow")}
          title={t("sponsors.partnerLockupsTitle")}
          description={t("sponsors.partnerLockupsDescription")}
          actions={
            <Button asChild variant="outline">
              <Link to="/contact">
                {t("sponsors.ctaContactSponsor")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {partnerOrganizations.map((item) => (
            <article key={item.name} className="institution-lockup">
              <OrganizationLogo item={item} />
              <div>
                <p className="institution-role">
                  {item.meta ? pick(item.meta) : t("sponsors.partnerPlaceholderRole")}
                </p>
                <p className="institution-name mt-2">{item.name}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="routes" className="anchor-target section-frame mt-16">
        <SectionHeading
          eyebrow={t("sponsors.routesEyebrow")}
          title={t("sponsors.routesTitle")}
          description={t("sponsors.routesDescription")}
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sponsorEngagementRoutes.map((route, index) => {
            const Icon = routeIcons[index % routeIcons.length];

            return (
              <article key={route.goal.en} className="panel-card interactive-card p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-secondary text-vn-red">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-serif text-2xl font-semibold">{pick(route.goal)}</h2>
                <p className="mt-4 text-sm leading-7 text-foreground/78">
                  {pick(route.engagement)}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="tiers" className="anchor-target section-frame mt-16">
        <SectionHeading
          eyebrow={t("sponsors.tiersEyebrow")}
          title={t("sponsors.tiersTitle")}
          description={t("sponsors.tiersDescription")}
        />

        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {sponsorTiers.map((tier, index) => {
            const isHighlighted = index < 2;

            return (
              <article
                key={`tier-${index}`}
                className={
                  isHighlighted
                    ? "panel-card panel-card-strong p-7"
                    : "panel-card interactive-card p-7"
                }
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-serif text-3xl font-semibold leading-tight">
                    {pick(tier.name)}
                  </h2>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground/72">
                    {pick(tier.amount)}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-foreground/78">
                  {pick(tier.contributionModel)}
                </p>

                <ul className="mt-6 space-y-3 text-sm leading-7 text-foreground/80">
                  {tier.benefits.map((benefit) => (
                    <li key={`tier-${index}-${benefit.en}`} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>{pick(benefit)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="deliverables"
        className="anchor-target section-frame mt-16 grid gap-6 xl:grid-cols-[1.04fr_0.96fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("sponsors.deliverablesEyebrow")}
            title={t("sponsors.deliverablesTitle")}
            description={t("sponsors.deliverablesDescription")}
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {sponsorDeliverables.map((item) => (
              <article
                key={item.en}
                className="panel-card-muted interactive-card p-5 text-sm leading-7 text-foreground/78"
              >
                {pick(item)}
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card panel-card-strong p-7 sm:p-8">
          <p className="section-kicker">{t("sponsors.ctaEyebrow")}</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
            {t("sponsors.ctaTitle")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground/78">{t("sponsors.ctaBody")}</p>

          <div className="mt-7 grid gap-4">
            <div className="panel-card-muted p-5">
              <p className="font-medium text-foreground">{t("sponsors.ctaNextStepLabel")}</p>
              <p className="mt-3 text-sm leading-7 text-foreground/78">
                {t("sponsors.ctaNextStepBody")}
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            <Button asChild className="justify-between">
              <Link to="/contact">
                {t("sponsors.ctaContactSponsor")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-between">
              <Link to="/organizers">
                {t("sponsors.ctaReviewOrganizers")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
