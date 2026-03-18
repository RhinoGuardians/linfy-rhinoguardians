import { DashboardPlaceholderPanel } from "@/components/shared/dashboard-placeholder-panel";

export function DetectionsOverview() {
  return (
    <div className="space-y-6">
      <DashboardPlaceholderPanel
        description="This page is ready for live detections, event triage, zone filters, and AI-driven review workflows."
        title="Detections placeholder surface"
      />
    </div>
  );
}

