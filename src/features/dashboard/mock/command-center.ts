import type {
  CommandCenterKpi,
  IncidentItem,
  LiveEvent,
  MapPing,
  MapZoneSummary,
  ReserveOverviewItem,
} from "@/features/dashboard/types";

export const commandCenterKpis: readonly CommandCenterKpi[] = [
  {
    id: "rhinos_detected",
    label: "Rhinos detected",
    value: "24",
    delta: "+3 in the last hour",
    supportingText: "Verified wildlife movement across monitored corridors.",
    tone: "safe",
  },
  {
    id: "active_threats",
    label: "Active threats",
    value: "4",
    delta: "2 require escalation",
    supportingText: "Vehicle and perimeter anomalies under active review.",
    tone: "critical",
  },
  {
    id: "ranger_units_online",
    label: "Ranger units online",
    value: "18",
    delta: "92% readiness",
    supportingText: "Field teams connected across northern and eastern zones.",
    tone: "neutral",
  },
  {
    id: "system_uptime",
    label: "System uptime",
    value: "99.94%",
    delta: "Stable over 30 days",
    supportingText: "Detection and coordination services remain operational.",
    tone: "safe",
  },
] as const;

export const liveEvents: readonly LiveEvent[] = [
  {
    id: "evt-001",
    type: "rhino",
    confidence: 98,
    timestamp: "14:32 CAT",
    zone: "North Waterline",
    severity: "safe",
    status: "verified",
    coordinates: "-24.815, 31.412",
    message: "Two white rhinos confirmed moving along the protected waterline corridor.",
  },
  {
    id: "evt-002",
    type: "vehicle",
    confidence: 88,
    timestamp: "14:28 CAT",
    zone: "East Perimeter",
    severity: "warning",
    status: "tracking",
    coordinates: "-24.821, 31.468",
    message: "Unscheduled vehicle pattern detected near the eastern service route.",
  },
  {
    id: "evt-003",
    type: "poacher",
    confidence: 91,
    timestamp: "14:21 CAT",
    zone: "Sector C3",
    severity: "critical",
    status: "dispatching",
    coordinates: "-24.804, 31.439",
    message: "Thermal movement and route behavior indicate a likely poaching threat.",
  },
  {
    id: "evt-004",
    type: "rhino",
    confidence: 95,
    timestamp: "14:17 CAT",
    zone: "Western Basin",
    severity: "safe",
    status: "monitoring",
    coordinates: "-24.798, 31.387",
    message: "Rhino herd movement remains stable within the western basin zone.",
  },
  {
    id: "evt-005",
    type: "vehicle",
    confidence: 79,
    timestamp: "14:09 CAT",
    zone: "South Access Road",
    severity: "warning",
    status: "monitoring",
    coordinates: "-24.844, 31.451",
    message: "Vehicle linger time exceeds expected route window near controlled access.",
  },
  {
    id: "evt-006",
    type: "poacher",
    confidence: 86,
    timestamp: "13:58 CAT",
    zone: "North Ridge",
    severity: "critical",
    status: "dispatching",
    coordinates: "-24.789, 31.401",
    message: "Potential intrusion route identified near the northern ridge boundary.",
  },
] as const;

export const mapZoneSummaries: readonly MapZoneSummary[] = [
  {
    id: "zone-a",
    label: "North Waterline",
    status: "stable",
    coverage: "4 camera clusters online",
  },
  {
    id: "zone-b",
    label: "East Perimeter",
    status: "watch",
    coverage: "Vehicle anomaly under review",
  },
  {
    id: "zone-c",
    label: "Sector C3",
    status: "critical",
    coverage: "Threat escalation active",
  },
  {
    id: "zone-d",
    label: "Western Basin",
    status: "stable",
    coverage: "Wildlife movement verified",
  },
] as const;

export const mapPings: readonly MapPing[] = [
  {
    id: "ping-1",
    label: "Rhino herd",
    type: "rhino",
    severity: "safe",
    top: "24%",
    left: "38%",
  },
  {
    id: "ping-2",
    label: "Vehicle alert",
    type: "vehicle",
    severity: "warning",
    top: "48%",
    left: "71%",
  },
  {
    id: "ping-3",
    label: "Threat route",
    type: "poacher",
    severity: "critical",
    top: "60%",
    left: "55%",
  },
  {
    id: "ping-4",
    label: "Patrol sync",
    type: "vehicle",
    severity: "warning",
    top: "72%",
    left: "29%",
  },
] as const;

export const reserveOverview: readonly ReserveOverviewItem[] = [
  {
    id: "coverage",
    label: "Reserve coverage",
    value: "87%",
    supportingText: "Camera, thermal, and perimeter telemetry currently online.",
  },
  {
    id: "zones",
    label: "Active monitoring zones",
    value: "12",
    supportingText: "Four high-priority corridors and eight protected patrol sectors.",
  },
  {
    id: "patrol",
    label: "Patrol coverage",
    value: "6 / 7",
    supportingText: "Most ranger teams are deployed or on standby for dispatch.",
  },
  {
    id: "incidents",
    label: "Incidents today",
    value: "09",
    supportingText: "Includes wildlife sightings, perimeter anomalies, and alerts.",
  },
] as const;

export const recentIncidents: readonly IncidentItem[] = [
  {
    id: "inc-101",
    title: "Vehicle alert escalated for eastern service route",
    severity: "critical",
    zone: "East Perimeter",
    timestamp: "14:28 CAT",
    action: "Operations lead notified and ranger response initiated.",
  },
  {
    id: "inc-102",
    title: "Thermal movement flagged near northern ridge boundary",
    severity: "warning",
    zone: "North Ridge",
    timestamp: "13:58 CAT",
    action: "Pattern under review pending additional visual confirmation.",
  },
  {
    id: "inc-103",
    title: "Rhino movement verified in western basin corridor",
    severity: "warning",
    zone: "Western Basin",
    timestamp: "13:44 CAT",
    action: "Marked for analyst follow-up and habitat tracking continuity.",
  },
] as const;

export const commandCenterMockState = {
  liveEvents,
  summaryMetrics: commandCenterKpis,
  reserveZones: mapZoneSummaries,
  reserveOverview,
  recentIncidents,
} as const;
