import type { OrganizationItem } from "@/content/site-content";
import { useSiteLocale } from "@/hooks/use-site-locale";
import { cn } from "@/lib/utils";

const getInstitutionMark = (name: string) => {
  const acronym = name.match(/\(([^)]+)\)/)?.[1];

  if (acronym && acronym.length <= 6) {
    return acronym;
  }

  if (/^[A-Z0-9]{2,6}$/.test(name.trim())) {
    return name.trim();
  }

  return name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((part) => !["and", "of", "in", "the"].includes(part.toLowerCase()))
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

export function OrganizationLogo({
  item,
  className,
}: {
  item: OrganizationItem;
  className?: string;
}) {
  const { pick } = useSiteLocale();
  const status = item.assetStatus ?? (item.logo ? "verified" : "pending");

  if (item.logo) {
    return (
      <div className={cn("institution-logo", className)} data-asset-status={status}>
        <img src={item.logo} alt={item.logoAlt ? pick(item.logoAlt) : item.name} />
      </div>
    );
  }

  return (
    <div
      className={cn("pending-logo", className)}
      data-asset-status={status}
      role="img"
      aria-label={item.name}
    >
      {getInstitutionMark(item.name)}
    </div>
  );
}
