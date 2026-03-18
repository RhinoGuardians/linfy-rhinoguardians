"use client";

import type { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
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
          <div className="flex items-center justify-end border-b border-border-subtle px-6 py-4">
            <div className="rounded-full border border-border-subtle bg-canvas/70 p-1">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                    userButtonPopoverCard:
                      "border border-[hsl(120_10%_83%)] shadow-card",
                    userButtonPopoverActionButton:
                      "text-[hsl(206_19%_15%)] hover:bg-[hsl(139_26%_34%_/_0.08)]",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
