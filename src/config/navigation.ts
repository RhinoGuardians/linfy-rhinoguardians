import { BarChart3, History, LayoutDashboard, Settings } from "lucide-react";

import { appRoutes } from "@/config/routes";

export const dashboardNavigation = [
  {
    title: "Overview",
    href: appRoutes.dashboard,
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: appRoutes.analytics,
    icon: BarChart3,
  },
  {
    title: "History",
    href: appRoutes.history,
    icon: History,
  },
  {
    title: "Settings",
    href: appRoutes.settings,
    icon: Settings,
  },
] as const;

