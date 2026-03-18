import { Card, CardContent } from "@/components/ui/card";
import type { AnalyticsTrendSeries } from "@/features/analytics/types";
import {
  getTrendToneClasses,
} from "@/features/analytics/utils/analytics-styles";
import { TrendBar } from "@/features/analytics/components/trend-bar";

interface ChartPanelProps {
  series: AnalyticsTrendSeries;
}

export function ChartPanel({ series }: ChartPanelProps) {
  const maxValue = Math.max(...series.points.map((point) => point.value));

  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-primary">{series.title}</p>
          <p className="text-sm leading-6 text-text-muted">{series.description}</p>
        </div>
        <div className="space-y-4">
          {series.points.map((point) => (
            <TrendBar
              key={point.label}
              label={point.label}
              maxValue={maxValue}
              toneClassName={getTrendToneClasses(series.tone)}
              value={point.value}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

