import {
  Activity,
  Map,
  ShieldCheck,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { SummaryMetricCard } from "@/components/shared/summary-metric-card";
import type { RangerSummaryItem } from "@/features/rangers/types";

const summaryIcons: Record<RangerSummaryItem["id"], LucideIcon> = {
  units_online: Users,
  deployed_units: Activity,
  standby_units: ShieldCheck,
  average_readiness: Waves,
  covered_zones: Map,
};

interface RangerSummaryCardProps {
  item: RangerSummaryItem;
}

export function RangerSummaryCard({ item }: RangerSummaryCardProps) {
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
