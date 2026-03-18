export const appRoutes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  analytics: "/dashboard/analytics",
  history: "/dashboard/history",
  settings: "/dashboard/settings",
} as const;

export type AppRoute = (typeof appRoutes)[keyof typeof appRoutes];

