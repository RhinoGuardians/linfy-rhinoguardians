import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed bg-surface-elevated">
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          <p className="max-w-xl text-sm text-text-muted">{description}</p>
        </div>
        {action}
      </CardContent>
    </Card>
  );
}

