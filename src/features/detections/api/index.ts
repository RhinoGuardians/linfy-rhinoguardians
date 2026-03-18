import { apiConfig } from "@/config/api";
import { detectionsWorkspaceMockData } from "@/features/detections/mock/detections-data";
import type { DetectionsWorkspaceData } from "@/features/detections/types";
import { apiClient, getApiFallbackMessage, unwrapApiResponse } from "@/lib/axios";
import type { ApiResponse, DataRequestResult, LiveEvent, ReserveZone } from "@/types";

function getUpdatedAt() {
  return new Date().toISOString();
}

function cloneWorkspaceData(): DetectionsWorkspaceData {
  return {
    detections: [...detectionsWorkspaceMockData.detections],
    availableZones: [...detectionsWorkspaceMockData.availableZones],
    summary: [...detectionsWorkspaceMockData.summary],
  };
}

function buildSummary(
  detections: readonly LiveEvent[],
  zones: readonly ReserveZone[],
) {
  const rhinoDetections = detections.filter((event) => event.type === "rhino");
  const threatDetections = detections.filter((event) => event.type !== "rhino");
  const criticalAlerts = detections.filter(
    (event) => event.severity === "critical",
  );

  return [
    {
      id: "total_detections" as const,
      label: "Total detections",
      value: String(detections.length),
      supportingText: "Signals triaged across monitored reserve corridors.",
      tone: "neutral" as const,
    },
    {
      id: "rhino_detections" as const,
      label: "Rhino detections",
      value: String(rhinoDetections.length),
      supportingText: "Verified wildlife detections supporting habitat tracking.",
      tone: "safe" as const,
    },
    {
      id: "threat_detections" as const,
      label: "Threat detections",
      value: String(threatDetections.length),
      supportingText: "Vehicle and intrusion-related signals under review.",
      tone: "warning" as const,
    },
    {
      id: "critical_alerts" as const,
      label: "Critical alerts",
      value: String(criticalAlerts.length),
      supportingText: "Signals requiring immediate ranger or operations response.",
      tone: "critical" as const,
    },
    {
      id: "monitored_zones" as const,
      label: "Monitored zones",
      value: String(zones.length),
      supportingText: "Protected sectors represented in the current detection set.",
      tone: "neutral" as const,
    },
  ];
}

export async function fetchDetections() {
  const response = await apiClient.get<ApiResponse<LiveEvent[]> | LiveEvent[]>(
    apiConfig.endpoints.detections,
  );

  return unwrapApiResponse(response.data);
}

export async function fetchDetectionsWorkspace(): Promise<
  DataRequestResult<DetectionsWorkspaceData>
> {
  if (apiConfig.dataSourceMode === "mock") {
    return {
      data: cloneWorkspaceData(),
      source: "mock",
      message: "Live API disabled. Using local detections dataset.",
      updatedAt: getUpdatedAt(),
    };
  }

  try {
    const [detectionsResponse, zonesResponse] = await Promise.all([
      fetchDetections(),
      apiClient.get<ApiResponse<ReserveZone[]> | ReserveZone[]>(
        `${apiConfig.endpoints.dashboard}/reserve-zones`,
      ),
    ]);

    const availableZones = unwrapApiResponse(zonesResponse.data);
    const detections = [...detectionsResponse];

    return {
      data: {
        detections,
        availableZones,
        summary: buildSummary(detections, availableZones),
      },
      source: "api",
      updatedAt: getUpdatedAt(),
    };
  } catch (error) {
    return {
      data: cloneWorkspaceData(),
      source: "mock",
      message: getApiFallbackMessage(
        error,
        "Detections API unavailable. Using local operational dataset.",
      ),
      updatedAt: getUpdatedAt(),
    };
  }
}
