import {
  Activity,
  BarChart3,
  Clock3,
  FileText,
  Globe2,
  type LucideIcon,
} from "lucide-react";

import { SummaryMetricCard } from "@/components/shared/summary-metric-card";
import type { ReportSummaryMetric } from "@/features/reports/types";

const summaryIcons: Record<ReportSummaryMetric["id"], LucideIcon> = {
  reports_available: FileText,
  last_generated: Clock3,
  incident_coverage: Activity,
  response_snapshot: BarChart3,
  stakeholder_coverage: Globe2,
};

interface ReportSummaryCardProps {
  item: ReportSummaryMetric;
}

export function ReportSummaryCard({ item }: ReportSummaryCardProps) {
  const Icon = summaryIcons[item.id];

  return (
    <SummaryMetricCard
      icon={Icon}
      label={item.label}
      supportingText={item.supportingText}
      tone={item.tone}
      value={item.value}
    />
  );
}
