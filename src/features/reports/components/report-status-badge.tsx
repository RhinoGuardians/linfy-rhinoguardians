import { StatusChip } from "@/components/shared/status-chip";
import type { ReportAudience, ReportFreshness, ReportFormat } from "@/features/reports/types";

interface ReportStatusBadgeProps {
  kind: "freshness" | "audience" | "format";
  value: ReportFreshness | ReportAudience | ReportFormat;
}

export function ReportStatusBadge({ kind, value }: ReportStatusBadgeProps) {
  const tone =
    kind === "freshness"
      ? value === "current"
        ? "safe"
        : value === "scheduled"
          ? "brand"
          : "warning"
      : kind === "audience"
        ? value === "ngo"
          ? "safe"
          : value === "reserve_management"
            ? "brand"
            : value === "field_operations"
              ? "warning"
              : "neutral"
        : "neutral";

  const label =
    kind === "audience"
      ? value === "reserve_management"
        ? "reserve"
        : value === "field_operations"
          ? "operations"
          : value
      : value;

  return <StatusChip tone={tone}>{label}</StatusChip>;
}
