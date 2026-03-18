import type { ReactNode } from "react";
import { LoaderCircle, RadioTower } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DataSource } from "@/types";

interface DataSourceBadgeProps {
  source: DataSource;
  isLoading?: boolean;
  apiLabel?: string;
  mockLabel?: string;
  loadingLabel?: string;
  className?: string;
}

interface DataSourceStatusCardProps {
  label?: string;
  source: DataSource;
  message: string;
  isLoading?: boolean;
  meta?: ReactNode;
  apiLabel?: string;
  mockLabel?: string;
  loadingLabel?: string;
  className?: string;
}

export function DataSourceBadge({
  source,
  isLoading = false,
  apiLabel = "Live API feed",
  mockLabel = "Mock fallback active",
  loadingLabel = "Syncing operations data",
  className,
}: DataSourceBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.18em]",
        source === "api"
          ? "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary"
          : "border-border-subtle/80 bg-canvas/45 text-text-muted",
        className,
      )}
    >
      {isLoading ? (
        <LoaderCircle className="h-4 w-4 animate-spin text-brand-secondary" />
      ) : (
        <RadioTower
          className={cn(
            "h-4 w-4",
            source === "api" ? "text-brand-secondary" : "text-text-muted",
          )}
        />
      )}
      {source === "api" ? apiLabel : isLoading ? loadingLabel : mockLabel}
    </div>
  );
}

export function DataSourceStatusCard({
  label = "Data source",
  source,
  message,
  isLoading = false,
  meta,
  apiLabel,
  mockLabel,
  loadingLabel,
  className,
}: DataSourceStatusCardProps) {
  return (
    <Card className={cn("border-border-subtle/80 bg-surface/88", className)}>
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            {label}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <DataSourceBadge
              apiLabel={apiLabel}
              isLoading={isLoading}
              loadingLabel={loadingLabel}
              mockLabel={mockLabel}
              source={source}
            />
            <p className="max-w-2xl text-sm leading-6 text-text-muted">{message}</p>
          </div>
        </div>
        {meta ? (
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-3 text-sm text-text-muted">
            {meta}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
