import { cn } from "@/lib/utils";

interface TrendBarProps {
  label: string;
  value: number;
  maxValue: number;
  toneClassName: string;
}

export function TrendBar({
  label,
  value,
  maxValue,
  toneClassName,
}: TrendBarProps) {
  const widthPercent = maxValue === 0 ? 0 : (value / maxValue) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-canvas/60">
        <div
          className={cn("h-full rounded-full", toneClassName)}
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  );
}

