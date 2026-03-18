import { Badge } from "@/components/ui/badge";
import type {
  ApiConnectionStatus,
  SettingsSummaryItem,
  ThresholdSensitivity,
} from "@/features/settings/types";
import { cn } from "@/lib/utils";

interface SettingsStatusBadgeProps {
  kind:
    | "connection"
    | "unsaved"
    | "mode"
    | "security"
    | "sensitivity"
    | "summary-tone";
  value:
    | ApiConnectionStatus
    | "saved"
    | "unsaved"
    | "api-first"
    | "mock"
    | "protected"
    | "managed"
    | ThresholdSensitivity
    | SettingsSummaryItem["tone"];
}

const toneClasses = {
  safe: "bg-status-success/12 text-status-success",
  warning: "bg-amber-400/12 text-amber-300",
  critical: "bg-status-danger/12 text-status-danger",
  neutral: "bg-canvas/60 text-text-muted",
} as const;

export function SettingsStatusBadge({
  kind,
  value,
}: SettingsStatusBadgeProps) {
  let label = String(value);
  let className: string = toneClasses.neutral;

  if (kind === "connection") {
    label =
      value === "connected"
        ? "Connected"
        : value === "fallback"
          ? "Fallback active"
          : "Offline";
    className =
      value === "connected"
        ? toneClasses.safe
        : value === "fallback"
          ? toneClasses.warning
          : toneClasses.critical;
  }

  if (kind === "mode") {
    label = value === "api-first" ? "API-first" : "Mock mode";
    className = value === "api-first" ? toneClasses.safe : toneClasses.neutral;
  }

  if (kind === "unsaved") {
    label = value === "unsaved" ? "Unsaved changes" : "All changes saved";
    className = value === "unsaved" ? toneClasses.warning : toneClasses.safe;
  }

  if (kind === "security") {
    label = value === "protected" ? "Protected session" : "Managed by Clerk";
    className = toneClasses.safe;
  }

  if (kind === "sensitivity") {
    label =
      value === "high" ? "High" : value === "moderate" ? "Moderate" : "Low";
    className =
      value === "high"
        ? toneClasses.critical
        : value === "moderate"
          ? toneClasses.warning
          : toneClasses.safe;
  }

  if (kind === "summary-tone") {
    className = toneClasses[value as SettingsSummaryItem["tone"]];
  }

  return <Badge className={cn("px-3 py-1 text-xs", className)}>{label}</Badge>;
}
