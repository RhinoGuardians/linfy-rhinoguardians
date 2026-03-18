import { apiConfig } from "@/config/api";

export const env = {
  apiBaseUrl: apiConfig.baseUrl,
  apiDataSourceMode: apiConfig.dataSourceMode,
  pollingIntervalMs: apiConfig.pollingIntervalMs,
  appName: "RhinoGuardians",
  appCompany: "Linfy Tech Solutions",
} as const;
