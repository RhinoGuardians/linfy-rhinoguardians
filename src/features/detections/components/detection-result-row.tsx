import { LocateFixed } from "lucide-react";

import { DetectionStatusBadge } from "@/features/detections/components/detection-status-badge";
import type { LiveEvent } from "@/types";
import { cn } from "@/lib/utils";

interface DetectionResultRowProps {
  detection: LiveEvent;
  isSelected: boolean;
  onSelect: (detectionId: string) => void;
}

export function DetectionResultRow({
  detection,
  isSelected,
  onSelect,
}: DetectionResultRowProps) {
  return (
    <button
      className={cn(
        "w-full rounded-2xl border bg-surface/88 p-4 text-left transition-colors hover:border-brand-primary/20 hover:bg-surface-elevated/80",
        isSelected
          ? "border-brand-primary/35 bg-brand-primary/10"
          : "border-border-subtle/80",
      )}
      onClick={() => onSelect(detection.id)}
      type="button"
    >
      <div className="hidden grid-cols-[120px_110px_120px_120px_140px_110px_120px_120px_minmax(0,1fr)] items-start gap-4 xl:grid">
        <p className="text-sm font-medium text-text-primary">{detection.id}</p>
        <DetectionStatusBadge kind="type" value={detection.type} />
        <p className="text-sm text-text-primary">{detection.timestamp}</p>
        <p className="text-sm text-text-primary">{detection.zone}</p>
        <p className="text-sm text-text-muted">{detection.coordinates}</p>
        <p className="text-sm text-text-primary">{detection.confidence}%</p>
        <DetectionStatusBadge kind="severity" value={detection.severity} />
        <DetectionStatusBadge kind="status" value={detection.status} />
        <p className="line-clamp-2 text-sm leading-6 text-text-muted">
          {detection.message}
        </p>
      </div>

      <div className="space-y-4 xl:hidden">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-text-primary">{detection.id}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
              {detection.zone}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <DetectionStatusBadge kind="type" value={detection.type} />
            <DetectionStatusBadge kind="severity" value={detection.severity} />
          </div>
        </div>
        <p className="text-sm leading-6 text-text-muted">{detection.message}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
          <span>{detection.timestamp}</span>
          <span>{detection.confidence}% confidence</span>
          <span className="capitalize">{detection.status}</span>
          <span className="inline-flex items-center gap-1">
            <LocateFixed className="h-3.5 w-3.5 text-brand-secondary" />
            {detection.coordinates}
          </span>
        </div>
      </div>
    </button>
  );
}
