import type { EventSeverity, Incident, LiveEvent, ReserveZone } from "@/types";

export interface AnalyticsMetric {
  id:
    | "total_detections"
    | "rhino_sightings"
    | "threat_incidents"
    | "average_response_time"
    | "alert_resolution_rate";
  label: string;
  value: string;
  delta: string;
  supportingText: string;
  tone: "safe" | "warning" | "critical" | "neutral";
}

export interface AnalyticsTrendPoint {
  label: string;
  value: number;
}

export interface AnalyticsTrendSeries {
  id: "detection_volume" | "threat_activity" | "rhino_vs_threat";
  title: string;
  description: string;
  tone: "emerald" | "amber" | "mixed";
  points: AnalyticsTrendPoint[];
}

export interface ThreatBreakdownItem {
  id: string;
  label: string;
  value: string;
  share: number;
  tone: Extract<EventSeverity, "warning" | "critical">;
}

export interface ZoneActivitySummary {
  id: string;
  zone: ReserveZone["label"];
  activityLevel: "high" | "medium" | "low";
  wildlifeDensity: string;
  patrolCoverage: string;
  status: ReserveZone["status"];
}

export interface ResponsePerformanceItem {
  id: string;
  label: string;
  value: string;
  supportingText: string;
}

export interface AnalyticsPageData {
  metrics: readonly AnalyticsMetric[];
  trendSeries: readonly AnalyticsTrendSeries[];
  threatBreakdown: readonly ThreatBreakdownItem[];
  zoneActivity: readonly ZoneActivitySummary[];
  responsePerformance: readonly ResponsePerformanceItem[];
  mostActiveZones: readonly ZoneActivitySummary[];
  safestZones: readonly ZoneActivitySummary[];
  recentEvents: readonly LiveEvent[];
  recentIncidents: readonly Incident[];
}
