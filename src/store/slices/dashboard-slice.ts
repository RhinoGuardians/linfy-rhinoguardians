"use client";

import type {
  DataSource,
  Incident,
  LiveEvent,
  ReserveOverviewItem,
  ReserveZone,
  SummaryMetric,
} from "@/types";
import { commandCenterMockState } from "@/features/dashboard/mock/command-center";
import {
  fetchCommandCenterLiveSnapshot,
  fetchCommandCenterSnapshot,
} from "@/features/dashboard/api";

export interface DashboardSliceState {
  isHydrated: boolean;
  isLoading: boolean;
  dataSource: DataSource | null;
  lastUpdatedAt: string | null;
  statusMessage: string | null;
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
  loadCommandCenterData: (options?: {
    silent?: boolean;
    liveOnly?: boolean;
  }) => Promise<void>;
}

export type DashboardSlice = DashboardSliceState & DashboardSliceActions;

const commandCenterInitialSnapshot = {
  liveEvents: [...commandCenterMockState.liveEvents],
  summaryMetrics: [...commandCenterMockState.summaryMetrics],
  reserveZones: [...commandCenterMockState.reserveZones],
  reserveOverview: [...commandCenterMockState.reserveOverview],
  recentIncidents: [...commandCenterMockState.recentIncidents],
} as const;

export const dashboardInitialState: DashboardSliceState = {
  isHydrated: true,
  isLoading: false,
  dataSource: null,
  lastUpdatedAt: null,
  statusMessage: "Syncing live operations feed...",
  liveEvents: [...commandCenterInitialSnapshot.liveEvents],
  selectedEventId: commandCenterInitialSnapshot.liveEvents[0]?.id ?? null,
  summaryMetrics: [...commandCenterInitialSnapshot.summaryMetrics],
  reserveZones: [...commandCenterInitialSnapshot.reserveZones],
  reserveOverview: [...commandCenterInitialSnapshot.reserveOverview],
  recentIncidents: [...commandCenterInitialSnapshot.recentIncidents],
};

export function createDashboardSlice(
  set: (
    partial:
      | DashboardSlice
      | Partial<DashboardSlice>
      | ((state: DashboardSlice) => DashboardSlice | Partial<DashboardSlice>),
  ) => void,
  get: () => DashboardSlice,
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
      set((state) => {
        if (state.dataSource === "mock") {
          return state;
        }

        return {
          isHydrated: true,
          liveEvents: [...commandCenterMockState.liveEvents],
          selectedEventId: commandCenterMockState.liveEvents[0]?.id ?? null,
          summaryMetrics: [...commandCenterMockState.summaryMetrics],
          reserveZones: [...commandCenterMockState.reserveZones],
          reserveOverview: [...commandCenterMockState.reserveOverview],
          recentIncidents: [...commandCenterMockState.recentIncidents],
          dataSource: "mock",
          isLoading: false,
          lastUpdatedAt: new Date().toISOString(),
          statusMessage: "Using local reserve monitoring data.",
        };
      }),
    loadCommandCenterData: async (options) => {
      const { silent = false, liveOnly = false } = options ?? {};
      const currentState = get();

      if (!silent) {
        set({
          isLoading: true,
          statusMessage: currentState.dataSource === "api"
            ? "Refreshing live operations feed..."
            : "Syncing live operations feed...",
        });
      }

      if (liveOnly) {
        const result = await fetchCommandCenterLiveSnapshot();

        set((state) => {
          const nextSelectedEventId =
            state.selectedEventId &&
            result.data.liveEvents.some((event) => event.id === state.selectedEventId)
              ? state.selectedEventId
              : result.data.liveEvents[0]?.id ?? null;

          return {
            isHydrated: true,
            isLoading: false,
            dataSource: result.source,
            lastUpdatedAt: result.updatedAt,
            statusMessage:
              result.source === "api"
                ? "Live operations feed connected."
                : (result.message ?? "Using local reserve monitoring data."),
            liveEvents: [...result.data.liveEvents],
            summaryMetrics: [...result.data.summaryMetrics],
            selectedEventId: nextSelectedEventId,
          };
        });

        return;
      }

      const result = await fetchCommandCenterSnapshot();

      set((state) => {
        const nextSelectedEventId =
          state.selectedEventId &&
          result.data.liveEvents.some((event) => event.id === state.selectedEventId)
            ? state.selectedEventId
            : result.data.liveEvents[0]?.id ?? null;

        return {
          isHydrated: true,
          isLoading: false,
          dataSource: result.source,
          lastUpdatedAt: result.updatedAt,
          statusMessage:
            result.source === "api"
              ? "Live operations feed connected."
              : (result.message ?? "Using local reserve monitoring data."),
          liveEvents: [...result.data.liveEvents],
          summaryMetrics: [...result.data.summaryMetrics],
          selectedEventId: nextSelectedEventId,
          reserveZones: [...result.data.reserveZones],
          reserveOverview: [...result.data.reserveOverview],
          recentIncidents: [...result.data.recentIncidents],
        };
      });
    },
  };
}
