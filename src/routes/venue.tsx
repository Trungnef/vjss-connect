import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import {
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
      { title: "Venue | VJSS 2026" },
      {
        name: "description",
        content:
          "Reference venue, map, transport notes, and visitor guidance for the VJSS 2026 build.",
      },
      { property: "og:title", content: "Venue | VJSS 2026" },
      {
        property: "og:description",
        content:
          "Reference venue model, travel guidance, and useful notes for Vietnam, Japan, and international guests.",
      },
    ],
  }),
  component: VenuePage,
});

function VenuePage() {
  const { pick, t } = useSiteLocale();
  const venuePage = pageCopy.venue;

  return (
    <PageShell
      eyebrow={t("nav.venue")}
      title={pick(venuePage.title)}
      description={pick(venuePage.intro)}
      aside={
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-vn-red">
              {pick(venuePage.nextTitle)}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/80">
              {pick(venuePage.nextBody)}
            </p>
          </div>
          <span className="inline-flex rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {t("common.referenceOnly")}
          </span>
        </div>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.05fr]">
        <article className="rounded-3xl border border-border/70 bg-card p-7">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-vn-red">
            {pick(venuePage.referenceTitle)}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold">
            {venueReference.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-foreground/82">
            {pick(venuePage.referenceBody)}
          </p>
          <div className="mt-6 rounded-2xl bg-secondary p-4 text-sm leading-6 text-foreground/80">
            <p className="font-medium">{venueReference.address}</p>
            <p className="mt-2">{pick(venueReference.description)}</p>
          </div>
          <a
            href={venueReference.mapLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-sm font-medium text-primary"
          >
            {t("common.openMap")}
          </a>
        </article>

        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card">
          <iframe
            src={venueReference.mapEmbed}
            title="Reference venue map"
            className="h-[26rem] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="mt-14">
        <div className="grid gap-4 lg:grid-cols-3">
          {venueDirections.map((item) => (
            <article
              key={item.title.en}
              className="rounded-3xl border border-border/70 bg-card p-6"
            >
              <p className="font-serif text-2xl font-semibold">
                {pick(item.title)}
              </p>
              <p className="mt-4 text-sm leading-7 text-foreground/80">
                {pick(item.body)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-border/70 bg-card p-7">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-vn-red">
            Nearby stays
          </p>
          <div className="mt-5 grid gap-4">
            {venueHotels.map((hotel) => (
              <div
                key={hotel.area}
                className="rounded-2xl border border-border/70 bg-background p-4"
              >
                <h2 className="font-serif text-2xl font-semibold">{hotel.area}</h2>
                <p className="mt-2 text-sm leading-7 text-foreground/80">
                  {pick(hotel.description)}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-border/70 bg-secondary p-7">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-vn-red">
            Visitor notes
          </p>
          <div className="mt-5 grid gap-4">
            {venueVisitorNotes.map((note) => (
              <div
                key={note.audience.en}
                className="rounded-2xl border border-border/60 bg-card p-4"
              >
                <h2 className="font-serif text-2xl font-semibold">
                  {pick(note.audience)}
                </h2>
                <p className="mt-2 text-sm leading-7 text-foreground/80">
                  {pick(note.note)}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </PageShell>
  );
}
