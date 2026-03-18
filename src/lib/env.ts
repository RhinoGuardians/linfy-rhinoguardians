import { apiConfig } from "@/config/api";

export const env = {
  apiBaseUrl: apiConfig.baseUrl,
  appName: "RhinoGuardians",
  appCompany: "Linfy Tech Solutions",
} as const;

