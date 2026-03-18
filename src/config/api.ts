export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000",
  timeoutMs: 10000,
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
