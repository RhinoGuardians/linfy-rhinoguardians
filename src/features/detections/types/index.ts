import type {
  DataSource,
  EventSeverity,
  EventStatus,
  EventType,
  LiveEvent,
  ReserveZone,
} from "@/types";

export interface DetectionsFilterState {
  search: string;
  type: EventType | "all";
  severity: EventSeverity | "all";
  zone: string | "all";
  status: EventStatus | "all";
  dateRange: "today" | "7d" | "30d" | "all";
}

export interface DetectionSummaryItem {
  id:
    | "total_detections"
    | "rhino_detections"
    | "threat_detections"
    | "critical_alerts"
    | "monitored_zones";
  label: string;
  value: string;
  supportingText: string;
  tone: "safe" | "warning" | "critical" | "neutral";
}

export interface DetectionsWorkspaceData {
  detections: LiveEvent[];
  availableZones: ReserveZone[];
  summary: DetectionSummaryItem[];
}

export interface DetectionsWorkspaceResult {
  workspace: DetectionsWorkspaceData;
  source: DataSource;
  message?: string;
  updatedAt: string;
}
