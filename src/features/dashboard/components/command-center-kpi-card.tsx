import {
  Activity,
  Clock3,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getKpiAccentClasses } from "@/features/dashboard/utils/event-styles";
import type { CommandCenterKpi, CommandCenterKpiId } from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

const kpiIcons: Record<CommandCenterKpiId, LucideIcon> = {
  rhinos_detected: Activity,
  active_threats: ShieldAlert,
  ranger_units_online: Users,
  system_uptime: Clock3,
};

interface CommandCenterKpiCardProps {
  item: CommandCenterKpi;
}

export function CommandCenterKpiCard({
  item,
}: CommandCenterKpiCardProps) {
  const Icon = kpiIcons[item.id];

  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
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
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-primary">{item.delta}</p>
          <p className="text-sm leading-6 text-text-muted">
            {item.supportingText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

