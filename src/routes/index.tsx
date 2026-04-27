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
        <div className="site-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.04fr)_0.78fr] lg:items-center lg:py-24">
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

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/registration">
                  {t("home.heroCtaRegister")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
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

      <section id="highlights" className="site-shell anchor-target section-frame mt-14">
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

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {homeHighlights.map((item, index) => (
            <article key={item.title.en} className="panel-card interactive-card p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="section-kicker">{`0${index + 1}`}</span>
                <span className="h-8 w-8 rounded-full bg-[linear-gradient(180deg,var(--gold),color-mix(in_oklab,var(--gold)_65%,white))]" />
              </div>
              <h2 className="mt-5 font-serif text-2xl font-semibold leading-tight">
                {pick(item.title)}
              </h2>
              <p className="mt-4 text-sm leading-7 text-foreground/76">{pick(item.body)}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="featured"
        className="site-shell anchor-target section-frame mt-14 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]"
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

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {featuredSpeakers.map((speaker) => (
              <article key={speaker.id} className="panel-card interactive-card overflow-hidden">
                <SpeakerImage speaker={speaker} className="h-52 border-b border-border/70">
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/38 to-transparent" />
                </SpeakerImage>
                <div className="p-5">
                  <Badge
                    variant="outline"
                    className="w-fit border-gold/40 bg-background/70 text-[10px] uppercase tracking-[0.18em] text-foreground/70"
                  >
                    {pick(speakerKindLabels[speaker.kind])}
                  </Badge>
                  <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight">
                    {speaker.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-foreground/80">
                    {pick(speaker.role)}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
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

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {featuredOrganizations.map(({ item, role }) => (
              <div key={`featured-org-${item.name}`} className="institution-lockup min-h-0">
                <OrganizationLogo item={item} />
                <div>
                  <p className="institution-role">{pick(role)}</p>
                  <p className="institution-name mt-2">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
