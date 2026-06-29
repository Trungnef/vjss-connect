import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Users, Building2, Microscope, BookOpen } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { committeeGroups } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

// Group icons for visual identity
const groupIcons: Record<string, typeof Users> = {
  organizing: Building2,
  local: Users,
  scientific: Microscope,
  secretariat: BookOpen,
  themes: Microscope,
};

export const Route = createFileRoute("/committees")({
  head: () => ({
    meta: [
      { title: i18n.t("committees.metaTitle") },
      {
        name: "description",
        content: i18n.t("committees.metaDescription"),
      },
      { property: "og:title", content: i18n.t("committees.metaTitle") },
    ],
  }),
  component: CommitteesPage,
});

function CommitteesPage() {
  const { pick, t } = useSiteLocale();
  const totalMembers = committeeGroups.reduce(
    (count, group) => count + group.members.length,
    0,
  );

  return (
    <PageShell
      eyebrow={t("nav.committees")}
      title={t("nav.committees")}
      description={t("committees.committeesDescription")}
      className="space-y-0"
      quickLinks={[
        { label: t("committees.quickOrganizing"), href: "#organizing" },
        { label: t("committees.quickLocal"), href: "#local" },
        { label: t("committees.quickScientific"), href: "#scientific" },
        { label: t("committees.quickSecretariat"), href: "#secretariat" },
      ]}
      heroNote={t("committees.heroNote")}
      actions={
        <>
          <Button asChild className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/contact">
              {t("nav.contact")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/organizers">{t("nav.organizers")}</Link>
          </Button>
        </>
      }
    >
      <section className="space-y-6 sm:space-y-8">
        {committeeGroups
          .filter((group) => group.id !== "themes")
          .map((group) => {
            const Icon = groupIcons[group.id] || Users;
            return (
              <article
                key={group.id}
                id={group.id}
                className="anchor-target section-frame"
              >
                <SectionHeading
                  eyebrow={pick(group.title)}
                  description={group.description ? pick(group.description) : undefined}
                />

                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {group.members.map((member, idx) => (
                    <div
                      key={`${group.id}-${member.name}`}
                      className="panel-card interactive-card p-4 sm:p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-xs font-bold text-primary">
                          {member.name
                            .split(/[\s.]+/)
                            .filter((p) => p.length > 1)
                            .slice(-2)
                            .map((p) => p[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-serif text-base sm:text-lg font-semibold leading-tight text-foreground">
                            {member.name}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-vn-red/90">
                            {pick(member.role)}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground/80">
                            {pick(member.affiliation)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}

        {committeeGroups
          .filter((group) => group.id === "themes")
          .map((group) => (
            <article
              key={group.id}
              id="themes"
              className="anchor-target section-frame"
            >
              <SectionHeading
                eyebrow={t("committees.committeesEyebrow")}
                title={pick(group.title)}
                description={group.description ? pick(group.description) : undefined}
              />

              <div className="mt-6 grid gap-3">
                {group.members.map((member, idx) => (
                  <div
                    key={`themes-${member.name}`}
                    className="panel-card-muted p-4 sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-serif text-lg sm:text-xl font-semibold leading-tight">
                          {member.name}
                        </h3>
                        <p className="mt-1.5 text-sm font-medium text-vn-red/90">
                          {pick(member.role)}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/75">
                          {pick(member.affiliation)}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-medium text-muted-foreground/60 shrink-0">
                        {String(idx + 1).padStart(2, '0')}
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
