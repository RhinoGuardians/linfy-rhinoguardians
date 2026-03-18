import {
  Activity,
  BellDot,
  Map,
  ShieldAlert,
  Target,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { DetectionSummaryItem } from "@/features/detections/types";
import { getKpiAccentClasses } from "@/features/dashboard/utils/event-styles";
import { cn } from "@/lib/utils";

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
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-text-primary">
              {item.value}
            </p>
          </div>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl border",
              getKpiAccentClasses(item.tone),
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <p className="text-sm leading-6 text-text-muted">{item.supportingText}</p>
      </CardContent>
    </Card>
  );
}
