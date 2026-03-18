import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export function AnalyticsOverview() {
  return (
    <div className="space-y-8 p-8">
      <PageHeader
        eyebrow="Analytics"
        title="Conservation intelligence"
        description="This placeholder page is where predictive patterns, risk scoring, and reserve-level analytics will live."
      />
      <EmptyState
        title="Analytics foundation is ready"
        description="Add charts, KPI modules, and backend-backed report cards here without changing the route or shell architecture."
      />
    </div>
  );
}

