import { apiConfig } from "@/config/api";
import { reportsWorkspaceMockData } from "@/features/reports/mock/reports-data";
import type { ReportsWorkspaceData } from "@/features/reports/types";
import {
  markBackendUnavailable,
  shouldUseFastMockFallback,
} from "@/lib/api-fallback";
import { apiClient, getApiFallbackMessage, unwrapApiResponse } from "@/lib/axios";
import type { ApiResponse, DataRequestResult } from "@/types";

function getUpdatedAt() {
  return new Date().toISOString();
}

function cloneWorkspaceData(): ReportsWorkspaceData {
  return {
    catalog: [...reportsWorkspaceMockData.catalog],
    summary: [...reportsWorkspaceMockData.summary],
    stakeholderInsights: [...reportsWorkspaceMockData.stakeholderInsights],
  };
}

export async function fetchReportCatalog() {
  const response = await apiClient.get<
    ApiResponse<ReportsWorkspaceData["catalog"]> | ReportsWorkspaceData["catalog"]
  >(apiConfig.endpoints.reports);

  return unwrapApiResponse(response.data);
}

export async function fetchReportsWorkspace(): Promise<
  DataRequestResult<ReportsWorkspaceData>
> {
  if (apiConfig.dataSourceMode === "mock") {
    return {
      data: cloneWorkspaceData(),
      source: "mock",
      message: "Live API disabled. Using local reporting dataset.",
      updatedAt: getUpdatedAt(),
    };
  }

  if (shouldUseFastMockFallback("reports")) {
    return {
      data: cloneWorkspaceData(),
      source: "mock",
      message: "Backend unavailable. Using cached mock fallback for reports.",
      updatedAt: getUpdatedAt(),
    };
  }

  try {
    const catalog = [...(await fetchReportCatalog())];

    return {
      data: {
        catalog,
        summary: [...reportsWorkspaceMockData.summary],
        stakeholderInsights: [...reportsWorkspaceMockData.stakeholderInsights],
      },
      source: "api",
      updatedAt: getUpdatedAt(),
    };
  } catch (error) {
    if (shouldUseFastMockFallback("reports", error)) {
      markBackendUnavailable("reports");
    }

    return {
      data: cloneWorkspaceData(),
      source: "mock",
      message: getApiFallbackMessage(
        error,
        "Reports API unavailable. Using local reporting dataset.",
      ),
      updatedAt: getUpdatedAt(),
    };
  }
}
