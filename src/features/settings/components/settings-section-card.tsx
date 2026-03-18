import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

interface SettingsSectionCardProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
}

export function SettingsSectionCard({
  eyebrow,
  title,
  description,
  action,
  children,
}: SettingsSectionCardProps) {
  return (
    <Card className="border-border-subtle/80 bg-surface/88">
      <CardContent className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
                {eyebrow}
              </p>
            ) : null}
            <div className="space-y-1.5">
              <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
              <p className="max-w-2xl text-sm leading-7 text-text-muted">
                {description}
              </p>
            </div>
          </div>
          {action ? <div className="md:shrink-0">{action}</div> : null}
        </div>

        {children}
      </CardContent>
    </Card>
  );
}
