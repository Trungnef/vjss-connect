import { createFileRoute } from "@tanstack/react-router";
import { BookOpenText, Database, Landmark } from "lucide-react";

import { PageShell as SitePageShell } from "@/components/site/PageShell";
import { conferenceIdentity, pageCopy } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | VJSS 2026" },
      {
        name: "description",
        content:
          "Vision, mission, and Vietnam-Japan semiconductor collaboration framing for the VJSS 2026 build.",
      },
      { property: "og:title", content: "About | VJSS 2026" },
      {
        property: "og:description",
        content: "Academic framing, collaboration context, and strategic goals for the next VJSS edition.",
      },
    ],
  }),
  component: AboutPage,
});

const focusBlocks = [
  {
    id: "vision",
    icon: Landmark,
    titleKey: "visionTitle" as const,
    itemsKey: "vision" as const,
  },
  {
    id: "mission",
    icon: BookOpenText,
    titleKey: "missionTitle" as const,
    itemsKey: "mission" as const,
  },
  {
    id: "objectives",
    icon: Database,
    titleKey: "objectiveTitle" as const,
    itemsKey: "objectives" as const,
  },
];

function AboutPage() {
  const { pick, t } = useSiteLocale();
  const about = pageCopy.about;

  return (
    <SitePageShell
      eyebrow={t("nav.about")}
      title={pick(about.title)}
      description={pick(about.intro)}
      aside={
        <div className="space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-vn-red">
            {t("common.reference")}
          </p>
          <p className="text-sm leading-6 text-foreground/80">
            {pick(conferenceIdentity.referenceNote)}
          </p>
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              2025 baseline
            </p>
            <p className="mt-2 text-sm text-foreground/80">
              {conferenceIdentity.referenceEvent.date}
            </p>
            <p className="mt-1 text-sm text-foreground/80">
              {conferenceIdentity.referenceEvent.venue}
            </p>
          </div>
        </div>
      }
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {focusBlocks.map((block) => {
          const Icon = block.icon;

          return (
            <article
              key={block.id}
              className="soft-panel rounded-3xl border border-border/70 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-serif text-2xl font-semibold">
                  {pick(about[block.titleKey])}
                </h2>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/82">
                {about[block.itemsKey].map((item) => (
                  <li key={item.en} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-gold"
                    />
                    <span>{pick(item)}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-border/70 bg-card p-7">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-vn-red">
            Context
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold">
            {pick(about.contextTitle)}
          </h2>
          <p className="mt-5 text-sm leading-7 text-foreground/82">
            {pick(about.contextBody)}
          </p>
        </article>

        <article className="rounded-3xl border border-border/70 bg-secondary p-7">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-vn-red">
            Heritage
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold">
            {pick(about.heritageTitle)}
          </h2>
          <p className="mt-5 text-sm leading-7 text-foreground/82">
            {pick(about.heritageBody)}
          </p>
        </article>
      </section>
    </SitePageShell>
  );
}

export function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SitePageShell eyebrow={eyebrow} title={title}>
      {children}
    </SitePageShell>
  );
}
