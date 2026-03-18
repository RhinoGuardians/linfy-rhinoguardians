import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface StatusChipProps {
  tone?: "safe" | "warning" | "critical" | "neutral" | "brand";
  children: ReactNode;
  className?: string;
}

const toneClasses = {
  safe: "border-status-success/25 bg-status-success/10 text-status-success",
  warning: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  critical: "border-status-danger/25 bg-status-danger/10 text-status-danger",
  neutral: "border-border-subtle/80 bg-canvas/45 text-text-muted",
  brand: "border-brand-primary/25 bg-brand-primary/10 text-brand-secondary",
} as const;

export function StatusChip({
  tone = "neutral",
  children,
  className,
}: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
