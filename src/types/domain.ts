export type EventType = "rhino" | "poacher" | "vehicle";
export type EventSeverity = "safe" | "warning" | "critical";
export type EventStatus =
  | "monitoring"
  | "verified"
  | "tracking"
  | "dispatching";

export type SummaryMetricId =
  | "rhinos_detected"
  | "active_threats"
  | "ranger_units_online"
  | "system_uptime";

export type MetricTone = "safe" | "warning" | "critical" | "neutral";

export interface SummaryMetric {
  id: SummaryMetricId;
  label: string;
  value: string;
  delta: string;
  supportingText: string;
  tone: MetricTone;
}

export interface LiveEvent {
  id: string;
  type: EventType;
  confidence: number;
  timestamp: string;
  zone: string;
  severity: EventSeverity;
  status: EventStatus;
  coordinates: string;
  message: string;
}

export interface AlertEvent {
  id: string;
  sourceEventId: string;
  severity: Extract<EventSeverity, "warning" | "critical">;
  zone: string;
  status: EventStatus;
  message: string;
}

export interface ReserveZone {
  id: string;
  label: string;
  status: "stable" | "watch" | "critical";
  coverage: string;
}

export interface ReserveOverviewItem {
  id: string;
  label: string;
  value: string;
  supportingText: string;
}

export interface RangerUnit {
  id: string;
  teamName: string;
  status: "available" | "deployed" | "offline";
}

export interface Incident {
  id: string;
  title: string;
  severity: Extract<EventSeverity, "warning" | "critical">;
  zone: string;
  timestamp: string;
  action: string;
}

export interface ReportSummary {
  id: string;
  title: string;
  generatedAt: string;
}

