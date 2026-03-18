import type { Incident, LiveEvent, ReserveZone } from "@/types";

export function selectCriticalThreats(events: readonly LiveEvent[]) {
  return events.filter((event) => event.severity === "critical");
}

export function selectRhinoDetections(events: readonly LiveEvent[]) {
  return events.filter((event) => event.type === "rhino");
}

export function selectRecentIncidents(incidents: readonly Incident[]) {
  return incidents.slice(0, 5);
}

export function selectActiveZones(zones: readonly ReserveZone[]) {
  return zones.filter((zone) => zone.status !== "stable");
}

