import type { CSSProperties } from "react";
import { Globe, Radar } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  getEventTypeLabel,
  getSeverityClasses,
} from "@/features/dashboard/utils/event-styles";
import type {
  LiveEvent,
  MapPing,
  MapZoneSummary,
} from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

interface MapSurfaceCardProps {
  zones: readonly MapZoneSummary[];
  pings: readonly MapPing[];
  activeEvents: readonly LiveEvent[];
}

export function MapSurfaceCard({
  zones,
  pings,
  activeEvents,
}: MapSurfaceCardProps) {
  return (
    <Card className="overflow-hidden border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-6 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
              Geospatial monitoring
            </p>
            <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">
              Live reserve map surface
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-text-muted">
              Live geospatial tracking is active across protected corridors,
              perimeter routes, and wildlife observation zones.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-2 text-sm text-brand-secondary">
            <Radar className="h-4 w-4" />
            Monitoring active
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-border-subtle/80 bg-[linear-gradient(180deg,rgba(9,22,18,0.9),rgba(8,16,14,0.98))]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(65,166,112,0.18),transparent_28%),radial-gradient(circle_at_70%_30%,rgba(29,78,216,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(236,96,70,0.12),transparent_20%)]" />

            <div className="absolute left-[10%] top-[18%] rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 text-xs text-brand-secondary">
              North Waterline
            </div>
            <div className="absolute left-[62%] top-[28%] rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
              East Perimeter
            </div>
            <div className="absolute left-[46%] top-[56%] rounded-full border border-status-danger/20 bg-status-danger/10 px-3 py-1 text-xs text-status-danger">
              Sector C3
            </div>
            <div className="absolute left-[18%] top-[70%] rounded-full border border-status-success/20 bg-status-success/10 px-3 py-1 text-xs text-status-success">
              Western Basin
            </div>

            {pings.map((ping) => {
              const severityClasses = getSeverityClasses(ping.severity);
              const style = {
                left: ping.left,
                top: ping.top,
              } as CSSProperties;

              return (
                <div className="absolute" key={ping.id} style={style}>
                  <div
                    className={cn(
                      "relative flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-canvas/90",
                      severityClasses.glow,
                    )}
                  >
                    <span className={cn("h-2.5 w-2.5 rounded-full", severityClasses.dot)} />
                  </div>
                  <div className="mt-2 rounded-2xl border border-border-subtle/80 bg-surface/90 px-3 py-2 text-xs text-text-primary shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]">
                    <p className="font-medium">{ping.label}</p>
                    <p className="mt-1 text-text-muted">
                      {getEventTypeLabel(ping.type)}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-3">
              {activeEvents.slice(0, 3).map((event) => {
                const severityClasses = getSeverityClasses(event.severity);

                return (
                  <div
                    className="rounded-2xl border border-border-subtle/80 bg-surface/88 px-4 py-4"
                    key={event.id}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-text-primary">
                        {event.zone}
                      </p>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
                          severityClasses.badge,
                        )}
                      >
                        {event.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-text-muted">
                      {event.message}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-border-subtle/80 bg-canvas/45 p-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-brand-secondary" />
                <p className="text-sm font-medium text-text-primary">
                  Zone legend
                </p>
              </div>
              <div className="mt-4 space-y-3">
                {zones.map((zone) => {
                  const tone =
                    zone.status === "stable"
                      ? "border-status-success/25 bg-status-success/10 text-status-success"
                      : zone.status === "watch"
                        ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
                        : "border-status-danger/20 bg-status-danger/10 text-status-danger";

                  return (
                    <div
                      className="rounded-2xl border border-border-subtle/80 bg-surface/88 p-4"
                      key={zone.id}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-text-primary">
                          {zone.label}
                        </p>
                        <span
                          className={cn(
                            "rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
                            tone,
                          )}
                        >
                          {zone.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-6 text-text-muted">
                        {zone.coverage}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

