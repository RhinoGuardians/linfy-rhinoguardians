"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, FileText, LoaderCircle, RadioTower } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchRangersWorkspace } from "@/features/rangers/api";
import { RangerDetailPanel } from "@/features/rangers/components/ranger-detail-panel";
import { RangerRow } from "@/features/rangers/components/ranger-row";
import { RangerSummaryCard } from "@/features/rangers/components/ranger-summary-card";
import { RangersToolbar } from "@/features/rangers/components/rangers-toolbar";
import type {
  RangersFilterState,
  RangersWorkspaceData,
} from "@/features/rangers/types";
import { cn } from "@/lib/utils";
import type { DataSource, RangerUnit } from "@/types";

const initialFilters: RangersFilterState = {
  search: "",
  status: "all",
  zone: "all",
  communicationStatus: "all",
  readinessBand: "all",
};

function matchesReadinessBand(
  readinessScore: number,
  readinessBand: RangersFilterState["readinessBand"],
) {
  if (readinessBand === "all") {
    return true;
  }

  if (readinessBand === "high") {
    return readinessScore >= 90;
  }

  if (readinessBand === "medium") {
    return readinessScore >= 75 && readinessScore < 90;
  }

  return readinessScore < 75;
}

export function RangersOverview() {
  const [workspace, setWorkspace] = useState<RangersWorkspaceData | null>(null);
  const [filters, setFilters] = useState<RangersFilterState>(initialFilters);
  const [selectedRangerId, setSelectedRangerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<DataSource>("mock");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Loading ranger operations workspace...",
  );
  const hasRequestedWorkspace = useRef(false);

  useEffect(() => {
    let isActive = true;

    if (!hasRequestedWorkspace.current) {
      hasRequestedWorkspace.current = true;

      void fetchRangersWorkspace().then((result) => {
        if (!isActive) {
          return;
        }

        setWorkspace(result.data);
        setDataSource(result.source);
        setStatusMessage(
          result.source === "api"
            ? "Live ranger operations feed connected."
            : (result.message ?? "Using local field operations dataset."),
        );
        setSelectedRangerId(result.data.roster[0]?.id ?? null);
        setIsLoading(false);
      });
    }

    return () => {
      isActive = false;
    };
  }, []);

  const filteredRoster = useMemo(() => {
    if (!workspace) {
      return [];
    }

    const normalizedSearch = filters.search.trim().toLowerCase();

    return workspace.roster.filter((ranger) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          ranger.callsign,
          ranger.id,
          ranger.teamName,
          ranger.assignedZone,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        filters.status === "all" || ranger.status === filters.status;
      const matchesZone =
        filters.zone === "all" || ranger.assignedZone === filters.zone;
      const matchesCommunication =
        filters.communicationStatus === "all" ||
        ranger.communicationStatus === filters.communicationStatus;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesZone &&
        matchesCommunication &&
        matchesReadinessBand(ranger.readinessScore, filters.readinessBand)
      );
    });
  }, [filters, workspace]);

  const selectedRanger = useMemo<RangerUnit | null>(() => {
    if (filteredRoster.length === 0) {
      return null;
    }

    return (
      filteredRoster.find((ranger) => ranger.id === selectedRangerId) ??
      filteredRoster[0] ??
      null
    );
  }, [filteredRoster, selectedRangerId]);

  useEffect(() => {
    if (
      filteredRoster.length > 0 &&
      !filteredRoster.some((ranger) => ranger.id === selectedRangerId)
    ) {
      setSelectedRangerId(filteredRoster[0]?.id ?? null);
    }
  }, [filteredRoster, selectedRangerId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          description="Monitor ranger readiness, field assignments, and communication posture across reserve operations."
          eyebrow="Field operations"
          title="Rangers"
        />
        <Card className="border-border-subtle/80 bg-surface/88">
          <CardContent className="flex items-center gap-3 p-6 text-sm text-text-muted">
            <LoaderCircle className="h-4 w-4 animate-spin text-brand-secondary" />
            Preparing ranger operations workspace...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!workspace) {
    return (
      <EmptyState
        description="Ranger operations data is not available yet. Retry once the roster feed is ready."
        title="Ranger operations unavailable"
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
              Export status
            </Button>
            <Button size="sm" type="button" variant="primary">
              <FileText className="mr-2 h-4 w-4" />
              Dispatch summary
            </Button>
          </div>
        }
        description="Track ranger readiness, field assignments, communications posture, and deployment context across protected reserve sectors."
        eyebrow="Field operations"
        title="Rangers"
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
            Reviewing {filteredRoster.length} of {workspace.roster.length} ranger units
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-5">
        {workspace.summary.map((item) => (
          <RangerSummaryCard item={item} key={item.id} />
        ))}
      </div>

      <RangersToolbar
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
                Ranger roster
              </p>
              <h2 className="text-xl font-semibold text-text-primary">
                Field operations readiness
              </h2>
              <p className="text-sm leading-7 text-text-muted">
                Review assignment coverage, communications posture, and unit
                readiness across the operational field roster.
              </p>
            </div>

            {filteredRoster.length > 0 ? (
              <div className="space-y-3">
                <div className="hidden grid-cols-[120px_180px_110px_140px_130px_130px_110px] gap-4 border-b border-border-subtle/80 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted xl:grid">
                  <span>Callsign</span>
                  <span>Team</span>
                  <span>Status</span>
                  <span>Zone</span>
                  <span>Comms</span>
                  <span>Readiness</span>
                  <span>Incidents</span>
                </div>
                <div className="space-y-3">
                  {filteredRoster.map((ranger) => (
                    <RangerRow
                      isSelected={ranger.id === selectedRanger?.id}
                      key={ranger.id}
                      onSelect={setSelectedRangerId}
                      ranger={ranger}
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
                description="No ranger units match the current filter set. Clear or relax the filters to restore the full roster."
                title="No ranger units match these filters"
              />
            )}
          </CardContent>
        </Card>

        <RangerDetailPanel ranger={selectedRanger} />
      </div>
    </div>
  );
}
