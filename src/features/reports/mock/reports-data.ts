import type {
  ReportCatalogItem,
  ReportSummaryMetric,
  ReportsWorkspaceData,
  StakeholderInsight,
} from "@/features/reports/types";

export const reportCatalogMockData: readonly ReportCatalogItem[] = [
  {
    id: "weekly-conservation-summary",
    title: "Weekly Conservation Summary",
    description:
      "A concise weekly overview of wildlife movement, reserve incidents, and monitoring performance.",
    generatedAt: "Today, 14:10 CAT",
    audience: "ngo",
    formats: ["pdf", "web"],
    freshness: "current",
    reportingPeriod: "Last 7 days",
    includedSections: [
      "Wildlife detections",
      "Threat alerts",
      "Reserve coverage",
      "Key conservation notes",
    ],
    keyMetricsPreview: ["128 detections", "7 critical alerts", "91% coverage"],
  },
  {
    id: "monthly-incident-report",
    title: "Monthly Incident Report",
    description:
      "An operations-ready summary of escalations, incident response, and containment actions.",
    generatedAt: "Yesterday, 18:45 CAT",
    audience: "field_operations",
    formats: ["pdf", "csv", "web"],
    freshness: "current",
    reportingPeriod: "Last 30 days",
    includedSections: [
      "Incident timeline",
      "Response actions",
      "Escalation notes",
      "Zone concentration",
    ],
    keyMetricsPreview: ["37 incidents", "6m 42s avg response", "29 resolved"],
  },
  {
    id: "reserve-activity-report",
    title: "Reserve Activity Report",
    description:
      "Reserve-wide visibility into wildlife movement, monitored zones, and operational continuity.",
    generatedAt: "Today, 11:20 CAT",
    audience: "reserve_management",
    formats: ["pdf", "web"],
    freshness: "current",
    reportingPeriod: "Current month",
    includedSections: [
      "Zone activity",
      "Monitoring uptime",
      "Patrol coverage",
      "Operational commentary",
    ],
    keyMetricsPreview: ["12 active zones", "99.94% uptime", "87% coverage"],
  },
  {
    id: "ranger-readiness-report",
    title: "Ranger Readiness Report",
    description:
      "A field-operations snapshot focused on team availability, readiness, and communications posture.",
    generatedAt: "Today, 09:30 CAT",
    audience: "field_operations",
    formats: ["pdf", "csv", "web"],
    freshness: "scheduled",
    reportingPeriod: "Daily readiness cycle",
    includedSections: [
      "Unit roster",
      "Assignment coverage",
      "Communications health",
      "Readiness scoring",
    ],
    keyMetricsPreview: ["5 units online", "87% avg readiness", "7 covered zones"],
  },
  {
    id: "threat-intelligence-summary",
    title: "Threat Intelligence Summary",
    description:
      "Analyst-focused view of suspicious routes, intrusion patterns, and priority threat signals.",
    generatedAt: "Today, 13:05 CAT",
    audience: "reserve_management",
    formats: ["pdf", "web"],
    freshness: "current",
    reportingPeriod: "Last 14 days",
    includedSections: [
      "Threat distribution",
      "High-risk corridors",
      "Signal confidence",
      "Mitigation outlook",
    ],
    keyMetricsPreview: ["16 critical events", "4 high-risk corridors", "88% avg confidence"],
  },
  {
    id: "executive-impact-snapshot",
    title: "Executive Impact Snapshot",
    description:
      "Stakeholder-ready summary designed for leadership, donors, and investors following reserve impact.",
    generatedAt: "3 days ago",
    audience: "investors",
    formats: ["pdf", "web"],
    freshness: "needs_refresh",
    reportingPeriod: "Quarter to date",
    includedSections: [
      "Conservation outcomes",
      "Operational resilience",
      "Threat reduction",
      "Platform value summary",
    ],
    keyMetricsPreview: ["412 rhino sightings", "91% resolution rate", "8.3% threat reduction"],
  },
] as const;

export const reportsSummaryMockData: readonly ReportSummaryMetric[] = [
  {
    id: "reports_available",
    label: "Reports available",
    value: "6",
    supportingText: "Operational and stakeholder-ready reporting templates currently available.",
    tone: "neutral",
  },
  {
    id: "last_generated",
    label: "Last generated",
    value: "14:10 CAT",
    supportingText: "Most recent reporting snapshot published for review and export.",
    tone: "safe",
  },
  {
    id: "incident_coverage",
    label: "Incident coverage",
    value: "97%",
    supportingText: "Share of monthly incidents represented in the reporting catalog.",
    tone: "warning",
  },
  {
    id: "response_snapshot",
    label: "Response snapshot",
    value: "6m 42s",
    supportingText: "Current average response performance reflected in the latest summaries.",
    tone: "safe",
  },
  {
    id: "stakeholder_coverage",
    label: "Stakeholder coverage",
    value: "4 groups",
    supportingText: "NGO, reserve, field operations, and investor audiences supported.",
    tone: "neutral",
  },
] as const;

export const stakeholderInsightsMockData: readonly StakeholderInsight[] = [
  {
    id: "ngo",
    title: "NGO reporting",
    description:
      "Provide conservation partners with audit-ready summaries of wildlife activity, alerts, and field response.",
    emphasis: "Outcome visibility",
  },
  {
    id: "reserve_management",
    title: "Reserve management",
    description:
      "Keep reserve leadership aligned on patrol coverage, reserve intelligence, and operational continuity.",
    emphasis: "Operational clarity",
  },
  {
    id: "field_operations",
    title: "Field operations",
    description:
      "Help operations teams review incidents, ranger readiness, and active reserve coordination from one reporting surface.",
    emphasis: "Execution readiness",
  },
  {
    id: "investors",
    title: "Donors and investors",
    description:
      "Translate conservation intelligence into a calmer, stakeholder-friendly summary of impact and platform value.",
    emphasis: "Trust and impact",
  },
] as const;

export const reportsWorkspaceMockData: ReportsWorkspaceData = {
  catalog: [...reportCatalogMockData],
  summary: [...reportsSummaryMockData],
  stakeholderInsights: [...stakeholderInsightsMockData],
};
