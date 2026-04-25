import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SessionStatus } from "@/content/site-content";

const statusStyles: Record<SessionStatus, string> = {
  draft: "border-amber-400/50 bg-amber-100 text-amber-900",
  updated: "border-semi-blue/40 bg-semi-blue/10 text-primary",
  final: "border-emerald-500/35 bg-emerald-50 text-emerald-900",
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: SessionStatus;
  label: string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]",
        statusStyles[status],
        className,
      )}
    >
      {label}
    </Badge>
  );
}
