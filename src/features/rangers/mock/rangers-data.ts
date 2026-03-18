import { commandCenterMockState } from "@/features/dashboard/mock/command-center";
import type {
  RangerSummaryItem,
  RangersWorkspaceData,
} from "@/features/rangers/types";
import type { RangerUnit, ReserveZone } from "@/types";

export const rangerRosterMockData: readonly RangerUnit[] = [
  {
    id: "rgr-01",
    callsign: "Alpha-1",
    teamName: "Northern Response Unit",
    status: "deployed",
    assignedZone: "North Ridge",
    lastActivityAt: "14:26 CAT",
    communicationStatus: "connected",
    readinessScore: 96,
    activeIncidentCount: 2,
    notes: "Supporting active perimeter response near the northern ridge corridor.",
  },
  {
    id: "rgr-02",
    callsign: "Bravo-2",
    teamName: "Eastern Patrol Team",
    status: "online",
    assignedZone: "East Perimeter",
    lastActivityAt: "14:19 CAT",
    communicationStatus: "connected",
    readinessScore: 92,
    activeIncidentCount: 1,
    notes: "Available for rapid dispatch along the perimeter service route.",
  },
  {
    id: "rgr-03",
    callsign: "Charlie-3",
    teamName: "Waterline Patrol Unit",
    status: "standby",
    assignedZone: "North Waterline",
    lastActivityAt: "14:03 CAT",
    communicationStatus: "connected",
    readinessScore: 89,
    activeIncidentCount: 0,
    notes: "Maintaining wildlife corridor coverage and standby posture.",
  },
  {
    id: "rgr-04",
    callsign: "Delta-4",
    teamName: "Western Basin Scouts",
    status: "online",
    assignedZone: "Western Basin",
    lastActivityAt: "13:48 CAT",
    communicationStatus: "intermittent",
    readinessScore: 78,
    activeIncidentCount: 0,
    notes: "Signal strength reduced in the basin, but visual patrol remains active.",
  },
  {
    id: "rgr-05",
    callsign: "Echo-5",
    teamName: "Southern Access Team",
    status: "deployed",
    assignedZone: "South Access Road",
    lastActivityAt: "13:41 CAT",
    communicationStatus: "connected",
    readinessScore: 94,
    activeIncidentCount: 1,
    notes: "Investigating vehicle anomaly and maintaining access control observation.",
  },
  {
    id: "rgr-06",
    callsign: "Foxtrot-6",
    teamName: "Sector C3 Response Team",
    status: "deployed",
    assignedZone: "Sector C3",
    lastActivityAt: "13:29 CAT",
    communicationStatus: "connected",
    readinessScore: 98,
    activeIncidentCount: 3,
    notes: "Assigned to elevated threat response within Sector C3.",
  },
  {
    id: "rgr-07",
    callsign: "Golf-7",
    teamName: "Southern Grasslands Patrol",
    status: "standby",
    assignedZone: "Southern Grasslands",
    lastActivityAt: "12:56 CAT",
    communicationStatus: "connected",
    readinessScore: 87,
    activeIncidentCount: 0,
    notes: "Prepared for wildlife corridor dispatch if movement intensity increases.",
  },
  {
    id: "rgr-08",
    callsign: "Hotel-8",
    teamName: "Reserve Logistics Support",
    status: "offline",
    assignedZone: "Operations Hub",
    lastActivityAt: "11:42 CAT",
    communicationStatus: "offline",
    readinessScore: 54,
    activeIncidentCount: 0,
    notes: "Unit offline for equipment checks and scheduled maintenance.",
  },
] as const;

export const rangerZonesMockData: readonly ReserveZone[] = [
  ...commandCenterMockState.reserveZones,
  {
    id: "zone-rgr-01",
    label: "South Access Road",
    status: "watch",
    coverage: "Vehicle activity corridor supported by ranger patrol rotation",
  },
  {
    id: "zone-rgr-02",
    label: "North Ridge",
    status: "critical",
    coverage: "Active perimeter response and escalation monitoring",
  },
  {
    id: "zone-rgr-03",
    label: "Southern Grasslands",
    status: "stable",
    coverage: "Wildlife corridor under routine field coverage",
  },
  {
    id: "zone-rgr-04",
    label: "Operations Hub",
    status: "stable",
    coverage: "Logistics coordination and unit support operations",
  },
] as const;

function buildRangerSummary(
  roster: readonly RangerUnit[],
  zones: readonly ReserveZone[],
): RangerSummaryItem[] {
  const onlineUnits = roster.filter(
    (unit) => unit.status === "online" || unit.status === "deployed",
  );
  const deployedUnits = roster.filter((unit) => unit.status === "deployed");
  const standbyUnits = roster.filter((unit) => unit.status === "standby");
  const averageReadiness = Math.round(
    roster.reduce((total, unit) => total + unit.readinessScore, 0) /
      roster.length,
  );

  return [
    {
      id: "units_online",
      label: "Units online",
      value: String(onlineUnits.length),
      supportingText: "Field units connected and visible across the reserve network.",
      tone: "safe",
    },
    {
      id: "deployed_units",
      label: "Deployed units",
      value: String(deployedUnits.length),
      supportingText: "Units currently assigned to active patrol or response coverage.",
      tone: "warning",
    },
    {
      id: "standby_units",
      label: "Standby units",
      value: String(standbyUnits.length),
      supportingText: "Teams ready for rapid redeployment or secondary support.",
      tone: "neutral",
    },
    {
      id: "average_readiness",
      label: "Average readiness",
      value: `${averageReadiness}%`,
      supportingText: "Combined readiness across communications, availability, and posture.",
      tone: averageReadiness >= 90 ? "safe" : averageReadiness >= 75 ? "warning" : "critical",
    },
    {
      id: "covered_zones",
      label: "Covered zones",
      value: String(new Set(zones.map((zone) => zone.label)).size),
      supportingText: "Operational sectors represented in the current ranger roster.",
      tone: "neutral",
    },
  ];
}

export const rangersWorkspaceMockData: RangersWorkspaceData = {
  roster: [...rangerRosterMockData],
  availableZones: [...rangerZonesMockData],
  summary: buildRangerSummary(rangerRosterMockData, rangerZonesMockData),
};
