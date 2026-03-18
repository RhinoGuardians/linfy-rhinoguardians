import {
  Activity,
  Clock3,
  ShieldAlert,
  Siren,
  Target,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { AnalyticsMetric } from "@/features/analytics/types";
import { getAnalyticsMetricToneClasses } from "@/features/analytics/utils/analytics-styles";
import { cn } from "@/lib/utils";

const metricIcons: Record<AnalyticsMetric["id"], LucideIcon> = {
  total_detections: Activity,
  rhino_sightings: Target,
  threat_incidents: ShieldAlert,
  average_response_time: Clock3,
  alert_resolution_rate: Siren,
};

interface AnalyticsKpiCardProps {
  metric: AnalyticsMetric;
}

export function AnalyticsKpiCard({ metric }: AnalyticsKpiCardProps) {
  const Icon = metricIcons[metric.id];

  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-text-primary">
              {metric.value}
            </p>
          </div>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl border",
              getAnalyticsMetricToneClasses(metric.tone),
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-primary">{metric.delta}</p>
          <p className="text-sm leading-6 text-text-muted">
            {metric.supportingText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

