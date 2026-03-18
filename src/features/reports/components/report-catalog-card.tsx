import { CalendarRange, Layers3 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ReportStatusBadge } from "@/features/reports/components/report-status-badge";
import type { ReportCatalogItem } from "@/features/reports/types";
import { cn } from "@/lib/utils";

interface ReportCatalogCardProps {
  report: ReportCatalogItem;
  isSelected: boolean;
  onSelect: (reportId: string) => void;
}

export function ReportCatalogCard({
  report,
  isSelected,
  onSelect,
}: ReportCatalogCardProps) {
  return (
    <button
      aria-label={`Preview report ${report.title}`}
      aria-pressed={isSelected}
      className={cn(
        "dashboard-interactive-row w-full rounded-2xl border bg-surface/88 p-4 text-left hover:border-brand-primary/20 hover:bg-surface-elevated/80",
        isSelected
          ? "border-brand-primary/35 bg-brand-primary/10 shadow-[0_0_0_1px_rgba(73,130,94,0.08)]"
          : "border-border-subtle/80",
      )}
      onClick={() => onSelect(report.id)}
      type="button"
    >
      <Card className="border-0 bg-transparent shadow-none">
        <CardContent className="space-y-4 p-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-text-primary">
                {report.title}
              </h3>
              <p className="text-sm leading-6 text-text-muted">
                {report.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ReportStatusBadge kind="audience" value={report.audience} />
              <ReportStatusBadge kind="freshness" value={report.freshness} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1">
              <CalendarRange className="h-3.5 w-3.5 text-brand-secondary" />
              {report.generatedAt}
            </span>
            <span className="inline-flex items-center gap-1">
              <Layers3 className="h-3.5 w-3.5 text-brand-secondary" />
              {report.reportingPeriod}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {report.formats.map((format) => (
              <ReportStatusBadge key={format} kind="format" value={format} />
            ))}
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
