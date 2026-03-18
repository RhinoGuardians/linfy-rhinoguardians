import { apiConfig } from "@/config/api";
import { rangersWorkspaceMockData } from "@/features/rangers/mock/rangers-data";
import type { RangersWorkspaceData } from "@/features/rangers/types";
import {
  markBackendUnavailable,
  shouldUseFastMockFallback,
} from "@/lib/api-fallback";
import { apiClient, getApiFallbackMessage, unwrapApiResponse } from "@/lib/axios";
import type { ApiResponse, DataRequestResult, RangerUnit, ReserveZone } from "@/types";

function getUpdatedAt() {
  return new Date().toISOString();
}

function buildSummary(
  roster: readonly RangerUnit[],
  zones: readonly ReserveZone[],
) {
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
      id: "units_online" as const,
      label: "Units online",
      value: String(onlineUnits.length),
      supportingText: "Field units connected and visible across the reserve network.",
      tone: "safe" as const,
    },
    {
      id: "deployed_units" as const,
      label: "Deployed units",
      value: String(deployedUnits.length),
      supportingText: "Units currently assigned to active patrol or response coverage.",
      tone: "warning" as const,
    },
    {
      id: "standby_units" as const,
      label: "Standby units",
      value: String(standbyUnits.length),
      supportingText: "Teams ready for rapid redeployment or secondary support.",
      tone: "neutral" as const,
    },
    {
      id: "average_readiness" as const,
      label: "Average readiness",
      value: `${averageReadiness}%`,
      supportingText: "Combined readiness across communications, availability, and posture.",
      tone:
        averageReadiness >= 90
          ? ("safe" as const)
          : averageReadiness >= 75
            ? ("warning" as const)
            : ("critical" as const),
    },
    {
      id: "covered_zones" as const,
      label: "Covered zones",
      value: String(new Set(zones.map((zone) => zone.label)).size),
      supportingText: "Operational sectors represented in the current ranger roster.",
      tone: "neutral" as const,
    },
  ];
}

function cloneWorkspaceData(): RangersWorkspaceData {
  return {
    roster: [...rangersWorkspaceMockData.roster],
    availableZones: [...rangersWorkspaceMockData.availableZones],
    summary: [...rangersWorkspaceMockData.summary],
  };
}

export async function fetchRangerUnits() {
  const response = await apiClient.get<ApiResponse<RangerUnit[]> | RangerUnit[]>(
    apiConfig.endpoints.rangers,
  );

  return unwrapApiResponse(response.data);
}

export async function fetchRangersWorkspace(): Promise<
  DataRequestResult<RangersWorkspaceData>
> {
  if (apiConfig.dataSourceMode === "mock") {
    return {
      data: cloneWorkspaceData(),
      source: "mock",
      message: "Live API disabled. Using local ranger operations data.",
      updatedAt: getUpdatedAt(),
    };
  }

  if (shouldUseFastMockFallback("rangers")) {
    return {
      data: cloneWorkspaceData(),
      source: "mock",
      message: "Backend unavailable. Using cached mock fallback for rangers.",
      updatedAt: getUpdatedAt(),
    };
  }

  try {
    const [rosterResponse, zonesResponse] = await Promise.all([
      fetchRangerUnits(),
      apiClient.get<ApiResponse<ReserveZone[]> | ReserveZone[]>(
        `${apiConfig.endpoints.dashboard}/reserve-zones`,
      ),
    ]);

    const availableZones = unwrapApiResponse(zonesResponse.data);
    const roster = [...rosterResponse];

    return {
      data: {
        roster,
        availableZones,
        summary: buildSummary(roster, availableZones),
      },
      source: "api",
      updatedAt: getUpdatedAt(),
    };
  } catch (error) {
    if (shouldUseFastMockFallback("rangers", error)) {
      markBackendUnavailable("rangers");
    }

    return {
      data: cloneWorkspaceData(),
      source: "mock",
      message: getApiFallbackMessage(
        error,
        "Rangers API unavailable. Using local field operations dataset.",
      ),
      updatedAt: getUpdatedAt(),
    };
  }
}
