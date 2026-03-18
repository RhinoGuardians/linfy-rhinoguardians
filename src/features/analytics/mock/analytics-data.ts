import { commandCenterMockState } from "@/features/dashboard/mock/command-center";
import type {
  AnalyticsMetric,
  AnalyticsPageData,
  AnalyticsTrendSeries,
  ResponsePerformanceItem,
  ThreatBreakdownItem,
  ZoneActivitySummary,
} from "@/features/analytics/types";

export const analyticsMetrics: readonly AnalyticsMetric[] = [
  {
    id: "total_detections",
    label: "Total detections",
    value: "1,284",
    delta: "+12.4% vs last period",
    supportingText: "Cross-zone wildlife and anomaly detection volume.",
    tone: "neutral",
  },
  {
    id: "rhino_sightings",
    label: "Rhino sightings",
    value: "412",
    delta: "+6.1% verified movement",
    supportingText: "Confirmed wildlife sightings across protected corridors.",
    tone: "safe",
  },
  {
    id: "threat_incidents",
    label: "Threat incidents",
    value: "37",
    delta: "-8.3% from prior cycle",
    supportingText: "Poacher and vehicle-related escalations under monitoring.",
    tone: "critical",
  },
  {
    id: "average_response_time",
    label: "Average response time",
    value: "6m 42s",
    delta: "-54s improvement",
    supportingText: "Median response window for verified field escalations.",
    tone: "warning",
  },
  {
    id: "alert_resolution_rate",
    label: "Alert resolution rate",
    value: "91%",
    delta: "+4.7% operational closure",
    supportingText: "Resolved or contained alerts across monitored reserves.",
    tone: "safe",
  },
] as const;

export const analyticsTrendSeries: readonly AnalyticsTrendSeries[] = [
  {
    id: "detection_volume",
    title: "Detection volume",
    description: "Detection activity across the last seven reporting windows.",
    tone: "emerald",
    points: [
      { label: "Mon", value: 72 },
      { label: "Tue", value: 86 },
      { label: "Wed", value: 78 },
      { label: "Thu", value: 98 },
      { label: "Fri", value: 110 },
      { label: "Sat", value: 104 },
      { label: "Sun", value: 118 },
    ],
  },
  {
    id: "threat_activity",
    title: "Threat activity",
    description: "Critical and warning activity requiring operational review.",
    tone: "amber",
    points: [
      { label: "Mon", value: 22 },
      { label: "Tue", value: 18 },
      { label: "Wed", value: 24 },
      { label: "Thu", value: 16 },
      { label: "Fri", value: 19 },
      { label: "Sat", value: 14 },
      { label: "Sun", value: 12 },
    ],
  },
  {
    id: "rhino_vs_threat",
    title: "Rhino vs threat distribution",
    description: "Wildlife verification volume against escalated threat signals.",
    tone: "mixed",
    points: [
      { label: "Wildlife", value: 68 },
      { label: "Threat", value: 21 },
      { label: "Vehicle", value: 11 },
    ],
  },
] as const;

export const threatBreakdown: readonly ThreatBreakdownItem[] = [
  {
    id: "poacher-alerts",
    label: "Poacher alerts",
    value: "18",
    share: 48,
    tone: "critical",
  },
  {
    id: "vehicle-alerts",
    label: "Vehicle alerts",
    value: "12",
    share: 32,
    tone: "warning",
  },
  {
    id: "warning-events",
    label: "Warning events",
    value: "21",
    share: 57,
    tone: "warning",
  },
  {
    id: "critical-events",
    label: "Critical events",
    value: "16",
    share: 43,
    tone: "critical",
  },
] as const;

export const zoneActivity: readonly ZoneActivitySummary[] = [
  {
    id: "north-waterline",
    zone: "North Waterline",
    activityLevel: "high",
    wildlifeDensity: "High wildlife movement",
    patrolCoverage: "4 patrol units nearby",
    status: "stable",
  },
  {
    id: "east-perimeter",
    zone: "East Perimeter",
    activityLevel: "high",
    wildlifeDensity: "Moderate wildlife / elevated vehicle activity",
    patrolCoverage: "2 units monitoring perimeter route",
    status: "watch",
  },
  {
    id: "sector-c3",
    zone: "Sector C3",
    activityLevel: "medium",
    wildlifeDensity: "Low wildlife / elevated threat concentration",
    patrolCoverage: "Rapid response team dispatched",
    status: "critical",
  },
  {
    id: "western-basin",
    zone: "Western Basin",
    activityLevel: "low",
    wildlifeDensity: "Stable rhino herd movement",
    patrolCoverage: "3 patrol loops active",
    status: "stable",
  },
] as const;

export const responsePerformance: readonly ResponsePerformanceItem[] = [
  {
    id: "avg-response",
    label: "Average response time",
    value: "6m 42s",
    supportingText: "From verified alert to ranger acknowledgment.",
  },
  {
    id: "resolved",
    label: "Incidents resolved",
    value: "29",
    supportingText: "Resolved or contained within the current reporting cycle.",
  },
  {
    id: "escalations",
    label: "Active escalations",
    value: "4",
    supportingText: "Events requiring senior operations oversight right now.",
  },
  {
    id: "readiness",
    label: "Ranger readiness",
    value: "92%",
    supportingText: "Teams available, equipped, and ready for dispatch.",
  },
] as const;

export const analyticsPageData: AnalyticsPageData = {
  metrics: analyticsMetrics,
  trendSeries: analyticsTrendSeries,
  threatBreakdown,
  zoneActivity,
  responsePerformance,
  mostActiveZones: zoneActivity.filter((zone) => zone.activityLevel === "high"),
  safestZones: zoneActivity.filter((zone) => zone.status === "stable"),
  recentEvents: commandCenterMockState.liveEvents,
  recentIncidents: commandCenterMockState.recentIncidents,
} as const;
