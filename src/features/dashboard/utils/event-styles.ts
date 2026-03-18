import type {
  CommandCenterKpi,
  IncidentItem,
  LiveEvent,
  LiveEventSeverity,
  LiveEventType,
} from "@/features/dashboard/types";

export function getSeverityClasses(severity: LiveEventSeverity) {
  switch (severity) {
    case "safe":
      return {
        badge:
          "border-status-success/25 bg-status-success/10 text-status-success",
        dot: "bg-status-success",
        glow: "shadow-[0_0_0_6px_rgba(58,188,103,0.08)]",
      };
    case "warning":
      return {
        badge: "border-amber-400/25 bg-amber-400/10 text-amber-300",
        dot: "bg-amber-400",
        glow: "shadow-[0_0_0_6px_rgba(251,191,36,0.08)]",
      };
    case "critical":
      return {
        badge: "border-status-danger/25 bg-status-danger/10 text-status-danger",
        dot: "bg-status-danger",
        glow: "shadow-[0_0_0_6px_rgba(236,96,70,0.08)]",
      };
  }
}

export function getEventTypeLabel(type: LiveEventType) {
  switch (type) {
    case "rhino":
      return "Wildlife";
    case "poacher":
      return "Threat";
    case "vehicle":
      return "Vehicle";
  }
}

export function getKpiAccentClasses(tone: CommandCenterKpi["tone"]) {
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

export function getIncidentClasses(severity: IncidentItem["severity"]) {
  return getSeverityClasses(severity);
}

export function getEventAriaLabel(event: LiveEvent) {
  return `${getEventTypeLabel(event.type)} event in ${event.zone} at ${event.timestamp}`;
}
