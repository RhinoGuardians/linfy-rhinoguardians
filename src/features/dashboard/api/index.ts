import { apiConfig } from "@/config/api";
import { commandCenterMockState } from "@/features/dashboard/mock/command-center";
import { apiClient, getApiFallbackMessage, unwrapApiResponse } from "@/lib/axios";
import type {
  ApiResponse,
  DataRequestResult,
  Incident,
  LiveEvent,
  ReserveOverviewItem,
  ReserveZone,
  SummaryMetric,
} from "@/types";

export interface CommandCenterSnapshot {
  liveEvents: LiveEvent[];
  summaryMetrics: SummaryMetric[];
  reserveZones: ReserveZone[];
  reserveOverview: ReserveOverviewItem[];
  recentIncidents: Incident[];
}

export interface CommandCenterLiveSnapshot {
  liveEvents: LiveEvent[];
  summaryMetrics: SummaryMetric[];
}

function getUpdatedAt() {
  return new Date().toISOString();
}

function getCommandCenterMockSnapshot(): CommandCenterSnapshot {
  return {
    liveEvents: [...commandCenterMockState.liveEvents],
    summaryMetrics: [...commandCenterMockState.summaryMetrics],
    reserveZones: [...commandCenterMockState.reserveZones],
    reserveOverview: [...commandCenterMockState.reserveOverview],
    recentIncidents: [...commandCenterMockState.recentIncidents],
  };
}

function getCommandCenterMockLiveSnapshot(): CommandCenterLiveSnapshot {
  return {
    liveEvents: [...commandCenterMockState.liveEvents],
    summaryMetrics: [...commandCenterMockState.summaryMetrics],
  };
}

async function fetchDashboardResource<TData>(path: string) {
  const response = await apiClient.get<ApiResponse<TData> | TData>(path);

  return unwrapApiResponse(response.data);
}

export async function fetchLiveEvents() {
  return fetchDashboardResource<LiveEvent[]>(
    `${apiConfig.endpoints.dashboard}/live-events`,
  );
}

export async function fetchSummaryMetrics() {
  return fetchDashboardResource<SummaryMetric[]>(
    `${apiConfig.endpoints.dashboard}/summary-metrics`,
  );
}

export async function fetchReserveZones() {
  return fetchDashboardResource<ReserveZone[]>(
    `${apiConfig.endpoints.dashboard}/reserve-zones`,
  );
}

export async function fetchReserveOverview() {
  return fetchDashboardResource<ReserveOverviewItem[]>(
    `${apiConfig.endpoints.dashboard}/reserve-overview`,
  );
}

export async function fetchRecentIncidents() {
  return fetchDashboardResource<Incident[]>(
    `${apiConfig.endpoints.dashboard}/recent-incidents`,
  );
}

export async function fetchCommandCenterSnapshot(): Promise<
  DataRequestResult<CommandCenterSnapshot>
> {
  if (apiConfig.dataSourceMode === "mock") {
    return {
      data: getCommandCenterMockSnapshot(),
      source: "mock",
      message: "Live API disabled. Using local reserve monitoring data.",
      updatedAt: getUpdatedAt(),
    };
  }

  try {
    const [
      liveEvents,
      summaryMetrics,
      reserveZones,
      reserveOverview,
      recentIncidents,
    ] = await Promise.all([
      fetchLiveEvents(),
      fetchSummaryMetrics(),
      fetchReserveZones(),
      fetchReserveOverview(),
      fetchRecentIncidents(),
    ]);

    return {
      data: {
        liveEvents,
        summaryMetrics,
        reserveZones,
        reserveOverview,
        recentIncidents,
      },
      source: "api",
      updatedAt: getUpdatedAt(),
    };
  } catch (error) {
    return {
      data: getCommandCenterMockSnapshot(),
      source: "mock",
      message: getApiFallbackMessage(
        error,
        "Backend unavailable. Using local reserve monitoring data.",
      ),
      updatedAt: getUpdatedAt(),
    };
  }
}

export async function fetchCommandCenterLiveSnapshot(): Promise<
  DataRequestResult<CommandCenterLiveSnapshot>
> {
  if (apiConfig.dataSourceMode === "mock") {
    return {
      data: getCommandCenterMockLiveSnapshot(),
      source: "mock",
      message: "Live API disabled. Using local reserve monitoring data.",
      updatedAt: getUpdatedAt(),
    };
  }

  try {
    const [liveEvents, summaryMetrics] = await Promise.all([
      fetchLiveEvents(),
      fetchSummaryMetrics(),
    ]);

    return {
      data: { liveEvents, summaryMetrics },
      source: "api",
      updatedAt: getUpdatedAt(),
    };
  } catch (error) {
    return {
      data: getCommandCenterMockLiveSnapshot(),
      source: "mock",
      message: getApiFallbackMessage(
        error,
        "Live sync unavailable. Showing local monitoring data.",
      ),
      updatedAt: getUpdatedAt(),
    };
  }
}
