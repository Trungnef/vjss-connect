import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Users, ExternalLink, Handshake } from "lucide-react";

import i18n from "@/i18n";
import { OrganizationLogo } from "@/components/site/OrganizationLogo";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { ecosystemGroups, pageCopy } from "@/content/site-content";
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

// Group icons
const groupIcons = {
  hosts: Building2,
  patrons: Handshake,
};

// Group colors
const groupColors = {
  hosts: "bg-primary/10 text-primary",
  patrons: "bg-gold/10 text-gold",
};

function OrganizersPage() {
  const { pick, t } = useSiteLocale();
  const organizersPage = pageCopy.organizers;
  const totalOrganizations = ecosystemGroups.reduce(
    (count, group) => count + group.items.length,
    0,
  );

  return (
    <PageShell
      eyebrow={t("nav.organizers")}
      title={pick(organizersPage.title)}
      description={pick(organizersPage.intro)}
      quickLinks={[
        { label: t("organizers.quickHosts"), href: "#hosts" },
        { label: t("organizers.quickPatrons"), href: "#patrons" },
      ]}
      heroNote={t("organizers.heroNote")}
      actions={
        <>
          <Button asChild className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/committees">
              {t("nav.committees")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/sponsors">{t("nav.sponsors")}</Link>
          </Button>
        </>
      }
    >
      {/* Organizations Overview */}
      {ecosystemGroups.map((group) => {
        const Icon = groupIcons[group.id as keyof typeof groupIcons] || Building2;
        const colorClass = groupColors[group.id as keyof typeof groupColors] || "bg-primary/10 text-primary";
        
        return (
          <section 
            key={group.id} 
            id={group.id} 
            className={`anchor-target section-frame ${group.id !== 'hosts' ? 'mt-12 sm:mt-16' : ''} p-5 sm:p-7`}
          >
            <SectionHeading
              eyebrow={t(`organizers.${group.id}Eyebrow`)}
            />

            <div className={`mt-8 grid gap-5 ${group.items.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}`}>
              {group.items.map((item, index) => (
                <article 
                  key={item.name} 
                  className="group panel-card interactive-card p-6 sm:p-7 flex flex-col"
                >
                  {/* Logo Container */}
                  <div className="relative h-32 sm:h-40 flex items-center justify-center rounded-xl bg-white border border-border/50 mb-6 overflow-hidden p-4 sm:p-6">
                    <OrganizationLogo 
                      item={item} 
                      className="institution-logo-lg max-h-24 sm:max-h-28 w-auto object-contain"
                    />
                  </div>

                  {/* Role Badge */}
                  {item.meta && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md ${colorClass}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {pick(item.meta)}
                      </span>
                    </div>
                  )}

                  {/* Name */}
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-tight text-foreground">
                    {item.name}
                  </h3>

                  {/* Website Link */}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      {t("common.visitWebsite")}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        );
      })}

    </PageShell>
  );
}
