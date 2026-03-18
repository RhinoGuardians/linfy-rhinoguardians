import {
  NotebookText,
  RadioTower,
  ShieldCheck,
  Siren,
  TimerReset,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { RangerStatusBadge } from "@/features/rangers/components/ranger-status-badge";
import type { RangerUnit } from "@/types";

interface RangerDetailPanelProps {
  ranger: RangerUnit | null;
}

export function RangerDetailPanel({ ranger }: RangerDetailPanelProps) {
  if (!ranger) {
    return (
      <EmptyState
        description="Select a ranger unit to review readiness, communications, assignment, and dispatch context."
        title="No ranger unit selected"
      />
    );
  }

  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            Ranger detail
          </p>
          <h2 className="text-xl font-semibold text-text-primary">
            {ranger.callsign}
          </h2>
          <p className="text-sm leading-7 text-text-muted">{ranger.teamName}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <RangerStatusBadge kind="status" value={ranger.status} />
          <RangerStatusBadge
            kind="communication"
            value={ranger.communicationStatus}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Assigned zone
            </p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {ranger.assignedZone}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Current operating sector for field readiness and dispatch visibility.
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Readiness
            </p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {ranger.readinessScore}%
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Combined readiness indicator covering team posture and equipment status.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <TimerReset className="h-4 w-4 text-brand-secondary" />
              Last check-in
            </div>
            <p className="mt-2 text-sm text-text-muted">{ranger.lastActivityAt}</p>
          </div>
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <RadioTower className="h-4 w-4 text-brand-secondary" />
              Communication status
            </div>
            <p className="mt-2 text-sm text-text-muted">
              {ranger.communicationStatus} with {ranger.activeIncidentCount} active
              incident{ranger.activeIncidentCount === 1 ? "" : "s"} in context.
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <Siren className="h-4 w-4 text-brand-secondary" />
              Linked detections and incidents
            </div>
            <p className="mt-2 text-sm leading-6 text-text-muted">
              Active detections and incident workflows can be linked here once
              backend case coordination data is available.
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <ShieldCheck className="h-4 w-4 text-brand-secondary" />
              Readiness summary
            </div>
            <p className="mt-2 text-sm leading-6 text-text-muted">
              Unit posture is currently tracked through readiness scoring,
              communications health, and current deployment assignment.
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
              <NotebookText className="h-4 w-4 text-brand-secondary" />
              Dispatch notes
            </div>
            <p className="mt-2 text-sm leading-6 text-text-muted">
              {ranger.notes ??
                "Dispatch notes placeholder for analyst instructions and field updates."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
