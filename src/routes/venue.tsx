import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Compass, Hotel, MapPinned } from "lucide-react";

import i18n from "@/i18n";
import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  conferenceIdentity,
  pageCopy,
  venueDirections,
  venueHotels,
  venueReference,
  venueVisitorNotes,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/venue")({
  head: () => ({
    meta: [
      { title: i18n.t("venue.metaTitle") },
      {
        name: "description",
        content: i18n.t("venue.metaDescription"),
      },
      { property: "og:title", content: i18n.t("venue.metaTitle") },
      {
        property: "og:description",
        content: i18n.t("venue.metaDescription"),
      },
    ],
  }),
  component: VenuePage,
});

const directionIcons = [MapPinned, Compass, Building2] as const;

function VenuePage() {
  const { pick, t } = useSiteLocale();
  const venuePage = pageCopy.venue;

  return (
    <PageShell
      eyebrow={t("nav.venue")}
      title={pick(venuePage.title)}
      description={pick(venuePage.intro)}
      quickLinks={[
        { label: t("venue.quickReference"), href: "#reference" },
        { label: t("venue.quickFlow"), href: "#visitor-flow" },
        { label: t("venue.quickShortlist"), href: "#shortlist" },
      ]}
      heroNote={t("venue.heroNote")}
      actions={
        <>
          <Button asChild className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/registration">
              {t("nav.registration")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em]">
            <Link to="/contact">{t("nav.contact")}</Link>
          </Button>
        </>
      }
      aside={
        <div className="space-y-4">
          <div className="panel-card-muted p-4">
            <p className="section-kicker">{pick(venuePage.nextTitle)}</p>
            <p className="mt-3 text-sm leading-6 text-foreground/80">{pick(venuePage.nextBody)}</p>
          </div>
          <div className="panel-card-muted p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {t("common.format")}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {pick(conferenceIdentity.format)}
            </p>
          </div>
        </div>
      }
    >
      <section
        id="reference"
        className="anchor-target section-frame p-5 sm:p-7 grid gap-5 sm:gap-6 xl:grid-cols-[1.1fr_0.9fr]"
      >
        <article className="panel-card panel-card-strong p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-vn-red/[0.03] via-transparent to-gold/[0.03] pointer-events-none" />
          
          {/* Header with icon and title */}
          <div className="relative flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-vn-red/15 to-vn-red/5 text-vn-red shadow-sm">
                <MapPinned className="h-7 w-7" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {t("venue.hostCity")}
                </p>
                <h2 className="mt-1.5 font-serif text-xl font-semibold leading-tight sm:text-3xl lg:text-[2.75rem]">
                  Hanoi, Vietnam
                </h2>
              </div>
            </div>
            
            <Button asChild variant="outline" className="rounded-none uppercase tracking-[0.14em] w-fit">
              <a href={venueReference.mapLink} target="_blank" rel="noreferrer">
                {t("common.openMap")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="relative mt-8 rounded-2xl border border-border/70 bg-background/80 p-6 text-sm leading-6 text-foreground/90">
            <p className="font-semibold text-sm text-foreground">Note</p>
            <p className="mt-3">
              The official venue will be announced at a later date.
            </p>
          </div>

          {/* Address bar */}
          {/* <div className="relative mt-6 rounded-xl border border-border/60 bg-background/60 px-5 py-4">
            <div className="flex items-start gap-3">
              <Compass className="h-4 w-4 mt-0.5 text-muted-foreground/70 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  {t("venue.referenceAddress")}
                </p>
                <p className="text-sm leading-6 text-foreground/80">
                  {pick(venueReference.address)}
                </p>
              </div>
            </div>
          </div> */}
        </article>

        {/* Map card */}
        <div className="panel-card overflow-hidden p-2.5 shadow-sm">
          <div className="overflow-hidden rounded-[1.25rem] border border-border/50">
            <iframe
              src={venueReference.mapEmbed}
              title={t("venue.mapTitle")}
              className="h-[30rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </PageShell>
  );
}
