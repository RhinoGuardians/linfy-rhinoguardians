import { apiConfig } from "@/config/api";
import {
  createSettingsWorkspaceData,
  settingsWorkspaceMockData,
} from "@/features/settings/mock/settings-data";
import type { SettingsWorkspaceData } from "@/features/settings/types";
import {
  markBackendUnavailable,
  shouldUseFastMockFallback,
} from "@/lib/api-fallback";
import { apiClient, getApiFallbackMessage, unwrapApiResponse } from "@/lib/axios";
import type { ApiResponse, DataRequestResult } from "@/types";

function cloneWorkspaceData(): SettingsWorkspaceData {
  return createSettingsWorkspaceData({
    editable: settingsWorkspaceMockData.editable,
    updatedAt: settingsWorkspaceMockData.updatedAt,
    connectionStatus: settingsWorkspaceMockData.apiDataSource.connectionStatus,
  });
}

export async function fetchSettingsWorkspace(): Promise<
  DataRequestResult<SettingsWorkspaceData>
> {
  if (apiConfig.dataSourceMode === "mock") {
    return {
      data: cloneWorkspaceData(),
      source: "mock",
      message: "Live API disabled. Using local administration settings dataset.",
      updatedAt: new Date().toISOString(),
    };
  }

  if (shouldUseFastMockFallback("settings")) {
    return {
      data: createSettingsWorkspaceData({ connectionStatus: "fallback" }),
      source: "mock",
      message: "Backend unavailable. Using cached mock fallback for settings.",
      updatedAt: new Date().toISOString(),
    };
  }

  try {
    const response = await apiClient.get<
      ApiResponse<SettingsWorkspaceData> | SettingsWorkspaceData
    >(apiConfig.endpoints.settings);

    const workspace = unwrapApiResponse(response.data);

    return {
      data: {
        ...workspace,
        apiDataSource: {
          ...workspace.apiDataSource,
          connectionStatus: "connected",
        },
      },
      source: "api",
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    if (shouldUseFastMockFallback("settings", error)) {
      markBackendUnavailable("settings");
    }

    return {
      data: createSettingsWorkspaceData({ connectionStatus: "fallback" }),
      source: "mock",
      message: getApiFallbackMessage(
        error,
        "Settings API unavailable. Using local administration dataset.",
      ),
      updatedAt: new Date().toISOString(),
    };
  }
}
