import {
  Activity,
  BellDot,
  Map,
  ShieldAlert,
  Target,
  type LucideIcon,
} from "lucide-react";

import { SummaryMetricCard } from "@/components/shared/summary-metric-card";
import type { DetectionSummaryItem } from "@/features/detections/types";

const summaryIcons: Record<DetectionSummaryItem["id"], LucideIcon> = {
  total_detections: Activity,
  rhino_detections: Target,
  threat_detections: BellDot,
  critical_alerts: ShieldAlert,
  monitored_zones: Map,
};

interface DetectionSummaryCardProps {
  item: DetectionSummaryItem;
}

export function DetectionSummaryCard({ item }: DetectionSummaryCardProps) {
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
