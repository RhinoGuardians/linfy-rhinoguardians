import { cn } from "@/lib/utils";

interface InsightStatProps {
  label: string;
  value: string;
  supportingText: string;
  badge?: string;
  badgeClassName?: string;
}

export function InsightStat({
  label,
  value,
  supportingText,
  badge,
  badgeClassName,
}: InsightStatProps) {
  return (
    <div className="rounded-2xl border border-border-subtle/80 bg-canvas/45 p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-text-muted">{label}</p>
        {badge ? (
          <span
            className={cn(
              "rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
              badgeClassName,
            )}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-2xl font-semibold text-text-primary">{value}</p>
      <p className="mt-2 text-sm leading-6 text-text-muted">{supportingText}</p>
    </div>
  );
}

