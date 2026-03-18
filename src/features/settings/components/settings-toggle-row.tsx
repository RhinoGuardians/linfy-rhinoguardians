interface SettingsToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function SettingsToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
}: SettingsToggleRowProps) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-2xl border border-border-subtle/80 bg-canvas/45 px-4 py-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="max-w-xl text-sm leading-6 text-text-muted">
          {description}
        </p>
      </div>
      <span className="relative mt-1 inline-flex h-6 w-11 shrink-0 items-center">
        <input
          checked={checked}
          className="peer sr-only"
          onChange={(event) => onCheckedChange(event.target.checked)}
          type="checkbox"
        />
        <span className="absolute inset-0 rounded-full bg-canvas transition-colors peer-checked:bg-brand-primary/60" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
