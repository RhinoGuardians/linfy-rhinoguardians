import { DashboardPlaceholderPanel } from "@/components/shared/dashboard-placeholder-panel";

export function SettingsOverview() {
  return (
    <div className="space-y-6">
      <DashboardPlaceholderPanel
        description="Use this surface for organization settings, workspace controls, integrations, and enterprise preference management."
        title="Settings placeholder surface"
      />
    </div>
  );
}
