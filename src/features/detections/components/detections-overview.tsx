 "use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, FilePlus2, LoaderCircle, RadioTower } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchDetectionsWorkspace } from "@/features/detections/api";
import { DetectionDetailPanel } from "@/features/detections/components/detection-detail-panel";
import { DetectionResultRow } from "@/features/detections/components/detection-result-row";
import { DetectionSummaryCard } from "@/features/detections/components/detection-summary-card";
import { DetectionsToolbar } from "@/features/detections/components/detections-toolbar";
import type {
  DetectionsFilterState,
  DetectionsWorkspaceData,
} from "@/features/detections/types";
import type { DataSource, LiveEvent } from "@/types";
import { cn } from "@/lib/utils";

const initialFilters: DetectionsFilterState = {
  search: "",
  type: "all",
  severity: "all",
  zone: "all",
  status: "all",
  dateRange: "all",
};

export function DetectionsOverview() {
  const [workspace, setWorkspace] = useState<DetectionsWorkspaceData | null>(null);
  const [filters, setFilters] = useState<DetectionsFilterState>(initialFilters);
  const [selectedDetectionId, setSelectedDetectionId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<DataSource>("mock");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Loading detections workspace...",
  );
  const hasRequestedWorkspace = useRef(false);

  useEffect(() => {
    let isActive = true;

    if (!hasRequestedWorkspace.current) {
      hasRequestedWorkspace.current = true;

      void fetchDetectionsWorkspace().then((result) => {
        if (!isActive) {
          return;
        }

        setWorkspace(result.data);
        setDataSource(result.source);
        setStatusMessage(
          result.source === "api"
            ? "Live detections feed connected."
            : (result.message ?? "Using local operational detections dataset."),
        );
        setSelectedDetectionId(result.data.detections[0]?.id ?? null);
        setIsLoading(false);
      });
    }

    return () => {
      isActive = false;
    };
  }, []);

  const filteredDetections = useMemo(() => {
    if (!workspace) {
      return [];
    }

    const normalizedSearch = filters.search.trim().toLowerCase();

    return workspace.detections.filter((detection) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          detection.id,
          detection.zone,
          detection.coordinates,
          detection.message,
          detection.timestamp,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesType =
        filters.type === "all" || detection.type === filters.type;
      const matchesSeverity =
        filters.severity === "all" || detection.severity === filters.severity;
      const matchesZone = filters.zone === "all" || detection.zone === filters.zone;
      const matchesStatus =
        filters.status === "all" || detection.status === filters.status;

      return (
        matchesSearch &&
        matchesType &&
        matchesSeverity &&
        matchesZone &&
        matchesStatus
      );
    });
  }, [filters, workspace]);

  const selectedDetection = useMemo<LiveEvent | null>(() => {
    if (filteredDetections.length === 0) {
      return null;
    }

    return (
      filteredDetections.find((detection) => detection.id === selectedDetectionId) ??
      filteredDetections[0] ??
      null
    );
  }, [filteredDetections, selectedDetectionId]);

  useEffect(() => {
    if (
      filteredDetections.length > 0 &&
      !filteredDetections.some((detection) => detection.id === selectedDetectionId)
    ) {
      setSelectedDetectionId(filteredDetections[0]?.id ?? null);
    }
  }, [filteredDetections, selectedDetectionId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          description="Review wildlife and threat detections across monitored reserve zones."
          eyebrow="Operational intelligence"
          title="Detections"
        />
        <Card className="border-border-subtle/80 bg-surface/88">
          <CardContent className="flex items-center gap-3 p-6 text-sm text-text-muted">
            <LoaderCircle className="h-4 w-4 animate-spin text-brand-secondary" />
            Preparing detections workspace...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!workspace) {
    return (
      <EmptyState
        description="Detections data is not available yet. Retry once the operations feed is ready."
        title="Detections workspace unavailable"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        action={
          <div className="flex flex-wrap gap-3">
            <Button size="sm" type="button" variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" type="button" variant="primary">
              <FilePlus2 className="mr-2 h-4 w-4" />
              Create report
            </Button>
          </div>
        }
        description="Review wildlife movements, vehicle anomalies, and threat detections through a cleaner operational triage surface."
        eyebrow="Operational intelligence"
        title="Detections"
      />

      <Card className="border-border-subtle/80 bg-surface/88">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
              Data source
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
                <RadioTower
                  className={cn(
                    "h-4 w-4",
                    dataSource === "api"
                      ? "text-brand-secondary"
                      : "text-text-muted",
                  )}
                />
                {dataSource === "api" ? "Live API feed" : "Mock fallback active"}
              </div>
              <p className="text-sm text-text-muted">{statusMessage}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-3 text-sm text-text-muted">
            Reviewing {filteredDetections.length} of {workspace.detections.length} detections
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-5">
        {workspace.summary.map((item) => (
          <DetectionSummaryCard item={item} key={item.id} />
        ))}
      </div>

      <DetectionsToolbar
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(initialFilters)}
        zones={workspace.availableZones}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_420px]">
        <Card className="border-border-subtle/80 bg-surface/88">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                Detection results
              </p>
              <h2 className="text-xl font-semibold text-text-primary">
                Operational review queue
              </h2>
              <p className="text-sm leading-7 text-text-muted">
                Filter, scan, and select detections to triage wildlife movement,
                vehicle anomalies, and critical threats.
              </p>
            </div>

            {filteredDetections.length > 0 ? (
              <div className="space-y-3">
                <div className="hidden grid-cols-[120px_110px_120px_120px_140px_110px_120px_120px_minmax(0,1fr)] gap-4 border-b border-border-subtle/80 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted xl:grid">
                  <span>ID</span>
                  <span>Type</span>
                  <span>Time</span>
                  <span>Zone</span>
                  <span>Coordinates</span>
                  <span>Confidence</span>
                  <span>Severity</span>
                  <span>Status</span>
                  <span>Message</span>
                </div>

                <div className="space-y-3">
                  {filteredDetections.map((detection) => (
                    <DetectionResultRow
                      detection={detection}
                      isSelected={detection.id === selectedDetection?.id}
                      key={detection.id}
                      onSelect={setSelectedDetectionId}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                action={
                  <Button onClick={() => setFilters(initialFilters)} type="button">
                    Clear filters
                  </Button>
                }
                description="No detections match the current filter set. Clear or relax the current filters to restore the operational queue."
                title="No detections match these filters"
              />
            )}
          </CardContent>
        </Card>

        <DetectionDetailPanel detection={selectedDetection} />
      </div>
    </div>
  );
}
