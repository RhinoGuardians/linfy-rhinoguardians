import { RadioTower, ShieldAlert, TimerReset } from "lucide-react";

import { RangerStatusBadge } from "@/features/rangers/components/ranger-status-badge";
import type { RangerUnit } from "@/types";
import { cn } from "@/lib/utils";

interface RangerRowProps {
  ranger: RangerUnit;
  isSelected: boolean;
  onSelect: (rangerId: string) => void;
}

export function RangerRow({ ranger, isSelected, onSelect }: RangerRowProps) {
  return (
    <button
      aria-label={`View ranger unit ${ranger.callsign}`}
      aria-pressed={isSelected}
      className={cn(
        "dashboard-interactive-row w-full rounded-2xl border bg-surface/88 p-4 text-left hover:border-brand-primary/20 hover:bg-surface-elevated/80",
        isSelected
          ? "border-brand-primary/35 bg-brand-primary/10 shadow-[0_0_0_1px_rgba(73,130,94,0.08)]"
          : "border-border-subtle/80",
      )}
      onClick={() => onSelect(ranger.id)}
      type="button"
    >
      <div className="hidden grid-cols-[120px_180px_110px_140px_130px_130px_110px] items-start gap-4 xl:grid">
        <div>
          <p className="text-sm font-medium text-text-primary">{ranger.callsign}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
            {ranger.id}
          </p>
        </div>
        <p className="text-sm text-text-primary">{ranger.teamName}</p>
        <RangerStatusBadge kind="status" value={ranger.status} />
        <p className="text-sm text-text-primary">{ranger.assignedZone}</p>
        <RangerStatusBadge
          kind="communication"
          value={ranger.communicationStatus}
        />
        <p className="text-sm text-text-primary">{ranger.readinessScore}%</p>
        <p className="text-sm text-text-primary">{ranger.activeIncidentCount}</p>
      </div>

      <div className="space-y-4 xl:hidden">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-text-primary">
              {ranger.callsign}
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">
              {ranger.teamName}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <RangerStatusBadge kind="status" value={ranger.status} />
            <RangerStatusBadge
              kind="communication"
              value={ranger.communicationStatus}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1">
            <ShieldAlert className="h-3.5 w-3.5 text-brand-secondary" />
            {ranger.assignedZone}
          </span>
          <span className="inline-flex items-center gap-1">
            <RadioTower className="h-3.5 w-3.5 text-brand-secondary" />
            {ranger.readinessScore}% readiness
          </span>
          <span className="inline-flex items-center gap-1">
            <TimerReset className="h-3.5 w-3.5 text-brand-secondary" />
            {ranger.lastActivityAt}
          </span>
        </div>
      </div>
    </button>
  );
}
