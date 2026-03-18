import type { LatLngTuple } from "leaflet";

import type { EventSeverity, LiveEvent } from "@/types";

export const KRUGER_REGION_CENTER: LatLngTuple = [-24.8128, 31.4456];
export const KRUGER_REGION_ZOOM = 11;

export function parseEventCoordinates(coordinates: string): LatLngTuple {
  const [latString, lngString] = coordinates.split(",").map((value) => value.trim());
  const lat = Number(latString);
  const lng = Number(lngString);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return KRUGER_REGION_CENTER;
  }

  return [lat, lng];
}

export function getEventMarkerStyles(
  severity: EventSeverity,
  isSelected: boolean,
) {
  const shared = {
    fillOpacity: isSelected ? 1 : 0.84,
    opacity: isSelected ? 1 : 0.88,
    radius: isSelected ? 11 : 8,
    weight: isSelected ? 3 : 2,
  };

  switch (severity) {
    case "safe":
      return {
        ...shared,
        color: "#78d8a1",
        fillColor: "#2fb36c",
      };
    case "warning":
      return {
        ...shared,
        color: "#f6c55d",
        fillColor: "#d6a02d",
      };
    case "critical":
      return {
        ...shared,
        color: "#ff8d74",
        fillColor: "#ec6046",
      };
  }
}

export function getEventMarkerLabel(event: LiveEvent) {
  return `${event.type} detected in ${event.zone}`;
}
