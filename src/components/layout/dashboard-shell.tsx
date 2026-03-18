"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardMobileNav } from "@/components/layout/dashboard-mobile-nav";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { getDashboardPageMeta } from "@/config/navigation";

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pageMeta = getDashboardPageMeta(pathname);

  return (
    <div className="dashboard-theme min-h-screen">
      <DashboardMobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        pathname={pathname}
      />
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-4 px-4 py-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-6 lg:px-6 lg:py-6">
        <DashboardSidebar pathname={pathname} />
        <div className="overflow-hidden rounded-[1.75rem] border border-border-subtle/80 bg-surface/84 shadow-[0_30px_80px_-36px_rgba(5,14,10,0.98)] backdrop-blur">
          <DashboardHeader
            meta={pageMeta}
            onOpenMobileNav={() => setMobileNavOpen(true)}
          />
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
