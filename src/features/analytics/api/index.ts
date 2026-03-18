import { apiConfig } from "@/config/api";
import { analyticsPageData } from "@/features/analytics/mock/analytics-data";
import type { AnalyticsPageData } from "@/features/analytics/types";
import { apiClient, getApiFallbackMessage, unwrapApiResponse } from "@/lib/axios";
import type { ApiResponse, DataRequestResult } from "@/types";

function getUpdatedAt() {
  return new Date().toISOString();
}

function getMockAnalyticsSummary(): AnalyticsPageData {
  return {
    ...analyticsPageData,
    metrics: [...analyticsPageData.metrics],
    trendSeries: analyticsPageData.trendSeries.map((series) => ({
      ...series,
      points: [...series.points],
    })),
    threatBreakdown: [...analyticsPageData.threatBreakdown],
    zoneActivity: [...analyticsPageData.zoneActivity],
    responsePerformance: [...analyticsPageData.responsePerformance],
    mostActiveZones: [...analyticsPageData.mostActiveZones],
    safestZones: [...analyticsPageData.safestZones],
    recentEvents: [...analyticsPageData.recentEvents],
    recentIncidents: [...analyticsPageData.recentIncidents],
  };
}

export async function fetchAnalyticsSummary(): Promise<
  DataRequestResult<AnalyticsPageData>
> {
  if (apiConfig.dataSourceMode === "mock") {
    return {
      data: getMockAnalyticsSummary(),
      source: "mock",
      message: "Live API disabled. Using local analytics dataset.",
      updatedAt: getUpdatedAt(),
    };
  }

  try {
    const response = await apiClient.get<
      ApiResponse<AnalyticsPageData> | AnalyticsPageData
    >(`${apiConfig.endpoints.analytics}/summary`);

    return {
      data: unwrapApiResponse(response.data),
      source: "api",
      updatedAt: getUpdatedAt(),
    };
  } catch (error) {
    return {
      data: getMockAnalyticsSummary(),
      source: "mock",
      message: getApiFallbackMessage(
        error,
        "Analytics API unavailable. Using local analytics dataset.",
      ),
      updatedAt: getUpdatedAt(),
    };
  }
}
