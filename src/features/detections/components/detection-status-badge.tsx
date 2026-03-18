import { StatusChip } from "@/components/shared/status-chip";
import type { EventSeverity, EventStatus, EventType } from "@/types";
import {
  getEventTypeLabel,
  getSeverityClasses,
} from "@/features/dashboard/utils/event-styles";

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

    return <StatusChip className={classes.badge}>{value}</StatusChip>;
  }

  if (kind === "type") {
    return (
      <StatusChip
        tone={
          value === "rhino"
            ? "safe"
            : value === "vehicle"
              ? "warning"
              : "critical"
        }
      >
        {getEventTypeLabel(value as EventType)}
      </StatusChip>
    );
  }

  return <StatusChip tone="neutral">{value}</StatusChip>;
}
