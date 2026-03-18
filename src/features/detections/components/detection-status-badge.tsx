import type { EventSeverity, EventStatus, EventType } from "@/types";
import {
  getEventTypeLabel,
  getSeverityClasses,
} from "@/features/dashboard/utils/event-styles";
import { cn } from "@/lib/utils";

interface DetectionStatusBadgeProps {
  kind: "severity" | "status" | "type";
  value: EventSeverity | EventStatus | EventType;
}

export function DetectionStatusBadge({
  kind,
  value,
}: DetectionStatusBadgeProps) {
  if (kind === "severity") {
    const classes = getSeverityClasses(value as EventSeverity);

    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
          classes.badge,
        )}
      >
        {value}
      </span>
    );
  }

  if (kind === "type") {
    const tone =
      value === "rhino"
        ? "border-status-success/25 bg-status-success/10 text-status-success"
        : value === "vehicle"
          ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
          : "border-status-danger/25 bg-status-danger/10 text-status-danger";

    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
          tone,
        )}
      >
        {getEventTypeLabel(value as EventType)}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-border-subtle/80 bg-canvas/45 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
      {value}
    </span>
  );
}
