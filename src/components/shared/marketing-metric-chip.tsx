interface MarketingMetricChipProps {
  label: string;
  value: string;
}

export function MarketingMetricChip({
  label,
  value,
}: MarketingMetricChipProps) {
  return (
    <div className="rounded-2xl border border-border-subtle/80 bg-surface/70 px-4 py-4 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-text-primary">{value}</p>
    </div>
  );
}
