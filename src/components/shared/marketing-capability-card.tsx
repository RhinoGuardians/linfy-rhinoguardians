import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface MarketingCapabilityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function MarketingCapabilityCard({
  title,
  description,
  icon: Icon,
}: MarketingCapabilityCardProps) {
  return (
    <Card className="group h-full border-border-subtle/80 bg-surface/90 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:bg-surface-elevated">
      <CardContent className="flex h-full flex-col gap-6 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-secondary transition-colors duration-300 group-hover:border-brand-primary/40 group-hover:bg-brand-primary/15 group-hover:text-text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
          <p className="text-sm leading-7 text-text-muted">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

