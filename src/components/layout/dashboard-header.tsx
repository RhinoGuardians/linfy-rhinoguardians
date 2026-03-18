"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Menu, Search, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { dashboardStatus, type DashboardPageMeta } from "@/config/navigation";

interface DashboardHeaderProps {
  meta: DashboardPageMeta;
  onOpenMobileNav: () => void;
}

export function DashboardHeader({
  meta,
  onOpenMobileNav,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-border-subtle/80 px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <Button
              className="lg:hidden"
              onClick={onOpenMobileNav}
              size="sm"
              type="button"
              variant="secondary"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                {meta.eyebrow}
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-text-primary sm:text-3xl">
                {meta.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-text-muted">
                {meta.description}
              </p>
              <div className="mt-3 inline-flex items-center rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-secondary">
                {meta.badge}
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <div className="inline-flex items-center gap-2 rounded-full border border-status-success/25 bg-status-success/10 px-3 py-2 text-sm text-status-success">
              <Shield className="h-4 w-4" />
              {dashboardStatus.label}
            </div>
            <Button aria-label="Notifications" size="sm" type="button" variant="secondary">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="rounded-full border border-border-subtle/80 bg-canvas/65 p-1">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                    userButtonPopoverCard:
                      "border border-[hsl(210_14%_22%)] bg-[hsl(210_20%_12%)] shadow-card",
                    userButtonPopoverActionButton:
                      "text-[hsl(48_25%_95%)] hover:bg-[hsl(145_38%_42%_/_0.12)]",
                    userButtonPopoverActionButtonText: "text-[hsl(48_25%_95%)]",
                    userButtonPopoverFooter:
                      "border-t border-[hsl(210_14%_22%)]",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xl flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              aria-label="Search dashboard"
              className="h-12 w-full rounded-2xl border border-border-subtle/80 bg-canvas/55 pl-11 pr-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-brand-primary/40"
              placeholder="Search detections, ranger units, and reserve reports"
              type="search"
            />
          </div>
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <div className="inline-flex items-center gap-2 rounded-full border border-status-success/25 bg-status-success/10 px-3 py-2 text-sm text-status-success">
              <Shield className="h-4 w-4" />
              {dashboardStatus.label}
            </div>
            <div className="flex items-center gap-2">
              <Button
                aria-label="Notifications"
                size="sm"
                type="button"
                variant="secondary"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <div className="rounded-full border border-border-subtle/80 bg-canvas/65 p-1">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10",
                      userButtonPopoverCard:
                        "border border-[hsl(210_14%_22%)] bg-[hsl(210_20%_12%)] shadow-card",
                      userButtonPopoverActionButton:
                        "text-[hsl(48_25%_95%)] hover:bg-[hsl(145_38%_42%_/_0.12)]",
                      userButtonPopoverActionButtonText:
                        "text-[hsl(48_25%_95%)]",
                      userButtonPopoverFooter:
                        "border-t border-[hsl(210_14%_22%)]",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
