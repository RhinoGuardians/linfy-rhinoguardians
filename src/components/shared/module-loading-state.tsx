import { LoaderCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ModuleLoadingStateProps {
  title: string;
  description: string;
}

export function ModuleLoadingState({
  title,
  description,
}: ModuleLoadingStateProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="flex items-start gap-3 p-5 sm:p-6">
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10">
          <LoaderCircle className="h-4 w-4 animate-spin text-brand-secondary" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <p className="max-w-2xl text-sm leading-6 text-text-muted">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
