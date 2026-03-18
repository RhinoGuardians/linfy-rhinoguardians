import { commandCenterMockState } from "@/features/dashboard/mock/command-center";
import type {
  DetectionSummaryItem,
  DetectionsWorkspaceData,
} from "@/features/detections/types";
import type { LiveEvent, ReserveZone } from "@/types";

const additionalDetections: readonly LiveEvent[] = [
  {
    id: "evt-007",
    type: "rhino",
    confidence: 94,
    timestamp: "13:36 CAT",
    zone: "Southern Grasslands",
    severity: "safe",
    status: "verified",
    coordinates: "-24.861, 31.428",
    message:
      "Single rhino movement verified near the southern grassland corridor.",
  },
  {
    id: "evt-008",
    type: "vehicle",
    confidence: 82,
    timestamp: "13:12 CAT",
    zone: "East Perimeter",
    severity: "warning",
    status: "tracking",
    coordinates: "-24.826, 31.473",
    message:
      "Vehicle route variance detected near a monitored perimeter crossing.",
  },
  {
    id: "evt-009",
    type: "poacher",
    confidence: 89,
    timestamp: "12:54 CAT",
    zone: "Sector C3",
    severity: "critical",
    status: "dispatching",
    coordinates: "-24.807, 31.441",
    message:
      "Thermal signature and pathing indicate an intrusion requiring response.",
  },
  {
    id: "evt-010",
    type: "rhino",
    confidence: 96,
    timestamp: "12:26 CAT",
    zone: "Western Basin",
    severity: "safe",
    status: "monitoring",
    coordinates: "-24.802, 31.392",
    message:
      "Rhino herd movement remains consistent across the western basin sector.",
  },
  {
    id: "evt-011",
    type: "vehicle",
    confidence: 77,
    timestamp: "11:58 CAT",
    zone: "South Access Road",
    severity: "warning",
    status: "monitoring",
    coordinates: "-24.849, 31.447",
    message:
      "Vehicle loiter time remains above expected threshold near access control.",
  },
  {
    id: "evt-012",
    type: "poacher",
    confidence: 84,
    timestamp: "11:31 CAT",
    zone: "North Ridge",
    severity: "critical",
    status: "tracking",
    coordinates: "-24.786, 31.398",
    message:
      "Possible intrusion route remains active along the northern ridge boundary.",
  },
] as const;

const additionalZones: readonly ReserveZone[] = [
  {
    id: "zone-e",
    label: "South Access Road",
    status: "watch",
    coverage: "Vehicle monitoring corridor under active review",
  },
  {
    id: "zone-f",
    label: "North Ridge",
    status: "critical",
    coverage: "Perimeter route flagged for rapid response coverage",
  },
  {
    id: "zone-g",
    label: "Southern Grasslands",
    status: "stable",
    coverage: "Wildlife corridor under continuous observation",
  },
] as const;

export const detectionsMockEvents: readonly LiveEvent[] = [
  ...commandCenterMockState.liveEvents,
  ...additionalDetections,
] as const;

export const detectionsMockZones: readonly ReserveZone[] = [
  ...commandCenterMockState.reserveZones,
  ...additionalZones,
] as const;

function buildDetectionsSummary(
  detections: readonly LiveEvent[],
  zones: readonly ReserveZone[],
): DetectionSummaryItem[] {
  const rhinoDetections = detections.filter((event) => event.type === "rhino");
  const threatDetections = detections.filter((event) => event.type !== "rhino");
  const criticalAlerts = detections.filter(
    (event) => event.severity === "critical",
  );

  return [
    {
      id: "total_detections",
      label: "Total detections",
      value: String(detections.length),
      supportingText: "Signals triaged across monitored reserve corridors.",
      tone: "neutral",
    },
    {
      id: "rhino_detections",
      label: "Rhino detections",
      value: String(rhinoDetections.length),
      supportingText: "Verified wildlife detections supporting habitat tracking.",
      tone: "safe",
    },
    {
      id: "threat_detections",
      label: "Threat detections",
      value: String(threatDetections.length),
      supportingText: "Vehicle and intrusion-related signals under review.",
      tone: "warning",
    },
    {
      id: "critical_alerts",
      label: "Critical alerts",
      value: String(criticalAlerts.length),
      supportingText: "Signals requiring immediate ranger or operations response.",
      tone: "critical",
    },
    {
      id: "monitored_zones",
      label: "Monitored zones",
      value: String(zones.length),
      supportingText: "Protected sectors represented in the current detection set.",
      tone: "neutral",
    },
  ];
}

export const detectionsWorkspaceMockData: DetectionsWorkspaceData = {
  detections: [...detectionsMockEvents],
  availableZones: [...detectionsMockZones],
  summary: buildDetectionsSummary(detectionsMockEvents, detectionsMockZones),
};
