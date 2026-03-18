"use client";

import { X } from "lucide-react";

import { DashboardNavList } from "@/components/layout/dashboard-nav-list";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";

interface DashboardMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function DashboardMobileNav({
  isOpen,
  onClose,
  pathname,
}: DashboardMobileNavProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        aria-label="Close navigation"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />
      <div className="absolute left-0 top-0 h-full w-[min(90vw,22rem)] border-r border-border-subtle/80 bg-surface p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
        <div className="flex items-center justify-between border-b border-border-subtle/80 pb-5">
          <Logo />
          <Button onClick={onClose} size="sm" type="button" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-4 text-sm leading-6 text-text-muted">
          Conservation Operations Platform
        </p>
        <DashboardNavList
          className="mt-6"
          onNavigate={onClose}
          pathname={pathname}
        />
        <div className="mt-6 rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            Powered by
          </p>
          <p className="mt-2 text-sm font-medium text-text-primary">
            Linfy Tech Solutions
          </p>
        </div>
      </div>
    </div>
  );
}

