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
      meta={[
        {
          label: t("venue.metaReferenceVenue"),
          value: pick(venueReference.name),
        },
        {
          label: t("venue.metaVenueOptions"),
          value: venueHotels.length,
        },
        {
          label: t("venue.metaEventMode"),
          value: t("venue.metaEventModeValue"),
          detail: pick(conferenceIdentity.format),
        },
      ]}
      quickLinks={[
        { label: t("venue.quickReference"), href: "#reference" },
        { label: t("venue.quickFlow"), href: "#visitor-flow" },
        { label: t("venue.quickShortlist"), href: "#shortlist" },
      ]}
      heroNote={t("venue.heroNote")}
      actions={
        <>
          <Button asChild>
            <Link to="/registration">
              {t("nav.registration")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
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
        className="anchor-target section-frame grid gap-6 xl:grid-cols-[1.02fr_0.98fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={pick(venuePage.referenceTitle)}
            title={pick(venueReference.name)}
            description={pick(venuePage.referenceBody)}
            actions={
              <Button asChild variant="outline">
                <a href={venueReference.mapLink} target="_blank" rel="noreferrer">
                  {t("common.openMap")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            }
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="panel-card-muted p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("venue.referenceAddress")}
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/78">
                {pick(venueReference.address)}
              </p>
            </div>
            <div className="panel-card-muted p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("common.hostCity")}
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/78">
                {pick(conferenceIdentity.venue)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.6rem] border border-border/70 bg-secondary p-5 text-sm leading-7 text-foreground/78">
            {pick(venueReference.description)}
          </div>
        </article>

        <div className="panel-card overflow-hidden p-2">
          <div className="overflow-hidden rounded-[1.6rem] border border-border/70">
            <iframe
              src={venueReference.mapEmbed}
              title={t("venue.mapTitle")}
              className="h-[28rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section id="visitor-flow" className="anchor-target section-frame mt-16">
        <SectionHeading
          eyebrow={t("venue.visitorFlowEyebrow")}
          title={t("venue.visitorFlowTitle")}
          description={t("venue.visitorFlowDescription")}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {venueDirections.map((item, index) => {
            const Icon = directionIcons[index % directionIcons.length];

            return (
              <article key={item.title.en} className="panel-card interactive-card p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-secondary text-vn-red">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-serif text-2xl font-semibold">{pick(item.title)}</h2>
                <p className="mt-4 text-sm leading-7 text-foreground/78">{pick(item.body)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="shortlist"
        className="anchor-target section-frame mt-16 grid gap-6 xl:grid-cols-[1fr_0.94fr]"
      >
        <article className="panel-card p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("venue.shortlistEyebrow")}
            title={t("venue.shortlistTitle")}
            description={t("venue.shortlistDescription")}
          />

          <div className="mt-8 grid gap-4">
            {venueHotels.map((option, index) => (
              <article
                key={option.area}
                className={
                  index === 0
                    ? "panel-card panel-card-strong p-6"
                    : "panel-card-muted interactive-card p-6"
                }
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-serif text-2xl font-semibold">{pick(option.area)}</h2>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-foreground/72">
                    {t("venue.candidateLabel", { number: index + 1 })}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-foreground/78">
                  {pick(option.description)}
                </p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card panel-card-strong p-7 sm:p-8">
          <SectionHeading
            eyebrow={t("venue.planningEyebrow")}
            title={t("venue.planningTitle")}
            description={t("venue.planningDescription")}
          />

          <ol className="mt-8 grid gap-4">
            {venueVisitorNotes.map((note) => (
              <li key={note.audience.en} className="timeline-rail">
                <span className="timeline-node" aria-hidden />
                <div className="rounded-[1.6rem] border border-border/70 bg-white/74 p-5">
                  <h2 className="font-serif text-2xl font-semibold">{pick(note.audience)}</h2>
                  <p className="mt-3 text-sm leading-7 text-foreground/78">{pick(note.note)}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-7 grid gap-3">
            <Button asChild className="justify-between">
              <Link to="/registration">
                {t("venue.ctaReviewRegistration")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-between">
              <Link to="/contact">
                {t("venue.ctaAskLogistics")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
