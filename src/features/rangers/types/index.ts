import type { DataSource, RangerUnit, ReserveZone } from "@/types";

export interface RangersFilterState {
  search: string;
  status: RangerUnit["status"] | "all";
  zone: string | "all";
  communicationStatus: RangerUnit["communicationStatus"] | "all";
  readinessBand: "all" | "high" | "medium" | "low";
}

export interface RangerSummaryItem {
  id:
    | "units_online"
    | "deployed_units"
    | "standby_units"
    | "average_readiness"
    | "covered_zones";
  label: string;
  value: string;
  supportingText: string;
  tone: "safe" | "warning" | "critical" | "neutral";
}

export interface RangersWorkspaceData {
  roster: RangerUnit[];
  availableZones: ReserveZone[];
  summary: RangerSummaryItem[];
}

export interface RangersWorkspaceResult {
  workspace: RangersWorkspaceData;
  source: DataSource;
  message?: string;
  updatedAt: string;
}
