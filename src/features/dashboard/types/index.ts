export type {
  AlertEvent,
  Incident as IncidentItem,
  LiveEvent,
  ReserveOverviewItem,
  ReserveZone as MapZoneSummary,
  SummaryMetric as CommandCenterKpi,
} from "@/types";

export interface MapPing {
  id: string;
  label: string;
  type: import("@/types").EventType;
  severity: import("@/types").EventSeverity;
  top: string;
  left: string;
}
