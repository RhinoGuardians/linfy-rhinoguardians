import type {
  AnalyticsMetric,
  AnalyticsTrendSeries,
  ThreatBreakdownItem,
  ZoneActivitySummary,
} from "@/features/analytics/types";

export function getAnalyticsMetricToneClasses(tone: AnalyticsMetric["tone"]) {
  switch (tone) {
    case "safe":
      return "border-status-success/20 bg-status-success/10 text-status-success";
    case "warning":
      return "border-amber-400/20 bg-amber-400/10 text-amber-300";
    case "critical":
      return "border-status-danger/20 bg-status-danger/10 text-status-danger";
    case "neutral":
      return "border-brand-primary/20 bg-brand-primary/10 text-brand-secondary";
  }
}

export function getTrendToneClasses(tone: AnalyticsTrendSeries["tone"]) {
  switch (tone) {
    case "emerald":
      return "bg-[linear-gradient(180deg,rgba(58,188,103,0.28),rgba(58,188,103,0.08))]";
    case "amber":
      return "bg-[linear-gradient(180deg,rgba(246,197,93,0.28),rgba(246,197,93,0.08))]";
    case "mixed":
      return "bg-[linear-gradient(180deg,rgba(100,160,255,0.24),rgba(58,188,103,0.08))]";
  }
}

export function getThreatToneClasses(tone: ThreatBreakdownItem["tone"]) {
  return tone === "critical"
    ? "bg-status-danger"
    : "bg-amber-400";
}

export function getZoneStatusClasses(status: ZoneActivitySummary["status"]) {
  switch (status) {
    case "stable":
      return "border-status-success/20 bg-status-success/10 text-status-success";
    case "watch":
      return "border-amber-400/20 bg-amber-400/10 text-amber-300";
    case "critical":
      return "border-status-danger/20 bg-status-danger/10 text-status-danger";
  }
}
