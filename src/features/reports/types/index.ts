import type { DataSource } from "@/types";

export type ReportAudience =
  | "ngo"
  | "reserve_management"
  | "field_operations"
  | "investors";

export type ReportFormat = "pdf" | "csv" | "web";
export type ReportFreshness = "current" | "scheduled" | "needs_refresh";

export interface ReportCatalogItem {
  id: string;
  title: string;
  description: string;
  generatedAt: string;
  audience: ReportAudience;
  formats: ReportFormat[];
  freshness: ReportFreshness;
  reportingPeriod: string;
  includedSections: string[];
  keyMetricsPreview: string[];
}

export interface ReportSummaryMetric {
  id:
    | "reports_available"
    | "last_generated"
    | "incident_coverage"
    | "response_snapshot"
    | "stakeholder_coverage";
  label: string;
  value: string;
  supportingText: string;
  tone: "safe" | "warning" | "critical" | "neutral";
}

export interface StakeholderInsight {
  id: ReportAudience;
  title: string;
  description: string;
  emphasis: string;
}

export interface ReportsFilterState {
  search: string;
  audience: ReportAudience | "all";
  freshness: ReportFreshness | "all";
}

export interface ReportsWorkspaceData {
  catalog: ReportCatalogItem[];
  summary: ReportSummaryMetric[];
  stakeholderInsights: StakeholderInsight[];
}

export interface ReportsWorkspaceResult {
  workspace: ReportsWorkspaceData;
  source: DataSource;
  message?: string;
  updatedAt: string;
}
