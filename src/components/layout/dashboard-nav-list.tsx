"use client";

import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

import { dashboardNavigation } from "@/config/navigation";
import { appRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";

interface DashboardNavListProps
  extends Pick<ComponentPropsWithoutRef<"nav">, "className"> {
  pathname: string;
  onNavigate?: () => void;
}

export function DashboardNavList({
  className,
  pathname,
  onNavigate,
}: DashboardNavListProps) {
  return (
    <nav className={cn("space-y-1", className)}>
      {dashboardNavigation.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === appRoutes.dashboard
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            className={cn(
              "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all duration-200",
              isActive
                ? "bg-brand-primary/18 text-text-primary ring-1 ring-brand-primary/35"
                : "text-text-muted hover:bg-surface-elevated hover:text-text-primary",
            )}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
                isActive
                  ? "border-brand-primary/40 bg-brand-primary/16 text-brand-secondary"
                  : "border-border-subtle/80 bg-canvas/55 text-text-muted group-hover:border-brand-primary/20 group-hover:text-brand-secondary",
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block font-medium">{item.title}</span>
              <span className="mt-0.5 block truncate text-xs text-text-muted">
                {item.description}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

