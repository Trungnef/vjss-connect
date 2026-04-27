import type { ReactNode } from "react";

import type { SpeakerRecord } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";
import { cn } from "@/lib/utils";

const getInitials = (name: string) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export function SpeakerImage({
  speaker,
  className,
  imageClassName,
  children,
}: {
  speaker: SpeakerRecord;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}) {
  const { pick } = useSiteLocale();
  const hasVerifiedImage = speaker.imageStatus === "verified" && Boolean(speaker.image);

  return (
    <div
      className={cn("speaker-photo-frame", className)}
      data-asset-status={speaker.imageStatus ?? "pending"}
    >
      {hasVerifiedImage ? (
        <img
          src={speaker.image}
          alt={speaker.imageAlt ? pick(speaker.imageAlt) : speaker.name}
          className={imageClassName}
        />
      ) : (
        <div className="speaker-placeholder-avatar" role="img" aria-label={speaker.name}>
          {getInitials(speaker.name)}
        </div>
      )}
      {children}
    </div>
  );
}
