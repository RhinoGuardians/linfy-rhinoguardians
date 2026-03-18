import { DashboardPlaceholderPanel } from "@/components/shared/dashboard-placeholder-panel";

export function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      <DashboardPlaceholderPanel
        description="The analytics workspace is prepared for reserve-level dashboards, pattern analysis, and executive insight modules."
        title="Analytics placeholder surface"
      />
    </div>
  );
}
