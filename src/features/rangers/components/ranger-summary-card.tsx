import {
  Activity,
  Map,
  ShieldCheck,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getKpiAccentClasses } from "@/features/dashboard/utils/event-styles";
import type { RangerSummaryItem } from "@/features/rangers/types";
import { cn } from "@/lib/utils";

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
