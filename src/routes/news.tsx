import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BellRing, CalendarRange, Newspaper } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatusBadge } from "@/components/site/StatusBadge";
import { Button } from "@/components/ui/button";
import { newsItems, pageCopy } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: i18n.t("news.metaTitle") },
      {
        name: "description",
        content: i18n.t("news.metaDescription"),
      },
      { property: "og:title", content: i18n.t("news.metaTitle") },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { pick, t } = useSiteLocale();
  const newsPage = pageCopy.news;
  const featuredItem = newsItems[0];
  const remainingItems = newsItems.slice(1);
  const draftCount = newsItems.filter((item) => item.status === "draft").length;
  const updatedCount = newsItems.filter((item) => item.status === "updated").length;
  const finalCount = newsItems.filter((item) => item.status === "final").length;

  return (
    <PageShell
      eyebrow={t("nav.news")}
      title={pick(newsPage.title)}
      description={pick(newsPage.intro)}
      meta={[
        {
          label: t("news.metaPublished"),
          value: newsItems.length,
        },
        {
          label: t("news.metaUpdated"),
          value: updatedCount,
        },
        {
          label: t("news.metaDraft"),
          value: draftCount,
        },
      ]}
      quickLinks={[
        { label: t("news.quickFeatured"), href: "#featured" },
        { label: t("news.quickTimeline"), href: "#timeline" },
      ]}
      heroNote={t("news.heroNote")}
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
            <p className="section-kicker">{t("news.overviewEyebrow")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge status="updated" label={`${updatedCount} ${t("news.updatedLabel")}`} />
              <StatusBadge status="draft" label={`${draftCount} ${t("news.draftLabel")}`} />
              {finalCount > 0 ? (
                <StatusBadge status="final" label={`${finalCount} ${t("status.final")}`} />
              ) : null}
            </div>
          </div>
          <div className="panel-card-muted p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("news.cadenceLabel")}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">{t("news.cadenceBody")}</p>
          </div>
        </div>
      }
    >
      <section
        id="featured"
        className="anchor-target section-frame grid gap-6 xl:grid-cols-[1.08fr_0.92fr]"
      >
        <article className="panel-card panel-card-strong p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={featuredItem.status} label={t(`status.${featuredItem.status}`)} />
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground/72">
              {pick(featuredItem.date)}
            </span>
          </div>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-[2.8rem]">
            {pick(featuredItem.title)}
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/78">{pick(featuredItem.body)}</p>
        </article>

        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("news.statusEyebrow")}
            title={t("news.statusTitle")}
            description={t("news.statusDescription")}
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="panel-card-muted p-5">
              <div className="flex items-center gap-3">
                <BellRing className="h-5 w-5 text-vn-red" />
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  {t("news.updatedLabel")}
                </p>
              </div>
              <p className="mt-4 font-serif text-4xl font-semibold text-primary">{updatedCount}</p>
            </div>
            <div className="panel-card-muted p-5">
              <div className="flex items-center gap-3">
                <Newspaper className="h-5 w-5 text-semi-blue" />
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  {t("news.draftLabel")}
                </p>
              </div>
              <p className="mt-4 font-serif text-4xl font-semibold text-primary">{draftCount}</p>
            </div>
            <div className="panel-card-muted p-5">
              <div className="flex items-center gap-3">
                <CalendarRange className="h-5 w-5 text-jp-indigo" />
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  {t("news.itemsLabel")}
                </p>
              </div>
              <p className="mt-4 font-serif text-4xl font-semibold text-primary">
                {newsItems.length}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section id="timeline" className="anchor-target section-frame mt-16">
        <SectionHeading
          eyebrow={t("news.timelineEyebrow")}
          title={t("news.timelineTitle")}
          description={t("news.timelineDescription")}
        />

        <ol className="mt-8 grid gap-4">
          {remainingItems.map((item) => (
            <li key={`${item.title.en}-${item.status}`} className="timeline-rail">
              <span className="timeline-node" aria-hidden />
              <article className="panel-card interactive-card p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={item.status} label={t(`status.${item.status}`)} />
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {pick(item.date)}
                  </span>
                </div>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                  {pick(item.title)}
                </h2>
                <p className="mt-4 text-sm leading-7 text-foreground/78">{pick(item.body)}</p>
              </article>
            </li>
          ))}
        </ol>

        {remainingItems.length > 0 ? (
          <div className="mt-8 rounded-[0.85rem] border border-border/70 bg-[linear-gradient(125deg,color-mix(in_oklab,var(--navy)_94%,var(--foreground)),color-mix(in_oklab,var(--navy)_84%,var(--jp-indigo)))] px-6 py-8 text-primary-foreground sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="section-kicker text-gold/90">{t("news.stayAlignedEyebrow")}</p>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                  {t("news.stayAlignedTitle")}
                </h2>
                <p className="mt-4 text-sm leading-7 text-primary-foreground/76">
                  {t("news.stayAlignedBody")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-white/16 bg-white/8 text-white hover:bg-white/14 hover:text-white"
                >
                  <Link to="/call-for-papers">{t("nav.cfp")}</Link>
                </Button>
                <Button asChild className="bg-background text-foreground hover:bg-background/95">
                  <Link to="/contact">
                    {t("nav.contact")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </PageShell>
  );
}
