import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BellDot,
  FileText,
  LayoutDashboard,
  Shield,
  Settings,
  Users,
} from "lucide-react";

import { type AppRoute, appRoutes } from "@/config/routes";

export interface DashboardNavItem {
  title: string;
  description: string;
  href: AppRoute;
  icon: LucideIcon;
}

export const dashboardNavigation: readonly DashboardNavItem[] = [
  {
    title: "Command Center",
    description: "Mission-critical operational overview.",
    href: appRoutes.dashboard,
    icon: LayoutDashboard,
  },
  {
    title: "Detections",
    description: "Live and recent detection activity.",
    href: appRoutes.detections,
    icon: BellDot,
  },
  {
    title: "Analytics",
    description: "Reserve intelligence and trend analysis.",
    href: appRoutes.analytics,
    icon: BarChart3,
  },
  {
    title: "Rangers",
    description: "Field team readiness and coordination.",
    href: appRoutes.rangers,
    icon: Users,
  },
  {
    title: "Reports",
    description: "Operational reporting and audit surfaces.",
    href: appRoutes.reports,
    icon: FileText,
  },
  {
    title: "Settings",
    description: "Workspace and platform configuration.",
    href: appRoutes.settings,
    icon: Settings,
  },
] as const;

export interface DashboardPageMeta {
  title: string;
  description: string;
  eyebrow: string;
  badge: string;
}

export const dashboardPageMetaByRoute: Record<
  | typeof appRoutes.dashboard
  | typeof appRoutes.detections
  | typeof appRoutes.analytics
  | typeof appRoutes.rangers
  | typeof appRoutes.reports
  | typeof appRoutes.settings,
  DashboardPageMeta
> = {
  [appRoutes.dashboard]: {
    title: "Command Center",
    description:
      "Monitor reserve activity, operational readiness, and conservation signals from one protected control surface.",
    eyebrow: "Operations",
    badge: "System Online",
  },
  [appRoutes.detections]: {
    title: "Detections",
    description:
      "Review live and recent AI detections across monitored zones, camera corridors, and alert queues.",
    eyebrow: "Field Intelligence",
    badge: "Live Feed",
  },
  [appRoutes.analytics]: {
    title: "Analytics",
    description:
      "Track reserve patterns, risk signals, and operational performance with a calmer analytical lens.",
    eyebrow: "Analysis",
    badge: "Insight Ready",
  },
  [appRoutes.rangers]: {
    title: "Rangers",
    description:
      "Keep field-team coordination, coverage status, and deployment readiness visible across the reserve estate.",
    eyebrow: "Coordination",
    badge: "Teams Connected",
  },
  [appRoutes.reports]: {
    title: "Reports",
    description:
      "Prepare executive-grade reporting, operational summaries, and audit-friendly conservation records.",
    eyebrow: "Reporting",
    badge: "Audit Ready",
  },
  [appRoutes.settings]: {
    title: "Settings",
    description:
      "Manage workspace controls, integrations, and organization preferences with enterprise-grade clarity.",
    eyebrow: "Administration",
    badge: "Configurable",
  },
} as const;

export function getDashboardPageMeta(pathname: string): DashboardPageMeta {
  const matchedItem = dashboardNavigation.find((item) =>
    item.href === appRoutes.dashboard
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return dashboardPageMetaByRoute[
    (matchedItem?.href ?? appRoutes.dashboard) as keyof typeof dashboardPageMetaByRoute
  ];
}

export const dashboardStatus = {
  label: "System Online",
  supportingText: "Powered by Linfy Tech Solutions",
  icon: Shield,
} as const;
