import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-border-subtle/80 bg-surface/82">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
            Workspace state
          </p>
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <p className="max-w-xl text-sm leading-7 text-text-muted">
            {description}
          </p>
        </div>
        {action ? <div className="pt-1">{action}</div> : null}
      </CardContent>
    </Card>
  );
}
