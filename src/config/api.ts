function parsePollingInterval(value: string | undefined, fallback: number) {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const apiConfig = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "http://localhost:8000",
  dataSourceMode:
    process.env.NEXT_PUBLIC_DATA_SOURCE_MODE === "mock" ? "mock" : "api",
  timeoutMs: 10000,
  pollingIntervalMs: parsePollingInterval(
    process.env.NEXT_PUBLIC_POLLING_INTERVAL_MS,
    5000,
  ),
  endpoints: {
    auth: "/api/v1/auth",
    dashboard: "/api/v1/dashboard",
    detections: "/api/v1/detections",
    analytics: "/api/v1/analytics",
    rangers: "/api/v1/rangers",
    reports: "/api/v1/reports",
    settings: "/api/v1/settings",
  },
} as const;
