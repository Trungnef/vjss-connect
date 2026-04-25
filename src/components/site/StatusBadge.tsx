import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SessionStatus } from "@/content/site-content";

const statusStyles: Record<SessionStatus, string> = {
  draft:
    "border-amber-400/40 bg-amber-100/90 text-amber-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
  updated:
    "border-semi-blue/35 bg-semi-blue/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]",
  final:
    "border-emerald-500/30 bg-emerald-50 text-emerald-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
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
        "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em]",
        statusStyles[status],
        className,
      )}
    >
      {label}
    </Badge>
  );
}
