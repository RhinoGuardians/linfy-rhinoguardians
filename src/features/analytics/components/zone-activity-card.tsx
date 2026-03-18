import { Card, CardContent } from "@/components/ui/card";
import type { ZoneActivitySummary } from "@/features/analytics/types";
import { getZoneStatusClasses } from "@/features/analytics/utils/analytics-styles";
import { cn } from "@/lib/utils";

interface ZoneActivityCardProps {
  zone: ZoneActivitySummary;
}

export function ZoneActivityCard({ zone }: ZoneActivityCardProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-text-primary">{zone.zone}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
              {zone.activityLevel} activity
            </p>
          </div>
          <span
            className={cn(
              "rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
              getZoneStatusClasses(zone.status),
            )}
          >
            {zone.status}
          </span>
        </div>
        <div className="space-y-2 text-sm text-text-muted">
          <p>{zone.wildlifeDensity}</p>
          <p>{zone.patrolCoverage}</p>
        </div>
      </CardContent>
    </Card>
  );
}

