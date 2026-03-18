"use client";

import type {
  Incident,
  LiveEvent,
  ReserveOverviewItem,
  ReserveZone,
  SummaryMetric,
} from "@/types";
import { commandCenterMockState } from "@/features/dashboard/mock/command-center";

export interface DashboardSliceState {
  liveEvents: LiveEvent[];
  selectedEventId: string | null;
  summaryMetrics: SummaryMetric[];
  reserveZones: ReserveZone[];
  reserveOverview: ReserveOverviewItem[];
  recentIncidents: Incident[];
}

export interface DashboardSliceActions {
  setLiveEvents: (events: LiveEvent[]) => void;
  addLiveEvent: (event: LiveEvent) => void;
  setSelectedEvent: (eventId: string | null) => void;
  clearSelectedEvent: () => void;
  setSummaryMetrics: (metrics: SummaryMetric[]) => void;
  setReserveZones: (zones: ReserveZone[]) => void;
  setReserveOverview: (items: ReserveOverviewItem[]) => void;
  setRecentIncidents: (incidents: Incident[]) => void;
  hydrateFromMockData: () => void;
}

export type DashboardSlice = DashboardSliceState & DashboardSliceActions;

export const dashboardInitialState: DashboardSliceState = {
  liveEvents: [],
  selectedEventId: null,
  summaryMetrics: [],
  reserveZones: [],
  reserveOverview: [],
  recentIncidents: [],
};

export function createDashboardSlice(
  set: (
    partial:
      | DashboardSlice
      | Partial<DashboardSlice>
      | ((state: DashboardSlice) => DashboardSlice | Partial<DashboardSlice>),
  ) => void,
): DashboardSlice {
  return {
    ...dashboardInitialState,
    setLiveEvents: (events) => set({ liveEvents: events }),
    addLiveEvent: (event) =>
      set((state) => ({ liveEvents: [event, ...state.liveEvents] })),
    setSelectedEvent: (eventId) => set({ selectedEventId: eventId }),
    clearSelectedEvent: () => set({ selectedEventId: null }),
    setSummaryMetrics: (metrics) => set({ summaryMetrics: metrics }),
    setReserveZones: (zones) => set({ reserveZones: zones }),
    setReserveOverview: (items) => set({ reserveOverview: items }),
    setRecentIncidents: (incidents) => set({ recentIncidents: incidents }),
    hydrateFromMockData: () =>
      set({
        liveEvents: [...commandCenterMockState.liveEvents],
        selectedEventId: commandCenterMockState.liveEvents[0]?.id ?? null,
        summaryMetrics: [...commandCenterMockState.summaryMetrics],
        reserveZones: [...commandCenterMockState.reserveZones],
        reserveOverview: [...commandCenterMockState.reserveOverview],
        recentIncidents: [...commandCenterMockState.recentIncidents],
      }),
  };
}

