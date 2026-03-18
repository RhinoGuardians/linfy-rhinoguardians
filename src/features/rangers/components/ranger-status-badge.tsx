import { cn } from "@/lib/utils";
import type { RangerUnit } from "@/types";

interface RangerStatusBadgeProps {
  kind: "status" | "communication";
  value: RangerUnit["status"] | RangerUnit["communicationStatus"];
}

export function RangerStatusBadge({ kind, value }: RangerStatusBadgeProps) {
  const tone =
    kind === "status"
      ? value === "deployed"
        ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
        : value === "online"
          ? "border-status-success/25 bg-status-success/10 text-status-success"
          : value === "standby"
            ? "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary"
            : "border-border-subtle/80 bg-canvas/45 text-text-muted"
      : value === "connected"
        ? "border-status-success/25 bg-status-success/10 text-status-success"
        : value === "intermittent"
          ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
          : "border-status-danger/25 bg-status-danger/10 text-status-danger";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
        tone,
      )}
    >
      {value}
    </span>
  );
}
