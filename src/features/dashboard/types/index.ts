export type CommandCenterKpiId =
  | "rhinos_detected"
  | "active_threats"
  | "ranger_units_online"
  | "system_uptime";

export type CommandCenterTone = "safe" | "warning" | "critical" | "neutral";

export interface CommandCenterKpi {
  id: CommandCenterKpiId;
  label: string;
  value: string;
  delta: string;
  supportingText: string;
  tone: CommandCenterTone;
}

export type LiveEventType = "rhino" | "poacher" | "vehicle";
export type LiveEventSeverity = "safe" | "warning" | "critical";
export type LiveEventStatus =
  | "monitoring"
  | "verified"
  | "tracking"
  | "dispatching";

export interface LiveEvent {
  id: string;
  type: LiveEventType;
  confidence: number;
  timestamp: string;
  zone: string;
  severity: LiveEventSeverity;
  status: LiveEventStatus;
  coordinates: string;
  message: string;
}

export interface MapZoneSummary {
  id: string;
  label: string;
  status: "stable" | "watch" | "critical";
  coverage: string;
}

export interface MapPing {
  id: string;
  label: string;
  type: LiveEventType;
  severity: LiveEventSeverity;
  top: string;
  left: string;
}

export interface ReserveOverviewItem {
  id: string;
  label: string;
  value: string;
  supportingText: string;
}

export interface IncidentItem {
  id: string;
  title: string;
  severity: Extract<LiveEventSeverity, "warning" | "critical">;
  zone: string;
  timestamp: string;
  action: string;
}
