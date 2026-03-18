import { Filter, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  ReportAudience,
  ReportFreshness,
  ReportsFilterState,
} from "@/features/reports/types";

interface ReportsToolbarProps {
  filters: ReportsFilterState;
  onChange: (nextFilters: ReportsFilterState) => void;
  onClear: () => void;
}

const audienceOptions: readonly (ReportAudience | "all")[] = [
  "all",
  "ngo",
  "reserve_management",
  "field_operations",
  "investors",
] as const;

const freshnessOptions: readonly (ReportFreshness | "all")[] = [
  "all",
  "current",
  "scheduled",
  "needs_refresh",
] as const;

function updateFilter<TKey extends keyof ReportsFilterState>(
  filters: ReportsFilterState,
  key: TKey,
  value: ReportsFilterState[TKey],
) {
  return {
    ...filters,
    [key]: value,
  };
}

export function ReportsToolbar({
  filters,
  onChange,
  onClear,
}: ReportsToolbarProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            Filter and group
          </p>
          <p className="text-sm leading-7 text-text-muted">
            Narrow report options by stakeholder audience or freshness to find
            the right summary for operational review or external distribution.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.8fr))]">
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
                placeholder="Search by report title, audience, or summary"
                value={filters.search}
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Audience
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border-subtle/80 bg-canvas/45 px-4 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary/35"
              onChange={(event) =>
                onChange(
                  updateFilter(
                    filters,
                    "audience",
                    event.target.value as ReportsFilterState["audience"],
                  ),
                )
              }
              value={filters.audience}
            >
              {audienceOptions.map((option) => (
                <option className="bg-[#0c1714]" key={option} value={option}>
                  {option === "all" ? "All audiences" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Freshness
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border-subtle/80 bg-canvas/45 px-4 text-sm text-text-primary outline-none transition-colors focus:border-brand-primary/35"
              onChange={(event) =>
                onChange(
                  updateFilter(
                    filters,
                    "freshness",
                    event.target.value as ReportsFilterState["freshness"],
                  ),
                )
              }
              value={filters.freshness}
            >
              {freshnessOptions.map((option) => (
                <option className="bg-[#0c1714]" key={option} value={option}>
                  {option === "all" ? "All freshness states" : option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-3 text-sm text-text-muted">
            <Filter className="h-4 w-4 text-brand-secondary" />
            Reporting options remain grouped for NGO, reserve, operations, and
            investor stakeholders.
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
