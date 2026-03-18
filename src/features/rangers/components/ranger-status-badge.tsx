import { StatusChip } from "@/components/shared/status-chip";
import type { RangerUnit } from "@/types";

interface RangerStatusBadgeProps {
  kind: "status" | "communication";
  value: RangerUnit["status"] | RangerUnit["communicationStatus"];
}

export function RangerStatusBadge({ kind, value }: RangerStatusBadgeProps) {
  const tone =
    kind === "status"
      ? value === "deployed"
        ? "warning"
        : value === "online"
          ? "safe"
          : value === "standby"
            ? "brand"
            : "neutral"
      : value === "connected"
        ? "safe"
        : value === "intermittent"
          ? "warning"
          : "critical";

  return <StatusChip tone={tone}>{value}</StatusChip>;
}
