import { Card, CardContent } from "@/components/ui/card";
import type { ReserveOverviewItem } from "@/types";

interface ReserveOverviewCardProps {
  items: readonly ReserveOverviewItem[];
}

export function ReserveOverviewCard({ items }: ReserveOverviewCardProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            Reserve overview
          </p>
          <h2 className="text-xl font-semibold text-text-primary">
            Coordinated protection status
          </h2>
          <p className="text-sm leading-7 text-text-muted">
            A high-level view of coverage, active zones, and patrol readiness
            across the monitored reserve network.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4"
              key={item.id}
            >
              <p className="text-sm text-text-muted">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-text-primary">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                {item.supportingText}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
