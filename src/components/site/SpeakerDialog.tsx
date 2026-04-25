import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  speakerCountryLabels,
  speakerKindLabels,
  type SpeakerRecord,
} from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";

export function SpeakerDialog({
  speaker,
  trigger,
}: {
  speaker: SpeakerRecord;
  trigger: ReactNode;
}) {
  const { t } = useTranslation();
  const { pick } = useSiteLocale();

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl overflow-hidden border-border/70 bg-card p-0">
        <div className="grid gap-0 md:grid-cols-[17rem_minmax(0,1fr)]">
          <div className="relative border-b border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--semi-blue)_14%,white),color-mix(in_oklab,var(--navy)_82%,black))] md:border-b-0 md:border-r">
            <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/16 bg-black/18 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/92 backdrop-blur">
                {pick(speakerKindLabels[speaker.kind])}
              </span>
              <span className="rounded-full border border-white/16 bg-black/18 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/92 backdrop-blur">
                {pick(speakerCountryLabels[speaker.country])}
              </span>
            </div>
            <img
              src={speaker.image}
              alt={speaker.name}
              className="h-72 w-full object-cover md:h-full"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent md:hidden" />
          </div>

          <div className="bg-[linear-gradient(180deg,color-mix(in_oklab,white_94%,var(--background)),color-mix(in_oklab,white_82%,var(--background)))] p-6 md:p-8">
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl leading-tight md:text-[2.2rem]">
                {speaker.name}
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-6 text-foreground/75">
                {pick(speaker.role)}
                <br />
                {pick(speaker.organization)}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-7 grid gap-4 text-sm leading-7 text-foreground/85">
              <div className="panel-card-muted p-5">
                <p className="section-kicker text-muted-foreground">{t("common.topic")}</p>
                <p className="mt-3 font-serif text-xl text-foreground">{pick(speaker.topic)}</p>
              </div>

              <div className="panel-card-muted p-5">
                <p className="section-kicker text-muted-foreground">{t("common.summary")}</p>
                <p className="mt-3">{pick(speaker.summary)}</p>
              </div>

              <div className="panel-card-muted p-5">
                <p className="section-kicker text-muted-foreground">{t("common.profile")}</p>
                <p className="mt-3">{pick(speaker.bio)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
