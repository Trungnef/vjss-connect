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
import type { SpeakerRecord } from "@/content/site-content";

export function SpeakerDialog({
  speaker,
  trigger,
}: {
  speaker: SpeakerRecord;
  trigger: ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl border-border/70 bg-card p-0">
        <div className="grid gap-0 md:grid-cols-[15rem_minmax(0,1fr)]">
          <div className="border-b border-border/70 bg-secondary md:border-b-0 md:border-r">
            <img
              src={speaker.image}
              alt={speaker.name}
              className="h-72 w-full object-cover md:h-full"
            />
          </div>

          <div className="p-6 md:p-8">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl leading-tight">
                {speaker.name}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm leading-6 text-foreground/75">
                {speaker.role}
                <br />
                {speaker.organization}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4 text-sm leading-7 text-foreground/85">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  {t("common.topic")}
                </p>
                <p className="mt-2 font-serif text-lg text-foreground">
                  {speaker.topic}
                </p>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  {t("common.summary")}
                </p>
                <p className="mt-2">{speaker.summary}</p>
              </div>

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  {t("common.profile")}
                </p>
                <p className="mt-2">{speaker.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
