import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import i18n from "@/i18n";
import { OrganizationLogo } from "@/components/site/OrganizationLogo";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { committeeGroups, ecosystemGroups, pageCopy } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/organizers")({
  head: () => ({
    meta: [
      { title: i18n.t("organizers.metaTitle") },
      {
        name: "description",
        content: i18n.t("organizers.metaDescription"),
      },
      { property: "og:title", content: i18n.t("organizers.metaTitle") },
    ],
  }),
  component: OrganizersPage,
});

function OrganizersPage() {
  const { pick, t } = useSiteLocale();
  const organizersPage = pageCopy.organizers;
  const committeeMembers = committeeGroups.reduce(
    (count, group) => count + group.members.length,
    0,
  );

  return (
    <PageShell
      eyebrow={t("nav.organizers")}
      title={pick(organizersPage.title)}
      description={pick(organizersPage.intro)}
      meta={[
        {
          label: t("organizers.metaEcosystemGroups"),
          value: ecosystemGroups.length,
        },
        {
          label: t("organizers.metaCommitteeGroups"),
          value: committeeGroups.length,
        },
        {
          label: t("organizers.metaNamedMembers"),
          value: committeeMembers,
        },
      ]}
      quickLinks={[
        { label: t("organizers.quickInstitutionalMap"), href: "#institutional-map" },
        { label: t("organizers.quickEcosystem"), href: "#ecosystem" },
        { label: t("organizers.quickCommittees"), href: "#committees" },
      ]}
      heroNote={t("organizers.heroNote")}
      actions={
        <>
          <Button asChild>
            <Link to="/contact">
              {t("nav.contact")}
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
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vn-red">
              {t("organizers.governanceNote")}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {pick(organizersPage.partnerPlaceholderBody)}
            </p>
          </div>
          <div className="panel-card-muted p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("organizers.governanceStructureLabel")}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {t("organizers.governanceStructureBody")}
            </p>
          </div>
        </div>
      }
    >
      <section id="institutional-map" className="anchor-target section-frame">
        <SectionHeading
          eyebrow={t("organizers.institutionalMapEyebrow")}
          title={t("organizers.institutionalMapTitle")}
          description={t("organizers.institutionalMapDescription")}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {ecosystemGroups.map((group) => (
            <article key={group.id} className="panel-card p-5">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-serif text-2xl font-semibold leading-tight">
                  {pick(group.title)}
                </h2>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {group.items.length}
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {group.items.map((item) => (
                  <div key={`lockup-${group.id}-${item.name}`} className="institution-lockup">
                    <OrganizationLogo item={item} />
                    <div>
                      {item.meta ? <p className="institution-role">{pick(item.meta)}</p> : null}
                      <p className="institution-name mt-2">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="anchor-target section-frame mt-16 space-y-8">
        <SectionHeading
          eyebrow={t("organizers.ecosystemEyebrow")}
          title={t("organizers.ecosystemTitle")}
          description={t("organizers.ecosystemDescription")}
        />

        {ecosystemGroups.map((group) => (
          <article key={group.id} className="panel-card p-7">
            <h2 className="font-serif text-3xl font-semibold">{pick(group.title)}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => (
                <div key={item.name} className="panel-card-muted interactive-card p-5">
                  <OrganizationLogo item={item} />
                  {item.meta ? (
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-vn-red">
                      {pick(item.meta)}
                    </p>
                  ) : null}
                  <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/80">
                    {pick(item.description)}
                  </p>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-medium text-primary"
                    >
                      {t("common.website")}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section id="committees" className="anchor-target section-frame mt-14 space-y-8">
        <SectionHeading
          eyebrow={t("organizers.committeesEyebrow")}
          title={t("organizers.committeesTitle")}
          description={t("organizers.committeesDescription")}
        />

        {committeeGroups.map((group) => (
          <article key={group.id} className="panel-card p-7">
            <h2 className="font-serif text-3xl font-semibold">{pick(group.title)}</h2>
            {group.description ? (
              <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/80">
                {pick(group.description)}
              </p>
            ) : null}

            <div className="mt-6 grid gap-4">
              {group.members.map((member) => (
                <div
                  key={`${group.id}-${member.name}`}
                  className="panel-card-muted interactive-card p-5"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-semibold leading-tight">
                        {member.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-foreground/78">
                        {pick(member.role)}
                      </p>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">
                        {pick(member.affiliation)}
                      </p>
                    </div>
                    <span className="inline-flex w-fit rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground/70">
                      {pick(member.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
