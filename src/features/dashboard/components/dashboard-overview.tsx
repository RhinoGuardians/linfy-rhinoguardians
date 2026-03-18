"use client";

import { useEffect, useMemo, useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { CommandCenterKpiCard } from "@/features/dashboard/components/command-center-kpi-card";
import { IncidentRow } from "@/features/dashboard/components/incident-row";
import { LiveEventCard } from "@/features/dashboard/components/live-event-card";
import { MapSurfaceCard } from "@/features/dashboard/components/map-surface-card";
import { ReserveOverviewCard } from "@/features/dashboard/components/reserve-overview-card";
import { selectRecentIncidents } from "@/features/dashboard/selectors";
import { useAppStore } from "@/store";

export function DashboardOverview() {
  const hydrateFromMockData = useAppStore((state) => state.hydrateFromMockData);
  const isHydrated = useAppStore((state) => state.isHydrated);
  const summaryMetrics = useAppStore((state) => state.summaryMetrics);
  const liveEvents = useAppStore((state) => state.liveEvents);
  const reserveZones = useAppStore((state) => state.reserveZones);
  const reserveOverview = useAppStore((state) => state.reserveOverview);
  const recentIncidents = useAppStore((state) => state.recentIncidents);
  const selectedEventId = useAppStore((state) => state.selectedEventId);
  const setSelectedEvent = useAppStore((state) => state.setSelectedEvent);
  const hasRequestedHydration = useRef(false);
  const visibleRecentIncidents = useMemo(
    () => selectRecentIncidents(recentIncidents),
    [recentIncidents],
  );

  useEffect(() => {
    if (!isHydrated && !hasRequestedHydration.current) {
      hasRequestedHydration.current = true;
      hydrateFromMockData();
    }
  }, [hydrateFromMockData, isHydrated]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-4">
        {summaryMetrics.map((item) => (
          <CommandCenterKpiCard item={item} key={item.id} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_400px]">
        <MapSurfaceCard
          events={liveEvents}
          onSelectEvent={setSelectedEvent}
          selectedEventId={selectedEventId}
          zones={reserveZones}
        />
        <Card className="overflow-hidden border-border-subtle/80 bg-surface/88">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                Live threat feed
              </p>
              <h2 className="text-xl font-semibold text-text-primary">
                Recent events and alerts
              </h2>
              <p className="text-sm leading-7 text-text-muted">
                Wildlife detections, warning signals, and critical threat
                indicators are prioritized into one readable operational queue.
              </p>
            </div>
            <div className="max-h-[640px] space-y-3 overflow-y-auto pr-1">
              {liveEvents.map((event) => (
                <LiveEventCard
                  event={event}
                  isSelected={event.id === selectedEventId}
                  key={event.id}
                  onSelect={setSelectedEvent}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <ReserveOverviewCard items={reserveOverview} />
        <Card className="border-border-subtle/80 bg-surface/88">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                Recent incidents
              </p>
              <h2 className="text-xl font-semibold text-text-primary">
                Incident response timeline
              </h2>
              <p className="text-sm leading-7 text-text-muted">
                High-priority operational updates and response actions across
                the reserve network.
              </p>
            </div>
            <div className="space-y-3">
              {visibleRecentIncidents.map((incident) => (
                <IncidentRow incident={incident} key={incident.id} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
