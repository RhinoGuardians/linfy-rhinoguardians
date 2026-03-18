import {
  Download,
  FileDown,
  FileSpreadsheet,
  Layers3,
  Send,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReportStatusBadge } from "@/features/reports/components/report-status-badge";
import type { ReportCatalogItem } from "@/features/reports/types";

interface ReportPreviewPanelProps {
  report: ReportCatalogItem | null;
}

export function ReportPreviewPanel({ report }: ReportPreviewPanelProps) {
  if (!report) {
    return (
      <EmptyState
        description="Select a report to review its audience, key metrics, included sections, and export options."
        title="No report selected"
      />
    );
  }

  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            Report preview
          </p>
          <h2 className="text-xl font-semibold text-text-primary">
            {report.title}
          </h2>
          <p className="text-sm leading-7 text-text-muted">{report.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ReportStatusBadge kind="audience" value={report.audience} />
          <ReportStatusBadge kind="freshness" value={report.freshness} />
          {report.formats.map((format) => (
            <ReportStatusBadge key={format} kind="format" value={format} />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Reporting period
            </p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {report.reportingPeriod}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Latest available reporting window for this report.
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Last generated
            </p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {report.generatedAt}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Most recent publishing time for stakeholder distribution.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <Layers3 className="h-4 w-4 text-brand-secondary" />
            Included sections
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {report.includedSections.map((section) => (
              <span
                className="rounded-full border border-border-subtle/80 bg-surface/88 px-3 py-1 text-xs text-text-muted"
                key={section}
              >
                {section}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
          <p className="text-sm font-medium text-text-primary">Key metrics preview</p>
          <div className="mt-3 grid gap-3">
            {report.keyMetricsPreview.map((metric) => (
              <div
                className="rounded-2xl border border-border-subtle/80 bg-surface/88 px-4 py-3 text-sm text-text-muted"
                key={metric}
              >
                {metric}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Button size="sm" type="button" variant="secondary">
            <FileDown className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button size="sm" type="button" variant="secondary">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button size="sm" type="button" variant="primary">
            <Send className="mr-2 h-4 w-4" />
            Generate report
          </Button>
        </div>

        <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
            <Download className="h-4 w-4 text-brand-secondary" />
            Distribution notes
          </div>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Distribution workflow placeholder: route this report to partner NGOs,
            reserve leadership, operations teams, or investor stakeholders once
            backend distribution rules are available.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
