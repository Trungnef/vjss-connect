import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { pageCopy, sponsorReference, sponsorTiers } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors | VJSS 2026" },
      {
        name: "description",
        content:
          "Reference sponsor wall and tier framework for the VJSS 2026 build.",
      },
      { property: "og:title", content: "Sponsors | VJSS 2026" },
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
      aside={
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vn-red">
              {pick(sponsorsPage.upcomingTitle)}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {pick(sponsorsPage.upcomingBody)}
            </p>
          </div>
          <span className="inline-flex rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {t("common.referenceOnly")}
          </span>
        </div>
      }
    >
      <section className="rounded-3xl border border-border/70 bg-card p-7">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-vn-red">
          {pick(sponsorReference.referenceTitle)}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sponsorReference.items.map((item) => (
            <article
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
                <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground/70">
                  {item.tier}
                </span>
                <h2 className="font-serif text-2xl font-semibold">{item.name}</h2>
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
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-4 lg:grid-cols-3">
        {sponsorTiers.map((tier) => (
          <article
            key={tier.name}
            className="rounded-3xl border border-border/70 bg-card p-6"
          >
            <h2 className="font-serif text-3xl font-semibold">{tier.name}</h2>
            <p className="mt-4 text-sm leading-7 text-foreground/80">
              {pick(tier.description)}
            </p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
