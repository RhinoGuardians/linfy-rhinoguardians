import {
  BellRing,
  Clock3,
  MapPinned,
  SlidersHorizontal,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { SummaryMetricCard } from "@/components/shared/summary-metric-card";
import { SettingsStatusBadge } from "@/features/settings/components/settings-status-badge";
import type { SettingsSummaryItem } from "@/features/settings/types";

const summaryIcons: Record<SettingsSummaryItem["id"], LucideIcon> = {
  notifications_enabled: BellRing,
  protected_zones: MapPinned,
  active_thresholds: SlidersHorizontal,
  api_mode: Workflow,
  last_updated: Clock3,
};

interface SettingsSummaryCardProps {
  item: SettingsSummaryItem;
}

export function SettingsSummaryCard({ item }: SettingsSummaryCardProps) {
  const Icon = summaryIcons[item.id];

  return (
    <SummaryMetricCard
      footer={<SettingsStatusBadge kind="summary-tone" value={item.tone} />}
      icon={Icon}
      label={item.label}
      supportingText={item.supportingText}
      tone={item.tone}
      value={item.value}
    />
  );
}
