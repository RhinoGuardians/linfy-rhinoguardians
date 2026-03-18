import { CalendarRange, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DetectionsFilterState } from "@/features/detections/types";
import type { EventSeverity, EventStatus, EventType, ReserveZone } from "@/types";

interface DetectionsToolbarProps {
  filters: DetectionsFilterState;
  onChange: (nextFilters: DetectionsFilterState) => void;
  onClear: () => void;
  zones: readonly ReserveZone[];
}

const typeOptions: readonly (EventType | "all")[] = [
  "all",
  "rhino",
  "poacher",
  "vehicle",
] as const;

const severityOptions: readonly (EventSeverity | "all")[] = [
  "all",
  "safe",
  "warning",
  "critical",
] as const;

const statusOptions: readonly (EventStatus | "all")[] = [
  "all",
  "monitoring",
  "verified",
  "tracking",
  "dispatching",
] as const;

function updateFilter<TKey extends keyof DetectionsFilterState>(
  filters: DetectionsFilterState,
  key: TKey,
  value: DetectionsFilterState[TKey],
) {
  return {
    ...filters,
    [key]: value,
  };
}

export function DetectionsToolbar({
  filters,
  onChange,
  onClear,
  zones,
}: DetectionsToolbarProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
              Filter and triage
            </p>
            <p className="text-sm leading-7 text-text-muted">
              Narrow wildlife signals, threat indicators, and monitored routes
              using operational filters designed for rapid review.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-3 text-sm text-text-muted">
            <CalendarRange className="h-4 w-4 text-brand-secondary" />
            Date range: Last 24 hours
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.25fr)_repeat(4,minmax(0,0.85fr))]">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Search
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                className="h-11 w-full rounded-xl border border-border-subtle/80 bg-canvas/45 pl-10 pr-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-primary/35"
                onChange={(event) =>
                  onChange(updateFilter(filters, "search", event.target.value))
                }
                placeholder="Search by id, message, zone, or coordinates"
                value={filters.search}
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Type
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border-subtle/80 bg-canvas/45 px-4 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary/35"
              onChange={(event) =>
                onChange(
                  updateFilter(
                    filters,
                    "type",
                    event.target.value as DetectionsFilterState["type"],
                  ),
                )
              }
              value={filters.type}
            >
              {typeOptions.map((option) => (
                <option className="bg-[#0c1714]" key={option} value={option}>
                  {option === "all" ? "All types" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Severity
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border-subtle/80 bg-canvas/45 px-4 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary/35"
              onChange={(event) =>
                onChange(
                  updateFilter(
                    filters,
                    "severity",
                    event.target.value as DetectionsFilterState["severity"],
                  ),
                )
              }
              value={filters.severity}
            >
              {severityOptions.map((option) => (
                <option className="bg-[#0c1714]" key={option} value={option}>
                  {option === "all" ? "All severities" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Zone
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border-subtle/80 bg-canvas/45 px-4 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary/35"
              onChange={(event) =>
                onChange(updateFilter(filters, "zone", event.target.value))
              }
              value={filters.zone}
            >
              <option className="bg-[#0c1714]" value="all">
                All zones
              </option>
              {zones.map((zone) => (
                <option
                  className="bg-[#0c1714]"
                  key={zone.id}
                  value={zone.label}
                >
                  {zone.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Status
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border-subtle/80 bg-canvas/45 px-4 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary/35"
              onChange={(event) =>
                onChange(
                  updateFilter(
                    filters,
                    "status",
                    event.target.value as DetectionsFilterState["status"],
                  ),
                )
              }
              value={filters.status}
            >
              {statusOptions.map((option) => (
                <option className="bg-[#0c1714]" key={option} value={option}>
                  {option === "all" ? "All statuses" : option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClear} size="sm" type="button" variant="ghost">
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
