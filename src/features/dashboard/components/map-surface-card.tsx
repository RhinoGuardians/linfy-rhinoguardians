"use client";

import dynamic from "next/dynamic";
import { Globe, Radar } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type {
  LiveEvent,
  MapZoneSummary,
} from "@/features/dashboard/types";
import { cn } from "@/lib/utils";

const LiveEventMap = dynamic(
  () =>
    import("@/components/maps/live-event-map").then((mod) => mod.LiveEventMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[420px] items-center justify-center rounded-[1.75rem] border border-border-subtle/80 bg-[linear-gradient(180deg,rgba(9,22,18,0.9),rgba(8,16,14,0.98))] text-sm text-text-muted">
        Loading live reserve map...
      </div>
    ),
  },
);

interface MapSurfaceCardProps {
  zones: readonly MapZoneSummary[];
  events: readonly LiveEvent[];
  selectedEventId?: string | null;
  onSelectEvent: (eventId: string) => void;
}

export function MapSurfaceCard({
  zones,
  events,
  selectedEventId,
  onSelectEvent,
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
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-border-subtle/80">
            <LiveEventMap
              events={events}
              onSelectEvent={onSelectEvent}
              selectedEventId={selectedEventId}
              zones={zones}
            />
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
              <div className="mt-4 rounded-2xl border border-border-subtle/80 bg-surface/88 p-4">
                <p className="text-sm font-medium text-text-primary">
                  Selection sync
                </p>
                <p className="mt-2 text-xs leading-6 text-text-muted">
                  Feed items and map markers share the same live event dataset.
                  Selecting either surface keeps the Command Center focused on
                  the same operational signal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
