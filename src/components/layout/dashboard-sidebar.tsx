import { Logo } from "@/components/shared/logo";
import { dashboardStatus } from "@/config/navigation";
import { DashboardNavList } from "@/components/layout/dashboard-nav-list";

interface DashboardSidebarProps {
  pathname: string;
}

export function DashboardSidebar({ pathname }: DashboardSidebarProps) {
  return (
    <aside className="hidden min-h-[calc(100vh-2rem)] rounded-[1.75rem] border border-border-subtle/80 bg-surface/85 p-5 shadow-[0_28px_70px_-36px_rgba(6,16,12,0.95)] backdrop-blur lg:flex lg:flex-col">
      <div className="space-y-4 border-b border-border-subtle/80 pb-5">
        <Logo />
        <div className="space-y-1">
          <p className="text-sm font-medium text-text-primary">
            Conservation Operations Platform
          </p>
          <p className="text-sm leading-6 text-text-muted">
            Protected coordination surfaces for reserve managers, NGOs, and
            field operations teams.
          </p>
        </div>
      </div>
      <DashboardNavList className="mt-6 flex-1" pathname={pathname} />
      <div className="mt-6 rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
          Powered by
        </p>
        <p className="mt-2 text-sm font-medium text-text-primary">
          {dashboardStatus.supportingText.replace("Powered by ", "")}
        </p>
      </div>
    </aside>
  );
}
