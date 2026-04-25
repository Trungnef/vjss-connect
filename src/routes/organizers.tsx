import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { ecosystemGroups, pageCopy } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/organizers")({
  head: () => ({
    meta: [
      { title: "Organizers | VJSS 2026" },
      {
        name: "description",
        content:
          "Reference ecosystem groups for organizers, co-organizers, partners, and patrons in the VJSS 2026 build.",
      },
      { property: "og:title", content: "Organizers | VJSS 2026" },
    ],
  }),
  component: OrganizersPage,
});

function OrganizersPage() {
  const { pick, t } = useSiteLocale();
  const organizersPage = pageCopy.organizers;

  return (
    <PageShell
      eyebrow={t("nav.organizers")}
      title={pick(organizersPage.title)}
      description={pick(organizersPage.intro)}
      aside={
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vn-red">
              CMS note
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              Each organization is now modeled as its own record with name,
              description, logo, and link fields.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {pick(organizersPage.partnerPlaceholderTitle)}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {pick(organizersPage.partnerPlaceholderBody)}
            </p>
          </div>
        </div>
      }
    >
      <section className="space-y-8">
        {ecosystemGroups.map((group) => (
          <article key={group.id} className="rounded-3xl border border-border/70 bg-card p-7">
            <h2 className="font-serif text-3xl font-semibold">
              {pick(group.title)}
            </h2>

            {group.items.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="overflow-hidden rounded-3xl border border-border/70 bg-background"
                  >
                    <div className="flex h-40 items-center justify-center border-b border-border/70 bg-white p-6">
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="space-y-3 p-5">
                      <h3 className="font-serif text-2xl font-semibold leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm leading-7 text-foreground/80">
                        {pick(item.description)}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex text-sm font-medium text-primary"
                        >
                          {t("common.website")}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-border/80 bg-secondary p-6">
                <p className="font-serif text-2xl font-semibold">
                  {pick(organizersPage.partnerPlaceholderTitle)}
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground/80">
                  {pick(organizersPage.partnerPlaceholderBody)}
                </p>
              </div>
            )}
          </article>
        ))}
      </section>
    </PageShell>
  );
}
