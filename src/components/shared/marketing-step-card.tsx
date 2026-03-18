import { Card, CardContent } from "@/components/ui/card";

interface MarketingStepCardProps {
  index: string;
  title: string;
  description: string;
}

export function MarketingStepCard({
  index,
  title,
  description,
}: MarketingStepCardProps) {
  return (
    <Card className="relative h-full border-border-subtle/80 bg-surface/80">
      <CardContent className="space-y-4 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-sm font-semibold text-brand-secondary">
          {index}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <p className="text-sm leading-7 text-text-muted">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

