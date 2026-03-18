"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, FileDown, FilePlus2 } from "lucide-react";

import { DataSourceStatusCard } from "@/components/shared/data-source-status";
import { EmptyState } from "@/components/shared/empty-state";
import { ModuleLoadingState } from "@/components/shared/module-loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchReportsWorkspace } from "@/features/reports/api";
import { ReportCatalogCard } from "@/features/reports/components/report-catalog-card";
import { ReportPreviewPanel } from "@/features/reports/components/report-preview-panel";
import { ReportSummaryCard } from "@/features/reports/components/report-summary-card";
import { ReportsToolbar } from "@/features/reports/components/reports-toolbar";
import { StakeholderInsightCard } from "@/features/reports/components/stakeholder-insight-card";
import type {
  ReportCatalogItem,
  ReportsFilterState,
  ReportsWorkspaceData,
} from "@/features/reports/types";
import type { DataSource } from "@/types";

const initialFilters: ReportsFilterState = {
  search: "",
  audience: "all",
  freshness: "all",
};

export function ReportsOverview() {
  const [workspace, setWorkspace] = useState<ReportsWorkspaceData | null>(null);
  const [filters, setFilters] = useState<ReportsFilterState>(initialFilters);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<DataSource>("mock");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Loading reporting workspace...",
  );
  const hasRequestedWorkspace = useRef(false);

  useEffect(() => {
    let isActive = true;

    if (!hasRequestedWorkspace.current) {
      hasRequestedWorkspace.current = true;

      void fetchReportsWorkspace().then((result) => {
        if (!isActive) {
          return;
        }

        setWorkspace(result.data);
        setDataSource(result.source);
        setStatusMessage(
          result.source === "api"
            ? "Live reporting feed connected."
            : (result.message ?? "Using local reporting dataset."),
        );
        setSelectedReportId(result.data.catalog[0]?.id ?? null);
        setIsLoading(false);
      });
    }

    return () => {
      isActive = false;
    };
  }, []);

  const filteredCatalog = useMemo(() => {
    if (!workspace) {
      return [];
    }

    const normalizedSearch = filters.search.trim().toLowerCase();

    return workspace.catalog.filter((report) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          report.title,
          report.description,
          report.reportingPeriod,
          report.audience,
          report.keyMetricsPreview.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesAudience =
        filters.audience === "all" || report.audience === filters.audience;
      const matchesFreshness =
        filters.freshness === "all" || report.freshness === filters.freshness;

      return matchesSearch && matchesAudience && matchesFreshness;
    });
  }, [filters, workspace]);

  const selectedReport = useMemo<ReportCatalogItem | null>(() => {
    if (filteredCatalog.length === 0) {
      return null;
    }

    return (
      filteredCatalog.find((report) => report.id === selectedReportId) ??
      filteredCatalog[0] ??
      null
    );
  }, [filteredCatalog, selectedReportId]);

  useEffect(() => {
    if (
      filteredCatalog.length > 0 &&
      !filteredCatalog.some((report) => report.id === selectedReportId)
    ) {
      setSelectedReportId(filteredCatalog[0]?.id ?? null);
    }
  }, [filteredCatalog, selectedReportId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          description="Review stakeholder-ready conservation and operational reports across the RhinoGuardians platform."
          eyebrow="Reporting"
          title="Reports"
        />
        <ModuleLoadingState
          description="Preparing report definitions, stakeholder summaries, and export-ready preview context."
          title="Preparing reporting workspace"
        />
      </div>
    );
  }

  if (!workspace) {
    return (
      <EmptyState
        description="Reporting data is not available yet. Retry once the reporting feed is ready."
        title="Reporting workspace unavailable"
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        action={
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button
              aria-label="Generate stakeholder report"
              size="sm"
              type="button"
              variant="primary"
            >
              <FilePlus2 className="mr-2 h-4 w-4" />
              Generate report
            </Button>
            <Button
              aria-label="Export reports preview as PDF"
              size="sm"
              type="button"
              variant="secondary"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button
              aria-label="Export reports preview as CSV"
              size="sm"
              type="button"
              variant="secondary"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        }
        description="Prepare stakeholder-ready conservation, reserve, and operational reporting from one premium documentation surface."
        eyebrow="Reporting"
        title="Reports"
      />

      <DataSourceStatusCard
        message={statusMessage}
        meta={
          <span>
            Reviewing {filteredCatalog.length} of {workspace.catalog.length} reports
          </span>
        }
        source={dataSource}
      />

      <div className="grid gap-4 xl:grid-cols-5">
        {workspace.summary.map((item) => (
          <ReportSummaryCard item={item} key={item.id} />
        ))}
      </div>

      <ReportsToolbar
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(initialFilters)}
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_420px]">
        <Card className="border-border-subtle/80 bg-surface/88">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                Report catalog
              </p>
              <h2 className="text-xl font-semibold text-text-primary">
                Stakeholder-ready report options
              </h2>
              <p className="text-sm leading-7 text-text-muted">
                Select a report to preview reporting scope, intended audience,
                export options, and key impact metrics.
              </p>
            </div>

            {filteredCatalog.length > 0 ? (
              <div className="space-y-3">
                {filteredCatalog.map((report) => (
                  <ReportCatalogCard
                    isSelected={report.id === selectedReport?.id}
                    key={report.id}
                    onSelect={setSelectedReportId}
                    report={report}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                action={
                  <Button onClick={() => setFilters(initialFilters)} type="button">
                    Clear filters
                  </Button>
                }
                description="No reports match the current filter set. Clear or relax the filters to restore the full reporting catalog."
                title="No reports match these filters"
              />
            )}
          </CardContent>
        </Card>

        <ReportPreviewPanel report={selectedReport} />
      </div>

      <Card className="border-border-subtle/80 bg-surface/88">
        <CardContent className="space-y-5 p-5 sm:p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
              Stakeholder insights
            </p>
            <h2 className="text-xl font-semibold text-text-primary">
              Reporting value across the conservation ecosystem
            </h2>
            <p className="text-sm leading-7 text-text-muted">
              Support NGOs, reserve management, field operations, and investor
              stakeholders from one shared reporting surface.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workspace.stakeholderInsights.map((insight) => (
              <StakeholderInsightCard insight={insight} key={insight.id} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
