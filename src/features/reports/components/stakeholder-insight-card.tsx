import { Card, CardContent } from "@/components/ui/card";
import type { StakeholderInsight } from "@/features/reports/types";
import { ReportStatusBadge } from "@/features/reports/components/report-status-badge";

interface StakeholderInsightCardProps {
  insight: StakeholderInsight;
}

export function StakeholderInsightCard({
  insight,
}: StakeholderInsightCardProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              {insight.title}
            </h3>
            <p className="text-sm leading-6 text-text-muted">
              {insight.description}
            </p>
          </div>
          <ReportStatusBadge kind="audience" value={insight.id} />
        </div>
        <p className="text-sm font-medium text-text-primary">{insight.emphasis}</p>
      </CardContent>
    </Card>
  );
}
