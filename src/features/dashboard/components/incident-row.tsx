import type { IncidentItem } from "@/features/dashboard/types";
import { getIncidentClasses } from "@/features/dashboard/utils/event-styles";
import { cn } from "@/lib/utils";

interface IncidentRowProps {
  incident: IncidentItem;
}

export function IncidentRow({ incident }: IncidentRowProps) {
  const severityClasses = getIncidentClasses(incident.severity);

  return (
    <div className="rounded-2xl border border-border-subtle/80 bg-surface/88 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-text-primary">
            {incident.title}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
            {incident.zone}
          </p>
        </div>
        <span
          className={cn(
            "rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
            severityClasses.badge,
          )}
        >
          {incident.severity}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-text-muted">{incident.action}</p>
      <p className="mt-3 text-xs text-text-muted">{incident.timestamp}</p>
    </div>
  );
}
