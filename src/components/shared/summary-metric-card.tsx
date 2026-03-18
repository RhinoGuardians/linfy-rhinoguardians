import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { getKpiAccentClasses } from "@/features/dashboard/utils/event-styles";
import { cn } from "@/lib/utils";
import type { MetricTone } from "@/types";

interface SummaryMetricCardProps {
  label: string;
  value: string;
  supportingText: string;
  tone: MetricTone;
  icon: LucideIcon;
  footer?: ReactNode;
}

export function SummaryMetricCard({
  label,
  value,
  supportingText,
  tone,
  icon: Icon,
  footer,
}: SummaryMetricCardProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-text-muted">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-text-primary">
              {value}
            </p>
          </div>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl border",
              getKpiAccentClasses(tone),
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {footer ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm leading-6 text-text-muted">{supportingText}</p>
            {footer}
          </div>
        ) : (
          <p className="text-sm leading-6 text-text-muted">{supportingText}</p>
        )}
      </CardContent>
    </Card>
  );
}
