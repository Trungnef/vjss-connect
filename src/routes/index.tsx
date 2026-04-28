import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";

import i18n from "@/i18n";
import { OrganizationLogo } from "@/components/site/OrganizationLogo";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SpeakerImage } from "@/components/site/SpeakerImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  conferenceIdentity,
  ecosystemGroups,
  featuredSpeakerIds,
  homeHighlights,
  speakerKindLabels,
  speakers,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: i18n.t("home.metaTitle"),
      },
      {
        name: "description",
        content: i18n.t("home.metaDescription"),
      },
      {
        property: "og:title",
        content: i18n.t("home.metaTitle"),
      },
      {
        property: "og:description",
        content: i18n.t("home.metaDescription"),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { pick, t } = useSiteLocale();
  const featuredSpeakers = featuredSpeakerIds
    .map((speakerId) => speakers.find((speaker) => speaker.id === speakerId))
    .filter((speaker): speaker is (typeof speakers)[number] => Boolean(speaker));
  const featuredOrganizations = ecosystemGroups
    .flatMap((group) =>
      group.items.map((item) => ({
        item,
        role: group.title,
      })),
    )
    .slice(0, 6);

  return (
    <>
      <section className="page-hero border-b border-border/70 border-beam">
        <div className="site-shell grid gap-10 py-20 sm:py-24 lg:grid-cols-[minmax(0,1.04fr)_0.78fr] lg:items-center lg:py-28">
          <div className="max-w-5xl">
            <span className="signal-chip">{t("home.heroEyebrow")}</span>
            <h1 className="mt-7 max-w-5xl font-serif text-4xl font-semibold leading-[1.03] text-balance sm:text-5xl lg:text-[4.65rem]">
              {pick(conferenceIdentity.fullName)}
            </h1>
            <div className="editorial-rule mt-7 max-w-md" />
            <p className="mt-7 max-w-3xl text-lg leading-8 text-foreground/76 sm:text-xl">
              {pick(conferenceIdentity.tagline)}
            </p>

            <dl className="hero-meta-grid mt-10 max-w-4xl">
              <div className="hero-meta-card">
                <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  <CalendarDays className="h-4 w-4 text-gold" />
                  {t("dates.conference")}
                </dt>
                <dd className="mt-3 font-serif text-2xl font-semibold text-foreground">
                  {pick(conferenceIdentity.dates)}
                </dd>
              </div>
              <div className="hero-meta-card">
                <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  <MapPin className="h-4 w-4 text-vn-red" />
                  {t("nav.venue")}
                </dt>
                <dd className="mt-3 font-serif text-2xl font-semibold text-foreground">
                  {pick(conferenceIdentity.venue)}
                </dd>
              </div>
              <div className="hero-meta-card">
                <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-semi-blue" />
                  {t("home.heroFormatLabel")}
                </dt>
                <dd className="mt-3 text-sm font-semibold leading-6 text-foreground/80">
                  {pick(conferenceIdentity.format)}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-4 sm:gap-3">
              <Button asChild size="lg" className="flex-shrink-0">
                <Link to="/registration">
                  {t("home.heroCtaRegister")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-shrink-0">
                <Link to="/call-for-papers">
                  {t("home.heroCtaSubmit")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <aside className="panel-card panel-card-strong p-6 sm:p-7">
            <p className="section-kicker">{t("home.heroAsideEyebrow")}</p>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance">
              {t("home.heroAsideTitle")}
            </h2>
            <p className="mt-4 text-sm leading-7 text-foreground/76">{t("home.heroAsideBody")}</p>

            <div className="mt-7 grid gap-3">
              {featuredOrganizations.slice(0, 3).map(({ item, role }) => (
                <div key={`hero-org-${item.name}`} className="institution-lockup min-h-0">
                  <OrganizationLogo item={item} />
                  <div>
                    <p className="institution-role">{pick(role)}</p>
                    <p className="institution-name mt-2">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="highlights" className="site-shell anchor-target section-frame mt-20">
        <SectionHeading
          eyebrow={t("home.directionEyebrow")}
          title={t("home.directionTitle")}
          actions={
            <Button asChild variant="outline">
              <Link to="/about">
                {t("nav.about")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {homeHighlights.map((item, index) => (
            <article key={item.title.en} className="panel-card interactive-card p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-bold leading-none text-gold">0{index + 1}</span>
                <div className="h-1 w-6 rounded-full bg-gold flex-shrink-0" />
              </div>
              <h2 className="font-serif text-lg font-semibold leading-snug">
                {pick(item.title)}
              </h2>
              <p className="text-xs leading-6 text-foreground/72">{pick(item.body)}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="featured"
        className="site-shell anchor-target section-frame mt-20 grid gap-10 xl:grid-cols-[1.2fr_0.8fr]"
      >
        <article>
          <SectionHeading
            eyebrow={t("home.speakersCategory")}
            title={t("home.speakersTitle")}
            description={t("home.speakersSubtitle")}
            actions={
              <Button asChild variant="outline">
                <Link to="/speakers">
                  {t("home.viewAll")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          />

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {featuredSpeakers.map((speaker) => (
              <article key={speaker.id} className="panel-card interactive-card overflow-hidden space-y-4">
                <SpeakerImage speaker={speaker} className="h-48 border-b border-border/40">
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/32 to-transparent" />
                </SpeakerImage>
                <div className="px-5 pb-5 space-y-2">
                  <Badge
                    variant="outline"
                    className="border-gold/30 bg-gold/5 text-[9px] uppercase tracking-wider text-gold/80"
                  >
                    {pick(speakerKindLabels[speaker.kind])}
                  </Badge>
                  <h3 className="font-serif text-lg font-semibold leading-snug">
                    {speaker.name}
                  </h3>
                  <p className="text-xs font-medium text-foreground/70">
                    {pick(speaker.role)}
                  </p>
                  <p className="text-xs leading-5 text-foreground/60">
                    {pick(speaker.organization)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel-card panel-card-strong p-6 sm:p-7">
          <SectionHeading
            eyebrow={t("home.partnersCategory")}
            title={t("home.sponsorsTitle")}
            description={t("home.sponsorsSubtitle")}
            actions={
              <Button asChild variant="outline">
                <Link to="/organizers">
                  {t("nav.organizers")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            }
          />

          <div className="mt-8 space-y-3">
            {featuredOrganizations.map(({ item, role }) => (
              <div key={`featured-org-${item.name}`} className="institution-lockup min-h-0 space-y-1.5">
                <OrganizationLogo item={item} />
                <div className="space-y-0.5" >
                  <p className="institution-role text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{pick(role)}</p>
                  <p className="institution-name text-sm font-semibold text-foreground">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
