import type { ReportAudience, ReportFreshness, ReportFormat } from "@/features/reports/types";
import { cn } from "@/lib/utils";

interface ReportStatusBadgeProps {
  kind: "freshness" | "audience" | "format";
  value: ReportFreshness | ReportAudience | ReportFormat;
}

export function ReportStatusBadge({ kind, value }: ReportStatusBadgeProps) {
  const tone =
    kind === "freshness"
      ? value === "current"
        ? "border-status-success/25 bg-status-success/10 text-status-success"
        : value === "scheduled"
          ? "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary"
          : "border-amber-400/25 bg-amber-400/10 text-amber-300"
      : kind === "audience"
        ? value === "ngo"
          ? "border-status-success/25 bg-status-success/10 text-status-success"
          : value === "reserve_management"
            ? "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary"
            : value === "field_operations"
              ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
              : "border-border-subtle/80 bg-canvas/45 text-text-muted"
        : "border-border-subtle/80 bg-canvas/45 text-text-muted";

  const label =
    kind === "audience"
      ? value === "reserve_management"
        ? "reserve"
        : value === "field_operations"
          ? "operations"
          : value
      : value;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
        tone,
      )}
    >
      {label}
    </span>
  );
}
