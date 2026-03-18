"use client";

import type { CircleMarker as LeafletCircleMarker } from "leaflet";
import { divIcon } from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { useEffect, useMemo, useRef } from "react";

import {
  getEventMarkerLabel,
  getEventMarkerStyles,
  KRUGER_REGION_CENTER,
  KRUGER_REGION_ZOOM,
  parseEventCoordinates,
} from "@/components/maps/live-map-utils";
import type { LiveEvent, MapZoneSummary } from "@/features/dashboard/types";
import {
  getEventTypeLabel,
  getSeverityClasses,
} from "@/features/dashboard/utils/event-styles";
import { cn } from "@/lib/utils";

const zoneLabelIcon = (label: string, status: MapZoneSummary["status"]) =>
  divIcon({
    className: "rhino-zone-label",
    html: `<div class="rounded-full border px-3 py-1 text-[11px] font-medium shadow-sm ${
      status === "stable"
        ? "border-[rgba(58,188,103,0.28)] bg-[rgba(58,188,103,0.14)] text-[#9ae6b4]"
        : status === "watch"
          ? "border-[rgba(246,197,93,0.28)] bg-[rgba(246,197,93,0.12)] text-[#f6c55d]"
          : "border-[rgba(236,96,70,0.28)] bg-[rgba(236,96,70,0.12)] text-[#ff8d74]"
    }">${label}</div>`,
    iconSize: [0, 0],
  });

interface LiveEventMapProps {
  events: readonly LiveEvent[];
  zones: readonly MapZoneSummary[];
  selectedEventId?: string | null;
  onSelectEvent: (eventId: string) => void;
}

function SelectedEventController({
  event,
  markerRef,
}: {
  event?: LiveEvent;
  markerRef?: LeafletCircleMarker | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!event) {
      return;
    }

    map.flyTo(parseEventCoordinates(event.coordinates), 12, {
      animate: true,
      duration: 0.75,
    });

    markerRef?.openPopup();
  }, [event, map, markerRef]);

  return null;
}

export function LiveEventMap({
  events,
  zones,
  selectedEventId,
  onSelectEvent,
}: LiveEventMapProps) {
  const markerRefs = useRef<Record<string, LeafletCircleMarker | null>>({});
  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId),
    [events, selectedEventId],
  );

  return (
    <MapContainer
      center={KRUGER_REGION_CENTER}
      className="h-full w-full"
      scrollWheelZoom
      zoom={KRUGER_REGION_ZOOM}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        subdomains="abcd"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="bottomright" />

      {zones.map((zone) => (
        <Marker
          icon={zoneLabelIcon(zone.label, zone.status)}
          interactive={false}
          key={zone.id}
          position={parseEventCoordinates(
            events.find((event) => event.zone === zone.label)?.coordinates ??
              `${KRUGER_REGION_CENTER[0]}, ${KRUGER_REGION_CENTER[1]}`,
          )}
        />
      ))}

      {events.map((event) => {
        const isSelected = event.id === selectedEventId;
        const severityClasses = getSeverityClasses(event.severity);

        return (
          <CircleMarker
            center={parseEventCoordinates(event.coordinates)}
            eventHandlers={{
              click: () => onSelectEvent(event.id),
            }}
            key={event.id}
            pathOptions={getEventMarkerStyles(event.severity, isSelected)}
            ref={(instance) => {
              markerRefs.current[event.id] = instance;
            }}
          >
            <Tooltip direction="top" offset={[0, -12]} opacity={1} permanent={isSelected}>
              <span className="text-xs font-medium">{getEventMarkerLabel(event)}</span>
            </Tooltip>
            <Popup closeButton={false} minWidth={260}>
              <div className="space-y-3 rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {getEventTypeLabel(event.type)} detection
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-muted">
                      {event.zone}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em]",
                      severityClasses.badge,
                    )}
                  >
                    {event.severity}
                  </span>
                </div>
                <p className="text-sm leading-6 text-text-muted">{event.message}</p>
                <dl className="grid grid-cols-2 gap-2 text-xs text-text-muted">
                  <div>
                    <dt className="uppercase tracking-[0.18em]">Confidence</dt>
                    <dd className="mt-1 text-text-primary">{event.confidence}%</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.18em]">Status</dt>
                    <dd className="mt-1 capitalize text-text-primary">{event.status}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.18em]">Time</dt>
                    <dd className="mt-1 text-text-primary">{event.timestamp}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-[0.18em]">Coordinates</dt>
                    <dd className="mt-1 text-text-primary">{event.coordinates}</dd>
                  </div>
                </dl>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}

      <SelectedEventController
        event={selectedEvent}
        markerRef={selectedEvent ? markerRefs.current[selectedEvent.id] : undefined}
      />
    </MapContainer>
  );
}
