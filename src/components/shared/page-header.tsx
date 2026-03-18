import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 border-b border-border-subtle/80 pb-6 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0 space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-text-muted">
            {description}
          </p>
        </div>
      </div>
      {action ? <div className="w-full md:w-auto md:shrink-0">{action}</div> : null}
    </div>
  );
}
