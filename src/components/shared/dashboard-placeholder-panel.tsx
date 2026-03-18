import { Card, CardContent } from "@/components/ui/card";

interface DashboardPlaceholderPanelProps {
  title: string;
  description: string;
}

export function DashboardPlaceholderPanel({
  title,
  description,
}: DashboardPlaceholderPanelProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-4 p-6 sm:p-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
          <p className="max-w-2xl text-sm leading-7 text-text-muted">
            {description}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Ready for data-backed controls",
            "Aligned with the secured dashboard shell",
            "Prepared for enterprise workspace settings",
          ].map((item) => (
            <div
              className="rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-5 text-sm text-text-muted"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
