"use client";

import { useEffect, useMemo, useRef } from "react";
import { LoaderCircle, RadioTower } from "lucide-react";

import { apiConfig } from "@/config/api";
import { Card, CardContent } from "@/components/ui/card";
import { CommandCenterKpiCard } from "@/features/dashboard/components/command-center-kpi-card";
import { IncidentRow } from "@/features/dashboard/components/incident-row";
import { LiveEventCard } from "@/features/dashboard/components/live-event-card";
import { MapSurfaceCard } from "@/features/dashboard/components/map-surface-card";
import { ReserveOverviewCard } from "@/features/dashboard/components/reserve-overview-card";
import { selectRecentIncidents } from "@/features/dashboard/selectors";
import { usePolling } from "@/hooks/use-polling";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";

export function DashboardOverview() {
  const isHydrated = useAppStore((state) => state.isHydrated);
  const isLoading = useAppStore((state) => state.isLoading);
  const dataSource = useAppStore((state) => state.dataSource);
  const lastUpdatedAt = useAppStore((state) => state.lastUpdatedAt);
  const statusMessage = useAppStore((state) => state.statusMessage);
  const summaryMetrics = useAppStore((state) => state.summaryMetrics);
  const liveEvents = useAppStore((state) => state.liveEvents);
  const reserveZones = useAppStore((state) => state.reserveZones);
  const reserveOverview = useAppStore((state) => state.reserveOverview);
  const recentIncidents = useAppStore((state) => state.recentIncidents);
  const selectedEventId = useAppStore((state) => state.selectedEventId);
  const setSelectedEvent = useAppStore((state) => state.setSelectedEvent);
  const loadCommandCenterData = useAppStore(
    (state) => state.loadCommandCenterData,
  );
  const hasRequestedInitialLoad = useRef(false);
  const visibleRecentIncidents = useMemo(
    () => selectRecentIncidents(recentIncidents),
    [recentIncidents],
  );
  const formattedUpdatedTime = useMemo(() => {
    if (!lastUpdatedAt) {
      return "Awaiting initial sync";
    }

    return new Intl.DateTimeFormat("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(lastUpdatedAt));
  }, [lastUpdatedAt]);

  useEffect(() => {
    if (!hasRequestedInitialLoad.current) {
      hasRequestedInitialLoad.current = true;
      void loadCommandCenterData();
    }
  }, [loadCommandCenterData]);

  usePolling(
    () => loadCommandCenterData({ liveOnly: true, silent: true }),
    {
      enabled: isHydrated && !isLoading,
      intervalMs: apiConfig.pollingIntervalMs,
    },
  );

  return (
    <div className="space-y-6">
      <Card className="border-border-subtle/80 bg-surface/88">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
              Live data status
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm",
                  dataSource === "api"
                    ? "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary"
                    : "border-border-subtle/80 bg-canvas/45 text-text-muted",
                )}
              >
                {isLoading ? (
                  <LoaderCircle className="h-4 w-4 animate-spin text-brand-secondary" />
                ) : (
                  <RadioTower
                    className={cn(
                      "h-4 w-4",
                      dataSource === "api"
                        ? "text-brand-secondary"
                        : "text-text-muted",
                    )}
                  />
                )}
                {dataSource === "api"
                  ? "Live API feed"
                  : isLoading
                    ? "Syncing operations data"
                    : "Mock fallback active"}
              </div>
              <p className="text-sm text-text-muted">
                {statusMessage ?? "Monitoring systems are preparing the latest reserve view."}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-3 text-sm text-text-muted">
            Last updated: {formattedUpdatedTime}
          </div>
        </CardContent>
      </Card>

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
