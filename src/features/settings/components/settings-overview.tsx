import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export function SettingsOverview() {
  return (
    <div className="space-y-8 p-8">
      <PageHeader
        eyebrow="Settings"
        title="Platform configuration"
        description="This page will grow into workspace, organization, and integration settings for enterprise operators."
      />
      <EmptyState
        title="Settings scaffold is ready"
        description="Add profile, access control, notification, and system preference modules here as the product grows."
      />
    </div>
  );
}

