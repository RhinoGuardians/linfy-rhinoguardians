import type { ReactNode } from "react";

interface ThresholdControlProps {
  label: string;
  description: string;
  valueLabel?: string;
  children: ReactNode;
}

export function ThresholdControl({
  label,
  description,
  valueLabel,
  children,
}: ThresholdControlProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="max-w-xl text-sm leading-6 text-text-muted">
            {description}
          </p>
        </div>
        {valueLabel ? (
          <span className="text-sm font-medium text-brand-secondary">
            {valueLabel}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
