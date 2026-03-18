import { RadioTower, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { RangersFilterState } from "@/features/rangers/types";
import type { RangerUnit, ReserveZone } from "@/types";

interface RangersToolbarProps {
  filters: RangersFilterState;
  onChange: (nextFilters: RangersFilterState) => void;
  onClear: () => void;
  zones: readonly ReserveZone[];
}

const statusOptions: readonly (RangerUnit["status"] | "all")[] = [
  "all",
  "online",
  "deployed",
  "standby",
  "offline",
] as const;

const communicationOptions: readonly (
  | RangerUnit["communicationStatus"]
  | "all"
)[] = ["all", "connected", "intermittent", "offline"] as const;

const readinessOptions: readonly RangersFilterState["readinessBand"][] = [
  "all",
  "high",
  "medium",
  "low",
] as const;

function updateFilter<TKey extends keyof RangersFilterState>(
  filters: RangersFilterState,
  key: TKey,
  value: RangersFilterState[TKey],
) {
  return {
    ...filters,
    [key]: value,
  };
}

export function RangersToolbar({
  filters,
  onChange,
  onClear,
  zones,
}: RangersToolbarProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            Filter and coordinate
          </p>
          <p className="text-sm leading-7 text-text-muted">
            Narrow the ranger roster by readiness, communication stability, and
            field assignment to support faster operational decisions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_repeat(4,minmax(0,0.8fr))]">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Search
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                aria-label="Search ranger units"
                className="dashboard-filter-input pl-10"
                onChange={(event) =>
                  onChange(updateFilter(filters, "search", event.target.value))
                }
                placeholder="Search by callsign, unit, team, or zone"
                value={filters.search}
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Status
            </span>
            <select
              aria-label="Filter rangers by status"
              className="dashboard-filter-select"
              onChange={(event) =>
                onChange(
                  updateFilter(
                    filters,
                    "status",
                    event.target.value as RangersFilterState["status"],
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

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Assigned zone
            </span>
            <select
              aria-label="Filter rangers by assigned zone"
              className="dashboard-filter-select"
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
              Communications
            </span>
            <select
              aria-label="Filter rangers by communication status"
              className="dashboard-filter-select"
              onChange={(event) =>
                onChange(
                  updateFilter(
                    filters,
                    "communicationStatus",
                    event.target.value as RangersFilterState["communicationStatus"],
                  ),
                )
              }
              value={filters.communicationStatus}
            >
              {communicationOptions.map((option) => (
                <option className="bg-[#0c1714]" key={option} value={option}>
                  {option === "all" ? "All communication states" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Readiness
            </span>
            <select
              aria-label="Filter rangers by readiness band"
              className="dashboard-filter-select"
              onChange={(event) =>
                onChange(
                  updateFilter(
                    filters,
                    "readinessBand",
                    event.target.value as RangersFilterState["readinessBand"],
                  ),
                )
              }
              value={filters.readinessBand}
            >
              {readinessOptions.map((option) => (
                <option className="bg-[#0c1714]" key={option} value={option}>
                  {option === "all" ? "All readiness bands" : option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-3 text-sm text-text-muted">
            <RadioTower className="h-4 w-4 text-brand-secondary" />
            Communications and readiness are refreshed from the same field
            roster snapshot.
          </div>
          <Button onClick={onClear} size="sm" type="button" variant="ghost">
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
