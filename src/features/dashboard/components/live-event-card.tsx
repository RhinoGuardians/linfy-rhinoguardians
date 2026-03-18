import { LocateFixed } from "lucide-react";

import type { LiveEvent } from "@/types";
import {
  getEventAriaLabel,
  getEventTypeLabel,
  getSeverityClasses,
} from "@/features/dashboard/utils/event-styles";
import { cn } from "@/lib/utils";

interface LiveEventCardProps {
  event: LiveEvent;
  isSelected?: boolean;
  onSelect?: (eventId: string) => void;
}

export function LiveEventCard({
  event,
  isSelected = false,
  onSelect,
}: LiveEventCardProps) {
  const severityClasses = getSeverityClasses(event.severity);

  return (
    <button
      aria-label={getEventAriaLabel(event)}
      className={cn(
        "w-full rounded-2xl border bg-surface/88 p-4 text-left transition-colors",
        isSelected
          ? "border-brand-primary/35 bg-brand-primary/10"
          : "border-border-subtle/80 hover:border-brand-primary/20 hover:bg-surface-elevated/80",
      )}
      onClick={() => onSelect?.(event.id)}
      type="button"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "mt-1 h-2.5 w-2.5 rounded-full",
              severityClasses.dot,
            )}
          />
          <div>
            <p className="text-sm font-medium text-text-primary">
              {getEventTypeLabel(event.type)} detected
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
              {event.zone}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
            severityClasses.badge,
          )}
        >
          {event.severity}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-text-muted">{event.message}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <LocateFixed className="h-3.5 w-3.5 text-brand-secondary" />
          {event.coordinates}
        </div>
        <div className="flex items-center gap-3">
          <span>{event.timestamp}</span>
          <span>{event.confidence}% confidence</span>
          <span className="capitalize">{event.status}</span>
        </div>
      </div>
    </button>
  );
}
