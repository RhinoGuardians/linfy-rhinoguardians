export const appRoutes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  detections: "/dashboard/detections",
  analytics: "/dashboard/analytics",
  rangers: "/dashboard/rangers",
  reports: "/dashboard/reports",
  settings: "/dashboard/settings",
} as const;

export type AppRoute = (typeof appRoutes)[keyof typeof appRoutes];
