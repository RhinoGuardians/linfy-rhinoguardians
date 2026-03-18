import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";

export function HistoryOverview() {
  return (
    <div className="space-y-8 p-8">
      <PageHeader
        eyebrow="History"
        title="Activity timeline"
        description="Use this area for audit history, incident records, patrol events, and change tracking."
      />
      <EmptyState
        title="History timeline placeholder"
        description="The route is in place for future event feeds, filters, pagination, and export workflows."
      />
    </div>
  );
}

