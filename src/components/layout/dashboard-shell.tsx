"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/shared/logo";
import { dashboardNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-card">
          <div className="border-b border-border-subtle pb-4">
            <Logo />
          </div>
          <nav className="mt-6 space-y-1">
            {dashboardNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-primary text-white"
                      : "text-text-muted hover:bg-brand-primary/10 hover:text-text-primary",
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="rounded-2xl border border-border-subtle bg-surface shadow-card">
          {children}
        </div>
      </div>
    </div>
  );
}

