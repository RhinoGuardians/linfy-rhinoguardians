import {
  BellRing,
  Clock3,
  MapPinned,
  SlidersHorizontal,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm text-text-muted">{item.label}</p>
            <p className="text-3xl font-semibold text-text-primary">{item.value}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border-subtle/80 bg-canvas/45 text-brand-secondary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-6 text-text-muted">{item.supportingText}</p>
          <SettingsStatusBadge kind="summary-tone" value={item.tone} />
        </div>
      </CardContent>
    </Card>
  );
}
