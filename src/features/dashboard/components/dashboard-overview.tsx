import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";

export function DashboardOverview() {
  return (
    <div className="space-y-8 p-8">
      <PageHeader
        action={<Badge>Protected route placeholder</Badge>}
        eyebrow="Mission Control"
        title="Operational overview"
        description="A premium dashboard shell for reserve activity, patrol readiness, and conservation intelligence."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Active reserves", value: "12" },
          { label: "Incidents monitored", value: "148" },
          { label: "Field teams online", value: "36" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="space-y-2">
              <p className="text-sm text-text-muted">{item.label}</p>
              <p className="text-3xl font-semibold text-text-primary">
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

